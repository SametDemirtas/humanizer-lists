# Dutch rewriting guide

Rewrite Dutch or Flemish text that reads as machine-written so it reads like the writer: Etsy and webshop listings, emails, blog posts, social and LinkedIn posts, essays, articles and reports. Keep what the text says. Do not make anything up.

The checker finds leftovers and stock phrases. The patterns below apply to the whole text whether or not it flags anything: once Markdown and chat lines are gone, wording alone flags only 1.3% to 3.5% of held-out machine replies.

Much of a model's Dutch is shaped by English: English punctuation (serial comma, comma after a fronted phrase, Title Case), marketing formulas translated word for word ("Duik in de wereld van") and split compounds. Some English tells are ordinary in Dutch; see **Leave alone** under each pattern and the list in G2.

Before examples with an id (social-1-haiku, clin33-81, uc-…) are quoted from model output in the corpora of the humanizer-lists repository, where the frequencies were also measured; the others were written for this guide.

## How to work in Dutch

Follow the steps in SKILL.md. Dutch details:

- Run the checker with `nl`, and with `--product` on a listing; the product-only entries (`nl-stel-je-voor`, `nl-kortom-zinsbegin`, `nl-serial-comma`) run only with that flag. A single medium hit does not flag a text, but one sighting of a pattern in section A is enough to act on.
- List the facts before you draft, as SKILL.md describes, and check the draft against the list. Rewrites under §6 (triads) and §18 (bold labels into prose) drop facts most often.
- After drafting, search again for §1 contrasts, §2 closers, §8 dashes, §18 bold labels and the calques in G1. Then read the draft aloud in Dutch.
- A writer's sample overrides the patterns, including the dash and emoji rules: if the writer uses spaced en dashes or hearts, keep them at about the same rate. Keep the register (G4).
- In the open-questions list, name health claims on food or cosmetics (regulated in the EU) and any facts after a knowledge disclaimer (§22).

## A. Staging instead of stating

The strongest tells in current Dutch model prose, especially in blog and LinkedIn posts. Act on one sighting.

### 1. Niet X, maar Y

**Watch for:** "draait niet om X, maar om Y"; "het gaat niet (meer) over X, maar over Y"; "De vraag is niet of…, maar hoe"; "X is geen Y, het is Z"; "Dit is niet zomaar een poster: het is…"; the split form ("Dit betekent niet dat X. Het betekent dat Y."); the semicolon form ("Het is niet alleen een luidspreker; het dient ook als…").
**Problem:** The negative half names something nobody claimed, so the positive half sounds bigger. State the point. Keep a contrast when the negative half corrects something the reader believes, or when both halves carry information.
**Before:**
> Thuiswerken draait niet om waar je werkt, maar om hoe je werkt. Goede afspraken, vertrouwen en aandacht voor welzijn maken het verschil tussen productief thuis zijn en thuis opbranden. (social-1-haiku)

**After:**
> Of thuiswerken lukt, hangt af van goede afspraken, vertrouwen en aandacht voor welzijn. Anders brand je thuis eerder op dan dat je productief bent.

**Before (product, semicolon form):**
> Het is niet alleen een luidspreker; het dient ook als smart home hub met stemherkenning… (uc-737639062020)

**After:**
> De speaker werkt ook als smarthomehub met stemherkenning…

**Leave alone:** "niet alleen … maar ook" as such (1.0% of human product texts); in the last example the staging is the problem, not the words. Also ordinary: "Zij is geen arts, maar verpleegkundige." "Meer dan alleen een spelletje" in a parent's review counts only with a second sign.

### 2. One-line closers and dramatic fragments

**Watch for:** a last line that restates the paragraph ("Kleine acties, grote impact.", "Consistentie wint van motivatie."); "Kortom: X is een investering in de toekomst."; a sentence after an example that names what it showed ("Het zette ons allemaal aan het denken."); a row of fragments ("Geen file. Geen stress. Gewoon rust."); one word in capitals for weight ("In een wereld van KORT…", clin33-10).
**Problem:** The line asks the reader to pause instead of telling them something. Cut a closer that repeats. Keep a short line when it adds a fact or consequence.
**Before:**
> Vijftien minuten per dag werkt beter dan drie uur op zondag. Consistentie wint van motivatie. (social-3-sonnet)

**After:**
> Vijftien minuten per dag werkt beter dan drie uur op zondag.

**Leave alone:** a short sentence with a new fact: "Binnen een week kende de bakker al de namen van de eerste vaste klanten." (essay-4-sonnet). "Kortom" is a tell only in product copy (`nl-kortom-zinsbegin`) or when what follows repeats what came before.

### 3. Sayings that sound deep

**Watch for:** "Uiteindelijk draait het om", "In de kern", "Waar het écht om gaat", "De echte vraag is", "Eén ding is zeker:", "is goud waard", "X is de sleutel tot Y".
**Problem:** An ordinary point dressed as a hidden truth. Replace the saying with the specific claim from the text.
**Before:**
> Een kantoordag zonder doel is verloren tijd, maar een kantoordag mét doel is goud waard. (social-1-sonnet)

**After:**
> Naar kantoor ga ik voor brainstormen, kennismaken en vieren. Dat lukt samen beter.

