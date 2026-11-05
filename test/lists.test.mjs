// Checks every language folder: both files follow their schema, every entry
// matches its example but not its rewrite or false positives, every test case
// in tests/cases.json holds, and eval/sources.json matches the corpus files.

import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { compileList, findHits } from '../src/matcher.mjs';
import { readJson, readJsonLines } from '../scripts/lib/json.mjs';
import { languageDir, languages, ROOT } from '../scripts/lib/languages.mjs';
import { validate } from '../scripts/lib/schema.mjs';

const patternsSchema = readJson(join(ROOT, 'schema', 'patterns.schema.json'));
const casesSchema = readJson(join(ROOT, 'schema', 'cases.schema.json'));

const firing = (compiled, text, ids) =>
  new Set(findHits({ ...compiled, patterns: compiled.patterns.filter((p) => !ids || ids.includes(p.id)) }, text).map((hit) => hit.id));

for (const language of languages()) {
  describe(language, () => {
    const list = readJson(join(languageDir(language), 'patterns.json'));
    const cases = readJson(join(languageDir(language), 'tests', 'cases.json'));

    it('patterns.json follows the schema', () => {
      assert.deepEqual(validate(patternsSchema, list), []);
      assert.equal(list.language, language);
    });

    it('ids are unique and carry the language', () => {
      const ids = list.patterns.map((p) => p.id);
      assert.equal(new Set(ids).size, ids.length);
      for (const id of ids) assert.ok(id.startsWith(`${language}-`), id);
      for (const p of list.patterns.filter((entry) => entry.kind === 'word')) assert.doesNotMatch(p.match.trim(), /\s/, p.id);
    });

    const compiled = compileList(list);

    for (const entry of compiled.patterns) {
      it(`${entry.id} matches its example only, with something to point at`, () => {
        const own = [entry.id];
        const hits = findHits({ ...compiled, patterns: [entry] }, entry.example);
        assert.ok(hits.some((hit) => hit.match.trim()), `example: ${entry.example}`);
        assert.equal(firing(compiled, entry.rewrite, own).size, 0, `rewrite: ${entry.rewrite}`);
        for (const text of entry.falsePositives) assert.equal(firing(compiled, text, own).size, 0, `false positive: ${text}`);
      });
    }

    it('tests/cases.json follows the schema', () => {
      assert.deepEqual(validate(casesSchema, cases), []);
      assert.equal(cases.language, language);
    });

    it('eval/sources.json describes every shipped corpus file, with the right size', () => {
      const evalDir = join(languageDir(language), 'eval');
      const { corpora } = readJson(join(evalDir, 'sources.json'));
      const described = new Set(corpora.map((corpus) => corpus.file).filter(Boolean));
      assert.deepEqual(readdirSync(join(evalDir, 'corpus')).map((name) => `corpus/${name}`).filter((file) => !described.has(file)), []);
      for (const corpus of corpora) {
        assert.ok(['human', 'ai'].includes(corpus.side), corpus.name);
        if (corpus.shipped === 'none') {
          assert.ok(corpus.rebuild && !corpus.file, corpus.name);
          continue;
        }
        const suffix = corpus.shipped === 'text' ? '.jsonl' : '.meta.jsonl';
        assert.equal(corpus.file, `corpus/${corpus.name}${suffix}`);
        assert.equal(readJsonLines(join(evalDir, corpus.file)).length, corpus.texts, corpus.name);
        if (corpus.shipped === 'metadata') assert.ok(corpus.rebuild, corpus.name);
      }
    });

    const known = new Set(list.patterns.map((p) => p.id));
    cases.cases.forEach((testCase, index) => {
      it(`case ${index + 1}: ${testCase.text.slice(0, 50).replace(/\s+/g, ' ')}`, () => {
        const fired = firing(compiled, testCase.text);
        for (const id of testCase.hits ?? []) {
          assert.ok(known.has(id), `unknown id ${id}`);
          assert.ok(fired.has(id), `${id} should match`);
        }
        if (testCase.misses === 'all') assert.deepEqual([...fired], []);
        for (const id of Array.isArray(testCase.misses) ? testCase.misses : []) {
          assert.ok(known.has(id), `unknown id ${id}`);
          assert.ok(!fired.has(id), `${id} should not match`);
        }
      });
    });
  });
}
