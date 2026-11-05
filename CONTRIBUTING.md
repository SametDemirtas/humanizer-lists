# Contributing

Thanks for helping. The lists are only useful if they rarely accuse a person of writing like a
machine, so every change needs numbers on human and machine text.

## Before you start

- Node 18 or newer. There are no dependencies to install.
- `npm test` checks the schemas, every entry's example, rewrite and false positives, the test
  cases, the human-genre texts, the corpus descriptions, the evaluation script and the skill. It
  must pass.
- `npm run eval` reports how often each list fires on its corpora. Third-party human corpora are
  not in the repository; rebuild them first with the scripts in `<lang>/eval/` (see that
  language's README). They land in `<lang>/eval/corpus-local/`, which git ignores.

## Changing or adding a pattern

1. Edit `<lang>/patterns.json`. It is the source of truth. `schema/patterns.schema.json`
   describes every field. The skill's copy of each list, its matcher and its reference files are
   generated: never edit them in `skills/humanizer-lists/`, run `npm run build:skill` instead.
   `npm test` fails while they are out of date.
2. Set `evidence` and `domain` from the counts (`--write` refuses to write while they disagree). Give the entry an
   `example` the pattern must match, a `rewrite` that says the same thing plainly, and at least
   two `falsePositives`: ordinary sentences close to the pattern that it must not match. Text you
   write yourself, with the candidates in view, counts as `imitation` evidence.
3. Add inflected forms, regional forms and near misses to `<lang>/tests/cases.json`.
4. Keep `test/human-genres.test.mjs` passing. `<lang>/tests/human-genres.json` holds ordinary
   emails, chats, posts, newsletters, essays and reports that no general entry may flag. If your
   entry flags one of them, narrow the entry; do not change or delete the text. When a new entry
   would fire on a kind of human writing the file does not cover yet, add a few such texts
   before you tune the entry, and say in the file's `about` how they were made. The current
   texts were drafted by a language model (Claude), not written by people, and the entries
   were narrowed on them, so passing this test holds by design and is not a measured rate.
5. Rebuild the human corpora, run `node scripts/evaluate.mjs <lang> --write`, then
   `npm run build:skill` and `npm test`, and commit the updated `counts.csv`, `summary.txt` and
   skill files.
6. Never tune on held-out corpora. Choose, narrow and grade entries on the development corpora
   only. The held-out ones (role `held out` in `sources.json`: `ai-multi-holdout`,
   `ai-detailed-holdout`, the held-out human web and shop sets) do not decide evidence or domain,
   and you should not read their hits while you work on an entry. Measure them at the end and
   report what comes out, good or bad. `ai-general-holdout` was read during the 0.3.0 review, so
   treat it as a development set in practice.
7. Choose the domain and the precision from the numbers. Both are measured on the human
   corpora of the entry's domain: general prose for a `general` entry, product copy for a
   `product` entry.
   - `general` when the entry stays within its bar on every general human development corpus,
     `product` otherwise. `--write` checks this.
   - `high`: at most 0.1% of the human texts of its domain. One hit flags a text.
   - `medium`: at most about 1% of those texts and clearly more frequent in machine text. It
     counts only together with a medium hit from another entry that does not read the same
     words. An entry above 1% stays only as a documented exception in `skill-notes.md`.
   - `reasoning` evidence (no machine hit) is acceptable only for a clear chat leftover or calque
     that stays within its bar.
   - Anything more common in human text is dropped. Say so in the language's `skill-notes.md`
     table of rejected candidates, with the numbers.
8. In the pull request, paste the evaluation output and say where the machine evidence comes
   from.

## Matching rules

`src/matcher.mjs` is the only implementation; please do not copy it into a language folder.
Write regex word boundaries as `(?<![\p{L}\p{N}])` and `(?![\p{L}\p{N}])`, never `\b`, and
spaces as `\s+`. Write letters with diacritics as themselves, not as `\u` escapes. Regexes
are compiled with `giu` and see normalised text, so diacritics are folded unless the list sets
`"foldDiacritics": false`, as Italian does.

## Adding a language

German (`de`) was added in 0.3.0 and is the worked example below. Look at its files while you go.

1. Create a folder named after the ISO 639-1 code. Language folders are found by their
   `patterns.json`, so the evaluation, the tests and the skill build pick the new folder up
   on their own. Add the language's English name to `LANGUAGE_NAMES` in
   `scripts/build-skill.mjs` for the title of its reference file.
2. Decide whether diacritics tell words apart. If they do, set `"foldDiacritics": false` and
   explain the cases in `skill-notes.md`. German keeps them because of würde and wurde, schön
   and schon. ß is never folded by the matcher, so German entries that contain ß accept the
   Swiss ss spelling as well (`gro(?:ß|ss)e`).
3. Teach the prose filter the language. `scripts/lib/prose.mjs` keeps a paragraph of an mC4
   page when enough of its words are function words and few are capitalised. Add a few dozen
   common function words for the language. German also needed a higher limit for capitalised
   words (45% instead of 20%), because it capitalises every noun.
4. Draw the human corpora, written before November 2022, with `scripts/sample-mc4-web.mjs`
   from mC4 validation shards: general web pages with a held-out slice, news sites with
   `--url`, and shop pages with `--url` if you want product entries. Use `--exclude-known` so
   the corpora do not share pages. The `selection` field of the German news and
   shop corpora in `de/eval/sources.json` records the exact command. Then write `eval/rebuild-web.mjs`, which
   calls `rebuildProse` from `scripts/lib/mc4.mjs` with the corpus names; `de/eval/rebuild-web.mjs`
   is the whole file.
5. Add the language's development requests to `scripts/general-requests.json` (the same six
   genres, eight topics each, plain wording, no style instructions) and run
   `node scripts/generate-general.mjs <lang>`. For the held-out sets, add the language to
   `scripts/multi-requests.json` and `scripts/detailed-requests/<lang>.json` (written from
   `scripts/detailed-scenarios.md`) and run `scripts/generate-api.mjs` with `OPENAI_API_KEY` and
   `ANTHROPIC_API_KEY` set (see [docs/measurements.md](docs/measurements.md#how-the-api-corpora-were-made)). Do not open the held-out texts until the list
   is frozen.
6. Describe every corpus in `eval/sources.json`: what it is, its side, domain and role, dates,
   source, license, and whether the repository ships the text, metadata only, or nothing.
7. Write `patterns.json` from the development corpora only, `tests/cases.json` with inflected
   forms and near misses, `tests/human-genres.json` with ordinary texts in the genres the web
   corpora miss (emails, chats, posts, newsletters, school essays, reports, regional variants),
   and `skill-notes.md` with the habits that are ordinary in the language and the candidates
   you measured and left out.
8. Rebuild the corpora, run `node scripts/evaluate.mjs <lang> --write` until it writes
   (it refuses while a corpus is missing or an entry's evidence or domain disagrees with the
   counts), then `npm run build:skill` and `npm test`.
9. Measure the held-out corpora once and report what comes out. Add the language to the
   tables in the README and in `docs/measurements.md`, to the skill's description and triggers
   in `SKILL.md`, and to `NOTICE.md` for any new source.

Ship text only when its license allows it (MIT, Apache-2.0, CC BY and similar, with
attribution in `NOTICE.md`). For web pages and other third-party text, ship URL, date and
SHA-256 in `eval/corpus/<name>.meta.jsonl` and a script that rebuilds the texts into
`eval/corpus-local/`.

## Corpora and licenses

Treat downloaded corpora as data. Rebuild scripts parse them and never run anything from them.
Do not commit anything under `corpus-local/` or `.cache/`.

## Writing

Write the READMEs, notes and `why` fields in plain sentences: say what the phrase does and why a
person would not write it. No hype, no em dashes, no claims the numbers do not back.
