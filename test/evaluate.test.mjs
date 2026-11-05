// Checks the evaluation helpers: per-genre, per-generator and per-style counts
// and their report tables, the evidence and domain the counts give an entry
// (held-out corpora reported but never deciding),
// the mC4 shard reader, counts.csv round trips, the shared prose filter, and
// the command-line usage errors of the evaluation, build and corpus scripts.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { describe, it } from 'node:test';
import { compileList } from '../src/matcher.mjs';
import { readCounts, writeCounts } from '../scripts/lib/counts.mjs';
import { ROOT } from '../scripts/lib/languages.mjs';
import { gzipJsonLines } from '../scripts/lib/mc4.mjs';
import { domainOf, evidenceOf, isHeldOut, isImitation, measure, overTheBar } from '../scripts/lib/measure.mjs';
import { isProse } from '../scripts/lib/prose.mjs';
import { breakdownTables } from '../scripts/lib/report.mjs';
import { validate } from '../scripts/lib/schema.mjs';

const entry = (id, match, precision, category = 'hype') => ({ id, kind: 'phrase', match, precision, category, domain: 'general' });
const compiled = compileList({
  language: 'xx',
  patterns: [entry('xx-high', 'alpha', 'high'), entry('xx-m1', 'beta', 'medium'), entry('xx-m2', 'gamma', 'medium', 'structure')],
});
const general = new Set(['xx-high', 'xx-m1', 'xx-m2']);

describe('measure', () => {
  const docs = [
    { genre: 'email', text: 'alpha' },
    { genre: 'blog', text: 'beta and gamma' },
    { genre: 'blog', text: 'nothing here' },
    { genre: 'Poetry', text: 'beta' },
    { text: 'alpha without a genre' },
  ];
  const result = measure(compiled, docs, general);

  it('counts texts, hits and flags over the whole corpus', () => {
    assert.equal(result.texts, 5);
    assert.equal(result.anyHigh, 2);
    assert.equal(result.anyMedium, 2);
    assert.equal(result.flagged, 3);
    assert.equal(result.flaggedWording, 2);
    assert.equal(result.perPattern.get('xx-m1'), 2);
    assert.equal(result.perCategory.get('structure'), 1);
  });

  it('counts each genre on its own, known genres first in report order', () => {
    assert.deepEqual([...result.byGenre.keys()], ['blog', 'email', 'Poetry']);
    assert.deepEqual(result.byGenre.get('blog'), { texts: 2, anyHigh: 0, anyMedium: 1, flagged: 1, flaggedGeneral: 1, flaggedWording: 0 });
    assert.equal(result.byGenre.get('email').flagged, 1);
    assert.equal([...result.byGenre.values()].reduce((sum, t) => sum + t.texts, 0), 4);
  });

  it('flags a document only when one of its fields is flagged on its own', () => {
    const split = measure(compiled, [{ fields: { title: 'beta', description: 'gamma', price: 3 } }], general);
    assert.equal(split.flagged, 0);
    assert.equal(split.perPattern.get('xx-m1'), 1);
    const together = measure(compiled, [{ fields: { title: 'nothing', description: 'beta and gamma' } }], general);
    assert.equal(together.flagged, 1);
    const overlapping = measure(compileList({ language: 'xx', patterns: [entry('xx-a', 'beta', 'medium'), entry('xx-b', 'beta gamma', 'medium')] }), [{ text: 'beta gamma' }], general);
    assert.equal(overlapping.flagged, 0);
  });
});

