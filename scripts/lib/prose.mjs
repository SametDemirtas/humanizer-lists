// The prose filter for the general web corpora (human-mc4-web*): the paragraphs
// of a page that read as running text, joined by line breaks. Italian
// human-mc4-web was built with this filter first; Spanish, Dutch and German
// reuse it with their own function words.

const STOP_WORDS = Object.fromEntries(
  Object.entries({
    it: 'il lo la i gli le un uno una di a da in con su per tra fra e o ma che non è sono del della dei delle al alla ai alle nel nella si ci ne come più anche questo questa',
    es: 'el la los las un una unos unas de a en con por para y o pero que no es son del al se lo le su sus como más este esta también muy',
    nl: 'de het een en of maar dat die in op met voor van te is zijn er niet ook als aan bij om naar dit deze je we ik',
    de: 'der die das den dem des ein eine einen einem einer und oder aber dass in im an am auf mit für von zu zum zur ist sind nicht auch als bei aus nach wie es sich wir ich sie er man noch nur so wenn',
  }).map(([language, words]) => [language, new Set(words.split(' '))]),
);
// German capitalises every noun, so running German prose has far more capitalised words.
const MAX_CAPITALISED = { de: 0.45 };
const EDGE_PUNCTUATION = /^[.,;:!?()"']+|[.,;:!?()"']+$/g;
// Whitespace as Python's str.split() sees it, which the original filter used.
const WHITESPACE = /[\t-\r\x1C-\x20\x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/;

export const wordCount = (text) => text.split(WHITESPACE).filter(Boolean).length;

/** A paragraph of running text: enough words, enough function words, few capitals. */
export function isProse(language, paragraph, minWords = 12) {
  const stopWords = STOP_WORDS[language];
  if (!stopWords) throw new Error(`no function words for "${language}"`);
  const words = paragraph.split(WHITESPACE).filter(Boolean);
  if (words.length < minWords) return false;
  const stop = words.filter((word) => stopWords.has(word.toLowerCase().replace(EDGE_PUNCTUATION, ''))).length;
  if (stop / words.length < 0.22) return false;
  const capitalised = words.slice(1).filter((word) => /^\p{Uppercase}/u.test(word)).length;
  if (capitalised / words.length > (MAX_CAPITALISED[language] ?? 0.2)) return false;
  return paragraph.split('|').length <= 2;
}

/** The prose of an mC4 page. */
export const proseOf = (language, page) => page.text.split('\n').filter((p) => isProse(language, p)).join('\n');
