const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync,
  rmSync, symlinkSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');
const { test } = require('node:test');
const { extractNotes } = require('../scripts/release.cjs');

const source = resolve(__dirname, '..');
const cli = join(source, 'node_modules/commit-and-tag-version/bin/cli.js');

function fixture(t) {
  const base = existsSync('/tmp/opencode') ? '/tmp/opencode' : tmpdir();
  const root = mkdtempSync(join(base, 'release-hooks-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const env = { ...process.env, HUSKY: '0', RELEASE_PUBLISH: '0',
    RELEASE_BRANCH: 'main', PATH: `${root}/.venv/bin:${process.env.PATH}` };
  delete env.TEST_ZENSICAL_FAIL;
  function execute(command, args, options = {}) {
    return spawnSync(command, args, { cwd: root, env, encoding: 'utf8',
      ...options });
  }
  function git(...args) {
    const result = execute('git', args);
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  }
  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, 'deeptree'));
  mkdirSync(join(root, '.venv/bin'), { recursive: true });
  mkdirSync(join(root, '.cache'));
  copyFileSync(join(source, 'scripts/release.cjs'),
    join(root, 'scripts/release.cjs'));
  copyFileSync(join(source, '.versionrc.json'), join(root, '.versionrc.json'));
  symlinkSync(join(source, 'node_modules'), join(root, 'node_modules'));
  writeFileSync(join(root, '.gitignore'), 'node_modules\n.venv\n.cache\n');
  writeFileSync(join(root, 'package.json'),
    JSON.stringify({ name: 'release-fixture', version: '0.2.5' }) + '\n');
  writeFileSync(join(root, 'package-lock.json'),
    JSON.stringify({ name: 'release-fixture', version: '0.2.5',
      lockfileVersion: 3, packages: { '': { version: '0.2.5' } } }) + '\n');
  writeFileSync(join(root, 'deeptree/_manifest.yml'), 'version: 0.2.5\n');
  writeFileSync(join(root, '.venv/bin/zensical'), `#!/usr/bin/env node
const fs = require('node:fs');
if (process.argv.includes('--version')) process.exit(0);
if (process.env.TEST_ZENSICAL_FAIL === '1') process.exit(1);
fs.mkdirSync('site', { recursive: true });
const notes = fs.readFileSync('CHANGELOG.md', 'utf8');
fs.writeFileSync('site/index.html', '<html><body><pre>' + notes +
  '</pre></body></html>');
`, { mode: 0o755 });
  writeFileSync(join(root, '.venv/bin/gh'), `#!/usr/bin/env node
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync('.cache/gh.log', JSON.stringify(args) + '\\n');
if (args[0] === 'release') {
  fs.writeFileSync('.cache/notes.md', fs.readFileSync(0));
}
`, { mode: 0o755 });
  git('init', '-b', 'main');
  git('config', 'user.name', 'Release Test');
  git('config', 'user.email', 'release-test@example.invalid');
  git('config', 'commit.gpgsign', 'false');
  git('config', 'tag.gpgsign', 'false');
  git('add', '.gitignore', '.versionrc.json', 'package.json',
    'package-lock.json', 'scripts', 'deeptree');
  git('commit', '-m', 'feat: add test fixture');
  git('tag', 'v0.2.5');
  const release = (...args) => execute(process.execPath, [cli, ...args]);
  return { root, env, execute, git, release };
}

test('real release commits fresh formatted site and versions locally', (t) => {
  const { root, git, release } = fixture(t);
  const result = release('--release-as', '0.2.6');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(git('log', '-1', '--format=%s'), 'chore(release): 0.2.6');
  assert.equal(git('tag', '--points-at', 'HEAD'), 'v0.2.6');
  assert.equal(git('status', '--porcelain'), '');
  assert.match(git('show', 'HEAD:site/index.html'), /0\.2\.6/);
  assert.match(git('show', 'HEAD:site/index.html'), /\n  <body>/);
  assert.match(git('show', 'HEAD:deeptree/_manifest.yml'), /0\.2\.6/);
  assert.match(git('show', 'HEAD:package-lock.json'), /0\.2\.6/);
  assert.equal(git('rev-list', '--count', 'HEAD'), '2');
  assert.equal(existsSync(join(root, '.cache/gh.log')), false);
});

test('dry run does not execute hooks, build files, or create commits', (t) => {
  const { root, git, release } = fixture(t);
  const result = release('--dry-run', '--release-as', '0.2.6');
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(existsSync(join(root, 'site')), false);
  assert.equal(existsSync(join(root, 'CHANGELOG.md')), false);
  assert.equal(git('rev-list', '--count', 'HEAD'), '1');
  assert.equal(git('status', '--porcelain'), '');
});

test('dirty preflight aborts before changing versions', (t) => {
  const { root, git, release } = fixture(t);
  writeFileSync(join(root, 'untracked.txt'), 'user work');
  const result = release('--release-as', '0.2.6');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Commit or stash/);
  assert.equal(JSON.parse(readFileSync(join(root, 'package.json'))).version,
    '0.2.5');
  assert.equal(git('rev-list', '--count', 'HEAD'), '1');
});

test('failed site build prevents release commit and tag', (t) => {
  const { env, git, release } = fixture(t);
  env.TEST_ZENSICAL_FAIL = '1';
  assert.notEqual(release('--release-as', '0.2.6').status, 0);
  assert.equal(git('rev-list', '--count', 'HEAD'), '1');
  assert.equal(git('tag', '--list'), 'v0.2.5');
});

test('opt-in pushes exact branch/tag locally and supplies verg notes to gh',
  (t) => {
    const { root, env, execute, git, release } = fixture(t);
    const remote = join(root, '.cache/origin.git');
    assert.equal(execute('git', ['init', '--bare', remote]).status, 0);
    git('remote', 'add', 'origin', remote);
    env.RELEASE_PUBLISH = '1';
    const result = release('--release-as', '0.2.6-test.0',
      '--tag-prefix', 'hooks-test-v');
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(git('--git-dir', remote, 'rev-parse', 'refs/heads/main'),
      git('rev-parse', 'HEAD'));
    assert.equal(git('--git-dir', remote, 'tag', '--list'),
      'hooks-test-v0.2.6-test.0');
    const notes = readFileSync(join(root, '.cache/notes.md'), 'utf8');
    assert.equal(notes, extractNotes(git('show', 'HEAD:CHANGELOG.md') + '\n'));
    const calls = readFileSync(join(root, '.cache/gh.log'), 'utf8')
      .trim().split('\n').map((line) => JSON.parse(line));
    const create = calls.find((args) => args[0] === 'release');
    assert.ok(create.includes('--draft'));
    assert.ok(create.includes('--prerelease'));
    assert.ok(create.includes('--verify-tag'));
  });
