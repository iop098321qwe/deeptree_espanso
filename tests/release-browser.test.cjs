const assert = require('node:assert/strict');
const { test } = require('node:test');
const { editUrl, openDraft, selectWindow } =
  require('../scripts/release-browser.cjs');

const url = 'https://github.com/owner/repo/releases/tag/v1.0.0';
const editor = url.replace('/tag/', '/edit/');
const client = (overrides = {}) => ({ mapped: true, class: 'chromium',
  address: '0x123', title: 'Normal', focusHistoryID: 1, ...overrides });

function harness(overrides = {}) {
  const calls = [];
  const warnings = [];
  const options = {
    env: { HYPRLAND_INSTANCE_SIGNATURE: 'test' },
    has: (command) => ['omarchy-cmd-default-browser', 'hyprctl', 'chromium']
      .includes(command),
    run: (command, args) => {
      calls.push([command, ...args]);
      if (command === 'omarchy-cmd-default-browser') {
        return 'chromium.desktop\n';
      }
      if (command === 'hyprctl' && args[0] === 'clients') {
        return JSON.stringify([client()]);
      }
      return '';
    },
    launch: async (command, args) => calls.push([command, ...args]),
    log: () => {},
    warn: (message) => warnings.push(message),
    ...overrides,
  };
  return { calls, warnings, options };
}

test('release URLs convert to editor URLs without losing encoded tags', () => {
  assert.equal(editUrl(url + '\n'), editor);
  assert.equal(editUrl(editor), editor);
  assert.equal(editUrl(url + '%2Ftest'), editor + '%2Ftest');
  assert.throws(() => editUrl(''));
  assert.throws(() => editUrl('https://github.com/unexpected'));
});

test('selection excludes apps and private windows and sorts focus', () => {
  assert.equal(selectWindow([
    client({ class: 'chromium-app', focusHistoryID: 0 }),
    client({ title: 'Incognito', focusHistoryID: 0 }),
    client({ initialTitle: 'Private Browsing', focusHistoryID: 0 }),
    client({ title: 'Guest', focusHistoryID: 0 }),
    client({ mapped: false, focusHistoryID: 0 }),
    client({ address: '0x456', focusHistoryID: 5 }),
    client({ class: 'Chromium' }),
  ], 'chromium'), '0x123');
  assert.equal(selectWindow([], 'chromium'), '');
  assert.throws(() => selectWindow({}, 'chromium'));
  assert.throws(() => selectWindow([client({ address: 'bad' })], 'chromium'));
});

test('opening waits four seconds, focuses normal window, then opens edit tab',
  async () => {
    const { calls, warnings, options } = harness();
    await openDraft(url, options);
    assert.deepEqual(calls[0], ['sleep', '4']);
    assert.match(calls[3][2], /hl\.dsp\.focus/);
    assert.deepEqual(calls.at(-1), ['chromium', '--new-tab', editor]);
    assert.deepEqual(warnings, []);
  });

test('opt-out skips waiting and all browser commands', async () => {
  const { calls, options } = harness({ env: { RELEASE_OPEN_BROWSER: '0' } });
  await openDraft(url, options);
  assert.deepEqual(calls, []);
});

test('no matching normal window opens a new window using xdg fallback',
  async () => {
    const { calls, options } = harness();
    options.has = (command) => ['hyprctl', 'firefox'].includes(command);
    options.run = (command, args) => {
      calls.push([command, ...args]);
      if (command === 'xdg-settings') return 'org.mozilla.firefox.desktop';
      if (args[0] === 'clients') return '[]';
      return '';
    };
    await openDraft(url, options);
    assert.deepEqual(calls.at(-1), ['firefox', '--new-window', editor]);
  });

test('focuswindow fallback works when the Lua dispatcher fails', async () => {
  const { calls, options } = harness();
  const original = options.run;
  options.run = (command, args) => {
    if (args[1]?.startsWith('hl.dsp.focus')) throw new Error('Unsupported');
    return original(command, args);
  };
  await openDraft(url, options);
  assert.ok(calls.some((args) => args[2] === 'focuswindow'));
  assert.deepEqual(calls.at(-1), ['chromium', '--new-tab', editor]);
});

test('missing Hyprland and failed launch only warn with the editor URL',
  async () => {
    for (const overrides of [
      { env: {} },
      { launch: async () => { throw new Error('Launch failed'); } },
      { run: () => { throw new Error('Command failed'); } },
      { has: () => false, run: () => 'web-app.desktop' },
    ]) {
      const { warnings, options } = harness(overrides);
      await assert.doesNotReject(() => openDraft(url, options));
      assert.match(warnings[0], /draft created/);
      assert.equal(warnings.at(-1), `Open manually: ${editor}`);
    }
  });
