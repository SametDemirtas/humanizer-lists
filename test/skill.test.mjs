// Checks the Claude skill in skills/humanizer-lists/: its generated files
// match the lists, SKILL.md has valid frontmatter, every entry is covered by
// the reference files, every language has a rewriting guide that SKILL.md
// points to and that has the shared headings, and the checker flags each
// entry's example and the test cases, works from a copy of the skill folder,
// and leaves rewrites and non-examples alone.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { SKILL_DIR, SKILL_NAME, staleFiles } from '../scripts/build-skill.mjs';
import { readJson } from '../scripts/lib/json.mjs';
import { languageDir, languages, ROOT } from '../scripts/lib/languages.mjs';
import { check } from '../skills/humanizer-lists/scripts/check.mjs';

const CHECK = join(SKILL_DIR, 'scripts', 'check.mjs');

/** A small YAML subset: `key: value`, `key: |` blocks and one level of nested `key: value`. */
function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, 'SKILL.md starts with a --- frontmatter block');
  const data = {};
  const lines = match[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const [, key, value] = lines[i].match(/^([a-z_-]+):\s*(.*)$/) ?? [];
    assert.ok(key, `unexpected frontmatter line: ${lines[i]}`);
    if (value === '|' || value === '') {
      const block = [];
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) block.push(lines[++i]);
      if (value === '|') data[key] = block.map((line) => line.trim()).join(' ');
      else data[key] = Object.fromEntries(block.map((line) => line.trim().match(/^([a-z_-]+):\s*"?(.*?)"?$/).slice(1)));
    } else data[key] = value.replace(/^"(.*)"$/, '$1');
  }
  return data;
}

