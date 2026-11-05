# Changelog

## 0.4.0 (2026-11-05)

The skill rewrites the whole text, as the English humanizer does, instead of fixing only the sentences the checker flags.

- New rewriting guide per language in `skills/humanizer-lists/guides/` (`it.md`, `es.md`, `nl.md`, `de.md`), drafted with Claude from the measured notes and development texts of each language. Each follows the English humanizer's families of patterns, says how each pattern looks in that language, gives Before and After examples, marks the habits that are ordinary in that language and must stay, and ends with two worked examples: a product listing and an email.
- `SKILL.md` describes the full rewrite: read the guide, run the checker, mark the tells in the whole text, list every fact in the source, draft, check the draft against that list, then write the final version. The checker and the measured lists are one step of that process. Read only the guide for the text's language; where its "How to work" differs from `SKILL.md`, `SKILL.md` decides, and the guide's judgment patterns apply to the whole text whether or not the checker flags anything. A pasted text comes back with the tells found, the rewrite and the open questions (missing facts, placeholders). The usage triggers are generic requests in the four languages, and the description names the genres in English.
- The checker no longer says "Leave it as written" when medium hits do not flag a text; it says to judge them against the guide.
- `test/skill.test.mjs` checks that every language folder has `guides/<lang>.md`, that `SKILL.md` names it, and that each guide has its title, a "How to work" section and the two worked examples.
- The README presents the project as a humanizer for the four languages, with install steps, example requests and a short Before and After per language. The README keeps a summary of the measured lists and the checker; the full measurement report moved to `docs/measurements.md`, with the same numbers. Each language README links its guide.
- New package description: a humanizer skill for the four languages, with a rewriting guide per language and the measured lists and checker. `CHANGELOG.md` is now in the published package.

## 0.3.0 (2026-11-05)

German joins the three earlier languages, a review round narrows or removes the entries that flagged ordinary human writing, a new test checks human texts in many genres, and two new held-out machine corpora per language, made through the OpenAI and Anthropic APIs, measure the final lists. The skill is renamed.

