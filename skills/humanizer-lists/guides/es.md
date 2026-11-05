# Spanish rewriting guide

Spanish patterns for the workflow in `SKILL.md`, for any genre, from Spain and Latin America. The checker catches leftovers well and wording poorly, so a text that passes can still read like a chatbot. The counts below were measured in the humanizer-lists repository.

Three things differ from English:

1. **Some English tells are ordinary Spanish:** the raya (—) for an aside, "No solo… sino también" (70 of 2,000 human web pages), sentence-initial "Además,", "Cabe destacar" in news (S5).
2. **Spanish model prose barely uses the raya.** Three of 236 development texts from Claude Sonnet and Haiku contain one. The colon does the dash's job: "no solo es una comodidad: es un punto de encuentro".
3. **Most of the signal is structure:** Markdown, bold labels, chat wrappers, placeholders. After those, what remains is staging, triads, inflation and English calques.

Patterns §1 to §5 justify an edit on one clear sighting; a pattern marked *weak alone* needs other tells nearby.

## How to work in Spanish

Follow the steps in `SKILL.md`. Spanish notes:

- **Leftovers first.** Delete chat wrappers, the `---` line before an assistant's offer, Markdown asterisks and "Palabras clave:" lines in a listing (§24, §25).
- **Fact list.** For a listing, list every material, size, capacity, finish, care step and use before drafting, mark the specs the seller never gave (S6.2), and check the draft against the list.
- **Second pass.** The tells that survive a first rewrite most often: §1 contrasts (including the colon form), §2 closers, §6 triads, §19 bold labels, S1 calques.
- **Register and region.** Keep tú, vos, vosotros, usted or ustedes (S4) and regional words: remera or camiseta, celular or móvil, talle or talla, lavandina or lejía, "Saludos" or "Un saludo".
- **Voice details stay:** odd specific details, diminutives ("un cafecito", "ahorita"), slang ("con mucha onda", "copado", "guay"), mixed feelings, in-jokes, asides.
- **Return.** As in `SKILL.md`, plus a list of what you need from the writer: empty placeholders, unconfirmed specs, a register choice you made.

## A. Staging instead of stating

### 1. No es X, es Y

**Watch for:** "No es (solo) X: es Y"; "No es una moda. Es una decisión."; "No se trata solo de X, sino de Y"; "es mucho más que"; a clipped tail ("…, sin complicaciones").
**Problem:** The negative half denies something nobody claimed, so the positive half sounds bigger. State the point. Keep the contrast when the negative half corrects a belief the reader holds, or when both halves carry a claim.
**Spanish note:** One "no solo… sino también" in a long text is not a tell; three in a short post are. The two-sentence reveal fired on no human text in the development sets.
**Before (LinkedIn):**
> El teletrabajo no es una moda. Es una decisión de cómo queremos trabajar.
>
> Después de años trabajando en remoto, híbrido y presencial, tengo clara una cosa: el lugar importa mucho menos que la forma en que nos organizamos.
**After:**
> Después de años trabajando en remoto, en híbrido y en la oficina, tengo claro que el lugar importa mucho menos que la forma en que nos organizamos.
**Leave alone:**
> El deporte no solo mejora la salud, sino que también nos enseña a trabajar en equipo. (both halves are claims)
>
> …una evaluación basada en resultados, no en la mera presencia. (the negative half names a real practice)

### 2. One-line closers and dramatic fragments

**Watch for:** a last paragraph that restates the text ("Al final, X es mucho más que Y: es Z."); "Y eso lo cambia todo."; a moral after a scene; a mirrored pair ("Si lees solo, tienes una perspectiva. Si lees en comunidad, tienes muchas."); a borrowed proverb as the last line; a row of fragments ("Aunque sea mal. Sobre todo si es mal.").
**Problem:** The line asks the reader to pause instead of adding anything. Cut a closer that repeats or explains a scene. Keep a last line that adds a fact or a next step.
**Before (essay):**
> …y los trabajadores se llevan el desayuno camino al metro. Un local vacío se ha transformado en punto de encuentro.
>
> Al final, abrir una panadería es mucho más que abrir un negocio: es encender un horno en el centro de la comunidad. Y alrededor de ese calor, como siempre ha ocurrido con el pan, la gente se reúne.
**After:**
> …y los trabajadores se llevan el desayuno camino al metro. Lo que era un local vacío es ahora un punto de encuentro.

### 3. Sayings that sound deep

**Watch for:** "El reto de nuestra época es…"; "la verdadera pregunta es…"; "más que una cuestión de X, es una cuestión de Y"; slogans as conclusions; the verdict "no es ni una panacea ni una amenaza" with "Bien gestionado…, mal gestionado…".
**Problem:** An ordinary point dressed as a hidden truth. State the specific claim, usually one the text already made.
**Before (essay):**
> En conclusión, el teletrabajo no es ni una solución perfecta ni una amenaza. Es una herramienta cuyo valor depende de cómo se organice. Bien gestionado, puede mejorar la productividad y la calidad de vida; mal gestionado, puede generar soledad y sobrecarga. El reto de nuestra época es construir un modelo que ponga a las personas en el centro.
**After:**
> El teletrabajo puede mejorar la productividad y la calidad de vida, o traer soledad y sobrecarga. Depende de cómo se organice: del derecho a la desconexión, de los medios que ponga la empresa y de una evaluación por resultados.

