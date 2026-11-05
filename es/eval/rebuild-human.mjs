// Rebuilds the Spanish human corpus (eval/corpus-local/human-shops.jsonl) from
// the Wayback Machine snapshots listed in eval/corpus/human-shops.meta.jsonl.
// The shop texts belong to the shops, so the repository ships only URL,
// snapshot, date and SHA-256. Pages are parsed as text and never run.
//
//   node es/eval/rebuild-human.mjs [out.jsonl]
//   LIMIT=10 node es/eval/rebuild-human.mjs     only the first 10 snapshots
//
// One request at a time with a pause, to be polite to archive.org; about 15
// minutes in all. Only texts whose SHA-256 matches the metadata are kept, so
// the corpus is exactly the one measured or a subset of it.

import { createWriteStream, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256 } from '../../scripts/lib/hash.mjs';
import { readJsonLines } from '../../scripts/lib/json.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? join(here, 'corpus-local', 'human-shops.jsonl');
mkdirSync(dirname(out), { recursive: true });

const rows = readJsonLines(join(here, 'corpus', 'human-shops.meta.jsonl'));

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const clean = (s) => decode(s
  .replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>|<\/div>/gi, '\n')
  .replace(/<li[^>]*>/gi, '\n- ')
  .replace(/<[^>]+>/g, ''))
  .replace(/[ \t\u00A0]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
const JUNK = /[{};]\s*$|^\s*[.#][\w-]+\s*\{|\/\*|\*\/|webkit|linear-gradient|Permalink|function\(|var |https?:\/\/\S+$/i;

/** The longest product description on the page: JSON-LD, description blocks or meta tags. */
function extract(html) {
  const candidates = [];
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1].trim());
      const objects = Array.isArray(data) ? data : (data['@graph'] ?? [data]);
      for (const o of objects) if (o && o['@type'] === 'Product' && o.description) candidates.push(clean(String(o.description)));
    } catch { /* broken JSON-LD on the page */ }
  }
  const blocks = [
    /<div[^>]+class="[^"]*(?:product-description|product__description|product-single__description|js-product-description|description user-content|product attribute description|std|rte)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi,
    /<div[^>]+itemprop="description"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]+class="[^"]*user-content[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
  ];
  for (const re of blocks) for (const m of html.matchAll(re)) { const t = clean(m[1]); if (t.length > 40) candidates.push(t); }
  for (const re of [/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i]) {
    const m = html.match(re);
    if (m) candidates.push(clean(m[1]));
  }
  const best = candidates.sort((a, b) => b.length - a.length)[0] ?? '';
  return best.split('\n').map((l) => l.trim()).filter((l) => l && !JUNK.test(l)).join('\n').trim();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSnapshot(snapshot) {
  const raw = snapshot.replace(/\/web\/(\d+)\//, '/web/$1id_/');
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(raw);
      if (response.ok) return await response.text();
    } catch { /* retried below */ }
    await sleep(5000 * attempt);
  }
  return null;
}

const stream = createWriteStream(out);
let same = 0, different = 0, failed = 0;
for (const row of rows.slice(0, Number(process.env.LIMIT) || rows.length)) {
  const html = await fetchSnapshot(row.snapshot);
  if (html === null) { failed++; continue; }
  const text = extract(html);
  if (sha256(text) !== row.sha256) {
    different++;
    continue;
  }
  same++;
  stream.write(JSON.stringify({ id: row.id, url: row.url, date: row.date, text }) + '\n');
  await sleep(1500);
}
stream.end();
console.log(`wrote ${out}: ${same} kept, ${different} dropped for a different hash, ${failed} not fetched`);