**Before:**
> Wat de uitkomst ook moge zijn, één ding is zeker: de toekomst van Ecolo hangt in de balans… (clin33-81, an article about a decision on Ecolo's basisplan)

**After:**
> Voor Ecolo hangt veel af van de beslissing over het basisplan.

**Leave alone:** an idiom the writer owns ("hoe meer handen, hoe lichter het werk", "het is niet altijd rozengeur en maneschijn"). Dutch idioms are often the most human line in the text.

### 4. Staged run-up before the point

**Watch for:** "Het goede nieuws?", "Het resultaat?", "Het mooiste?", "Laten we eens kijken naar…", "Dit heb ik onderweg geleerd:", "Wat me het meest raakte", "Wat begon als … is uitgegroeid tot", "Stel je voor:" (product copy), "Waarom dit ertoe doet:".
**Problem:** The writer announces the point or stages a reveal instead of making it. Remove the run-up, not just its tone.
**Before:**
> Het goede nieuws? Je hoeft niet meteen je hele huis te verbouwen. Met een paar slimme aanpassingen bespaar je al snel honderden euro's per jaar. (blog-5-sonnet)

**After:**
> Je hoeft niet meteen je hele huis te verbouwen: met een paar slimme aanpassingen bespaar je al snel honderden euro's per jaar.

**Before (LinkedIn origin frame):**
> Wat begon als een "gewoon uitstapje" werd een van de mooiste leermomenten van het jaar. (social-6-sonnet)

**After:**
> Het was een gewoon uitstapje, en het werd een van de mooiste leermomenten van het jaar.

**Leave alone:** "Goed nieuws: de zaal is toch vrij." and "Het goede nieuws is dat…" in emails and newsletters; only the question form is an entry.

### 5. Arguing with no one

**Watch for:** "Begrijp me niet verkeerd", "Ik zeg niet dat", "Dat wil niet zeggen dat", "Je zou kunnen denken dat…, maar", a stock turn after a list of advantages ("Thuiswerken heeft ook een schaduwkant.", "Toch zijn er ook kanttekeningen.").
**Problem:** The text answers an objection nobody raised, or announces a turn instead of making it. Remove the defence or the announcement and state the claim.
**Before:**
> Thuiswerken heeft ook een schaduwkant. Een van de grootste is dat werk en privé in elkaar overlopen. (blog-1-haiku)

**After:**
> Een van de grootste nadelen van thuiswerken is dat werk en privé in elkaar overlopen.

**Leave alone:** an objection the text attributes and answers ("Sommige ondernemers vrezen minder bereikbaarheid voor klanten", essay-2-sonnet), and a reassurance that answers a likely question ("Je hoeft geen ervaren lezer te zijn.").

## B. Rhythm by rule

### 6. Forced triads

**Problem:** Ideas come in threes to sound complete, whether or not the meaning has three parts: "gezonder, sneller en duurzamer", "warmte, geur en gezelligheid". At paragraph scale, three or four checkmarked benefits with one adjective each. Keep the real items, merge or drop the decorative ones.
**Before:**
> Dit biedt mooie kansen om de woon-werkreis op een gezondere, snellere en duurzamere manier te maken. (email-2-sonnet)

**After:**
> Voor wie naar het werk fietst, is de reistijd vaak korter, zeker in de spits.

(The same email lists "Vaak een kortere reistijd, zeker tijdens de spits" further down; "gezonder" and "duurzamer" have no support there.)

**Leave alone:** three real facts. "Bredere paden, veiligere kruispunten en betere verbindingen tussen de wijken en het centrum." (social-2-sonnet) lists three different changes.

### 7. Repeated sentence openings

**Problem:** Several sentences in a row start with the same subject or connector: "Fortis zal… Fortis zal ook… Fortis verwacht…", or every sentence opening with "Daarnaast", "Bovendien", "Ook". Merge sentences, change the subject or start with the action. Do not ban the words; "Daarnaast" and "Bovendien" are ordinary on their own.
**Before:**
> Ten eerste is er de economische situatie in Marokko. Daarnaast speelt ook de onzekere politieke situatie een rol. Bovendien hebben veel illegalen sociale banden in Nederland. Een andere belangrijke factor is de angst voor vervolging. (after clin33-6)

**After:**
> Er spelen vier dingen mee: de economische situatie in Marokko, de onzekere politieke situatie daar, de sociale banden die veel illegalen in Nederland hebben en de angst voor vervolging.

### 8. Dashes

**Rule for Dutch:** Remove the em dash (—) unless the writer's sample uses it; it is not a Dutch typesetting norm (`nl-em-dash`, medium). The spaced en dash ( – ) is ordinary Dutch (1.9% of human product texts), and so is a spaced hyphen ( - ) typed for it. Keep a few at the writer's rate; in a text full of them, replace most with a comma, colon, period or parentheses.
**Problem:** A dash lets the writer skip deciding how two clauses relate. Leave dashes in ranges ("80–90%", "9.00–17.00 uur"), compounds and code alone.
**Before:**
> De nieuwe fietspaden — breder, beter verlicht en gescheiden van de auto's — zijn sinds maandag open.

**After:**
> De nieuwe fietspaden zijn sinds maandag open. Ze zijn breder, beter verlicht en gescheiden van de auto's.

**Leave alone:** "Opruimdag in het park – doe jij mee?" as an email subject line.

### 9. Stacked qualifiers

**Watch for:** "mogelijk", "wellicht", "in zekere zin", "enigszins", "zou kunnen", "in sommige gevallen", "naar alle waarschijnlijkheid", "potentieel", stacked in one claim.
**Problem:** Every claim sounds uncertain because qualifiers pile up. Keep one when the source supports the doubt. *Weak alone.*
**Before:**
> Dit zou in sommige gevallen mogelijk kunnen leiden tot een enigszins hogere uitstoot.

**After:**
> Dit kan de uitstoot iets verhogen.

**Leave alone:** "misschien", "volgens mij", "denk ik": ordinary hedges, often the writer's voice. Scope statements in reports ("De cijfers zijn voorlopig.") stay.

### 10. Passive voice and hidden actors

**Problem:** The text hides who acts: "er wordt verwacht dat", "er wordt gezorgd voor", "Er is besloten dat". Dutch officialese uses the passive a lot, so this is *weak alone*. Use the active form when the source names the actor. If it does not, keep the passive; do not invent an actor.
**Before:**
> Voor handschoenen, afvalzakken en grijpers wordt gezorgd. (email-8-sonnet)

**After:**
> Wij zorgen voor handschoenen, afvalzakken en grijpers.

(The same email says "Ook zorgen we voor koffie", so the actor is known.)
**Leave alone:** "Er wordt verwacht dat de deal binnenkort wordt afgerond." (clin33-13) when the text gives no source for the expectation; that is §13, and the fix is the source, not an invented subject.

## C. Inflation and borrowed authority

The fact underneath is usually sound. Keep it and remove the dressing.

### 11. AI vocabulary

**Watch for:** cruciaal and "een cruciale rol spelen" (39 of 650 CLIN33 machine texts against 12 of 2,000 human web pages), "een breed scala aan", "getuigt van", "onderstreept het belang van", "weerspiegelt", "naadloos", "ongeëvenaard", "symfonie van", "smaakpalet", "levendig", "inzichten", "toekomstbestendig". G2 says which are measured.
**Problem:** These words judge instead of informing. Rewrite the sentence around its fact; do not swap in a synonym.
**Before:**
> Kaneel rondt deze symfonie van smaken af met een zoete ondertoon en extra bloedsuikerbalans. (uc-7256fbe94d90)

**After:**
> Kaneel geeft de mix een zoete ondertoon en extra bloedsuikerbalans.

(Keep the health claim as the seller wrote it and flag it: health claims on food are regulated in the EU, so the seller decides whether it stays.)
**Leave alone:** "speelt een belangrijke rol", "creëren", "hoogwaardig", "duurzaam" when it states a property.

### 12. Inflated significance

**Watch for:** "een belangrijke mijlpaal", "een nieuw hoofdstuk", "een stap vooruit", "Ondanks deze uitdagingen blijft … optimistisch", "Het is nu aan … om", "naar nieuwe hoogten".
**Problem:** An ordinary event is said to mark a turning point or promise a future. Keep the fact, drop the significance, end on the last concrete fact.
**Before:**
> De beursgang van Telenet is een belangrijke mijlpaal voor het bedrijf en kan een nieuw hoofdstuk inluiden in zijn geschiedenis. (clin33-5)

**After:**
> Telenet gaat naar de beurs.

**Leave alone:** "een stap in de goede richting" and "Dit heeft geleid tot" in reports and minutes.

### 13. Vague attribution and invented sources

**Watch for:** "Analisten wijzen erop dat", "Onderzoek toont aan" with no study named, and suspiciously precise unnamed people: "Een taalcoach die al twintig jaar volwassenen begeleidt, benadrukt…".
**Problem:** An authority stands in for what was said; in articles, models also invent people and quotes. Use the real source if the text or the writer names it. Otherwise cut the attribution or ask whether the person exists. Never keep an invented quote as if it were reported.
**Before:**
> Een taalcoach die al twintig jaar volwassenen begeleidt, benadrukt dat het vooral om de aanpak gaat. (article-3-haiku)

**After:**
> Het gaat vooral om de aanpak.

(Ask the writer who the coach is; with a name, the attribution can return.)
**Leave alone:** a text without citations. Most writing has none.

### 14. Riders: "wat bijdraagt aan" and participle clauses

**Watch for:** ", wat bijdraagt aan…", ", wat … weerspiegelt / onderstreept", ", waardoor … wordt versterkt", and present-participle riders ("…, bijdragend aan een gezondere stad"), which are rare in Dutch and usually translated English.
**Problem:** A clause bolted onto a simple fact to make it sound deeper. Keep the rider only if the source supports what it claims.
**Before:**
> De beslissing om in Nederland te blijven, weerspiegelt het vertrouwen van de bank in haar vermogen om deze problemen te overwinnen en op deze markt te groeien. (clin33-22)

**After:**
> De bank blijft in Nederland.

(Add the reason only if the bank stated it: "De bank verwacht hier te kunnen groeien.")
**Leave alone:** a causal clause with a real cause: "Klanten kozen massaal voor sneakers en sandalen, en daardoor steeg de omzet."

### 15. Avoiding is and heeft

**Watch for:** "fungeert als", "dient als", "vormt", "staat voor", "biedt (een … ervaring)", "beschikt over", "weet te".
**Problem:** Simple verbs replaced by longer ones. Use *is*, *zijn*, *heeft*.
**Before:**
> De nieuwe SmartSound speaker biedt een krachtige geluidservaring met zijn compacte ontwerp. (uc-737639062020)

**After:**
> De nieuwe SmartSound-speaker is compact en klinkt krachtig.

**Leave alone:** "is voorzien van een rits", "beschikt over een parkeerplaats" in specifications and reports.

### 16. Synonym cycling

**Problem:** To avoid repeating a name, the text rotates through descriptions: "Fortis… de financiële instelling… de bank… de Benelux-speler". Each description sneaks in a claim. Repeat the name, or use "het bedrijf", "ze".
**Before:**
> Husqvarna betaalt 730 miljoen euro voor Gardena. Het Zweedse bedrijf wil zo groeien in Europa. De tuinreus verwacht dat de deal snel rond is.

**After:**
> Husqvarna betaalt 730 miljoen euro voor Gardena en wil daarmee groeien in Europa. Het Zweedse bedrijf verwacht dat de overname snel rond is.

**Leave alone:** a second name that adds information the reader needs once: "Fortis, ooit de grootste bank van de Benelux".

### 17. Sales language

**Watch for:** "adembenemend", "betoverend", "uniek", "ongeëvenaard", "een rijke geschiedenis", "genesteld in" (a calque of *nestled*), "in het hart van", "een verborgen parel", "een feest voor de zintuigen", "doet je smaakpapillen ontwaken", "Ontdek de magie van", "Laat je betoveren", "het ultieme comfort".
**Problem:** The text reads like an advert. Say what the thing is.
**Before:**
> Elk snack heeft een unieke, krokante textuur en een rijk smaakpalet dat je smaakpapillen doet ontwaken. (uc-7c0cb419d40c)

**After:**
> Elke snack is krokant en vol van smaak.

(*Snack* is a de-word, so "elke snack". Models make gender errors like this in Dutch; fix them as spelling.)

**Leave alone:** "Op zoek naar…?", "Laat je verrassen", "echte eyecatcher", "zolang de voorraad strekt", "Bestel vandaag nog" on its own, "tijdloos" for a design, and "Ontdek de schoonheid van de Veluwe" in tourist copy. All were measured and dropped.

## D. Formatting by rule

### 18. Bold labels and labelled lists

**Problem:** Every bullet gets a bold label and a colon ("**Veiliger:** …"), paragraphs open with a bold lead-in ("**Focus waar het kan.** Voor diepgaand werk…"), and emails carry "**Onderwerp:**" in the body. Email clients, Etsy and Bol.com show the asterisks (`nl-markdown-bold`). Remove bold lead-ins from running prose unless the writer asks for them or wants a Markdown page formatted that way. Turn a labelled list into prose when the labels carry nothing of their own; keep a plain list for sizes, dates or times.
**Before:**
> 1. **Verkeersveiligheid:** Minder conflicten tussen fietsers en gemotoriseerd verkeer.
> 2. **Duurzaamheid:** Aanmoediging van fietsgebruik in plaats van de auto, wat de uitstoot verlaagt.
> 3. **Gezondheid:** Meer beweging voor inwoners.
> 4. **Bereikbaarheid:** Snellere en directere routes door de stad. (report-2-sonnet)

**After:**
> Er zijn minder conflicten tussen fietsers en gemotoriseerd verkeer. Inwoners worden aangemoedigd de fiets te nemen in plaats van de auto; dat verlaagt de uitstoot en ze bewegen meer. De routes door de stad zijn sneller en directer.

**Leave alone:** a plain "Kenmerken:" line followed by sizes and materials, and a practical block in an email ("Wanneer: …", "Waar: …") without bold.

### 19. Headings, emoji, Title Case

**Problem:** Markdown headings in an email or a short post; an emoji in front of every bullet (✔️, ✅, ✨); and English Title Case. Dutch capitalises only the first word and proper names, in titles too, so Title Case is a stronger sign than in English.
**Before:**
> **Kenmerken en Functies:**
> **Technische Specificaties:** (uc-d2e60daec7e2)

**After:**
> Kenmerken en functies
> Technische specificaties

**Leave alone:** hearts and one or two emoji in a social post or a listing; a row of hashtags under a post. Do fix a broken hashtag such as "#Hybride Werken" (social-1-haiku), which the space splits in two. Brand names keep their capitals ("NatuurGenot").

### 20. Quotation marks

**Problem:** Mixed quotation styles in one text. Straight, curly, low-high „…” and single quotes are all normal in Dutch house styles. Keep the writer's style and make it consistent. *Weak alone.*
**Before:**
> Hij noemde het „een mijlpaal" en sprak van ‘nieuwe kansen”.

**After:**
> Hij noemde het "een mijlpaal" en sprak van "nieuwe kansen".

**Leave alone:** single quotes for a word used loosely ("om 'even' je mail te checken", blog-1-haiku).

## E. Leftovers from the chat and the draft

Remove these outright.

### 21. Chat wrappers

**Watch for:** "Natuurlijk! Hier is een productomschrijving…", "Hieronder staat een concept dat je direct kunt aanpassen:", "**LinkedIn-post:**", "Wil je dat ik de toon aanpas…?", "als AI-assistent".
**Problem:** The assistant talks to the person who asked for the text. These are the most certain tells in Dutch model output. Delete the wrapper, keep the content.
**Before:**
> Natuurlijk! Hier is een productomschrijving van de nieuwe broodbakmachine: (uc-d2e60daec7e2)
> …
> Wil je dat ik de e-mail aanpas, bijvoorbeeld met concrete straatnamen, een formelere of informelere toon, of een korter bericht? (email-2-sonnet)

**After:**
> (Both lines deleted.)

**Leave alone:** "Wil je dat ik het verslag nog inkort?" to a colleague, and the email lines in G2. The entries fire only when a text talks about itself as a draft for the asker.

### 22. Knowledge disclaimers and invented figures

**Watch for:** "Ik heb geen toegang tot specifieke (lokale) gegevens", "op basis van de beschikbare informatie", "de cijfers hieronder zijn voorbeelden", "pas de cijfers aan op jouw situatie".
**Problem:** The model admits it has no data and then writes as if it had. Everything after such a line may be invented, including numbers the text itself says to adapt. Delete the disclaimer, and list the facts the writer must check or replace.
**Before:**
> Ik heb geen toegang tot specifieke lokale gegevens, dus de cijfers en locaties hieronder zijn voorbeelden die u kunt vervangen door de werkelijke gegevens. (report-2-sonnet)

**After:**
> (Delete the sentence. Tell the writer that the routes, crossings and facilities in the report were made up by the model and must be replaced with real data or cut.)

### 23. Placeholders

**Watch for:** "[datum]", "[naam]", "[Jouw naam]", "[aantal] lezers", "[tijd]: Lunchpauze".
**Problem:** An unfilled template slot. You cannot fill it. Ask the writer for the facts; if they give none, keep the slot visible and list it, or drop a line that is only a slot.
**Before:**
> Wat begon als een kleine groep van [aantal] lezers, is inmiddels uitgegroeid tot een levendige leesclub die al [aantal] jaar bestaat. (article-7-haiku)

**After:**
> De leesclub begon als een kleine groep van [aantal] lezers en bestaat nu [aantal] jaar.

**Leave alone:** anonymised parties in Dutch court rulings, such as [eiser] and [gedaagde].

### 24. Writing about the document

**Watch for:** "In deze blogpost bekijken we de voordelen, de uitdagingen en praktische tips." under a title that already says so; a heading followed by a sentence that repeats it.
**Problem:** The text describes itself instead of its subject. Cut the description when the title already does the job.
**Before:**
> # Thuiswerken: de voordelen, valkuilen en tips voor een goede balans
>
> … Maar hoe haal je er het beste uit? In deze blogpost bekijken we de voordelen, de uitdagingen en praktische tips. (blog-1-sonnet)

**After:**
> (Cut the last two sentences. The title already lists the contents.)

**Leave alone:** the "Inleiding" of a formal report or school paper ("In dit verslag beschrijf ik…"), which the genre requires.

## F. Writing for the wrong reader

### 25. Re-explaining what the reader knows

**Problem:** A reply rebuilds the background and gives the answer in the last line. Lead with the answer and keep only what the reader lacks.
**Before** (reply to a colleague who asked: "Kan de opruimdag naar zondag? Zaterdag is de markt."):
> Hoi Sanne, goede vraag! Zoals je weet organiseren we zaterdag een opruimdag in het park met vrijwilligers uit de buurt. We hadden voor zaterdag gekozen omdat de meeste vrijwilligers dan vrij zijn. Ik heb even nagevraagd: de gemeente kan de grijpers en afvalzakken ook op zondag leveren, en van de 18 aanmeldingen hebben er 14 laten weten dat zondag ook kan. Dus ja, verplaatsen naar zondag is mogelijk.

**After:**
> Hoi Sanne, ja, zondag kan. De gemeente kan de grijpers en afvalzakken ook op zondag leveren, en 14 van de 18 aangemelde vrijwilligers kunnen ook op zondag.

## G. Dutch-specific sections

### G1. Anglicisms and calques

"Entry" means the phrase is in `references/nl.md` with that id; "ordinary" means measured and common in human Dutch.

| Dutch | English source | Status | Plainer Dutch |
|---|---|---|---|
| Duik in (de wereld van) … | dive into | entry `nl-immersion-opener`, high, imperative only | name the thing |
| til je … naar een hoger niveau, naar het volgende level | take it to the next level | entry `nl-hoger-niveau`, medium; common in business and sport writing | say what improves |
| in de (hectische) wereld van vandaag | in today's fast-paced world | entry `nl-wereld-van-vandaag`, medium | cut, or start with the point |
| maakt het verschil | makes the difference | ordinary: an old Dutch idiom | keep it |
| Maak kennis met / Introductie van onze … | meet / introducing our | entries `nl-maak-kennis-met`, `nl-introductie-van` | "Nieuw: …" |
| Zeg vaarwel tegen | say goodbye to | entry `nl-zeg-vaarwel` | "Geen … meer" |
| ontworpen met jou in gedachten | designed with you in mind | entry `nl-met-jou-in-gedachten` | cut, or say for whom |
| vangt de essentie van | captures the essence of | entry `nl-vangt-de-essentie` | describe what is shown |
| Breng je muren tot leven | bring your walls to life | entry `nl-tot-leven` | cut |
| Ben je klaar om op te vallen? | ready to stand out? | entry `nl-ben-je-klaar-om`; "Klaar voor de zomer?" is ordinary | cut |
| Waarom dit ertoe doet | why this matters | entry `nl-waarom-dit-ertoe-doet` | cut the heading, keep the reasons |
| Het is belangrijk om op te merken | it is important to note | entry `nl-belangrijk-op-te-merken` | state the point |

Three calques sit in sentence structure:

- A fronted participle clause with the wrong subject: "Gemaakt van superieur vochtregulerend materiaal, blijft u koel en droog" (uc-fe38c654bbdb) says the customer is made of fabric. Write "Het vochtregulerende materiaal houdt u koel en droog."
- A comma between a fronted phrase and the verb: "Met een gemiddelde beoordeling van 4,5 sterren, zijn onze klanten dol op…" (uc-d2e60daec7e2). See G3.
- A gender or article error: "Elk snack", "het interface". Fix these as spelling.

### G2. AI vocabulary and ordinary habits

A word on these lists sends you to the sentence; it is never the reason to rewrite on its own. Rewrite when the sentence judges without stating a fact.

**Measured and on the list:** cruciaal, "een cruciale rol", "een breed scala aan", "getuigt van", "adembenemende", "hartverwarmende", "Het is duidelijk dat" (55 of 650 CLIN33 texts, 2 of 599 human news pages), "Ondanks deze uitdagingen", "Het is nu aan … om", "een stap vooruit", "past naadloos in elk interieur", "wordt gekoesterd", "een ode aan", "zorgvuldig vervaardigd", "vertelt een (uniek) verhaal".

**Common in machine text, not measured on human text:** essentieel, waardevol as a verdict, "onderstreept het belang van", weerspiegelt, mijlpaal, "een nieuw hoofdstuk", "uitdagingen" for problems, levendig, smaakpalet, inzichten, impact, toekomstbestendig. Cues that need company.

**Ordinary in human Dutch, measured: leave alone.** This is the guide's one list of ordinary habits.

- Sentence-initial "Daarnaast" (3.8% of human product texts) and "Bovendien" (1.4%); "niet alleen … maar ook" (1.0%). Models use them more, but not enough to justify a rewrite.
- The spaced en dash (1.9%) and a spaced hyphen typed for it.
- "Kortom", "Stel je voor" and a comma before "en" or "of" outside product copy.
- "Al met al", "speelt een belangrijke rol", "een stap in de goede richting", "Dit heeft geleid tot", "maakt (echt) het verschil", "vastbesloten om", "In de huidige maatschappij", "Het is tijd om", "Grote dank aan", "Goed nieuws:", "Samen maken we er een mooi feest van".
- "Laat me weten als je nog vragen hebt", "Ik hoop dat dit helpt", "Hier is een voorstel voor de planning" between people.
- "Eerlijk gezegd", "Of je nu … of …", sentence-initial "Wie …, …", "op een rij", "Hieronder vind je".
- "Op zoek naar …?", "hoogwaardig", "must-have" or "moeiteloos" on its own, "tijdloos" for a design, "laat je verrassen", hearts, a final "!", a row of hashtags, a je/u mix.

### G3. Punctuation norms

- **Em dash (—):** not a Dutch norm. Replace it unless the writer uses it (§8).
- **Spaced en dash or hyphen:** ordinary; thin out a text full of them.
- **Serial comma:** Dutch has no comma before "en" or "of" in a list: "rood, groen en blauw". It is also on 63 of 2,000 human web pages, so it is a product-only entry: remove it in product copy, elsewhere only when the rest reads as machine-written. Keep it where it prevents a misreading ("met appel, peer en kaas, en brood").
- **Comma after a fronted phrase:** Dutch has none when the verb follows directly: "Met deze machine bakt u…", never "Met deze machine, bakt u…". After a subordinate clause the comma stays: "Als je vragen hebt, bel me." A comma after a long subject that ends in a bijzin ("De beslissing om in Nederland te blijven, weerspiegelt…") is accepted by Taaladvies; most writers leave it out, but it is no error.
- **After a colon:** lowercase, unless a full quotation or a name follows.
- **Exclamation marks:** 12% of human product texts end with one. Keep the writer's; cut a row of them.
- **Numbers and units:** decimal comma and thousands point ("4,5 sterren", "3.000 m²"), a space before units ("60 Hz", "250 g/m²"), times as "9.00 uur" or "09:00". Fix an English decimal point ("4.5 sterren").

### G4. Register: je, jij, u; Netherlandic and Flemish

- Keep the writer's address. Dutch webshops mostly use je; many Flemish shops, government texts and older customers use u. Human webshops mix je and u (4.2% of human product texts, 2.4% of machine texts); fix the mix only if the writer asks, towards the form the text uses most.
- Never move a Flemish text towards Netherlandic Dutch or the other way round. Keep gsm, frigo, goesting, plezant, "contacteer ons", gelieve, "Dag Sanne", "tot dan", and ge/gij in a casual post.
- "Hoi", "Beste", "Dag", "Groetjes", "Met vriendelijke groet(en)" and "Mvg" are all ordinary. A colleague email in Dutch is usually shorter and less formal than the model's version.

### G5. Compounds

Dutch writes compounds as one word: "smarthomehub", "fitnesstracker", "wificode", "ledlamp", "CrossFit-training", "SmartSound-speaker". Use a hyphen after a capital, digit or letter abbreviation ("A4-poster", "cd-hoes", "e-mailadres") and where two vowels clash ("zee-egel", "auto-onderdelen"). Models split them the English way ("fitness tracker", uc-251b7599b6a5), but so do people (the "Engelse ziekte"): fix them as spelling, not as a tell.

### G6. Product copy for small sellers

Etsy, Bol.com, Marktplaats, Vinted and small Shopify or Lightspeed shops. A buyer wants to know what it is, its size and material, who made it, care, shipping and what is not included. Model copy spends its first lines on mood.

- **Facts first.** Open with the item and its main fact; put material, size, care and shipping in short lines.
- **Add nothing.** Flag food and cosmetics claims ("goed voor je bloedsuiker", "anti-aging") to the seller instead of rewording them.
- **Keep search words.** Etsy and Bol titles are keyword strings on purpose ("Botanische poster wilde bloemen A4 A3 | wanddecoratie | cadeau"). Keep the seller's keywords and their order; fix only Title Case (unless the shop's other titles use it), spelling and English punctuation.
- **Cut:** gift formulas ("het perfecte cadeau voor elke gelegenheid", "voor jezelf of een dierbare", "zal jarenlang worden gekoesterd"), urgency closers ("Wacht niet langer", "Bestel vandaag nog en …"), interior promises ("past naadloos in elk interieur") and false contrasts ("niet zomaar een mok"). One plain sentence about gifting can stay: "Ook leuk als cadeau."