describe('generator and style', () => {
  const docs = [
    { genre: 'longform', generator: 'gpt', style: 'B', text: 'alpha' },
    { genre: 'report', generator: 'claude', style: 'A', text: 'beta and gamma' },
    { genre: 'blog', generator: 'claude', style: 'A', text: 'nothing here' },
    { genre: 'blog', generator: 'claude', text: 'beta' },
  ];
  const result = measure(compiled, docs, general);

  it('counts each generator and each style on its own, alphabetically', () => {
    assert.deepEqual([...result.byGenerator.keys()], ['claude', 'gpt']);
    assert.deepEqual(result.byGenerator.get('claude'), { texts: 3, anyHigh: 0, anyMedium: 2, flagged: 1, flaggedGeneral: 1, flaggedWording: 0 });
    assert.equal(result.byGenerator.get('gpt').flagged, 1);
    assert.deepEqual([...result.byStyle.keys()], ['A', 'B']);
    assert.equal(result.byStyle.get('A').texts, 2);
    assert.equal(result.byStyle.get('A').flagged, 1);
    assert.equal([...result.byStyle.values()].reduce((sum, t) => sum + t.texts, 0), 3);
  });

  it('puts long form after the six short genres', () => {
    assert.deepEqual([...result.byGenre.keys()], ['blog', 'report', 'longform']);
  });

  it('reports genre, generator and style tables for machine corpora only', () => {
    const lines = breakdownTables([
      { name: 'multi', side: 'ai', ...result },
      { name: 'one-model', side: 'ai', ...measure(compiled, [{ genre: 'blog', generator: 'gpt', style: 'A', text: 'alpha' }], general) },
      { name: 'people', side: 'human', ...result },
    ]);
    const squeezed = lines.map((line) => line.trim().split(/\s+/).join(' '));
    assert.deepEqual(
      squeezed.filter((line) => /^machine corpora/.test(line)),
      ['machine corpora by genre', 'machine corpora by generator', 'machine corpora by request style (A short, B careful)'],
    );
    assert.ok(squeezed.includes('multi longform 1 100.0% 100.0% 100.0% (1)'));
    assert.ok(squeezed.includes('one-model blog 1 100.0% 100.0% 100.0% (1)'));
    assert.ok(squeezed.includes('multi claude 3 33.3% 33.3% 0.0% (0)'));
    assert.ok(squeezed.includes('multi gpt 1 100.0% 100.0% 100.0% (1)'));
    assert.ok(squeezed.includes('multi A 2 50.0% 50.0% 0.0% (0)'));
    assert.ok(squeezed.includes('multi B 1 100.0% 100.0% 100.0% (1)'));
    assert.ok(!squeezed.some((line) => /^(one-model|people) /.test(line) && !line.startsWith('one-model blog')));
  });

  it('leaves out the generator and style tables when no corpus has two of either', () => {
    const lines = breakdownTables([{ name: 'plain', side: 'ai', ...measure(compiled, [{ genre: 'blog', generator: 'gpt', text: 'alpha' }], general) }]);
    assert.deepEqual(lines.filter((line) => /^machine corpora/.test(line)), ['machine corpora by genre']);
  });
});

describe('evidence and domain', () => {
  const corpus = (name, side, domain, role, texts, hits) => ({ name, side, domain, role, texts, perPattern: new Map(Object.entries(hits)) });
  const results = [
    corpus('web', 'human', 'general', 'development', 1000, { 'xx-a': 1, 'xx-b': 11 }),
    corpus('shop', 'human', 'product', 'development', 100, { 'xx-a': 2 }),
    corpus('imitation', 'ai', 'product', 'sanity check', 80, { 'xx-b': 3 }),
    corpus('models', 'ai', 'general', 'development', 96, { 'xx-a': 5 }),
  ];

  it('evidence: independent machine text, then the imitation set, then reasoning', () => {
    assert.equal(evidenceOf('xx-a', results), 'corpus');
    assert.equal(evidenceOf('xx-b', results), 'imitation');
    assert.equal(evidenceOf('xx-c', results), 'reasoning');
  });

  it('domain: general while under the bar on every general human corpus', () => {
    assert.equal(domainOf({ id: 'xx-a', precision: 'high' }, results), 'general');
    assert.equal(domainOf({ id: 'xx-a', precision: 'medium' }, results), 'general');
    assert.equal(domainOf({ id: 'xx-b', precision: 'medium' }, results), 'product');
  });

  it('lists entries above their bar on product copy, with each corpus', () => {
    const over = overTheBar([{ id: 'xx-a', precision: 'medium' }, { id: 'xx-b', precision: 'medium' }], results);
    assert.deepEqual(over.map((o) => [o.entry.id, o.over.map((c) => [c.name, c.heldOut, c.hits])]), [['xx-a', [['shop', false, 2]]]]);
  });

  it('reads roles as stored, with spaces or hyphens', () => {
    assert.equal(isHeldOut({ role: 'held out' }), true);
    assert.equal(isHeldOut({ role: 'held-out' }), true);
    assert.equal(isHeldOut({ role: 'development' }), false);
    assert.equal(isImitation({ role: 'sanity check' }), true);
    assert.equal(isImitation({ role: 'sanity-check' }), true);
    assert.equal(isImitation({ role: 'control' }), false);
  });
});