describe('skill', () => {
  it('generated files match the lists and the matcher (node scripts/build-skill.mjs)', () => {
    assert.deepEqual(staleFiles(), []);
  });

  it('SKILL.md has valid frontmatter', () => {
    const data = frontmatter(readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf8'));
    assert.equal(data.name, SKILL_NAME);
    assert.match(data.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(data.name.length <= 64);
    assert.ok(data.description.length >= 50 && data.description.length <= 1024, 'description length');
    assert.doesNotMatch(data.description, /[<>]/);
    assert.match(data.description, /Use when/);
    assert.equal(data.license, 'MIT');
    assert.equal(data.metadata.version, readJson(join(ROOT, 'package.json')).version);
  });

  it('every language has a rewriting guide that SKILL.md names', () => {
    const skill = readFileSync(join(SKILL_DIR, 'SKILL.md'), 'utf8');
    for (const language of languages()) {
      const guide = `guides/${language}.md`;
      assert.ok(existsSync(join(SKILL_DIR, guide)), `${guide} is missing`);
      assert.ok(skill.includes(guide), `SKILL.md does not mention ${guide}`);
    }
  });

  it('every guide has its title, a How to work section and the two worked examples', () => {
    const names = { de: 'German', es: 'Spanish', it: 'Italian', nl: 'Dutch' };
    for (const language of languages()) {
      const name = names[language];
      assert.ok(name, `no language name for ${language}`);
      const guide = readFileSync(join(SKILL_DIR, 'guides', `${language}.md`), 'utf8');
      for (const heading of [`# ${name} rewriting guide`, `## How to work in ${name}`, '## Worked example 1: product listing', '## Worked example 2: email']) {
        assert.ok(guide.split('\n').includes(heading), `guides/${language}.md has no line "${heading}"`);
      }
    }
  });

  it('SKILL.md and the language notes use no em dashes as punctuation', () => {
    // Naming the character, as in "the em dash (—)", is allowed.
    for (const file of [join(SKILL_DIR, 'SKILL.md'), ...languages().map((l) => join(languageDir(l), 'skill-notes.md'))]) {
      assert.doesNotMatch(readFileSync(file, 'utf8').replace(/\(\s?—\s?\)/g, ''), /—/, file);
    }
  });

  it('the checker exits with 2 on usage errors', () => {
    const status = (...args) => spawnSync(process.execPath, [CHECK, ...args], { input: 'Ciao' }).status;
    assert.equal(status('fr', '-'), 2, 'unknown language');
    assert.equal(status('it', '-', '--bogus'), 2, 'unknown flag');
    assert.equal(status('it', '-', 'extra'), 2, 'too many arguments');
    assert.equal(status('it'), 2, 'missing input');
    assert.equal(status('it', join(tmpdir(), 'no-such-file.txt')), 2, 'unreadable file');
  });

  it('the checker exits with 3 on an internal error, never with 1', () => {
    const dir = mkdtempSync(join(tmpdir(), 'skill-'));
    try {
      cpSync(SKILL_DIR, join(dir, SKILL_NAME), { recursive: true });
      const copy = join(dir, SKILL_NAME, 'scripts', 'check.mjs');
      writeFileSync(join(dir, SKILL_NAME, 'lists', 'it.json'), '{ broken');
      const run = spawnSync(process.execPath, [copy, 'it', '-'], { input: 'Ciao', encoding: 'utf8' });
      assert.equal(run.status, 3, run.stderr);
      assert.match(run.stderr, /internal error/);
      rmSync(join(dir, SKILL_NAME, 'lists'), { recursive: true, force: true });
      assert.equal(spawnSync(process.execPath, [copy, 'it', '-'], { input: 'Ciao' }).status, 3, 'lists folder missing');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('build --check reports a stray file in a generated folder', () => {
    const dir = mkdtempSync(join(tmpdir(), 'skill-'));
    try {
      const copy = join(dir, SKILL_NAME);
      cpSync(SKILL_DIR, copy, { recursive: true });
      writeFileSync(join(copy, 'references', 'zz-stray.md'), 'stray');
      assert.ok(staleFiles(undefined, copy).includes('references/zz-stray.md (stray)'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('third-party corpora under corpus-local can never be published', () => {
    const { files } = readJson(join(ROOT, 'package.json'));
    for (const entry of files) assert.doesNotMatch(entry, /corpus-local|\*\*|^\*\/eval|^[a-z]{2}\/?$/, entry);
    assert.match(readFileSync(join(ROOT, '.gitignore'), 'utf8'), /^\*\/eval\/corpus-local\/$/m);
  });

  it('works from a copy of the skill folder alone', () => {
    const dir = mkdtempSync(join(tmpdir(), 'skill-'));
    try {
      cpSync(SKILL_DIR, join(dir, SKILL_NAME), { recursive: true });
      const copy = join(dir, SKILL_NAME, 'scripts', 'check.mjs');
      const entry = readJson(join(languageDir('it'), 'patterns.json')).patterns.find((p) => p.precision === 'high' && p.domain === 'general');
      const file = join(dir, 'draft.txt');
      writeFileSync(file, entry.example);
      const run = spawnSync(process.execPath, [copy, 'it', file], { cwd: dir, encoding: 'utf8' });
      assert.equal(run.status, 1, run.stderr);
      assert.match(run.stdout, new RegExp(entry.id));
      assert.ok(run.stdout.includes(entry.why));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

for (const language of languages()) {
  describe(`skill: ${language}`, () => {
    const list = readJson(join(languageDir(language), 'patterns.json'));
    const { cases } = readJson(join(languageDir(language), 'tests', 'cases.json'));
    const reference = readFileSync(join(SKILL_DIR, 'references', `${language}.md`), 'utf8');
    const ids = (input, options) => new Set(check(language, input, options).flatMap((r) => r.hits.map((hit) => hit.id)));

    it('the reference covers every entry with Watch for, Problem, Before, After and Leave alone', () => {
      const sections = reference.split(/^### \d+\. /m).slice(1);
      const covered = sections.map((section) => section.split('\n')[0].trim());
      assert.deepEqual([...covered].sort(), list.patterns.map((p) => p.id).sort());
      for (const section of sections) {
        for (const label of ['**Watch for:** `', '**Problem:**', '**Before:**', '**After:**', '**Leave alone:**']) {
          assert.ok(section.includes(label), `${section.split('\n')[0]}: ${label}`);
        }
      }
    });

    it('runs on the command line and exits with 1 on a flag, 0 without', () => {
      const high = list.patterns.find((p) => p.precision === 'high' && p.domain === 'general');
      const flagged = spawnSync(process.execPath, [CHECK, language, '-'], { input: high.example, encoding: 'utf8' });
      assert.equal(flagged.status, 1, flagged.stderr);
      assert.match(flagged.stdout, new RegExp(`high\\s+${high.id}`));
      const clean = cases.find((c) => c.misses === 'all');
      const passed = spawnSync(process.execPath, [CHECK, language, '-', '--product'], { input: clean.text, encoding: 'utf8' });
      assert.equal(passed.status, 0, passed.stdout);
      const run = spawnSync(process.execPath, [CHECK, language, '-', '--json'], { input: JSON.stringify({ title: high.example, body: clean.text }), encoding: 'utf8' });
      assert.equal(run.status, 1, run.stderr);
      const json = JSON.parse(run.stdout);
      assert.deepEqual(json.results.map((r) => [r.field, r.flagged]), [['title', true], ['body', false]]);
    });

    for (const entry of list.patterns) {
      it(`${entry.id}: the checker reports the example and not the rewrite or false positives`, () => {
        const product = entry.domain === 'product';
        assert.ok(ids(entry.example, { product }).has(entry.id), entry.example);
        if (product) assert.ok(!ids(entry.example).has(entry.id), 'product entry runs in the general check');
        if (entry.precision === 'high') assert.ok(check(language, entry.example, { product })[0].flagged, 'high example is flagged');
        assert.ok(!ids(entry.rewrite, { product: true }).has(entry.id), entry.rewrite);
        for (const text of entry.falsePositives) assert.ok(!ids(text, { product: true }).has(entry.id), text);
      });
    }

    it('the default check leaves product-only entries out', () => {
      for (const entry of list.patterns.filter((p) => p.domain === 'product')) {
        assert.ok(!ids(entry.example).has(entry.id), entry.id);
      }
    });

    it('reports every hit the test cases expect and passes their non-examples', () => {
      for (const testCase of cases) {
        const found = ids(testCase.text, { product: true });
        for (const id of testCase.hits ?? []) assert.ok(found.has(id), `${id}: ${testCase.text}`);
        if (testCase.misses === 'all') assert.ok(!check(language, testCase.text, { product: true }).some((r) => r.flagged || r.hits.length), testCase.text);
        for (const id of Array.isArray(testCase.misses) ? testCase.misses : []) assert.ok(!found.has(id), `${id}: ${testCase.text}`);
      }
    });
  });
}
