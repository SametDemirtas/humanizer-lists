# Italian rewriting guide

This guide covers Italian prose of every kind: Etsy and shop listings, emails, blog posts, Instagram and LinkedIn posts, essays, newspaper articles and reports. It follows the families of the English humanizer and says, for each pattern, how it looks in Italian, how to rewrite it, and when Italian writers do the same thing on purpose.

Numbers and entry ids such as `it-per-chi-ama` were measured in the humanizer-lists repository; the entries are in `references/it.md`. The structural patterns are judgment, taken from the English rulebook and from the development machine texts there: `ai-general` (96 posts, emails, essays, articles and reports by Claude Sonnet and Haiku) and `ai-models` (200 Etsy listings). Before examples come from those sets, sometimes shortened, unless marked *(written for this guide)*.

## How to work in Italian

Follow the steps in SKILL.md. These notes add the Italian detail; where they differ, SKILL.md decides.

- **Checker.** For a listing, pass title and description as JSON with `--product`. Note every high hit and every flagged pair of medium hits, then rewrite the whole text instead of patching the flagged phrases. One medium hit alone does not flag a text. §1 to §5 justify an edit on one sighting, flag or no flag.
- **Paragraph shape.** Look for the same "E tu?" ending, a bold label on every bullet, a "Conclusione" heading that repeats the introduction.
- **Fact list.** In product copy the list from SKILL.md step 4 is strict: never add a gram weight, a fabric percentage or a washing temperature, and do not let a claim grow ("stampa resistente" must not become "non sbiadisce mai"). A lost fact is an error unless a pattern here calls for cutting it (a chat leftover, an invented source, an audience formula, a closing moral).
- **Voice.** A writer's sample overrides this guide, punctuation included: caporali, dashes and "!!" stay at the writer's rate. Keep tu, Lei or voi (see "Register").
- **Return.** As SKILL.md says, with a short list of open questions: missing facts, placeholders, invented people or quotes to confirm.

## A. Staging instead of stating

The strongest family. One sighting justifies an edit.

### 1. Non X, ma Y

**Watch for:** "non è solo X: è Y", "non è (più) solo X, ma Y", "non si tratta (solo) di X, ma di Y", "X non significa Y, ma Z", "non è né X né Y: è Z", "molto più di un semplice X", the split "Non è X. È Y.", the clipped "…, non Y."
**In Italian:** measured as `it-non-e-solo-x-e`, `it-non-si-tratta-solo-ma`, `it-piu-di-un-semplice` and `it-non-significa-ma`. The 96 `ai-general` texts use the formula about 24 times, and "non è né una panacea né…: è uno strumento" closes three different pieces on remote work. The negative half names a reading nobody proposed. State the positive half as a plain claim.
**Before (LinkedIn, ai-general):**
> **Il lavoro da remoto non è una moda. È una competenza.**
>
> Il futuro non è "tutti in ufficio" né "tutti a casa". È **scegliere il modello giusto per le persone e per gli obiettivi**.
**After:**
> Lavorare da remoto è una competenza.
>
> Per il futuro conta scegliere il modello giusto per le persone e per gli obiettivi.
**Leave alone:** "non solo… ma anche" that adds a second fact ("Non solo la tazza ma anche il piattino va in lavastoviglie"), on 2.0% of human product pages. A contrast that corrects what the reader believes: "Il negozio non è chiuso: abbiamo solo cambiato orario." "Non è un semplice errore di battitura" when someone did call it a typo.

### 2. Closers, sign-off questions and dramatic fragments

**Watch for:** a last sentence that restates the paragraph; "un gesto semplice che fa la differenza" (`it-fa-la-differenza`); "E tu, …? Raccontamelo nei commenti!" (`it-cta-commenti`), which ends 16 of the 96 `ai-general` texts; a closing quotation brought in with "Perché, come ha detto…"; a headline of fragments ("La nostra città cambia direzione. E pedala.").
**In Italian:** model posts end with a one-line moral, the question with 👇, and hashtags; model news ends on a bystander who speaks the moral in caporali. Cut the moral. Keep the question only when the writer wants a specific answer.
**Before (news article, ai-general):**
> Perché, come ha concluso con una battuta uno degli alunni scendendo dal pullman: «Oggi non abbiamo studiato la storia. L'abbiamo quasi toccata».
**After:**
> Scendendo dal pullman, un alunno ha scherzato: «Oggi non abbiamo studiato la storia. L'abbiamo quasi toccata».
>
> (If nobody said it, it cannot stay in a news piece. Ask the writer.)
**Leave alone:** letter endings ("A presto"); "E tu, come stai?" in a personal message; a short last sentence that adds a fact ("Domenica il parco resta chiuso per i lavori.").

### 3. Sayings that sound deep

