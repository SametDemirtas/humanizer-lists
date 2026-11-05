// Rebuilds the Dutch human corpora (eval/corpus-local/human-mc4-*.jsonl) from
// mC4. Each text is one paragraph (one line) of a crawled page.
//
//   node nl/eval/rebuild-human.mjs                 downloads 14 shards (about 1.1 GB) to nl/eval/.cache
//   node nl/eval/rebuild-human.mjs --shards DIR    uses shards already on disk, named as in the metadata

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuildFromMc4 } from '../../scripts/lib/mc4.mjs';

await rebuildFromMc4({
  evalDir: dirname(fileURLToPath(import.meta.url)),
  names: ['human-mc4-reviewed', 'human-mc4-wide', 'human-mc4-heldout'],
  extract: (page) => page.text.split('\n').map((line) => line.trim()).filter(Boolean),
});
