// Rebuilds the general web corpus (human-mc4-web-holdout) into eval/corpus-local/
// from one mC4 validation shard. Each text is the page's prose as defined in
// scripts/lib/prose.mjs, and is kept only when its SHA-256 matches the metadata.
//
//   node it/eval/rebuild-web.mjs                 downloads the shard (about 30 MB) to it/eval/.cache
//   node it/eval/rebuild-web.mjs --shards DIR    uses a shard already on disk

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuildProse } from '../../scripts/lib/mc4.mjs';

await rebuildProse({
  evalDir: dirname(fileURLToPath(import.meta.url)),
  language: 'it',
  names: ['human-mc4-web-holdout'],
});
