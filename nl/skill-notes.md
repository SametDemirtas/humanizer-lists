Dutch and Flemish prose of any kind: posts, emails, essays, articles, reports and product copy.

## Before you rewrite

- Diacritics are dropped before matching (`écht` becomes `echt`, `creëer` becomes `creeer`), and case is ignored.
- All Dutch entries are regexes, because they need to cover inflection, verb-second inversion ("is het belangrijk om op te merken") and separable verbs ("brengt je muren tot leven").
- Keep the writer's register. Flemish writers use the u-form and "Laat u verleiden" more often; neither is treated as a tell, and human webshops mix je and u a lot.
- Three entries are product-only and left out of the default check: `nl-stel-je-voor`, `nl-kortom-zinsbegin` and `nl-serial-comma`.

## Habits that are ordinary in human Dutch

The English rulebook treats some of these as tells. In Dutch the measurements say otherwise, so do not flag or rewrite them for this reason alone.

- "Niet alleen … maar ook" is on 1.0% of human product texts and 2.2% of the held-out ones. It is on no list. "Meer dan zomaar een" and "niet zomaar een…, het is" are the contrast entries.
- "Bovendien" (1.4%, held-out 2.5%) and "Daarnaast" (3.8%) at the start of a sentence are ordinary Dutch.
- The spaced en dash ( – ) is on 1.9% of human product texts. The em dash (—) is a medium entry (`nl-em-dash`) because it is not a Dutch norm, but it hardly occurred in the Dutch machine data.
- "Kortom" at the start of a sentence is on 23 of 2,000 human web pages, and a comma before "en" or "of" in a list on 63 of 2,000. Both are product-only.
- "Stel je voor:" fired once in each general human corpus. Product-only.
- Email and chat phrasing: "Laat me weten als je nog vragen hebt", "Ik hoop dat dit helpt", "Graag! Hieronder vind je…", "Hier is een voorstel voor de planning", "Wil je dat ik het verslag nog inkort?". The chat-leftover entries only fire when the text talks about itself as a text: its tone, a version, a draft for the asker's post or email ("Wil je dat ik de toon aanpas?", "Hier is een concept voor je e-mail:").
- Newsletter and report phrasing: "Grote dank aan" and "Speciale dank aan", "Samen maken we er een mooi feest van", "Goed nieuws:", "Het goede nieuws is dat", "Al met al", "Dit heeft geleid tot", "speelt een belangrijke rol", "een stap in de goede richting", "Dat maakt echt het verschil" (an old Dutch idiom, not a calque), "vastbesloten om", "In de huidige maatschappij". Some were entries and were removed, the others were narrowed, after they flagged ordinary texts in `tests/human-genres.json`.

## What the human texts show

- With the general entries only, the rule flags 7 of 2,000 human web pages (0.3%), 3 of 1,000 held-out web pages (0.3%) and none of the 599 human news pages.
- No general high entry fired on any general human corpus. The product-only `nl-stel-je-voor` fired once in each.
- `tests/human-genres.json` holds 82 short texts in the genres mC4 barely has: business and personal emails, chat messages, social and LinkedIn posts, school and club newsletters, school essays, policy reports, minutes, reviews, condolence cards, Flemish emails and newsletters, and 4 product texts. A language model (Claude) drafted them for the test; they were not written by people. 28 of them are sentences a review found flagged by the earlier list. None is flagged, and `npm test` checks that, but the entries were narrowed on these texts, so that result holds by design and is not a measured rate.
- `nl-chat-residue` used to match "als Ai" and hit a news article about Ai Weiwei. It now needs "als (een) taalmodel", "AI-taalmodel" or "AI-assistent".
- On product copy, 1 of the 2,805 wide product texts is flagged with the general entries, and none of the 269 hand-checked ones.

## Exceptions above the 1% bar

