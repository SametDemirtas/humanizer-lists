// Rebuilds the general web and news corpora (human-mc4-web, human-mc4-web-holdout, human-mc4-news) into eval/corpus-local/
// from one mC4 validation shard. Each text is the page's prose as defined in
// scripts/lib/prose.mjs, and is kept only when its SHA-256 matches the metadata.
//
//   node nl/eval/rebuild-web.mjs                 downloads the shard (about 30 MB) to nl/eval/.cache
//   node nl/eval/rebuild-web.mjs --shards DIR    uses a shard already on disk

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuildProse } from '../../scripts/lib/mc4.mjs';

await rebuildProse({
  evalDir: dirname(fileURLToPath(import.meta.url)),
  language: 'nl',
  names: ['human-mc4-web', 'human-mc4-web-holdout', 'human-mc4-news'],
});
