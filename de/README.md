# KI-Signale in deutschen Texten (de)

[English version below](#english)

Dieser Ordner enthält die gemessene Liste. Der Skill `humanizer-lists` schreibt den ganzen Text neu und folgt dabei dem deutschen Leitfaden [`guides/de.md`](../skills/humanizer-lists/guides/de.md); Liste und Prüfskript sind ein Hilfsschritt.

This folder holds the measured list. The `humanizer-lists` skill rewrites the whole text using the German guide [`guides/de.md`](../skills/humanizer-lists/guides/de.md); the list and the checker are a helper step.

## Deutsch

### Was es ist

`patterns.json` enthält 21 Wendungen und Gewohnheiten, an denen man deutsche Texte von Sprachmodellen erkennt: Blog- und LinkedIn-Beiträge, E-Mails, Essays, Artikel, Berichte und Produkttexte aus Deutschland, Österreich und der Schweiz. Jeder Eintrag hat eine Begründung, ein Beispiel, auf das er anschlagen muss, eine Umformulierung und gewöhnliche Sätze, auf die er nicht anschlagen darf. Der Skill `humanizer-lists` im Hauptordner nutzt die Liste, und `src/matcher.mjs` führt sie auch allein aus.

8 Einträge haben hohe, 13 mittlere Präzision. Alle gelten für allgemeine Prosa: Für deutsche Produkttexte gab es keine unabhängigen Modelltexte, mit denen sich ein reiner Produkteintrag hätte belegen lassen. Nach Kategorie: structure 9, cliche-closer 5, cliche-opener 3, filler 2, hype 1, punctuation 1.

Präzision geht vor. Jeder Eintrag wurde an menschlichen Texten von vor November 2022 und an Modelltexten gemessen.

### Was die Liste findet und was nicht

Die Liste ist ein Werkzeug, um aus einem Chat kopierten Text zu säubern, und eine Hilfe beim Redigieren. Sie findet, was man beim Einfügen zu löschen vergisst: Markdown-Überschriften und Fettdruck, Platzhalter in eckigen Klammern, die Zeile, die den Entwurf ankündigt, und das Angebot, ihn anzupassen („Wenn du möchtest, passe ich den Ton gern an“). Die Einträge für Chatreste schlagen nur an, wenn der Text über sich selbst spricht; „Wenn du willst, mache ich morgen den Einkauf“ bleibt unmarkiert. Dazu kommen einige Floskeln wie der Aufruf zum Kommentieren am Ende und „Mein Fazit“. Einen Modelltext, der mit einer guten Anfrage entstand und danach bereinigt wurde, erkennt sie nicht, und sie sagt nicht, wer einen Text geschrieben hat.

Saubere Zahlen auf zurückgehaltenem Text kommen aus zwei Korpora, die nach Abschluss der Liste über die APIs von OpenAI und Anthropic erzeugt und einmal gemessen wurden. Die Liste markiert 96,1 % von 254 Antworten auf einfache Anfragen (`ai-multi-holdout`) und 95,3 % von 448 Antworten auf ausführliche Anfragen (`ai-detailed-holdout`). Fast alles davon sind Reste: Die Einträge zur Wortwahl allein, also alle außerhalb von `structure`, markieren 2,4 % (6) und 2,7 % (12). Von den 1.000 zurückgehaltenen menschlichen Webseiten markiert die Liste keine. Sie markiert auch keinen der 65 Texte in `tests/human-genres.json`, aber diese Texte hat ein Sprachmodell für den Test entworfen, und an ihnen wurden die Einträge eingeengt; dieses Ergebnis steht also durch die Anlage fest.

Texte, die nur wegen der Wortwahl markiert sind, nach Textsorte:

| Textsorte | Einfache Anfragen (37; 32 beim langen Artikel) | Ausführliche Anfragen (64) |
|---|---|---|
| Blogbeitrag | 5 (13,5 %) | 6 (9,4 %) |
| E-Mail | 0 | 0 |
| Kurzer Essay | 0 | 1 (1,6 %) |
| Artikel | 1 (2,7 %) | 1 (1,6 %) |
| Instagram-Beitrag | 0 | 0 |
| Kurzer Bericht | 0 | 0 |
| Langer Artikel (etwa 800 Wörter) | 0 | 4 (6,3 %) |

Bei den einfachen Anfragen werden die 30 Texte von GPT-5.5 und GPT-5.4 mini seltener markiert als die 224 von Claude: 22 (73,3 %) gegenüber 222 (99,1 %). Wegen der Wortwahl allein werden 6 Claude-Texte markiert und kein GPT-Text. Die GPT-Stichprobe ist klein und zeigt nur eine Richtung. Sorgfältige ausführliche Anfragen (Stil B) werden in 91,1 % der Fälle markiert, kurze (Stil A) in 99,6 %; wegen der Wortwahl allein sind es bei B 8 Texte, bei A 4.

Eine sachliche E-Mail, ein Artikel oder ein Bericht ohne Formatierung bietet der Liste fast nichts. Eine Markierung zeigt, was man umschreiben sollte; keine Markierung heißt nicht, dass ein Mensch den Text geschrieben hat.

### Ergebnisse

Ausgabe von `node scripts/evaluate.mjs de` (`eval/summary.txt`). Alle Einträge sind allgemein; „Alle“ nutzt alle 21 Einträge, „Wortwahl“ alle außerhalb von `structure`.

| Korpus | Art | Texte | Alle | Wortwahl |
|---|---|---|---|---|
| `human-mc4-web` | Mensch, Web, Entwicklung | 2.000 | 0,1 % | 0,1 % |
| `human-mc4-web-holdout` | Mensch, Web, zurückgehalten | 1.000 | 0,0 % | 0,0 % |
| `human-mc4-news` | Mensch, Nachrichtenseiten | 814 | 0,0 % | 0,0 % |
| `human-mc4-shop` | Mensch, Shopseiten, Entwicklung | 370 | 0,0 % | 0,0 % |
| `human-mc4-shop-holdout` | Mensch, Shopseiten, zurückgehalten | 367 | 0,0 % | 0,0 % |
| `ai-general` | Claude, Entwicklung | 96 | 95,8 % | 19,8 % |
| `ai-general-holdout` | Claude, bei der Überprüfung gelesen | 96 | 96,9 % | 10,4 % |
| `ai-multi-holdout` | Claude und GPT, einfache Anfragen, zurückgehalten | 254 | 96,1 % | 2,4 % |
| `ai-detailed-holdout` | Claude, ausführliche Anfragen, zurückgehalten | 448 | 95,3 % | 2,7 % |

Die Einträge wurden an `ai-general` gefunden, deshalb sind die Zahlen dort zu günstig. `ai-general-holdout` wurde bei der Überprüfung in 0.3.0 gelesen und ist keine saubere Schätzung mehr. Die sauberen Zahlen auf zurückgehaltenem Text sind die von `ai-multi-holdout` und `ai-detailed-holdout`.

### Benutzung

Aus dem Ordner des Skills, mit Node 18 oder neuer:

```
node scripts/check.mjs de beitrag.txt
node scripts/check.mjs de - < email.txt
```

### Umlaute und ß

Umlaute werden nicht entfernt (`"foldDiacritics": false`), weil sie Wörter unterscheiden: würde und wurde, hätte und hatte, schön und schon. Ein Text ohne Umlaute („muede“, „fuer“) wird deshalb nicht erkannt. ß bleibt ß, damit „Maße“ und „Masse“ getrennt bleiben; Einträge mit ß akzeptieren auch die Schweizer Schreibung mit ss. Groß- und Kleinschreibung zählt nicht. Alle Einträge sind reguläre Ausdrücke, weil sie du, ihr und Sie sowie trennbare Verben abdecken müssen. Gendergerechte Formen („Kolleginnen und Kollegen“, „Autor:in“) und der Halbgeviertstrich mit Leerzeichen sind normales Deutsch und stehen auf keiner Liste.

### Korpora

- `human-mc4-web`, `human-mc4-web-holdout`: deutschsprachige Webseiten aus mC4 (Common Crawl 2013 bis 2020), nur die Absätze mit Fließtext.
- `human-mc4-news`: 814 Seiten von deutschen, österreichischen und Schweizer Nachrichtenseiten.
- `human-mc4-shop`, `human-mc4-shop-holdout`: 370 und 367 Shopseiten, nach URL ausgewählt und nicht von Hand geprüft.
- `tests/human-genres.json`: 65 Texte, die ein Sprachmodell (Claude) für den Test entworfen hat; sie wurden nicht von echten Schreibern geschrieben oder bei ihnen gesammelt: private und geschäftliche E-Mails, Antworten an Kollegen, Chatnachrichten, Social-Media- und LinkedIn-Beiträge, Vereins- und Schulnewsletter, Schulaufsätze, Protokolle, Rezensionen, Zeitungstexte, Shoptexte und Schweizer und österreichische Varianten. Keiner darf markiert werden; die Einträge wurden so lange eingeengt, bis keiner mehr markiert war, der Test ist also durch die Anlage bestanden.
- `ai-general`, `ai-general-holdout`: Claude Sonnet und Claude Haiku auf einfache deutsche Anfragen in sechs Textsorten, je acht Themen. Der zweite Satz hat neue Themen.
- `ai-multi-holdout`: 254 Antworten auf einzeilige einfache Anfragen (`scripts/multi-requests.json`) in sieben Textsorten, darunter ein Artikel mit etwa 800 Wörtern, zu acht neuen Themen. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 und Sonnet 4.5 (je 56 Texte), GPT-5.5 (6) und GPT-5.4 mini (24), ohne Systemprompt.
- `ai-detailed-holdout`: 448 Antworten auf 56 realistische Situationen mit konkreten Fakten (`scripts/detailed-scenarios.md`), jede kurz (A) und sorgfältig (B) angefragt, von den vier Claude-Modellen. Die Anfragen spielen in Deutschland, Österreich und der Schweiz und stehen in `scripts/detailed-requests/de.json`.

Details, Daten und Lizenzen stehen in `eval/sources.json`. Wie man die API-Korpora neu erzeugt, steht in [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made).

### Neu messen

Im Hauptordner, mit Node 18 oder neuer und ohne Pakete:

```
npm test                               # Schema, Beispiele, Umformulierungen, Fehlalarme, Testfälle, Skill
node de/eval/rebuild-web.mjs           # lädt vier mC4-Shards (etwa 135 MB) und baut die menschlichen Texte
node scripts/evaluate.mjs de           # Zählungen auf den vorhandenen Korpora
node scripts/evaluate.mjs de --write   # aktualisiert counts.csv und summary.txt
```

Die Texte landen in `eval/corpus-local/`, das git ignoriert. Jeder Text wird mit seinem SHA-256 geprüft.

### Grenzen

- Die Modelltexte stammen fast nur von Claude; GPT liefert 30 zurückgehaltene Texte. Gemini, Llama und Mistral fehlen.
- Die Raten auf Modelltext messen vor allem Chatreste. Ohne sie findet die Liste 2,7 % der Antworten auf ausführliche Anfragen.
- Die menschlichen Texte sind Web-, Nachrichten- und Shopseiten. Persönliche E-Mails, Essays und Blogbeiträge sind darin selten. `tests/human-genres.json` deckt diese Textsorten mit Texten ab, die ein Sprachmodell für den Test entworfen hat: Das zeigt, was die Regel in Ruhe lässt, ist aber keine gemessene Rate. Deshalb ist der Kommentaraufruf am Ende mittel, obwohl er fast nie auf menschlichen Text anschlug.
- mC4 verwirft Zeilen ohne Satzzeichen am Ende. Überschriften, Betreffzeilen, Aufzählungen und Hashtag-Zeilen lassen sich an menschlichem Text kaum prüfen.
- Fünf Einträge mit `corpus`-Beleg stützen sich auf 1 bis 3 Modelltexte aus der Entwicklung. Zwei Einträge zur Wortwahl schlugen auf keinem zurückgehaltenen Modelltext an.
- Die zurückgehaltenen Shopseiten teilen 50 ihrer 291 Hosts mit dem Entwicklungssatz.

### Quellen und Lizenzen

| Quelle | Verwendet für | Lizenz |
|---|---|---|
| [mC4, allenai/c4 multilingual](https://huggingface.co/datasets/allenai/c4), Revision `1588ec454efa1a09f29cd18ddd04fe05fc8653a2`, Validierungs-Shards 00000 bis 00003 von 00016 | menschliche Korpora; im Projekt nur URL, Datum, Shard und SHA-256 | ODC-BY 1.0 und Common-Crawl-Bedingungen; die Texte gehören den Seiten |
| [blader/humanizer](https://github.com/blader/humanizer) | Familien von Signalen und Arbeitsweise | MIT |

Die gemessenen und verworfenen Kandidaten stehen mit ihren Zahlen in `skill-notes.md`.

### Geschichte

Deutsch kam mit Version 0.3.0 (5. November 2026) dazu. Bei der Überprüfung in derselben Version lief die Liste über gewöhnliche E-Mails, Chats, Beiträge, Newsletter und Aufsätze, die ein Sprachmodell für einen Test entworfen hatte; die frühere Fassung markierte 25 der 65 Texte. Einträge, die darauf anschlugen, wurden eingeengt oder gestrichen, etwa der Kontrast „ist kein …, sondern“, die Hashtag-Zeile, Emoji als Aufzählungszeichen und das „Und du?“ am Ende. Details stehen in `CHANGELOG.md` und `skill-notes.md`.

---

## English

### What it is

`patterns.json` holds 21 phrases and habits that mark German text as written by a language model: blog and LinkedIn posts, emails, essays, articles, reports and product copy from Germany, Austria and Switzerland. Each entry has a reason, an example it must match, a rewrite and ordinary sentences it must not match. The `humanizer-lists` skill at the root uses the list, and `src/matcher.mjs` runs it on its own.

8 entries are high and 13 medium. All of them are general: no independent machine product copy in German was available to back a product-only entry. By category: structure 9, cliche-closer 5, cliche-opener 3, filler 2, hype 1, punctuation 1.

Precision comes first. Every entry was measured on human text from before November 2022 and on machine text.

### What it finds and what it misses

The list is the checker step of the humanizer. It finds what people forget to delete: Markdown headings and bold, square-bracket placeholders, the line that introduces the draft and the offer to adapt it ("Wenn du möchtest, passe ich den Ton gern an"). The chat-leftover entries fire only when the text talks about itself; "Wenn du willst, mache ich morgen den Einkauf" is left alone. It also knows some stock phrases, such as the closing call to comment and "Mein Fazit". It does not recognise model text that was well prompted and cleaned up, and it does not tell who wrote a text.

Clean held-out numbers come from two corpora generated through the OpenAI and Anthropic APIs after the list was final and measured once. The list flags 96.1% of 254 replies to plain requests (`ai-multi-holdout`) and 95.3% of 448 replies to detailed requests (`ai-detailed-holdout`). Nearly all of that is leftovers: the wording entries alone, meaning everything outside `structure`, flag 2.4% (6) and 2.7% (12). It flags none of the 1,000 held-out human web pages. It also flags none of the 65 texts in `tests/human-genres.json`, but a language model drafted those texts for the test and they were used to narrow the entries, so that result holds by design.

Texts flagged on wording, by genre, plain requests (37 per genre, 32 for the long article) then detailed requests (64 per genre): blog posts 5 (13.5%) and 6 (9.4%), emails 0 and 0, short essays 0 and 1 (1.6%), articles 1 (2.7%) and 1 (1.6%), Instagram posts 0 and 0, short reports 0 and 0, long articles of about 800 words 0 and 4 (6.3%).

On the plain requests, the 30 texts from GPT-5.5 and GPT-5.4 mini are flagged less often than the 224 Claude texts: 22 (73.3%) against 222 (99.1%). No GPT text and 6 Claude texts are flagged on wording. The GPT sample is small and shows a direction only. Careful detailed requests (style B) are flagged in 91.1% of cases, short ones (style A) in 99.6%; on wording alone, 8 B texts and 4 A texts are flagged.

A plain email, article or report without formatting gives the list almost nothing. A flag points at what to rewrite; no flag does not mean a person wrote the text.

### Results

The table in the German section is the output of `node scripts/evaluate.mjs de` (`eval/summary.txt`). All entries are general; "Alle" uses all 21 entries, "Wortwahl" those outside `structure`. The list flags 1 of 2,000 development web pages (0.1%) and none of the 1,000 held-out web pages, the 814 news pages, the 370 development shop pages or the 367 held-out shop pages. On held-out machine text it flags 96.1% of `ai-multi-holdout` (2.4% on wording) and 95.3% of `ai-detailed-holdout` (2.7% on wording). On `ai-general` it flags 95.8% (19.8% on wording) and on `ai-general-holdout` 96.9% (10.4%). The entries were found on `ai-general`, so its figures are optimistic, and `ai-general-holdout` was read during the 0.3.0 review, so it is no longer a clean estimate.

### How to use it

From the skill folder, with Node 18 or newer:

```
node scripts/check.mjs de post.txt
node scripts/check.mjs de - < email.txt
```

### Umlauts and ß

Diacritics are kept (`"foldDiacritics": false`) because umlauts tell words apart: würde and wurde, hätte and hatte, schön and schon. Text typed without umlauts ("muede", "fuer") is therefore not matched. ß is never folded, so "Maße" and "Masse" stay apart; entries that contain ß also accept the Swiss spelling with ss. Case is ignored. All entries are regexes, because they need to cover du, ihr and Sie forms and separable verbs. Gendered forms ("Kolleginnen und Kollegen", "Autor:in") and the spaced en dash are ordinary German and on no list.

### Corpora

- `human-mc4-web`, `human-mc4-web-holdout`: German-language web pages from mC4 (Common Crawl 2013 to 2020), running-text paragraphs only.
- `human-mc4-news`: 814 pages from German, Austrian and Swiss news sites.
- `human-mc4-shop`, `human-mc4-shop-holdout`: 370 and 367 shop pages, picked by URL and not read by hand.
- `tests/human-genres.json`: 65 texts drafted for the test by a language model (Claude), not written or collected from real writers: personal and business emails, replies to colleagues, chat messages, social and LinkedIn posts, club and school newsletters, school essays, minutes, reviews, journalism, shop texts, and Swiss and Austrian variants. None may be flagged; the entries were narrowed until none was, so the test passes by design.
- `ai-general`, `ai-general-holdout`: Claude Sonnet and Claude Haiku answering plain German requests in six genres, eight topics each. The second set has new topics.
- `ai-multi-holdout`: 254 replies to plain one-line requests (`scripts/multi-requests.json`) in seven genres, including an article of about 800 words, on eight new topics. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 (56 texts each), GPT-5.5 (6) and GPT-5.4 mini (24), with no system prompt.
- `ai-detailed-holdout`: 448 replies to 56 realistic scenarios with concrete facts (`scripts/detailed-scenarios.md`), each asked briefly (A) and carefully (B), from the four Claude models. The requests are set in Germany, Austria and Switzerland and are in `scripts/detailed-requests/de.json`.

Details, dates and licenses are in `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) explains how to regenerate the API corpora.

### Reproducing

The commands are in the German section under "Neu messen": `npm test`, `node de/eval/rebuild-web.mjs` (four mC4 shards, about 135 MB), `node scripts/evaluate.mjs de` and `node scripts/evaluate.mjs de --write`. Rebuilt texts go to `eval/corpus-local/`, which git ignores, and each one is checked against its SHA-256.

### Limitations

- The machine texts are almost all Claude; GPT supplies 30 held-out texts. Gemini, Llama and Mistral are missing.
- The rates on machine text mostly measure chat leftovers. Without them, the list catches 2.7% of the replies to detailed requests.
- The human texts are web, news and shop pages. Personal emails, essays and blog posts are rare in them. `tests/human-genres.json` covers those genres with texts a model drafted for the test: it shows what the rule leaves alone, but it is not a measured rate. That is why the closing call to comment is medium even though it fired on almost no human text.
- mC4 drops lines without end punctuation, so headings, subject lines, bullets and hashtag lines are barely testable on human text.
- Five entries with `corpus` evidence rest on 1 to 3 development machine texts. Two wording entries fired on no held-out machine text.
- The held-out shop pages share 50 of their 291 hosts with the development set.

### Sources and licenses

See the table in the German section: mC4 (allenai/c4, revision `1588ec454efa1a09f29cd18ddd04fe05fc8653a2`, validation shards 00000 to 00003 of 00016; ODC-BY 1.0 plus Common Crawl terms; metadata only) and blader/humanizer (MIT). The candidates measured and left out, with their numbers, are in `skill-notes.md`.

### History

German was added in version 0.3.0 (November 5, 2026). In the review of the same version, the list was run on ordinary emails, chats, posts, newsletters and essays drafted by a model for a test; the earlier version flagged 25 of the 65 texts. Entries that fired on them were narrowed or removed, for example the "ist kein …, sondern" contrast, the hashtag line, emoji bullets and the closing "Und du?". Details are in `CHANGELOG.md` and `skill-notes.md`.

License: MIT, see `LICENSE` at the root. Third-party sources keep their own terms; see `NOTICE.md`.
