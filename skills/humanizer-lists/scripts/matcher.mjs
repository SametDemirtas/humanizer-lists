// Reference matcher for the humanizer lists. No dependencies, Node 18 or newer,
// and it runs unchanged in a browser.
//
// Matching rules, the same for every language:
//
// 1. Text and patterns are normalised by `normalize`: Unicode NFC, typographic
//    apostrophes (’ ‘ ´) become ', and no-break and other wide spaces become a plain
//    space. Unless the list sets "foldDiacritics": false, diacritics are then
//    dropped from each letter (é and è become e, ü becomes u), except the tilde
//    of ñ, which Spanish treats as a separate letter. Italian turns folding off
//    because its accents tell words apart (è "is" and e "and", sì and si).
//    Each character maps to exactly one character, so a match in the
//    normalised text has the same position and length in the NFC text.
// 2. Matching ignores case (flags `giu`).
// 3. `word` and `phrase` entries match whole words: they may not touch a letter
//    or digit on either side, and any run of whitespace in them matches any run
//    of whitespace in the text. In a phrase, `…` stands for 1 to 60 characters
//    within one sentence that start and end between words; a phrase may not
//    start or end with it, or hold two in a row.
// 4. `regex` entries are JavaScript regular expressions compiled with `giu`.
//    Their source is normalised like the text, so they may be written with or
//    without accents; a letter with diacritics must be written as itself, not
//    as a \u escape. When folding is on, a range in a character class may
//    not start or end with such a letter ([à-ü] would fold to [a-u]). Write
//    word boundaries as (?<![\p{L}\p{N}]) and (?![\p{L}\p{N}]); JavaScript's
//    \b only knows ASCII letters.
// 5. A text is flagged when at least one `high` pattern fires, or when `medium`
//    patterns fire from two or more independent entries. Entries whose hits
//    overlap anywhere in the same field are joined into one group, so two
//    entries that read the same words count once, wherever else they fire.
//
// Run patterns on each field (title, description) separately: some of them
// look at the start of the text or of a line.

const APOSTROPHES = /[\u2018\u2019\u00B4]/g;
const SPACES = /[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g;
const MARKS = /\p{M}/gu;
const TILDE_N = /^[nN]\u0303$/;

const foldChar = (char) => {
  const parts = char.normalize('NFD');
  if (TILDE_N.test(parts)) return char;
  const base = parts.replace(MARKS, '');
  return base.length === char.length ? base : char;
};

/** Text as patterns see it. Same length as `text.normalize('NFC')`. */
export function normalize(text, { foldDiacritics = true } = {}) {
  const plain = String(text).normalize('NFC').replace(APOSTROPHES, "'").replace(SPACES, ' ');
  return foldDiacritics ? plain.replace(/[^\p{ASCII}]/gu, foldChar) : plain;
}

const LETTER_BEFORE = String.raw`(?<![\p{L}\p{N}])`;
const LETTER_AFTER = String.raw`(?![\p{L}\p{N}])`;
// A gap of 1 to 60 characters within one sentence, starting and ending between words.
const GAP = String.raw`(?![\p{L}\p{N}])[^.!?\n]{1,60}?(?<![\p{L}\p{N}])`;
const ESCAPED_CHAR = /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g;
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

/** The regular expression source of one list entry. */
export function patternSource({ kind, match }, options) {
  const normal = normalize(match, options);
  if (kind === 'regex') return normal;
  const body = normal
    .split('…')
    .map((part) => escapeRegex(part.trim()).replace(/\s+/g, String.raw`\s+`))
    .join(GAP);
  return LETTER_BEFORE + body + LETTER_AFTER;
}

const KINDS = new Set(['word', 'phrase', 'regex']);

/**
 * The first character-class range in a regex source with an end that folding
 * changes, such as à-ü: folded, the range would cover different letters.
 */
function foldedRange(source) {
  const chars = [...source];
  let inClass = false;
  let previous = null;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === '\\') {
      const escaped = chars[++i];
      if ('pPu'.includes(escaped) && chars[i + 1] === '{') while (i < chars.length && chars[i] !== '}') i++;
      else if (escaped === 'u') i += 4;
      else if (escaped === 'x') i += 2;
      previous = null;
      continue;
    }
    if (!inClass) {
      if (char === '[') {
        inClass = true;
        previous = null;
        if (chars[i + 1] === '^') i++;
      }
      continue;
    }
    if (char === ']') {
      inClass = false;
      continue;
    }
    const end = chars[i + 1];
    if (char === '-' && previous !== null && end !== undefined && end !== ']' && end !== '\\') {
      if (foldChar(previous) !== previous || foldChar(end) !== end) return `${previous}-${end}`;
      i++;
      previous = null;
      continue;
    }
    previous = char;
  }
  return null;
}