`nl-serial-comma` (product, medium) fires on 11 of the 790 held-out webshop texts (1.4%), above the usual bar for a medium entry, and on 25 of the 2,805 wide development texts (0.9%). It stays as a documented exception: it is on 3 of 8 GPT-4 product texts and 20 of 650 CLIN33 texts, and a medium hit flags nothing alone.

## What the machine texts show

- Claude Sonnet and Haiku answering plain requests for posts, emails, essays, articles and reports: all 96 development texts (`ai-general`) and all 96 texts of `ai-general-holdout` are flagged. `ai-general-holdout` was read during the 0.3.0 review, so it is not a clean held-out estimate. Almost all of that comes from Markdown bold labels and headings, square-bracket placeholders and the assistant's offer to adapt the text ("Wil je dat ik de toon aanpas?").
- Wording alone, without the `structure` entries, flags 3 of the 96 `ai-general-holdout` texts (3.1%): 2 blog posts and 1 LinkedIn post, and no email, essay, article or report. On the development set it flags 22 of 96 (22.9%), but 13 of the 17 entries added in 0.3.0 that are still on the list were drawn from that set, so that figure overstates recall.
- The wording entries added in 0.3.0 drawn from Claude text are frames, not single words: "Het is een plek waar…", "X is meer dan een Y. Het is…", "Wat begon als…", "Wat me het meest raakte", "Dit heb ik onderweg geleerd:", "de keerzijde", "niet om X, maar om Y", "Het goede nieuws?". Seven of them fired on the `ai-general-holdout` texts too; each fires on a few texts at most, and a text needs two of them.
- The clean held-out figures come from the two sets made through the OpenAI and Anthropic APIs after the lists were final. With the general entries, 248 of 254 replies to plain requests (`ai-multi-holdout`) and 417 of 448 replies to detailed requests (`ai-detailed-holdout`) are flagged; wording alone flags 9 (3.5%) and 6 (1.3%).
- CLIN33 (GPT-4 and Vicuna-13B news, tweets, reviews and poetry; the generated opinion columns are left out): 50 of 650 flagged with the general entries (7.7%), mostly news (48 of 200). Four entries added in 0.3.0 come from CLIN33: "Het is duidelijk dat", "Ondanks deze uitdagingen", "Het is nu aan … om" and "een breed scala aan". No tweet or poem is flagged.
- GPT-4 product copy from UltraChat: 3 of 8 flagged.
- 33 entries fired only on the imitation set, which was written with the candidates in view. These data do not show they are useful.

## Measured and left out

Candidates measured on the Dutch product corpora and dropped because people use them too often.

| Candidate | Human (wide, n=2,805) | AI (CLIN33, n=750, before the opinion columns were removed) | Decision |
|---|---|---|---|
| sentence-initial "Daarnaast" | 3.8% | 12.9% | dropped |
| sentence-initial "Bovendien" | 1.4% (held-out 2.5%) | 7.7% | dropped after the held-out run |
| "niet alleen … maar ook" | 1.0% (held-out 2.2%) | 6.8% | dropped after the held-out run |
| mixing je and u | 4.2% | 2.4% | dropped; human webshops mix a lot |
| "creëer" and forms | 1.4% | 6.7% | dropped |
| "Op zoek naar …?" | 0.9% (reviewed 1.5%) | 0% | dropped |
| "must-have" on its own | 0.9% | 0% | only "must-have voor elke …" kept |
| "hoogwaardige materialen/kwaliteit" | 0.7% | 0% | dropped |
| spaced en dash ( – ) | 1.9% | 0.3% | dropped; normal Dutch |
| "zolang de voorraad strekt", "op=op" | 0.2% | 0% | dropped; human, not an AI tell |
| "laat je verrassen", "laat je inspireren" | 0.2% | 0.1% | dropped |
| "echte eyecatcher", "blikvanger" | 0.1% | 0% | dropped |
| emoji in general, "!" at the end | 1.3% / 12% | | dropped |
| "Of je nu … of …" | 1.0% (held-out 1.0%) | 0.3% | dropped after a review: ordinary Dutch |