## Worked example 1: product listing

An Etsy description, composed from GPT-4 phrases (UltraChat-Dutch) and list entries around one set of facts: a botanical print of wild flowers, drawn by hand in the seller's studio in Utrecht, in A4 or A3, printed on 250 g/m² matte paper, shipped in a rigid cardboard envelope, frame not included.

**Before:**
> Natuurlijk! Hier is een productbeschrijving voor je Etsy-winkel: ①
>
> **Botanische Poster – Wilde Bloemen** ② ③
>
> Duik in de wereld van wilde bloemen met deze adembenemende botanische poster! ④ ⑤ Dit is niet zomaar een poster: het is een ode aan de natuur die elke ruimte tot leven brengt. ⑥ ⑤ ④
>
> Elke bloem is met de hand getekend in mijn atelier in Utrecht en vangt de essentie van een zomerse berm. ④ De zachte, aardse tinten passen naadloos in elk interieur en voegen een vleugje elegantie toe aan je woonkamer, slaapkamer, of werkplek. ⑤ ⑦
>
> **Belangrijkste kenmerken:** ② ⑧
> ✔️ Formaat: A4 of A3 ⑧
> ✔️ Gedrukt op 250 g/m² mat papier
> ✔️ Verzonden in een stevige kartonnen envelop
> ✔️ Lijst niet inbegrepen
>
> Op zoek naar een cadeau? Deze poster is het perfecte cadeau voor elke gelegenheid en een tijdloos cadeau voor jezelf of een dierbare. ⑨ Hij zal jarenlang worden gekoesterd. ⑨
>
> Bestel vandaag nog en breng je muren tot leven! 🌿 ⑩ ④
>
> ---
> Wil je dat ik de toon aanpas of een kortere versie maak? ①

