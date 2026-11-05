// Rebuilds the German human corpora (human-mc4-web, human-mc4-web-holdout,
// human-mc4-news, human-mc4-shop, human-mc4-shop-holdout) into eval/corpus-local/
// from four mC4 validation shards. Each text is the page's prose as defined in
// scripts/lib/prose.mjs, and is kept only when its SHA-256 matches the metadata.
//
//   node de/eval/rebuild-web.mjs                 downloads the shards (about 135 MB) to de/eval/.cache
//   node de/eval/rebuild-web.mjs --shards DIR    uses shards already on disk

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuildProse } from '../../scripts/lib/mc4.mjs';

await rebuildProse({
  evalDir: dirname(fileURLToPath(import.meta.url)),
  language: 'de',
  names: ['human-mc4-web', 'human-mc4-web-holdout', 'human-mc4-news', 'human-mc4-shop', 'human-mc4-shop-holdout'],
});
