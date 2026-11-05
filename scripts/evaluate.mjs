#!/usr/bin/env node
// Reports how often each language's patterns fire on its corpora.
//
//   node scripts/evaluate.mjs [language ...]     all languages when none is named
//   node scripts/evaluate.mjs it --write         also rewrite it/eval/counts.csv and summary.txt
//   node scripts/evaluate.mjs --check            fail when the corpora on disk disagree with
//                                                counts.csv and summary.txt (run in CI)
//
// Exit codes: 0 done, 1 a check failed or --write was refused, 2 usage error.
//
// The corpora are the ones listed in <language>/eval/sources.json. Texts the
// repository may ship are in eval/corpus/<name>.jsonl. The others are rebuilt
// into eval/corpus-local/<name>.jsonl by the scripts named in sources.json;
// until then they are reported as missing, and --write is refused so that
// counts.csv always covers every corpus. --write is also refused when an
// entry's evidence or domain disagrees with what the counts say. Evidence and
// domain come from the corpora that are not held out; held-out corpora are
// only reported. A corpus "note" in sources.json is printed after its role
// and changes nothing else.
//
// --check compares every corpus on disk with its row in summary.txt (and, for
// machine corpora, its rows in the genre, generator and style tables) and its
// column in counts.csv.
// When no corpus is missing, summary.txt must match the report exactly.
//
// A corpus line is a JSON object with "text", or with "fields" (an object of
// strings such as title and description), each field matched on its own.
// Lines of a machine corpus that carry a "genre" are also counted per genre,
// lines that carry a "generator" per generator, and lines that carry a "style"
// (A, a short request; B, a careful one) per style.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileList } from '../src/matcher.mjs';
import { readCounts, writeCounts } from './lib/counts.mjs';
import { readJson, readJsonLines } from './lib/json.mjs';
import { languageDir, languages, ROOT } from './lib/languages.mjs';
import { domainOf, evidenceOf, GENERAL_BAR, measure, overTheBar } from './lib/measure.mjs';
import { BREAKDOWNS, breakdownRows, breakdownTables, pct, table, wording } from './lib/report.mjs';

const CATEGORIES = readJson(join(ROOT, 'schema', 'patterns.schema.json')).$defs.pattern.properties.category.enum;
const USAGE = 'usage: node scripts/evaluate.mjs [language ...] [--write | --check]';

const percent = (share) => `${+(share * 100).toFixed(2)}%`;

function corpusFile(evalDir, name) {
  return [join(evalDir, 'corpus', `${name}.jsonl`), join(evalDir, 'corpus-local', `${name}.jsonl`)].find(existsSync);
}

const CORPUS_HEAD = ['corpus', 'side', 'domain', 'role', 'texts', 'any high', 'any medium', 'flagged', 'flagged general', 'flagged wording'];

const corpusRow = (r) => [
  r.name, r.side, r.domain, r.role.replace(/\s+/g, '-') + (r.note ? ` (${r.note})` : ''), String(r.texts),
  pct(r.anyHigh, r.texts), pct(r.anyMedium, r.texts), pct(r.flagged, r.texts), pct(r.flaggedGeneral, r.texts), wording(r),
];

/** The list, its corpora measured where they are on disk, and the corpora that are not. */
function measureLanguage(language) {
  const evalDir = join(languageDir(language), 'eval');
  const list = readJson(join(languageDir(language), 'patterns.json'));
  const compiled = compileList(list);
  const general = new Set(list.patterns.filter((p) => p.domain === 'general').map((p) => p.id));
  const results = [];
  const missing = [];
  for (const corpus of readJson(join(evalDir, 'sources.json')).corpora) {
    const file = corpusFile(evalDir, corpus.name);
    if (file) results.push({ ...corpus, ...measure(compiled, readJsonLines(file), general) });
    else missing.push(corpus);
  }
  return { evalDir, list, general, results, missing };
}

/** The report, as printed and as written to summary.txt. */
function summary(language, { list, general, results, missing }) {
  const count = (precision) => list.patterns.filter((p) => p.precision === precision).length;
  const out = [
    `${language}: ${list.patterns.length} patterns (${count('high')} high, ${count('medium')} medium), ` +
      `diacritics ${list.foldDiacritics === false ? 'kept' : 'folded'}`,
    'flag rule: one high hit, or medium hits from two or more entries that do not read the same words',
    `flagged: with all ${list.patterns.length} entries (product copy); flagged general: with the ${general.size} general entries only (any prose); ` +
      'flagged wording: with the general entries outside the structure category (no Markdown, labels, slots or chat leftovers)',
    '',
    ...table(CORPUS_HEAD, results.map(corpusRow), 4),
    ...missing.map((corpus) => `not on disk: ${corpus.name} (${corpus.rebuild ?? 'see sources.json'})`),
  ];
  out.push(...breakdownTables(results));
  out.push('', 'texts with at least one hit, by category');
  out.push(
    ...table(
      ['category', ...results.map((r) => r.name)],
      CATEGORIES.map((category) => [category, ...results.map((r) => pct(r.perCategory.get(category) ?? 0, r.texts))]),
    ),
  );
  const over = overTheBar(list.patterns, results).map(
    ({ entry, over: corpora }) =>
      `${entry.id} (${entry.domain}, ${entry.precision}): ` +
      corpora.map(({ name, heldOut, hits, texts }) => `${pct(hits, texts)} of ${name}${heldOut ? ' (held out)' : ''}`).join(', '),
  );
  out.push(
    '',
    `entries above their bar on product copy (high ${percent(GENERAL_BAR.high)}, medium ${percent(GENERAL_BAR.medium)} of texts), ` +
      'each corpus named; held-out corpora are reported here but never decide evidence or domain',
  );
  out.push(...(over.length ? over : ['none']));
  return out;
}

