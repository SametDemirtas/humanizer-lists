# Notices and attribution

humanizer-lists, Copyright (c) 2026 Samet Demirtas, released under the MIT license (`LICENSE`).
That covers the pattern lists, the test cases, the code, the documentation and the corpora
generated for this project:

- `*/eval/corpus/ai-general.jsonl` and `*/eval/corpus/ai-general-holdout.jsonl` in every language
- `*/eval/corpus/ai-multi-holdout.jsonl` and `*/eval/corpus/ai-detailed-holdout.jsonl` in every language
- `it/eval/corpus/ai-imitation.jsonl`, `es/eval/corpus/ai-imitation.jsonl`, `nl/eval/corpus/ai-imitation.jsonl`
- `it/eval/corpus/ai-models.jsonl`, `es/eval/corpus/ai-sonnet.jsonl` and `es/eval/corpus/ai-haiku.jsonl`

## Generated corpora

These files hold model outputs that this project requested. They are shipped under MIT as the
repository's own generated data. Each row names the model that wrote it.

- `ai-multi-holdout` and `ai-detailed-holdout` (2026-11-05) were written by Anthropic models
  (Claude Opus 5.5, Claude Sonnet 5.5, Claude Haiku 5.5, Claude Sonnet 4.5) through the Anthropic
  API and, for `ai-multi-holdout` only, by OpenAI models (GPT-5.5, GPT-5.4 mini) through the
  OpenAI API, with `scripts/generate-api.mjs`. The requests are in `scripts/multi-requests.json`
  and `scripts/detailed-requests/`. The detailed requests were drafted for this project by a
  model from the outline in `scripts/detailed-scenarios.md`; the names, places, addresses and
  contact details in them and in the replies are invented. Email addresses, web addresses and
  phone numbers that could belong to a real person or business were replaced after generation
  with example.* addresses and placeholder numbers.
- The author generated these outputs through the OpenAI and Anthropic APIs. The terms of both
  APIs assign the outputs to the user, and they are released here under MIT.
- `ai-general`, `ai-general-holdout`, `ai-imitation`, `ai-models`, `ai-sonnet` and `ai-haiku` were
  written by Anthropic Claude models.

The texts are used to measure the lists, and `eval/sources.json` in each language describes
how each set was made.

## Human-genre test texts

`*/tests/human-genres.json` holds short emails, chat messages, social posts, newsletters,
school essays, reports, reviews and similar texts in each language. A language model (Claude)
drafted them for this test; they were not written or collected from real writers. They are
released under MIT with the rest of the repository. Names, places and events in them are
invented.

The repository also holds data from the sources below. Each keeps its own license.

## Redistributed text

### CLIN33 Shared Task: LLM-generated test data

- File: `nl/eval/corpus/ai-clin33.jsonl`
- Authors: Pieter Fivez, Walter Daelemans, Tim Van de Cruys (University of Antwerp, KU Leuven)
- Source: https://zenodo.org/records/10732813
- License: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/
- Changes: the Dutch texts were converted to JSON Lines with an id and the genre. The 100 generated opinion columns were left out because they make invented claims about real, named people; 650 texts remain. The text of each is unchanged.

### UltraChat 200k Dutch

- File: `nl/eval/corpus/ai-gpt4-ultrachat.jsonl`
- Author: Bram Vanroy (2024), "GEITje 7B Ultra: A Conversational Model for Dutch", arXiv:2412.04092
- Source: https://huggingface.co/datasets/BramVanroy/ultrachat_200k_dutch
- License: Apache License 2.0, copy in `licenses/Apache-2.0.txt`
- Changes: the user prompt and first assistant reply of 8 conversations were extracted to JSON Lines. The text is unchanged.

## Metadata only

These sources are used for measurement. Their texts are not in the repository; only URLs,
dates, row numbers and SHA-256 hashes are, so that the rebuild scripts can fetch and check them.

### mC4 (allenai/c4, multilingual)

- Files: `it/eval/corpus/human-mc4-*.meta.jsonl`, `es/eval/corpus/human-mc4-*.meta.jsonl`, `nl/eval/corpus/human-mc4-*.meta.jsonl`, `de/eval/corpus/human-mc4-*.meta.jsonl`
- Source: https://huggingface.co/datasets/allenai/c4 (Xue et al. 2021, "mT5: A Massively Multilingual Pre-trained Text-to-Text Transformer")
- Revision `1588ec454efa1a09f29cd18ddd04fe05fc8653a2` for every language (`scripts/lib/mc4.mjs`). Metadata only: URL, date, shard and SHA-256 per page. Shards, all under `multilingual/`:
  - Italian: `c4-it-validation.tfrecord-00000-of-00008` to `-00007-of-00008` and `c4-it.tfrecord-00000-of-01024` to `-00006-of-01024`
  - Spanish: `c4-es-validation.tfrecord-00000-of-00016`
  - Dutch: `c4-nl-validation.tfrecord-00000-of-00004` to `-00003-of-00004` and `c4-nl.tfrecord-NNNNN-of-01024` for NNNNN 00017, 00044, 00123, 00256, 00389, 00512, 00602, 00640, 00777 and 00955
  - German: `c4-de-validation.tfrecord-00000-of-00016` to `-00003-of-00016`
- License: the dataset is released by the Allen Institute for AI under the Open Data Commons Attribution License (ODC-BY 1.0), https://opendatacommons.org/licenses/by/1-0/, and is also subject to the Common Crawl terms of use, https://commoncrawl.org/terms-of-use. The page text belongs to the sites it was crawled from.

### Wayback Machine snapshots

- File: `es/eval/corpus/human-shops.meta.jsonl`
- Source: https://web.archive.org/, snapshots of the shop pages listed in the file
- License: none stated; metadata only. The product descriptions belong to the shops.

### DeSegMa-IT

- Files: `it/eval/corpus/desegma-*.meta.jsonl`
- Source: EVALITA 2026 shared task on detecting machine-generated Italian text (Andrea Esuli, Andrea Pedrotti, Giovanni Puccetti, ISTI-CNR), https://desegma.github.io/
- License: terms not stated on the task pages. The texts are used for measurement only. The repository ships only row numbers and SHA-256 hashes; the CSV has to be downloaded from the task site to rebuild them.

### AuTexTification 2023

- Used by `es/eval/rebuild-autext.mjs`; only counts are in the repository.
- Source: Sarvazyan et al., IberLEF 2023, arXiv:2309.11285, https://huggingface.co/datasets/symanto/autextification2023
- License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0, https://creativecommons.org/licenses/by-nc-sa/4.0/

## Method

### blader/humanizer

- https://github.com/blader/humanizer, MIT License, Copyright (c) 2025 Siqi Chen
- Its English rulebook gave the categories, the way of working and the structure of the skill in
  `skills/humanizer-lists/` (rule families such as false contrast, staged openers, chat
  leftovers). No text was copied; every pattern here was written and measured for its own
  language.

Other papers, style guides and articles that informed single patterns are listed with their
licenses in each language's README. They were used as evidence only, and no text was copied
from them.