**Tells:** ① chat wrappers (§21, `nl-chat-residue`, `nl-chat-aanpassen`); ② Markdown bold, which Etsy shows as asterisks (§18); ③ Title Case (§19; the en dash is ordinary); ④ calques (G1: `nl-immersion-opener`, `nl-tot-leven`, `nl-vangt-de-essentie`); ⑤ sales language (§17, §11); ⑥ niet X, maar Y (§1); ⑦ serial comma (G3); ⑧ template heading and emoji bullets (§19); ⑨ gift formulas (G6); ⑩ closing call to action (`nl-bestel-nu-en`).

**After:**
> Botanische poster – wilde bloemen
>
> Wilde bloemen zoals in een zomerse berm, met de hand getekend in mijn atelier in Utrecht. De tinten zijn zacht en aards, mooi in een woonkamer, slaapkamer of werkplek.
>
> Kenmerken:
> Formaat: A4 of A3
> Papier: 250 g/m², mat
> Verzending: in een stevige kartonnen envelop
> De lijst zit er niet bij.
>
> Ook leuk als cadeau, voor iemand anders of voor jezelf.

**What changed:**

- Every fact kept, including the three rooms; only the promise that the colours fit any interior was cut. Nothing added: no paper brand, shipping time or price.
- The title keeps its keywords, their order and the en dash, in sentence case. The gift paragraph became one sentence; the 🌿 went with the closer it decorated.

