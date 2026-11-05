// Checks that ordinary human writing in genres the human corpora barely cover
// (emails, social posts, school essays, newsletters, reports) is not flagged.
// Each language may keep such texts in tests/human-genres.json.

import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { compileList, findHits, isFlagged } from '../src/matcher.mjs';
import { readJson } from '../scripts/lib/json.mjs';
import { languageDir, languages } from '../scripts/lib/languages.mjs';

for (const language of languages()) {
  const file = join(languageDir(language), 'tests', 'human-genres.json');
  if (!existsSync(file)) continue;
  describe(`${language} human genres`, () => {
    const list = readJson(join(languageDir(language), 'patterns.json'));
    const general = compileList({ ...list, patterns: list.patterns.filter((p) => p.domain === 'general') });
    const all = compileList(list);
    for (const { genre, text, product = false } of readJson(file).texts) {
      it(`${genre}: ${text.slice(0, 60).replace(/\s+/g, ' ')}`, () => {
        const hits = findHits(product ? all : general, text);
        assert.equal(isFlagged(hits), false, hits.map((hit) => `${hit.id}: ${hit.match}`).join('; '));
      });
    }
  });
}
