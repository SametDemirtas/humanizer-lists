import { readFileSync } from 'node:fs';

export const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));

/** The objects of a JSON Lines file; blank lines are skipped. */
export const readJsonLines = (file) =>
  readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
