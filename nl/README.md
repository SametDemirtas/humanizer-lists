# AI-signalen in Nederlandse tekst (nl)

[English version below](#english)

Deze map bevat de gemeten lijst. De skill `humanizer-lists` herschrijft de hele tekst volgens de Nederlandse gids [`guides/nl.md`](../skills/humanizer-lists/guides/nl.md); de lijst en de checker zijn een hulpstap.

This folder holds the measured list. The `humanizer-lists` skill rewrites the whole text using the Dutch guide [`guides/nl.md`](../skills/humanizer-lists/guides/nl.md); the list and the checker are a helper step.

## Nederlands

### Wat het is

`patterns.json` bevat 86 patronen die erop wijzen dat een Nederlandse of Vlaamse tekst door een taalmodel is geschreven: blog- en socialmediaberichten, e-mails, essays, artikelen, verslagen en productteksten. Elk patroon heeft een uitleg, een voorbeeld waarop het moet afgaan, een herschrijving en gewone zinnen waarop het niet mag afgaan. De skill `humanizer-lists` in de hoofdmap gebruikt de lijst, en `src/matcher.mjs` voert haar ook los uit.

Er zijn 14 `high`- en 72 `medium`-patronen. 83 zijn algemeen en gelden voor elke tekst; 3 (`nl-stel-je-voor`, `nl-kortom-zinsbegin` en `nl-serial-comma`) gelden alleen voor producttitels en -beschrijvingen. Per categorie: hype 28, cliche-opener 13, filler 12, structure 9, vague-praise 8, cliche-closer 5, false-contrast 4, urgency 3, punctuation 2, rhetorical-question 2.

Precisie gaat voor. Elk patroon is gemeten op menselijke tekst van vóór november 2022 en op AI-tekst.

### Wat het vindt en wat niet

De lijst is bedoeld om tekst op te schonen die uit een chat is geplakt, en als hulp bij het redigeren. Ze vindt wat mensen vergeten te verwijderen: Markdown-koppen en vetgedrukte labels, plaatshouders tussen vierkante haken, de zin die het concept aankondigt en het aanbod om het aan te passen ("Wil je dat ik de toon aanpas?"). De patronen voor chatresten gaan alleen af als de tekst over zichzelf praat; "Wil je dat ik morgen de boodschappen doe?" blijft ongemoeid. Daarnaast kent ze een aantal vaste formules. Ze herkent geen modeltekst die met een goed verzoek is gemaakt en daarna is opgeschoond, en ze zegt niet wie een tekst heeft geschreven.

Twee corpora die via de API's van OpenAI en Anthropic zijn gemaakt nadat de lijst vaststond, en die één keer zijn gemeten, geven zuivere cijfers op achtergehouden tekst. De algemene patronen markeren 97,6% van 254 antwoorden op eenvoudige verzoeken (`ai-multi-holdout`) en 93,1% van 448 antwoorden op uitgebreide verzoeken (`ai-detailed-holdout`). Bijna alles komt van de resten: de patronen voor woordkeus alleen, dus de algemene patronen buiten `structure`, markeren 3,5% (9) en 1,3% (6). Op de 1.000 achtergehouden menselijke webpagina's markeren de algemene patronen 0,3% (3). Ze markeren geen van de 82 teksten in `tests/human-genres.json`, maar die teksten heeft een taalmodel voor de test opgesteld en ze zijn gebruikt om de patronen te versmallen, dus dat resultaat staat vast door de opzet.

Teksten die op woordkeus gemarkeerd zijn, per genre:

| Genre | Eenvoudige verzoeken (37; 32 voor het lange artikel) | Uitgebreide verzoeken (64) |
|---|---|---|
| Blogbericht | 6 (16,2%) | 2 (3,1%) |
| E-mail | 0 | 0 |
| Kort essay | 0 | 3 (4,7%) |
| Artikel | 0 | 0 |
| Instagrambericht | 1 (2,7%) | 0 |
| Kort verslag | 0 | 0 |
| Lang artikel (ongeveer 800 woorden) | 2 (6,3%) | 1 (1,6%) |

Bij de eenvoudige verzoeken worden de 30 teksten van GPT-5.5 en GPT-5.4 mini minder vaak gemarkeerd dan de 224 van Claude: 25 (83,3%) tegen 223 (99,6%). Op woordkeus gaat het om 1 GPT-tekst en 8 Claude-teksten. De GPT-steekproef is klein en geeft alleen een richting aan. Zorgvuldige uitgebreide verzoeken (stijl B) worden in 86,6% van de gevallen gemarkeerd, korte (stijl A) in 99,6%.

Zakelijke e-mails en verslagen van een model hebben geen treffer op woordkeus meer zodra de plaatshouders, labels en chataanbiedingen weg zijn: daar valt voor een lijst niets te vangen. Een markering wijst aan wat herschreven kan worden; geen markering betekent niet dat een mens de tekst schreef.

### Resultaten

Uitvoer van `node scripts/evaluate.mjs nl` (`eval/summary.txt`). "Alle" gebruikt alle 86 patronen, "algemeen" de 83 algemene, "woordkeus" de algemene buiten `structure`.

| Corpus | Soort | Teksten | Alle | Algemeen | Woordkeus |
|---|---|---|---|---|---|
| `human-mc4-web` | mens, web, ontwikkeling | 2.000 | 0,8% | 0,3% | 0,3% |
| `human-mc4-web-holdout` | mens, web, achtergehouden | 1.000 | 0,7% | 0,3% | 0,3% |
| `human-mc4-news` | mens, nieuwssites | 599 | 0,5% | 0,0% | 0,0% |
| `human-mc4-wide` | mens, webshops, ontwikkeling | 2.805 | 0,1% | 0,0% | 0,0% |
| `human-mc4-reviewed` | mens, webshops, met de hand gecontroleerd | 269 | 0,0% | 0,0% | 0,0% |
| `human-mc4-heldout` | mens, webshops, achtergehouden | 790 | 0,0% | 0,0% | 0,0% |
| `ai-general` | Claude, ontwikkeling | 96 | 100,0% | 100,0% | 22,9% |
| `ai-general-holdout` | Claude, gelezen tijdens de review | 96 | 100,0% | 100,0% | 3,1% |
| `ai-multi-holdout` | Claude en GPT, eenvoudige verzoeken, achtergehouden | 254 | 97,6% | 97,6% | 3,5% |
| `ai-detailed-holdout` | Claude, uitgebreide verzoeken, achtergehouden | 448 | 93,3% | 93,1% | 1,3% |
| `ai-clin33` | GPT-4 en Vicuna (CLIN33) | 650 | 9,4% | 7,7% | 7,7% |
| `ai-gpt4-ultrachat` | GPT-4-productteksten | 8 | 37,5% | 37,5% | 37,5% |
| `ai-imitation` | imitatie, alleen controle | 120 | 40,0% | 36,7% | 33,3% |

Gebruik de algemene patronen op gewone tekst en alle patronen op producttekst. Van de 17 patronen voor woordkeus die in 0.3.0 zijn toegevoegd, komen er 13 uit `ai-general` en 4 uit CLIN33; de cijfers op die twee corpora zijn daardoor te gunstig. In CLIN33 vallen vooral nieuwsteksten op (48 van 200); tweets en gedichten nooit. `ai-general-holdout` is tijdens de review van 0.3.0 gelezen en is geen zuivere schatting meer. De zuivere cijfers op achtergehouden tekst zijn die van `ai-multi-holdout` en `ai-detailed-holdout`.

`nl-serial-comma` (komma voor "en" of "of" in een opsomming) staat in 1,4% van de achtergehouden webshopteksten, boven de grens van 1%. Het is medium en telt alleen samen met een ander signaal.

### Gebruik

Vanuit de map van de skill, met Node 18 of hoger:

```
node scripts/check.mjs nl bericht.txt
node scripts/check.mjs nl product.json --product    # {"title": "...", "description": "..."}
```

Zonder `--product` gebruikt het script alleen de algemene patronen.

### Zo matcht het

Accenttekens verdwijnen voor het vergelijken (`écht` wordt `echt`, `creëer` wordt `creeer`) en hoofdletters tellen niet mee. Alle Nederlandse patronen zijn regexen, omdat ze verbuigingen, inversie ("is het belangrijk om op te merken") en scheidbare werkwoorden ("brengt je muren tot leven") moeten afdekken. De u-vorm, Vlaamse woorden en een mengeling van je en u zijn geen signaal: menselijke webshops wisselen veel. "Niet alleen … maar ook", "Bovendien" en "Daarnaast" aan het begin van een zin zijn gewoon Nederlands en staan op geen lijst.

### Corpora

- `human-mc4-web`, `human-mc4-web-holdout`: Nederlandstalige webpagina's uit mC4 (Common Crawl, 2013 tot 2020), alleen de alinea's lopende tekst.
- `human-mc4-news`: 599 pagina's van Nederlandse en Vlaamse nieuwssites.
- `human-mc4-wide`, `human-mc4-reviewed`, `human-mc4-heldout`: webshopalinea's uit mC4. `reviewed` is met de hand gecontroleerd; `heldout` komt uit andere shards en van andere domeinen.
- `tests/human-genres.json`: 82 teksten die een taalmodel (Claude) voor de test heeft opgesteld; ze zijn niet door echte schrijvers geschreven of bij hen verzameld: zakelijke en persoonlijke e-mails, chatberichten, socialmedia- en LinkedIn-berichten, nieuwsbrieven van school en vereniging, schoolopstellen, beleidsverslagen, notulen, recensies, condoleancekaarten, Vlaamse e-mails en nieuwsbrieven en een paar productteksten. Geen ervan mag gemarkeerd worden; de patronen zijn versmald tot geen ervan meer gemarkeerd werd, dus de test slaagt door de opzet.
- `ai-general`, `ai-general-holdout`: Claude Sonnet en Claude Haiku op eenvoudige verzoeken in zes genres, acht onderwerpen per genre. De tweede set heeft nieuwe onderwerpen.
- `ai-multi-holdout`: 254 antwoorden op eenvoudige verzoeken van één regel (`scripts/multi-requests.json`) in zeven genres, waaronder een artikel van ongeveer 800 woorden, over acht nieuwe onderwerpen. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 en Sonnet 4.5 (56 teksten elk), GPT-5.5 (6) en GPT-5.4 mini (24), zonder systeemprompt.
- `ai-detailed-holdout`: 448 antwoorden op 56 realistische situaties met concrete feiten (`scripts/detailed-scenarios.md`), elk kort (A) en zorgvuldig (B) gevraagd, van de vier Claude-modellen. De verzoeken, in Nederland en deels in Vlaanderen, staan in `scripts/detailed-requests/nl.json`.
- `ai-clin33`: 650 Nederlandse teksten van GPT-4 en Vicuna-13B uit de CLIN33 shared task (nieuws, tweets, recensies, poëzie). De 100 gegenereerde opiniestukken zijn weggelaten omdat ze verzonnen beweringen over echte, met naam genoemde mensen bevatten.
- `ai-gpt4-ultrachat`: 8 GPT-4-productteksten uit UltraChat 200k Dutch. `ai-imitation`: 120 productteksten die met de kandidaten in beeld zijn gemaakt, alleen als controle.

Details, data en licenties staan in `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) legt uit hoe je de API-corpora opnieuw maakt.

### Opnieuw draaien

Vanuit de hoofdmap, met Node 18 of hoger en zonder packages:

```
npm test                               # schema, voorbeelden, herschrijvingen, valse positieven, testzinnen, skill
node nl/eval/rebuild-human.mjs         # haalt 14 mC4-shards op (~1,1 GB) en bouwt de webshopteksten
node nl/eval/rebuild-web.mjs           # haalt één mC4-shard op (~30 MB) en bouwt de web- en nieuwspagina's
node scripts/evaluate.mjs nl           # tellingen op de corpora die op schijf staan
node scripts/evaluate.mjs nl --write   # werkt counts.csv en summary.txt bij
```

De herbouwde teksten komen in `eval/corpus-local/`, dat git negeert. Elke tekst wordt gecontroleerd op zijn SHA-256.

### Beperkingen

- De AI-kant is vooral Claude, plus GPT-4 en Vicuna uit CLIN33; recente GPT-modellen leveren 30 achtergehouden teksten. Gemini, Llama en Mistral ontbreken.
- De cijfers op AI-tekst meten vooral chatresten. Zonder die resten vangt de lijst 1,3% van de antwoorden op uitgebreide verzoeken.
- De menselijke corpora zijn webpagina's en nieuwspagina's. Persoonlijke e-mails, essays en blogs zijn een klein deel ervan. `tests/human-genres.json` dekt die genres af met teksten die een taalmodel voor de test heeft opgesteld: het laat zien wat de regel met rust laat, maar het is geen gemeten percentage. Daarom zijn de afsluiter die om reacties vraagt en de formules uit 0.3.0 medium.
- 25 patronen met `corpus`-bewijs rusten op 1 tot 3 AI-teksten uit de ontwikkelsets. Het label klopt, maar het bewijs is dun.
- mC4 gooit regels zonder leesteken weg. Opsommingen, koppen en emoji-bullets zijn daardoor slecht te toetsen op menselijke tekst.
- Er wordt per tekst geteld. Twee medium-treffers in een lange tekst wegen even zwaar als in een korte; boven zo'n 300 woorden stijgt de kans op een valse markering.
- Drie bijvoeglijke naamwoorden op een rij, wisselende synoniemen en zinnen van gelijke lengte zijn niet met een regex te vangen.

### Bronnen en licenties

| Bron | Gebruikt voor | Licentie | Tekst overgenomen? |
|---|---|---|---|
| [CLIN33 Shared Task: LLM-generated Test Data](https://zenodo.org/records/10732813) (Fivez, Daelemans, Van de Cruys) | AI-corpus `ai-clin33` | CC BY 4.0 | ja, met naamsvermelding |
| Overzichtsartikel "The CLIN33 Shared Task on the Detection of Text Generated by Large Language Models", CLIN Journal 2024 | opzet van de taak | CC BY-NC-ND | nee, alleen als bewijs |
| [UltraChat 200k Dutch](https://huggingface.co/datasets/BramVanroy/ultrachat_200k_dutch) (Vanroy 2024, arXiv:2412.04092) | 8 GPT-4-productteksten | Apache-2.0 | ja, met naamsvermelding |
| [mC4 / allenai/c4, Nederlands](https://huggingface.co/datasets/allenai/c4) (Xue e.a. 2021) | menselijke corpora | ODC-BY 1.0 en Common Crawl-voorwaarden; de teksten zijn van de sites | nee, alleen URL, datum, bronbestand en SHA-256 |
| [humanizer](https://github.com/blader/humanizer) SKILL.md | indeling en structuurregels | MIT | nee, regels in eigen woorden |
| [Taaladvies.net, "Komma voor en"](https://taaladvies.net/komma-voor-en/) | norm voor `nl-serial-comma` | geen licentie vermeld | nee |
| [Vlaamse overheid, "Leestekens: spaties voor en na?"](https://www.vlaanderen.be/taaladvies/taaladviezen/leestekens-spaties-voor-en-na) | norm voor het gedachtestreepje | geen licentie vermeld | nee |
| [VU, ALP-gids AI-teksten herkennen](https://vu.nl/nl/over-de-vu/meer-over/alp-gids-ai-teksten-herkennen) | bevestiging dat er weinig onderzoek naar Nederlands is | geen licentie vermeld | nee |
| [Onze Taal, "De bonte wereld van de hedendaagse anglicismen"](https://onzetaal.nl/tijdschrift/september-2022/artikel/de-bonte-wereld-van-de-hedendaagse-anglicismen) | achtergrond bij leenvertalingen | auteursrecht Onze Taal | nee |
| Wikipedia "Signs of AI writing" en de Duitse, Franse en Portugese versies | algemene technieken | CC BY-SA 4.0 | nee |

De naamsvermeldingen staan ook in `NOTICE.md` in de hoofdmap. De gemeten en geschrapte kandidaten staan met hun cijfers in `skill-notes.md`.

### Geschiedenis

Versie 0.1.0 (27 oktober 2026) had 66 patronen (18 high, 48 medium), alleen voor producttekst, gekozen uit ongeveer 130 kandidaten. Een menselijk corpus van Etsy lukte niet: in ruim 100 gearchiveerde Etsy-pagina's met `/nl/` in de URL stond geen listing die oorspronkelijk in het Nederlands was geschreven. Daarom kwamen de menselijke teksten uit mC4-webshops (`wide`, `reviewed`, `heldout`, samen 3.595 teksten). Toen werden 2 van de 3.595 menselijke teksten gemarkeerd, 45,0% van `ai-imitation`, 3 van de 8 GPT-4-productteksten en 6,4% van de 750 CLIN33-teksten van dat moment. Na de eerste held-out-run zijn "Bovendien" en "niet alleen … maar ook" geschrapt, zodat de held-out-cijfers voor producttekst niet helemaal onafhankelijk zijn.

Versie 0.2.0 heeft elk patroon ook op algemene tekst gemeten, de chatresten toegevoegd en de 100 opiniestukken uit CLIN33 gehaald (650 teksten over). Versie 0.3.0 voegde 17 patronen voor woordkeus toe. Daarna heeft een review met gewone e-mails, chats, berichten, nieuwsbrieven en verslagen, door een taalmodel opgesteld voor een test, de patronen die daarop afgingen versmald, zeven van high naar medium gezet en "Al met al" aan het begin van een zin geschrapt. Details staan in `CHANGELOG.md` en `skill-notes.md`.

---

## English

### What it is

`patterns.json` holds 86 patterns that suggest a Dutch or Flemish text was written by a language model: blog and social posts, emails, essays, articles, reports and product copy. Each pattern has an explanation, an example it must match, a rewrite and ordinary sentences it must not match. The `humanizer-lists` skill at the root uses the list, and `src/matcher.mjs` runs it on its own.

There are 14 `high` and 72 `medium` patterns. 83 are general and apply to any text; 3 (`nl-stel-je-voor`, `nl-kortom-zinsbegin` and `nl-serial-comma`) apply only to product titles and descriptions. By category: hype 28, cliche-opener 13, filler 12, structure 9, vague-praise 8, cliche-closer 5, false-contrast 4, urgency 3, punctuation 2, rhetorical-question 2.

Precision comes first. Every pattern was measured on human text from before November 2022 and on AI text.

### What it finds and what it misses

The list is the checker step of the humanizer. It finds what people forget to delete: Markdown headings and bold labels, square-bracket placeholders, the sentence that announces the draft and the offer to adapt it ("Wil je dat ik de toon aanpas?"). The chat-leftover patterns fire only when the text talks about itself; "Wil je dat ik morgen de boodschappen doe?" is left alone. It also knows a number of stock formulas. It does not recognise model text that was well prompted and cleaned up, and it does not tell who wrote a text.

Two corpora generated through the OpenAI and Anthropic APIs after the list was final, and measured once, give the clean held-out numbers. The general patterns flag 97.6% of 254 replies to plain requests (`ai-multi-holdout`) and 93.1% of 448 replies to detailed requests (`ai-detailed-holdout`). Nearly all of that comes from leftovers: the wording patterns alone, meaning the general patterns outside `structure`, flag 3.5% (9) and 1.3% (6). On the 1,000 held-out human web pages the general patterns flag 0.3% (3). They flag none of the 82 texts in `tests/human-genres.json`, but a language model drafted those texts for the test and they were used to narrow the patterns, so that result holds by design.

Texts flagged on wording, by genre, plain requests (37 per genre, 32 for the long article) then detailed requests (64 per genre): blog posts 6 (16.2%) and 2 (3.1%), emails 0 and 0, short essays 0 and 3 (4.7%), articles 0 and 0, Instagram posts 1 (2.7%) and 0, short reports 0 and 0, long articles of about 800 words 2 (6.3%) and 1 (1.6%).

On the plain requests, the 30 texts from GPT-5.5 and GPT-5.4 mini are flagged less often than the 224 Claude texts: 25 (83.3%) against 223 (99.6%). On wording, 1 GPT text and 8 Claude texts are flagged. The GPT sample is small and shows a direction only. Careful detailed requests (style B) are flagged in 86.6% of cases, short ones (style A) in 99.6%.

A model's business emails and reports have no wording hit left once the placeholders, labels and chat offers are gone: there is nothing there for a list to catch. A flag points at what to rewrite; no flag does not mean a person wrote the text.

### Results

The table in the Dutch section is the output of `node scripts/evaluate.mjs nl` (`eval/summary.txt`). "Alle" uses all 86 patterns, "algemeen" the 83 general ones, "woordkeus" the general ones outside `structure`. In short:

- Human text, general patterns: 0.3% of 2,000 development web pages, 0.3% of 1,000 held-out web pages, 0.0% of 599 news pages. Webshop text, all patterns: 0.1% of 2,805, none of the 269 hand-checked and none of the 790 held-out paragraphs.
- Held-out machine text, general patterns then wording: `ai-multi-holdout` 97.6% and 3.5%, `ai-detailed-holdout` 93.1% and 1.3%.
- Development and earlier sets: `ai-general` 100.0% and 22.9%, `ai-general-holdout` 100.0% and 3.1%. CLIN33: 7.7% and 7.7%, mostly news (48 of 200), never tweets or poems.
- Of the 17 wording patterns added in 0.3.0, 13 come from `ai-general` and 4 from CLIN33, so the figures on those two corpora are optimistic. `ai-general-holdout` was read during the 0.3.0 review and is no longer a clean estimate. The clean held-out figures are those of `ai-multi-holdout` and `ai-detailed-holdout`.
- `nl-serial-comma` (a comma before "en" or "of" in a list) is on 1.4% of the held-out webshop paragraphs, above the 1% bar. It is medium and counts only with another sign.

Use the general patterns on ordinary text and all patterns on product copy.

### How to use it

From the skill folder, with Node 18 or newer:

```
node scripts/check.mjs nl post.txt
node scripts/check.mjs nl product.json --product    # {"title": "...", "description": "..."}
```

Without `--product` the script uses the general patterns only.

### How it matches

Diacritics are dropped before matching (`écht` becomes `echt`, `creëer` becomes `creeer`) and case is ignored. All Dutch patterns are regexes, because they need to cover inflection, verb-second inversion ("is het belangrijk om op te merken") and separable verbs ("brengt je muren tot leven"). The u-form, Flemish words and a mix of je and u are not tells: human webshops switch a lot. "Niet alleen … maar ook", and "Bovendien" or "Daarnaast" at the start of a sentence, are ordinary Dutch and on no list.

### Corpora

- `human-mc4-web`, `human-mc4-web-holdout`: Dutch-language web pages from mC4 (Common Crawl, 2013 to 2020), running-text paragraphs only.
- `human-mc4-news`: 599 pages from Dutch and Flemish news sites.
- `human-mc4-wide`, `human-mc4-reviewed`, `human-mc4-heldout`: webshop paragraphs from mC4. `reviewed` was checked by hand; `heldout` comes from other shards and other domains.
- `tests/human-genres.json`: 82 texts drafted for the test by a language model (Claude), not written or collected from real writers: business and personal emails, chat messages, social and LinkedIn posts, school and club newsletters, school essays, policy reports, minutes, reviews, condolence cards, Flemish emails and newsletters, and a few product texts. None may be flagged; the patterns were narrowed until none was, so the test passes by design.
- `ai-general`, `ai-general-holdout`: Claude Sonnet and Claude Haiku answering plain requests in six genres, eight topics per genre. The second set has new topics.
- `ai-multi-holdout`: 254 replies to plain one-line requests (`scripts/multi-requests.json`) in seven genres, including an article of about 800 words, on eight new topics. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 (56 texts each), GPT-5.5 (6) and GPT-5.4 mini (24), with no system prompt.
- `ai-detailed-holdout`: 448 replies to 56 realistic scenarios with concrete facts (`scripts/detailed-scenarios.md`), each asked briefly (A) and carefully (B), from the four Claude models. The requests, set in the Netherlands and partly in Flanders, are in `scripts/detailed-requests/nl.json`.
- `ai-clin33`: 650 Dutch texts by GPT-4 and Vicuna-13B from the CLIN33 shared task (news, tweets, reviews, poetry). The 100 generated opinion columns are left out because they make invented claims about real, named people.
- `ai-gpt4-ultrachat`: 8 GPT-4 product texts from UltraChat 200k Dutch. `ai-imitation`: 120 product texts made with the candidates in view, a sanity check only.

Details, dates and licenses are in `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) explains how to regenerate the API corpora.

