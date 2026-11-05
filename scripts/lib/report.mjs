// Text tables for the evaluation report: the per-genre, per-generator and
// per-style breakdowns of the machine corpora.

export const pct = (n, total) => (total ? `${((100 * n) / total).toFixed(1)}%` : '-');
export const wording = (t) => `${pct(t.flaggedWording, t.texts)} (${t.flaggedWording})`;

/** Rows as aligned text: the first `labels` columns to the left, numbers to the right. */
export function table(head, rows, labels = 1) {
  const widths = head.map((h, i) => Math.max(h.length, ...rows.map((row) => row[i].length)));
  const line = (cells) => cells.map((cell, i) => (i < labels ? cell.padEnd(widths[i]) : cell.padStart(widths[i]))).join('  ').trimEnd();
  return [line(head), ...rows.map(line)];
}

// The per-document labels each machine corpus is broken down by, with the table title.
// A corpus with a single generator or style is left out of that table: its one
// row would repeat the corpus row.
export const BREAKDOWNS = [
  { key: 'byGenre', label: 'genre', title: 'machine corpora by genre', min: 1 },
  { key: 'byGenerator', label: 'generator', title: 'machine corpora by generator', min: 2 },
  { key: 'byStyle', label: 'style', title: 'machine corpora by request style (A short, B careful)', min: 2 },
];

const breakdownHead = (label) => ['corpus', label, 'texts', 'flagged', 'flagged general', 'flagged wording'];

/** One row per label of each machine corpus whose lines carry that label. */
export const breakdownRows = (results, key) => {
  const { min } = BREAKDOWNS.find((b) => b.key === key);
  return results
    .filter((r) => r.side === 'ai' && (r[key]?.size ?? 0) >= min)
    .flatMap((r) => [...(r[key] ?? [])].map(([label, t]) => [r.name, label, String(t.texts), pct(t.flagged, t.texts), pct(t.flaggedGeneral, t.texts), wording(t)]));
};

/** Every breakdown table that has rows, each after a blank line and its title. */
export const breakdownTables = (results) =>
  BREAKDOWNS.flatMap(({ key, label, title }) => {
    const rows = breakdownRows(results, key);
    return rows.length ? ['', title, ...table(breakdownHead(label), rows, 2)] : [];
  });
