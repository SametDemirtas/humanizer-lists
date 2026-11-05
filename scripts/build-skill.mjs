#!/usr/bin/env node
// Builds the generated files of the Claude skill in skills/humanizer-lists/
// from the lists, so the skill works when its folder is copied on its own.
//
//   node scripts/build-skill.mjs           write the generated files
//   node scripts/build-skill.mjs --check   fail when a generated file is missing or stale
//
// Exit codes: 0 done or up to date, 1 stale files, 2 usage error.
//
// Generated (never edit by hand):
//   scripts/matcher.mjs     copy of src/matcher.mjs
//   lists/<lang>.json       copy of <lang>/patterns.json
//   references/<lang>.md    <lang>/skill-notes.md, the measured totals from
//                           <lang>/eval/summary.txt and counts.csv, then every
//                           entry of <lang>/patterns.json, grouped by family
//                           and strongest first within each family
//
// SKILL.md and scripts/check.mjs are written by hand.

import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileList, findHits } from '../src/matcher.mjs';
import { readCounts } from './lib/counts.mjs';
import { readJson } from './lib/json.mjs';
import { languageDir, languages, ROOT } from './lib/languages.mjs';
import { isImitation } from './lib/measure.mjs';

export const SKILL_NAME = 'humanizer-lists';
export const SKILL_DIR = join(ROOT, 'skills', SKILL_NAME);

const LANGUAGE_NAMES = { it: 'Italian', es: 'Spanish', nl: 'Dutch', de: 'German' };
const PRECISION_ORDER = ['high', 'medium'];
const EVIDENCE_ORDER = ['corpus', 'imitation', 'reasoning'];

// The families of the English humanizer rulebook, and the categories that fall in each.
const FAMILIES = [
  { title: 'A. Staging instead of stating', categories: ['false-contrast', 'cliche-opener', 'cliche-closer', 'rhetorical-question'],
    intro: 'Contrasts with a reading nobody proposed, staged openings, sign-offs and questions to the reader.' },
  { title: 'B. Punctuation by rule', categories: ['punctuation'],
    intro: 'Dashes, emoji, quotation marks and Markdown marks applied by habit. Check the domain: several of these are ordinary in human prose of the language.' },
  { title: 'C. Inflation and sales language', categories: ['hype', 'vague-praise', 'urgency', 'filler'],
    intro: 'Ordinary facts dressed as special, calques of English marketing phrases, borrowed emphasis and urgency.' },
  { title: 'D. Formatting and chat leftovers', categories: ['structure'],
    intro: 'Markdown labels and headings, template slots, and the assistant talking to the person who asked for the text.' },
];

const number = (n) => n.toLocaleString('en-US');

/** Documents hit and documents measured, summed per group of corpora: Map(id -> { human, machine, imitation }). */
function measured(language, patterns) {
  const { corpora } = readJson(join(languageDir(language), 'eval', 'sources.json'));
  // The imitation set is found by its role, as scripts/lib/measure.mjs does, not by its name.
  const groupOf = new Map(corpora.map((corpus) => [corpus.name, isImitation(corpus) ? 'imitation' : corpus.side === 'ai' ? 'machine' : 'human']));
  const { columns, rows } = readCounts(join(languageDir(language), 'eval', 'counts.csv'));
  const unmeasured = patterns.filter((p) => !rows.has(p.id)).map((p) => p.id);
  if (unmeasured.length) {
    throw new Error(`${language}/eval/counts.csv has no row for ${unmeasured.join(', ')}; run node scripts/evaluate.mjs ${language} --write`);
  }
  const unknown = columns.map((column) => column.name).filter((name) => !groupOf.has(name));
  if (unknown.length) {
    throw new Error(`${language}/eval/counts.csv has columns not listed in sources.json: ${unknown.join(', ')}`);
  }
  const group = (name) => groupOf.get(name);
  const result = new Map();
  for (const [id, counts] of rows) {
    const sums = { human: [0, 0], machine: [0, 0], imitation: [0, 0] };
    columns.forEach((column, i) => {
      const sum = sums[group(column.name)];
      sum[0] += counts[i];
      sum[1] += column.n;
    });
    result.set(id, sums);
  }
  return result;
}

const rate = ([hits, total]) => (total ? hits / total : 0);

