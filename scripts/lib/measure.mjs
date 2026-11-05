// How often a compiled list fires on a corpus, and what those counts say
// about each entry's evidence and domain.

import { findHits, isFlagged } from '../../src/matcher.mjs';

// "Wording" leaves out the structure category: Markdown headings and bold labels,
// emoji bullets, field labels, template slots and chat leftovers.
const WORDING_EXCLUDED = 'structure';

// The bar a general entry must stay within on every general human corpus: a share of texts.
export const GENERAL_BAR = { high: 0.001, medium: 0.01 };

// The genres of the machine corpora (scripts/general-requests.json, scripts/multi-requests.json), in report order.
export const GENRES = ['blog', 'email', 'essay', 'article', 'social', 'report', 'longform'];

/** The strings a corpus line is matched on: its "fields", or its "text". */
const textsOf = (doc) => (doc.fields ? Object.values(doc.fields).filter((v) => typeof v === 'string') : [doc.text ?? '']);

/**
 * Which of the counted outcomes one document reaches, given the hits of each
 * of its fields. A document is flagged when one field is flagged on its own,
 * as the skill's check script flags each field separately.
 */
function outcomes(fieldHits, general) {
  const hits = fieldHits.flat();
  const anyField = (keep) => fieldHits.some((field) => isFlagged(field.filter(keep)));
  const isGeneral = (hit) => general.has(hit.id);
  return {
    anyHigh: hits.some((hit) => hit.precision === 'high'),
    anyMedium: hits.some((hit) => hit.precision === 'medium'),
    flagged: anyField(() => true),
    flaggedGeneral: anyField(isGeneral),
    flaggedWording: anyField((hit) => isGeneral(hit) && hit.category !== WORDING_EXCLUDED),
  };
}

const emptyTally = () => ({ texts: 0, anyHigh: 0, anyMedium: 0, flagged: 0, flaggedGeneral: 0, flaggedWording: 0 });

function add(tally, reached) {
  tally.texts++;
  for (const [key, yes] of Object.entries(reached)) if (yes) tally[key]++;
}

const increment = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);

/** Genres in report order: the known ones first, then any others alphabetically. */
const genreOrder = (a, b) =>
  (GENRES.includes(a) ? GENRES.indexOf(a) : GENRES.length) - (GENRES.includes(b) ? GENRES.indexOf(b) : GENRES.length) ||
  a.localeCompare(b);

/** Adds `reached` to the tally of `key` in `map`, when the document carries a string there. */
function addTo(map, key, reached) {
  if (typeof key !== 'string') return;
  if (!map.has(key)) map.set(key, emptyTally());
  add(map.get(key), reached);
}

/**
 * Counts over `docs`: texts reaching each outcome, texts per entry id and per
 * category, and the same outcomes per "genre", per "generator" and per "style"
 * for documents that carry one. `general` is the set of entry ids whose domain is general.
 */
export function measure(compiled, docs, general) {
  const total = emptyTally();
  const byGenre = new Map();
  const byGenerator = new Map();
  const byStyle = new Map();
  const perPattern = new Map();
  const perCategory = new Map();
  for (const doc of docs) {
    const fieldHits = textsOf(doc).map((text) => findHits(compiled, text));
    const hits = fieldHits.flat();
    const reached = outcomes(fieldHits, general);
    add(total, reached);
    addTo(byGenre, doc.genre, reached);
    addTo(byGenerator, doc.generator, reached);
    addTo(byStyle, doc.style, reached);
    for (const id of new Set(hits.map((hit) => hit.id))) increment(perPattern, id);
    for (const category of new Set(hits.map((hit) => hit.category))) increment(perCategory, category);
  }
  const sorted = (map, order) => new Map([...map].sort(([a], [b]) => order(a, b)));
  const alphabetical = (a, b) => a.localeCompare(b);
  return {
    ...total,
    byGenre: sorted(byGenre, genreOrder),
    byGenerator: sorted(byGenerator, alphabetical),
    byStyle: sorted(byStyle, alphabetical),
    perPattern,
    perCategory,
  };
}

const hitsOf = (result, id) => result.perPattern.get(id) ?? 0;

/** A corpus role as stored in sources.json ("held out", "sanity check"), spaces and hyphens alike. */
const roleOf = (corpus) => String(corpus.role ?? '').trim().toLowerCase().replace(/[\s-]+/g, ' ');

/** Held-out corpora are measured and reported, never used to decide an entry's evidence or domain. */
export const isHeldOut = (corpus) => roleOf(corpus) === 'held out';

/** The imitation set: machine text written with the list in view. */
export const isImitation = (corpus) => roleOf(corpus) === 'sanity check';

/** The evidence an entry's counts give: independent machine text, the imitation set, or none. Held-out corpora do not count. */
export function evidenceOf(id, results) {
  const machine = results.filter((r) => r.side === 'ai' && !isHeldOut(r));
  if (machine.some((r) => !isImitation(r) && hitsOf(r, id) > 0)) return 'corpus';
  return machine.some((r) => hitsOf(r, id) > 0) ? 'imitation' : 'reasoning';
}

/** The domain an entry's counts give: general when it stays within its bar on every general human corpus that is not held out. */
export function domainOf(entry, results) {
  const general = results.filter((r) => r.side === 'human' && r.domain === 'general' && !isHeldOut(r));
  return general.every((r) => hitsOf(r, entry.id) / r.texts <= GENERAL_BAR[entry.precision]) ? 'general' : 'product';
}

/**
 * Entries above their bar on a human product corpus, held-out ones included:
 * { entry, over: [{ name, heldOut, hits, texts }] } with every such corpus, highest rate first.
 */
export function overTheBar(patterns, results) {
  const product = results.filter((r) => r.side === 'human' && r.domain === 'product');
  return patterns.flatMap((entry) => {
    const over = product
      .map((r) => ({ name: r.name, heldOut: isHeldOut(r), hits: hitsOf(r, entry.id), texts: r.texts }))
      .filter((r) => r.hits / r.texts > GENERAL_BAR[entry.precision])
      .sort((a, b) => b.hits / b.texts - a.hits / a.texts);
    return over.length ? [{ entry, over }] : [];
  });
}