Candidates for general prose measured after 0.2.0 on the development corpora (2,000 human web pages, 599 news pages, 96 Claude texts, 650 CLIN33 texts) and left out:

| Candidate | Human web / news | Claude / CLIN33 | Decision |
|---|---|---|---|
| sentence-initial "Wie …, …" | 3 / 6 | 15 / 1 | dropped; 1.0% of news pages |
| "Het is tijd om/dat/voor" | 0 / 4 | 0 / 28 | dropped; 0.7% of news pages |
| "Het is ook/daarom belangrijk om" | 3 / 0 | 0 / 12 | dropped; ordinary Dutch |
| "Het grootste voordeel is/van" | 4 / 0 | 5 / 0 | dropped; ordinary Dutch |
| "niet tot/om/in X, maar tot/om/in Y" | 3 / 4 | 2 / 2 | dropped; only the "draait/gaat niet om" form kept |
| "is geen X, maar Y." | 0 / 0 | 2 / 0 | dropped; "Zij is geen arts, maar verpleegkundige." is ordinary |
| "Eerlijk gezegd", "Eerlijk is eerlijk" | 8 / 1 | 2 / 2 | dropped |
| "op een rij", "Hieronder vind je" | 18 / 3, 8 / 0 | 1 / 1, 5 / 0 | dropped |
| "verwondering" | 1 / 0 | 4 / 2 | dropped; all four Claude hits are on one topic |
| hashtags in a row | 2 / 0 | 16 / 136 | dropped; people tag their posts too |

Entries removed after the genre test, with their counts on the development corpora:

| Entry | Human web / news | Claude / CLIN33 | Why removed |
|---|---|---|---|
| "Grote/Speciale dank aan" | 0 / 0 | 3 / 0 | ordinary in newsletters and posts |
| "Samen maken we" | 1 / 0 | 4 / 0 | ordinary in club and school newsletters |
| "maakt (een groot / het) verschil" | 0 / 0 | 6 / 1 | old Dutch idiom |
| sentence-initial "Al met al" | 5 / 3 | 1 / 60 | ordinary in reviews, essays and minutes |
| "Dit heeft geleid tot" | 0 / 1 | 0 / 20 | ordinary in reports |
| "vastbesloten om" | 0 / 0 | 0 / 23 | ordinary word |

LLMs use "niet alleen … maar ook" and "Bovendien" three to five times as often as people, but that gap is too small for a list that must not accuse people.

## Limits

- The general human corpora are web pages and news pages from mC4 (2013 to 2020). Personal emails, essays and blog posts are a small part of them, which is why the comment sign-off and the frames added after 0.2.0 are medium. `tests/human-genres.json` covers those genres, but it is small, a language model drafted it, and the entries were narrowed on it.
- No machine email or report is flagged on wording once the placeholders, labels and chat offers are gone: 0 in each of the eight email and report rows of `summary.txt` (16 texts per genre in `ai-general` and `ai-general-holdout`, 37 in `ai-multi-holdout`, 64 in `ai-detailed-holdout`). Some have a single wording hit, which does not flag: 3 development reports, 1 report in `ai-general-holdout`, 1 in `ai-detailed-holdout`, and 4 emails and 3 reports in `ai-multi-holdout`, six of them GPT-5.4 mini texts with an em dash. A phrase list does not catch that sober register.
- mC4 drops lines without end punctuation, so bullets, headings and emoji bullets are barely testable on human text.
- Counting is per text. Two medium hits in a long text weigh the same as in a short one, and above roughly 300 words the chance of a false flag goes up.
- Most machine texts are from Claude: Sonnet and Haiku, and Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 in the API sets. GPT-5.5 and GPT-5.4 mini wrote a small sample of 30 held-out texts, CLIN33 adds GPT-4 and Vicuna-13B, and UltraChat 8 GPT-4 product texts. Gemini, Llama and Mistral output was not measured. Re-measure before relying on this list a year from now.
