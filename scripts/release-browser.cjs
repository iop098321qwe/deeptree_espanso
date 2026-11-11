const { spawn } = require('node:child_process');
const { accessSync, constants } = require('node:fs');
const { delimiter, join } = require('node:path');

const browsers = {
  'brave-origin.desktop': [['brave-origin'], 'brave-origin'],
  'brave-browser.desktop': [['brave', 'brave-browser'], 'brave-browser'],
  'brave.desktop': [['brave', 'brave-browser'], 'brave-browser'],
  'chromium.desktop': [['chromium', 'chromium-browser'], 'chromium'],
  'chromium-browser.desktop': [['chromium', 'chromium-browser'], 'chromium'],
  'google-chrome.desktop': [
    ['google-chrome-stable', 'google-chrome'], 'google-chrome',
  ],
  'microsoft-edge.desktop': [
    ['microsoft-edge-stable', 'microsoft-edge'], 'microsoft-edge',
  ],
  'firefox.desktop': [['firefox'], 'firefox'],
  'org.mozilla.firefox.desktop': [['firefox'], 'firefox'],
};

function executable(command, env = process.env) {
  return (env.PATH || '').split(delimiter).some((directory) => {
    try {
      accessSync(join(directory, command), constants.X_OK);
      return true;
    } catch {
      return false;
    }
  });
}

function editUrl(output) {
  const line = output.split(/\r?\n/).find((value) =>
    /^https?:\/\//.test(value.trim()));
  if (!line) throw new Error('GitHub CLI did not return a release URL.');
  const url = new URL(line.trim());
  if (!/\/releases\/(tag|edit)\/[^/]+\/?$/.test(url.pathname)) {
    throw new Error('GitHub CLI returned an unexpected release URL.');
  }
  url.pathname = url.pathname.replace('/releases/tag/', '/releases/edit/');
  return url.href;
}

function selectWindow(clients, browserClass) {
  if (!Array.isArray(clients)) {
    throw new Error('Invalid browser window inventory.');
  }
  // Exact classes exclude web apps. Titles are a best-effort privacy filter;
  // native non-private browser URL handling remains the final boundary.
  const window = clients.filter((client) => client.mapped === true &&
    typeof client.class === 'string' &&
    client.class.toLowerCase() === browserClass &&
    !/private|incognito|inprivate|guest/i.test(
      `${client.initialTitle || ''} ${client.title || ''}`))
    .sort((a, b) => (a.focusHistoryID ?? 2147483647) -
      (b.focusHistoryID ?? 2147483647))[0];
  const address = window?.address || '';
  if (address && !/^0x[\da-f]+$/i.test(address)) {
    throw new Error('Invalid browser window address.');
  }
  return address;
}

function launchBrowser(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { detached: true, stdio: 'ignore' });
    child.once('error', reject);
    child.once('spawn', () => {
      child.unref();
      resolve();
    });
  });
}

async function openDraft(output, {
  run, env = process.env, has = executable, launch = launchBrowser,
  log = console.log, warn = console.warn,
}) {
  if (env.RELEASE_OPEN_BROWSER === '0') return;
  let url;
  try {
    url = editUrl(output);
    log(`Draft editor: ${url}`);
    log('Waiting 4 seconds before opening the draft editor...');
    run('sleep', ['4']);
    const desktop = (has('omarchy-cmd-default-browser', env) ?
      run('omarchy-cmd-default-browser', [], { capture: true }) :
      run('xdg-settings', ['get', 'default-web-browser'], { capture: true }))
      .trim();
    const config = Object.hasOwn(browsers, desktop) && browsers[desktop];
    if (!config) throw new Error(`Unsupported default browser: ${desktop}`);
    const [candidates, browserClass] = config;
    const browser = candidates.find((command) => has(command, env));
    if (!browser) throw new Error('Default browser executable not found.');
    if (!env.HYPRLAND_INSTANCE_SIGNATURE || !has('hyprctl', env)) {
      throw new Error('Safe window selection requires Hyprland and hyprctl.');
    }
    const clients = JSON.parse(run('hyprctl', ['clients', '-j'],
      { capture: true }));
    const address = selectWindow(clients, browserClass);
    if (address) {
      try {
        run('hyprctl', ['dispatch',
          `hl.dsp.focus({ window = "address:${address}" })`],
        { capture: true });
      } catch {
        run('hyprctl', ['dispatch', 'focuswindow', `address:${address}`],
          { capture: true });
      }
    }
    await launch(browser, [address ? '--new-tab' : '--new-window', url]);
    log('Draft editor launch requested.');
  } catch (error) {
    warn('Warning: draft created, but browser opening failed: ' + error.message);
    warn(url ? `Open manually: ${url}` : `Release output: ${output.trim()}`);
  }
}

module.exports = { editUrl, openDraft, selectWindow };
