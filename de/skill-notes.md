German prose of any kind from Germany, Austria and Switzerland: posts, emails, essays, articles, reports and product copy.

## Before you rewrite

- Diacritics are kept (`"foldDiacritics": false`). Umlauts tell words apart in German: würde and wurde, hätte and hatte, schön and schon, zählen and zahlen. Folding would make "müde, aber zufrieden" match "mude" and let a pattern for one word fire on the other. Text typed without umlauts ("muede", "fuer") is not matched.
- ß is never folded, so "Maße" and "Masse" stay apart. Swiss German writes ss for ß, so the entries that contain ß accept both ("größte" and "grösste", "großes" and "grosses").
- Case is ignored. German capitalises nouns, so "Fazit" and "fazit" match alike, and a noun at the start of a sentence needs no special case.
- All entries are regexes, because they need to cover du, ihr and Sie forms ("Schreib es", "Schreibt es", "Schreiben Sie es gern in die Kommentare") and separable verbs ("passe ich den Ton gern an").
- Every German entry is general. No independent machine product copy in German was available, so no product-only entry could be backed by machine text.
- Keep the writer's register. Gendered forms ("Kolleginnen und Kollegen", "Autor:in") are a choice of the writer, not a tell; do not remove them.

## Habits that are ordinary in human German

Do not flag or rewrite these for this reason alone. Numbers are on the development corpora: 2,000 web pages, 814 news pages, 370 shop pages, and the 96 `ai-general` texts.

- The spaced en dash ( – ) is on 24.5% of web pages and 28.1% of news pages, and on 27.1% of the machine texts. It is normal German punctuation.
- The em dash (—) is on 0.5% of web pages and on none of the machine texts. Guillemets (»…« and «…») are on 1.9% of web pages and 4.9% of news pages, mostly Swiss. English curly quotes (“…”) are on 3.4% of web pages. The models used none of them.
- "Liebe Kolleginnen und Kollegen" and the pair form in general: on 24% of the machine texts, but a normal salutation.
- The gender colon (":in", ":innen") is on 3 machine texts and 1 human news page. The human pages are from before 2021, when the form was still rare, so the numbers say nothing about how people write now. It is on no list.

## What the human texts show

- With all 21 entries, the rule flags 1 of 2,000 development web pages (0.05%) and none of the 1,000 held-out web pages, the 814 news pages, the 370 development shop pages or the 367 held-out shop pages. The flagged page uses „…" four times and "Die Vorteile liegen auf der Hand".
- The medium entry seen most on human text is `de-anfuehrung-gemischt`, the „ opening quote closed with a straight ": 18 of 2,000 web pages (0.9%), 6 of 1,000 held-out pages and 3 of 814 news pages. No other entry fires on more than 1 page of any development corpus.
- `tests/human-genres.json` holds 65 short texts in the genres the web corpora barely cover: personal and business emails, replies to colleagues, chat messages, social and LinkedIn posts, club and school newsletters, school essays, minutes, reviews, journalism with editorial brackets, shop texts, and Swiss and Austrian variants. A language model (Claude) drafted them for the test; they were not written or collected from people. None is flagged; the previous list flagged 25 of them, and the entries were narrowed until none was, so that result holds by design and is not a measured rate.
- What flagged them: chat-leftover entries that fired on everyday replies ("Gerne, ich komme …", "Wenn du willst, mache ich morgen den Einkauf", "hier ist mein Vorschlag für die Tagesordnung"), editorial brackets in quotes ("Er [ihr Sohn] war …"), notes on changed names or example pictures, and pairs of common phrases in newsletters and posts ("müde, aber glücklich" with "Ein großes Dankeschön", emoji bullets with hashtags, "kein Zufall, sondern Absicht" with "Mein Fazit").
- Medium entries still fire alone on such texts: "müde, aber zufrieden" in newsletters and posts, "Mein Fazit" in reviews, "Zusammenfassend lässt sich sagen" in school essays, a "Betreff:" line in a formal letter. Alone they do not flag.

## What the machine texts show

- Claude Sonnet and Haiku answering plain German requests: 92 of the 96 development texts (`ai-general`, which the entries were drawn from) and 93 of the 96 texts of `ai-general-holdout` are flagged. `ai-general-holdout` was read during the 0.3.0 review, so it is not a clean held-out estimate. Almost all of that comes from Markdown bold and headings, square-bracket placeholders and the offer to rework the text ("Wenn du möchtest, passe ich den Ton gern an").
- Wording alone, without the `structure` entries, flags 19 development texts (19.8%) and 10 of the 96 `ai-general-holdout` texts (10.4%). Those 10 are 7 of 16 blog posts and 3 of 16 social posts, nearly all from the closing call to comment together with "Mein Fazit". No email, essay, article or report in that set is flagged on wording.
- The clean held-out figures come from the two sets made through the OpenAI and Anthropic APIs after the list was final. With all entries, 244 of 254 replies to plain requests (`ai-multi-holdout`) and 427 of 448 replies to detailed requests (`ai-detailed-holdout`) are flagged; wording alone flags 6 (2.4%) and 12 (2.7%).
- The chat-leftover entries now need the text to talk about itself (Text, Entwurf, Version, Fassung, Ton, Formulierung, Beschreibung, Platzhalter, or the article and its quotes). The offer to rework the text fires on 36 development machine texts instead of 43; the opening "Hier ist ein Entwurf …" on 6 instead of 11; the note that the article is invented on 7 instead of 9. Every machine text that lost one of these hits is still flagged by another high entry.
- Six wording entries fired on no `ai-general-holdout` text: `de-wer-in-den-letzten`, `de-was-mir-geholfen-hat`, `de-stueck-abstrakt`, `de-muede-aber-zufrieden`, `de-vorteile-auf-der-hand` and `de-zusammenfassend`. They rest on 1 to 6 development machine texts each. Four of them fired on the API held-out sets (`de-zusammenfassend` 8 texts, `de-was-mir-geholfen-hat` 3, `de-stueck-abstrakt` 2, `de-vorteile-auf-der-hand` 1). Only `de-wer-in-den-letzten` and `de-muede-aber-zufrieden` fired on no held-out machine text.
- `de-chat-residue` ("Als KI-Sprachmodell …") fired on no machine text and is kept as a clear chat leftover.