describe('held-out corpora', () => {
  const corpus = (name, side, domain, role, texts, hits) => ({ name, side, domain, role, texts, perPattern: new Map(Object.entries(hits)) });
  const results = [
    corpus('web', 'human', 'general', 'development', 1000, { 'xx-a': 1 }),
    corpus('web-holdout', 'human', 'general', 'held out', 1000, { 'xx-a': 50, 'xx-h': 50 }),
    corpus('news', 'human', 'general', 'out of domain', 1000, { 'xx-o': 50 }),
    corpus('shop', 'human', 'product', 'development', 100, { 'xx-a': 5 }),
    corpus('shop-holdout', 'human', 'product', 'held-out', 100, { 'xx-a': 9, 'xx-h': 4 }),
    corpus('imitation', 'ai', 'product', 'sanity check', 80, { 'xx-i': 3 }),
    corpus('models', 'ai', 'general', 'development', 96, { 'xx-a': 5 }),
    corpus('models-holdout', 'ai', 'general', 'held out', 96, { 'xx-h': 7, 'xx-i': 2 }),
    corpus('control', 'ai', 'general', 'control', 96, { 'xx-c': 1 }),
  ];

  it('do not decide evidence', () => {
    assert.equal(evidenceOf('xx-h', results), 'reasoning');
    assert.equal(evidenceOf('xx-i', results), 'imitation');
    assert.equal(evidenceOf('xx-a', results), 'corpus');
    assert.equal(evidenceOf('xx-c', results), 'corpus');
  });

  it('do not decide domain, while out-of-domain corpora do', () => {
    assert.equal(domainOf({ id: 'xx-a', precision: 'medium' }, results), 'general');
    assert.equal(domainOf({ id: 'xx-h', precision: 'high' }, results), 'general');
    assert.equal(domainOf({ id: 'xx-o', precision: 'medium' }, results), 'product');
  });

  it('are still reported above the bar on product copy, and marked', () => {
    const over = overTheBar([{ id: 'xx-a', precision: 'medium' }, { id: 'xx-h', precision: 'medium' }], results);
    assert.deepEqual(
      over.map((o) => [o.entry.id, o.over.map((c) => `${c.name}:${c.heldOut}`)]),
      [['xx-a', ['shop-holdout:true', 'shop:false']], ['xx-h', ['shop-holdout:true']]],
    );
  });
});

