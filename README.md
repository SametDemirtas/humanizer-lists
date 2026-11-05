# humanizer-lists

A humanizer skill for Italian, Spanish, Dutch and German. It rewrites text that reads as machine-written so it reads like the person sending it: Etsy and shop listings, emails, blog and social posts, essays, articles and reports. It keeps what the text says and adds nothing the text does not give.

It works the way [blader/humanizer](https://github.com/blader/humanizer) works for English, with a rewriting guide written for each language. A measured list of tells and a small checker help with one step of the rewrite. It does not judge who wrote a text: a clean check says nothing about authorship, and neither does a flag.

Contents:

- [What it does](#what-it-does), [Install](#install), [Use it](#use-it)
- [Before and after](#before-and-after): one Etsy listing per language
- [The rewriting guides](#the-rewriting-guides) and [how they relate to the English humanizer](#how-it-relates-to-the-english-humanizer)
- [The measured lists and checker](#the-measured-lists-and-checker), with the full report in [docs/measurements.md](docs/measurements.md)
- [Repository layout](#repository-layout), [Tests and evaluation](#tests-and-evaluation), [Contributing](#contributing), [License](#license)

## What it does

Give the skill a text, or the path to a file. It:

1. Reads the rewriting guide for the text's language.
2. Runs the checker, which finds chat leftovers, Markdown, unfilled placeholders and stock phrases.
3. Reads the whole text against the guide and marks the patterns a phrase list cannot see: a contrast nobody proposed, a closing line that repeats the paragraph, ideas in threes, inflated claims, English marketing calques, bold labels on a text that needs none.
4. Lists every fact in the source: for a product, each material, finish, size, use, care instruction and shipping detail.
5. Drafts a rewrite of the whole text. Every supported claim stays. Chat lines addressed to the person who asked for the text go. Placeholders such as `[data]` or `[Datum]` stay in place until you supply the facts.
6. Checks the draft against that list, so no fact is dropped or added, and runs the checker again.
7. Writes the final version, stating each point plainly instead of patching flagged phrases one at a time.

It keeps your register (tu or Lei, tú, vos or usted, je or u, du or Sie) and regional usage such as Rioplatense voseo, Flemish, or Swiss ss for ß. If you give a sample of your writing, it matches that.

## Install

The skill is the folder `skills/humanizer-lists/`. It carries its own copy of the checker and the lists, so it works when copied on its own.

Claude Code, for all projects (or copy it into `.claude/skills/` inside one project):

```
cp -r skills/humanizer-lists ~/.claude/skills/
```

With the Skills CLI:

```
npx skills add SametDemirtas/humanizer-lists
```

Claude.ai or Claude Desktop: zip the `humanizer-lists` folder and upload the zip as a skill in Settings.

The checker needs Node 18 or newer. Without Node the skill still rewrites from the guide.

## Use it

Ask in the language of the text or in English, or call `/humanizer-lists` with the text:

- "Rendi più naturale questa descrizione per il mio negozio Etsy."
- "Riscrivi questa email ai colleghi perché non sembri scritta da ChatGPT."
- "Haz que este correo suene menos a IA."
- "Reescribe este post de Instagram para que suene como yo."
- "Laat deze productbeschrijving minder als AI klinken."
- "Herschrijf dit LinkedIn-bericht zodat het natuurlijk leest."
- "Lass diese E-Mail weniger nach KI klingen."
- "Überarbeite meinen Blogbeitrag, ohne am Inhalt etwas zu ändern."
- "Humanize this German product description."

For pasted text you get a short list of the tells it found, the rewrite, and the open questions: facts the text needs that you did not give, and placeholders left to fill. When you name a file, it writes the rewrite to that file, keeps its structure, sums up what changed and lists the open questions. When another task uses the skill, for example writing a listing, it returns only the final text.

## Before and after

Four Etsy listings. Claude Sonnet 5.5 (`claude-sonnet-5-5`) wrote each one from the one-line request shown, with no system prompt. Claude Opus 5.5 (`claude-opus-5-5`) then rewrote it with `SKILL.md` and the language's guide as the system prompt, without tools, asked to return only the final text. The excerpts below show the same part of each listing. The full Sonnet listings also had a title, tags, shipping notes and a closing offer from the assistant to adjust the text; the rewrite deleted the offer.

The skill tells the model to list every fact in the source before it drafts and to check the draft against that list. All four rewrites keep every concrete fact (material, size, finish, uses, care); sales adjectives were cut. The checker, run afterwards on both versions, flagged all four originals and none of the rewrites.

### Italian

Request: "Scrivi titolo e descrizione per il mio negozio Etsy: tazza in ceramica bianca da 350 ml con illustrazione di un gatto arancione che dorme, lavabile in lavastoviglie."

Before (Claude Sonnet 5.5):

```
Questa tazza in ceramica bianca da 350 ml è dedicata a chi ama i gatti e i momenti di calma. L'illustrazione di un morbido gatto arancione che dorme accompagna la tua colazione, la pausa caffè o la tisana della sera.

**✨ Caratteristiche**
• Ceramica bianca di buona qualità, con finitura lucida
• Capacità: 350 ml, ideale per caffè lungo, tè, cappuccino o cioccolata calda
• Illustrazione originale di un gatto arancione che dorme
• Lavabile in lavastoviglie, per un uso quotidiano senza pensieri
• [Aggiungi qui se è adatta al microonde, sì o no]
```

After (the skill, Claude Opus 5.5):

```
Tazza in ceramica bianca da 350 ml con l'illustrazione di un gatto arancione che dorme.

Va bene per un caffè lungo, un tè, un cappuccino o una cioccolata calda, a colazione o la sera con una tisana.

Dettagli:
- Ceramica bianca con finitura lucida
- Capacità: 350 ml
- Altezza: [__] cm, diametro: [__] cm
- Lavabile in lavastoviglie
- Adatta al microonde: [sì / no]
```

The height and diameter line comes from the "Dimensioni" section further down the original listing, where both values were placeholders too.

### Spanish

Request: "Escribe el título y la descripción para mi tienda de Etsy: manta polar de 150x200 cm con estampado de limones, lavable a 30 grados."

Before (Claude Sonnet 5.5):

```
Esta manta polar con estampado de limones es perfecta para quienes buscan comodidad, color y un detalle diferente para la decoración. Su tacto suave y su tamaño generoso la convierten en la compañera ideal para tardes de sofá, noches de cine o mañanas tranquilas con un café.

**✨ Características**
- Medidas: 150 x 200 cm
- Tejido polar suave y cálido
- Estampado alegre de limones
- Ideal para sofá, cama, sillón o como manta de viaje
- Lavable a máquina a 30 °C
```

After (the skill, Claude Opus 5.5):

```
Manta polar con estampado de limones, de 150 x 200 cm. El tejido es suave y abriga. Sirve para el sofá, la cama o un sillón, y también para llevar de viaje.

Medidas: 150 x 200 cm
Tejido: polar
Lavado: a máquina, a 30 °C
```

### Dutch

Request: "Schrijf een titel en beschrijving voor mijn Etsy-winkel: hoesje voor de iPhone 15 met een aquarel van tulpen, mat afgewerkt."

Before (Claude Sonnet 5.5):

```
**Draag de lente altijd bij je 🌷**

Geef je iPhone 15 een zachte, bloemrijke look met dit hoesje met een aquarel van tulpen. De kleuren lopen vloeiend in elkaar, precies zoals bij een echt aquarelschilderij. Dankzij de matte afwerking oogt het hoesje rustig en elegant, en het voelt prettig aan in je hand.

**Waarom je dit hoesje mooi gaat vinden**
- 🌷 Origineel aquarelontwerp met tulpen
- ✨ Matte afwerking: geen glimmende vingerafdrukken en een luxe uitstraling
- 📱 Speciaal gemaakt voor de **iPhone 15** (past niet op andere modellen)
- 🛡️ Beschermt je telefoon tegen krasjes en dagelijks gebruik
```

After (the skill, Claude Opus 5.5):

```
Hoesje voor de iPhone 15 met een origineel aquarelontwerp van tulpen. De kleuren lopen in elkaar over, zoals bij een echt aquarelschilderij. Het hoesje is mat afgewerkt. Het oogt rustig, je ziet er geen glimmende vingerafdrukken op en het voelt prettig in je hand.

Het hoesje is gemaakt voor de iPhone 15 en past niet op andere modellen. Het beschermt je telefoon tegen krasjes en dagelijks gebruik.
```

### German

Request: "Schreib Titel und Beschreibung für meinen Etsy-Shop: Poster im Format A3 mit einer Strichzeichnung der Alpen, gedruckt auf 200-g-Papier, ohne Rahmen."

Before (Claude Sonnet 5.5):

```
**Die Alpen als feine Strichzeichnung für dein Zuhause** 🏔️

Dieses Poster zeigt die Alpen in einer reduzierten Line-Art-Illustration. Mit wenigen klaren Linien entsteht ein ruhiges, modernes Motiv, das in jeden Raum passt, ob Wohnzimmer, Schlafzimmer, Flur oder Büro.

**Produktdetails**
- Format: A3 (29,7 × 42 cm)
- Motiv: Alpen als Strichzeichnung
- Papier: hochwertiges 200-g-Papier
- Lieferung ohne Rahmen
```

After (the skill, Claude Opus 5.5):

```
Die Alpen als Strichzeichnung: ein reduziertes Motiv aus wenigen klaren Linien, im Format A3. Es passt zu skandinavischer oder moderner Einrichtung, im Wohnzimmer genauso wie im Flur oder im Büro. Ein schönes Geschenk für Wanderer, Bergfans und Skifahrer.

Format: A3 (29,7 × 42 cm)
Motiv: Alpen als Strichzeichnung
Papier: 200 g
Rahmen: nicht im Lieferumfang. Das Poster passt in einen handelsüblichen A3-Rahmen.
```

The line about Scandinavian and modern interiors, the gift line and the note about standard frames come from further down the original listing.

## The rewriting guides

Each language has a guide in `skills/humanizer-lists/guides/`, drafted with Claude for that language from its measured notes and development texts: [Italian](skills/humanizer-lists/guides/it.md), [Spanish](skills/humanizer-lists/guides/es.md), [Dutch](skills/humanizer-lists/guides/nl.md) and [German](skills/humanizer-lists/guides/de.md).

A guide follows the English humanizer's families of patterns. For each pattern it shows how the pattern looks in that language, with a Before and an After, and says when to leave it alone. It also covers what English rules get wrong for that language: punctuation, register, calques of English marketing phrases, and habits that look like tells in English but are ordinary there. Each guide ends with two worked examples, a product listing and an email.

Two kinds of evidence sit behind the advice. Some of it is measured on the repository's corpora, with the rates given. The rest is an editor's judgment about patterns the corpora cannot measure, such as headings or subject lines, and the guides say which is which.

What each language treats differently, in short:

- Italian: "Inoltre" and "Infine" are ordinary in school essays, and "non solo… ma anche" in all prose. The em dash is rare outside product copy. Watch for "eleva il tuo", "un tocco di", "perfetto per chi ama", and a mix of tu and Lei.
- Spanish: the raya (em dash) for an aside and "Además" are ordinary; "cabe destacar" and "En resumen" are normal in Latin American news. Watch for "sumérgete en", "hacer una diferencia", ✨ bullets, and a mix of tú and vos.
- Dutch: the em dash and the serial comma read as English. Compounds are one word. Watch for "til je … naar een hoger niveau", "duik in", and English Title Case.
- German: the spaced en dash is ordinary German punctuation and „…“ are the quotes. Watch for "Mein Fazit", "macht einen Unterschied", Nominalstil, an opening „ closed with ", and the assistant's offer to adjust the text.

## How it relates to the English humanizer

[blader/humanizer](https://github.com/blader/humanizer) is a rulebook for rewriting English: families of tells such as false contrasts, staged openers, forced triads and chat leftovers, with Before and After examples, applied by the model's judgment. This skill takes the same approach and the same families to Italian, Spanish, Dutch and German.

The English rules do not carry over word for word. Some tells exist only in one language, such as English marketing phrases translated literally into Dutch or German. Some English rules would damage the text: the Spanish raya and the German spaced en dash are correct punctuation, and "non solo… ma anche" is ordinary Italian. So each language has its own rules, and its own measured list of phrases.

For English text, use the English humanizer.

## The measured lists and checker

Under the guides sit measured lists of tells, one per language, and a dependency-free checker that runs them. The skill uses the checker as one step of the rewrite. They also work on their own: `node scripts/check.mjs it post.txt` from the skill folder, or `import { compileList, findHits, isFlagged } from 'humanizer-lists'` as a library.

The checker finds what people forget to delete when they paste model output: Markdown, bold labels, unfilled placeholders and chat lines. It also knows a set of stock phrases that models use and people rarely do. On two machine corpora per language that were generated after the lists were final and measured once, with the general entries the checker runs by default:

| | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| Plain requests (254 texts), flagged | 98.8% | 86.6% | 97.6% | 96.1% |
| Plain requests, flagged wording | 19.3% | 12.6% | 3.5% | 2.4% |
| Detailed requests (448 texts), flagged | 91.3% | 83.3% | 93.1% | 95.3% |
| Detailed requests, flagged wording | 2.7% | 1.3% | 1.3% | 2.7% |
| Held-out human web pages (1,000), flagged | 0.4% | 0.2% | 0.3% | 0.0% |

Almost all of the flags come from leftovers. "Flagged wording" leaves those out and shows what the stock phrases catch on their own, which is little. That is why the skill rewrites the whole text from the guide.

[docs/measurements.md](docs/measurements.md) has the full report: results by genre, model and request style, false flags on human text, the checker's options and library use, how an entry is graded, the corpora and how they were made, the limitations, the matching rules and the file format.

## Repository layout

```
src/matcher.mjs                   the matcher
schema/                           JSON Schemas for patterns.json and cases.json
docs/measurements.md              the measurement report: results, grading, corpora, limitations, matching rules, file format
skills/humanizer-lists/           the Claude skill (SKILL.md, guides/ and scripts/check.mjs by hand, the rest generated)
skills/humanizer-lists/guides/    the rewriting guide per language: it.md, es.md, nl.md, de.md
test/                             npm test: matcher, lists, human genres, evaluation and skill
test/human-genres.test.mjs        fails if any text in <lang>/tests/human-genres.json is flagged
scripts/evaluate.mjs              npm run eval: hit rates per corpus, genre, generator and style; evidence and domain checks
scripts/build-skill.mjs           npm run build:skill: regenerates the skill's lists, matcher and references
scripts/sample-mc4-web.mjs        draws the general web, news and shop samples from an mC4 shard
scripts/generate-api.mjs          builds ai-multi-holdout and ai-detailed-holdout through the OpenAI and Anthropic APIs
scripts/multi-requests.json       the plain requests behind ai-multi-holdout, per language
scripts/detailed-scenarios.md     the 56 scenarios behind ai-detailed-holdout, in English
scripts/detailed-requests/        the short (A) and careful (B) requests per language
scripts/generate-general.mjs      regenerates ai-general and ai-general-holdout with the Claude Code CLI
scripts/general-requests*.json    the plain requests behind them, per language
scripts/lib/measure.mjs           hit counting, the flag rule per corpus, genre, generator and style; evidence and domain from development counts
scripts/lib/counts.mjs            reads and writes counts.csv
scripts/lib/json.mjs              reads JSON and JSON Lines
scripts/lib/mc4.mjs               rebuilds mC4 corpora from their metadata and checks hashes
scripts/lib/prose.mjs             the prose filter for mC4 pages, with function words per language
scripts/lib/                      also the schema validator, language discovery, CSV and hash helpers
it/ es/ nl/ de/                   one folder per language:
  patterns.json                   the list
  skill-notes.md                  language notes for the skill's reference file
  README.md                       method and results, in the language and in English
  tests/cases.json                extra test cases
  tests/human-genres.json         ordinary human texts in many genres that must not be flagged
  eval/sources.json               what each corpus is, its domain, role, dates, source and license
  eval/corpus/                    texts the repository may ship, and metadata (URL, date, SHA-256) for the rest
  eval/rebuild-*.mjs              scripts that fetch third-party texts and check their hashes
  eval/counts.csv                 hits per entry and corpus
  eval/summary.txt                output of the last full evaluation
```

## Tests and evaluation

```
npm test                             # schemas, examples, rewrites, false positives, test cases, human genres, corpus descriptions, evaluation, the skill
npm run eval                         # hit rates on every corpus on disk
node scripts/evaluate.mjs --check    # fails when the corpora on disk disagree with counts.csv or summary.txt
npm run build:skill                  # after changing a list, the matcher or a skill-notes.md file
```

`npm test` fails when the skill's generated files are out of date, so the lists exist in one place and the skill always carries the current copy.

Third-party human text is not in the repository. Only the generated corpora and openly licensed machine text are. `npm run eval` reports the missing corpora with the command that rebuilds each one into `<lang>/eval/corpus-local/` (ignored by git); the rebuilt texts are checked against their SHA-256 hashes, and a text whose hash differs is dropped. Downloads are pinned to the dataset revision that was measured. `node scripts/evaluate.mjs <lang> --write` then refreshes the counts; it refuses to write while a corpus is missing or while an entry's evidence or domain disagrees with the new counts. `scripts/evaluate.mjs` exits with 0 when done, 1 when a check fails or `--write` is refused, and 2 on a usage error. CI runs the tests, the skill build check and the evaluation check on Node 18, 20 and 22, once per pull request and once per push to `main`. Never commit `corpus-local/`: AuTexTification is CC BY-NC-SA and the mC4, Wayback Machine and DeSegMa-IT texts belong to others. `.gitignore` excludes it, and a test fails if `package.json` would publish it.

## Contributing

New entries, new evidence and new languages are welcome. A new entry needs an example, a rewrite, false positives and numbers on human and machine text, and must keep `test/human-genres.test.mjs` passing. Machine text from models other than Claude, and pre-2022 human emails, essays and blog posts, would help most. `CONTRIBUTING.md` has the steps, with German as the worked example of adding a language.

## License

MIT, see `LICENSE`. The API-generated corpora are model outputs released here under MIT as the repository's own data. The redistributed CLIN33 (CC BY 4.0) and UltraChat 200k Dutch (Apache-2.0) texts keep their licenses, and the metadata derived from mC4 is under ODC-BY 1.0. `NOTICE.md` lists every source and its terms. The way of working and the structure of the skill follow the English rulebook of [blader/humanizer](https://github.com/blader/humanizer) (MIT).
