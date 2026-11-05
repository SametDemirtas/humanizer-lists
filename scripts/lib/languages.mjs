import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** The language folders: every top-level folder with a patterns.json. */
export function languages() {
  return readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(ROOT, entry.name, 'patterns.json')))
    .map((entry) => entry.name)
    .sort();
}

export const languageDir = (language) => join(ROOT, language);