### Reproducing

The commands are in the Dutch section under "Opnieuw draaien": `npm test`, `node nl/eval/rebuild-human.mjs` (14 mC4 shards, about 1.1 GB, for the webshop text), `node nl/eval/rebuild-web.mjs` (one shard, about 30 MB, for the web and news pages), `node scripts/evaluate.mjs nl` and `node scripts/evaluate.mjs nl --write`. Rebuilt texts go to `eval/corpus-local/`, which git ignores, and each one is checked against its SHA-256.

### Limitations

- The AI side is mostly Claude, plus GPT-4 and Vicuna from CLIN33; recent GPT models supply 30 held-out texts. Gemini, Llama and Mistral are missing.
- The rates on AI text mostly measure chat leftovers. Without them, the list catches 1.3% of the replies to detailed requests.
- The human corpora are web pages and news pages. Personal emails, essays and blogs are a small part of them. `tests/human-genres.json` covers those genres with texts a model drafted for the test: it shows what the rule leaves alone, but it is not a measured rate. That is why the closer that asks for comments and the formulas from 0.3.0 are medium.
- 25 patterns with `corpus` evidence rest on 1 to 3 AI texts from the development sets. The label is right, but the evidence is thin.
- mC4 drops lines without end punctuation, so bullets, headings and emoji bullets are hard to test on human text.
- Counting is per text. Two medium hits in a long text weigh the same as in a short one; above about 300 words the chance of a false flag goes up.
- Three adjectives in a row, rotating synonyms and sentences of equal length cannot be caught with a regex.