/** Why --write must not run: missing corpora, or entries whose evidence or domain the counts contradict. */
function writeBlockers({ list, results, missing }) {
  if (missing.length) return [`missing corpora: ${missing.map((c) => c.name).join(', ')}`];
  return list.patterns.flatMap((p) => {
    const evidence = evidenceOf(p.id, results);
    const domain = domainOf(p, results);
    return [
      ...(p.evidence !== evidence ? [`${p.id}: evidence is ${p.evidence}, the counts say ${evidence}`] : []),
      ...(p.domain !== domain ? [`${p.id}: domain is ${p.domain}, the counts say ${domain}`] : []),
    ];
  });
}

function write(language, measured, out) {
  const blockers = writeBlockers(measured);
  if (blockers.length) return [`not writing ${language}/eval/counts.csv and summary.txt:`, ...blockers.map((b) => `  ${b}`)];
  writeCounts(join(measured.evalDir, 'counts.csv'), measured.list.patterns, measured.results);
  writeFileSync(join(measured.evalDir, 'summary.txt'), out.join('\n') + '\n');
  console.log(`wrote ${language}/eval/counts.csv and ${language}/eval/summary.txt\n`);
  return [];
}

const squeeze = (line) => line.trim().split(/\s+/).join(' ');

/** What differs between the corpora on disk and the committed counts.csv and summary.txt. */
function check(language, { evalDir, list, results, missing }, out) {
  const problems = [];
  const committed = readFileSync(join(evalDir, 'summary.txt'), 'utf8');
  if (!missing.length && committed !== out.join('\n') + '\n') problems.push(`${language}: summary.txt differs from the report`);
  const lines = new Set(committed.split('\n').map(squeeze));
  const expected = [...results.map(corpusRow), ...BREAKDOWNS.flatMap(({ key }) => breakdownRows(results, key))];
  for (const row of expected) if (!lines.has(squeeze(row.join(' ')))) problems.push(`${language}/${row[0]}: summary.txt has no row "${squeeze(row.join(' '))}"`);

  const { columns, rows } = readCounts(join(evalDir, 'counts.csv'));
  if ([...rows.keys()].join() !== list.patterns.map((p) => p.id).join()) problems.push(`${language}: counts.csv does not list the entries of patterns.json`);
  if (!missing.length && columns.length !== results.length) problems.push(`${language}: counts.csv has ${columns.length} corpora, sources.json ${results.length}`);
  for (const r of results) {
    const column = columns.findIndex((c) => c.name === r.name && c.n === r.texts);
    if (column < 0) {
      problems.push(`${language}/${r.name}: counts.csv has no column for ${r.texts} texts`);
      continue;
    }
    for (const [id, counts] of rows) {
      const count = r.perPattern.get(id) ?? 0;
      if (counts[column] !== count) problems.push(`${language}/${r.name}: ${id} fires on ${count}, counts.csv says ${counts[column]}`);
    }
  }
  if (!problems.length) console.log(`${language}: counts.csv and summary.txt match the corpora on disk\n`);
  return problems;
}

/** { names, mode } from the command line, or { error } for a usage error. */
function parseArgs(argv) {
  const flags = argv.filter((arg) => arg.startsWith('-'));
  const names = argv.filter((arg) => !arg.startsWith('-'));
  const unknownFlags = flags.filter((flag) => flag !== '--write' && flag !== '--check');
  if (unknownFlags.length) return { error: `unknown option: ${unknownFlags.join(' ')}` };
  if (flags.includes('--write') && flags.includes('--check')) return { error: '--write and --check cannot be combined' };
  const unknown = names.filter((language) => !languages().includes(language));
  if (unknown.length) return { error: `no such language folder: ${unknown.join(', ')}` };
  const mode = flags.includes('--write') ? 'write' : flags.includes('--check') ? 'check' : 'report';
  return { names: names.length ? names : languages(), mode };
}

function main(argv) {
  const { names, mode, error } = parseArgs(argv);
  if (error) {
    console.error(`${error}\n${USAGE}`);
    return 2;
  }
  let problems = [];
  for (const language of names) {
    const measured = measureLanguage(language);
    const out = summary(language, measured);
    console.log(out.join('\n') + '\n');
    if (mode === 'check') problems = problems.concat(check(language, measured, out));
    if (mode === 'write') problems = problems.concat(write(language, measured, out));
  }
  for (const problem of problems) console.log(problem);
  return problems.length ? 1 : 0;
}

process.exitCode = main(process.argv.slice(2));
