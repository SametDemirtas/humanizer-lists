Italian prose of any kind: posts, emails, essays, articles, reports and product copy.

## Before you rewrite

- Accents count. The Italian list keeps diacritics (`"foldDiacritics": false`) because they tell words apart: "è" (is) and "e" (and), "sì" (yes) and "si". Folding them made entries fire on four more human texts. Keep the accents as written, and expect the check to miss a phrase typed without them ("perche" for "perché"). Entries that contain the verb "è" also accept the typed forms "e'" and "é" ("non e' mai troppo tardi").
- Regexes cover gender and number where needed (`aggiungil[oaie]`, `perfett[oaie]`, `compagn[oa]`).
- Some entries look at the start of a sentence or line. Check a title and a body separately.
- Two entries are product-only: `it-lineetta-em-dash` and `it-caporali`. The default check leaves them out.

## Habits that are ordinary in human Italian

The English rulebook treats some of these as tells. In Italian the measurements say otherwise, so do not flag or rewrite them for this reason alone.

- The em dash (—) appears in 116 of 2,000 human news articles (DeSegMa-IT). `it-lineetta-em-dash` is kept for product copy only.
- Caporali quotes «…» appear in 207 of 2,000 human news articles and 43 of 1,436 general web pages. `it-caporali` is kept for product copy only.
- Curly quotes “…” are on 14.5% of human product pages.
- "Non solo… ma anche" is on 2.0% of human product pages and is normal Italian. Only "Non è solo una X, è…" (`it-non-e-solo-x-e`), "Non si tratta (solo) di… ma di" (`it-non-si-tratta-solo-ma`), "non è un semplice…" (`it-piu-di-un-semplice`) and "non significa… ma" (`it-non-significa-ma`) are entries, all medium.
- "Inoltre" at the start of a sentence (3.5% of product pages), and the chain "Inoltre… Infine…" (9 human development texts against 6 machine news articles). School essays are built on it. It is not an entry.
- Emoji: on 14 of 1,436 web pages, and ordinary in human chat and social posts. There is no emoji entry.
- "Un'occasione per", "più che mai", "Il motivo?" and "Il segreto?": everyday Italian in letters, newsletters and opinion pieces. None is an entry.

## What the human texts show

- With the general entries only, the rule flags 1 of 1,436 general web pages (0.1%), 4 of 1,000 held-out web pages (0.4%) and 2 of 2,000 human news articles (0.1%).
- Two high entries fired on the held-out web pages: `it-segnaposto-parentesi` once and `it-markdown-titoletto` once.
- The most frequent wording entries on human text are `it-triade-piu` (13 of 2,000 human news articles, 8 of 1,436 web pages), `it-per-chi-ama` (4 and 6) and `it-non-passa-inosservato` (6 and 3). They are medium and count only with a second sign.
- The human corpora hold almost no personal or business email, chat, social posts, newsletters or school essays. `tests/human-genres.json` holds 61 such texts, drafted for the test by a language model (Claude), not written by people. `npm test` fails if the general entries flag any of them. The entries were narrowed until none was flagged, so that result holds by design and is not a measured rate. To pass, the chat-leftover entries only match an offer or a request that names the text's tone, its versions or its missing real details, or that follows a rule line (`---`); an ordinary "Se vuoi, posso preparare io la torta" or "Certo! Ecco il link" is left alone.
- On product pages the rule flags 1.4% of the development set and 1.2% of the held-out set with all entries. Four medium entries go above 1% of human product pages; they are listed under the exceptions below. Almost every flagged product page paired two gift phrases ("il regalo perfetto" and "per gli amanti dei") or two calls to buy ("Cosa aspetti?" and "Acquista subito"). People who sell gifts write that way too, so a flag made of two such medium hits is the weakest kind.

## Exceptions above the 1% bar

These medium entries fire on more than 1% of human product pages, above the usual bar for a medium entry. They stay as documented exceptions because they are several times more frequent in machine text, and a medium hit flags nothing alone. A product flag made only of them is the weakest kind.

- `it-un-tocco-di` (general): 15 of 792 development shop pages (1.9%) and 9 of 346 held-out ones (2.6%), against 17 of 200 Claude listings (8.5%).
- `it-regalo-perfetto` (general): 9 of 792 development shop pages (1.1%), against 48 of 200 Claude listings (24.0%).
- `it-senza-rinunciare` (general): 9 of 792 development shop pages (1.1%), against 6 of 96 `ai-general` texts (6.3%).
- `it-caporali` (product): 8 of 792 development shop pages (1.0%) and 9 of 346 held-out ones (2.6%), against 46 of 200 Claude listings (23.0%).

## What the machine texts show

