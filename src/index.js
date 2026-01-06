import { downloadTemplate } from 'giget';
import fs from 'fs';
import path from 'path';

const DEFAULT_REPO = 'gh:matthewbill/agentic-guidelines/guidelines';
const TARGET_DIR = 'docs/guidelines';

export async function setupGuidelines(options = {}) {
  const { syncOnly = false, force = false, repo = DEFAULT_REPO, token = null, folders = null } = options;
  const cwd = process.cwd();
  const auth = token || process.env.GITHUB_TOKEN;

  // Check if target directory exists and warn if not using force
  const targetPath = path.join(cwd, TARGET_DIR);
  if (fs.existsSync(targetPath) && !force && !syncOnly) {
    console.log(`Warning: ${TARGET_DIR} already exists. Use --force to overwrite.`);
    console.log('Continuing with config updates only...');
  } else {
    // Download guidelines from GitHub
    if (folders && folders.length > 0) {
      // Download specific folders
      for (const folder of folders) {
        const folderRepo = `${repo}/${folder}`;
        const folderTarget = `${TARGET_DIR}/${folder}`;
        console.log(`Downloading ${folder} from ${folderRepo}...`);
        await downloadTemplate(folderRepo, {
          dir: folderTarget,
          force: true,
          cwd,
          auth
        });
      }
      console.log(`Guidelines downloaded to ${TARGET_DIR}`);
    } else {
      // Download all
      console.log(`Downloading guidelines from ${repo}...`);
      await downloadTemplate(repo, {
        dir: TARGET_DIR,
        force: true,
        cwd,
        auth
      });
      console.log(`Guidelines downloaded to ${TARGET_DIR}`);
    }
  }

  if (syncOnly) {
    console.log('Sync complete.');
    return;
  }

  // 2. Update .claude/settings.json
  console.log('Updating .claude/settings.json...');
  updateClaudeSettings(cwd);

  // 3. Update package.json
  console.log('Updating package.json...');
  updatePackageJson(cwd, repo, folders);

  console.log('');
  console.log('Setup complete!');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Review the guidelines in docs/guidelines/');
  console.log('  2. Commit the changes to your repo');
  console.log('  3. Run "npm run sync:guidelines" to update in the future');
}

function updateClaudeSettings(cwd) {
  const claudeDir = path.join(cwd, '.claude');
  const claudeSettingsPath = path.join(claudeDir, 'settings.json');

  let claudeSettings = {};

  // Create .claude directory if it doesn't exist
  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
  }

  // Read existing settings if present
  if (fs.existsSync(claudeSettingsPath)) {
    try {
      claudeSettings = JSON.parse(fs.readFileSync(claudeSettingsPath, 'utf8'));
    } catch (err) {
      console.warn('Warning: Could not parse existing settings.json, creating new one');
    }
  }

  // Add or update the SessionStart hook
  claudeSettings.hooks = claudeSettings.hooks || {};

  const hookCommand = {
    type: 'command',
    command: 'cat docs/guidelines/guidelines.md'
  };

  // Check if hook already exists
  const existingHooks = claudeSettings.hooks.SessionStart || [];
  const hookExists = existingHooks.some(
    h => h.type === 'command' && h.command === hookCommand.command
  );

  if (!hookExists) {
    claudeSettings.hooks.SessionStart = [...existingHooks, hookCommand];
  }

  fs.writeFileSync(claudeSettingsPath, JSON.stringify(claudeSettings, null, 2) + '\n');
  console.log('  Added SessionStart hook to .claude/settings.json');
}

function updatePackageJson(cwd, repo, folders) {
  const pkgPath = path.join(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    console.warn('Warning: No package.json found, skipping script addition');
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};

  let syncScript;
  if (folders && folders.length > 0) {
    // Create a script that syncs each folder
    const commands = folders.map(folder =>
      `npx giget ${repo}/${folder} ${TARGET_DIR}/${folder} --force`
    );
    syncScript = commands.join(' && ');
  } else {
    syncScript = `npx giget ${repo} ${TARGET_DIR} --force`;
  }

  if (pkg.scripts['sync:guidelines'] !== syncScript) {
    pkg.scripts['sync:guidelines'] = syncScript;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('  Added sync:guidelines script to package.json');
  } else {
    console.log('  sync:guidelines script already exists');
  }
}
