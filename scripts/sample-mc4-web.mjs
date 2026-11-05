#!/usr/bin/env node
// Draws a general web sample from one mC4 validation shard on disk and writes
// its metadata to <lang>/eval/corpus/<name>.meta.jsonl (and the texts to
// corpus-local/). Run once per corpus; afterwards <lang>/eval/rebuild-web.mjs
// rebuilds the texts from the metadata.
//
//   node scripts/sample-mc4-web.mjs <lang> <shard file> <name>:<count> [<name>:<count> ...] [--exclude-known] [--url REGEX]
//
// A page qualifies when its prose (scripts/lib/prose.mjs) has 40 to 1,200
// words and neither URL nor text contains a spam keyword. --exclude-known
// skips URLs that already appear in any metadata file of the language, and
// --url REGEX keeps only pages whose URL matches. The
// sample is a seeded shuffle (seed 42) of the qualifying pages; the corpora
// take consecutive, non-overlapping slices of it in the order given.

import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { readJsonLines } from './lib/json.mjs';
import { languageDir } from './lib/languages.mjs';
import { gzipJsonLines } from './lib/mc4.mjs';
import { proseOf, wordCount } from './lib/prose.mjs';
import { sha256 } from './lib/hash.mjs';

const USAGE = 'usage: node scripts/sample-mc4-web.mjs <lang> <shard file> <name>:<count> [...] [--exclude-known] [--url REGEX]';
const usageError = (message) => {
  console.error(message ? `${message}\n${USAGE}` : USAGE);
  process.exit(2);
};
const [language, shardFile, ...rest] = process.argv.slice(2);
if (!language || !shardFile || !rest.some((arg) => /^[^-].*:\d+$/.test(arg))) usageError();
const urlArg = rest.indexOf('--url');
if (urlArg >= 0 && (rest[urlArg + 1] === undefined || rest[urlArg + 1].startsWith('--'))) usageError('--url needs a value');
const urlFilter = urlArg >= 0 ? new RegExp(rest.splice(urlArg, 2)[1]) : null;
const wanted = rest.filter((arg) => !arg.startsWith('--')).map((arg) => arg.split(':')).map(([name, count]) => ({ name, count: Number(count) }));
const SPAM = /casino|porn|sex|viagra|cialis|escort|xxx|poker|scommess|apuesta|gokken|dating|incontri|citas/i;
const evalDir = join(languageDir(language), 'eval');

const known = new Set();
if (process.argv.includes('--exclude-known')) {
  for (const file of readdirSync(join(evalDir, 'corpus')).filter((f) => f.endsWith('.meta.jsonl'))) {
    for (const row of readJsonLines(join(evalDir, 'corpus', file))) known.add(row.url);
  }
}

const pages = [];
for await (const page of gzipJsonLines(shardFile)) {
  if (known.has(page.url) || SPAM.test(page.url) || (urlFilter && !urlFilter.test(page.url))) continue;
  const text = proseOf(language, page);
  const words = wordCount(text);
  if (words < 40 || words > 1200 || SPAM.test(text)) continue;
  pages.push({ url: page.url, date: page.timestamp, text, words });
}

// mulberry32, seed 42
let seed = 42;
const random = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
for (let i = pages.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [pages[i], pages[j]] = [pages[j], pages[i]];
}
const shard = `multilingual/${basename(shardFile)}`;
mkdirSync(join(evalDir, 'corpus-local'), { recursive: true });
let start = 0;
for (const { name, count } of wanted) {
  const chosen = pages.slice(start, start + count);
  start += count;
  const meta = chosen.map((page, i) => ({ id: `${name}-${String(i).padStart(4, '0')}`, url: page.url, date: page.date, shard, sha256: sha256(page.text), words: page.words }));
  writeFileSync(join(evalDir, 'corpus', `${name}.meta.jsonl`), meta.map((row) => JSON.stringify(row)).join('\n') + '\n');
  writeFileSync(join(evalDir, 'corpus-local', `${name}.jsonl`), chosen.map((page, i) => JSON.stringify({ id: meta[i].id, url: page.url, date: page.date, text: page.text })).join('\n') + '\n');
  console.log(`${language} ${name}: ${chosen.length} texts`);
}
console.log(`${language}: ${pages.length} qualifying pages in the shard`);