**Watch for:** "la chiave sta nel…", "il vero punto è", "è una questione di", "la verità è che", "diciamolo" (`it-diciamolo`), "X è il collante di Y", "un piccolo atto di resistenza", "si costruiscono ogni giorno", "una città che pedala è una città che respira". "In fondo" is *weak alone*: it is everyday Italian and counts only next to a saying.
**In Italian:** the saying often takes the shape "X non si improvvisa: si costruisce" or "X non sparisce, si progetta", a verb pair around a colon or comma. Replace it with the plain claim, or cut it when there is no claim under it.
**Before (LinkedIn, ai-general):**
> 📌 **La socialità non sparisce, si progetta.** Momenti di confronto, incontri in presenza e caffè virtuali non sono "tempo perso": sono il collante del team.
**After:**
> Da remoto i momenti insieme vanno organizzati: incontri in presenza, caffè virtuali, occasioni per confrontarsi. Servono a tenere unito il team.
**Leave alone:** a proverb quoted as a proverb; a figure of speech that carries a fact ("la cucina è il cuore della casa: lì mangiamo, studiamo e litighiamo").

### 4. Staged run-ups

**Watch for:** "Ecco una riflessione sincera su…", "Vediamo insieme…", "Ma al di là dell'entusiasmo iniziale, cosa significa davvero…?", a one-word question answered at once ("La prima impressione? …", `it-domanda-secca`), "Immagina di…" at the top of a listing (`it-immagina-apertura`), "In un mondo in cui…" (`it-in-un-mondo-dove`).
**Problem:** the text announces the point, or stages a moment of candour, before making it. Start with the point.
**Before (blog, ai-general):**
> Ho percorso i nuovi tratti nel fine settimana. La prima impressione? La segnaletica è chiara e il fondo stradale è in buone condizioni.
**After:**
> Ho percorso i nuovi tratti nel fine settimana: la segnaletica è chiara e il fondo stradale è in buone condizioni.
**Leave alone:** "Il motivo?" and "Il segreto?", measured as everyday Italian (human news uses them more than machine news); "Ecco il link" or "ecco la bozza per il tuo intervento" to a colleague.

### 5. Arguing with no one

**Watch for:** "Sia chiaro:", "Non fraintendetemi", "Non sto dicendo che…", "Qualcuno potrebbe pensare che… ma", "Non si può negare che…" and "È innegabile che…" (`it-non-si-puo-negare`), "non sono 'tempo perso'", "non significa semplicemente…".
**Problem:** the text answers an objection nobody raised. Remove the defence and keep the writer's position.
**Before (opinion piece, written for this guide):**
> Sia chiaro: non sto dicendo che l'ufficio sia inutile. Qualcuno potrebbe pensare che il remoto sia solo comodità, ma non è così. In tre anni il mio team ha dimezzato le riunioni.
**After:**
> Per me l'ufficio serve ancora, e il remoto dà qualcosa in più della comodità. In tre anni il mio team ha dimezzato le riunioni.
**Leave alone:** an objection the text attributes and answers ("I commercianti temono di perdere i parcheggi: il Comune ne ha spostati 40 nella piazza vicina."); a worry real readers have.

## B. Rhythm by rule

### 6. Forced triads

**Watch for:** three adjectives or comparatives ("più sicuri, rapidi e sostenibili", `it-triade-piu`), three audiences ("per chi ama i gatti, l'astrologia e lo stile witchy"), three abstract nouns, three numbered lessons.
**Problem:** the meaning has two parts and the sentence has three because three sounds complete. Keep the items that add a fact.
**Before (Etsy listing, ai-models):**
> Un ritorno agli anni '90 con una scritta semplice e nostalgica: «Estate 1990». Questa t-shirt vintage porta con sé l'atmosfera delle vacanze d'una volta, tra musica, sole e ricordi di infanzia.
**After:**
> T-shirt vintage anni '90 con una scritta semplice: "Estate 1990".
**Leave alone:** three real items ("Ceramica bianca, 330 ml, va in lavastoviglie"); a deliberate rhythm in a speech or a toast.

### 7. Repeated openings

**Watch for:** bullet after bullet starting "Più…", "Meno…"; the same subject sentence after sentence; "Inoltre", "Infine", "Tuttavia" opening three paragraphs of a post that is not a school essay.
**Problem:** repetition decided by rule. Merge, change the subject, or start with the action.
**Before (blog, ai-general):**
> - **Più sicurezza**: corsie protette e separate dal traffico motorizzato riducono i rischi, soprattutto per bambini e anziani.
> - **Meno traffico**: ogni spostamento in bici è un'auto in meno in coda.
> - **Aria più pulita**: meno emissioni, meno rumore, più qualità della vita.
> - **Più salute**: pedalare anche solo 20 minuti al giorno fa bene al cuore e all'umore.
**After:**
> Le corsie sono protette e separate dal traffico motorizzato, e questo riduce i rischi, soprattutto per bambini e anziani. Ogni spostamento in bici è un'auto in meno in coda. L'aria è più pulita, con meno emissioni, meno rumore e una migliore qualità della vita. E pedalare anche solo 20 minuti al giorno fa bene al cuore e all'umore.
**Leave alone:** instructions that each start with a verb ("Abbassate il termostato di notte. Spegnete le luci quando uscite."); "Innanzitutto… Inoltre… Infine…" in a school essay.

### 8. Dashes, colons and punctuation by rule

