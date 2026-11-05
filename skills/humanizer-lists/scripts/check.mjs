#!/usr/bin/env node
// Checks Italian, Spanish, Dutch or German text against the measured lists and prints
// each flagged sentence with the entry id, level, matched words and reason.
//
//   node scripts/check.mjs <lang> <file|-> [--product] [--json]
//
// <lang> is the name of a list in ../lists/ (de, es, it, nl). The input is plain
// text, or a JSON object such as {"title": "...", "description": "..."} whose
// string fields are checked separately; fields that are not strings are
// skipped. By default only entries whose domain is "general" run; --product
// adds the entries that are precise only on product copy.
//
// Exit codes: 0 no field flagged, 1 a field flagged, 2 usage error (unknown
// language or flag, missing or extra argument, unreadable file), 3 internal
// error. Requires Node 18 or newer.
//
// The lists and the matcher are read from this skill's own folder
// (../lists/<lang>.json and ./matcher.mjs), so the skill works on its own.

import { existsSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileList, findHits, isFlagged } from './matcher.mjs';

const SKILL_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const compiledCache = new Map();
const FLAGS = new Set(['--product', '--json']);

/** The languages with a list in ../lists/. */
export function languages() {
  return readdirSync(join(SKILL_DIR, 'lists'))
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.slice(0, -'.json'.length))
    .sort();
}

function compiled(language, product) {
  const key = `${language}:${product}`;
  if (!compiledCache.has(key)) {
    const file = join(SKILL_DIR, 'lists', `${language}.json`);
    if (!existsSync(file)) throw new Error(`no list for "${language}"; expected one of ${languages().join(', ')}`);
    const list = JSON.parse(readFileSync(file, 'utf8'));
    if (!product) list.patterns = list.patterns.filter((entry) => entry.domain === 'general');
    const result = compileList(list);
    result.why = new Map(list.patterns.map((entry) => [entry.id, entry.why]));
    compiledCache.set(key, result);
  }
  return compiledCache.get(key);
}

/** The input as named fields: the string fields of a JSON object, or the whole text as one field. */
export function fieldsOf(input) {
  const trimmed = input.trim();
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      const fields = Object.entries(parsed).filter(([, value]) => typeof value === 'string');
      if (fields.length) return fields;
    } catch {
      // plain text that happens to start with a brace
    }
  }
  return [['text', input]];
}

// Sentence ends as the matcher's … gap sees them: . ! ? and line breaks (not the ellipsis character).
const BOUNDARY = /[.!?\n]/;
const LEADING = /^[.!?\s]+/;
// Punctuation a regex may include before the words it points at, left out when the words are shown.
const SHOWN = /^[.!?…:\s]+/;

/** The sentence around a hit, in the NFC text. A hit that starts at the previous sentence's end is moved past it. */
function sentenceAt(text, index, length) {
  const skip = text.slice(index, index + length).match(LEADING)?.[0].length ?? 0;
  index += skip;
  length -= skip;
  let start = index;
  while (start > 0 && !BOUNDARY.test(text[start - 1])) start--;
  let end = index + length;
  while (end < text.length && !BOUNDARY.test(text[end])) end++;
  if (end < text.length && text[end] !== '\n') end++;
  return text.slice(start, end).trim();
}

/**
 * Checks one input. Returns [{ field, flagged, hits: [{ id, precision, category, match, index, why, sentence }] }],
 * where `index` is the position of `match` in the field's NFC text.
 */
export function check(language, input, { product = false } = {}) {
  const list = compiled(language, product);
  return fieldsOf(input).map(([field, value]) => {
    const text = String(value).normalize('NFC');
    const hits = findHits(list, text).map((hit) => ({
      id: hit.id,
      precision: hit.precision,
      category: hit.category,
      match: hit.match,
      index: hit.index,
      why: list.why.get(hit.id),
      sentence: sentenceAt(text, hit.index, hit.match.length),
    }));
    return { field, flagged: isFlagged(hits), hits };
  });
}

function report(language, results, product) {
  const lines = [`${language}: ${product ? 'all entries (product copy)' : 'general entries'}`];
  for (const { field, flagged, hits } of results) {
    const medium = new Set(hits.filter((hit) => hit.precision === 'medium').map((hit) => hit.id));
    const high = hits.filter((hit) => hit.precision === 'high').length;
    const summary = hits.length ? `${high} high hit${high === 1 ? '' : 's'}, medium hits from ${medium.size} entr${medium.size === 1 ? 'y' : 'ies'}` : 'no hits';
    lines.push('', `[${field}] ${flagged ? 'FLAGGED' : 'not flagged'} (${summary})`);
    if (!hits.length) continue;
    if (!flagged) lines.push('  Medium hits from a single entry, or from entries reading the same words, do not flag the text. Judge them against the guide.');
    const bySentence = new Map();
    for (const hit of hits) bySentence.set(hit.sentence, [...(bySentence.get(hit.sentence) ?? []), hit]);
    for (const [sentence, group] of bySentence) {
      lines.push(`  > ${sentence.replace(/\s+/g, ' ')}`);
      const explained = new Set();
      for (const hit of group) {
        lines.push(`    ${hit.precision.padEnd(6)} ${hit.id}  "${hit.match.replace(SHOWN, '').replace(/\s+/g, ' ').trim()}"`);
        if (!explained.has(hit.id)) lines.push(`           ${hit.why}`);
        explained.add(hit.id);
      }
    }
  }
  return lines.join('\n');
}

function main(argv) {
  const args = argv.filter((arg) => !arg.startsWith('--'));
  const unknown = argv.filter((arg) => arg.startsWith('--') && !FLAGS.has(arg));
  const product = argv.includes('--product');
  const [language, source] = args;
  const known = languages();
  if (unknown.length || args.length !== 2 || !known.includes(language)) {
    if (unknown.length) console.error(`unknown option: ${unknown.join(' ')}`);
    else if (args.length > 2) console.error(`too many arguments: ${args.slice(2).join(' ')}`);
    else if (language && !known.includes(language)) console.error(`no list for "${language}"`);
    console.error(`usage: node scripts/check.mjs <${known.join('|')}> <file|-> [--product] [--json]`);
    return 2;
  }
  let input;
  try {
    input = source === '-' ? readFileSync(0, 'utf8') : readFileSync(source, 'utf8');
  } catch (error) {
    console.error(`cannot read ${source}: ${error.message}`);
    return 2;
  }
  const results = check(language, input, { product });
  console.log(argv.includes('--json') ? JSON.stringify({ language, product, results }, null, 2) : report(language, results, product));
  return results.some((result) => result.flagged) ? 1 : 0;
}

// Run as a script (paths compared after resolving symlinks, as in ~/.claude/skills or /tmp on macOS).
const invoked = process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
if (invoked) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    console.error(`internal error: ${error.stack ?? error}`);
    process.exitCode = 3;
  }
}