- Claude Sonnet and Haiku answering plain requests for posts, emails, essays, articles and reports: 93 of the 96 development texts (`ai-general`, which the general entries were drawn from) and 94 of the 96 texts of `ai-general-holdout` are flagged with all entries. `ai-general-holdout` was read during the 0.3.0 review, so it is not a clean held-out estimate. Most of that comes from Markdown headings and bold labels, square-bracket placeholders and the assistant's offer to adapt the text.
- Wording alone, without the `structure` entries, flags 25 of the 96 development texts and 10 of the 96 `ai-general-holdout` texts. By genre on that set: essays 6 of 16, blog posts 2, social posts 1, articles 1, emails and reports 0. A plain email or report from a model, with the placeholders filled in and the closing offer deleted, has almost no wording a list can catch.
- The clean held-out figures come from the two sets made through the OpenAI and Anthropic APIs after the lists were final. With the general entries, 251 of 254 replies to plain requests (`ai-multi-holdout`) and 409 of 448 replies to detailed requests (`ai-detailed-holdout`) are flagged; wording alone flags 49 (19.3%) and 12 (2.7%).
- The wording entries come from two sources: phrases that recur in Claude texts across several topics ("la buona notizia è che", "senso di appartenenza", "non è mai troppo tardi", "porta con sé") and phrases that machine-written news (DeSegMa-IT) uses far more than human news ("diciamolo", "non si può negare", "solleva interrogativi", "a detta di molti", "come spesso accade", "in un'epoca in cui").
- Machine-written news (DeSegMa-IT): 8.9% flagged with the general entries. Its most frequent entries are "non è un semplice…" (145 of 2,000 articles), "diciamolo" or "la verità è che" (139), "Non si tratta di… ma di" (138) and "in un mondo / un'epoca in cui" (122).
- Claude product listings: the most frequent tells were "per chi ama / per gli amanti dei" (38% of texts), "il regalo perfetto / idea regalo" (24%), caporali quotes (23%) and "un tocco di" (8.5%).
- `it-chat-certo-ecco`, `it-al-livello-successivo` and `it-registro-misto` never occurred in machine text. They are kept because they never fired on development human text. No machine data backs them, so `it-al-livello-successivo` and `it-registro-misto` are medium and `it-chat-certo-ecco` only matches a reply opener that introduces a text, a description, a draft or a version.

## Measured and left out

Phrases that look machine-written but are common in Italian written by people before 2022. They are on no list.

| Phrase | Human product pages | Reason |
|---|---|---|
| perfetto/a per | 9.2% | too common in human text |
| ideale per | 11.0% | too common |
| di alta qualità | 5.2% | too common |
| non solo… ma anche | 2.0% | normal Italian |
| un vero e proprio | 1.3% (web 2.4%) | normal Italian |
| Inoltre at the start of a sentence | 3.5% | only the chain "Inoltre… Infine…" is an entry |
| spaced en dash ( – ) | 8.1% (web 15.8%) | used as a separator in human titles |
| curly quotes “…” | 14.5% | normal in human text |
| Scopri at the start of a sentence | 1.4% | normal shop navigation; only "Scopri la magia/il fascino…" is an entry |
| must-have, un must | 1.3% | normal fashion vocabulary |
| per ogni occasione | 1.8% | does not separate human from machine text |
| an opening question | 1.4% | does not separate human from machine text |
| accattivante | 1.1% | common in human text |
| hashtags, "!!" | 0.8%, 0.9% | human social media habits |
| "vi scrivo per", "un caro saluto" | not measured on human email | ordinary email openings and sign-offs; the human corpora hold almost no email, so their rarity there says nothing |
| "è fondamentale" | 1.4% of human news | too common |
| "Tuttavia," at the start of a sentence | 2.8% of human news | too common |
| "Insomma," at the start of a sentence | 89 of 2,000 human news articles | too common |
| "fa la differenza" in any form | 0.6% of human news, 0.4% of web pages | added 4 flagged Claude texts and 3 flagged web pages; only the narrow closer `it-fa-la-differenza` is an entry |
| "va oltre il / la" | 0.2% of web pages, 0.3% of news | flagged 2 human texts for each Claude text it added |
| "un chiaro segnale", "c'è poi", "entra in gioco", "non possiamo permetterci di" | 0.15% to 0.7% of human news | added false flags without adding Claude texts |

## Limits

- The general human corpora are web pages from mC4 (2013 to 2020) and news. Personal emails, essays and blog posts are a small part of them, so phrases common in those genres may be rarer here than in real use. That is why the closing question to the reader (`it-cta-commenti`) is medium and why `tests/human-genres.json` checks those genres. Its 61 texts, drafted by a language model, catch obvious false flags; they are too few to measure a rate, and the entries were narrowed on them.
- Most machine texts are from Claude: Sonnet and Haiku, and Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 in the API sets. GPT-5.5 and GPT-5.4 mini wrote a small sample of 30 held-out texts, and DeSegMa-IT adds 2,000 machine-written news articles. Gemini, Llama and Mistral output was not measured.
- Some "human" mC4 pages are machine translations from English.
- Matching ignores case, so Title Case Titles are not seen.