**In Italian:** the English no-dash rule does not carry over. The lineetta (—) is correct Italian for incisi and dialogue, and human news uses it more than machine news (116 against 49 of 2,000 DeSegMa-IT articles); Claude's Italian prose used none. In product copy replace it with a comma, a full stop or parentheses: small shops almost never use it (1 of 792 pages; `it-lineetta-em-dash`, product only). Elsewhere match the writer; without a sample, put incisi between commas or in parentheses. Leave the spaced en dash that separates parts of a title or subject ("Tazza 330 ml – stampa fronte e retro"), on 8.1% of human product pages.

The Italian model habit that does the English dash's job is the **colon used as a reveal**, a colon before a punchline paragraph after paragraph. A colon before a list, an explanation or a quotation is ordinary. Not measured; *weak alone*.
**Before (LinkedIn, ai-general):**
> **L'autonomia richiede disciplina.** Orari, pause e confini tra vita privata e lavoro non si improvvisano: si costruiscono.
**After:**
> L'autonomia richiede disciplina: orari, pause e confini tra vita privata e lavoro vanno organizzati.
**Leave alone:** dashes in a news piece or essay whose writer uses them; dialogue in fiction; ranges ("taglie S-XL", "9:00–13:00").

### 9. Stacked qualifiers

**Watch for:** "potrebbe eventualmente", "in alcuni casi potrebbe", "in linea di massima", "tendenzialmente", "in una certa misura".
**Problem:** hedge after hedge until nothing is claimed. Keep one hedge when the source supports the doubt. *Weak alone.*
**Before (report, written for this guide):**
> L'iniziativa potrebbe eventualmente contribuire, in alcuni casi, a ridurre in una certa misura i consumi.
**After:**
> In alcuni casi l'iniziativa può ridurre i consumi.
**Leave alone:** "forse", "magari", "di solito" in ordinary prose; safety, legal and medical caveats.

## C. Inflation and borrowed authority

The fact underneath is usually fine. Keep it and remove the dressing.

### 10. AI vocabulary in Italian

**Judgment cues (three or more in one paragraph are worth an edit; one alone flags nothing):** cruciale, imprescindibile, valorizzare, potenziare, arricchire, immergersi, panorama (abstract), viaggio and percorso (figurative), consapevolezza, prezioso, mettere al centro, a misura d'uomo, sinergia, porta con sé (`it-porta-con-se`), senso di comunità (`it-senso-di-comunita`), un passo concreto verso (`it-passo-concreto`), la buona notizia è che (`it-buona-notizia`), un tocco di (`it-un-tocco-di`).
**Problem:** models choose these words for any subject, and they come in groups. Replace the group with what happens. Words measured as ordinary are listed under "Ordinary Italian".
**Before (essay, ai-general):**
> Infine, imparare una lingua da adulti significa anche aprirsi a un altro modo di pensare e di sentire. Ogni lingua porta con sé una visione del mondo, abitudini, umorismo, modi di dire che raccontano una cultura.
**After:**
> Infine, chi impara una lingua da adulto impara anche un altro modo di pensare e di sentire: ogni lingua ha la sua visione del mondo, le sue abitudini, il suo umorismo e i suoi modi di dire.
**Leave alone:** technical uses ("valorizzare un immobile" in a real-estate report, "potenziare la rete" in a telecom one).

### 11. Inflated significance

**Watch for:** "rappresenta un passo importante verso", "una svolta", "segna l'inizio di", "la rivoluzione silenziosa", "è solo l'inizio", "il futuro è già qui"; stock sections "Uno sguardo al futuro", "Sfide e prospettive"; "Non mancano, tuttavia, le criticità" (`it-non-mancano-pero`), "Solleva interrogativi" (`it-solleva-interrogativi`), "rappresenta una sfida / un'opportunità" (`it-occasione-per`).
**Problem:** an ordinary event is said to mark an era. Keep the event; if the text names real plans, end on them.
**Before (blog, ai-general):**
> ## Uno sguardo al futuro
>
> Le nuove piste sono solo l'inizio. Il piano prevede il completamento della rete entro [anno], con ulteriori collegamenti verso i comuni limitrofi. La città che vogliamo è una città dove andare in bici sia la scelta più naturale.
**After:**
> Il piano prevede di completare la rete entro [anno], con altri collegamenti verso i comuni vicini.
**Leave alone:** a turning point the text documents ("Con la delibera del 3 marzo il Comune ha chiuso il centro alle auto").

### 12. Vague attribution and invented authority

**Watch for:** "studi dimostrano che", "secondo gli esperti", "a detta di molti" (`it-a-detta-di-molti`), "è opinione diffusa che", "come spesso accade" (`it-come-spesso-accade`), "come ricorda il vecchio proverbio" before a proverb nobody has heard.
**Problem:** an unnamed authority props up the claim. If the writer has the source, name it. If not, cut the claim, or keep it as the writer's own opinion if they hold it.
**Before (LinkedIn, ai-general):**
> ✅ **Vantaggi per il territorio**: studi dimostrano che chi si muove in bici o a piedi frequenta di più i negozi di prossimità, sostenendo l'economia locale.
**After:**
> (Ask for the study. Without it, cut the line.)
**Leave alone:** a named source ("secondo l'Istat"); "molti clienti ci chiedono" from a shop owner.

