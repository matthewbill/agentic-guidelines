# agentic-guidelines

CLI tool to setup shared coding guidelines for Claude Code across multiple repositories.

## What it does

1. Downloads shared guidelines from GitHub to `docs/guidelines/`
2. Configures `.claude/settings.json` with a SessionStart hook to auto-load guidelines
3. Adds a `sync:guidelines` npm script for future updates

## Usage

### First-time setup

```bash
npx agentic-guidelines
```

This will:

- Download guidelines to `docs/guidelines/`
- Create/update `.claude/settings.json` with the SessionStart hook
- Add `sync:guidelines` script to your `package.json` (creates `package.json` if it doesn't exist)

### Update guidelines

```bash
npm run sync:guidelines
```

Or:

```bash
npx agentic-guidelines --sync
```

### Options

| Option | Description |
|--------|-------------|
| `--help`, `-h` | Show help message |
| `--sync` | Only sync guidelines (skip config updates) |
| `--force` | Overwrite existing files without prompting |
| `--repo <repo>` | GitHub repo to pull guidelines from (default: `gh:matthewbill/agentic-guidelines/guidelines`) |
| `--token <token>` | GitHub token for private repos |
| `--folders <list>` | Comma-separated list of folders to download |

### Using a custom repo

```bash
npx agentic-guidelines --repo gh:myorg/my-guidelines/guidelines
```

### Downloading specific folders

Only download the folders you need:

```bash
npx agentic-guidelines --folders ux,testing,languages/react
```

This downloads:

- `guidelines/ux` → `docs/guidelines/ux`
- `guidelines/testing` → `docs/guidelines/testing`
- `guidelines/languages/react` → `docs/guidelines/languages/react`

### Private repos

For private repositories, provide a GitHub token:

```bash
npx agentic-guidelines --repo gh:myorg/private-repo/guidelines --token ghp_xxx
```

Or set the `GITHUB_TOKEN` environment variable:

```bash
GITHUB_TOKEN=ghp_xxx npx agentic-guidelines --repo gh:myorg/private-repo/guidelines
```

Note: The `--token` flag is only used for the initial setup. The generated `sync:guidelines` script does not include the token - set `GITHUB_TOKEN` as an environment variable when running sync for private repos.

## How it works with Claude Code

When you start a Claude Code session, the SessionStart hook runs:

```bash
cat docs/guidelines/guidelines.md
```

This injects the guidelines into Claude's context.

## License

MIT