## Measured and left out

Candidates measured on the development corpora and dropped. The rows marked "removed" were on an earlier version of the list.

| Candidate | Human (web n=2,000 / news n=814) | AI (`ai-general`, n=96) | Decision |
|---|---|---|---|
| spaced en dash ( – ) | 24.5% / 28.1% | 27.1% | dropped; normal German |
| em dash (—) | 0.5% / 0.6% | 0% | dropped; no machine use |
| English curly quotes (“…”) | 3.4% / 0.7% | 0% | dropped; no machine use |
| "spürbar" | 0.45% / 0.86% | 14.6% | dropped; 11 of 14 hits from one topic (saving energy) |
| "bewusst" | 2.2% / 2.7% | 24.0% | dropped; too common |
| "Wer …, (der) kann / wird / spart …" | 1.9% / 1.0% | 18.8% | dropped; too common |
| "Fazit:" without "Mein" | 0.55% / 0.37% (shop 0.81%) | 8.3% | only "Mein Fazit" kept |
| "nicht um …, sondern um" | 0.10% / 0.12% (shop 0.27%) | 2.1% | dropped; "es handelt sich nicht um …, sondern um" is ordinary |
| "ist kein …, sondern" | 0.05% / 0.12% | 5.2% | removed; ordinary syntax ("Das ist kein Zufall, sondern Absicht") |
| "mehr als nur ein" | 0.35% / 0% | 3.1% | removed; common in human web copy |
| "Bereicherung", "bereichert das …" | 0.2% / 0.61% | 5.2% | removed; ordinary praise in news, posts and newsletters |
| "Entscheidend ist" | 0.05% / 0.25% | 3.1% | removed; ordinary in reports and news |
| "Ein großes Dankeschön", "die … möglich gemacht haben" | 0% / 0% (shop 0.27%) | 6.3% | removed; the normal thank-you of a newsletter or post |
| three or more hashtags | 0.1% / 0.12% | 14.6% | removed; normal on social posts, and mC4 drops hashtag lines, so the human rate is not measured |
| emoji as bullets | 0.05% / 0% | 4.2% | removed; people use 📍 and 🕖 lines in event posts |
| closing "Und du?" / "Und Sie?" | 0% / 0% | 0% | removed; the normal reply in a personal message; "Und ihr?" and "Wie sieht es bei euch aus?" are now part of `de-kommentare-aufruf` |
| "ein Stück Heimat / Normalität / Freiheit …" | 0.05% / 0% | 0% | removed from `de-stueck-abstrakt`; the models used only Lebensqualität, Handwerk and persönliche Entwicklung |
| "besonders beeindruckt hat" | 0% / 0% | 5.2% | dropped; 4 of 5 hits from the school-trip topic, ordinary in school reports |
| "nie zu spät" | 0% / 0% | 3.1% | dropped; one topic only |
| "Am Ende des Tages" | 0.20% / 0% | 5.2% | dropped; the models used it literally (the end of the day) |
| "In der heutigen (schnelllebigen) Zeit" | 0.15% / 0.12% | 0% | dropped; no machine use |
| "Tauchen Sie ein in" | 0.15% / 0% (shop 0.27%) | 0% | dropped; no machine use |

## Limits

- The human texts are web, news and shop pages from mC4 (2013 to 2020). Personal emails, essays and social posts are a small part of them. `tests/human-genres.json` covers those genres with texts a language model drafted for the test, which shows that a text is not flagged but gives no rate.
- A human blog post that ends with both "Mein Fazit" and a call to comment is flagged, as are the machine posts that do the same.
- A colleague who writes "Wenn du mir die Zahlen schickst, passe ich den Text noch an" is flagged: the chat-leftover entries cannot tell a text the writer talks about from the text they are writing.
- mC4 drops lines without end punctuation, so headings, subject lines, bullets and hashtag lines are barely testable on human text.
- The shop corpora were picked by URL and not read by hand; they also hold book blurbs, manufacturer pages and a few forum and coupon pages.
- Most machine texts are from Claude: Sonnet and Haiku (96 development and 96 `ai-general-holdout` texts), and Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 in the API sets. GPT-5.5 and GPT-5.4 mini wrote a small sample of 30 held-out texts. Gemini, Llama and Mistral output was not measured. Re-measure before relying on this list for other models.
