// <lang>/eval/counts.csv: one row per entry (id, category, precision), one
// column per corpus headed "<name> (n=<texts>)", each cell the number of texts
// the entry fired on. Ids, categories and corpus names never hold commas.

import { readFileSync, writeFileSync } from 'node:fs';

const COLUMN = /^(.+) \(n=(\d+)\)$/;

/** counts.csv as { columns: [{ name, n }], rows: Map(id -> [count per column]) }. */
export function readCounts(file) {
  const [head, ...lines] = readFileSync(file, 'utf8').trim().split('\n');
  const columns = head
    .split(',')
    .slice(3)
    .map((cell) => {
      const [, name, n] = cell.match(COLUMN) ?? [];
      if (!name) throw new Error(`${file}: unexpected column ${cell}`);
      return { name, n: Number(n) };
    });
  const rows = new Map(
    lines.map((line) => {
      const cells = line.split(',');
      return [cells[0], cells.slice(3).map(Number)];
    }),
  );
  return { columns, rows };
}

/** Writes the counts of `patterns` measured on `results` ({ name, texts, perPattern }). */
export function writeCounts(file, patterns, results) {
  const head = ['id', 'category', 'precision', ...results.map((r) => `${r.name} (n=${r.texts})`)];
  const rows = patterns.map((p) => [p.id, p.category, p.precision, ...results.map((r) => String(r.perPattern.get(p.id) ?? 0))]);
  writeFileSync(file, [head, ...rows].map((row) => row.join(',')).join('\n') + '\n');
}