- German (`de`), 21 entries (8 high, 13 medium), all general; 20 have `corpus` evidence and one (`de-chat-residue`) `reasoning`. No independent machine product copy in German was available, so there are no product entries. Human corpora from mC4 (Common Crawl 2013 to 2020): 2,000 web pages plus 1,000 held out, 814 pages from German, Austrian and Swiss news sites, and 370 shop pages plus 367 held out, rebuilt by `de/eval/rebuild-web.mjs` from four validation shards. German keeps diacritics (`"foldDiacritics": false`) because umlauts tell words apart (würde and wurde, schön and schon). ß is never folded, and entries that contain ß also accept the Swiss spelling with ss. `scripts/lib/prose.mjs` has German function words and allows up to 45% capitalised words in a German paragraph (20% in the other languages), because German capitalises every noun.
- New wording entries for general prose, chosen on the development corpora only. Italian 17 (for example "diciamolo", "non si può negare", "la buona notizia è che", "non è mai troppo tardi"), some drawn from Claude texts and some from DeSegMa-IT machine news. Spanish 12 (for example "Quería compartir", "marca la diferencia", "no es X, es Y"). Dutch 17 (for example "Wat begon als", "Het is duidelijk dat", "een breed scala aan"), four of them from CLIN33.
- Review round. A review ran every list on ordinary emails, chats, posts, newsletters, essays and reports drafted by a language model for the test below, and every entry that flagged such writing was narrowed, demoted or removed. The chat-leftover entries now match only when the text talks about itself: an offer to change its tone, version or wording, a note about its placeholders, a line that introduces the draft. "Se vuoi, posso preparare io la torta" or "Wenn du willst, mache ich morgen den Einkauf" is left alone. Removed: Italian 6 (among them `it-emoji`, `it-e-tu-domanda`, `it-inoltre-infine`, and `it-chat-offerta-riscrittura`, merged into `it-chat-offerta-tono`), Spanish 6 (among them `es-meticulosamente`, `es-chat-claro`, `es-y-tu-pregunta`), Dutch 1 (`nl-al-met-al`). Moved from high to medium: Italian 1, Spanish 9, Dutch 7. `es-en-un-mundo-donde` became a general medium entry. Each language's `skill-notes.md` records what was removed and why.
- Final lists: Italian 81 entries (11 high, 70 medium; 79 general, 2 product), Spanish 83 (18 high, 65 medium; 78 general, 5 product), Dutch 86 (14 high, 72 medium; 83 general, 3 product), German 21 (8 high, 13 medium; all general).
- New test `test/human-genres.test.mjs` with `<lang>/tests/human-genres.json`: 282 ordinary texts (61 Italian, 74 Spanish, 82 Dutch, 65 German) in genres the web corpora barely cover, drafted for the test by a language model (Claude) and not written or collected from real writers. They include the sentences the review found flagged. None may be flagged with the general entries; texts marked `product` are checked with all entries. The entries were narrowed until none was flagged, so passing holds by design and is not a measured rate.
- New held-out machine corpora in every language, generated by `scripts/generate-api.mjs` after the lists were final and measured once. `ai-multi-holdout` (254 texts): plain requests from `scripts/multi-requests.json`, seven genres including an article of about 800 words, eight new topics, answered by Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 (56 each) and by GPT-5.5 (6) and GPT-5.4 mini (24). `ai-detailed-holdout` (448 texts): 56 realistic scenarios from `scripts/detailed-scenarios.md`, each as a short request A and a careful request B (`scripts/detailed-requests/<lang>.json`), answered by the four Claude models. No system prompt, default sampling.
- Results on the new sets with the general entries, plain / detailed: Italian 98.8% / 91.3% flagged, 19.3% / 2.7% on wording; Spanish 86.6% / 83.3%, 12.6% / 1.3%; Dutch 97.6% / 93.1%, 3.5% / 1.3%; German 96.1% / 95.3%, 2.4% / 2.7%. Most flags come from leftovers (Markdown, bold labels, placeholders, chat lines). The 30 GPT texts per language are flagged less often than the 224 Claude texts, and careful B requests less often than short A ones. Held-out human web pages flagged: Italian 0.4%, Spanish 0.2%, Dutch 0.3%, German 0.0%.
- `ai-general-holdout` was read during the review round, so it is no longer a clean held-out estimate. The root README reports it apart from the two new sets.
- Held-out corpora no longer decide an entry's evidence or domain: `evidenceOf` and `domainOf` in `scripts/lib/measure.mjs` count development corpora only. Held-out results are still reported, and `summary.txt` names a held-out product corpus when an entry goes above its bar there.
- A document with several fields (title and description) is flagged when one field is flagged on its own, as the skill's `check.mjs` does; hits from different fields no longer combine. Italian `ai-models` goes from 68 to 67 flagged listings with all entries (34.0% to 33.5%).
- `sources.json` may give a corpus a `note`, printed after its role in `summary.txt`; `ai-general-holdout` carries "read during review". It changes nothing else.
- Email addresses, web addresses and phone numbers in the detailed requests and the API corpora that could belong to a real person or business were replaced with example.* addresses and placeholder numbers. No count changed.
- `summary.txt` has a "flagged wording" column for every corpus and tables by genre, by generator and by request style (A or B) for the machine corpora that record them.
- `node scripts/evaluate.mjs <lang> --write` refuses to write `counts.csv` and `summary.txt`, and exits with 1, when an entry's evidence or domain disagrees with the counts. `--check` compares the whole summary, including the genre, generator and style rows, when no corpus is missing. An unknown option or language, or `--write` together with `--check`, exits with 2.
- Shared helpers in `scripts/lib/`: `measure.mjs` (hit counting, the flag rule per corpus, genre, generator and style, evidence and domain from the counts), `counts.mjs` (reads and writes `counts.csv`) and `json.mjs` (JSON and JSON Lines).
- The matcher names the entry when its regex does not compile, refuses a `phrase` that holds two `…` in a row, and skips regex matches of no characters.
- The skill is renamed from `humanizer-it-es-nl` to `humanizer-lists` (`skills/humanizer-lists/`) and covers German. `SKILL.md` states what the checker finds and what it misses, and has usage triggers in all four languages.

## 0.2.0 (2026-11-04)

The lists now cover general prose as well as product copy, and the repository ships a Claude skill.