function problemWith(entry, options) {
  const { kind, match } = entry;
  if (!KINDS.has(kind) || typeof match !== 'string' || !match.trim()) return 'has no usable kind and match';
  if (kind !== 'regex' && /^\s*…|…\s*$/.test(match)) return 'starts or ends with …';
  if (kind !== 'regex' && /…\s*…/.test(match)) return 'has two … in a row';
  if (kind === 'regex' && options.foldDiacritics) {
    for (const [, braced, four, two] of match.matchAll(ESCAPED_CHAR)) {
      const char = String.fromCodePoint(parseInt(braced ?? four ?? two, 16));
      if (foldChar(char) !== char) return `escapes ${char}; write the letter itself so it is folded like the text`;
    }
    const range = foldedRange(normalize(match, { foldDiacritics: false }));
    if (range) return `has the range [${range}], whose ends change when diacritics are folded; list the letters instead`;
  }
  return null;
}

/** Compiles a parsed patterns.json. Throws on an entry that cannot be matched. */
export function compileList(list) {
  if (!list || typeof list.language !== 'string' || !Array.isArray(list.patterns)) {
    throw new Error('expected { language, patterns: [...] }');
  }
  const options = { foldDiacritics: list.foldDiacritics !== false };
  const patterns = list.patterns.map((entry) => {
    const problem = problemWith(entry, options);
    const name = `${list.language}: entry ${JSON.stringify(entry.id)}`;
    if (problem) throw new Error(`${name} ${problem}`);
    try {
      return { ...entry, regex: new RegExp(patternSource(entry, options), 'giu') };
    } catch (error) {
      throw new SyntaxError(`${name}: ${error.message}`);
    }
  });
  return { language: list.language, options, patterns };
}

/**
 * Every match of the list's patterns in `text`: { id, category, precision,
 * match, index }, where `match` and `index` refer to `text.normalize('NFC')`.
 * A regex match of no characters points at nothing and is left out.
 */
export function findHits(compiled, text) {
  const original = String(text).normalize('NFC');
  const normal = normalize(original, compiled.options);
  const hits = [];
  for (const { id, category, precision, regex } of compiled.patterns) {
    for (const found of normal.matchAll(regex)) {
      if (!found[0]) continue;
      const match = original.slice(found.index, found.index + found[0].length);
      hits.push({ id, category, precision, match, index: found.index });
    }
  }
  return hits;
}

const overlap = (a, b) =>
  a.field === b.field && a.index < b.index + b.match.length && b.index < a.index + a.match.length;

/**
 * The flag rule: one high hit, or medium hits from at least two groups of
 * entries. Entries whose hits overlap anywhere (in the same field) are joined
 * into one group, so two entries that read the same words count once even
 * when they also fire together elsewhere. Hits from several fields may carry
 * a `field` to keep them apart.
 */
export function isFlagged(hits) {
  if (hits.some((hit) => hit.precision === 'high')) return true;
  const medium = hits.filter((hit) => hit.precision === 'medium');
  const group = new Map(medium.map((hit) => [hit.id, hit.id]));
  const root = (id) => (group.get(id) === id ? id : root(group.get(id)));
  medium.forEach((a, i) => {
    for (const b of medium.slice(i + 1)) if (a.id !== b.id && overlap(a, b)) group.set(root(a.id), root(b.id));
  });
  return new Set([...group.keys()].map(root)).size >= 2;
}
