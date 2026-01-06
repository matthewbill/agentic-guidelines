#!/usr/bin/env node

import { setupGuidelines } from '../src/index.js';

const args = process.argv.slice(2);

function getArgValue(argName) {
  const index = args.findIndex(arg => arg === argName || arg.startsWith(`${argName}=`));
  if (index === -1) return null;
  if (args[index].includes('=')) {
    return args[index].split('=')[1];
  }
  return args[index + 1];
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
setup-guidelines - Setup shared coding guidelines for Claude Code

Usage:
  npx agentic-guidelines [options]

Options:
  --help, -h        Show this help message
  --sync            Only sync guidelines (skip config updates)
  --force           Overwrite existing files without prompting
  --repo <repo>     GitHub repo to pull guidelines from (default: gh:matthewbill/agentic-guidelines/guidelines)
                    Example: --repo gh:myorg/my-guidelines/guidelines
  --token <token>   GitHub token for private repos (or set GITHUB_TOKEN env var)
  --folders <list>  Comma-separated list of folders to download (downloads all if not specified)
                    Example: --folders ux,testing,languages/react

What this does:
  1. Downloads guidelines to docs/guidelines/
  2. Updates .claude/settings.json with SessionStart hook
  3. Adds sync:guidelines script to package.json

Private repos:
  For private repositories, provide a GitHub token:
    npx agentic-guidelines --repo gh:myorg/private-repo/guidelines --token ghp_xxx

  Or set the GITHUB_TOKEN environment variable:
    GITHUB_TOKEN=ghp_xxx npx agentic-guidelines --repo gh:myorg/private-repo/guidelines
`);
  process.exit(0);
}

const foldersArg = getArgValue('--folders');
const repoArg = getArgValue('--repo');
const tokenArg = getArgValue('--token');

const options = {
  syncOnly: args.includes('--sync'),
  force: args.includes('--force'),
  folders: foldersArg ? foldersArg.split(',').map(f => f.trim()) : null
};

if (repoArg) options.repo = repoArg;
if (tokenArg) options.token = tokenArg;

setupGuidelines(options).catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