### 13. Gerundive riders

**Watch for:** a gerund at the end of a sentence that claims a benefit: "contribuendo a", "rendendolo", "favorendo", "rafforzando", "garantendo", "sostenendo l'economia locale".
**In Italian:** the gerund itself is ordinary ("si spegne premendo il tasto"). The tell is the trailing gerund that claims a consequence. Drop the rider, or give it its own sentence when the source supports it.
**Before (essay, ai-general):**
> Ogni persona che sceglie la bicicletta al posto dell'auto riduce le emissioni di CO₂ e di polveri sottili, contribuendo a migliorare la qualità dell'aria, soprattutto nei centri urbani congestionati.
**After:**
> Ogni persona che sceglie la bicicletta al posto dell'auto riduce le emissioni di CO₂ e di polveri sottili. Questo aiuta a migliorare l'aria, soprattutto nei centri urbani congestionati.
**Leave alone:** gerunds of time, manner and means ("Spedisco in giornata ordinando entro le 12"); a rider whose claim the source states.

### 14. Avoiding "è" and "ha"

**Watch for:** "rappresenta", "costituisce", "si configura come", "si pone come", "funge da", "risulta essere", "vanta", "si propone come", "va a + infinitive".
**Problem:** a longer verb where "è" or "ha" would do.
**Before (Etsy listing, written for this guide):**
> La borsa vanta una capienza di 10 litri e si configura come la compagna ideale per il mercato.
**After:**
> La borsa ha una capienza di 10 litri ed è ideale per il mercato.
**Leave alone:** "rappresentare" with a share ("riscaldamento e raffrescamento rappresentano circa la metà dei consumi") or meaning to depict ("la stampa rappresenta il porto di Genova").

### 15. Synonym cycling

**Watch for:** one thing named four ways in a paragraph: "lavoro da remoto", "smart working", "lavoro a distanza", "il remoto".
**In Italian:** schools teach students to avoid repetition, so this is *weak alone* in essays and articles. It matters in reports, instructions and contracts, where two words may look like two things ("lavoro agile" is the legal term, "smart working" the everyday one). Pick one term.
**Before (report, written for this guide):**
> Il lavoro da remoto è adottato dal 60% dei reparti. Lo smart working riguarda soprattutto l'amministrazione, mentre il lavoro a distanza è meno diffuso in produzione, dove il remoto resta un'eccezione.
**After:**
> Il 60% dei reparti lavora da remoto, soprattutto l'amministrazione. In produzione resta un'eccezione.
**Leave alone:** variation in a narrative or essay.

## D. Sales language and English calques

### 16. Promotional wording

**Watch for:** "un pizzico di magia" (`it-un-pizzico-di`), "un tocco di eleganza" (`it-un-tocco-di`), "trasforma il tuo telefono in…" (`it-trasforma-in`), "non passerà inosservata" (`it-non-passa-inosservato`), "design senza tempo" (`it-senza-tempo`), "piccolo capolavoro" (`it-piccolo-capolavoro`), "piace a grandi e piccini" (`it-grandi-e-piccini`); in news and blogs "una realtà consolidata", "un'esperienza unica".
**Problem:** the copy sells a mood and leaves out the object. Say what the thing is, what it is made of, what it does.
**Before (Etsy listing, ai-models):**
> Funghi rossi, piccole lumache, felci e fiori di campo: questa cover per iPhone è un angolo di bosco incantato da portare sempre con te.
>
> Disegnata in stile cottagecore con colori tenui e dettagli delicati, è perfetta per chi ama la natura, la vita lenta e le atmosfere da fiaba.
**After:**
> Cover per iPhone con funghi rossi, piccole lumache, felci e fiori di campo, disegnati in stile cottagecore con colori tenui e dettagli delicati.
**Leave alone:** a seller's own joke ("il nostro gatto Romeo ha approvato la stampa"); a superlative with a fact ("la più venduta del negozio nel 2023").

### 17. English calques and marketing Italian

| Calque | Entry | What to do |
|---|---|---|
| "Eleva il tuo arredamento / la tua routine" | `it-eleva-il-tuo` (high) | Say what the object is and where it goes. |
| "Di' addio a X e dai il benvenuto a Y" | `it-di-addio-e-benvenuto` (high) | Name Y and its main fact. |
| "Che tu sia un amante dei gatti o…" | `it-che-tu-sia-o` | Start with the object. |
| "Perché la amerai:", "Perché sceglierlo?" | `it-perche-lo-amerai`, `it-perche-sceglierlo` | Drop the label; keep the items that are facts. |
| "Aggiungilo al carrello!", "Ordina ora" | `it-aggiungilo-al-carrello`, `it-ordina-ora` | Cut, or keep one plain note about variants. |
| "Non lasciartelo sfuggire", "fino ad esaurimento scorte" | `it-non-lasciartelo-sfuggire`, `it-scorte-limitate` | Cut unless stock is limited; then give the number. |
| "Lasciati conquistare da…", "Scopri la magia di…", "Esprimi la tua personalità", "la tazza che meriti" | `it-lasciati-conquistare`, `it-scopri-la-magia`, `it-esprimi-la-tua-personalita`, `it-che-meriti` | Cut. |
| "Porta X al livello successivo", "il tuo compagno ideale" | `it-al-livello-successivo`, `it-compagno-ideale` | Say what it holds, does or improves. |
| "Realizzato con cura / con amore" | `it-fatto-con-amore` | Say how: "stampata a mano", "cucita una a una". |
| "giocare un ruolo chiave" | none | "contare", or the actual role. |
| "fare senso" for "avere senso" | none | Write "avere senso", unless it is the writer's own voice. |
| "realizzare" for "rendersi conto", "supportare" for "sostenere" | none | Common in human Italian too. Leave them unless the writer asked for proofreading. |

