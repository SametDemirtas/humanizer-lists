Spanish prose of any kind, from Spain and Latin America: posts, emails, essays, articles, reports and product copy.

## Before you rewrite

- Accents and diaeresis are dropped before matching and ñ is kept, so text typed without accents is matched the same way.
- Keep the writer's region and register: Rioplatense voseo, "ustedes" as the plural of tú, and words such as "playera", "remera" or "celular".
- Because accents are dropped, "llévala" (tú) and "llevala" (vos) look the same. `es-mix-voseo-tu` therefore checks only verbs whose stem changes (querés/quieres, tenés/tienes, podés/puedes).
- `es-question-first` and one form of `es-chat-aqui-tienes` ("¡Claro! Aquí tienes el texto") look at the start of the text. Check a title and a body separately.
- Five entries are product-only and left out of the default check: `es-question-first`, `es-no-solo-sino`, `es-cabe-destacar`, `es-en-resumen` and `es-gerund-rider`.
- The chat-leftover entries (`es-chat-aqui-tienes`, `es-chat-ofrezco`, `es-chat-espero`, `es-chat-ofrece-tono`, `es-chat-pide-datos`, `es-chat-corchetes`) fire only when the text talks about itself as a text: "el texto", "la descripción", "otra versión", "el tono", "la entrada", the placeholders in brackets. The same offers about a booking, a report or a parcel are ordinary emails and messages.

## Habits that are ordinary in human Spanish

The English rulebook treats some of these as tells. In Spanish the measurements say otherwise, so do not flag or rewrite them for this reason alone.

- The em dash (raya) is correct Spanish punctuation for asides. There is no entry for it.
- "No solo… sino (también)" is on 70 of 2,000 human web pages. `es-no-solo-sino` is product-only. On general prose only rarer frames are entries, both medium: "No se trata solo de… sino de" (`es-no-se-trata-solo-sino`) and "no es solo… , sino", "no implica… , sino", "no solo…: también" (`es-no-x-sino-y`). "No significa que…, sino que…" is ordinary and is not matched.
- Replies such as "¡Claro!", "¡Perfecto! Te espero a las cinco" or "¡Genial! Nos vemos el sábado" are ordinary. Only an agreement that hands over a text ("Por supuesto, aquí tienes una versión más corta") is matched.
- Email and chat habits: "Espero que estés bien", "Quería compartir con vosotros…", "Te comparto la propuesta", "Quedo atento", "Si quieres, puedo hacer la reserva", "Si me indicas tu dirección, te lo envío", "¿Y tú, qué tal?". The greeting and the announcement are one medium entry (`es-queria-compartir`), so together they count once; the rest are not matched.
- "La clave está en…" and "marcar la diferencia" are everyday Spanish and are not matched. Only the calque "hacer una (gran) diferencia" is (`es-marca-la-diferencia`).
- "Palabras clave:" is the normal last line of an academic abstract, and "Título:" with "Descripción:" is how forms and tickets look. `es-palabras-clave-line` is medium; plain "Título:" and "Descripción:" labels are not matched.
- "No es más que una mera…" means "nothing but"; `es-mas-que-un-simple` skips it.
- An opening question is on 2.9% of the human AuTexTification texts and 1.6% of human web pages. `es-question-first` is product-only.
- "Cabe destacar" and "En resumen" fired on 12 and 10 of 2,000 human web pages. They are product-only.
- A trailing gerund clause (`es-gerund-rider`) is on 30 of 2,000 human web pages. Product-only.
- "Además," at the start of a sentence is very common in human listings and is on no list.

## What the human texts show

- With the general entries only, the rule flags 2 of 2,000 human web pages (0.1%), 2 of 1,000 held-out web pages (0.2%) and none of the 15,787 human AuTexTification texts (wiki, tweets, legal). Both development pages say "¡No busques más!" and were written for search engines.
- `es/tests/human-genres.json` holds 74 texts in genres the corpora barely cover: personal and business emails from Spain and Latin America, chat messages, social posts, newsletters, school essays, academic abstracts, tickets, minutes, reviews, travel writing and sports talk. None is flagged with the general entries. A language model (Claude) drafted them for the test, and the entries were narrowed until none was flagged, so they show what the rule leaves alone, not a measured rate.
- Most high hits on human web pages come from the product-only entries: "Cabe destacar / señalar" (12 pages) and "En resumen / En conclusión" (10) are normal in news and blogs, which is why they are product-only.
- `es-no-busques-mas` fired on 2 of 2,000 human web pages, which is the general bar of 0.1% for a high entry. The reference shows the count for each entry.
- On product listings, none of the 458 human descriptions had a high hit. Two (0.4%) were flagged by two medium hits, both from Mr. Wonderful. Playful human brands use reader questions, "no solo… sino también", "un must have" and "¿a qué esperas?".
- Two medium entries fire on more than 1% of human listings; they are listed under the exceptions below.

