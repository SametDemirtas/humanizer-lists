# German rewriting guide

Rewrite German text that reads as machine-written so it reads like the person who sends it. Keep what it says. Do not make anything up.

It covers shop listings, emails, blog and social posts, Aufsätze, articles and Berichte. The checker finds leftovers and stock phrases; a text can pass it and still sound like a chatbot, and this guide is for that second job. It marks which habits are ordinary German and must stay. It adapts the English humanizer ([blader/humanizer](https://github.com/blader/humanizer)), which draws on Wikipedia's ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

Two kinds of evidence back the advice:

- Measured in the [humanizer-lists](https://github.com/SametDemirtas/humanizer-lists) repository: 2,000 human web pages, 814 news pages and 370 shop pages from mC4 (2013 to 2020), against 96 machine texts (Claude Sonnet and Haiku, six genres, 16 texts each). Figures "per 1,000 words" were counted for this guide; `references/de.md` holds the checker entries.
- Judgment: patterns an editor would fix that the corpora cannot measure (headings, subject lines, hashtags, product copy). Act on them only with company from other tells.

Examples with an id (for example `essay-7-sonnet`) are real model output from that repository. The models wrote them for a bare request, so their names and numbers are invented; a real rewrite asks the writer for such details (§27). The shop examples are constructed, since no German machine product copy was available.

Per 1,000 words, human web pages use the particles mal, ja and doch far more often than the machine texts (mal 1.02 against 0.14, ja 0.77 against 0.10, doch 0.74 against 0.24). The machine texts use "sondern" almost four times as often (1.90 against 0.51) and open a sentence with "Wer …," nine times as often (1.53 against 0.17). The model default is school-perfect Standard German from Germany, with a bold label on every item and a lesson at the end. People write unevenly, with particles, regional words and half sentences ("Anbei die Zahlen.").

## How to work in German

Follow the steps in `SKILL.md`. These notes add German detail; where they differ, `SKILL.md` decides.

- Before you edit, note the register (du, ihr or Sie), the variety (Germany, Austria, Switzerland), the gendered forms and the quotation style. They stay.
- Run the checker on the whole text. The German list has no product-only entries, so `--product` changes nothing. The checker also flags a colleague's real offer such as "Wenn du mir die Zahlen schickst, passe ich den Text noch an"; ignore the flag there.
- The patterns below apply to the whole text whether or not the checker flags it. One sighting of §1 to §5, or of a leftover (§25 to §29), justifies an edit. Patterns marked *weak alone* need other tells in the same passage.
- Shape edits (§6 triads, §20 bold labels, §22 emoji bullets) drop facts most often; after drafting, search again for §1, §2, §6 and §20.
- Check "Habits that are ordinary in German" before you change punctuation, gendered forms, salutations, hashtags or a single "Fazit".
- Voice: keep particles ("Das hat mich echt überrascht", "War halt Samstag"). You may add a particle or a reaction where the writer would, never an anecdote. German business email is drier than English: no opening wish for the reader's wellbeing, the point in the second sentence.

## A. Staging instead of stating

The strongest tells in German model prose. Act on one sighting.

### 1. nicht X, sondern Y

**Watch for:** nicht X, sondern Y; nicht nur X, sondern (auch) Y; weder X noch Y, sondern Z; es geht nicht um X, sondern um Y; a contrast split over two sentences; a clipped tail ("…, nicht umgekehrt").
**Problem:** The negative half names a view nobody holds, so the positive half sounds bigger. "nicht nur … sondern" is in 21 of the 96 machine texts, mostly in the last paragraph. State the point directly.
**Before** (Aufsatz, `essay-8-haiku`):
> Trotzdem fühlte es sich an wie eine kleine Lektion darüber, wie Gemeinschaft entsteht: nicht durch große Worte, sondern durch gemeinsame Hände, die dasselbe Stück Erde pflegen.
**After:**
> Trotzdem war es eine kleine Lektion darüber, wie Gemeinschaft entsteht: Man pflegt zusammen dasselbe Stück Erde.
**Leave alone:** "nicht …, sondern" is core German syntax. Keep it when the negative half corrects something the reader believes, or when both halves carry facts ("Der Zug fährt nicht um 8, sondern um 8:15."). "nicht nur …, sondern auch" listing two real effects stays; rewrite it when the text leans on it repeatedly or ends on it as a moral.

### 2. Closers and morals

**Watch for:** Mein Fazit; Vielleicht ist es genau das, was …; der eigentliche / größte Gewinn; Genau dafür machen wir das.; Das zeigt, wie …; Was bleibt?; a one-line paragraph that repeats the one above; a row of fragments ("Kein Stress. Kein Pendeln.").
**Problem:** The last line names what the text just showed or hands the reader a moral. "Mein Fazit" is on 11 of 96 machine texts and "der eigentliche / größte Gewinn" on 5, with almost no human hits. End on the last concrete fact, or on the writer's own reaction if it says something new.
**Before** (Blog, `blog-8-haiku`):
> Besonders stimmte uns nachdenklich, wie viel Müll schon nach kurzer Zeit wieder auftauchte. Aber genau deshalb ist ein Aufräumtag mehr als eine einmalige Aktion. Er zeigt, dass einem der Ort nicht egal ist, und er bringt Menschen dazu, achtsamer zu sein.
**After:**
> Nachdenklich hat uns gemacht, wie viel Müll schon nach kurzer Zeit wieder auftauchte.
**Leave alone:** "Fazit" as the heading of a Bericht, test or review; "Mein Fazit" in a product review. A last line that adds a fact or a plan ("Nächstes Jahr sind wir wieder dabei.").

### 3. Sprüche that sound deep

**Watch for:** X braucht Zeit, und Zeit hat ihren Preis; Wir kommen wegen X, aber wir bleiben wegen Y; X ist nur so gut wie seine schwächste Stelle; X ist die Sprache des Y; im Kern; letztlich geht es um; die eigentliche Frage ist; das Herzstück.
**Problem:** An ordinary point dressed as a proverb. Replace it with the specific claim.
**Before** (Aufsatz, `essay-7-sonnet`):
> Unser Buchclub zeigt damit, was Literatur im besten Fall bewirkt: Sie verbindet. Wir treffen uns wegen der Bücher, aber wir kommen wieder wegen der Menschen.
**After:**
> Im Buchclub sind aus Bekannten Freunde geworden.

(The essay says "aus Bekanntschaft wird Freundschaft" one paragraph earlier.)
**Leave alone:** Real proverbs used in passing ("Aller Anfang ist schwer"). "Mehr als nur ein …" is common on human web pages.

### 4. Staged run-ups

**Watch for:** Die gute Nachricht:; Hier sind die wichtigsten Tipps:; Klingt perfekt? Ganz so einfach ist es nicht.; Das Ergebnis?; Warum das wichtig ist:; Ehrlich gesagt?; Hand aufs Herz:.
**Problem:** The writer announces the point or stages candor instead of making the point. "Die gute Nachricht:" is on 3 machine texts and no human page. Remove the run-up.
**Before** (Blog, `blog-5-sonnet`):
> Die gute Nachricht: Oft reichen schon kleine Änderungen im Alltag, um spürbar zu sparen. Hier sind die wirkungsvollsten Tipps, nach Bereichen sortiert.
**After:**
> Oft reichen schon kleine Änderungen im Alltag, um spürbar zu sparen.

(The section headings already sort the tips.)
**Leave alone:** "ehrlich gesagt" or "mal ehrlich" inside a casual sentence ("Ehrlich gesagt hatte ich keine Lust."). A blog question the text answers with a fact.

### 5. Arguing with no one

**Watch for:** Versteht mich nicht falsch; Das heißt nicht, dass …; Man könnte jetzt meinen, …; Natürlich ist nicht alles perfekt.; … und die sollte man ehrlich benennen.
**Problem:** The text answers an objection that appears nowhere else. Cut the defense; keep any claim inside it.
**Before** (E-Mail, constructed):
> Versteht mich nicht falsch, ich bin nicht gegen das Homeoffice. Mir geht es nur darum, dass wir uns besser abstimmen.
**After:**
> Ich möchte, dass wir uns im Homeoffice besser abstimmen.
**Leave alone:** "Natürlich" before a real counterpoint; a reply to a colleague's actual objection.

## B. Rhythm by rule

### 6. Triads

**Watch for:** three items that overlap ("Vertrauen, Struktur und Eigenverantwortung"); three bullets that say one thing; three short sentences and a lesson.
**Problem:** Ideas arrive in threes because three sounds complete. Keep the items that add something distinct.
**Before** (LinkedIn, `social-6-haiku`):
> Sie verbinden Theorie mit Anschauung, fördern selbstständiges Denken und zeigen, dass Lernen weit über das Klassenzimmer hinausgeht.
**After:**
> Sie verbinden Theorie mit Anschauung und fördern selbstständiges Denken.
**Leave alone:** Fixed triads ("Zeit, Geld und Nerven") and lists of real items ("Brot, Brötchen und Kuchen", three materials in a listing).

### 7. Repeated sentence openings

**Watch for:** "Wer …, (der) …" sentence after sentence; "Vielleicht … Vielleicht …"; "Man … Man …"; "Ich … Ich …" in a cover letter; every bullet opening with a bold noun.
**Problem:** "Wer …, (der) kann / wird / spart …" is on 18.8% of the machine texts. One is normal German; three in a paragraph are a pattern. Name the person, or use "wenn".
**Before** (Aufsatz, `essay-1-sonnet`):
> Wer von zu Hause arbeitet, kann seinen Tag flexibler gestalten. […] Wer am Küchentisch arbeitet, schaltet abends nur schwer ab.
**After:**
> Von zu Hause lässt sich der Tag flexibler gestalten. […] Am Küchentisch fällt das Abschalten abends schwer.
**Leave alone:** Deliberate anaphora in a speech or personal post.

### 8. Dashes

**Rule for German:** The English no-dash rule does not apply. The spaced en dash ( – ) is the normal Gedankenstrich, on 24.5% of human web pages and 27.1% of machine texts, so it tells nothing.
**What to fix:** an unspaced em dash (—) between words, which is not the German norm (and not an AI sign): write "Wort – Wort" unless the writer uses it throughout. Also a dash standing in for "weil", "denn" or a full stop in sentence after sentence.
**Before** (LinkedIn, `social-4-sonnet`):
> Es duftet nach frischem Brot, Butter und Zimt – und das nicht nur zufällig.
**After:**
> Es duftet nach frischem Brot, Butter und Zimt.

(The dash is fine. The tail is a §1 clipped contrast with no content.)
**Leave alone:** a Gedankenstrich pair around an aside, ranges ("9–17 Uhr"), the Swiss price dash ("CHF 25.–").

### 9. Stacked qualifiers

**Watch for:** möglicherweise, eventuell, unter Umständen, in gewisser Weise, gewissermaßen, durchaus, tendenziell piled into one sentence.
**Problem:** Qualifier after qualifier until the claim sounds unsure. Keep one when the source supports the doubt. *Weak alone.*
**Before** (Blog, constructed):
> Eine Wärmepumpe kann sich unter Umständen durchaus lohnen, wenn das Haus tendenziell gut gedämmt ist.
**After:**
> Eine Wärmepumpe kann sich lohnen, wenn das Haus gut gedämmt ist.
**Leave alone:** Modal particles are not qualifiers. ja, doch, mal, halt, eben and wohl are far more frequent in human German; never strip them. Keep legal and safety hedges ("Farben können je nach Bildschirm abweichen", "voraussichtlich").

### 10. Compounds, hyphens and spaces

**Watch for:** compounds split by a space ("Bio Baumwolle", "Homeoffice Tipps"); English-style hyphens ("Bereit-Sein").
**Problem:** The split compound (Deppenleerzeichen) is a human error, common in small-shop copy, and not an AI tell. Fix it as spelling: "Biobaumwolle" or "Bio-Baumwolle", "Homeoffice-Tipps". A hyphen in a long compound is allowed ("Großraumbüro-Lärm"). *Weak alone.*
**Before** (Etsy, constructed):
> Handgemachtes Holz Schneidebrett aus Eiche Massiv Holz
**After:**
> Handgemachtes Schneidebrett aus massiver Eiche
**Leave alone:** Brand spellings, Etsy tags (single search terms, often split on purpose), hyphenated compounds the writer uses consistently.

### 11. Passive voice and missing subjects

**Problem:** The text hides who acts, even when the actor is the point. Use the active voice then. *Weak alone.*
**Before** (LinkedIn, `social-6-haiku`):
> Bei [konkretes Exponat oder Erlebnis] wurden Fragen gestellt, Vermutungen angestellt und Ideen ausprobiert.
**After:**
> Bei [konkretes Exponat oder Erlebnis] haben die Schülerinnen und Schüler Fragen gestellt, Vermutungen angestellt und Ideen ausprobiert.

(The post names "die Schülerinnen und Schüler" two sentences earlier.)
**Leave alone:** German uses the passive more than English: in Berichte and Protokolle by convention ("Der Antrag wurde einstimmig angenommen."), in blog narration ("Im Bus wurde gelacht und gesungen."). The infinitive instruction ("Bei 30 °C waschen.") is standard.

## C. Inflation and borrowed authority

The fact underneath is usually sound. Keep it and remove the dressing.

### 12. AI vocabulary

**Watch for:** clusters of bewusst, gezielt, echte/echter as praise, spürbar, nachhaltig (figurative), Mehrwert, Herzstück, wertvoll, vielfältig, maßgeblich, ganzheitlich.
**Problem:** Per 1,000 words the machine texts use "bewusst" 0.88 times against 0.12 on web pages, "gezielt" 0.34 against 0.06; "spürbar" is frequent but mostly on one topic. One word proves nothing; three or four in a paragraph read as generated. Replace each with the plain word or the fact.
**Before** (LinkedIn, `social-1-sonnet`):
> 💬 **Bewusste Kommunikation.** Was im Büro nebenbei passiert, muss zuhause aktiv gestaltet werden: kurze Abstimmungen, transparente Updates, ehrliches Feedback.
**After:**
> Was im Büro nebenbei passiert, muss man zu Hause selbst anstoßen: kurze Abstimmungen, Updates, Feedback.
**Leave alone:** A word in its literal sense ("echtes Leder", "nachhaltig" in forestry).

### 13. Inflated significance

**Watch for:** ein wichtiger Schritt in Richtung; ein Meilenstein; markiert einen Wendepunkt; setzt ein Zeichen; spielt eine zentrale Rolle; "Die Zukunft sieht vielversprechend aus".
**Problem:** An ordinary detail is said to mark a change or promise a future. Keep the fact; drop the significance.
**Before** (LinkedIn, `social-2-sonnet`):
> Das ist ein wichtiger Schritt in Richtung moderne, nachhaltige Mobilität. Jetzt kommt es darauf an, das Netz konsequent weiterzudenken: Lücken schließen, Kreuzungen sicherer machen und ausreichend Abstellmöglichkeiten schaffen.
**After:**
> Jetzt müssen Lücken im Netz geschlossen, Kreuzungen sicherer gemacht und ausreichend Abstellmöglichkeiten geschaffen werden.
**Leave alone:** A significance the source attributes ("Der Bürgermeister nannte die Eröffnung einen Gewinn für die Hauptstraße."). "Entscheidend ist" was measured as ordinary in reports and news.

### 14. Vague attribution and vague connection

**Watch for:** Studien zeigen; Experten empfehlen; gilt als; Untersuchungen belegen; im Zusammenhang mit; rund um; steht für.
**Problem:** An unnamed authority props up a claim. "Studien zeigen" is on 3 machine texts and no human web page. Name the study if the source does; otherwise cut the authority and keep the plain claim, or cut both.
**Before** (Blog, `blog-3-sonnet`):
> Studien zeigen, dass Erwachsene beim Einstieg in Grammatik und Wortschatz sogar schneller vorankommen, weil sie bereits wissen, wie Sprache funktioniert.
**After:**
> Erwachsene kommen beim Einstieg in Grammatik und Wortschatz sogar schneller voran, weil sie bereits wissen, wie Sprache funktioniert.
**Leave alone:** A named source ("laut Umweltbundesamt") and a hearsay marker the writer means ("angeblich", "soll").

### 15. Riders: the German form of -ing tails

**Watch for:** "…, was … unterstreicht"; "…, wodurch …"; "… und setzt damit ein Zeichen für …"; "… – ein Beweis dafür, dass …"; "und trägt so zu … bei".
**Problem:** A clause bolted onto a plain fact to make it sound deeper. Keep the rider only if the source says it.
**Before** (Instagram, constructed):
> Unsere Kerzen werden in Handarbeit gegossen, was unsere Liebe zum Detail unterstreicht und für ein einzigartiges Wohngefühl sorgt.
**After:**
> Wir gießen jede Kerze von Hand.
**Leave alone:** A "wodurch" or "was" clause with a real consequence ("Die Straße ist gesperrt, wodurch der Bus eine Umleitung fährt.").

### 16. Nominalstil and Funktionsverbgefüge

**Watch for:** "die Durchführung … erfolgt", "in Anspruch nehmen", "zur Anwendung kommen", "eine Optimierung vornehmen", "Sicherstellung"; genitive chains.
**Problem:** Nominalstil sounds official even when it says little. In emails and posts, turn the noun back into a verb and name who acts.
**Before** (E-Mail, constructed):
> Die Durchführung der Wartungsarbeiten erfolgt am Freitag. Wir bitten um Berücksichtigung, dass während dieser Zeit eine Nutzung des Servers nicht möglich ist.
**After:**
> Am Freitag warten wir den Server. In dieser Zeit können Sie ihn nicht nutzen.
**Leave alone:** Legal text, contracts and Behördenbriefe, where rewording can change the meaning; fixed terms ("in Kraft treten", "zur Kenntnis nehmen"). *Weak alone* in a Bericht.

### 17. Avoiding ist, sind and hat

**Watch for:** stellt … dar; dient als; fungiert als; verfügt über; punktet mit; besticht durch; zeichnet sich durch … aus.
**Problem:** A long verb replaces "ist" or "hat". Use the short one.
**Before** (E-Mail, `email-2-sonnet`):
> [Straße/Route 1], [Straße/Route 2] und [Straße/Route 3] verfügen jetzt über durchgehende, baulich getrennte Radwege.
**After:**
> Auf [Straße/Route 1], [Straße/Route 2] und [Straße/Route 3] gibt es jetzt durchgehende, baulich getrennte Radwege.
**Leave alone:** "verfügt über" is ordinary in human shop copy (0.25 per 1,000 words, against 0.07 in the machine texts) and in property listings. Change it when it stacks with other long verbs.

### 18. Synonym cycling

**Watch for:** one thing renamed in every sentence: "die Bäckerei … das Geschäft … der Betrieb"; "das Poster … der Druck … das Kunstwerk".
**Problem:** The reader wonders whether these are different things. Pick one name, or use a pronoun. *Weak alone*: German schools teach students to vary words.
**Before** (Bericht, `report-4-haiku`):
> Im Stadtteil hat am vergangenen Samstag die Bäckerei „Goldkrume“ eröffnet. […] Das Geschäft liegt an der Hauptstraße. […] Der Betrieb bietet frisches Brot aus traditionellem Sauerteig an.
**After:**
> … Sie liegt an der Hauptstraße. […] Die Bäckerei bietet frisches Brot aus traditionellem Sauerteig an.
**Leave alone:** A variant that carries a fact ("die Inhaberin, eine gelernte Konditorin").

## D. Promotional language

### 19. Sales language

**Watch for:** Tauche ein in; verleiht jedem Raum; zaubert ein Lächeln ins Gesicht; das perfekte Geschenk für jeden Anlass; mit Liebe zum Detail; lädt zum Verweilen ein; ein Muss für alle, die …; hol dir jetzt ….
**Problem:** The text reads like an advert instead of saying what the thing is. In product copy, put the buyer's facts first ("Product copy for small sellers"). Elsewhere, state what the place or thing is.
**Before** (Blog, `blog-4-sonnet`):
> Schon beim Hereinkommen merkt man: Hier wurde mit Liebe zum Detail gearbeitet. Helle Wände, Holzregale voller Brote und eine große Glasvitrine mit Gebäck laden zum Verweilen ein.
**After:**
> Der Laden hat helle Wände, Holzregale voller Brote und eine große Glasvitrine mit Gebäck.
**Leave alone:** Human shop copy is promotional by nature: "hochwertig" (0.72 per 1,000 words on shop pages, none in the machine texts), "perfekt", "Highlight", "verleiht" and "Hingucker" are more common there than in the machine texts. Cut them when they replace a fact or pile up; keep one the seller means. "Liebevoll handgemacht" stays if true and said once.

## E. Formatting by rule

### 20. Bold labels and Markdown

**Watch for:** `**Zeitgewinn.**` opening every paragraph; `**Material:**` on every bullet; bold phrases inside sentences; asterisks visible in plain text.
**Problem:** Markdown bold is on 63 of 96 machine texts and no human page. In an email, an Etsy description or an Instagram caption the asterisks show as asterisks. Remove bold lead-in labels in running prose unless the writer asks for them or the text is for a Markdown page where the writer wants them. Turn a labeled list into prose when the labels carry nothing of their own.
**Before** (E-Mail, `email-1-sonnet`):
> **1. Erreichbarkeit**
> Bitte seid während der üblichen Kernarbeitszeiten (z. B. 9:00–15:00 Uhr) per Chat, E-Mail oder Telefon erreichbar.
>
> **2. Kommunikation**
> - Für kurze Rückfragen eignet sich der Chat, für ausführlichere Themen die E-Mail oder ein kurzer Call.
**After:**
> Bitte seid während der üblichen Kernarbeitszeiten ([Beginn] bis [Ende] Uhr) per Chat, E-Mail oder Telefon erreichbar. Kurze Rückfragen gehen in den Chat, ausführlichere Themen per E-Mail oder in einen kurzen Call.

(The model's "z. B. 9:00–15:00 Uhr" is a guess, not the team's rule. Ask for the real core hours.)
**Leave alone:** A spec block in a listing ("Maße: 30 × 40 cm") is a real label with data; write it without asterisks.

### 21. Headings

**Watch for:** `## Die Vorteile`, `## Mein Fazit` in a 300-word post; a heading every two paragraphs; a heading in an email; an "X: Y" title ("Homeoffice: Freiheit mit Fallstricken").
**Problem:** Markdown headings are on 55 of 96 machine texts and no human page. A short post or email needs none. The "X: Y" title opens 46 machine texts but is a common human headline too, so it is *weak alone*.
**Before** (Blog, `blog-1-haiku`):
> ## Die Vorteile, die man schnell zu schätzen lernt
**After:**
> (Cut the heading; begin the paragraph with the first advantage.)
**Leave alone:** Headings in a long article, Bericht or how-to.

### 22. Emoji and hashtags

**Watch for:** an emoji plus a bold label on every bullet (🔹 **Fokus:** …); ✅ lists of vague benefits; ✨ around a title; generic tags (#NewWork #Mindset) unrelated to the post.
**Problem:** Every item decorated the same way. Keep the emoji the writer would type in a sentence and hashtags people search for.
**Before** (LinkedIn, `social-7-sonnet`):
> 🔹 **Neue Perspektiven:** Jede Person nimmt aus demselben Buch etwas anderes mit. Das erweitert den eigenen Blick enorm.
> 🔹 **Verbindlichkeit:** Ein festes Datum sorgt dafür, dass man wirklich zum Lesen kommt.
**After:**
> Jede Person nimmt aus demselben Buch etwas anderes mit, und das erweitert den eigenen Blick enorm. Durch das feste Datum kommt man außerdem wirklich zum Lesen.
**Leave alone:** Three or more hashtags on a social post and 📍 or 🕖 lines in an event post (both measured as ordinary); an emoji at the end of a personal caption.

### 23. English Title Case

**Watch for:** every word capitalised as in English ("Die 5 Besten Tipps Für Ein Gemütliches Zuhause"); adjectives and prepositions in capitals in a heading or Etsy title.
**Problem:** German capitalises nouns and the first word, in titles too. Title Case is a translation or tool artefact.
**Before** (Etsy title, constructed):
> Minimalistisches Poster Herbstlaub – Wanddeko Für Wohnzimmer Und Schlafzimmer
**After:**
> Minimalistisches Poster Herbstlaub – Wanddeko für Wohnzimmer und Schlafzimmer
**Leave alone:** Brand names, adjectives in names ("Rotes Kreuz"), a capital after a colon before a full sentence.

### 24. Quotation marks

**Watch for:** a German opening „ closed with a straight " (on 9 of 96 machine texts and 0.9% of human web pages).
**Problem:** The model writes the opening mark and an ASCII closing one. Use one style: „…“ (Germany, Austria), «…» (Switzerland), »…« (books), or plain "…" throughout. *Weak alone*; many people type straight quotes.
**Before** (Blog, `blog-3-haiku`):
> Ich verstand kaum mehr als „ciao" und „grazie".
**After:**
> Ich verstand kaum mehr als „ciao“ und „grazie“.
**Leave alone:** Straight quotes used consistently, guillemets, and English curly quotes (rare in human text, absent from the machine texts).

## F. Leftovers from the chat and the draft

Remove these outright. The checker finds most of them.

### 25. Chat wrappers

**Watch for:** Gerne! Hier ist ein Entwurf …; Wenn du möchtest, passe ich den Ton an; Soll ich den Text kürzen?; Ich hoffe, das hilft!; a `---` line before the offer.
**Problem:** On 36 of 96 machine texts. They address the person who asked, not the reader.
**Before** (`email-5-sonnet`):
> Viele Grüße
> [Dein Name]
>
> ---
>
> Soll ich den Ton lockerer oder formeller gestalten oder die E-Mail kürzen?
**After:**
> Viele Grüße
> [Dein Name]
**Leave alone:** "Gerne, ich komme am Samstag" in a real reply; "hier ist mein Vorschlag für die Tagesordnung" from a colleague. A colleague's "Wenn du mir die Zahlen schickst, passe ich den Text noch an" is real work; the checker still flags it, and you ignore that flag.

### 26. Placeholders and the Betreff line

**Watch for:** [Dein Name], [Datum], [z. B. Sauerteigbrot], [Hier deine persönliche Erfahrung einfügen]; a "Betreff:" line inside the body.
**Problem:** Placeholders are on 35 of 96 machine texts. Ask the writer for each fact. Never fill one with a plausible guess, and never keep the bracket's example as if it were true. Move "Betreff:" into the subject field.
**Before** (Blog, `blog-2-sonnet`):
> Ich bin die neue Strecke auf der [Straßenname] selbst abgefahren. [Hier deine persönliche Erfahrung einfügen, zum Beispiel: Die Fahrt fühlt sich entspannter an, die Ampelschaltungen sind besser abgestimmt.]
**After:**
> Ich bin die neue Strecke auf der [Straßenname] selbst abgefahren. [Offen: Wie war die Fahrt? Bitte ein, zwei Sätze aus eigener Erfahrung.]
**Leave alone:** Editorial brackets in quotes ("Er [ihr Sohn] war immer ruhig."), "[…]" for a cut, a subject line in a printed letter.

### 27. Knowledge disclaimers and invented details

**Watch for:** da mir keine echten Informationen vorliegen; Hinweis: Dieser Artikel ist frei erfunden; Ich habe Details als Platzhalter erfunden.
**Problem:** The model says where its knowledge ends or that it invented the content. Remove the note, then find the invented names, quotes and numbers and ask for the real ones. Cut what the writer cannot supply.
**Before** (Bericht, `report-4-haiku`):
> Die Inhaberin, Lena Schmidt, hat zuvor zehn Jahre in einer Bäckerei in der Nachbarstadt gearbeitet. […]
>
> *Hinweis: Dieser Bericht ist ein erfundenes Beispiel, da mir keine echten Informationen über eine Bäckerei vorliegen.*
**After:**
> (Do not publish. Ask for the owner's name, her background, the opening date and the hours.)
**Leave alone:** "Name von der Redaktion geändert"; "Abbildung beispielhaft" in a shop.

### 28. A heading repeated in the first sentence

Under "## Die Schattenseiten", `blog-1-haiku` opens with "Doch Homeoffice hat auch seine Kehrseiten, und die sollte man ehrlich benennen." Cut that sentence; the next one names the first drawback.

### 29. Writing about the document

**Watch for:** Dieser Bericht fasst … zusammen; Im Folgenden werden … vorgestellt; Hier sind meine Gedanken dazu.
**Before** (Bericht, `report-1-sonnet`):
> Viele Unternehmen bieten ihren Mitarbeitenden mittlerweile die Möglichkeit, ganz oder teilweise von zu Hause aus zu arbeiten. Dieser Bericht fasst die wichtigsten Vor- und Nachteile sowie Erfolgsfaktoren zusammen.
**After:**
> Viele Unternehmen lassen ihre Mitarbeitenden mittlerweile ganz oder teilweise von zu Hause aus arbeiten.
**Leave alone:** The scope sentence of a Hausarbeit or formal report ("In dieser Arbeit untersuche ich …").

## G. Writing for the wrong reader

### 30. Re-explaining what the reader knows

**Watch for:** a reply that thanks, restates the request, rebuilds the background and answers in the last paragraph.
**Problem:** In a reply the reader has the context, and German business email expects the point early. Lead with the answer; keep only the reason the reader lacks.
**Before** (E-Mail-Antwort, constructed):
> Hallo Jonas,
>
> vielen Dank für deine Nachricht und die Zusammenfassung der Lage. Wie du richtig schreibst, ist der Lieferant mit der Holzlieferung zwei Wochen im Verzug, und dadurch können wir die Regale nicht wie geplant bis zum 1. Dezember fertigstellen. Nach reiflicher Überlegung bin ich zu dem Schluss gekommen, dass es am sinnvollsten ist, den Kunden zu informieren und den Termin auf den 15. Dezember zu verschieben.
**After:**
> Hallo Jonas,
>
> lass uns den Kunden informieren und den Termin auf den 15. Dezember verschieben.

## Anglicisms and calques

Loanwords such as Homeoffice, Meeting, Team, Feedback and Deadline are German now; leave them. The tell is an English idiom translated word for word. None of these is a checker entry; fix them because they read as translated.

| Calque | Evidence | German alternative |
|---|---|---|
| macht einen (großen) Unterschied | 6 machine texts; 0.10 against 0.01 per 1,000 words | say what changes |
| auf das nächste Level bringen | not in the machine texts; marketing cliché | say what improves |
| Ich hoffe, diese E-Mail erreicht Sie wohlbehalten | judgment | cut |
| Zögern Sie nicht, mich zu kontaktieren | judgment | Melden Sie sich gern |
| erinnert uns daran, dass … | 2 machine texts | state the point |
| mein wichtigster Takeaway | 1 machine text | Mir ist hängen geblieben, dass … |

"Das macht Sinn" is in the Duden; do not correct it. English mixed into a LinkedIn post on purpose ("Learnings aus dem Q3") is a register.

## Punctuation and typography

- **Quotation marks.** Nested: ‚…‘ inside „…“, ‹…› inside «…» (§24). Dashes and capitals: §8, §23.
- **Commas.** A comma before every subordinate clause and before "aber", "sondern", "denn" between main clauses. No serial comma ("Brot, Brötchen und Kuchen"). A comma after an opening adverb ("Zusätzlich, …") is an English habit and wrong. The comma before an extended infinitive is often optional; leave the writer's choice.
- **Numbers.** "2,5 cm", "12,90 €", "z. B."; Switzerland "1'000" and "CHF 24.90"; Austria often "€ 12,90".
- **Exclamation marks.** Fewer than in English business writing; one in a friendly sign-off is normal.

## Register, variety and gendered forms

- **du, ihr, Sie.** Keep the writer's choice. If a text mixes du and Sie without reason, keep the one it uses most and ask.
- **Austria and Switzerland.** Do not convert to German from Germany. Austria: "Jänner", "heuer", "Sackerl", "Servus", "LG", titles such as "Mag.a". Switzerland: no ß ("Grüsse", "Strasse"), "Velo", "parkieren", "Grüezi", "Merci", «…».
- **Gendered forms.** "Kolleginnen und Kollegen", "Mitarbeitende", "Lehrer:innen", "Autor*in", the generic masculine: the writer's choice. Do not add, remove or swap them; if a text mixes two, keep the one the writer uses elsewhere.
- **Salutations.** "Liebe Kolleginnen und Kollegen" (24% of machine texts, and the normal salutation), "Hallo zusammen", "Viele Grüße", "Mit freundlichen Grüßen" are ordinary. After the salutation's comma the text continues in lower case.

## Habits that are ordinary in German

Do not change these for being "AI-like". Measured unless marked.

- The spaced en dash; the em dash, guillemets and English curly quotes (rare in human text, absent from the machine texts).
- Plain "kein …, sondern" ("Das ist kein Zufall, sondern Absicht"); one "nicht nur …, sondern auch" with two real facts.
- "mehr als nur ein", "Bereicherung", "Entscheidend ist", "Fazit:" as a heading, "Ein großes Dankeschön an alle, die …", "müde, aber zufrieden".
- Three or more hashtags; 📍 and 🕖 lines in event posts; "Und du?" closing a personal message.
- "ein Stück Heimat"; "Zusammenfassend lässt sich sagen" in a school essay; "In der heutigen Zeit", "am Ende des Tages" (people use them; the models did not).
- Modal particles, regional words, elliptical emails ("Anbei die Rechnung."), infinitive instructions, and passive or Nominalstil in Protokolle and contracts (judgment).
- One weak sign alone: a single "Wer …" sentence, one "Fazit", one "hochwertig" in a listing.

Keep what carries the writer's voice: an odd detail, mixed feelings ("Ich find's gut, aber irgendwas stört mich daran"), a self-correction.

## Product copy for small sellers

German buyers read listings for facts, so put the facts first.

- **Keep every fact the seller gives, ask for the missing ones, invent none:** what it is, Material (with g/m² for paper), Maße (cm, Ø, ml, Gewicht), Pflege, Lieferumfang ("Rahmen nicht im Lieferumfang"), Herstellung und Versand, and Abweichungen ("Farben können je nach Bildschirm abweichen").
- **Do not add** legal text (Impressum, Widerrufsbelehrung, AGB, Grundpreis), claims the seller did not make ("100 % Bio", "OEKO-TEX", "made in Germany", "lebensmittelecht", "handgemacht" for a print), green claims ("klimaneutral"), or urgency ("Nur noch heute!").
- **Etsy titles** are search strings. Keep the seller's keywords, their order and the ordinary en dash; fix only Title Case and emoji, and remove a gift keyword only if the seller agrees.
- **Tone.** One sentence in the maker's voice beats a paragraph of atmosphere, if the seller wrote or confirmed it.

## Worked example 1: product listing

A chatbot wrote this Etsy description from a seller's notes. Facts in the notes: poster with a minimalist leaf motif in soft earth tones, A3 (29,7 × 42 cm), matte paper 200 g/m², frame not included, shipped in a sturdy tube, colours may differ by screen, a gift idea for a move or a birthday.

**Before** (constructed in the style of the corpus):

> # ✨ Herbstlaub Kunstdruck – Minimalistisches Poster Für Dein Zuhause ✨ `[1] [2]`
>
> Tauche ein in die warme Welt des Herbstes! 🍂 `[3]` Dieser Kunstdruck ist nicht einfach nur Wanddeko – er ist ein Statement für Gemütlichkeit und Stil. `[4]`
>
> **Warum du dieses Poster lieben wirst:** `[5]`
>
> 🍁 **Zeitloses Design:** Die sanften Erdtöne und das minimalistische Blattmotiv verleihen jedem Raum eine einladende, harmonische Atmosphäre. `[6] [7]`
> 🖼️ **Premium-Qualität:** Gedruckt auf hochwertigem, mattem Papier (200 g/m²), das durch seine edle Haptik und brillante Farben besticht. `[8]`
> 📏 **Perfekte Größe:** Im Format A3 (29,7 × 42 cm) fügt sich das Poster harmonisch in jede Bilderwand ein. `[9]`
> 🎁 **Das perfekte Geschenk:** Ob zum Einzug, zum Geburtstag oder einfach so – mit diesem Druck zauberst du deinen Liebsten ein Lächeln ins Gesicht. `[3]`
>
> **Wichtige Hinweise:**
> - Rahmen nicht im Lieferumfang enthalten.
> - Der Druck wird sicher in einer stabilen Versandrolle verschickt.
> - Farben können je nach Bildschirm leicht abweichen.
>
> Hol dir jetzt ein Stück Herbst nach Hause und bring deine Einrichtung auf das nächste Level! 🍂✨ `[10]`
>
> ---
>
> Wenn du möchtest, passe ich die Beschreibung an einen anderen Ton an oder schreibe eine kürzere Version für den Titel. `[11]`

**Tells:** [1] Markdown heading and ✨ (§21, §22). [2] Title Case "Für Dein Zuhause" (§23). [3] Sales language (§19). [4] Contrast with nothing (§1). [5] Run-up label (§4). [6] Emoji and bold label on every bullet (§20, §22). [7] A claim about every room and a near-synonym pair (§19, §6). [8] Puffery around the real fact, 200 g/m² matte paper (§17, §19). [9] Unprovable, and "harmonisch" again (§19). [10] Closer with a calque and urgency (§2). [11] Chat leftover (§25).

**After:**

> Herbstlaub Kunstdruck – Minimalistisches Poster für dein Zuhause
>
> Ein minimalistisches Blattmotiv in sanften Erdtönen.
>
> Format: A3 (29,7 × 42 cm)
> Papier: matt, 200 g/m²
> Rahmen: nicht im Lieferumfang
> Versand: in einer stabilen Versandrolle
>
> Die Farben können je nach Bildschirm leicht abweichen.
>
> Ein schönes Geschenk zum Einzug oder zum Geburtstag.

**What changed:** Every fact from the notes is still there: motif, earth tones, A3 with centimetres, matte 200 g/m² paper, no frame, tube, colour note, the two gift occasions. The title keeps the seller's keywords, their order and the en dash; only the Markdown, the emoji and the Title Case went. The specs became a label block without asterisks. "Fügt sich in jede Bilderwand ein" was cut, not replaced with "passt in A3-Rahmen", which would be a new claim. Open questions for the seller: does the print fit a standard A3 frame, and is it made to order (so the listing can say when it ships)?

## Worked example 2: email

A shop owner asked a chatbot to write to a customer whose order is late. Facts: order #4821 from Frau Berger; the print shop had a technical outage; all open orders are delayed by a few days; the print is expected to ship on 14 November; she can cancel free of charge and gets the full amount back promptly.

**Before** (constructed in the style of the corpus emails):

> **Betreff:** Ihre Bestellung #4821 – Update zum Versandstatus `[1]`
>
> Sehr geehrte Frau Berger,
>
> ich hoffe, diese E-Mail erreicht Sie wohlbehalten! `[2]`
>
> Zunächst einmal möchte ich mich ganz herzlich für Ihre Bestellung und Ihr Vertrauen in unseren kleinen Shop bedanken. Es bedeutet uns wirklich sehr viel. 💛 `[3]`
>
> Leider muss ich Ihnen mitteilen, dass sich der Versand Ihrer Bestellung verzögert. Unsere Druckerei hatte unerwartet einen technischen Ausfall, wodurch sich alle offenen Aufträge um einige Tage verschieben. Wir verstehen vollkommen, wie frustrierend das sein kann – gerade, wenn man sich auf etwas freut. `[4]`
>
> **Die gute Nachricht:** Ihr Kunstdruck wird voraussichtlich am 14. November verschickt. `[5]` Seien Sie versichert, dass wir alles tun, um Ihre Bestellung so schnell wie möglich auf den Weg zu bringen. `[6]`
>
> Selbstverständlich haben Sie jederzeit die Möglichkeit, Ihre Bestellung kostenlos zu stornieren. In diesem Fall erstatten wir Ihnen den vollen Betrag umgehend zurück. `[7]`
>
> Für uns steht nicht nur ein schneller Versand im Mittelpunkt, sondern vor allem Ihre Zufriedenheit. `[8]`
>
> Sollten Sie Fragen haben, zögern Sie bitte nicht, mich zu kontaktieren. `[2]` Vielen Dank für Ihre Geduld und Ihr Verständnis!
>
> Mit freundlichen Grüßen
> [Ihr Name] `[9]`
> [Shopname]
>
> ---
>
> Wenn du möchtest, kann ich die E-Mail auch etwas lockerer formulieren oder eine englische Version erstellen. `[10]`

**Tells:** [1] "Betreff:" in the body, in bold (§20, §26). [2] Calques (see "Anglicisms and calques"). [3] A thank-you paragraph before the news (§30, §13). [4] Scripted empathy (§5). [5] Staged reveal (§4; a checker entry). [6] A promise with no content (§13). [7] Nominal "die Möglichkeit haben, … zu stornieren" and the redundant "erstatten … zurück" (§16). [8] Contrast with no one (§1). [9] Placeholders (§26). [10] Chat leftover (§25).

**After** (subject field: "Ihre Bestellung #4821: Versand voraussichtlich am 14. November"):

> Sehr geehrte Frau Berger,
>
> vielen Dank für Ihre Bestellung. Leider verzögert sich der Versand: Unsere Druckerei hatte unerwartet einen technischen Ausfall, und alle offenen Aufträge verschieben sich um einige Tage. Ihr Kunstdruck wird voraussichtlich am 14. November verschickt.
>
> Wenn Sie nicht so lange warten möchten, können Sie die Bestellung kostenlos stornieren. Wir erstatten Ihnen dann umgehend den vollen Betrag.
>
> Bei Fragen melden Sie sich gern. Vielen Dank für Ihre Geduld!
>
> Mit freundlichen Grüßen
> [Ihr Name]
> [Shopname]

**What changed:** The news moved to the second sentence. Every fact stayed: order number (now in the subject), the unexpected outage, the delay to all open orders, the expected date, free cancellation, the full and prompt refund. The register stays Sie. Open questions: the owner's name and the shop name for the placeholders. In a Swiss shop the sign-off is "Freundliche Grüsse".