**Before (Etsy listing, written for this guide):**
> Eleva il tuo arredamento con questa stampa minimalista delle Dolomiti in bianco e nero! Che tu sia un amante del design o un fan della montagna, questo poster porterà il tuo soggiorno al livello successivo.
**After:**
> Stampa minimalista delle Dolomiti in bianco e nero, da appendere in soggiorno.

### 18. Product copy for small sellers

Human Italian shop pages say what the object is, what it is made of, its size, care, variants and shipping, in short sentences or a plain list, in the "tu" form. The two strongest product signs on Claude listings are "per chi ama / per gli amanti dei" (38% of 200 Claude listings, 6 of 792 human shop pages) and "il regalo perfetto / idea regalo" (24% against 9 of 792).

- **Open with the object**, then the rest of the facts.
- **Keep every spec the seller gave, and only those.** If size or material is missing, ask; do not guess from photos.
- **"Perfetto per" and "ideale per" are ordinary** (9.2% and 11.0% of human product pages). "Perfetto per chi ama…" and "per gli amanti dei…" are the tell. One gift line that gives a fact is fine: "Confezione regalo disponibile a 2 euro".
- **A plain "Dettagli:" list is normal.** Remove the bold, the emoji bullets and the "Perché la amerai:" label; keep the items.
- **Titles in sentence case**, keywords first, a "–" or "|" separator if the shop uses one. If the seller wants "idea regalo" in the title for search, keep it once.
- **Slogans in quotes:** model listings put the printed slogan in caporali (23% of Claude listings, about 1% of human shop pages, `it-caporali`, product only). Use the shop's own quotes; default to straight ones.
- **Field labels** such as "Titolo:" and "Descrizione:" inside the description are leftovers (`it-etichette-titolo-descrizione`).

**Before (Etsy listing, ai-models):**
> Una tazza pensata per chi ama i gatti e le letture tranquille. Il gatto arancione che dorme su una pila di libri accompagna la tua colazione o la pausa tè del pomeriggio con un tocco di dolcezza.
>
> […]
>
> Un'idea regalo perfetta per amanti dei gatti, lettori e studenti. Viene spedita con cura in un imballaggio protettivo.
**After:**
> Tazza con un gatto arancione che dorme su una pila di libri, per la colazione o per il tè del pomeriggio.
>
> […]
>
> La spediamo con cura, in un imballaggio protettivo.

## E. Formatting by rule

### 19. Bold labels and Markdown

**Watch for:** `**Oggetto:**` at the top of an email, `**1. Comunicazione**` section labels in an email to colleagues, `- **Flessibilità**: …` on every bullet, `## Caratteristiche principali` in a listing (`it-markdown-grassetto`, `it-markdown-titoletto`, both high).
**Problem:** Markdown from a chat window. Gmail, Outlook and the Etsy editor show the asterisks and hashes as typed, and labelled bullets turn an argument into a form. The rewrite removes every bold lead-in label in running prose ("**La socialità non sparisce.** …", "**Più sicurezza**: …"), in blog posts too, unless the writer asks for them or the text is for a Markdown page that they explicitly want formatted that way. Turn the labels into sentences when they carry nothing of their own.
**Before (report, ai-general):**
> - **Flessibilità**: maggiore autonomia nella gestione del tempo e degli orari.
> - **Risparmio**: minori spese per spostamenti, pasti fuori e abbigliamento formale.
**After:**
> Chi lavora da remoto gestisce tempo e orari con più autonomia e spende meno per spostamenti, pasti fuori e abbigliamento formale.
**Leave alone:** headings a report template requires; a plain list in a long instruction email (a school trip with times, costs and deadlines).

### 20. Headings, Title Case, emoji and hashtags