(The three conditions come from the essay's previous paragraph.)

**Leave alone:**
> Ya lo decía mi abuela: a quien madruga, Dios le ayuda. (a proverb the writer chose and attributes)

### 4. Staged run-up before the point

**Watch for:** "Seamos honestos:"; "Spoiler:"; "Lo que nadie te cuenta"; "Hablemos de…"; "La buena noticia es que…"; a question asked only to answer it; "¿Buscas el regalo perfecto?" opening a listing.
**Problem:** The writer announces the point instead of making it. Remove the whole run-up.
**Before (blog):**
> Hace unos años, trabajar desde casa era una excepción. Hoy es una realidad para millones de personas. Pero, ¿es realmente la mejor opción? La respuesta depende de cada persona, de su trabajo y de cómo se organice.
**After:**
> Hace unos años, trabajar desde casa era una excepción; hoy es una realidad para millones de personas. Que sea la mejor opción depende de cada persona, de su trabajo y de cómo se organice.
**Leave alone:**
> ¿Sabías que el museo abre gratis los domingos? (3 of 2,000 human web pages and 12 human AuTexTification texts open this way)

### 5. Arguing with no one

**Watch for:** "El teletrabajo no es perfecto."; "Esto no significa que…"; "Ojo, no digo que…"; "Hay quien pensará que…".
**Problem:** The text answers an objection nobody raised. Remove the defense and state any claim it holds. Keep an attributed objection or a reassurance that answers a real worry.
**Before (LinkedIn):**
> Lo que más me ha sorprendido es que no se trata de leer más rápido ni de "cumplir" con una lista. Se trata de hacer una pausa, pensar y compartir. Algunas de las mejores conversaciones que he tenido últimamente han surgido de una sola frase subrayada en un libro.
**After:**
> Lo que más me ha sorprendido es que se trata de hacer una pausa, pensar y compartir: algunas de las mejores conversaciones que he tenido últimamente han surgido de una sola frase subrayada en un libro.
**Leave alone:**
> No hace falta ser un gran lector ni tener mucho tiempo. (answers a real worry)

## B. Rhythm by rule

### 6. Forced triads

**Watch for:** three adjectives before a colon; three manner words ("de forma cómoda, coordinada y eficiente"); three uses in a listing; three parallel bullets followed by a lesson.
**Problem:** Threes to sound complete. Keep the items that add a distinct idea; keep three when there are three.
**Before (Etsy listing, Argentina):**
> Sutil, elegante y con mucha onda: esta remera negra tiene una ilustración minimalista en line art de una mano sosteniendo la luna. Un diseño para los que prefieren decir mucho con poco.
**After:**
> Remera negra con mucha onda: una ilustración minimalista en line art de una mano que sostiene la luna.
**Leave alone:**
> Talles S, M y L.

### 7. Repeated openings and connector ladders

**Watch for:** paragraphs that open "Por un lado… / Por otro lado… / Además… / Por último…" in order; bullets that all start with a verb in the same person; a subject pronoun in every sentence ("Ella abrió la puerta. Ella miró…"), which sounds translated in Spanish.
**Problem:** Sequence by rule instead of by ear. Merge sentences, drop the pronoun, let the order of ideas link them. Do not ban the connectors. *Weak alone.*
**Before (LinkedIn):**
> ✅ Descubrimos libros que probablemente no habríamos elegido solos
> ✅ Debatimos desde perspectivas distintas, y siempre salimos con algo nuevo
> ✅ Aplicamos lo aprendido a nuestro trabajo y a nuestro día a día
> ✅ Creamos vínculos más allá de los proyectos y las reuniones
**After:**
> Leemos libros que probablemente no habríamos elegido solos y los debatimos desde perspectivas distintas. Siempre salimos con algo nuevo, que luego aplicamos al trabajo y al día a día, y hemos creado vínculos que van más allá de los proyectos y las reuniones.
**Leave alone:**
> Llegué, vi, vencí. (repetition on purpose)

### 8. The raya and the colon

**Rule:** The raya is the correct mark for an aside and for dialogue. Keep every raya the writer uses, add none, and match a sample if there is one.
**Watch for:**
- The colon as the universal hinge: "no solo es una comodidad: es…", "Y lo mejor: …", "Spoiler: …". Several per paragraph is the tell. *Weak alone.*
- English typography for the raya: spaced " — ", or a hyphen or en dash doing its job. The raya touches the aside on both sides: "en categorías —plástico, vidrio y metal— para…". The RAE never drops the closing raya of an aside, even before a full stop: "Esperaba a Emilio —un gran amigo—." It is left out only when a narrator's comment ends a line of dialogue: "—¿Vienes mañana? —preguntó Lucía."
- An en dash or hyphen in ranges (19–21 °C, 15-20 minutos) is fine.
**Before (LinkedIn):**
> ¿Sabías que cambiar unos pocos hábitos cotidianos puede reducir tu factura de luz hasta un 20-30%? Y lo mejor: no requiere grandes inversiones.
**After:**
> ¿Sabías que cambiar unos pocos hábitos cotidianos puede reducir tu factura de luz hasta un 20-30%? Y no hace falta una gran inversión.
**Before (article, English spacing; written for this guide):**
> Los materiales se separaron in situ en categorías — plástico, vidrio, metal, papel y residuos no reciclables — para facilitar su tratamiento.
**After:**
> Los materiales se separaron in situ en categorías —plástico, vidrio, metal, papel y residuos no reciclables— para facilitar su tratamiento.
**Leave alone:**
> El pueblo —unos trescientos vecinos en invierno— se llena en agosto.

### 9. Stacked qualifiers

**Watch for:** "podría llegar a", "en cierta medida", "potencialmente", "posiblemente podría", "de alguna manera", "hasta cierto punto", two or three on one claim.
**Problem:** Every claim ends up uncertain. Keep one qualifier when the source supports it. "Quizá", "a lo mejor", "suele" and "por lo general" are human habits. *Weak alone.*
**Before (report):**
> Esta medida podría llegar a suponer, en cierta medida, una posible mejora de la productividad en muchos casos.
**After:**
> En muchos casos, la medida puede mejorar la productividad.

### 10. Hyphenated pairs

English only. Spanish attaches prefixes ("exalumno", "antiestrés") and hyphenates paired adjectives ("teórico-práctico", "relación calidad-precio"). Leave them.

### 11. Periphrastic passives

**Watch for:** strings of "ser + participio" ("fue realizada por", "fueron explicadas por") where Spanish would use the active or the "se" form.
**Problem:** Correct but rarer than in English, so a run reads translated. Use the active when the actor is known, "se" when not. *Weak alone.*
**Before (report):**
> Las normas de comportamiento fueron explicadas por un guía del museo y la visita fue organizada en tres partes.
**After:**
> Un guía del museo explicó las normas de comportamiento, y la visita se organizó en tres partes.
**Leave alone:**
> El acusado fue condenado a dos años. (news and legal register)

## C. Inflation and borrowed authority

### 12. AI vocabulary in clusters

**Watch for:** the cue words in S2, four or five in one paragraph, attached to claims that say nothing specific.
**Problem:** Each word is ordinary alone; the tell is density. Replace the cluster with what happens.
**Before (report):**
> Con motivación, método y práctica regular, aprender un idioma de adulto es una experiencia enriquecedora y totalmente alcanzable.
**After:**
> Un adulto con motivación, método y práctica regular puede aprender un idioma.

### 13. Inflated significance

**Watch for:** "ha dejado de ser X para convertirse en Y"; "una de las transformaciones más profundas de…"; "marca un antes y un después"; "sienta las bases"; "desempeña un papel crucial"; "Retos y perspectivas de futuro"; send-offs ("El futuro se presenta prometedor").
**Problem:** An ordinary detail is said to mark a change. Keep the fact, drop the significance.
**Before (article):**
> Lo que empezó como una medida de emergencia se ha convertido en una de las transformaciones más profundas del mundo laboral contemporáneo. Hace apenas unos años, trabajar desde casa era una excepción reservada a unos pocos perfiles. Hoy es una opción habitual en miles de empresas.
**After:**
> Hace apenas unos años, trabajar desde casa era una excepción reservada a unos pocos perfiles. Empezó como una medida de emergencia y hoy es una opción habitual en miles de empresas.

### 14. Vague attribution and vague links

**Watch for:** "los expertos", "diversos estudios demuestran", "cada vez hay más pruebas de que"; links that never say how: "vinculado a", "de la mano de".
**Problem:** An unnamed authority props up a claim. Name the source if the writer has it; otherwise state the claim plainly, or ask. Never invent a study, figure or institution.
**Before (article):**
> …cada vez hay más pruebas de que los adultos no solo pueden aprender una lengua extranjera, sino que en muchos aspectos lo hacen mejor que los niños.
**After:**
> Los adultos pueden aprender una lengua extranjera, y en muchos aspectos lo hacen mejor que los niños. (Ask the writer for the research.)
**Leave alone:** "Según el último informe del INE, el paro bajó un 0,4 %."

### 15. Gerund riders

**Watch for:** a gerund clause tacked on after a comma: "…, fomentando…", "…, permitiéndote…", "…, convirtiéndolo en…".
**Problem:** The gerund bolts a benefit onto a plain fact. The RAE also rejects the gerund of posteriority ("Huyó, siendo detenido horas después") and the gerund as adjective ("caja conteniendo libros"). Keep a supported rider as its own clause.
**Spanish note:** 30 of 2,000 human web pages have a trailing gerund, so in general prose it is *weak alone*. In product copy (`es-gerund-rider`) models use it far more than sellers.
**Before (Etsy listing):**
> La lámina se imprime en papel mate de 250 g, aportando un acabado elegante y convirtiéndola en el regalo ideal.
**After:**
> La lámina va impresa en papel mate de 250 g.
**Leave alone:**
> Se lava a mano, aclarando con agua tibia. (a modal gerund in instructions)

### 16. Avoiding es, tiene and hay

**Watch for:** "se erige como", "se posiciona como", "constituye", "presenta", "luce", "cuenta con una amplia gama de" where the thing simply is or has something.
**Problem:** Grand verbs for plain ones. Use "es", "tiene" and "hay".
**Before (blog):**
> La biblioteca se erige como un espacio de encuentro y cuenta con una amplia gama de actividades para todas las edades.
**After:**
> La biblioteca es un lugar de encuentro y tiene actividades para todas las edades.
**Leave alone:**
> El hotel cuenta con piscina y aparcamiento. (plain Spanish)

### 17. Synonym cycling

**Watch for:** one thing named four ways in a few lines: "la taza… esta pieza… este accesorio… esta joya de cerámica".
**Problem:** The reader wonders whether the text means one thing or several. Schools teach Spanish writers to avoid repetition, so it is *weak alone*. In technical and legal text keep one term ("teletrabajo" and "trabajo a distancia" differ in Spain's Ley 10/2021).
**Before (Etsy listing):**
> Esta taza tiene un gato dormido dibujado a mano. Esta pieza única es ideal para tus desayunos, y este accesorio encantador alegrará tu cocina.
**After:**
> Taza con un gato dormido dibujado a mano, una pieza única para tus desayunos.

### 18. Sales language

**Watch for:** "Transforma tu espacio", "Descubre…" as the opener, "el regalo perfecto", "la compañera ideal", "momentos inolvidables", "añade un toque de…", "calidad excepcional", "combina estilo y comodidad", "antes de que se agoten"; for places: "enclavado en", "en el corazón de", "un paraíso".
**Problem:** An advertisement for no shop in particular. Say what the thing is, what it is made of, its size and its use.
**Before (Etsy listing, Spain):**
> Añade calidez y estilo a tu salón con esta manta de punto color crema de 130 x 170 cm. Su tejido suave y mullido la convierte en la compañera ideal para las tardes de sofá, peli y chocolate caliente.
**After:**
> Manta de punto color crema para el salón, de 130 x 170 cm. El tejido es suave y mullido, para tardes de sofá, peli y chocolate caliente.
**Leave alone:**
> Unos pendientes espectaculares, de verdad. (on 4 human listings and no generated one)
>
> Edición limitada: 30 unidades numeradas. (usually a real fact)

## D. Formatting by rule

### 19. Bold labels and bold everywhere

**Watch for:** a bold lead-in label on each paragraph; "- **Material:** cerámica"; "**Asunto:**" in an email; asterisks that will show literally on Etsy, WhatsApp or a plain email.
**Problem:** Every item gets a label, so nothing stands out. Remove bold lead-in labels from running prose unless the writer asks for them or wants a Markdown page. Keep a plain spec list, without bold, when the reader will scan it.
**Before (blog):**
> **Tiempo y dinero.** Eliminar el trayecto diario al trabajo devuelve horas a la semana, además de ahorrar en transporte, comidas fuera y gastos asociados.
>
> **Flexibilidad.** Poder organizar la jornada según nuestros picos de energía y necesidades personales mejora la concentración y la satisfacción.
**After:**
> Sin el trayecto diario al trabajo recuperamos horas cada semana y ahorramos en transporte, comidas fuera y otros gastos. Además, podemos organizar la jornada según nuestros picos de energía y nuestras necesidades, y eso mejora la concentración y la satisfacción.

### 20. Headings in the wrong place

**Watch for:** Markdown headings in an email, post or listing; numbered bold headings in a short email; headings for effect ("¿Por qué te encantará?"); a stack of all-caps sections in a listing (DESCRIPCIÓN, CARACTERÍSTICAS, IDEAL PARA).
**Problem:** The format of a chatbot answer. An email is paragraphs; a listing can have one plain spec list and care instructions. A report the reader asked for in sections keeps them.
**Before (email, Spain):**
> **1. Disponibilidad y horarios**
> - Mantengamos el horario habitual acordado, o avisemos con antelación si hay cambios.
> - Indicad en el calendario o en el estado del chat cuándo estáis disponibles, en una reunión o desconectados.
**After:**
> Mantengamos el horario habitual y avisemos con antelación si hay cambios. Poned en el calendario o en el estado del chat cuándo estáis disponibles, reunidos o desconectados.

### 21. Emoji, ✨ and hashtags

**Watch for:** ✨ (`es-sparkles`: 44 machine texts, 2 human); emoji bullets (🔹 ✅ 👉); emoji in an email subject; a block of generic hashtags.
**Problem:** Decoration on every item. Keep an emoji a person would type there; cut hashtags to the two or three someone would search.
**Before (LinkedIn):**
> 🔹 **La confianza se vuelve imprescindible.** Se mide el impacto y los resultados, no las horas frente a una pantalla.
>
> #Teletrabajo #TrabajoRemoto #FuturoDelTrabajo #Liderazgo #RecursosHumanos #Productividad #CulturaOrganizacional
**After:**
> La confianza se vuelve imprescindible: se miden el impacto y los resultados, no las horas frente a una pantalla.
>
> #Teletrabajo #TrabajoRemoto

### 22. English Title Case and capitals

**Watch for:** Title Case; capitals on days, months, languages and nationalities ("el Lunes", "clases de Inglés", "los Argentinos"); a zodiac sign used for a person ("soy Sagitario" for "soy sagitario").
**Problem:** Spanish capitalizes only the first word of a title and its proper nouns.
**Before (Etsy title):**
> Taza De Cerámica Con Gato Dormido | Regalo Para Amantes De Los Gatos
**After:**
> Taza de cerámica con gato dormido | Regalo para amantes de los gatos
**Leave alone:** Navidad, el Ayuntamiento de Valencia, el signo Sagitario, a deliberate REBAJAS.

### 23. Quotation marks

**Watch for:** two or three styles mixed in one text («…», "…", “…”); a full stop inside the closing quote.
**Problem:** The RAE recommends «» first; "" and “” are normal online and in Latin America. Follow the writer's main style and put the full stop after the closing quote. *Weak alone.*
**Before:**
> La frase «Menos pantallas, más café" va en tipografía manuscrita, y la otra dice “Primero el café.”
**After:**
> La frase «Menos pantallas, más café» va en tipografía manuscrita, y la otra dice «Primero el café».

## E. Leftovers from the chat and the draft

### 24. Chat wrappers

**Watch for:** "Aquí tienes una propuesta de…", "¡Claro! Te propongo…"; after a `---` line: "¿Quieres que lo adapte a un tono más formal…?", "Espero que este texto te sea útil".
**Problem:** The assistant talking to the person who asked (`es-chat-*`, high). Delete the wrapper and the separator; keep the content.
**Before (blog):**
> Aquí tienes un borrador. No conozco los detalles de tu club, así que he dejado entre corchetes los datos que puedes cambiar:
>
> ---
>
> ## Un jueves más en el club de lectura
> …
>
> ---
>
> Si me cuentas más detalles (cómo se llama el club, qué libro leísteis, cómo es el ambiente de las reuniones, qué tono prefieres), puedo reescribirlo para que suene más a vuestro club.
**After:**
> Un jueves más en el club de lectura
> …
**Leave alone:** "Si quieres, puedo hacer la reserva para el sábado." (an offer about a booking)

### 25. Placeholders and SEO labels

**Watch for:** `[Tu nombre]`, `[fecha]`, instructions in brackets; "Palabras clave:", "Título SEO:", "Etiquetas:" lines in the body.
**Problem:** An unfinished draft. Never fill a placeholder with an invented detail; leave it and list it in your reply. Keyword lines go to the tags field.
**Before (blog):**
> Lo que más agradezco no es solo la rapidez, sino la tranquilidad: [añade una anécdota concreta, por ejemplo, ver a familias con niños pedaleando o a personas mayores con bicis eléctricas].
**After:**
> Lo que más agradezco, además de la rapidez, es la tranquilidad: [anécdota].
>
> (In the reply: "Necesito una escena concreta que hayas visto en el carril bici para completar esta frase.")
**Leave alone:**
> Palabras clave: migración, empleo, políticas públicas. (the last line of an academic abstract)

### 26. Knowledge limits and guesses

**Watch for:** "No conozco los detalles de tu…", "según la información disponible", "probablemente se fundó en…".
**Problem:** The model admits a gap and fills it with a guess. Cut the guess and ask the writer.
**Before (article):**
> Aunque no hay datos públicos sobre la fecha exacta de su fundación, probablemente el club empezó a reunirse a principios de los 2000.
**After:**
> (Cut, and ask the writer when the club started.)

### 27. Writing about the document

**Watch for:** "En este artículo te contamos…", "A continuación, te presento…", "En las siguientes líneas veremos…"; a first paragraph that repeats the heading.
**Problem:** The text describes itself. Start with the subject. Human SEO blogs use "En este artículo…" too, so one line is *weak alone*.
**Before (blog):**
> En este artículo te contamos todo lo que necesitas saber sobre cómo ahorrar energía en casa. A continuación, encontrarás los mejores consejos.
**After:**
> (Cut both sentences and open with the first tip.)

## F. Writing for the wrong reader

### 28. Re-explaining what the reader knows

**Watch for:** a reply that restates the problem and the evidence before the decision. Act only when the text plainly is a reply.
**Problem:** The reader has the context, so rebuilding it buries the point. Lead with the decision; the diagnosis and the proof go in the ticket that follows.
**Before (email reply, Spain):**
> Sí, tienes razón, el retraso de los pedidos de Valencia no es culpa del almacén. El problema está en la integración con la mensajería: cuando el cliente cambia la dirección después de pagar, el sistema no actualiza la etiqueta. Lo he comprobado en los últimos 40 pedidos y solo 3 tienen la dirección mal, así que el arreglo es pequeño.
>
> Como la integración la usan todas las tiendas, prefiero abrir una incidencia aparte en lugar de tocarla en este cambio. Mientras tanto, podemos mantener el aviso manual.
**After:**
> Sí, el retraso de Valencia no es cosa del almacén. Como la integración con la mensajería la usan todas las tiendas, prefiero no tocarla en este cambio: abro una incidencia aparte y mientras tanto mantenemos el aviso manual.

(The address bug and the 40-order check go in the incidencia.)

## Spanish-specific sections

### S1. English calques

Grammatical, or close, but rare in native writing. An id in brackets is a measured entry in `references/es.md`.

| Calque | Write instead | Leave alone |
|---|---|---|
| hacer una (gran) diferencia (`es-marca-la-diferencia`) | marcar la diferencia, notarse, or the concrete effect | "la diferencia de precio es de dos euros" |
| sumérgete en un universo de… (`es-sumergete-en`) | say what the thing is | "sumergirte en las aguas de Cabo de Palos" |
| eleva tu ritual (`es-eleva-tu`) | say what changes | "elevar la mesa 10 cm" |
| lleva tu X al siguiente nivel (`es-al-siguiente-nivel`) | name the improvement | "pasa al siguiente nivel del juego" |
| en un mundo cada vez más… (`es-en-un-mundo-donde`) | cut, or "hoy" | "envíos a todo el mundo" |
| desbloquea tu potencial, desata tu lado… (`es-desata-tu`) | cut |  |
| el amante del café en tu vida (`es-amante-en-tu-vida`) | a quien le guste el café |  |
| dale la bienvenida a… (`es-dale-la-bienvenida`) | cut, or "llega…" | a welcome to a person |
| ya sea que… (`es-ya-sea-que`) | tanto si… como si… | "ya sea en verano o en invierno" |
| pieza de conversación (`es-pieza-de-conversacion`) | da que hablar |  |
| características clave (`es-caracteristicas-clave`) | características |  |
| a donde vayas (`es-a-donde-vayas`) | name the places | "a donde vayas, lleva el DNI" |
| siéntete libre de… | si quieres, puedes… |  |
| tomar ventaja de | aprovechar | sports: "tomar ventaja en el marcador" |
| eventualmente ("in the end") | al final, con el tiempo | "eventualmente" meaning "possibly" |
| hacer sentido | tener sentido | informal Mexican and Chilean speech |
| aplicar a un trabajo | solicitar (Spain), postularse | common in Latin America; keep it there |
| Honestamente, … as an opener | la verdad, … or cut |  |
| "rojo, verde, y azul" | "rojo, verde y azul" | a comma that closes an aside |

If any other phrase only makes sense translated back into English, rewrite it.

### S2. AI vocabulary as judgment cues

No Spanish word is a tell by itself; the measured lists hold very few single words (`es-vibrante`, and only next to a second sign).

**Cues when they cluster (§12):** crucial, fundamental, esencial, clave (adjective), enriquecedor, significativo, transformador, vibrante, potenciar, fomentar, impulsar, garantizar, optimizar, aportar valor, sinergia, ecosistema (figurative), "una amplia gama de", "un sinfín de", "en constante evolución", "sin lugar a dudas". Three or more in a paragraph, attached to nothing specific, is a reason to rewrite it.

**Not cues:**
- "Cabe destacar" (12 of 2,000 human web pages, normal in Latin American news) and "En resumen" (10 of 2,000): their entries run on product copy only. "En definitiva": 13 web pages, 6 generated texts.
- "Sin duda", "más allá de", "a la perfección", "tu día a día", "atemporal": too common in human text to be a sign.
- "Es importante destacar", "juega un papel fundamental": not a Claude habit in these data. "No dudes en…": common in human emails.

### S3. Punctuation norms

- **¿ and ¡.** Fast chat and captions often drop the opening mark; keep the writer's habit. In formal text, add a missing one.
- **The raya** stays attached to the words it encloses, closing raya before any comma or full stop (§8).
- **The colon** is normal after a letter's greeting ("Hola, Andrés:"); a comma there ("Hola a todos,") is common in emails too.
- **Numbers.** Spain and most of South America write 1.250,50; Mexico, Central America and the Caribbean 1,250.50. The RAE writes "80 %"; "80%" is common. Keep the writer's form.
- **Exclamations.** One "¡…!" in a friendly post is normal; one on every line ("¡Elegí tu talle!", "¡Haz tu pedido!") is a shop template.

### S4. Register: tú, usted, vos, vosotros, ustedes

Keep the writer's register. If the text mixes registers, move it to the one the text uses most and say so.

- **Spain:** tú and vosotros for colleagues, friends and most shops; usted for formal letters. **Latin America:** ustedes is the plural of both tú and usted; never turn it into vosotros.
- **Voseo (Río de la Plata, Central America):** "querés", "tenés", "elegí", "llevate", "escribinos". A model imitating Argentine Spanish often slips back to tuteo ("Si querés un regalo distinto… Si tienes dudas, escríbenos"); fix the slip toward voseo (`es-mix-voseo-tu`). "Llevala" (llevá + la) is the correct voseo spelling, without an accent; "llévala" is the tú form.
- **Group emails:** singular "responde" next to "pueden proponer" reads stitched together; use the plural. A generic tú in a general statement is fine.
- **Shops:** one choice of tú or usted throughout.
- **Inclusive forms** ("bienvenido/a", "todos y todas", "todes"): keep the writer's choice; do not add or remove them.

### S5. Ordinary Spanish to leave alone

None of these is a reason to rewrite by itself; the pattern "Leave alone" lines and S2 add more.

- The raya for asides; "No solo… sino (también)" in general prose; "No significa que…, sino que…".
- Sincere set phrases such as "No es solo un club, es un sentimiento", and "Palabras clave:" closing an academic abstract. The checker gives each one medium hit, which flags nothing.
- "Título:" and "Descripción:" as plain field labels.
- "¡Claro!", "Espero que estés bien", "Quería compartir con vosotros…", "Quedo atento/atenta".
- "La clave está en…", "marcar la diferencia", "No es más que una mera…".
- An opening question in a post; sentence-initial "Además," (35 of 458 human listings) and "Asimismo".
- A trailing gerund in instructions; "Cuéntamelo en los comentarios 👇" on a real post; "No esperes más: el curso empieza el lunes" (a real deadline).

### S6. Product copy for small sellers

A chatbot listing opens with a mood sentence, pads specs with "de alta calidad", adds an "Ideal para" list and ends with "Palabras clave:". Make it sound like the seller describing the thing on the table.

1. **Lead with the object:** what it is, what is on it, material, size.
2. **Keep every spec; check the ones nobody gave.** In the development set, a request with "325 ml, apta para lavavajillas" came back "apta para lavavajillas y microondas"; one with no size came back "330 ml" and "asa ergonómica". List every spec not in the seller's notes and ask before publishing. Never add one: a wrong "apto para microondas" leads to a refund.
3. **Cut the frame, keep the use.** An "Ideal como regalo de cumpleaños, Navidad… o simplemente para darte un capricho" list becomes one line: "Para regalar o para ti". A specific use the seller gave stays ("para el mate de la mañana").
4. **Titles follow the platform.** Etsy titles of keyword phrases split by commas or " | " are the convention. Fix Title Case and calques; keep the terms and their order.
5. **Move "Palabras clave:", "Etiquetas:" and "Título SEO:" lines** out of the description and into the tags field.
6. **Use the shop's words:** remera, playera, polera or camiseta; funda or carcasa; taza or tazón; talle or talla; lámina or print.
7. **Plain care instructions:** "Lavar del revés con agua fría. No usar secadora."
8. **One call to action at most.** "Si quieres otro color, escríbeme" is a person; "¡Haz tu pedido hoy antes de que se agoten! 🎁✨" is a template.
9. **Keep the seller's voice.** A joke the seller wrote stays. Playful brands use reader questions and "un must have" too; the problem is the full template.

## Worked example 1: product listing

The seller asked: "Hola! Mi taza tiene un diseño de montañas y un sol saliendo, algo tipo Patagonia. Escribe una descripción para Etsy, larga y con SEO." Claude Sonnet answered (ai-sonnet, s-007):

**Before**, with tells marked:

> **Título:** Taza de montañas al amanecer, taza de cerámica estilo Patagonia, regalo para amantes de la naturaleza y el trekking
>
> Despierta cada mañana con la sensación de estar en lo alto de una cumbre.[1] Esta taza de cerámica con diseño de montañas y sol naciente captura la calma y la inmensidad de los paisajes patagónicos.[2]
>
> DESCRIPCIÓN[3]
> Pensada para quienes aman el trekking, el camping y la vida al aire libre, esta taza es perfecta para tu café de la mañana, tu té de la tarde o un chocolate caliente después de una larga caminata.[4]
>
> CARACTERÍSTICAS
> - Material: cerámica de alta calidad[5]
> - Capacidad: 330 ml[6]
> - Apta para lavavajillas y microondas[6]
> - Impresión duradera, sin desteñir[6]
> - Asa ergonómica[6]
>
> IDEAL PARA[7]
> - Regalos de cumpleaños
> - Aficionados al senderismo y la montaña
> - Decoración de cocina u oficina
> - Un detalle para quien está de viaje o extraña la naturaleza
>
> CUIDADOS
> Se recomienda evitar utensilios abrasivos para conservar el diseño por más tiempo.
>
> PALABRAS CLAVE: taza montañas, taza patagonia, taza naturaleza, regalo outdoor, taza trekking, taza de cerámica[8]

1. Mood opener (§4, §18).
2. "Captura la calma y la inmensidad" (`es-captura-la-esencia` family, §16).
3. All-caps section stack (§20) and a bold field label (§19).
4. Two triads in one sentence (§6).
5. "De alta calidad" (§18) padding a spec.
6. Specs the seller never gave (S6.2): kept, but the seller must confirm them.
7. An "Ideal para" list of occasions (S6.3).
8. Keyword line (`es-palabras-clave-line`, §25).

**After:**

> Título: Taza de montañas al amanecer, taza de cerámica estilo Patagonia, regalo para amantes de la naturaleza y el trekking
>
> Taza de cerámica con montañas y el sol saliendo detrás, un paisaje al estilo de la Patagonia. Pensada para quien sale de trekking o de camping, para el café de la mañana o un chocolate caliente después de caminar.
>
> - Cerámica, 330 ml
> - Apta para lavavajillas y microondas
> - La impresión es duradera y no destiñe
> - Asa ergonómica
>
> Para que el dibujo dure más, no uses utensilios abrasivos.
>
> Para regalar, o para tu cocina u oficina.

**To the seller:** "Pasé las palabras clave al campo de etiquetas de Etsy; no van en la descripción. Tu mensaje no decía la capacidad, ni si la taza va al lavavajillas o al microondas, ni nada del asa o de la impresión. Confírmame esos datos antes de publicar."

**What changed:** The title keeps its keywords and order (S6.4); only the bold went. The triads became pairs; tea and "la vida al aire libre" went as repeats. Every spec is kept and flagged. The "Ideal para" list became one line (S6.3); the hikers it named are already in the first paragraph. Nothing was added.

## Worked example 2: email

The request was "Escribe un correo a mis compañeros de trabajo sobre nuestro club de lectura." Claude Sonnet answered (ai-general, email-7-sonnet):

**Before**, with tells marked:

> **Asunto:** ¡Únete a nuestro club de lectura! 📚[1]
>
> Hola a todos,
>
> Espero que estén muy bien. Quería compartirles una iniciativa que nos hace mucha ilusión: **nuestro club de lectura**,[2] un espacio para desconectar un rato del trabajo, compartir buenas historias y conocernos mejor fuera del día a día de la oficina.[3]
>
> **¿Cómo funciona?**[4]
> - Leemos un libro cada mes, elegido entre todos.
> - Nos reunimos una vez al mes para conversar sobre lo leído, intercambiar opiniones y recomendaciones.[3]
> - No hay obligación ni presión: si un mes no llegas a terminar el libro, ¡igualmente eres bienvenido/a!
>
> **Detalles de la próxima reunión:**[4]
> - **Libro:** [Título y autor][5]
> - **Fecha:** [Fecha]
> - **Hora:** [Hora]
> - **Lugar:** [Sala / enlace de videollamada]
>
> Si te interesa participar, solo responde a este correo y te añadiremos al grupo. También pueden proponer títulos[6] para los próximos meses; todas las sugerencias son bienvenidas, sin importar el género.
>
> ¡Ojalá puedan acompañarnos!
>
> Un saludo,
> [Tu nombre][5]
>
> ---
>
> Si quieres, puedo ajustar el tono (más formal o más divertido), añadir los datos concretos de la próxima reunión o acortarlo.[7]

1. Emoji and a slogan in the subject (§21).
2. Bold phrase and colon reveal (§19, §8).
3. Triads (§6).
4. Bold heading and bold labels in a short email (§19, §20).
5. Placeholders (§25). They stay; the sender fills them.
6. Register mix in a group email (S4).
7. Chat wrapper after a `---` line (§24, `es-chat-ofrece-tono`).

"Espero que estén muy bien. Quería compartirles…" is an ordinary email habit (`es-queria-compartir`, medium); it was trimmed only because the rewrite starts with the news.

**After:**

> Asunto: Club de lectura: próxima reunión el [fecha]
>
> Hola a todos,
>
> Les escribo sobre nuestro club de lectura, que nos hace mucha ilusión: un rato para desconectar del trabajo y conocernos mejor fuera de la oficina. Cada mes elegimos un libro entre todos y nos juntamos una vez para comentarlo y recomendarnos otros. No hay ninguna obligación: si algún mes no alcanzan a terminarlo, igual son bienvenidos/as.
>
> La próxima reunión:
> Libro: [título y autor]
> Fecha y hora: [fecha], a las [hora]
> Lugar: [sala o enlace de videollamada]
>
> Si quieren sumarse, respondan a este correo y los agregamos al grupo. También pueden proponer libros para los próximos meses, del género que sea.
>
> ¡Ojalá puedan acompañarnos!
>
> Un saludo,
> [Tu nombre]

**To the sender:** "Faltan el libro, la fecha, la hora, el lugar y tu nombre. Unifiqué el correo en ustedes porque va a un grupo."

**What changed:** The details stay a short plain list, without bold, because colleagues will look them up. The triads kept their content in fewer words ("compartir buenas historias" is what a book club already is). The email is in ustedes throughout, with the writer's "bienvenidos/as". The reassurance about unfinished books answers a real worry (§5), and the greeting and sign-off are human, so they stay. Nothing was added: there is still no book, date or place.
