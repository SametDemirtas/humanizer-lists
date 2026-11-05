// Rebuilds the two AuTexTification 2023 control corpora (Spanish, subtask 1
// training set) in eval/corpus-local/. The data is CC BY-NC-SA 4.0, so the
// repository ships only the counts measured on it.
//
//   node es/eval/rebuild-autext.mjs              downloads train.tsv (13 MB) from Hugging Face
//   node es/eval/rebuild-autext.mjs FILE.tsv     uses a copy already on disk

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Pinned to the dataset revision the counts were measured on.
const URL =
  'https://huggingface.co/datasets/symanto/autextification2023/resolve/737e99bb54a938366b8b2be72db520ae97fac03d/data/train/subtask_1/es/train.tsv';
const here = dirname(fileURLToPath(import.meta.url));

async function readTsv() {
  if (process.argv[2]) return readFileSync(process.argv[2], 'utf8');
  const response = await fetch(URL);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${URL}`);
  return response.text();
}

const [header, ...rows] = (await readTsv()).split('\n').filter((line) => line.trim());
const columns = header.split('\t');
const at = (cells, name) => cells[columns.indexOf(name)];
const bySide = { human: [], generated: [] };
for (const row of rows) {
  const cells = row.split('\t');
  bySide[at(cells, 'label')].push(JSON.stringify({ id: `autext-${at(cells, 'id')}`, text: at(cells, 'text'), domain: at(cells, 'domain') }));
}
mkdirSync(join(here, 'corpus-local'), { recursive: true });
for (const [side, lines] of Object.entries(bySide)) {
  writeFileSync(join(here, 'corpus-local', `autext-${side}.jsonl`), lines.join('\n') + '\n');
  console.log(`autext-${side}: ${lines.length} texts`);
}
