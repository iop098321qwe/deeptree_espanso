# Maintainer Releases

Run releases from the repository root with `npm run release`, not `verg`.
The shared `verg` wrapper has its own build, push, and draft steps, which would
duplicate these hooks and bypass the local-only publishing default.

## Setup

Use Node.js 22 or newer, npm, Git, and Python with virtual environment support.
Install the locked Node dependencies and Zensical in this worktree:

```sh
npm ci
python3 -m venv .venv
.venv/bin/pip install zensical
```

The helper prefers `.venv/bin/zensical`, then `zensical` on `PATH`. Zensical is
not currently version-pinned. The Node release and formatting tools are pinned
in `package.json` and `package-lock.json`.

For remote publishing, install GitHub CLI, run `gh auth login`, and verify that
`origin` and GitHub CLI refer to the intended repository. Clear any `GH_REPO`
override pointing elsewhere. Git must have push access to `origin`, and GitHub
CLI must have permission to create releases.

Commit your intended changes before releasing, including the implementation
when testing this experiment. Keep README and agent instructions in separate
documentation commits. Do not stage unrelated files or the user-owned task list.
Preflight rejects staged, unstaged, and untracked changes because `commitAll`
includes every staged file. Ignored virtual environments and dependencies are
allowed. Git commit/tag signing and Commitlint still follow your Git settings.

## What Runs

1. `prerelease` checks the repository root, exact branch, clean worktree,
   Zensical, and local Prettier. With publishing enabled, it also checks
   `origin` and GitHub CLI authentication.
2. The tool bumps `package.json`, `package-lock.json`, and
   `deeptree/_manifest.yml`, then generates `CHANGELOG.md`.
3. `postchangelog` runs `zensical build --clean`, formats supported text files
   under `site/` with Prettier, and stages additions, changes, and deletions
   under `site/`. Binary and unknown file types are skipped.
4. The tool creates one release commit containing versions, changelog, and site
   output, then an annotated version tag. There is no separate site commit.
5. `posttag` stops locally by default. When `RELEASE_PUBLISH=1`, it atomically
   pushes the current branch and exact release tag to `origin`, then creates
   a GitHub draft. Prerelease versions also receive GitHub's prerelease flag.

The build runs after changelog generation so the generated site includes the
new release. Building in `postchangelog` also avoids `precommit`'s special
behavior of interpreting stdout as a replacement release commit message.

Release notes use the same selection as `verg`: the changelog introduction,
any leading `Unreleased` section, and the first release section, ending before
the next level-two release heading. Notes come from the committed changelog,
not GitHub's generated notes. Drafts are never published automatically.

After draft creation, the helper prints its URL, waits four seconds, and opens
the draft editor using `verg`'s browser selection behavior. It detects the
default browser via `omarchy-cmd-default-browser`, falling back to
`xdg-settings`. Supported desktop entries cover Brave, Chromium, Chrome, Edge,
and Firefox. It ignores `$BROWSER` shell commands and web-app desktop entries.

On Hyprland, it selects the most recently focused mapped window with the exact
browser class, excluding titles identifying private/incognito/guest windows.
It focuses that window using the Lua dispatcher with a `focuswindow` fallback,
then requests a new tab; without a matching window it requests a new normal
window. Title filtering is best-effort, not proof of privacy mode; native
non-private browser URL handling remains the final boundary. JavaScript parses
the window inventory, so unlike `verg` this helper does not require `jq`.

Browser opening requires a Hyprland session, `hyprctl`, a supported browser,
and `sleep`. If detection, waiting, focusing, or launching fails, it prints a
warning and the editor URL without failing the already-created draft. Launch
success confirms only that the browser process started, not that the page
loaded. It never falls back to an arbitrary URL opener or web-app window.
Set `RELEASE_OPEN_BROWSER=0` to skip both waiting and opening, for example:

```sh
RELEASE_OPEN_BROWSER=0 RELEASE_PUBLISH=1 npm run release
```

Local-only releases and dry runs never wait or open a browser. The opening step
runs only after creating a new draft, not when inspecting an existing draft.