/** High before medium; then corpus, imitation, reasoning; then more machine hits, fewer human hits. */
function strongestFirst(patterns, counts) {
  return [...patterns].sort((a, b) => {
    const ca = counts.get(a.id);
    const cb = counts.get(b.id);
    return (
      PRECISION_ORDER.indexOf(a.precision) - PRECISION_ORDER.indexOf(b.precision) ||
      EVIDENCE_ORDER.indexOf(a.evidence) - EVIDENCE_ORDER.indexOf(b.evidence) ||
      rate(cb.machine) - rate(ca.machine) ||
      rate(ca.human) - rate(cb.human) ||
      a.id.localeCompare(b.id)
    );
  });
}

/** The words an entry matched in its own example and in the test cases that name it. */
function watchFor(compiled, entry, cases) {
  const only = { ...compiled, patterns: compiled.patterns.filter((p) => p.id === entry.id) };
  const texts = [entry.example, ...cases.filter((c) => c.hits?.includes(entry.id)).map((c) => c.text)];
  const seen = new Map();
  for (const text of texts) {
    for (const hit of findHits(only, text)) {
      const words = hit.match.trim().replace(/\n/g, '\\n');
      if (words && !seen.has(words.toLowerCase())) seen.set(words.toLowerCase(), words);
    }
  }
  return [...seen.values()].slice(0, 6);
}

const quote = (text) =>
  text
    .split('\n')
    .map((line) => (line.trim() ? `> ${line}` : '>'))
    .join('\n');

const code = (text) => (text.includes('`') ? `\`\` ${text} \`\`` : `\`${text}\``);

const fired = ([hits, total], what) => `${number(hits)} of ${number(total)} ${what}`;

function entryText(entry, index, compiled, cases, sums) {
  const words = watchFor(compiled, entry, cases);
  const tally = [
    fired(sums.human, 'human texts'),
    sums.machine[1] ? fired(sums.machine, 'independent machine texts') : null,
    sums.imitation[1] ? fired(sums.imitation, 'imitations') : null,
  ].filter(Boolean);
  return [
    `### ${index}. ${entry.id}`,
    '',
    `${entry.precision}, ${entry.domain}, ${entry.category}, evidence: ${entry.evidence}. Fired on ${tally.join(', ')}.`,
    '',
    `**Watch for:** ${words.map(code).join(', ')}`,
    `**Problem:** ${entry.why}`,
    '**Before:**',
    quote(entry.example),
    '**After:**',
    quote(entry.rewrite),
    '**Leave alone:**',
    entry.falsePositives.map(quote).join('\n>\n'),
    '',
  ].join('\n');
}

/** The first table of summary.txt: flag rates per corpus. */
function summaryTable(language) {
  const lines = readFileSync(join(languageDir(language), 'eval', 'summary.txt'), 'utf8').split('\n');
  const start = lines.findIndex((line) => line.startsWith('corpus '));
  const end = lines.findIndex((line, i) => i > start && !line.trim());
  return lines.slice(start, end).join('\n');
}

function reference(language) {
  const dir = languageDir(language);
  const list = readJson(join(dir, 'patterns.json'));
  const { cases } = readJson(join(dir, 'tests', 'cases.json'));
  const notes = readFileSync(join(dir, 'skill-notes.md'), 'utf8').trim();
  const compiled = compileList(list);
  const orphans = list.patterns.filter((p) => !FAMILIES.some((family) => family.categories.includes(p.category)));
  if (orphans.length) throw new Error(`${language}: no family for the category of ${orphans.map((p) => p.id).join(', ')}`);
  const counts = measured(language, list.patterns);
  const ordered = strongestFirst(list.patterns, counts);
  const name = LANGUAGE_NAMES[language] ?? language;
  const out = [
    `# ${name} (${language})`,
    '',
    `<!-- Generated by scripts/build-skill.mjs from ${language}/skill-notes.md, ${language}/patterns.json and ${language}/eval/. Edit those and rebuild. -->`,
    '',
    notes,
    '',
    ...measuredSection(language, list.patterns),
  ];
  let index = 0;
  for (const family of FAMILIES) {
    const group = ordered.filter((entry) => family.categories.includes(entry.category));
    if (!group.length) continue;
    out.push(`## ${family.title}`, '', family.intro, '');
    for (const entry of group) out.push(entryText(entry, ++index, compiled, cases, counts.get(entry.id)));
  }
  return `${out.join('\n').trimEnd()}\n`;
}

