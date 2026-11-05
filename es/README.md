# Señales de texto generado por IA en español

[Español](#español) · [English](#english)

Esta carpeta contiene la lista medida. La skill `humanizer-lists` reescribe el texto entero siguiendo la guía española [`guides/es.md`](../skills/humanizer-lists/guides/es.md); la lista y el script de comprobación son un paso de apoyo.

This folder holds the measured list. The `humanizer-lists` skill rewrites the whole text using the Spanish guide [`guides/es.md`](../skills/humanizer-lists/guides/es.md); the list and the checker are a helper step.

## Español

### Qué es

`patterns.json` es una lista de 83 expresiones y hábitos que delatan texto escrito por un modelo de lenguaje en español: entradas de blog y redes, correos, ensayos, artículos, informes y fichas de producto. Cada patrón trae una explicación, una frase que debe marcar, una reescritura y frases normales en las que no debe saltar. La usa la skill `humanizer-lists` de la raíz del proyecto, y también funciona sola con `src/matcher.mjs`.

Hay 18 patrones de precisión alta y 65 de precisión media. 78 son generales y valen para cualquier texto; 5 son solo para títulos y descripciones de producto (`es-question-first`, `es-no-solo-sino`, `es-cabe-destacar`, `es-en-resumen` y `es-gerund-rider`). Por categoría: hype 22, structure 15, cliche-opener 11, false-contrast 9, vague-praise 8, filler 6, urgency 5, rhetorical-question 4, cliche-closer 2, punctuation 1.

Cubre el español de España y el de América Latina. Lo primero es no equivocarse con el texto humano: cada patrón se midió en textos humanos anteriores a noviembre de 2022 y en textos generados.

### Qué encuentra y qué no

La lista sirve para limpiar un texto pegado desde un chat y para ayudar a quien lo revisa. Encuentra lo que se olvida borrar: títulos y negritas de Markdown, marcadores entre corchetes, la línea que presenta el borrador y la oferta de adaptarlo («Si quieres, puedo adaptar el texto a un tono más formal»). Los patrones de restos del chat solo saltan cuando el texto habla de sí mismo; «Si quieres, puedo hacer la reserva» no se marca. También conoce algunas frases hechas. No reconoce un texto de un modelo bien pedido y limpiado, y no dice quién escribió un texto.

Dos corpus generados con las API de OpenAI y Anthropic cuando la lista ya estaba cerrada, y medidos una sola vez, dan cifras limpias sobre textos reservados. Los patrones generales marcan el 86,6 % de las 254 respuestas a peticiones sencillas (`ai-multi-holdout`) y el 83,3 % de las 448 respuestas a peticiones detalladas (`ai-detailed-holdout`). Casi todo viene de los restos: los patrones de redacción solos, es decir, los generales fuera de `structure`, marcan el 12,6 % (32) y el 1,3 % (6). En las 1.000 páginas web humanas reservadas, los patrones generales marcan el 0,2 % (2). No marcan ninguno de los 74 textos de `tests/human-genres.json`, pero esos textos los redactó un modelo de lenguaje para la prueba y sirvieron para acotar los patrones, así que ese resultado está garantizado por construcción.

Textos marcados solo por la redacción, por género:

| Género | Peticiones sencillas (37; 32 en el artículo largo) | Peticiones detalladas (64) |
|---|---|---|
| Entrada de blog | 16 (43,2 %) | 2 (3,1 %) |
| Correo | 1 (2,7 %) | 0 |
| Ensayo breve | 1 (2,7 %) | 0 |
| Artículo | 0 | 0 |
| Publicación de Instagram | 12 (32,4 %) | 0 |
| Informe breve | 0 | 0 |
| Artículo largo (unas 800 palabras) | 2 (6,3 %) | 4 (6,3 %) |

Las entradas de blog y las publicaciones de Instagram terminan a menudo con una pregunta o una invitación a comentar, y esas fórmulas están en la lista.

En las peticiones sencillas, los 30 textos de GPT-5.5 y GPT-5.4 mini se marcan mucho menos que los 224 de Claude: 14 (46,7 %) frente a 206 (92,0 %). Entre los modelos de Claude, Haiku 5.5 es el que menos se marca (75,0 %). La muestra de GPT es pequeña y solo indica una dirección. Las peticiones detalladas escritas con cuidado (estilo B) se marcan en el 73,7 % de los casos, las breves (estilo A) en el 92,9 %.

Un texto sobrio de un modelo, sin formato ni restos, suele pasar sin marcas. Una marca señala qué reescribir; la falta de marcas no dice que el texto sea de una persona.

### Resultados

Salida de `node scripts/evaluate.mjs es` (`eval/summary.txt`). «Todos» usa los 83 patrones, «generales» los 78 generales y «redacción» los generales fuera de `structure`.

| Corpus | Tipo | Textos | Todos | Generales | Redacción |
|---|---|---|---|---|---|
| `human-mc4-web` | humano, web, desarrollo | 2.000 | 1,7 % | 0,1 % | 0,1 % |
| `human-mc4-web-holdout` | humano, web, reservado | 1.000 | 1,7 % | 0,2 % | 0,1 % |
| `autext-human` | humano, wiki, tuits, legal | 15.787 | 0,0 % | 0,0 % | 0,0 % |
| `human-shops` | humano, fichas de producto | 458 | 0,4 % | 0,2 % | 0,2 % |
| `ai-general` | Claude, desarrollo | 96 | 93,8 % | 93,8 % | 19,8 % |
| `ai-general-holdout` | Claude, leído durante la revisión | 96 | 92,7 % | 92,7 % | 9,4 % |
| `ai-multi-holdout` | Claude y GPT, peticiones sencillas, reservado | 254 | 87,4 % | 86,6 % | 12,6 % |
| `ai-detailed-holdout` | Claude, peticiones detalladas, reservado | 448 | 83,7 % | 83,3 % | 1,3 % |
| `autext-generated` | modelos base | 16.275 | 0,1 % | 0,0 % | 0,0 % |
| `ai-sonnet` | fichas de Claude Sonnet | 70 | 20,0 % | 17,1 % | 12,9 % |
| `ai-haiku` | fichas de Claude Haiku | 70 | 0,0 % | 0,0 % | 0,0 % |
| `ai-imitation` | imitación, solo control | 63 | 69,8 % | 60,3 % | 55,6 % |

Usa los patrones generales en prosa general y todos en fichas de producto. Con todos, el 1,7 % de las páginas web humanas queda marcado, sobre todo por «Cabe destacar» (12 páginas de desarrollo) y «En resumen» (10): son normales en noticias y blogs, y por eso son solo de producto. Los patrones de redacción añadidos en la 0.3.0 salen de `ai-general`, así que su cifra en ese corpus es optimista. `ai-general-holdout` se leyó durante la revisión de la 0.3.0 y ya no es una estimación limpia. Las cifras limpias sobre textos reservados son las de `ai-multi-holdout` y `ai-detailed-holdout`.

En las fichas humanas, `es-question-first` (2,2 %) y `es-no-esperes-mas` (1,1 %) pasan del 1 %. Son medios y no marcan nada solos.

### Cómo se usa

Desde la carpeta de la skill, con Node 18 o posterior:

```
node scripts/check.mjs es correo.txt
node scripts/check.mjs es ficha.json --product    # {"title": "...", "description": "..."}
```

Sin `--product` usa solo los patrones generales.

### Tildes y registro

El texto y los patrones se normalizan igual: sin tildes ni diéresis (á→a, ü→u) y con la ñ intacta, así que un texto escrito sin tildes se compara igual. El coste es que «llévala» (tú) y «llevala» (vos) quedan iguales; por eso `es-mix-voseo-tu` solo mira verbos cuya raíz cambia (querés/quieres, tenés/tienes, podés/puedes). El voseo rioplatense, «ustedes» como plural de tú y palabras como «playera», «remera» o «celular» no son señales. La raya es puntuación española correcta y no tiene patrón. `es-question-first` y una forma de `es-chat-aqui-tienes` («¡Claro! Aquí tienes el texto») miran el principio del texto: revisa título y descripción por separado.

### Corpus

- `human-mc4-web`, `human-mc4-web-holdout`: páginas web en español de mC4 (Common Crawl, 2013 a 2020), solo los párrafos de prosa.
- `autext-human`, `autext-generated`: textos humanos y generados de AuTexTification 2023 (IberLEF). Sin fecha indicada.
- `human-shops`: 458 descripciones de producto de 2012 a agosto de 2022, recuperadas de la Wayback Machine (Mr. Wonderful, DaWanda España, Artesanio, Regalador, Monoblock, Catálogo de Economía Social de Mendoza, Cuidado con el Perro, Complot).
- `tests/human-genres.json`: 74 textos redactados para la prueba por un modelo de lenguaje (Claude), no escritos ni recogidos por personas reales: correos personales y de trabajo de España y América Latina, mensajes de chat, publicaciones en redes, boletines, redacciones escolares, resúmenes académicos, incidencias, actas, reseñas, crónicas de viaje y charla deportiva. Ninguno puede quedar marcado; los patrones se acotaron hasta que ninguno lo quedó, así que la prueba se supera por construcción.
- `ai-general`, `ai-general-holdout`: Claude Sonnet y Claude Haiku responden a peticiones sencillas en seis géneros, ocho temas cada uno. El segundo tiene temas nuevos.
- `ai-multi-holdout`: 254 respuestas a peticiones sencillas de una línea (`scripts/multi-requests.json`) en siete géneros, incluido un artículo de unas 800 palabras, sobre ocho temas nuevos. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 y Sonnet 4.5 (56 textos cada uno), GPT-5.5 (6) y GPT-5.4 mini (24), sin mensaje de sistema.
- `ai-detailed-holdout`: 448 respuestas a 56 situaciones realistas con datos concretos (`scripts/detailed-scenarios.md`), cada una pedida de forma breve (A) y con cuidado (B), de los cuatro modelos de Claude. Las peticiones, situadas en España y en México, Argentina y Colombia, están en `scripts/detailed-requests/es.json`.
- `ai-sonnet`, `ai-haiku`: 70 peticiones de vendedores de España, México, Argentina, Colombia y Chile, sin instrucciones de estilo. `ai-imitation`: 63 fichas generadas con los candidatos a la vista, solo como control.

Detalles, fechas y licencias en `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) explica cómo volver a generar los corpus con las API.

### Reproducir

Desde la raíz del proyecto, con Node 18 o posterior y sin dependencias:

```
npm test                                  # esquema, ejemplos, reescrituras, falsos positivos, casos de prueba, skill
node es/eval/rebuild-web.mjs              # descarga un archivo de mC4 (unos 30 MB): páginas web
node es/eval/rebuild-human.mjs            # descarga las fichas humanas (lento: una petición cada 1,5 s)
node es/eval/rebuild-autext.mjs           # descarga AuTexTification 2023 (13 MB)
node scripts/evaluate.mjs es              # recuentos sobre los corpus presentes
node scripts/evaluate.mjs es --write      # actualiza counts.csv y summary.txt
```

Los textos descargados van a `eval/corpus-local/`, que git ignora; solo se guardan los que coinciden con su SHA-256.

### Límites

- Los textos generados son casi todos de Claude, más los modelos base de AuTexTification; GPT aporta 30 textos reservados. Faltan Gemini, Llama y Mistral.
- Las cifras sobre texto generado miden sobre todo los restos del chat. Sin ellos, la lista atrapa el 1,3 % de las respuestas a peticiones detalladas.
- Los corpus humanos generales son páginas web y textos de wiki, tuits y legales. Hay pocos correos personales, ensayos y blogs. `tests/human-genres.json` cubre esos géneros con textos redactados por un modelo para la prueba: muestra qué deja en paz la regla, pero no es una tasa medida. Por eso la despedida que pide comentarios es media.
- 25 patrones con evidencia `corpus` se apoyan en 1 a 3 textos generados de desarrollo. La etiqueta es correcta, pero la prueba es débil.
- El corpus de fichas es pequeño (458) y sobre todo de España (355). No hay fichas de Colombia, Chile ni Perú, y Mr. Wonderful pesa mucho (136).
- Una expresión regular no ve tríadas de adjetivos, frases de longitud uniforme, sinónimos rotando ni mayúsculas de título a la inglesa.

### Fuentes

| Fuente | Uso | Licencia |
|---|---|---|
| [blader/humanizer](https://github.com/blader/humanizer), `SKILL.md` | familias de señales en inglés | MIT |
| [mC4, allenai/c4 multilingual](https://huggingface.co/datasets/allenai/c4) | páginas web humanas; solo URL, fecha, archivo y SHA-256 | ODC-BY 1.0 y condiciones de Common Crawl; los textos son de cada sitio |
| [AuTexTification 2023](https://huggingface.co/datasets/symanto/autextification2023) (Sarvazyan et al., IberLEF 2023, [arXiv:2309.11285](https://arxiv.org/abs/2309.11285)) | corpus de control `autext-human` y `autext-generated` | CC BY-NC-SA 4.0, solo recuentos |
| [IberAuTexTification 2024](https://portal.odesia.uned.es/en/dataset/iberautextification-2024) | revisada, no usada: pide acceso por correo | CC BY 4.0 según ODESIA |
| Resende y Castilho, STYGENAI 2026, [2026.stygenai-1.5](https://aclanthology.org/2026.stygenai-1.5.pdf) | contexto sobre ChatGPT-4o en español; solo leímos el resumen | ver el artículo |
| FundéuRAE, [«No digas "must", di imprescindible»](https://www.fundeu.es/noticia/no-digas-must-di-imprescindible/) (2014) | «un imprescindible» es medio y no alto | derechos reservados, solo como evidencia |
| FundéuRAE, [«En España abusamos del inglés en la publicidad…»](https://www.fundeu.es/noticia/en-espana-abusamos-del-ingles-en-la-publicidad-por-paletos-y-por-complejo/) (2016) | los anglicismos publicitarios también son humanos | derechos reservados, solo como evidencia |
| FundéuRAE, [«¿Siguen siendo necesarios los signos de apertura…?»](https://www.fundeu.es/noticia/siguen-siendo-necesarios-los-signos-de-apertura-de-interrogacion-y-exclamacion/) (2017) | omitir ¿ y ¡ no es señal de IA | derechos reservados, solo como evidencia |
| Wayback Machine (archive.org) | instantáneas de las fichas humanas | derechos de cada tienda; solo URL y recuentos |

También revisamos [Hainrixz/humanizalo](https://github.com/Hainrixz/humanizalo) (MIT). Su vocabulario está en inglés. No copiamos nada de su texto. Los candidatos medidos y descartados, con sus números, están en `skill-notes.md`.

### Historia

La versión 0.1.0 (27 de octubre de 2026) era una lista de 71 patrones (28 altos, 43 medios) solo para fichas de producto, elegidos entre unos 115 candidatos. Se midió en las 458 fichas humanas, en AuTexTification y en las fichas de Sonnet, Haiku y la imitación. Entonces marcaba el 0,4 % de las fichas humanas (2 de 458, ambas de Mr. Wonderful), el 0,2 % de los textos de los modelos base, el 38,6 % de las respuestas de Sonnet, ninguna de Haiku y el 73,0 % de las imitaciones. Buena parte de lo detectado en Sonnet era la línea «Palabras clave: …» pegada al final y «el regalo perfecto». Haiku escribía fichas sobrias que la lista no distinguía de las humanas.

La 0.2.0 midió cada patrón también en prosa general y añadió los restos del chat. La 0.3.0 añadió 12 patrones de redacción. Después, una revisión con correos, chats, publicaciones, boletines y redacciones corrientes, redactados por un modelo para una prueba, acotó los patrones que los marcaban, pasó nueve de alto a medio y quitó seis, entre ellos el «¿Y tú?» final y «meticulosamente». Los detalles están en `CHANGELOG.md` y en `skill-notes.md`.

---

## English

### What it is

`patterns.json` is a list of 83 phrases and habits that mark Spanish text as written by a language model: blog and social posts, emails, essays, articles, reports and product listings. Each entry has an explanation, a sentence it must match, a rewrite and ordinary sentences it must not match. The `humanizer-lists` skill at the root of the project uses it, and it also works on its own with `src/matcher.mjs`.

There are 18 high and 65 medium entries. 78 are general and apply to any text; 5 apply only to product titles and descriptions (`es-question-first`, `es-no-solo-sino`, `es-cabe-destacar`, `es-en-resumen` and `es-gerund-rider`). By category: hype 22, structure 15, cliche-opener 11, false-contrast 9, vague-praise 8, filler 6, urgency 5, rhetorical-question 4, cliche-closer 2, punctuation 1.

It covers the Spanish of Spain and of Latin America. Not flagging human text comes first: every entry was measured on human text from before November 2022 and on machine text.

### What it finds and what it misses

The list is the checker step of the humanizer. It finds what people forget to delete: Markdown headings and bold, square-bracket placeholders, the line that introduces the draft and the offer to adapt it ("Si quieres, puedo adaptar el texto a un tono más formal"). The chat-leftover entries fire only when the text talks about itself; "Si quieres, puedo hacer la reserva" is not flagged. It also knows some stock phrases. It does not recognise model text that was well prompted and cleaned up, and it does not tell who wrote a text.

Two corpora generated through the OpenAI and Anthropic APIs after the list was final, and measured once, give the clean held-out numbers. The general entries flag 86.6% of 254 replies to plain requests (`ai-multi-holdout`) and 83.3% of 448 replies to detailed requests (`ai-detailed-holdout`). Nearly all of that comes from leftovers: the wording entries alone, meaning the general entries outside `structure`, flag 12.6% (32) and 1.3% (6). On the 1,000 held-out human web pages the general entries flag 0.2% (2). They flag none of the 74 texts in `tests/human-genres.json`, but a language model drafted those texts for the test and they were used to narrow the entries, so that result holds by design.

Texts flagged on wording, by genre, plain requests (37 per genre, 32 for the long article) then detailed requests (64 per genre): blog posts 16 (43.2%) and 2 (3.1%), emails 1 (2.7%) and 0, short essays 1 (2.7%) and 0, articles 0 and 0, Instagram posts 12 (32.4%) and 0, short reports 0 and 0, long articles of about 800 words 2 (6.3%) and 4 (6.3%). Blog and Instagram posts often end with a question or a call to comment, and those are on the list.

On the plain requests, the 30 texts from GPT-5.5 and GPT-5.4 mini are flagged far less often than the 224 Claude texts: 14 (46.7%) against 206 (92.0%). Among the Claude models, Haiku 5.5 is flagged least (75.0%). The GPT sample is small and shows a direction only. Careful detailed requests (style B) are flagged in 73.7% of cases, short ones (style A) in 92.9%.

A sober model text without formatting or leftovers usually passes. A flag points at what to rewrite; no flag does not mean a person wrote the text.

### Results

The table in the Spanish section is the output of `node scripts/evaluate.mjs es` (`eval/summary.txt`). "Todos" uses all 83 entries, "generales" the 78 general entries, "redacción" the general entries outside `structure`. In short:

- Human text, general entries: 0.1% of 2,000 development web pages, 0.2% of 1,000 held-out web pages, 0.0% of 15,787 AuTexTification texts. Product listings, all entries: 0.4% of 458.
- Held-out machine text, general entries then wording: `ai-multi-holdout` 86.6% and 12.6%, `ai-detailed-holdout` 83.3% and 1.3%.
- Development and earlier sets: `ai-general` 93.8% and 19.8%, `ai-general-holdout` 92.7% and 9.4%. Base models (AuTexTification): 0.0%. Product listings, all entries: Sonnet 20.0%, Haiku 0.0%.
- With all entries, 1.7% of human web pages are flagged, mostly by "Cabe destacar" (12 development pages) and "En resumen" (10), which are normal in news and blogs and therefore product-only. The wording entries added in 0.3.0 were drawn from `ai-general`, so its rate is optimistic. `ai-general-holdout` was read during the 0.3.0 review and is no longer a clean estimate.
- On human listings, `es-question-first` (2.2%) and `es-no-esperes-mas` (1.1%) go above 1%. They are medium and flag nothing alone.

### How to use it

From the skill folder, with Node 18 or newer:

```
node scripts/check.mjs es email.txt
node scripts/check.mjs es listing.json --product    # {"title": "...", "description": "..."}
```

Without `--product` it uses the general entries only.

### Accents and register

Text and patterns are normalised the same way: accents and diaeresis are dropped (á→a, ü→u) and ñ is kept, so text typed without accents is matched the same. The cost is that "llévala" (tú) and "llevala" (vos) look alike, so `es-mix-voseo-tu` only checks verbs whose stem changes (querés/quieres, tenés/tienes, podés/puedes). Rioplatense voseo, "ustedes" as the plural of tú, and words such as "playera", "remera" or "celular" are not tells. The em dash is correct Spanish punctuation and has no entry. `es-question-first` and one form of `es-chat-aqui-tienes` ("¡Claro! Aquí tienes el texto") look at the start of the text, so check a title and a description separately.

### Corpora

- `human-mc4-web`, `human-mc4-web-holdout`: Spanish web pages from mC4 (Common Crawl, 2013 to 2020), prose paragraphs only.
- `autext-human`, `autext-generated`: human and generated texts from AuTexTification 2023 (IberLEF). Undated.
- `human-shops`: 458 product descriptions from 2012 to August 2022, taken from Wayback Machine snapshots of eight shops in Spain, Argentina and Mexico.
- `tests/human-genres.json`: 74 texts drafted for the test by a language model (Claude), not written or collected from real writers: personal and business emails from Spain and Latin America, chat messages, social posts, newsletters, school essays, academic abstracts, tickets, minutes, reviews, travel writing and sports talk. None may be flagged; the entries were narrowed until none was, so the test passes by design.
- `ai-general`, `ai-general-holdout`: Claude Sonnet and Claude Haiku answering plain requests in six genres, eight topics each. The second set has new topics.
- `ai-multi-holdout`: 254 replies to plain one-line requests (`scripts/multi-requests.json`) in seven genres, including an article of about 800 words, on eight new topics. Claude Opus 5.5, Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 (56 texts each), GPT-5.5 (6) and GPT-5.4 mini (24), with no system prompt.
- `ai-detailed-holdout`: 448 replies to 56 realistic scenarios with concrete facts (`scripts/detailed-scenarios.md`), each asked briefly (A) and carefully (B), from the four Claude models. The requests, set in Spain and in Mexico, Argentina and Colombia, are in `scripts/detailed-requests/es.json`.
- `ai-sonnet`, `ai-haiku`: 70 seller requests from Spain, Mexico, Argentina, Colombia and Chile, with no style instructions. `ai-imitation`: 63 listings generated with the candidates in view, a sanity check only.

Details, dates and licenses are in `eval/sources.json`. [docs/measurements.md](../docs/measurements.md#how-the-api-corpora-were-made) explains how to regenerate the API corpora.

### Reproducing

The commands are in the Spanish section under "Reproducir": `npm test`, `node es/eval/rebuild-web.mjs` (one mC4 file, about 30 MB), `node es/eval/rebuild-human.mjs` (slow, one request every 1.5 s), `node es/eval/rebuild-autext.mjs` (13 MB), `node scripts/evaluate.mjs es` and `node scripts/evaluate.mjs es --write`. Downloaded texts go to `eval/corpus-local/`, which git ignores, and only texts that match their SHA-256 are kept.

### Limitations

- The machine text is almost all Claude, plus the AuTexTification base models; GPT accounts for 30 held-out texts. Gemini, Llama and Mistral output is missing.
- The rates on machine text mostly measure chat leftovers. Without them, the list catches 1.3% of the replies to detailed requests.
- The general human corpora are web pages and wiki, tweet and legal texts. Personal emails, essays and blogs are a small part of them. `tests/human-genres.json` covers those genres with texts a model drafted for the test: it shows what the rule leaves alone, but it is not a measured rate. That is why the sign-off that asks for comments is medium.
- 25 entries with `corpus` evidence rest on 1 to 3 development machine texts. The label is accurate, but the evidence is thin.
- The product corpus is small (458) and mostly from Spain (355). There is nothing from Colombia, Chile or Peru, and Mr. Wonderful (136) weighs a lot.
- A regex does not see adjective triads, uniform sentence length, synonym rotation or English-style Title Case.

### Sources

See the table in the Spanish section: blader/humanizer (MIT); mC4 (ODC-BY 1.0 plus Common Crawl terms, metadata only); AuTexTification 2023 (CC BY-NC-SA 4.0, counts only); IberAuTexTification 2024 (reviewed, not used); Resende and Castilho (STYGENAI 2026, abstract only); three FundéuRAE notes and the Wayback Machine snapshots, as evidence only. Hainrixz/humanizalo (MIT) was reviewed and nothing was copied. The candidates measured and left out, with their numbers, are in `skill-notes.md`.

### History

Version 0.1.0 (October 27, 2026) was a list of 71 entries (28 high, 43 medium) for product listings only, chosen from about 115 candidates. It was measured on the 458 human listings, AuTexTification and the Sonnet, Haiku and imitation listings. Then, it flagged 0.4% of the human listings (2 of 458, both Mr. Wonderful), 0.2% of the base-model texts, 38.6% of the Sonnet answers, none of the Haiku answers and 73.0% of the imitations. Much of what it caught in Sonnet was a pasted "Palabras clave: …" line and "el regalo perfecto". Haiku wrote sober listings the list could not tell from human ones.

Version 0.2.0 measured every entry on general prose as well and added the chat-leftover entries. Version 0.3.0 added 12 wording entries. A review on ordinary emails, chats, posts, newsletters and school essays, drafted by a model for a test, then narrowed the entries that flagged them, moved nine from high to medium and removed six, among them the closing "¿Y tú?" and "meticulosamente". Details are in `CHANGELOG.md` and `skill-notes.md`.

License: MIT, see `LICENSE` at the root. Third-party sources keep their own terms; see `NOTICE.md`.
