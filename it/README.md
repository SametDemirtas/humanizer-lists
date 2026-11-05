# Segnali di scrittura AI nei testi in italiano

[English version below](#english)

Questa cartella contiene l'elenco misurato. La skill `humanizer-lists` riscrive il testo intero seguendo la guida italiana [`guides/it.md`](../skills/humanizer-lists/guides/it.md); l'elenco e lo script di controllo sono un passo di aiuto.

This folder holds the measured list. The `humanizer-lists` skill rewrites the whole text using the Italian guide [`guides/it.md`](../skills/humanizer-lists/guides/it.md); the list and the checker are a helper step.

## Italiano

### Che cos'è

`patterns.json` è un elenco di 81 espressioni e abitudini di scrittura che compaiono spesso nei testi italiani scritti da un modello linguistico: post per blog e social, email, saggi, articoli, relazioni e schede prodotto. Ogni voce ha una spiegazione, un esempio su cui deve scattare, una riscrittura e alcune frasi normali su cui non deve scattare. Lo usa la skill `humanizer-lists` alla radice del progetto, e si può usare da solo con `src/matcher.mjs`.

Le voci sono 11 di livello `high` e 70 `medium`. 79 sono generali e valgono per qualsiasi testo; 2 (`it-lineetta-em-dash`, `it-caporali`) valgono solo per titoli e descrizioni di prodotto. Per categoria: hype 25, structure 13, cliche-closer 11, filler 9, cliche-opener 7, vague-praise 7, false-contrast 4, punctuation 2, urgency 2, rhetorical-question 1.

La priorità è non segnalare testi scritti da persone. Ogni voce è stata misurata su testi umani pubblicati prima di novembre 2022 e su testi prodotti da modelli.

### Cosa trova e cosa no

L'elenco serve a ripulire un testo copiato da una chat e ad aiutare chi lo rivede. Trova quello che si dimentica di cancellare: titoletti e grassetti Markdown, segnaposto tra parentesi quadre, la riga che presenta la bozza e l'offerta di adattarla ("Se vuoi, posso adattarlo a un tono più formale"). Le voci sui resti della chat scattano solo quando il testo parla di sé stesso; "Se vuoi, posso preparare io la torta" resta fuori. Conosce anche alcune frasi fatte. Non riconosce un testo di un modello scritto con una buona richiesta e ripulito, e non stabilisce chi ha scritto un testo.

Due corpus generati con le API di OpenAI e Anthropic dopo che l'elenco era chiuso, e misurati una volta sola, danno numeri puliti su testi tenuti da parte. Le voci generali segnalano il 98,8% delle 254 risposte a richieste semplici (`ai-multi-holdout`) e il 91,3% delle 448 risposte a richieste dettagliate (`ai-detailed-holdout`). Quasi tutto viene dai resti: le sole voci di formulazione, cioè le voci generali fuori da `structure`, segnalano il 19,3% (49) e il 2,7% (12). Sulle 1.000 pagine web umane tenute da parte le voci generali segnalano lo 0,4% (4). Non segnalano nessuno dei 61 testi di `tests/human-genres.json`, ma quei testi li ha scritti un modello linguistico per la prova e sono serviti a restringere le voci, quindi questo risultato è garantito per costruzione.

Testi segnalati per la sola formulazione, per genere:

| Genere | Richieste semplici (37; 32 per l'articolo lungo) | Richieste dettagliate (64) |
|---|---|---|
| Post per blog | 11 (29,7%) | 3 (4,7%) |
| Email | 0 | 0 |
| Saggio breve | 13 (35,1%) | 5 (7,8%) |
| Articolo | 9 (24,3%) | 1 (1,6%) |
| Post per Instagram | 1 (2,7%) | 0 |
| Relazione breve | 4 (10,8%) | 0 |
| Articolo lungo (circa 800 parole) | 11 (34,4%) | 3 (4,7%) |

Sulle richieste semplici, i 30 testi di GPT-5.5 e GPT-5.4 mini sono segnalati meno spesso dei 224 di Claude (27 su 30, cioè il 90,0%, contro 224 su 224, il 100%), ma sulla sola formulazione di più (9 su 30, il 30,0%, contro 40 su 224, il 17,9%). Il campione GPT è piccolo e indica solo una direzione. Le richieste dettagliate scritte con cura (stile B) sono segnalate nell'84,4% dei casi, quelle brevi (stile A) nel 98,2%.

Un'email o una relazione sobria scritta da un modello, con i segnaposto riempiti e l'offerta finale cancellata, di solito non contiene nulla che un elenco di frasi possa prendere. Una segnalazione indica cosa riscrivere; l'assenza di segnalazioni non dice che il testo è di una persona.

### Risultati

Uscita di `node scripts/evaluate.mjs it` (`eval/summary.txt`). "Tutte" usa tutte le 81 voci, "generali" le 79 voci generali, "formulazione" le voci generali fuori da `structure`.

| Corpus | Tipo | Testi | Tutte | Generali | Formulazione |
|---|---|---|---|---|---|
| `human-mc4-web` | umano, web, sviluppo | 1.436 | 0,3% | 0,1% | 0,1% |
| `human-mc4-web-holdout` | umano, web, tenuto da parte | 1.000 | 0,7% | 0,4% | 0,2% |
| `desegma-human` | umano, giornali | 2.000 | 0,8% | 0,1% | 0,1% |
| `human-mc4-shop` | umano, prodotti, sviluppo | 792 | 1,4% | 1,3% | 1,3% |
| `human-mc4-shop-holdout` | umano, prodotti, tenuto da parte | 346 | 1,2% | 0,6% | 0,6% |
| `ai-general` | Claude, sviluppo | 96 | 96,9% | 95,8% | 26,0% |
| `ai-general-holdout` | Claude, letto durante la revisione | 96 | 97,9% | 97,9% | 10,4% |
| `ai-multi-holdout` | Claude e GPT, richieste semplici, tenuto da parte | 254 | 98,8% | 98,8% | 19,3% |
| `ai-detailed-holdout` | Claude, richieste dettagliate, tenuto da parte | 448 | 91,5% | 91,3% | 2,7% |
| `desegma-machine` | giornali generati | 2.000 | 10,2% | 8,9% | 7,8% |
| `ai-models` | schede prodotto di Claude | 200 | 33,5% | 22,0% | 19,5% |
| `ai-imitation` | imitazione, solo controllo | 80 | 51,3% | 51,3% | 50,0% |

Sui testi generici usa le voci generali, sulle schede prodotto tutte le voci. Le voci sulla formulazione aggiunte nella 0.3.0 vengono in parte da `ai-general` e in parte da `desegma-machine`, quindi le percentuali di quei due corpus sono ottimistiche. `ai-general-holdout` è stato letto durante la revisione della 0.3.0 e non è più una stima pulita. I numeri puliti su testi tenuti da parte sono quelli di `ai-multi-holdout` e `ai-detailed-holdout`.

Sulle schede prodotto alcune voci superano la soglia dell'1%: `it-un-tocco-di` (2,6% delle pagine prodotto tenute da parte, 1,9% di quelle di sviluppo), `it-caporali` (2,6% delle pagine tenute da parte), `it-regalo-perfetto` e `it-senza-rinunciare` (1,1% delle pagine prodotto di sviluppo). Sono tutte medium e da sole non segnalano nulla.

### Come si usa

Dalla cartella della skill, con Node 18 o successivo:

```
node scripts/check.mjs it post.txt
node scripts/check.mjs it scheda.json --product    # {"title": "...", "description": "..."}
```

Lo script stampa ogni frase segnalata con la voce, il livello, le parole trovate e il motivo. Senza `--product` usa solo le voci generali.

### Gli accenti contano

Le liste spagnola e olandese ignorano gli accenti; quella italiana no, come quella tedesca, perché gli accenti distinguono parole diverse: "è" e "e", "sì" e "si". Per questo `patterns.json` contiene `"foldDiacritics": false`. Se li si ignorava, le voci scattavano su altri quattro testi umani (per esempio "Il forno? Si accende con un sms", letto come "sì"). "perché" quindi non equivale a "perche", e una frase scritta senza accenti può sfuggire. Le regex coprono genere e numero dove serve (`aggiungil[oaie]`, `perfett[oaie]`). Alcune voci guardano l'inizio della frase o della riga: controlla titolo e testo separatamente.

### Corpus

- `human-mc4-web`, `human-mc4-web-holdout`: pagine web italiane da mC4 (Common Crawl, 2013 a 2020), solo i paragrafi di prosa.
- `desegma-human`, `desegma-machine`: 2.000 articoli umani e 2.000 generati da DeSegMa-IT (EVALITA 2026). Le date non sono indicate.
- `human-mc4-shop`, `human-mc4-shop-holdout`: pagine di prodotto da mC4; il secondo gruppo viene da altri file e altri siti.
- `tests/human-genres.json`: 61 testi scritti da un modello linguistico (Claude) per la prova, non scritti né raccolti da persone reali: email personali e di lavoro, messaggi WhatsApp, post social e LinkedIn, notiziari di scuola e parrocchia, temi, articoli d'opinione, verbali, recensioni, articoli di giornale e una piccola scheda prodotto. Nessuno può essere segnalato; le voci sono state ristrette finché nessuno lo era, quindi la prova è superata per costruzione.
- `ai-general`, `ai-general-holdout`: Claude Sonnet e Claude Haiku rispondono a richieste semplici in sei generi, otto argomenti ciascuno. Il secondo gruppo ha argomenti nuovi.
- `ai-multi-holdout`: 254 risposte a richieste semplici di una riga (`scripts/multi-requests.json`) in sette generi, compreso un articolo di circa 800 parole, su otto argomenti nuovi. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 e Sonnet 4.5 (56 testi ciascuno), GPT-5.5 (6) e GPT-5.4 mini (24), senza prompt di sistema.
- `ai-detailed-holdout`: 448 risposte a 56 situazioni realistiche con fatti concreti (`scripts/detailed-scenarios.md`), ognuna chiesta in modo breve (A) e con cura (B), dai quattro modelli Claude. Le richieste sono in `scripts/detailed-requests/it.json`.
- `ai-models`: 200 schede di Claude Sonnet, Haiku e Opus su richieste realistiche di venditori. `ai-imitation`: 80 schede generate conoscendo i candidati, utili solo come controllo.

Dettagli, date e licenze in `eval/sources.json`. Come rigenerare i corpus via API è spiegato in [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made).

### Rifare le misure

Dalla radice del progetto, con Node 18 o successivo e nessuna dipendenza:

```
npm test                                      # schema, esempi, riscritture, falsi positivi, casi di prova, skill
node it/eval/rebuild-human.mjs                # scarica 15 file mC4 (circa 2,4 GB): pagine prodotto e web
node it/eval/rebuild-web.mjs                  # scarica un file mC4 (circa 30 MB): pagine web tenute da parte
node it/eval/rebuild-desegma.mjs FILE.csv     # ricostruisce il campione DeSegMa-IT dal CSV del compito
node scripts/evaluate.mjs it                  # conteggi sui corpus presenti
node scripts/evaluate.mjs it --write          # aggiorna counts.csv e summary.txt
```

I testi ricostruiti finiscono in `eval/corpus-local/`, che git ignora. Ogni testo viene controllato con il suo SHA-256.

### Limiti

- I testi generati vengono quasi solo da Claude; GPT conta 30 testi tenuti da parte. Mancano Gemini, Llama e Mistral.
- Le percentuali sui testi generati misurano soprattutto i resti della chat. Tolti quelli, l'elenco prende il 2,7% delle risposte a richieste dettagliate.
- I corpus umani generali sono pagine web e articoli di giornale. Email personali, saggi e post sono pochi. `tests/human-genres.json` copre quei generi con testi scritti da un modello per la prova: mostra cosa la regola lascia stare, ma non è una percentuale misurata. Per questo il congedo che invita a commentare è medium.
- 21 voci con prova `corpus` si basano su 1 a 3 testi generati di sviluppo. L'etichetta è corretta, ma la prova è debole.
- Le pagine prodotto umane parlano di mobili, moda, cosmetici e cancelleria più che di regali personalizzati. Alcune pagine mC4 "umane" sono traduzioni automatiche dall'inglese.
- Le maiuscole non contano, quindi l'elenco non vede i Titoli Con Tutte Le Iniziali Maiuscole. Non vede nemmeno le triadi forzate o le frasi tutte della stessa lunghezza.

### Fonti e licenze

| Fonte | Uso | Licenza |
|---|---|---|
| [blader/humanizer](https://github.com/blader/humanizer), regolamento inglese | struttura delle categorie e metodo | MIT |
| [mC4, allenai/c4 multilingual](https://huggingface.co/datasets/allenai/c4) | corpus umani; nel progetto solo URL, data, file di origine e SHA-256 | ODC-BY 1.0, più le condizioni d'uso di Common Crawl; i testi appartengono ai siti |
| [DeSegMa-IT, EVALITA 2026](https://desegma.github.io/tasks/) (Esuli, Pedrotti, Puccetti, ISTI-CNR) | articoli umani e generati; nel progetto solo numeri di riga e SHA-256 | non indicata |
| G. Antonelli, "Storia brevissima (ma molto intensa) dell'IA-taliano", 2025 ([fascicolo](https://riviste.unimi.it/index.php/LCdM/issue/download/2686/835)) e [intervista su il Giornale](https://www.ilgiornale.it/news/lia-taliano-rischia-diventare-nuova-norma-2636318.html) | connettivi forti a inizio frase e strutture bipartite | diritti riservati, solo come indizio |
| [hypnosdesign/claude-skill-scrittura-italiana](https://github.com/hypnosdesign/claude-skill-scrittura-italiana), dal libro di C. Giunta *Come non scrivere* (UTET, 2018) | "un vero e proprio", "prestigioso", "esclusivo" | CC BY-SA 4.0, solo come indizio, nessun testo copiato |
| A.-M. De Cesare, D. Mantovani, studio sui suffissi nell'italiano dell'IA generativa (Università di Bergamo, [AIsberg](https://aisberg.unibg.it/)) | calchi e interferenza dall'inglese | non letto per intero; citato come pista |
| T. Juzek, Z. Ward, "Why Does ChatGPT 'Delve' So Much?", COLING 2025 ([arXiv 2412.11385](https://arxiv.org/abs/2412.11385)) | metodo per misurare le parole sovrarappresentate | arXiv, solo come indizio |
| [Shopify Italia, errori di copywriting](https://www.shopify.com/it/blog/errori-copywriting), [Oberlo, descrizione prodotto](https://www.oberlo.com/it/blog/descrizione-prodotto) | consigli contro aggettivi vuoti nelle schede | diritti riservati, solo come indizio |

Non esiste una versione italiana della pagina di Wikipedia "Signs of AI writing". I candidati misurati e scartati, con i numeri, sono in `skill-notes.md`.

### Storia

La versione 0.1.0 (27 ottobre 2026) era un elenco di 63 voci (10 high, 53 medium) per le sole schede prodotto, scelto fra circa 140 candidati. È stato misurato sulle 792 pagine prodotto mC4, su 346 pagine tenute da parte, su 200 schede di Claude e sulle 80 imitazioni. Allora la regola segnalava lo 0,9% delle pagine prodotto tenute da parte (3 su 346), l'1,3% di quelle di sviluppo (10 su 792) e il 34% delle schede di Claude: il 20% con richieste semplici e il 55% quando il venditore chiedeva una descrizione "accattivante e persuasiva". I segnali più frequenti erano "per chi ama / per gli amanti dei" (38%), "il regalo perfetto / idea regalo" (24%), le virgolette basse (23%) e "un tocco di" (8,5%). Una regola più severa, che conta solo voci medium di due categorie diverse, segnalava lo 0,6% delle pagine prodotto e il 27% delle schede di Claude.

La 0.2.0 ha misurato ogni voce anche sulla prosa generale e ha aggiunto le voci sui resti della chat. La 0.3.0 ha aggiunto 17 voci sulla formulazione. Una revisione su email, chat, post, notiziari e temi comuni, scritti da un modello apposta per una prova, ha poi ristretto le voci che li segnalavano e ne ha tolte sei, fra cui quella sulle emoji e la domanda finale "E tu?"; `it-chat-offerta-tono` assorbe la vecchia voce sull'offerta di riscrivere. I dettagli sono in `CHANGELOG.md` e in `skill-notes.md`.

---

## English

### What it is

`patterns.json` is a list of 81 phrases and writing habits that show up often in Italian text written by a language model: blog and social posts, emails, essays, articles, reports and product listings. Each entry has an explanation, an example it must match, a rewrite, and a few ordinary sentences it must not match. The `humanizer-lists` skill at the root of the project uses it, and it also works on its own with `src/matcher.mjs`.

There are 11 `high` and 70 `medium` entries. 79 are general and apply to any text; 2 (`it-lineetta-em-dash`, `it-caporali`) apply only to product titles and descriptions. By category: hype 25, structure 13, cliche-closer 11, filler 9, cliche-opener 7, vague-praise 7, false-contrast 4, punctuation 2, urgency 2, rhetorical-question 1.

Not flagging human writing comes first. Every entry was measured on human text published before November 2022 and on model output.

### What it finds and what it misses

The list is the checker step of the humanizer. It finds what people forget to delete: Markdown headings and bold, square-bracket placeholders, the line that introduces the draft, and the offer to adapt it ("Se vuoi, posso adattarlo a un tono più formale"). The chat-leftover entries fire only when the text talks about itself; "Se vuoi, posso preparare io la torta" is left alone. It also knows some stock phrases. It does not recognise model text that was well prompted and cleaned up, and it does not tell who wrote a text.

Two corpora generated through the OpenAI and Anthropic APIs after the list was final, and measured once, give the clean held-out numbers. The general entries flag 98.8% of 254 replies to plain requests (`ai-multi-holdout`) and 91.3% of 448 replies to detailed requests (`ai-detailed-holdout`). Nearly all of that comes from leftovers: the wording entries alone, meaning the general entries outside `structure`, flag 19.3% (49) and 2.7% (12). On the 1,000 held-out human web pages the general entries flag 0.4% (4). They flag none of the 61 texts in `tests/human-genres.json`, but a language model drafted those texts for the test and they were used to narrow the entries, so that result holds by design.

Texts flagged on wording, by genre, plain requests (37 per genre, 32 for the long article) then detailed requests (64 per genre): blog posts 11 (29.7%) and 3 (4.7%), emails 0 and 0, short essays 13 (35.1%) and 5 (7.8%), articles 9 (24.3%) and 1 (1.6%), Instagram posts 1 (2.7%) and 0, short reports 4 (10.8%) and 0, long articles of about 800 words 11 (34.4%) and 3 (4.7%).

On the plain requests, the 30 texts from GPT-5.5 and GPT-5.4 mini are flagged less often than the 224 Claude texts (27 of 30 = 90.0% against 224 of 224 = 100%), but more often on wording alone (9 of 30 = 30.0% against 40 of 224 = 17.9%). The GPT sample is small and shows a direction only. Careful detailed requests (style B) are flagged in 84.4% of cases, short ones (style A) in 98.2%.

A sober model email or report, with the placeholders filled in and the closing offer deleted, usually has nothing a phrase list can catch. A flag points at what to rewrite; no flag does not mean a person wrote the text.

### Results

The table in the Italian section is the output of `node scripts/evaluate.mjs it` (`eval/summary.txt`). "Tutte" uses all 81 entries, "generali" the 79 general entries, "formulazione" the general entries outside `structure`. In short:

- Human text, general entries: 0.1% of 1,436 development web pages, 0.4% of 1,000 held-out web pages, 0.1% of 2,000 DeSegMa-IT news articles. Product pages, all entries: 1.4% of 792 development and 1.2% of 346 held-out pages.
- Held-out machine text, general entries then wording: `ai-multi-holdout` 98.8% and 19.3%, `ai-detailed-holdout` 91.3% and 2.7%.
- Development and earlier sets: `ai-general` 95.8% and 26.0%, `ai-general-holdout` 97.9% and 10.4%, DeSegMa-IT machine news 8.9% and 7.8%. Claude product listings, all entries: 33.5%.
- The wording entries added in 0.3.0 were drawn partly from `ai-general` and partly from `desegma-machine`, so the rates on those two corpora are optimistic. `ai-general-holdout` was read during the 0.3.0 review and is no longer a clean estimate. The clean held-out figures are those of `ai-multi-holdout` and `ai-detailed-holdout`.
- On product copy, `it-un-tocco-di` (2.6% of held-out product pages, 1.9% of development ones), `it-caporali` (2.6% of held-out pages), `it-regalo-perfetto` and `it-senza-rinunciare` (1.1% of development product pages) go above the 1% bar. All are medium and flag nothing alone.

Use the general entries on general prose and all entries on product copy.

### How to use it

From the skill folder, with Node 18 or newer:

```
node scripts/check.mjs it post.txt
node scripts/check.mjs it listing.json --product    # {"title": "...", "description": "..."}
```

The script prints each flagged sentence with the entry, level, matched words and reason. Without `--product` it uses the general entries only.

### Accents count

The Spanish and Dutch lists ignore accents. Italian does not, and neither does German, because accents tell words apart: "è" (is) and "e" (and), "sì" (yes) and "si". So `patterns.json` sets `"foldDiacritics": false`. With folding, entries fired on four more human texts (for example "Il forno? Si accende con un sms", read as "sì"). "perché" therefore does not equal "perche", and a sentence typed without accents can slip through. Regexes cover gender and number where needed (`aggiungil[oaie]`, `perfett[oaie]`). Some entries look at the start of a sentence or line, so check a title and a body separately.

### Corpora

- `human-mc4-web`, `human-mc4-web-holdout`: Italian web pages from mC4 (Common Crawl, 2013 to 2020), prose paragraphs only.
- `desegma-human`, `desegma-machine`: 2,000 human and 2,000 machine news articles from DeSegMa-IT (EVALITA 2026). Undated.
- `human-mc4-shop`, `human-mc4-shop-holdout`: product pages from mC4; the second set comes from other files and other sites.
- `tests/human-genres.json`: 61 texts drafted for the test by a language model (Claude), not written or collected from real writers: personal and business emails, WhatsApp messages, social and LinkedIn posts, school and parish newsletters, school essays, opinion pieces, minutes, reviews, news articles and a small product text. None may be flagged; the entries were narrowed until none was, so the test passes by design.
- `ai-general`, `ai-general-holdout`: Claude Sonnet and Claude Haiku answering plain requests in six genres, eight topics each. The second set has new topics.
- `ai-multi-holdout`: 254 replies to plain one-line requests (`scripts/multi-requests.json`) in seven genres, including an article of about 800 words, on eight new topics. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 (56 texts each), GPT-5.5 (6) and GPT-5.4 mini (24), with no system prompt.
- `ai-detailed-holdout`: 448 replies to 56 realistic scenarios with concrete facts (`scripts/detailed-scenarios.md`), each asked briefly (A) and carefully (B), from the four Claude models. The requests are in `scripts/detailed-requests/it.json`.
- `ai-models`: 200 listings from Claude Sonnet, Haiku and Opus answering realistic seller requests. `ai-imitation`: 80 listings generated with the candidates in view, a sanity check only.

Details, dates and licenses are in `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) explains how to regenerate the API corpora.

### Reproducing

The commands are in the Italian section under "Rifare le misure": `npm test`, `node it/eval/rebuild-human.mjs` (15 mC4 files, about 2.4 GB: product and web pages), `node it/eval/rebuild-web.mjs` (one mC4 file, about 30 MB: held-out web pages), `node it/eval/rebuild-desegma.mjs FILE.csv`, `node scripts/evaluate.mjs it` and `node scripts/evaluate.mjs it --write`. Rebuilt texts go to `eval/corpus-local/`, which git ignores, and each one is checked against its SHA-256.

### Limitations

- The machine text is almost all Claude; GPT accounts for 30 held-out texts. Gemini, Llama and Mistral output is missing.
- The rates on machine text mostly measure chat leftovers. Without them, the list catches 2.7% of the replies to detailed requests.
- The general human corpora are web pages and news. Personal emails, essays and posts are a small part of them. `tests/human-genres.json` covers those genres with texts a model drafted for the test: it shows what the rule leaves alone, but it is not a measured rate. That is why the sign-off that asks for comments is medium.
- 21 entries with `corpus` evidence rest on 1 to 3 development machine texts. The label is accurate, but the evidence is thin.
- The human product pages cover furniture, fashion, cosmetics and stationery more than personalised gifts. Some "human" mC4 pages are machine translations from English.
- Case is ignored, so Title Case Titles are not seen. Forced triads and uniform sentence length are not seen either.

### Sources and licenses

See the table in the Italian section: blader/humanizer (MIT) for structure and method; mC4 (ODC-BY 1.0 plus Common Crawl terms) for the human corpora, of which only URLs, dates, source files and hashes are in the repository; DeSegMa-IT (no license stated, row numbers and hashes only); Antonelli 2025, De Cesare and Mantovani, Juzek and Ward (COLING 2025), hypnosdesign/claude-skill-scrittura-italiana (CC BY-SA 4.0), Shopify Italia and Oberlo as evidence only, with no text copied. Wikipedia's "Signs of AI writing" has no Italian version. The candidates measured and left out, with their numbers, are in `skill-notes.md`.

### History

Version 0.1.0 (October 27, 2026) was a list of 63 entries (10 high, 53 medium) for product listings only, chosen from about 140 candidates. It was measured on the 792 mC4 product pages, 346 held-out pages, 200 Claude listings and the 80 imitations. Then, the rule flagged 0.9% of the held-out product pages (3 of 346), 1.3% of the development pages (10 of 792) and 34% of the Claude listings: 20% for plain requests and 55% when the seller asked for a "catchy, persuasive" description. The most frequent tells were "per chi ama / per gli amanti dei" (38%), "il regalo perfetto / idea regalo" (24%), caporali quotes (23%) and "un tocco di" (8.5%). A stricter rule that counts only medium hits from two different categories flagged 0.6% of the product pages and 27% of the Claude listings.

Version 0.2.0 measured every entry on general prose as well and added the chat-leftover entries. Version 0.3.0 added 17 wording entries. A review on ordinary emails, chats, posts, newsletters and essays, drafted by a model for a test, then narrowed the entries that flagged them and removed six, among them the emoji entry and the closing question "E tu?"; `it-chat-offerta-tono` takes over the old entry for the offer to rewrite. Details are in `CHANGELOG.md` and `skill-notes.md`.

The repository is released under the MIT license (see `LICENSE` at the root). Third-party sources keep their own terms; see `NOTICE.md`.