/** The totals that open each reference file, and how the entries below are ordered. */
function measuredSection(language, patterns) {
  const tally = (field, value) => patterns.filter((p) => p[field] === value).length;
  return [
    '## What was measured',
    '',
    `${patterns.length} entries: ${tally('precision', 'high')} high and ${tally('precision', 'medium')} medium; ` +
      `${tally('domain', 'general')} general and ${tally('domain', 'product')} product. ` +
      `By evidence: ${tally('evidence', 'corpus')} corpus, ${tally('evidence', 'imitation')} imitation, ${tally('evidence', 'reasoning')} reasoning.`,
    '',
    'Share of texts with a high hit, with a medium hit, flagged by the rule with all entries, flagged with the general entries only, ' +
      'and flagged with the general entries outside the structure category, per corpus (from `eval/summary.txt`):',
    '',
    '```',
    summaryTable(language),
    '```',
    '',
    'Each entry below says how many texts it fired on, from `eval/counts.csv`. Human texts are all human corpora together. ' +
      'Independent machine texts are every machine corpus except the imitation set, which was written with the list in view and overstates recall.',
    '',
    'Entries are grouped by the families of the English humanizer rulebook. Within a family they are ordered strongest first: high before medium; ' +
      'then entries seen in independent machine text, then those seen only in the imitations, then those backed by reasoning alone; ' +
      'then the ones that fired on more independent machine text and on less human text.',
    '',
    'Each entry starts with its level, its domain (general: safe on any prose; product: only on product copy), its category and its evidence.',
    '',
  ];
}

/** Every generated file: Map(path inside the skill folder -> content). */
export function skillFiles() {
  const files = new Map();
  files.set('scripts/matcher.mjs', readFileSync(join(ROOT, 'src', 'matcher.mjs'), 'utf8'));
  for (const language of languages()) {
    files.set(`lists/${language}.json`, readFileSync(join(languageDir(language), 'patterns.json'), 'utf8'));
    files.set(`references/${language}.md`, reference(language));
  }
  return files;
}

// Folders whose every file is generated: anything else in them is stray.
const GENERATED_DIRS = ['lists', 'references'];

/** Files in the generated folders of `skillDir` that the build would not write. */
export function strayFiles(files = skillFiles(), skillDir = SKILL_DIR) {
  const expected = new Set(files.keys());
  return GENERATED_DIRS.flatMap((dir) =>
    existsSync(join(skillDir, dir)) ? readdirSync(join(skillDir, dir)).map((name) => `${dir}/${name}`) : [],
  ).filter((path) => !expected.has(path));
}

/** Paths inside `skillDir` whose file on disk differs from what the build would write, and stray files. */
export function staleFiles(files = skillFiles(), skillDir = SKILL_DIR) {
  const changed = [...files]
    .filter(([path, content]) => {
      const file = join(skillDir, path);
      return !existsSync(file) || readFileSync(file, 'utf8') !== content;
    })
    .map(([path]) => path);
  return [...changed, ...strayFiles(files, skillDir).map((path) => `${path} (stray)`)];
}

function build(files) {
  for (const path of strayFiles(files)) {
    rmSync(join(SKILL_DIR, path), { recursive: true, force: true });
    console.log(`removed stray ${path}`);
  }
  for (const [path, content] of files) {
    const file = join(SKILL_DIR, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    console.log(`wrote ${relative(ROOT, file)}`);
  }
}

function main(argv) {
  const unknown = argv.filter((arg) => arg !== '--check');
  if (unknown.length) {
    console.error(`unknown argument: ${unknown.join(' ')}\nusage: node scripts/build-skill.mjs [--check]`);
    return 2;
  }
  const files = skillFiles();
  if (!argv.includes('--check')) {
    build(files);
    return 0;
  }
  const stale = staleFiles(files);
  if (stale.length) {
    console.error(`stale skill files, run node scripts/build-skill.mjs:\n  ${stale.join('\n  ')}`);
    return 1;
  }
  console.log('skill files are up to date');
  return 0;
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  process.exitCode = main(process.argv.slice(2));
}
