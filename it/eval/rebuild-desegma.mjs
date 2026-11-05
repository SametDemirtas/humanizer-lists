// Rebuilds the DeSegMa-IT out-of-domain samples (eval/corpus-local/desegma-*.jsonl):
// 2,000 human and 2,000 machine-written news texts from the Subtask A training
// file of the EVALITA 2026 shared task. Its license is not stated, so the
// repository ships only the row numbers and hashes of the sample.
//
//   node it/eval/rebuild-desegma.mjs SUBTASK_A_TRAIN.csv
//
// Download the CSV (columns text,label; label 0 is human, 1 is machine) from
// https://desegma.github.io/data/ first.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from '../../scripts/lib/csv.mjs';
import { sha256 } from '../../scripts/lib/hash.mjs';
import { readJsonLines } from '../../scripts/lib/json.mjs';

const here = dirname(fileURLToPath(import.meta.url));
if (process.argv.length !== 3) {
  console.error('usage: node it/eval/rebuild-desegma.mjs SUBTASK_A_TRAIN.csv');
  process.exit(2);
}
const [header, ...rows] = parseCsv(readFileSync(process.argv[2], 'utf8'));
const textColumn = header.indexOf('text');

mkdirSync(join(here, 'corpus-local'), { recursive: true });
for (const name of ['desegma-human', 'desegma-machine']) {
  const meta = readJsonLines(join(here, 'corpus', `${name}.meta.jsonl`));
  const kept = meta.filter((m) => rows[m.row] && sha256(rows[m.row][textColumn]) === m.sha256);
  const lines = kept.map((m) => JSON.stringify({ id: m.id, text: rows[m.row][textColumn] }));
  writeFileSync(join(here, 'corpus-local', `${name}.jsonl`), lines.join('\n') + '\n');
  console.log(`${name}: ${kept.length} of ${meta.length} texts rebuilt`);
}