The Pages workflow independently builds and formats the site on pushes to
`main` or `master`. This keeps deployment formatting consistent, though builds
may differ if the unpinned Zensical version changes. Publishing a draft is not
required for a push to trigger Pages deployment.

## Test Without Publishing

Run the tests first. They use temporary repositories, real Git/versioning and
Prettier, a fake Zensical builder, a local bare remote, and a fake GitHub CLI.
They do not build this worktree's site or contact GitHub.

```sh
npm test
```

The branch guard defaults to `main`. On the experiment branch, explicitly allow
that exact branch and leave publishing off:

```sh
export RELEASE_BRANCH=feature/release-hooks
export RELEASE_PUBLISH=0
npm run release:check
npm run release -- --dry-run --release-as 0.2.6-hooks.0 \
  --tag-prefix hooks-test-v
```

A dry run skips lifecycle script execution. It does not validate building or
publishing, so run `release:check` separately. It also works with uncommitted
changes, whereas preflight for a real release requires a clean worktree.

After reviewing and committing the implementation, run the local experiment:

```sh
npm run release -- --release-as 0.2.6-hooks.0 --tag-prefix hooks-test-v
git status --short --branch
git show --stat HEAD
git tag --points-at HEAD
npm exec -- prettier --check --ignore-unknown site
```

This builds the real site, creates a real local release commit and the tag
`hooks-test-v0.2.6-hooks.0`, but neither pushes nor creates a GitHub release.
Do not reuse that exact version/tag for another release. Use a new prerelease
number, such as `0.2.6-hooks.1`, if you repeat the test.

Worktrees isolate files and branches, but share Git tags and configuration.
The test tag will be visible from your original worktree too. Do not merge
generated experimental release commits into `main`; transfer only the
implementation commits if adopting the workflow.

The first release using a new tag prefix has no matching previous release tag,
so its changelog can include the full repository history. This is expected for
`hooks-test-v`; later releases with that prefix use its matching release tags.
Ignore the tool's generic `npm publish` hint: this is an Espanso package, and
this workflow does not publish anything to the npm registry.

## Publish a Draft

For the experiment, keep `RELEASE_BRANCH=feature/release-hooks`. Publishing
pushes that branch to `origin`; it does not merge it or trigger the main-only
Pages workflow. To publish an already-created local release, run:

```sh
RELEASE_PUBLISH=1 npm run release:publish -- hooks-test-v0.2.6-hooks.0
```

For normal releases, switch to a clean, up-to-date `main`, clear the experiment
override, preview, and then explicitly enable publishing:

```sh
unset RELEASE_BRANCH RELEASE_PUBLISH
npm run release:check
npm run release -- --dry-run
RELEASE_PUBLISH=1 npm run release
```

The last command performs versioning, site generation, commit/tag creation,
push, and draft creation. Review and publish the draft manually on GitHub.
Pass `--release-as` or `--prerelease` after `npm run release --` when needed.
Avoid lifecycle-skipping flags during normal use: they can bypass safeguards
or leave generated files staged without the intended release commit.

## Failures and Recovery

- A preflight failure stops before version/changelog changes.
- A build or formatting failure stops before the release commit/tag, but
  generated version/changelog/site changes may remain. Inspect them before
  deciding how to recover; do not blindly rerun or discard user work.
- A push failure leaves the release commit/tag locally. The push is atomic;
  if the server rejects atomic pushes, neither requested ref is updated.
- A GitHub failure after pushing leaves the commit/tag on the remote. Retry
  publishing only, with the exact existing tag, from the same clean branch:

  ```sh
  RELEASE_PUBLISH=1 npm run release:publish -- <existing-tag>
  ```

  Set `RELEASE_BRANCH` too when retrying from a non-main branch. The tag must
  point at `HEAD` and end in the committed package version. If a draft already
  exists, inspect or edit it with GitHub CLI/the browser rather than trying to
  create it again. Do not rerun versioning to fix a publishing failure.

Branch protection may require a different publication strategy than direct
pushes. This experiment does not bypass branch protection, implement the
interactive `verg` UI, or automatically clean up test branches or tags.
