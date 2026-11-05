# The measured lists and checker

This is the measurement report of [humanizer-lists](../README.md). Under the rewriting guides sit measured lists of tells, one per language, and a dependency-free checker that runs them. The skill uses the checker as one step of the rewrite. They also work on their own, from the command line or as a library.

Contents:

- [Results](#results): held-out machine text, by genre, by model and by request style, and false flags on human text
- [Run the checker](#run-the-checker) and [use it as a library](#use-it-as-a-library)
- [Why precision comes first](#why-precision-comes-first) and [how an entry is graded](#how-an-entry-is-graded)
- [Corpora](#corpora) and [full results](#full-results)
- [Limitations](#limitations)
- [Matching rules](#matching-rules) and [file format](#file-format)

Each entry is a pattern with the reason it reads as machine-written, an example it must match, a plain rewrite and ordinary sentences it must not match. Every entry was measured on human text written before November 2022 and on machine-written text.

The checker finds what people forget to delete when they paste model output: Markdown headings, bold labels, unfilled `[placeholders]`, and chat lines such as the line that introduces the draft or the assistant's offer to adapt it ("Se vuoi, posso adattarlo a un tono più formale"). It also knows a set of stock phrases that models use and people rarely do. It raises very few false alarms: at most about 0.4% of human web and news texts are flagged.

It does not catch model text that was well prompted and cleaned up, and it is not an authorship detector. A flag means there is something to fix. No flag does not mean a person wrote the text, and a flag does not prove a model did. That is why the skill rewrites the whole text from the guide instead of fixing only what the checker reports.

## Results

Two machine corpora per language were generated through the OpenAI and Anthropic APIs after the lists were final and measured once. Nothing in them was used to choose or tune an entry.

- Plain requests (`ai-multi-holdout`, 254 texts per language): one-line requests such as "write a blog post about…", in seven genres including a long article of about 800 words. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 wrote 56 texts each; GPT-5.5 wrote 6 and GPT-5.4 mini 24.
- Detailed requests (`ai-detailed-holdout`, 448 texts per language): 56 realistic scenarios with concrete facts, each asked twice, as a short request (style A) and a careful one with audience, tone, length and notes (style B). Many B requests ask for text that is ready to send or post. The four Claude models wrote 112 texts each.

No system prompt was sent. "Flagged" uses the general entries, which is what the checker runs by default. "Flagged wording" leaves out the `structure` category (Markdown, bold labels, placeholders and chat lines), so it shows what the stock phrases catch on their own.

| | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| Plain requests, flagged | 98.8% | 86.6% | 97.6% | 96.1% |
| Plain requests, flagged wording | 19.3% (49) | 12.6% (32) | 3.5% (9) | 2.4% (6) |
| Detailed requests, flagged | 91.3% | 83.3% | 93.1% | 95.3% |
| Detailed requests, flagged wording | 2.7% (12) | 1.3% (6) | 1.3% (6) | 2.7% (12) |
| Held-out human web pages, flagged | 0.4% (4 of 1,000) | 0.2% (2 of 1,000) | 0.3% (3 of 1,000) | 0.0% (0 of 1,000) |
| Genre test texts (model-drafted, used for narrowing), flagged | 0 of 61 | 0 of 74 | 0 of 82 | 0 of 65 |

Almost all of the flags come from leftovers. The models leave Markdown, bold labels, placeholders and closing offers in their replies even when the request asks for a text that is ready to send. With those removed, the stock phrases catch little: 2.4% to 19.3% of the plain texts and 1.3% to 2.7% of the detailed ones, which give the model concrete facts to write about.

### By genre

Flagged / flagged wording, in percent. Plain requests: 37 texts per genre and language, 32 for the long article. Detailed requests: 64 per genre and language.

| Plain requests | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| Blog post | 100 / 29.7 | 100 / 43.2 | 100 / 16.2 | 100 / 13.5 |
| Email to friends | 100 / 0.0 | 97.3 / 2.7 | 100 / 0.0 | 100 / 0.0 |
| Short essay | 94.6 / 35.1 | 67.6 / 2.7 | 94.6 / 0.0 | 86.5 / 0.0 |
| Local newspaper article | 100 / 24.3 | 78.4 / 0.0 | 100 / 0.0 | 100 / 2.7 |
| Instagram post | 97.3 / 2.7 | 78.4 / 32.4 | 97.3 / 2.7 | 94.6 / 0.0 |
| Short report | 100 / 10.8 | 86.5 / 0.0 | 91.9 / 0.0 | 91.9 / 0.0 |
| Long article (about 800 words) | 100 / 34.4 | 100 / 6.3 | 100 / 6.3 | 100 / 0.0 |

| Detailed requests | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| Blog post | 93.8 / 4.7 | 89.1 / 3.1 | 100 / 3.1 | 96.9 / 9.4 |
| Email | 89.1 / 0.0 | 81.3 / 0.0 | 85.9 / 0.0 | 93.8 / 0.0 |
| Essay | 92.2 / 7.8 | 87.5 / 0.0 | 92.2 / 4.7 | 100 / 1.6 |
| Article | 93.8 / 1.6 | 79.7 / 0.0 | 100 / 0.0 | 98.4 / 1.6 |
| Social post | 70.3 / 0.0 | 45.3 / 0.0 | 73.4 / 0.0 | 82.8 / 0.0 |
| Report | 100 / 0.0 | 100 / 0.0 | 100 / 0.0 | 96.9 / 0.0 |
| Long article | 100 / 4.7 | 100 / 6.3 | 100 / 1.6 | 98.4 / 6.3 |

Reports and long articles come with headings and are nearly always flagged. Social posts written from a detailed request are short, often without Markdown, and are flagged least. Wording hits gather in blog posts in every language, in Italian essays and articles, and in Spanish Instagram posts; blog and social posts often end with a question or a call to comment, and those are on the lists. Emails are almost never flagged on wording in any language.

### GPT and Claude

On the plain requests, the GPT texts are flagged less often than the Claude texts. The GPT sample is small, 30 texts per language (6 from GPT-5.5 on one topic, 24 from GPT-5.4 mini on four topics, no long articles), against 224 Claude texts, so it shows a direction only.

| Plain requests, flagged | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| GPT-5.5 and GPT-5.4 mini (30) | 90.0% (27) | 46.7% (14) | 83.3% (25) | 73.3% (22) |
| Four Claude models (224) | 100.0% (224) | 92.0% (206) | 99.6% (223) | 99.1% (222) |

On wording alone the picture differs by language: the Italian GPT texts are flagged on wording more often than the Claude texts (9 of 30 against 40 of 224), and in Spanish, Dutch and German they are flagged on wording at most once. Among the Claude models, Haiku 5.5 is flagged least in Spanish (75.0% on the plain requests); otherwise the four Claude models are within a few points of each other. The per-model rows are in `<lang>/eval/summary.txt`.

### Short and careful requests

Careful requests (style B) are flagged less often than short ones (style A), 224 texts each per language:

| Detailed requests, flagged | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| Short request (A) | 98.2% | 92.9% | 99.6% | 99.6% |
| Careful request (B) | 84.4% | 73.7% | 86.6% | 91.1% |

Many careful requests ask for a text that is ready to send, and fewer of those replies carry leftovers. Wording rates stay low in both styles (0.4% to 3.6%), and in German the careful requests are flagged on wording slightly more often (8 texts against 4).

### False flags on human text

The lists were built to keep these rare, for the reason given under [Why precision comes first](#why-precision-comes-first).

- Web and news: with the general entries, at most 0.4% of the human web pages and 0.1% of the human news texts are flagged in any language, on development and held-out sets alike (table under [Full results](#full-results)).
- Genres the web corpora barely cover: `<lang>/tests/human-genres.json` holds 282 ordinary texts across the four languages (61 Italian, 74 Spanish, 82 Dutch, 65 German): personal and business emails, chat messages, social and LinkedIn posts, school and club newsletters, school essays, minutes, reports, reviews, and regional variants such as Latin American Spanish, Flemish, Swiss and Austrian German. A language model (Claude) drafted them for this test; they were not written or collected from real writers. Many of them hold the sentences a review found flagged by earlier versions of the lists, and the entries were narrowed until none of them was flagged. `test/human-genres.test.mjs` fails if the general entries flag any of them (product texts in the file are checked with all entries). That none is flagged therefore holds by design: the test shows what the rule leaves alone, not a measured rate.

### Earlier held-out sets

Each language also has `ai-general-holdout`, 96 Claude Sonnet and Haiku texts in six genres, measured as held out in earlier versions. Those texts were read during the review rounds of 0.3.0, while entries were narrowed and removed, so they are no longer a clean held-out estimate. Their figures are in the full results below; the two new sets give the clean held-out numbers.

## Run the checker

The checker runs on its own from the skill folder. It needs Node 18 or newer:

```
node scripts/check.mjs it post.txt
node scripts/check.mjs es - < email.txt
node scripts/check.mjs nl listing.json --product    # {"title": "...", "description": "..."}
node scripts/check.mjs de - <<'EOF'
Wir treffen uns am Dienstag im Vereinsheim.

Wenn du möchtest, passe ich den Ton gern an.
EOF
```

The last command prints:

```
de: general entries

[text] FLAGGED (1 high hit, medium hits from 0 entries)
  > Wenn du möchtest, passe ich den Ton gern an.
    high   de-chat-anpassen  "Wenn du möchtest, passe ich"
           The assistant offers to rework the text it just wrote: another tone, a different version, the details filled in. The offer names the text itself (Text, Entwurf, Version, Fassung, Ton, Formulierung, Beschreibung, Platzhalter); an offer to do something else ("Wenn du willst, mache ich morgen den Einkauf") is not matched. It is addressed to the person who asked for the text and should never reach the reader. Development counts: 36 of 96 machine texts; none of 2,000 web pages, 814 news pages or 370 shop pages.
```

Exit codes: 0 not flagged, 1 flagged, 2 usage error (unknown language or option, missing or extra argument, unreadable file), 3 internal error. By default the checker runs only the general entries, which are precise on any prose. `--product` adds the entries that are precise only on product copy; use it for product titles and descriptions and nothing else. `--json` prints the hits as JSON. In a JSON input, fields that are not strings are skipped.

## Use it as a library

`src/matcher.mjs` has no dependencies and runs in Node 18 or newer and in browsers. The lists are exported as `humanizer-lists/it`, `humanizer-lists/es`, `humanizer-lists/nl` and `humanizer-lists/de`.

```js
import { createRequire } from 'node:module';
import { compileList, findHits, isFlagged } from 'humanizer-lists';

const require = createRequire(import.meta.url);
const list = structuredClone(require('humanizer-lists/it'));
// For prose that is not product copy, keep the general entries only.
list.patterns = list.patterns.filter((entry) => entry.domain === 'general');

const compiled = compileList(list);
const text = 'Il club si riunisce il martedì. Se vuoi, posso adattarlo a un tono più formale o più informale.';
const hits = findHits(compiled, text);

for (const hit of hits) console.log(hit.precision, hit.id, JSON.stringify(hit.match));
console.log(isFlagged(hits) ? 'flagged: ask for a rewrite' : 'not flagged');
```

```
high it-chat-offerta-tono "posso adattarlo a un tono"
flagged: ask for a rewrite
```

Run the patterns on each field (title, body) separately, since some look at the start of the text or a line. Each hit carries `id`, `category`, `precision`, `match` and `index`; `match` and `index` refer to the text after Unicode NFC normalisation, which leaves ordinary text unchanged.

## Why precision comes first

A flag tells a writer that their words read as if a machine wrote them. When that is wrong, it is an accusation, and people who write in a lively voice get it most. Missing a tell costs less, since a phrase list cannot catch sober model output anyway.

So phrases that people use often were dropped, even when models use them more. "Non solo… ma anche" and "niet alleen … maar ook" are on no list. Neither is the em dash in Spanish or the spaced en dash in German, because human writers in those languages use them all the time. The Italian em dash is on the list only as a product entry (`it-lineetta-em-dash`), which the default check leaves out, since human Italian news uses it more than machine news. The chat-leftover entries match only when the text talks about itself: an offer to change its tone or version, a note about its placeholders, a line that introduces the draft. An ordinary "Se vuoi, posso preparare io la torta" or "Wenn du willst, mache ich morgen den Einkauf" is left alone. Each language's `skill-notes.md` and the skill's reference files list the candidates that were measured and left out, with their numbers.

## How an entry is graded

Domain, and the human texts each entry is measured on:

- general: the entry stays within its level's bar on every general human development corpus (web pages, and news or similar text). It may run on any prose.
- product: the entry is precise on product copy but fires too often on general prose. "No solo… sino" is an example: rare in Spanish shop listings, but on 3.5% of general Spanish web pages. It runs only on product titles and descriptions.

Level, against the human corpora of the entry's domain:

- high: at most 0.1% of texts. One hit flags a text.
- medium: at most about 1% of texts, and clearly more common in machine text. A text is flagged only by medium hits from two or more entries that do not read the same words. Entries whose hits overlap anywhere in a field are merged into one group, and it takes two groups.

Evidence:

- corpus: the entry fired on independent machine text in a development corpus, meaning machine text that was not written with the list in view.
- imitation: it fired only on the imitation sets, which were generated for this project with the candidate patterns in view and overstate recall.
- reasoning: it fired on no development machine text and is kept because it is a clear chat leftover or calque and stays within its bar on the human texts of its domain.

Held-out corpora are measured and reported, and never decide an entry's evidence or domain (`scripts/lib/measure.mjs`). `node scripts/evaluate.mjs <lang> --write` refuses to write the counts, and exits with 1, when an entry's evidence or domain disagrees with them.

| | Italian (`it`) | Spanish (`es`) | Dutch (`nl`) | German (`de`) |
|---|---|---|---|---|
| Entries | 81 (11 high, 70 medium) | 83 (18 high, 65 medium) | 86 (14 high, 72 medium) | 21 (8 high, 13 medium) |
| Domain general / product | 79 / 2 | 78 / 5 | 83 / 3 | 21 / 0 |
| Evidence corpus / imitation / reasoning | 62 / 16 / 3 | 59 / 19 / 5 | 53 / 33 / 0 | 20 / 0 / 1 |
| Diacritics | kept | folded, ñ kept | folded | kept, ß kept |

On product copy, a few general entries go above their bar: `it-un-tocco-di` (2.6% of the held-out Italian shop pages, 1.9% of the development ones), `it-regalo-perfetto` and `it-senza-rinunciare` (1.1% of the development Italian shop pages each) and `es-no-esperes-mas` (1.1% of the Spanish shop descriptions). Three product entries also stay above 1% of their own product corpora as exceptions, documented in each language's `skill-notes.md`: `it-caporali` (2.6% of the held-out shop pages), `es-question-first` (2.2%) and `nl-serial-comma` (1.4% of the held-out webshop texts). They are all medium, so none of them flags a text alone. `summary.txt` lists these entries after each run.

German has no product entries: no independent machine product copy in German was available, so no product-only entry could be backed by machine text.

## Corpora

Human text. The mC4 and Wayback Machine texts are from before November 2022; the DeSegMa-IT and AuTexTification human texts are undated here.

| | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| General | 1,436 mC4 web pages plus 1,000 held out; 2,000 news articles (DeSegMa-IT) | 2,000 mC4 web pages plus 1,000 held out; 15,787 wiki, tweet and legal texts (AuTexTification 2023) | 2,000 mC4 web pages plus 1,000 held out; 599 mC4 pages from news sites | 2,000 mC4 web pages plus 1,000 held out; 814 mC4 pages from news sites |
| Product | 792 shop pages plus 346 held out (mC4) | 458 shop descriptions (Wayback Machine) | 2,805 webshop paragraphs, 269 checked by hand, 790 held out (mC4) | 370 shop pages plus 367 held out (mC4) |
| Genre test | 61 texts | 74 texts | 82 texts | 65 texts |

Machine text:

| | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| General, development | 96 Claude texts (`ai-general`); 2,000 machine news articles (DeSegMa-IT) | 96 Claude texts (`ai-general`); 16,275 base-model texts (AuTexTification: BLOOM, GPT-3, text-davinci-003) | 96 Claude texts (`ai-general`); 650 GPT-4 and Vicuna news, tweets, reviews and poems (CLIN33) | 96 Claude texts (`ai-general`) |
| General, held out | 254 plain (`ai-multi-holdout`), 448 detailed (`ai-detailed-holdout`), 96 earlier (`ai-general-holdout`) | same | same | same |
| Product | 200 Claude listings | 140 Claude listings (Sonnet, Haiku) | 8 GPT-4 product texts (UltraChat) | none |
| Imitation | 80 | 63 | 120 | none |

### How the API corpora were made

`ai-multi-holdout` and `ai-detailed-holdout` were made on 2026-11-05 by `scripts/generate-api.mjs`, through the OpenAI Chat Completions API and the Anthropic Messages and Message Batches APIs. No system prompt was sent, sampling was left at the provider defaults and replies could run to 16,000 tokens, so each model saw only the request. A reply that did not end normally or was shorter than 200 characters was not kept and was asked for again. The Claude rows were checked for the right language, personal data, refusals and duplicates. Each row records the generator, provider, resolved model id, the exact request and the stop reason; detailed rows also record the style and scenario.

- `ai-multi-holdout`: the requests are in `scripts/multi-requests.json`, seven genres times eight everyday topics per language, none of them used in another corpus. The four Claude models (`claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`, `claude-sonnet-4-5-20250929`) answered all 56. To keep the cost down, GPT-5.5 (`gpt-5.5-2026-04-23`) answered the six short genres on the first topic and GPT-5.4 mini (`gpt-5.4-mini-2026-03-17`) the six short genres on the first four topics.
- `ai-detailed-holdout`: `scripts/detailed-scenarios.md` outlines 56 scenarios, eight per genre, with the facts each request carries, such as the date of a farewell party or a half marathon time. `scripts/detailed-requests/<lang>.json` holds each scenario as a short request A and a careful request B, localised to the language's countries. These requests were written for the study by a model that did not see the pattern lists; names, places and contact details in them are invented. The four Claude models answered all 112 through the Message Batches API.

To make them again, set the API keys in the environment and run:

```
export OPENAI_API_KEY=...
export ANTHROPIC_API_KEY=...
node scripts/generate-api.mjs live it es           # plain requests, all six models
node scripts/generate-api.mjs batch build it es    # Claude requests still missing from both corpora
node scripts/generate-api.mjs batch submit         # send them through the Message Batches API
node scripts/generate-api.mjs batch status
node scripts/generate-api.mjs batch collect        # save the results into the corpora
```

Languages default to `de es it nl`. Rows already in a corpus are skipped, so an interrupted run resumes; move a corpus file away to generate it from scratch. `--work DIR` sets the folder for the batch files. The calls cost money, and new runs will not reproduce the shipped texts word for word.

### The other machine corpora

`ai-general` and `ai-general-holdout` are Claude Sonnet and Claude Haiku (resolved as `claude-sonnet-5-5` and `claude-haiku-5-5`) answering plain requests in six genres (blog post, email to colleagues, short essay, newspaper article, LinkedIn post, short report), eight everyday topics each, run through the Claude Code CLI by `scripts/generate-general.mjs`. The models saw no pattern list. Claude Code puts the account's email address in the model's context, and in the Italian, Spanish and Dutch development sets Sonnet signed 11 emails with the account owner's name; that name was replaced by a neutral one, and those rows say so. For `ai-general-holdout` and both German sets, the system prompt told the models to ignore any name or email in their context, and one Spanish reply that still used the name was discarded and requested again. The requests are in `scripts/general-requests.json` and `scripts/general-requests-holdout.json`. CLIN33's 100 generated opinion columns are left out because they make invented claims about real, named people.

Each language's `eval/sources.json` describes every corpus: what it is, its dates, source, license, and what the repository ships.

## Full results

Share of human texts flagged, with all entries / with the general entries:

| Corpus | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| General web, development | 0.3% / 0.1% | 1.7% / 0.1% | 0.8% / 0.3% | 0.1% / 0.1% |
| General web, held out | 0.7% / 0.4% | 1.7% / 0.2% | 0.7% / 0.3% | 0.0% / 0.0% |
| News or similar | 0.8% / 0.1% (news) | 0.0% / 0.0% (wiki, tweets, legal) | 0.5% / 0.0% (news sites) | 0.0% / 0.0% (news sites) |
| Product copy, development | 1.4% / 1.3% | 0.4% / 0.2% | 0.1% / 0.0% | 0.0% / 0.0% |
| Product copy, held out | 1.2% / 0.6% | no held-out set | 0.0% / 0.0% | 0.0% / 0.0% |

Run the general entries on general prose and all entries on product copy. The Spanish column shows why: with all entries, 1.7% of general Spanish web pages are flagged, mostly by "Cabe destacar" (12 development pages) and "En resumen" (10), which Spanish shop copy almost never uses and general Spanish prose uses often.

Share of machine texts flagged with the general entries, then on wording only:

| Corpus | Italian | Spanish | Dutch | German |
|---|---|---|---|---|
| `ai-general`, development | 95.8% / 26.0% | 93.8% / 19.8% | 100.0% / 22.9% | 95.8% / 19.8% |
| `ai-general-holdout`, read during review | 97.9% / 10.4% | 92.7% / 9.4% | 100.0% / 3.1% | 96.9% / 10.4% |
| `ai-multi-holdout`, held out | 98.8% / 19.3% | 86.6% / 12.6% | 97.6% / 3.5% | 96.1% / 2.4% |
| `ai-detailed-holdout`, held out | 91.3% / 2.7% | 83.3% / 1.3% | 93.1% / 1.3% | 95.3% / 2.7% |
| Other machine text | 8.9% / 7.8% (DeSegMa-IT news) | 0.0% / 0.0% (base models) | 7.7% / 7.7% (CLIN33) | none |

Several Italian wording entries were drawn from the DeSegMa-IT machine news and four Dutch ones from CLIN33, so those two rates are development figures too. The older base models in AuTexTification continue a text instead of answering a request, and they produce almost none of these tells.

On product copy, with all entries: 33.5% of the 200 Italian Claude listings, 20.0% of the 70 Spanish Sonnet listings and none of the 70 Haiku listings, and 3 of the 8 Dutch GPT-4 product texts.

The tables per corpus, genre, generator, request style, category and entry are in `<lang>/eval/summary.txt` and `<lang>/eval/counts.csv`, and in the skill's reference files.

## Limitations

- The machine side is mostly Claude. Of the held-out texts, 30 per language come from GPT models; the rest is Claude Opus, Sonnet and Haiku. Older independent machine text comes from DeSegMa-IT news, AuTexTification base models and CLIN33 (GPT-4 and Vicuna). Gemini, Llama and Mistral output is missing, and recall on it is unknown.
- The flag rates on machine text measure leftovers more than wording. A writer who deletes the Markdown and the closing offer leaves the checker with 1% to 3% of detailed-request texts to catch.
- Many entries rest on very few machine texts. Entries with `corpus` evidence that fired on only 1 to 3 development machine texts: Italian 21, Spanish 25, Dutch 25, German 5. Their evidence label is accurate, but it is thin.
- The general human corpora are web pages and news. Personal emails, essays and blog posts are a small part of them, and the genre test covers those genres only by design (see [False flags on human text](#false-flags-on-human-text)). For that reason the comment sign-offs and closing questions to readers are medium even where they fired on no human text.
- mC4 drops lines without end punctuation, so headings, bullets, subject lines and hashtag lines are barely testable on human text.
- The human product copy is general webshop copy. It covers furniture, fashion, cosmetics and stationery more than gifts, and none of it comes from marketplace listings. The German shop pages were picked by URL and not read by hand.
- Development sets were looked at while patterns were tightened, so their false-flag rates are optimistic. `ai-general-holdout` was read during the 0.3.0 review rounds. In 0.2.0 one Italian entry (`it-ecco-bozza`) was narrowed after a held-out hit, and in 0.1.0 two Dutch product candidates were dropped after the held-out run.
- The lists do not see forced triads, uniform sentence length, synonym rotation or Title Case (matching ignores case).

## Matching rules

1. Text and patterns are normalised the same way: Unicode NFC, typographic apostrophes (’ ‘ ´) become `'`, no-break spaces become plain spaces, and diacritics are dropped (é and è become e) except the tilde of ñ. A list can turn folding off with `"foldDiacritics": false`. Italian does, because its accents tell words apart (è and e, sì and si), and so does German, because umlauts do (würde and wurde, schön and schon). ß is never folded. Every character maps to one character, so positions stay valid.
2. Case is ignored.
3. `word` and `phrase` entries match whole words. They may not touch a letter or digit on either side, any whitespace in them matches any run of whitespace, and `…` in a phrase stands for 1 to 60 characters within a sentence that start and end between words. A phrase may not start or end with `…` or hold two in a row.
4. `regex` entries are JavaScript regular expressions compiled with the flags `giu`, run on the normalised text. Word boundaries are written `(?<![\p{L}\p{N}])` and `(?![\p{L}\p{N}])`, because `\b` only knows ASCII letters. A letter with diacritics is written as itself, never as a `\u` escape, so that it is folded like the text. A regex that does not compile raises an error naming the entry, and a match of no characters is skipped.
5. A text is flagged on one high hit, or on medium hits from two or more entries that do not read the same words. Overlapping hits are merged into one group: entries whose hits overlap anywhere in the same field count once, even when they also fire apart elsewhere.

## File format

`<lang>/patterns.json`, described by `schema/patterns.schema.json`:

| Field | Meaning |
|---|---|
| `language` | ISO 639-1 code, also the folder name and the id prefix |
| `version` | Format version, `1` |
| `foldDiacritics` | Optional, default `true`. `false` keeps diacritics significant |
| `patterns[].id` | Unique id such as `es-marca-la-diferencia` |
| `patterns[].kind` | `word`, `phrase` or `regex` |
| `patterns[].match` | The word, phrase or regular expression source |
| `patterns[].category` | `cliche-opener`, `cliche-closer`, `false-contrast`, `rhetorical-question`, `hype`, `vague-praise`, `urgency`, `filler`, `structure` or `punctuation` |
| `patterns[].precision` | `high` or `medium` |
| `patterns[].evidence` | `corpus`, `imitation` or `reasoning` |
| `patterns[].domain` | `general` or `product` |
| `patterns[].why` | Why it reads as machine-written, in English |
| `patterns[].example` | A sentence it must match |
| `patterns[].rewrite` | The same content written plainly; it must not match |
| `patterns[].falsePositives` | Ordinary sentences it must not match |

`<lang>/tests/cases.json`, described by `schema/cases.schema.json`, adds cases of the form `{ "text": "…", "hits": ["id"] }`, `{ "text": "…", "misses": ["id"] }` or `{ "text": "…", "misses": "all" }`.

`<lang>/tests/human-genres.json` holds `{ "about": "…", "texts": [{ "genre": "…", "text": "…" }] }`. A text with `"product": true` is checked with all entries, every other text with the general entries. None may be flagged.
