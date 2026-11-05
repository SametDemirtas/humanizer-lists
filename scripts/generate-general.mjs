#!/usr/bin/env node
// Builds a general machine corpus: Claude Sonnet and Claude Haiku answering the
// plain requests in a requests file (six genres, eight topics per language).
// Needs the Claude Code CLI (`claude`) and an account.
//
//   node scripts/generate-general.mjs [--requests FILE] [--name NAME] de es it nl
//
// Defaults: --requests scripts/general-requests.json --name ai-general.
// The held-out set was made with
//   --requests scripts/general-requests-holdout.json --name ai-general-holdout
//
// Each call runs in an empty temporary directory, with no tools, no settings,
// no MCP servers and no CLAUDE.md. The models never see a pattern list.
// Claude Code still adds the account's email address to the context, and the
// models used it to sign emails with the account owner's name. The system
// prompt below therefore tells them to ignore it. A reply that still contains
// the local user name or a word listed in GENERATE_PRIVATE_WORDS (separated by
// |, for example a first and last name) is discarded and requested again, up
// to five times; each row records how many replies were discarded
// (`discarded`), the system prompt and the resolved model id.
//
// Each row also records the exact request it answered (`request`). That field,
// not the requests file, is the record for a corpus already on disk: the
// Italian corpora were asked with "su" before the article ("su il lavoro"),
// while the Italian topics in the requests files carry the joined form
// ("sul lavoro").

import { execFile } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir, userInfo } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { readJson } from './lib/json.mjs';
import { languageDir, ROOT } from './lib/languages.mjs';

const run = promisify(execFile);
const MODELS = ['sonnet', 'haiku'];
const PARALLEL = 8;
const SYSTEM_PROMPT =
  'You are a helpful assistant. You know nothing about the user: ignore any name, email address or file path that appears in your context.';

const USAGE = 'usage: node scripts/generate-general.mjs [--requests FILE] [--name NAME] <lang> ...';
const usageError = (message) => {
  console.error(`${message}\n${USAGE}`);
  process.exit(2);
};

const args = process.argv.slice(2);
const option = (flag, fallback) => {
  const at = args.indexOf(flag);
  if (at < 0) return fallback;
  const value = args[at + 1];
  if (value === undefined || value.startsWith('--')) usageError(`${flag} needs a value`);
  args.splice(at, 2);
  return value;
};
const requestsFile = option('--requests', join(ROOT, 'scripts', 'general-requests.json'));
const name = option('--name', 'ai-general');
const requests = readJson(requestsFile);
const unknown = args.filter((language) => !requests[language]);
if (!args.length || unknown.length) usageError(unknown.length ? `no requests for: ${unknown.join(', ')}` : 'no language named');
const cwd = mkdtempSync(join(tmpdir(), 'gen-'));
// Words that must not appear in a reply. Words of one or two letters would match inside ordinary words.
const escape = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const privateWords = [userInfo().username, ...(process.env.GENERATE_PRIVATE_WORDS ?? '').split('|')]
  .map((word) => word.trim())
  .filter((word) => word.length > 2);
const PRIVATE = privateWords.length ? new RegExp(privateWords.map(escape).join('|'), 'i') : null;
const isPrivate = (text) => PRIVATE !== null && PRIVATE.test(text);

async function answer(model, prompt) {
  const flags = ['-p', '--model', model, '--output-format', 'json', '--system-prompt', SYSTEM_PROMPT, '--tools', '',
    '--strict-mcp-config', '--setting-sources', '', '--no-session-persistence', prompt];
  for (let attempt = 1; ; attempt++) {
    try {
      const { stdout } = await run('claude', flags, { cwd, maxBuffer: 1 << 24, timeout: 300_000 });
      const reply = JSON.parse(stdout);
      if (reply.is_error || !reply.result?.trim()) throw new Error('empty or failed answer');
      return { text: reply.result.trim(), model: Object.keys(reply.modelUsage ?? {}).join(',') };
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
}

for (const language of args) {
  const { genres, topics } = requests[language];
  const jobs = [];
  for (const [genre, template] of Object.entries(genres)) {
    topics.forEach((topic, t) => {
      for (const model of MODELS) jobs.push({ id: `${genre}-${t + 1}-${model}`, generator: `claude-${model}`, genre, request: template.replace('{t}', topic) });
    });
  }
  const done = new Array(jobs.length);
  const failed = [];
  let next = 0;
  await Promise.all(Array.from({ length: PARALLEL }, async () => {
    while (next < jobs.length) {
      const i = next++;
      // One failing request must not stop the other workers or lose the rows they finished.
      try {
        let discarded = 0;
        let reply = await answer(jobs[i].generator.replace('claude-', ''), jobs[i].request);
        while (isPrivate(reply.text)) {
          if (++discarded === 5) throw new Error("five replies contained the account owner's name");
          reply = await answer(jobs[i].generator.replace('claude-', ''), jobs[i].request);
        }
        done[i] = { ...jobs[i], model: reply.model, system: SYSTEM_PROMPT, discarded, text: reply.text };
        process.stdout.write('.');
      } catch (error) {
        failed.push(`${language} ${jobs[i].id}: ${error.message}`);
        process.stdout.write('x');
      }
    }
  }));
  const rows = done.filter(Boolean);
  writeFileSync(join(languageDir(language), 'eval', 'corpus', `${name}.jsonl`), rows.map((row) => JSON.stringify(row)).join('\n') + '\n');
  console.log(`\n${language}: ${rows.length} of ${jobs.length} texts`);
  if (failed.length) {
    console.error(failed.join('\n'));
    process.exitCode = 1;
  }
}
