// Rebuilds human corpora from the public mC4 shards.
//
// mC4 page text belongs to the sites it was crawled from, so the repository
// ships only one metadata line per text (eval/corpus/<name>.meta.jsonl with
// id, url, date, shard and sha256). This module downloads the shards named
// there from huggingface.co/datasets/allenai/c4 (ODC-BY 1.0), finds each page
// by URL, asks `extract` for the candidate texts of that page and keeps the
// one whose SHA-256 matches. The texts go to eval/corpus-local/, which git
// ignores. Shards are only read as data.

import { createReadStream, createWriteStream, existsSync, mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { basename, join } from 'node:path';
import { sha256 } from './hash.mjs';
import { readJsonLines } from './json.mjs';
import { proseOf } from './prose.mjs';

// The dataset revision the metadata was taken from, so later changes to mC4 cannot move the texts.
const BASE = 'https://huggingface.co/datasets/allenai/c4/resolve/1588ec454efa1a09f29cd18ddd04fe05fc8653a2/';

/** Downloads to `file`.part first, so an interrupted download never looks complete. */
async function download(shard, file) {
  console.log(`downloading ${shard}`);
  const response = await fetch(BASE + shard);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${shard}`);
  await pipeline(Readable.fromWeb(response.body), createWriteStream(`${file}.part`));
  renameSync(`${file}.part`, file);
}

/** The JSON objects of a gzipped JSON Lines file, such as an mC4 shard, read as a stream. */
export async function* gzipJsonLines(file) {
  const lines = createInterface({ input: createReadStream(file).pipe(createGunzip()), crlfDelay: Infinity });
  for await (const line of lines) if (line) yield JSON.parse(line);
}

function shardDirOf(argv, evalDir) {
  if (!argv.includes('--shards')) return join(evalDir, '.cache');
  const dir = argv[argv.indexOf('--shards') + 1];
  if (!dir || dir.startsWith('--')) throw new Error('--shards needs a folder');
  return dir;
}

/**
 * Rebuilds the named corpora of one language.
 * `extract(page)` returns the candidate texts of an mC4 page ({ url, text, timestamp }).
 * Command-line option `--shards DIR` reads shards already on disk (default: eval/.cache).
 */
export async function rebuildFromMc4({ evalDir, names, extract, argv = process.argv.slice(2) }) {
  const shardDir = shardDirOf(argv, evalDir);
  const sets = names.map((name) => ({ name, rows: readJsonLines(join(evalDir, 'corpus', `${name}.meta.jsonl`)) }));
  const wanted = new Map();
  for (const { rows } of sets) {
    for (const row of rows) wanted.set(row.url, [...(wanted.get(row.url) ?? []), row]);
  }
  const shards = [...new Set(sets.flatMap(({ rows }) => rows.map((row) => row.shard)))].sort();
  const found = new Map();
  mkdirSync(shardDir, { recursive: true });
  for (const shard of shards) {
    const file = join(shardDir, basename(shard));
    if (!existsSync(file)) await download(shard, file);
    console.log(`scanning ${basename(shard)}`);
    for await (const page of gzipJsonLines(file)) {
      const rows = wanted.get(page.url);
      if (!rows) continue;
      const candidates = new Map(extract(page).map((text) => [sha256(text), text]));
      for (const row of rows) if (candidates.has(row.sha256)) found.set(row.id, candidates.get(row.sha256));
    }
  }
  const outDir = join(evalDir, 'corpus-local');
  mkdirSync(outDir, { recursive: true });
  for (const { name, rows } of sets) {
    const kept = rows.filter((row) => found.has(row.id));
    const lines = kept.map((row) => JSON.stringify({ id: row.id, url: row.url, date: row.date, text: found.get(row.id) }));
    writeFileSync(join(outDir, `${name}.jsonl`), lines.join('\n') + '\n');
    console.log(`${name}: ${kept.length} of ${rows.length} texts rebuilt`);
  }
}

/** Rebuilds corpora whose texts are the prose of each page (scripts/lib/prose.mjs). */
export const rebuildProse = ({ evalDir, language, names }) =>
  rebuildFromMc4({ evalDir, names, extract: (page) => [proseOf(language, page)] });