## Worked example 2: email

Quoted from email-8-sonnet, request: "Schrijf een e-mail aan mijn collega's over een opruimdag in het park met vrijwilligers." The signature name is the model's own.

**Before:**
> **Onderwerp:** Opruimdag in het park – doe jij mee? ①
>
> Beste collega's,
>
> Binnen ons team willen we graag iets terugdoen voor de buurt. Daarom organiseren we een **opruimdag in het park**, samen met vrijwilligers uit de omgeving. ① Het lijkt me een mooie kans om samen buiten bezig te zijn en het park weer schoon en prettig te maken voor iedereen.
>
> **Details** ②
> - **Datum:** [datum invullen] ① ③
> - **Tijd:** [starttijd] – [eindtijd] ③
> - **Verzamelpunt:** [locatie/ingang van het park] ③
>
> **Wat gaan we doen?** ②
> We ruimen zwerfafval op, harken paden schoon en maken speelplekken en bankjes netjes. Voor handschoenen, afvalzakken en grijpers wordt gezorgd. ④ Ook zorgen we voor koffie, thee en iets lekkers tussendoor.
>
> **Wat neem je mee?** ②
> - Kleding die vies mag worden
> - Stevige schoenen of laarzen
> - Eventueel een eigen fles water
> - Goed humeur!
>
> **Aanmelden** ②
> Laat het me vóór [deadline] weten of je erbij bent, door te antwoorden op deze e-mail. ③ Neem gerust familie of vrienden mee, want hoe meer handen, hoe lichter het werk. Geef bij je aanmelding aan als je rekening wilt houden met dieetwensen of andere zaken. ⑤
>
> Bij extreem slecht weer informeren we je tijdig over eventuele verplaatsing.
>
> Ik hoop dat jullie er zijn. Samen maken we er een gezellige en nuttige dag van!
>
> Met vriendelijke groet,
>
> Daan de Vries
> [functie / afdeling] ③
> [telefoonnummer] ③
>
> ---
>
> Wil je dat ik de toon aanpas (formeler of informeler), de e-mail inkort, of specifieke details toevoeg zoals de naam van het park of de organisatie? ⑥

