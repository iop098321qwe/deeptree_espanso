const { spawnSync } = require('node:child_process');
const { accessSync, constants, existsSync } = require('node:fs');
const { resolve } = require('node:path');

function run(command, args, { capture = false, input } = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: capture ? 'pipe' : [input === undefined ? 'inherit' : 'pipe',
      'inherit', 'inherit'],
    input,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed` +
      (result.stderr ? `: ${result.stderr.trim()}` : ''));
  }
  return result.stdout || '';
}

function git(...args) {
  return run('git', args, { capture: true }).trim();
}

function publishingEnabled(env = process.env) {
  if (!['0', '1', undefined].includes(env.RELEASE_PUBLISH)) {
    throw new Error('RELEASE_PUBLISH must be 0 or 1.');
  }
  return env.RELEASE_PUBLISH === '1';
}

function assertBranch(branch, expected = process.env.RELEASE_BRANCH || 'main') {
  if (!branch || branch !== expected) {
    throw new Error(`Release requires branch ${expected}; found ` +
      `${branch || 'detached HEAD'}. Set RELEASE_BRANCH explicitly to test.`);
  }
}

function assertRoot() {
  if (resolve(git('rev-parse', '--show-toplevel')) !== process.cwd()) {
    throw new Error('Run release commands from the repository root.');
  }
}

function assertClean() {
  if (git('status', '--porcelain', '--untracked-files=normal')) {
    throw new Error('Commit or stash all changes before releasing. ' +
      'commitAll includes every staged file.');
  }
}

function zensical() {
  const local = resolve('.venv/bin/zensical');
  const command = existsSync(local) ? local : 'zensical';
  run(command, ['--version'], { capture: true });
  return command;
}

function check() {
  assertRoot();
  assertBranch(git('branch', '--show-current'));
  assertClean();
  const publish = publishingEnabled();
  zensical();
  accessSync('node_modules/prettier/bin/prettier.cjs', constants.R_OK);
  if (publish) {
    git('remote', 'get-url', 'origin');
    run('gh', ['auth', 'status'], { capture: true });
  }
  console.log(publish ? 'Preflight passed; publishing a draft is enabled.' :
    'Preflight passed; local release only (RELEASE_PUBLISH is not 1).');
}

function site() {
  assertRoot();
  run(zensical(), ['build', '--clean']);
  run(process.execPath, ['node_modules/prettier/bin/prettier.cjs',
    '--write', '--ignore-unknown', 'site']);
  // Stage generated additions, modifications, and deletions, and nothing else.
  run('git', ['add', '-A', '--', 'site']);
}

// Match verg's awk selection: retain the preamble and optional Unreleased
// section, then the first release through (but not including) the next ##.
function extractNotes(changelog) {
  const lines = changelog.match(/[^\n]*\n|[^\n]+$/g) || [];
  let found = false;
  const notes = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (found) break;
      if (!line.startsWith('## [Unreleased]')) found = true;
    }
    notes.push(line);
  }
  if (!found) throw new Error('No release section found in CHANGELOG.md.');
  return notes.join('');
}

function selectTag(tags, version, requested) {
  const matches = tags.filter((tag) => tag.endsWith(version));
  if (requested) {
    if (!matches.includes(requested)) {
      throw new Error('Requested tag must point at HEAD and end in ' + version);
    }
    return requested;
  }
  if (matches.length !== 1) {
    throw new Error('Expected one release tag on HEAD; pass the exact tag ' +
      'to npm run release:publish -- <tag> when retrying.');
  }
  return matches[0];
}

function publish(requested) {
  assertRoot();
  if (!publishingEnabled()) {
    console.log('Local release complete. No push or GitHub release attempted.');
    return;
  }
  const branch = git('branch', '--show-current');
  assertBranch(branch);
  assertClean();
  const { version } = JSON.parse(git('show', 'HEAD:package.json'));
  const tags = git('tag', '--points-at', 'HEAD').split('\n').filter(Boolean);
  const tag = selectTag(tags, version, requested);
  const notes = extractNotes(run('git', ['show', 'HEAD:CHANGELOG.md'],
    { capture: true }));
  run('gh', ['auth', 'status'], { capture: true });
  // Push only this branch and tag, together. Do not implicitly follow tags.
  run('git', ['-c', 'push.followTags=false', 'push', '--atomic', 'origin',
    `refs/heads/${branch}:refs/heads/${branch}`,
    `refs/tags/${tag}:refs/tags/${tag}`]);
  run('gh', ['release', 'create', tag, '--verify-tag', '--draft',
    ...(version.includes('-') ? ['--prerelease'] : []),
    '--title', tag, '--notes-file', '-'], { input: notes });
  console.log(`Draft created for ${tag}; it has not been published.`);
}

if (require.main === module) {
  try {
    const [action, tag, ...extra] = process.argv.slice(2);
    if (extra.length || (action !== 'publish' && tag)) {
      throw new Error('Unexpected release arguments.');
    }
    if (action === 'check') check();
    else if (action === 'site') site();
    else if (action === 'publish') publish(tag);
    else throw new Error('Expected check, site, or publish.');
  } catch (error) {
    console.error(`Release failed: ${error.message}`);
    console.error('Inspect local state before retrying. If a release tag ' +
      'already exists, retry publishing only; do not rerun versioning.');
    process.exitCode = 1;
  }
}

module.exports = { assertBranch, extractNotes, publishingEnabled, selectTag };