- Every entry has a `domain`. Its level is measured on the human corpora of that domain: general prose for `general` entries, product copy for `product` entries. An entry is `general` when it stays within its bar (0.1% of texts for high, 1% for medium) on every general human corpus. Italian has 67 general and 3 product entries, Spanish 70 and 7, Dutch 67 and 3. `--write` refuses counts that disagree with an entry's domain, and `summary.txt` lists the entries that go above their bar on product copy.
- The medium rule now joins entries whose hits overlap anywhere in a field into one group and needs at least two groups. Before, two entries reading the same words twice could flag a text.
- New general human corpora from mC4: 2,000 web pages plus 1,000 held out for Spanish and Dutch, 1,000 held-out web pages for Italian, and 599 pages from Dutch news sites. `scripts/sample-mc4-web.mjs` drew them and `<lang>/eval/rebuild-web.mjs` rebuilds them from their SHA-256 metadata.
- New machine corpora in each language: `ai-general` (development) and `ai-general-holdout` (held out, new topics, written after the entries were chosen), each 96 texts from Claude Sonnet and Haiku answering plain requests in six genres. Rows record the resolved model id. Claude Code puts the account email in the model context; in the development set the account owner's name in 11 email sign-offs was replaced by a neutral one, and the held-out run tells the model to ignore it and regenerates any reply that still uses it.
- 17 new general entries, all with `corpus` evidence: offers to adapt the tone, requests for details, notes about bracketed placeholders, lines that introduce a draft, comment sign-offs, closing questions to the reader and two not-X-but-Y contrasts. Sixteen of them also fire on the held-out set.
- Fixes: `nl-chat-residue` no longer matches "als Ai" (a news article about Ai Weiwei); `es-mix-voseo-tu` no longer treats "venís" and "preferís", which are also peninsular vosotros forms, as voseo.
- 15 entries moved to `corpus` evidence because they fired on the new machine corpora. Italian and Spanish Markdown entries and the Spanish emoji-bullet entry moved to the `structure` category, as in Dutch.
- `summary.txt` reports each corpus's domain and role, and the flag rate with all entries, with the general entries, and with the general entries outside `structure` ("wording").
- CLIN33: the 100 generated opinion columns were removed because they make invented claims about real, named people. 650 texts remain.
- DeSegMa-IT and AuTexTification human texts are marked as undated.
- `skills/humanizer-it-es-nl/`: a Claude skill built like the English humanizer, with `SKILL.md`, one reference file per language and `scripts/check.mjs` (exit codes 0, 1, 2 for usage errors, 3 for internal errors). The reference files, the lists and the matcher in the skill are generated by `scripts/build-skill.mjs` (`npm run build:skill`); `--check` and `npm test` fail when they are out of date or a stray file sits in a generated folder.
- `npm test` also checks the skill: the frontmatter, that every entry appears in its reference file, the checker's exit codes, and that it reports each example and test case and leaves rewrites and false positives alone, including from a copy of the skill folder.
- CI runs once per pull request and once per push to `main`, and runs the skill build check.

## 0.1.0 (2026-10-27)

First release.

- Lists for Italian (63 entries: 10 high, 53 medium), Spanish (71: 28 high, 43 medium) and
  Dutch (66: 18 high, 48 medium), each measured on human product copy from before November 2022
  and on machine-written text.
- `src/matcher.mjs`: one dependency-free matcher for all languages. NFC normalisation,
  diacritics folded except the tilde of ñ (Italian keeps them with `"foldDiacritics": false`),
  whole-word matching on Unicode letters (a `…` gap also starts and ends between words), regexes
  compiled with `giu`, and one flag rule: a high hit, or medium hits from two or more different
  entries on words that do not overlap.
- Every entry records its `evidence`: independent machine text, the imitation set, or reasoning.
- JSON Schemas for `patterns.json` and `tests/cases.json`, checked by `npm test`.
- `npm run eval` reports hit rates per corpus; `--check` compares them with the committed counts. Third-party human corpora ship as URL, date and
  SHA-256 only, with scripts that rebuild them from mC4, the Wayback Machine, AuTexTification 2023
  and DeSegMa-IT.