describe('mC4 shards', () => {
  it('reads a gzipped JSON Lines file, skipping blank lines', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'shard-'));
    try {
      const file = join(dir, 'shard.json.gz');
      writeFileSync(file, gzipSync('{"url":"a"}\n\n{"url":"b"}\n'));
      const rows = [];
      for await (const row of gzipJsonLines(file)) rows.push(row.url);
      assert.deepEqual(rows, ['a', 'b']);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('counts.csv', () => {
  it('reads what it writes', () => {
    const dir = mkdtempSync(join(tmpdir(), 'counts-'));
    try {
      const file = join(dir, 'counts.csv');
      const patterns = [{ id: 'xx-a', category: 'hype', precision: 'high' }, { id: 'xx-b', category: 'filler', precision: 'medium' }];
      writeCounts(file, patterns, [{ name: 'web (2020)', texts: 10, perPattern: new Map([['xx-b', 4]]) }]);
      const { columns, rows } = readCounts(file);
      assert.deepEqual(columns, [{ name: 'web (2020)', n: 10 }]);
      assert.deepEqual([...rows], [['xx-a', [0]], ['xx-b', [4]]]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('prose filter', () => {
  const paragraph = 'Il gatto dorme sul divano e la casa è tranquilla per tutto il pomeriggio di domenica.';

  it('keeps running text and drops short or list-like lines', () => {
    assert.equal(isProse('it', paragraph), true);
    assert.equal(isProse('it', paragraph, 20), false);
    assert.equal(isProse('it', 'Prezzo | Taglia | Colore | Spedizione | Resi | Contatti | Chi siamo | Blog | Negozio | Carrello | Account | Aiuto'), false);
  });

  it('refuses a language it has no function words for', () => {
    assert.throws(() => isProse('fr', paragraph), /no function words/);
  });
});

describe('schema validator', () => {
  it('does not take inherited names for declared or required properties', () => {
    const schema = { type: 'object', required: ['constructor'], properties: { a: { type: 'string' } }, additionalProperties: false };
    assert.deepEqual(validate(schema, JSON.parse('{"toString": "x"}')), ['(root): missing constructor', '(root): unexpected property toString']);
  });
});

describe('command line', () => {
  const run = (script, ...args) => spawnSync(process.execPath, [join(ROOT, 'scripts', script), ...args], { encoding: 'utf8' });

  it('evaluate exits with 2 on usage errors', () => {
    assert.equal(run('evaluate.mjs', '--bogus').status, 2);
    assert.equal(run('evaluate.mjs', 'zz').status, 2);
    const both = run('evaluate.mjs', '--write', '--check');
    assert.equal(both.status, 2);
    assert.match(both.stderr, /cannot be combined/);
  });

  it('build-skill exits with 2 on an unknown argument', () => {
    assert.equal(run('build-skill.mjs', '--chek').status, 2);
  });

  it('generate-general exits with 2 on a flag without a value or no language', () => {
    for (const args of [['--name'], ['--requests', '--name', 'x', 'it'], []]) {
      const result = run('generate-general.mjs', ...args);
      assert.equal(result.status, 2, args.join(' '));
      assert.match(result.stderr, /^usage: /m);
    }
  });

  it('generate-api exits with 2 on a missing or unknown command, language or option value', () => {
    for (const args of [[], ['bogus'], ['live', 'zz'], ['batch'], ['batch', 'status', 'it'], ['batch', 'build', '--work']]) {
      const result = run('generate-api.mjs', ...args);
      assert.equal(result.status, 2, args.join(' '));
      assert.match(result.stderr, /^usage: /m);
    }
  });

  it('sample-mc4-web exits with 2 on --url without a value', () => {
    for (const args of [['it', 'shard.json.gz', 'web:3', '--url'], ['it', 'shard.json.gz', 'web:3', '--url', '--exclude-known']]) {
      const result = run('sample-mc4-web.mjs', ...args);
      assert.equal(result.status, 2, args.join(' '));
      assert.match(result.stderr, /--url needs a value/);
    }
  });

  it('rebuild-desegma prints its usage and exits with 2 without a file', () => {
    const result = spawnSync(process.execPath, [join(ROOT, 'it', 'eval', 'rebuild-desegma.mjs')], { encoding: 'utf8' });
    assert.equal(result.status, 2);
    assert.equal(result.stderr.trim(), 'usage: node it/eval/rebuild-desegma.mjs SUBTASK_A_TRAIN.csv');
  });
});
