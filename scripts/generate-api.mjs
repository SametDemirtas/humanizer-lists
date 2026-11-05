#!/usr/bin/env node
// Builds the held-out machine corpora ai-multi-holdout and ai-detailed-holdout
// through the OpenAI and Anthropic APIs.
//
//   node scripts/generate-api.mjs live [lang ...]
//       plain requests (scripts/multi-requests.json), all six models, one call at a time per worker
//   node scripts/generate-api.mjs batch build [lang ...]
//       write the Claude requests still missing from both corpora to <work>/requests.json
//   node scripts/generate-api.mjs batch submit|status|collect
//       send them through the Message Batches API, follow the batch, save the results
//
// Options: --work DIR (batch files; default: a folder in the system temp directory).
// Keys come from OPENAI_API_KEY and ANTHROPIC_API_KEY in the environment only.
// Languages default to de es it nl.
//
// How the corpora on disk were made (2026-11-05):
//   ai-multi-holdout: seven genres times eight topics per language. Claude Opus 5.5,
//   Sonnet 5.5, Haiku 5.5 and Sonnet 4.5 answered all 56 requests; to keep the cost
//   down, GPT-5.5 answered the six short genres on topic 1 and GPT-5.4 mini the six
//   short genres on topics 1 to 4. The OpenAI rows and part of the Claude rows came
//   from `live`, the remaining Claude rows from `batch`.
//   ai-detailed-holdout: the 112 requests per language in scripts/detailed-requests/
//   (56 scenarios from scripts/detailed-scenarios.md, each as a short request A and a
//   careful request B), answered by the four Claude models through `batch`.
// No system prompt is sent, sampling is left at the provider defaults and replies may
// run to 16,000 tokens, so a model sees nothing but the request. A reply that did not
// end normally or is shorter than 200 characters is not saved: `live` asks once more,
// `batch collect` lists it in <work>/retry.json and a new `batch build` picks it up.
//
// Rows already in a corpus are skipped, so an interrupted run resumes; each corpus
// file is rewritten in request order at the end.

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readJson } from './lib/json.mjs';
import { languageDir, ROOT } from './lib/languages.mjs';

const LANGS = ['de', 'es', 'it', 'nl'];
const MODELS = [
  { provider: 'openai', model: 'gpt-5.5', short: 'gpt55', topics: 1, skip: ['longform'] },
  { provider: 'openai', model: 'gpt-5.4-mini', short: 'gpt54mini', topics: 4, skip: ['longform'] },
  { provider: 'anthropic', model: 'claude-opus-5-5', short: 'opus55' },
  { provider: 'anthropic', model: 'claude-sonnet-5-5', short: 'sonnet55' },
  { provider: 'anthropic', model: 'claude-haiku-5-5', short: 'haiku55' },
  { provider: 'anthropic', model: 'claude-sonnet-4-5', short: 'sonnet45' },
];
// The detailed corpus is answered by the Claude models only.
const DETAILED_MODELS = MODELS.filter((m) => m.provider === 'anthropic');
const MAX_TOKENS = 16000;
const MIN_CHARS = 200;
const PARALLEL = 6;
const ANTHROPIC = 'https://api.anthropic.com/v1/messages';
const OPENAI = 'https://api.openai.com/v1/chat/completions';

const USAGE = [
  'usage: node scripts/generate-api.mjs live [lang ...]',
  '       node scripts/generate-api.mjs batch build [lang ...] [--work DIR]',
  '       node scripts/generate-api.mjs batch submit|status|collect [--work DIR]',
].join('\n');
const usageError = (message) => {
  console.error(`${message}\n${USAGE}`);
  process.exit(2);
};

const args = process.argv.slice(2);
const workAt = args.indexOf('--work');
let work = join(tmpdir(), 'humanizer-lists-batch');
if (workAt >= 0) {
  if (!args[workAt + 1] || args[workAt + 1].startsWith('--')) usageError('--work needs a value');
  work = args[workAt + 1];
  args.splice(workAt, 2);
}

