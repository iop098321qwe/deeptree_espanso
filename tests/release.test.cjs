const assert = require('node:assert/strict');
const { test } = require('node:test');
const { assertBranch, extractNotes, publishingEnabled, selectTag } =
  require('../scripts/release.cjs');

test('publishing requires explicit opt-in and rejects typos', () => {
  assert.equal(publishingEnabled({}), false);
  assert.equal(publishingEnabled({ RELEASE_PUBLISH: '0' }), false);
  assert.equal(publishingEnabled({ RELEASE_PUBLISH: '1' }), true);
  assert.throws(() => publishingEnabled({ RELEASE_PUBLISH: 'yes' }));
});

test('branch guard rejects detached HEAD and requires an exact match', () => {
  assert.doesNotThrow(() => assertBranch('main', 'main'));
  assert.doesNotThrow(() => assertBranch('feature/test', 'feature/test'));
  assert.throws(() => assertBranch('', 'main'));
  assert.throws(() => assertBranch('develop', 'main'));
});

test('notes match verg: preamble and first release, not the second', () => {
  const first = '# Changelog\n\nIntroduction.\n\n' +
    '## [0.2.6](url) (2026-11-10)\n\n### Bug Fixes\n\n* Fix\n\n';
  assert.equal(extractNotes(first + '## [0.2.5](url)\n\n* Older\n'), first);
});

test('notes retain Unreleased and a final section without newline', () => {
  const input = '# Changelog\n\n## [Unreleased]\n\nPending\n\n' +
    '## [1.0.0]\n\n### Features\n\n* Feature';
  assert.equal(extractNotes(input), input);
  assert.throws(() => extractNotes('# Changelog\n## [Unreleased]\n'));
  assert.throws(() => extractNotes(''));
});

test('notes preserve CRLF and nested headings', () => {
  const first = '# Changelog\r\n## [1.0.0]\r\n### Fixes\r\n* Fix\r\n';
  assert.equal(extractNotes(first + '## [0.9.0]\r\n'), first);
});

test('tag selection supports custom prefixes and rejects ambiguity', () => {
  assert.equal(selectTag(['hooks-test-v0.2.6-test.0'], '0.2.6-test.0'),
    'hooks-test-v0.2.6-test.0');
  assert.throws(() => selectTag([], '0.2.6'));
  assert.throws(() => selectTag(['v0.2.6', 'test-v0.2.6'], '0.2.6'));
  assert.equal(selectTag(['v0.2.6', 'test-v0.2.6'], '0.2.6', 'test-v0.2.6'),
    'test-v0.2.6');
  assert.throws(() => selectTag(['v0.2.5'], '0.2.6', 'v0.2.5'));
});