### Sources and licenses

See the table in the Dutch section: CLIN33 (CC BY 4.0, redistributed with attribution) and its overview article; UltraChat 200k Dutch (Apache-2.0, redistributed with attribution); mC4 (ODC-BY 1.0 plus Common Crawl terms, metadata only); blader/humanizer (MIT); Taaladvies.net, the Flemish government's language advice, the VU guide, Onze Taal and Wikipedia's "Signs of AI writing" as evidence only. The attributions are also in `NOTICE.md`. The candidates measured and left out, with their numbers, are in `skill-notes.md`.

### History

Version 0.1.0 (October 27, 2026) had 66 patterns (18 high, 48 medium), for product copy only, chosen from about 130 candidates. A human corpus from Etsy did not work: in over 100 archived Etsy pages with `/nl/` in the URL, no listing was originally written in Dutch. So the human texts came from mC4 webshops (`wide`, `reviewed`, `heldout`, 3,595 texts in all). Then, 2 of the 3,595 human texts were flagged, along with 45.0% of `ai-imitation`, 3 of the 8 GPT-4 product texts and 6.4% of the 750 CLIN33 texts of the time. After the first held-out run, "Bovendien" and "niet alleen … maar ook" were dropped, so the held-out product figures are not fully independent.

Version 0.2.0 measured every pattern on general text as well, added the chat leftovers and removed the 100 opinion columns from CLIN33 (650 texts remain). Version 0.3.0 added 17 wording patterns. A review with ordinary emails, chats, posts, newsletters and reports, drafted by a model for a test, then narrowed the patterns that fired on them, moved seven from high to medium and dropped sentence-initial "Al met al". Details are in `CHANGELOG.md` and `skill-notes.md`.

License: MIT, see `LICENSE` at the root. The corpora in `eval/corpus/` keep their own licenses (see above and `NOTICE.md`).