**Tells:** ① Markdown bold, shown as asterisks in a mail client (§18); ② four section heads that make a 200-word message read like a circular (§19); ③ placeholders (§23); ④ hidden actor, weak: "wordt gezorgd" while the next sentence says "zorgen we" (§10); ⑤ stiff phrasing ("als je rekening wilt houden met … andere zaken"); ⑥ chat offer (§21, `nl-chat-aanpassen`).

Left alone on purpose: "hoe meer handen, hoe lichter het werk", "Goed humeur!", the spaced en dash in the subject, "Ik hoop dat jullie er zijn" and "Samen maken we er een gezellige en nuttige dag van!" (ordinary in Dutch newsletters).

**After:**
> Onderwerp: Opruimdag in het park – doe jij mee?
>
> Beste collega's,
>
> Met ons team willen we graag iets terugdoen voor de buurt. Daarom organiseren we samen met vrijwilligers uit de omgeving een opruimdag in het park. Het lijkt me een mooie kans om samen buiten bezig te zijn en het park weer schoon en prettig te maken voor iedereen.
>
> Wanneer: [datum], van [starttijd] tot [eindtijd]
> Verzamelen: [locatie/ingang van het park]
>
> We ruimen zwerfafval op, harken de paden schoon en maken de speelplekken en bankjes netjes. Wij zorgen voor handschoenen, afvalzakken en grijpers, en voor koffie, thee en iets lekkers tussendoor. Trek kleren aan die vies mogen worden, en stevige schoenen of laarzen. Neem eventueel een eigen fles water mee. En een goed humeur!
>
> Doe je mee? Antwoord dan vóór [deadline] op deze mail. Neem gerust familie of vrienden mee: hoe meer handen, hoe lichter het werk. Heb je een dieetwens of moeten we ergens anders rekening mee houden, zet het dan in je antwoord. Bij extreem slecht weer laten we je op tijd weten of de dag verschuift.
>
> Ik hoop dat jullie er zijn. Samen maken we er een gezellige en nuttige dag van!
>
> Met vriendelijke groet,
>
> Daan de Vries
> [functie / afdeling]
> [telefoonnummer]