## Exceptions above the 1% bar

These medium entries fire on more than 1% of the 458 human listings, above the usual bar for a medium entry. They stay as documented exceptions because a medium hit flags nothing alone.

- `es-question-first` (product): 10 of 458 human listings (2.2%), against 6 of 70 Sonnet listings and 7 of 63 imitations. It is product-only because it is on 2.9% of the human AuTexTification texts.
- `es-no-esperes-mas` (general): 5 of 458 human listings (1.1%), against 3 of 63 imitations; on general prose it fired on 1 of 2,000 web pages.

## What the machine texts show

- Claude Sonnet and Haiku answering plain requests for posts, emails, essays, articles and reports: 90 of the 96 development texts (`ai-general`, which the general entries were drawn from and tuned on) and 89 of the 96 texts of `ai-general-holdout` are flagged with the general entries. `ai-general-holdout` was read during the 0.3.0 review, so it is not a clean held-out estimate. Most of that comes from Markdown headings and bold labels and the assistant's offer to adapt the text or its request for missing details.
- Wording alone, without the `structure` entries, flags 19 development and 9 `ai-general-holdout` texts. On `ai-general-holdout` it works on social posts (4 of 16) and emails (2 of 16), on 2 of 16 blog posts and 1 of 16 articles, and not at all on essays and reports. Keeping ordinary email greetings and replies out of the count costs recall on emails: 1 of 16 development emails is flagged on wording alone. The essay frames (`es-ni-ni-veredicto`, `es-bien-mal-gestionado`, `es-el-reto-esta-en`) fired on development essays only.
- The clean held-out figures come from the two sets made through the OpenAI and Anthropic APIs after the lists were final. With the general entries, 220 of 254 replies to plain requests (`ai-multi-holdout`) and 373 of 448 replies to detailed requests (`ai-detailed-holdout`) are flagged; wording alone flags 32 (12.6%) and 6 (1.3%).
- Older base models in AuTexTification, which continue text instead of answering a request, produce almost none of these tells: 1 of 16,275 texts is flagged with the general entries, against none of the 15,787 human texts.
- Claude product listings: 20.0% of Sonnet answers and 0% of Haiku answers were flagged with all entries. 19 of the 70 Sonnet answers end with a "Palabras clave: …" line; it is medium, so it flags a listing only next to a second sign such as "el regalo perfecto" (18 Sonnet answers).
- Five entries never fired on machine text: `es-que-mejor-manera-de`, `es-donde-se-une-con`, `es-celebra-tu-amor-por`, `es-cada-sorbo` and `es-titulo-label`. They are kept because they are known calques or chat leftovers and stay within their bar on the human texts of their domain, but these data do not show they are useful.

## Measured and left out

Counts are documents among the 458 human listings and among the imitation, Sonnet and Haiku texts (63, 70 and 70). None of these is on the list.

| Phrase | Human | Generated | Reason |
|---|---|---|---|
| "Además," at the start of a sentence | 35 | 4 / 0 / 0 | very human |
| "Asimismo" | 0 | 0 / 0 / 0 | 109 times in ordinary Spanish, never in generated listings |
| "Descubre" anywhere | 10 | 2 / 1 / 0 | very human; only the opener is an entry (`es-descubre-opener`) |
| "a la perfección" | 4 | 1 / 0 / 0 | more human than generated |
| "sin duda" | 3 | 0 / 0 / 0 | human |
| "tu día a día" | 3 | 4 / 1 / 0 | human |
| cautivador, deslumbrante, impresionante, espectacular | 4 | 0 / 0 / 0 | human |
| excepcional, inigualable on their own | 2 | 5 / 0 / 0 | only next to calidad, suavidad and similar (`es-calidad-excepcional`) |
| atemporal | 3 | 2 / 1 / 0 | human |
| "Imagina…" at the start | 0 | 0 / 0 / 0 | adds nothing |
| "Te presentamos" | 1 | 0 / 0 / 0 | adds nothing |
| "perfecto para cualquier ocasión" | 1 | 2 / 0 / 0 | weak signal |
| "la opción perfecta" | 1 | 3 / 0 / 1 | weak signal |
| "edición limitada" | 3 | 2 / 0 / 1 | usually a real fact |
| `**bold**` in general | 5 | 7 / 0 / 0 | a DaWanda seller used asterisks; only the bold label with a colon is an entry |
| spaced em dash ( — ) | 1 | 0 / 0 / 0 | no generated listing used it; a human did |
| em dash in any form | 2 | 0 / 0 / 0 | correct Spanish punctuation for asides |
| spaced en dash ( – ) | 4 | 5 / 0 / 0 | as human as generated |
| mixing tú and usted | 3 | 0 / 0 / 0 | fired only on machine translations by foreign sellers |
| "Descripción:" as a lone label | 1 | 1 / 19 / 0 | Mr. Wonderful uses it; counts only next to "Título:" |
| vertical bar in the title | 0 | 46 / 0 / 70 | human Etsy titles use " \| " too; human titles were not measured |
| "Con su diseño… y…, " at the start | 0 | 1 / 0 / 0 | a normal native opening |