**Headings.** "## Conclusione" or "## In conclusione" closes 20 of the 96 `ai-general` texts. Remove a closing heading and the summary under it, and a first sentence that only repeats its heading ("## Vantaggi" / "Il lavoro da remoto offre numerosi vantaggi."). Keep headings that help a reader find a section in a long post.
**Title Case.** Italian titles, headings and subjects capitalise the first word and proper names only: "Il nostro club del libro". Days, months and languages are lowercase. If a shop capitalises all its titles for search, keep its style. The checker ignores case.
**Emoji.** Ordinary in human posts; there is no emoji entry. The tell is emoji as structure: 📌, ✅ or 👉 before every point, 1️⃣ 2️⃣ 3️⃣ as numbering, 👇 under the closing question. Keep the writer's own emoji.
**Hashtags.** The tell is a block of six to eight generic tags mixing Italian and English (#SmartWorking #FutureOfWork); 14 of the 96 `ai-general` texts end with five or more. Keep two or three the writer's audience follows.

## F. Leftovers from the chat and the draft

Remove these outright. 45 of the 96 `ai-general` texts contain an offer or a request to the person who asked ("Se vuoi…", "Se mi dai…"), and 35 contain square-bracket placeholders.

### 21. Chat wrappers

**Watch for:** at the top, "Ecco una bozza che puoi adattare:" (`it-ecco-bozza`), "Ecco una descrizione accattivante per…" (`it-chat-ecco-descrizione`), "Certo! Ecco titolo e descrizione…" (`it-chat-certo-ecco`); at the bottom, "Se vuoi, posso adattarlo a un tono più formale" (`it-chat-offerta-tono`), "Se mi dai qualche dettaglio in più, lo personalizzo" (`it-chat-chiede-dettagli`); drafting notes in italics.
**Problem:** the assistant talking to the person who asked. Delete the wrapper and keep the content. A drafting note means content is missing: ask the writer for it.
**Before (email, ai-general):**
> Ecco una bozza che puoi adattare:
>
> **Oggetto:** Il nostro Club del Libro: unisciti a noi! 📚
>
> […]
>
> Se mi dai qualche dettaglio (data, luogo, libro scelto, tono più formale o più scherzoso), la personalizzo subito.
**After:**
> Oggetto: Il nostro club del libro: unisciti a noi
>
> […]
**Leave alone:** "Se vuoi, posso passarti a prendere alle otto", "Certo! Ecco il link della riunione" in a real message.

### 22. Placeholders and invented details

**Watch for:** `[data]`, `[Nome e cognome]`, `[XX km]`, `[inserire orario, es. 9:00 – 13:00]` (`it-segnaposto-parentesi`, high), the note that explains them ("Ho inserito dei segnaposto tra parentesi quadre…", `it-chat-segnaposto-nota`), and details the model invented and then confessed ("*Nota: il personaggio di Marta è illustrativo.*" under a news feature built on Marta's quotes).
**Problem:** the facts were never filled in. Ask for each one; until then leave the brackets visible so nobody sends the text by mistake. An invented person or quote cannot stay in a text presented as fact: delete the disclaimer only together with what it disclaims, and tell the writer.
**Before (email, ai-general):**
> vi informo con piacere che nel nostro quartiere ha aperto una nuova panetteria, [NOME DELLA PANETTERIA], situata in [INDIRIZZO].
**After:**
> vi informo con piacere che nel quartiere ha aperto una nuova panetteria, [NOME DELLA PANETTERIA], in [INDIRIZZO].
>
> (Ask: "Come si chiama la panetteria e in che via è?")
**Leave alone:** editorial brackets in a quotation («[Il sindaco] non ci ha ascoltato»); a template the writer is building for reuse.

### 23. Knowledge limits and method notes

**Watch for:** "Non ho dati verificati…", "al momento in cui scrivo", "In questo articolo vedremo…", "Di seguito trovi…".
**Problem:** the text talks about its own making. Remove it. If it hides a real gap, ask for the facts or state the gap once where the reader needs it.
**Before (report, ai-general):**
> Non so a quale città ti riferisci e non ho dati verificati sulle piste recenti, quindi non posso inventare numeri o tracciati. Qui sotto trovi una bozza con i campi da completare.
**After:**
> (Delete. Ask the writer for the city, the kilometres, the costs and the source documents.)
**Leave alone:** a caveat that changes what the reader does ("I dati di ottobre sono provvisori: l'Istat li rivede a gennaio.").

## G. Writing for the wrong reader

### 24. Re-explaining what the reader already knows

**Watch for:** a reply that recounts the request and the background before the answer in the last line; "Come sai…", "Come ti avevo accennato…" followed by what was said.
**Problem:** the reader already has the context. Lead with the answer; keep the fact they lack and what they need to act. Apply only to a plain reply.
**Before (reply to a colleague who asked to move Monday's meeting, written for this guide):**
> Ciao Giulia, grazie per il messaggio. Come sai, la riunione di lunedì era stata fissata per fare il punto sul nuovo catalogo, che dobbiamo chiudere entro fine mese. Ho verificato il calendario di tutti i partecipanti e ho visto che martedì mattina Paolo è in trasferta, mentre giovedì alle 10 sono tutti liberi. Quindi possiamo spostarla a giovedì alle 10.
**After:**
> Ciao Giulia, grazie. Possiamo spostare la riunione a giovedì alle 10: ho controllato e sono tutti liberi. Martedì mattina no, Paolo è in trasferta.
**Leave alone:** a first message on a topic; a reply where the background is the answer (why the parcel is late).

## Register: tu, Lei, voi

Keep the writer's register. Change it only when the text mixes registers by accident.

- **Tu** is the norm on Etsy Italia, Instagram, most blogs and between many colleagues. A shop that writes "tu" keeps it in every line, care and shipping notes included.
- **Lei** ("Le scrivo", "La ringrazio") is the norm with clients, public offices, a professor, a doctor. A capitalised courtesy pronoun is the writer's habit; keep it either way.
- **Voi** addresses a group: colleagues ("vi scrivo per…"), followers, newsletter readers. As a polite singular in some southern speech, it is the writer's voice.
- **Mixing.** A listing that switches from "tu" to "Lei" ("Scegli il tuo modello. Se Lei cerca un regalo…") is a generator habit (`it-registro-misto`). Keep the register the text uses most.
- **Greetings and sign-offs.** "Care colleghe, cari colleghi," or "Ciao a tutti," followed by a lowercase word; "Cordiali saluti", "Un caro saluto", "Resto a disposizione". Ordinary; leave them. Gender forms ("colleghə", "collegh*") are the writer's choice.

## Punctuation and typography

- **Dashes and colons.** See §8.
- **Quotation marks.** Caporali «…» are standard in news and books (207 of 2,000 human news articles); curly “…” are on 14.5% of human product pages; straight "…" are what most people type. Leave them in prose; in product copy use the shop's habit.
- **Accents.** People often type "perchè", "pò", "qual'è"; models do not. Never add errors, and correct a writer's spelling only when asked.
- **Comma before "e".** Italian puts no comma before "e" in a simple list. "Più sicuri, rapidi, e sostenibili" is an English transfer; remove the comma.
- **Exclamation marks.** "!" is ordinary and "!!" is a human habit (0.9% of human product pages). One closing every paragraph reads as filler.

## Ordinary Italian: leave it alone

Measured on human Italian, or standard usage.

- "Inoltre" at the start of a sentence (3.5% of human product pages). The chain "Innanzitutto… Inoltre… Infine… In conclusione" is how Italian schools teach the tema; "In conclusione" counts only with other signs (`it-in-conclusione`, medium). "In sintesi", "in definitiva" and "per concludere" are not tells.
- "È fondamentale" (1.4% of human news), "un vero e proprio" (1.3% of product pages, 2.4% of web pages), "di alta qualità" (5.2%), "perfetto per" (9.2%), "ideale per" (11.0%), "accattivante" (1.1%), "Tuttavia," and "Insomma," at the start of a sentence, "per ogni occasione", "must-have".
- "Un'occasione per" ("la gita è stata un'occasione per conoscerci"), "più che mai", "Il motivo?", "Il segreto?".
- An opening question in a listing or post (1.4% of human product pages); "Scopri la collezione" as navigation.
- "Fa la differenza" in ordinary use ("un buon coltello fa la differenza in cucina"); only the slogan closer is an entry.
- Regional words and dialect ("Ccà nisciuno è fesso" on a sticker), the writer's typos and accents, and the details only this writer would have: the dog in the product photo, the bakery's real opening hours, an aside in parentheses, mixed feelings ("mi piace, ma non so se lo ricomprerei").

## Worked example 1: product listing

**Before (ai-models, Claude Opus, request "Cover per telefono con disegni di gatti neri e stelle. Scrivimi una descrizione che venda.")**

Title:

> Cover Telefono Gatti Neri e Stelle – Custodia Mistica per Amanti dei Gatti

Description:

> Gatti neri, stelle e un pizzico di magia: questa cover è per chi ama i felini e ha un'anima un po' strega.
>
> L'illustrazione con gatti neri tra lune e stelle dorate trasforma il tuo telefono in un piccolo oggetto incantato. Non passerà inosservata, e ti chiederanno dove l'hai presa.
>
> Perché ti piacerà:
> - Design originale, perfetto per chi ama i gatti, l'astrologia e lo stile witchy
> - Stampa ad alta definizione che non sbiadisce
> - Protezione da urti e graffi quotidiani
> - Sottile e leggera, con accesso a tutti i tasti e porte
> - Compatibile con ricarica wireless
> - Disponibile per iPhone e Samsung
>
> Un regalo perfetto per l'amica gattara della tua vita (o per te stessa). Scegli il tuo modello e aggiungila al carrello prima che i gatti se la prendano!

**Tells marked:**

1. Title Case, an audience formula ("per Amanti dei Gatti") and a mood word ("Mistica") (§18, §20).
2. "un pizzico di magia" (`it-un-pizzico-di`) and "per chi ama i felini" (`it-per-chi-ama`) in a first line with no fact (§16).
3. "trasforma il tuo telefono in…" (`it-trasforma-in`), "Non passerà inosservata" (`it-non-passa-inosservato`), a prediction about strangers (§16).
4. "Perché ti piacerà:", a calque of "Why you'll love it" (§17).
5. A triad of audiences, "per chi ama" again (§6).
6. "Un regalo perfetto" (`it-regalo-perfetto`) and "aggiungila al carrello" (§17).

**After:**

Title:

> Cover per telefono con gatti neri, lune e stelle dorate – iPhone e Samsung

Description:

> Cover illustrata con gatti neri tra lune e stelle dorate.
>
> La stampa è ad alta definizione e non sbiadisce. La cover protegge il telefono da urti e graffi di tutti i giorni, è sottile e leggera e lascia liberi tutti i tasti e le porte. È compatibile con la ricarica wireless.
>
> È disponibile per iPhone e Samsung: scegli il modello del tuo telefono.
>
> Da regalare all'amica gattara, o da tenere per te.

**What changed:**

- The title names the object, the design and the two brands in sentence case and keeps the "–". "Idea regalo" can go back once if the seller wants it for search.
- Every spec is still there, in three sentences. "Design originale" and "witchy" went with the audience triad; "witchy" was the model's word, not the seller's.
- Nothing was added. Ask the seller for the material (TPU, silicone, rigid?) before publishing.
- The "amica gattara" joke stays, without "regalo perfetto".

## Worked example 2: email

**Before (ai-general, Claude Sonnet, request "Scrivi un'email ai colleghi su una giornata di pulizia del parco con i volontari.")**

> **Oggetto:** Giornata di pulizia del parco con i volontari – partecipa anche tu!
>
> Care colleghe, cari colleghi,
>
> vi scrivo per invitarvi a partecipare alla **giornata di pulizia del parco**, che organizzeremo insieme ai volontari della comunità locale.
>
> **Dettagli dell'evento**
> - **Data:** [inserire data]
> - **Orario:** [inserire orario, es. 9:00 – 13:00]
> - **Luogo di ritrovo:** [inserire ingresso/punto di ritrovo del parco]
>
> **Come funzionerà**
> Ci divideremo in piccoli gruppi per occuparci della raccolta dei rifiuti, della pulizia dei sentieri e delle aree picnic, e della sistemazione delle aiuole. Guanti, sacchi e attrezzi saranno forniti dagli organizzatori. Al termine ci sarà un momento conviviale con un piccolo rinfresco.
>
> **Cosa portare**
> - Abbigliamento comodo e scarpe chiuse
> - Cappellino e crema solare (o k-way in caso di pioggia)
> - Una borraccia d'acqua
> - Tanto entusiasmo!
>
> **Perché partecipare**
> Sarà un'occasione per fare qualcosa di concreto per l'ambiente e il quartiere, conoscere i volontari e passare del tempo con i colleghi fuori dal contesto lavorativo. Anche poche ore di aiuto fanno la differenza, e le famiglie sono le benvenute.
>
> **Come iscriversi**
> Vi chiedo di confermare la vostra presenza entro il **[inserire data limite]** rispondendo a questa email, indicando eventuali accompagnatori, in modo da organizzare al meglio materiali e rinfresco.
>
> Grazie in anticipo per la disponibilità: più saremo, più sarà bello e utile!
>
> Un caro saluto,
>
> [Il tuo nome]
> [Ruolo / Reparto]
>
> ---
>
> Se vuoi, posso adattare il tono (più formale o più informale), aggiungere i dettagli concreti dell'evento o accorciare il testo.

**Tells marked:**

1. `**Oggetto:**` and bold section labels (§19, `it-markdown-grassetto`).
2. Placeholders (§22, `it-segnaposto-parentesi`).
3. "Tanto entusiasmo!" in the packing list (§2).
4. "Anche poche ore di aiuto fanno la differenza" closing a section (§2).
5. "più saremo, più sarà bello e utile!" as a closing slogan (§2).
6. The chat offer at the end (§21, `it-chat-offerta-tono`).
7. Left alone: the greeting, the "voi" register, "vi scrivo per", "Sarà un'occasione per", "Un caro saluto".

**After:**

> Oggetto: Giornata di pulizia del parco con i volontari, [data]
>
> Care colleghe, cari colleghi,
>
> vi scrivo per invitarvi alla giornata di pulizia del parco che organizziamo insieme ai volontari della zona. Ci troviamo il [data] alle [orario] a [punto di ritrovo nel parco].
>
> Lavoreremo in piccoli gruppi: raccolta dei rifiuti, pulizia dei sentieri e delle aree picnic, sistemazione delle aiuole. Guanti, sacchi e attrezzi li forniscono gli organizzatori, e alla fine ci fermiamo per un piccolo rinfresco.
>
> Portate vestiti comodi, scarpe chiuse, una borraccia, cappellino e crema solare, o un k-way se piove.
>
> Sarà un'occasione per fare qualcosa di concreto per l'ambiente e per il quartiere, conoscere i volontari e passare del tempo tra colleghi fuori dall'ufficio. Va bene anche venire solo per qualche ora, e le famiglie sono benvenute.
>
> Se partecipate, rispondete a questa email entro il [data limite] e ditemi se portate qualcuno, così possiamo organizzare materiali e rinfresco.
>
> Grazie in anticipo per la disponibilità.
>
> Un caro saluto,
> [Il tuo nome]
> [Ruolo / Reparto]

**What changed:**

- The labels are gone; their content is in five short paragraphs. The date placeholder also goes in the subject.
- Every fact is still there. "Anche poche ore di aiuto fanno la differenza" became the practical point under it: coming for a few hours is fine.
- The placeholders stay; ask the writer for date, time, meeting point, deadline and signature. The sample time "9:00 – 13:00" was the model's guess, so it went. On this draft the checker reports only `it-segnaposto-parentesi`, at most one hit per sentence (not one per slot), until the real details are in.
- Register, greeting and sign-off are unchanged.