const corpusFile = (lang, set) => join(languageDir(lang), 'eval', 'corpus', `ai-${set}-holdout.jsonl`);
const readRows = (file) => (existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const usable = (stop, text) => ['stop', 'end_turn'].includes(stop) && text.trim().length >= MIN_CHARS;

/** Every request of both corpora for `langs`, in corpus order: { set, lang, id, genre, m, request, ... }. */
function allJobs(langs) {
  const plain = readJson(join(ROOT, 'scripts', 'multi-requests.json'));
  const list = [];
  for (const lang of langs) {
    const { genres, topics } = plain[lang];
    for (const [genre, template] of Object.entries(genres))
      topics.forEach((topic, i) => {
        for (const m of MODELS) {
          if (m.skip?.includes(genre) || (m.topics && i >= m.topics)) continue;
          list.push({ set: 'multi', lang, id: `${genre}-${i + 1}-${m.short}`, genre, m, request: template.replace('{t}', topic) });
        }
      });
    for (const p of readJson(join(ROOT, 'scripts', 'detailed-requests', `${lang}.json`)).prompts)
      for (const m of DETAILED_MODELS)
        list.push({ set: 'detailed', lang, id: `${p.id}-${m.short}`, genre: p.genre, m, request: p.request, style: p.style, scenario: p.scenario, variety: p.variety });
  }
  return list;
}

/** The jobs whose rows are not yet in their corpus file. */
function missingJobs(langs) {
  const done = new Map();
  const doneIn = (lang, set) => {
    const key = `${lang}/${set}`;
    if (!done.has(key)) done.set(key, new Set(readRows(corpusFile(lang, set)).map((r) => r.id)));
    return done.get(key);
  };
  return allJobs(langs).filter((job) => !doneIn(job.lang, job.set).has(job.id));
}

const row = (job, { model, stop, text }) => ({
  id: job.id,
  generator: job.m.short,
  provider: job.m.provider,
  model,
  genre: job.genre,
  ...(job.set === 'detailed' ? { style: job.style, scenario: job.scenario, ...(job.variety ? { variety: job.variety } : {}) } : {}),
  request: job.request,
  stop,
  text,
});

/** Rewrites each corpus file of `langs` in request order. */
function sortCorpora(langs) {
  const order = new Map(allJobs(langs).map((job, i) => [`${job.lang}/${job.set}/${job.id}`, i]));
  for (const lang of langs)
    for (const set of ['multi', 'detailed']) {
      const file = corpusFile(lang, set);
      const rows = readRows(file);
      if (!rows.length) continue;
      const unknown = rows.filter((r) => !order.has(`${lang}/${set}/${r.id}`)).map((r) => r.id);
      if (unknown.length) throw new Error(`${file} has rows with no matching request: ${unknown.join(', ')}`);
      rows.sort((a, b) => order.get(`${lang}/${set}/${a.id}`) - order.get(`${lang}/${set}/${b.id}`));
      writeFileSync(file, rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
    }
}

const anthropicHeaders = () => ({ 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' });
const claudeParams = (job) => ({ model: job.m.model, max_tokens: MAX_TOKENS, messages: [{ role: 'user', content: job.request }] });
const textOf = (message) => (message.content ?? []).filter((b) => b.type === 'text').map((b) => b.text).join('');

const ATTEMPTS = 6;
const RETRY_STATUS = [429, 500, 502, 503, 504, 529];

/** Milliseconds to wait before attempt `attempt + 1`: the server's Retry-After when it sends one, else a growing pause. */
function waitFor(res, attempt) {
  const header = res?.headers.get('retry-after');
  const seconds = Number(header);
  if (header && Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = header ? Date.parse(header) : NaN;
  if (Number.isFinite(date)) return Math.max(0, date - Date.now());
  return 2000 * attempt;
}

async function post(url, headers, body) {
  for (let attempt = 1; ; attempt++) {
    let res;
    try {
      res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
    } catch (error) {
      // A dropped connection or a timeout is as passing as a 5xx.
      if (attempt >= ATTEMPTS) throw error;
      await new Promise((resolve) => setTimeout(resolve, waitFor(null, attempt)));
      continue;
    }
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
    const retry = RETRY_STATUS.includes(res.status) && attempt < ATTEMPTS;
    if (!retry) throw new Error(`${res.status} ${data?.error?.message ?? ''}`.trim());
    await new Promise((resolve) => setTimeout(resolve, waitFor(res, attempt)));
  }
}

async function ask(job) {
  if (job.m.provider === 'openai') {
    const data = await post(OPENAI, { authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, {
      model: job.m.model,
      messages: [{ role: 'user', content: job.request }],
      max_completion_tokens: MAX_TOKENS,
    });
    return { model: data.model, stop: data.choices?.[0]?.finish_reason, text: data.choices?.[0]?.message?.content ?? '' };
  }
  const data = await post(ANTHROPIC, anthropicHeaders(), claudeParams(job));
  return { model: data.model, stop: data.stop_reason, text: textOf(data) };
}

async function live(langs) {
  const jobs = missingJobs(langs).filter((job) => job.set === 'multi');
  for (const provider of new Set(jobs.map((job) => job.m.provider))) {
    const key = provider === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
    if (!process.env[key]) usageError(`${key} is not set`);
  }
  let next = 0;
  let failed = 0;
  await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      while (next < jobs.length) {
        const job = jobs[next++];
        try {
          let reply = await ask(job);
          if (!usable(reply.stop, reply.text)) reply = await ask(job);
          if (!usable(reply.stop, reply.text)) throw new Error(`unusable reply: ${reply.stop}, ${reply.text.length} characters`);
          appendFileSync(corpusFile(job.lang, job.set), JSON.stringify(row(job, reply)) + '\n');
        } catch (error) {
          failed++;
          console.error(`${job.lang} ${job.id}: ${error.message}`);
        }
      }
    }),
  );
  sortCorpora(langs);
  console.log(`done: ${jobs.length - failed} of ${jobs.length}, failed ${failed}`);
}

const customId = (job) => `${job.set}__${job.lang}__${job.id}`;

async function call(url, init) {
  const res = await fetch(url, { headers: anthropicHeaders(), ...init });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${body.slice(0, 300)}`);
  return body;
}

async function batch(command, langs) {
  mkdirSync(work, { recursive: true });
  const requestsFile = join(work, 'requests.json');
  const idFile = join(work, 'batch-id.txt');
  if (command === 'build') {
    const jobs = missingJobs(langs).filter((job) => job.m.provider === 'anthropic');
    writeFileSync(requestsFile, JSON.stringify({ langs, requests: jobs.map((job) => ({ custom_id: customId(job), params: claudeParams(job) })) }));
    console.log(`${jobs.length} requests in ${requestsFile}`);
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) usageError('ANTHROPIC_API_KEY is not set');
  if (command === 'submit') {
    const { requests } = readJson(requestsFile);
    const created = JSON.parse(await call(`${ANTHROPIC}/batches`, { method: 'POST', body: JSON.stringify({ requests }) }));
    writeFileSync(idFile, created.id);
    console.log(created.id, created.processing_status, created.request_counts);
    return;
  }
  const id = readFileSync(idFile, 'utf8').trim();
  const status = JSON.parse(await call(`${ANTHROPIC}/batches/${id}`, { method: 'GET' }));
  if (command === 'status') {
    console.log(status.processing_status, status.request_counts);
    return;
  }
  if (status.processing_status !== 'ended') throw new Error(`batch is ${status.processing_status}`);
  const built = readJson(requestsFile).langs;
  const byId = new Map(missingJobs(built).map((job) => [customId(job), job]));
  const results = (await call(status.results_url, { method: 'GET' })).split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const retry = [];
  let saved = 0;
  for (const result of results) {
    const job = byId.get(result.custom_id);
    if (!job) continue;
    const message = result.result.message;
    if (result.result.type === 'succeeded' && usable(message.stop_reason, textOf(message))) {
      appendFileSync(corpusFile(job.lang, job.set), JSON.stringify(row(job, { model: message.model, stop: message.stop_reason, text: textOf(message) })) + '\n');
      saved++;
    } else retry.push({ custom_id: result.custom_id, type: result.result.type, stop: message?.stop_reason });
  }
  writeFileSync(join(work, 'retry.json'), JSON.stringify(retry, null, 1));
  sortCorpora(built);
  console.log(`saved ${saved}, not usable ${retry.length} (listed in ${join(work, 'retry.json')})`);
}

const [mode, ...rest] = args;
if (mode === 'live') {
  const langs = rest.length ? rest : LANGS;
  const unknown = langs.filter((lang) => !LANGS.includes(lang));
  if (unknown.length) usageError(`no requests for: ${unknown.join(', ')}`);
  await live(langs);
} else if (mode === 'batch' && ['build', 'submit', 'status', 'collect'].includes(rest[0])) {
  const langs = rest.slice(1).length ? rest.slice(1) : LANGS;
  const unknown = langs.filter((lang) => !LANGS.includes(lang));
  if (unknown.length) usageError(`no requests for: ${unknown.join(', ')}`);
  if (rest[0] !== 'build' && rest.length > 1) usageError(`batch ${rest[0]} takes no language`);
  await batch(rest[0], langs);
} else usageError(mode ? `unknown command: ${[mode, ...rest].join(' ')}` : 'no command');