General prose candidates, counted on the development sets: texts among the 96 `ai-general` texts, the 2,000 human web pages and the 15,787 human AuTexTification texts.

| Phrase | ai-general | Web | AuTexTification | Reason |
|---|---|---|---|---|
| "no dudes / no dudéis en" | 3 | 16 | 7 | very human |
| "más allá de" | 8 | 24 | 11 | very human |
| "en definitiva" | 6 | 13 | 0 | human |
| "es importante destacar / recordar" | 0 | 7 | 3 | not a Claude habit here |
| "juega un papel crucial / fundamental" | 0 | 0 | 2 | not a Claude habit here |
| "¿Sabías que…?" | 1 | 3 | 12 | human |
| "mejorar la calidad de vida / el bienestar" | 3 | 4 | 0 | common in institutional prose |
| "gracias / agradezco de antemano" | 4 | 2 | 0 | common in human emails |
| "con muchas ganas de" | 5 | 2 | 0 | ordinary informal Spanish |

Left out of the list because people write them in emails, posts, essays and travel or sports writing. Counts are texts in the development sets.

| Phrase | Human | Generated | Reason |
|---|---|---|---|
| "¡Claro!", "¡Perfecto!", "¡Genial!" opening a text | 0 | 0 | ordinary replies; no generated text opened this way |
| "¿Y tú?", "Y a vosotros, ¿…?" | 1 web page | 9 `ai-general`, 6 AuTexTification generated | ordinary in emails and chats |
| "La clave está en" | 1 web page, 3 AuTexTification | 2 `ai-general`, 7 AuTexTification generated | everyday Spanish |
| "marcar la diferencia" | 2 listings, 4 AuTexTification | 5 `ai-general`, 2 AuTexTification generated | native idiom |
| "no significa que…, sino que…" | 2 AuTexTification | 0 `ai-general`, 5 AuTexTification generated | everyday Spanish |
| "en casa o en la oficina" | 1 listing, 1 web page, 1 AuTexTification | 1 `ai-general`, 1 imitation, 4 AuTexTification generated | literal in writing about remote work |
| "Dile hola a…" | 0 | 0 | ordinary greeting; no generated text has it |
| "emprender un viaje" | 1 web page | 0 | literal travel |
| "meticulosamente", "minuciosamente" | 2 web pages, 5 AuTexTification | 0 | ordinary adverbs |
| "Título:" followed by "Descripción:" | 0 | 1 imitation | forms and tickets |

There is no entry for a missing ¿ or ¡. Leaving them out is normal when people type fast online.

## Limits

- The general human corpora are web pages from mC4 (2013 to 2020) and AuTexTification (wiki, tweets, legal). Personal emails, essays and blog posts are a small part of them, so phrases common in those genres may be rarer here than in real use. That is why the comment sign-off is medium, the closing "¿Y tú?" is on no list, and `es/tests/human-genres.json` checks texts from those genres.
- The product corpus is small (458 listings) and mostly from Spain. There is nothing from Colombia, Chile or Peru.
- Most machine texts are from Claude: Sonnet and Haiku, and Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 in the API sets. GPT-5.5 and GPT-5.4 mini wrote a small sample of 30 held-out texts, and AuTexTification adds older base models (BLOOM, GPT-3, text-davinci-003). Gemini, Llama and Mistral output was not measured.
- A regex does not see adjective triads, uniform sentence length, synonym rotation or English-style Title Case.