**Still needed from the writer:** the date, start and end time, meeting point, sign-up deadline, job title and phone number. Until they are filled, the checker flags the slots (`nl-placeholder`).

**What changed:**

- Every fact kept: the reason, the volunteers, the tasks, what the team provides, what to bring, how to sign up, family and friends welcome, dietary and other needs, the bad-weather plan.
- Bold, headings and bullets became two practical lines and short paragraphs. "Voor … wordt gezorgd" became "Wij zorgen voor".
- The chat offer was deleted. Nothing was added: no park name, no date, no organisation.

## When not to act

SKILL.md lists the general cases. In Dutch, be most careful with:

- Flemish texts, which use u-forms, "gelieve", "contacteren" and "Met vriendelijke groeten" as a matter of course.
- School essays, policy reports and minutes, whose conventions ("In dit verslag…", "Al met al", "Het is belangrijk dat…") look formulaic and are ordinary.
- Writers whose first language is not Dutch, who write calques and split compounds too. Fix the language if asked; do not call it machine text.

## Source

The pattern families follow the English humanizer ([blader/humanizer](https://github.com/blader/humanizer)), based on Wikipedia's ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing). Measurements and Before quotes come from the humanizer-lists repository: Claude Sonnet and Haiku output, GPT-4 and Vicuna-13B from the CLIN33 shared task (clin33-…) and GPT-4 from UltraChat-Dutch (uc-…).
