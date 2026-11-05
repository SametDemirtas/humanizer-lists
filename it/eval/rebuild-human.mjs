// Rebuilds the Italian human corpora (eval/corpus-local/human-mc4-*.jsonl)
// from mC4. Each text is the page's prose: the paragraphs that pass the filter
// in scripts/lib/prose.mjs, joined by line breaks.
//
//   node it/eval/rebuild-human.mjs                 downloads 15 shards (about 2.4 GB) to it/eval/.cache
//   node it/eval/rebuild-human.mjs --shards DIR    uses shards already on disk, named as in the metadata

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rebuildFromMc4 } from '../../scripts/lib/mc4.mjs';
import { isProse } from '../../scripts/lib/prose.mjs';

// Product pages kept paragraphs of 15 or more words, the general web sample 12 or more.
const extract = (page) =>
  [15, 12].map((minWords) => page.text.split('\n').filter((p) => isProse('it', p, minWords)).join('\n'));

await rebuildFromMc4({
  evalDir: dirname(fileURLToPath(import.meta.url)),
  names: ['human-mc4-shop', 'human-mc4-shop-holdout', 'human-mc4-web'],
  extract,
});
