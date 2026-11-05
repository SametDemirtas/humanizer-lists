import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { compileList, findHits, isFlagged, normalize, patternSource } from '../src/matcher.mjs';

const entry = (match, kind = 'phrase', precision = 'high', id = 'xx-a') => ({ id, kind, match, category: 'hype', precision });
const list = (patterns, extra = {}) => compileList({ language: 'xx', version: 1, patterns, ...extra });
const matches = (compiled, text) => findHits(compiled, text).map((hit) => hit.match);

describe('normalize', () => {
  it('drops diacritics but keeps ñ', () => {
    assert.equal(normalize('Créée für Año ÑANDÚ'), 'Creee fur Año ÑANDU');
  });

  it('keeps diacritics when a list turns folding off', () => {
    assert.equal(normalize('perché è così', { foldDiacritics: false }), 'perché è così');
  });

  it('straightens apostrophes (not ʼ or `) and plain-spaces wide spaces', () => {
    const text = 'l’amore d‘estate it´s ok';
    assert.equal(normalize(text), "l'amore d'estate it's ok");
    assert.equal(normalize(text).length, text.length);
  });

  it('composes decomposed letters first', () => {
    assert.equal(normalize('café'), 'cafe');
  });

  it('keeps one character per character, outside Latin too', () => {
    for (const text of ['한국어 ✨ 🐱 ΐ Привет', 'ﬁ ẞ ǅ']) assert.equal(normalize(text).length, text.normalize('NFC').length);
  });
});

describe('patternSource', () => {
  it('turns a phrase into whole words with flexible spacing and a gap for …', () => {
    assert.equal(
      patternSource({ kind: 'phrase', match: 'no solo … sino' }),
      String.raw`(?<![\p{L}\p{N}])no\s+solo(?![\p{L}\p{N}])[^.!?\n]{1,60}?(?<![\p{L}\p{N}])sino(?![\p{L}\p{N}])`,
    );
  });

  it('normalises a regex like the text', () => {
    assert.equal(patternSource({ kind: 'regex', match: 'decoración' }), 'decoracion');
  });
});

describe('findHits', () => {
  it('matches whole words only, across accents and case', () => {
    const compiled = list([entry('toque de magia')]);
    assert.deepEqual(matches(compiled, 'Un TOQUE DE MÁGIA. Retoque de magia.'), ['TOQUE DE MÁGIA']);
  });

  it('treats ñ as its own letter', () => {
    const compiled = list([entry('año', 'word')]);
    assert.deepEqual(matches(compiled, 'Feliz año, ano.'), ['año']);
  });

  it('respects letter boundaries next to accented letters', () => {
    const compiled = list([entry('tocco', 'word')]);
    assert.deepEqual(matches(compiled, 'ritoccò, tocco'), ['tocco']);
  });

  it('runs regexes with the u flag and reports positions in the original text', () => {
    const compiled = list([entry(String.raw`\p{Extended_Pictographic}`, 'regex')]);
    assert.deepEqual(findHits(compiled, 'Taza ✨'), [{ id: 'xx-a', category: 'hype', precision: 'high', match: '✨', index: 5 }]);
  });

  it('keeps accents significant for a list that asks for it', () => {
    const compiled = list([entry(String.raw`(?<![\p{L}])è\s+uno\s+stile`, 'regex')], { foldDiacritics: false });
    assert.deepEqual(matches(compiled, 'È uno stile. E uno stile.'), ['È uno stile']);
  });

  it('only bridges a gap between whole words', () => {
    const compiled = list([entry('no solo … sino'), entry('not just … but', 'phrase', 'high', 'xx-b')]);
    assert.deepEqual(matches(compiled, 'No solo para el casino, sino para casa.'), ['No solo para el casino, sino']);
    assert.deepEqual(matches(compiled, 'No solomillo ni sino.'), []);
    assert.deepEqual(matches(compiled, 'It is not just pretty: my debut print.'), []);
  });

  it('leaves out regex matches of no characters', () => {
    const compiled = list([entry(String.raw`Ciao!|(?=Ciao)`, 'regex')]);
    assert.deepEqual(findHits(compiled, 'Ciao, Ciao!').map((hit) => [hit.match, hit.index]), [['Ciao!', 6]]);
  });

  it('refuses an entry it cannot match', () => {
    assert.throws(() => list([{ ...entry('x'), kind: 'glob' }]), /xx-a/);
    assert.throws(() => list([entry('(', 'regex')]), SyntaxError);
    assert.throws(() => list([entry('(', 'regex')]), /xx: entry "xx-a"/);
    assert.throws(() => list([entry('no … … sino')]), /two … in a row/);
    assert.throws(() => list([entry('… sino')]), /starts or ends with …/);
    assert.throws(() => list([entry('no solo …')]), /starts or ends with …/);
    assert.throws(() => list([entry(String.raw`decoraci\u00f3n`, 'regex')]), /write the letter itself/);
    assert.doesNotThrow(() => list([entry(String.raw`decoraci\u00f3n`, 'regex')], { foldDiacritics: false }));
  });

  it('refuses a character-class range whose ends folding would change', () => {
    assert.throws(() => list([entry('[à-ü]+', 'regex')]), /range \[à-ü\]/);
    assert.throws(() => list([entry('x[^a-é]', 'regex')]), /range \[a-é\]/);
    assert.throws(() => list([entry(String.raw`[\u00e0-z]`, 'regex')]), /write the letter itself/);
    assert.doesNotThrow(() => list([entry('[à-ü]+', 'regex')], { foldDiacritics: false }));
    assert.doesNotThrow(() => list([entry('[a-zàèéìòù-]+', 'regex')]));
    assert.doesNotThrow(() => list([entry('[a-zñ]', 'regex')]));
    assert.doesNotThrow(() => list([entry(String.raw`[\p{L}-]+ è-ü`, 'regex')]));
    assert.doesNotThrow(() => list([entry(String.raw`[\--z]`, 'regex')]));
  });
});

describe('isFlagged', () => {
  const hit = (id, precision, index = 0) => ({ id, precision, index, match: 'twelve chars' });

  it('flags one high hit', () => {
    assert.equal(isFlagged([hit('a', 'high')]), true);
  });

  it('flags medium hits only from two different entries on separate words', () => {
    assert.equal(isFlagged([hit('a', 'medium', 0), hit('a', 'medium', 20)]), false);
    assert.equal(isFlagged([hit('a', 'medium', 0), hit('b', 'medium', 20)]), true);
    assert.equal(isFlagged([hit('a', 'medium', 0), hit('b', 'medium', 3)]), false);
    assert.equal(isFlagged([{ ...hit('a', 'medium', 0), field: 0 }, { ...hit('b', 'medium', 0), field: 1 }]), true);
    assert.equal(isFlagged([]), false);
  });

  it('counts entries that overlap anywhere in a field as one group', () => {
    const at = (id, index) => hit(id, 'medium', index);
    assert.equal(isFlagged([at('a', 0), at('b', 0), at('a', 20), at('b', 20)]), false);
    assert.equal(isFlagged([at('a', 0), at('b', 3), at('b', 40), at('c', 80)]), true);
    assert.equal(isFlagged([at('a', 0), at('b', 3), at('b', 40), at('c', 43)]), false);
  });
});
