# AGENTS.md

## Purpose

This file guides AI coding agents working in `deeptree_espanso`.
All work must follow best practices and industry standards where
applicable.

## Scope

This file covers repository-wide expectations for Espanso package files,
documentation, generated site output, and git work.
It does not replace verified instructions in source files, tooling configs,
or release automation.

## Formatting Rules

- Keep lines at 80 characters or fewer when practical.
- Allow longer lines only for URLs, code blocks, tables, hashes, or commands
  that cannot be wrapped cleanly.

## Quick Start

- Read `README.md` first for project context and setup notes.
- Run `git status --short --branch` before editing to confirm repo state.
- Run `git diff --stat` before committing to review the change scope.
- Build the generated `site/` directory only when explicitly requested by
  the user; documentation changes do not authorize a build.

## Environment

- Git is required for day-to-day work in this repository.
- Node.js 22 or newer is required by the pinned release tool.
- Node dependencies are defined by `package.json` and `package-lock.json`.
- Commit hooks use Husky and Commitlint.
- Espanso `2.4.0` was verified locally during package conversion work.
- Create the ignored `.venv/` per `docs/releasing.md` for local Zensical use.

## Repository Overview

- `.github/workflows/`: GitHub Pages documentation build and deployment.
- `.husky/`: Git hook scripts for Commitlint.
- `.venv/`: Local Python virtual environment used for Zensical commands.
- `deeptree/`: Espanso external package source.
- `docs/`: Markdown documentation sources for the generated site.
- `node_modules/`: Installed Node dependencies for commits and releases.
- `scripts/`: Release lifecycle helpers.
- `site/`: Generated static documentation output.
- `templates/`: Local technician template files that are not package-managed.
- `tests/`: Node unit and isolated release integration tests.

## Tracked Files Overview

- `.github/workflows/docs.yml`: Builds and deploys docs on `main`/`master`
  pushes.
- `.gitignore`: Excludes local caches, Node dependencies, and the Python venv.
- `.husky/commit-msg`: Runs Commitlint for commit messages.
- `.versionrc.json`: Synchronizes versions and configures release hooks.
- `AGENTS.md`: AI coding agent instructions for this repository.
- `CHANGELOG.md`: Generated changelog; do not edit manually.
- `commitlint.config.cjs`: Conventional Commit lint configuration.
- `deeptree/_manifest.yml`: Espanso package metadata.
- `deeptree/package.yml`: Espanso package entry point and imports.
- `deeptree/README.md`: Package-specific install and variable notes.
- `deeptree/matches/`: Package-managed Espanso match and variable files.
- `deeptree/scripts/`: Scripts called by package snippets.
- `docs/CHANGELOG.md`: Symlink to the release-managed root changelog.
- `docs/README.md`: Symlink to the root README used as the site home page.
- `docs/global-variables.md`: Global values, dependencies, and random options.
- `docs/installation.md`: Installation guide source.
- `docs/releasing.md`: Maintainer release setup, testing, and recovery guide.
- `docs/usage.md`: User guide for package expansions and scripts.
- `docs/updating.md`: Package update guide source.
- `done.txt`: Root completed task list placeholder.
- `inbox.txt.tuxedo-lock`: Blank Tuxedo inbox lock file.
- `LICENSE`: Project license text.
- `package-lock.json`: Locked Node dependency graph.
- `package.json`: Node package metadata and scripts.
- `README.md`: Primary repository overview and setup notes.
- `scripts/release.cjs`: Release checks, site generation, and draft publishing.
- `site/`: Generated static documentation output; summarize as a directory.
- `templates/work_information.yml`: Local technician variable template.
- `tests/release.integration.test.cjs`: Temporary-repository lifecycle tests.
- `tests/release.test.cjs`: Release guard, tag, and notes unit tests.
- `todo.txt`: User-owned task list; agents must not touch it.
- `zensical.toml`: Zensical static site configuration.

## Architecture

- `deeptree/` is an Espanso external package named `deeptree`.
- `deeptree/package.yml` imports separate match files to keep snippets,
  variables, and work categories independently maintainable.
- Package-managed variables live under `deeptree/matches/variables/`.
- Technician-specific variables live in `templates/work_information.yml` and
  must be copied into the user's Espanso match directory outside the package.
- `deeptree/scripts/credential-generator.sh` is called by credential snippets.
- `docs/` is the Markdown source for the generated `site/` directory.
- `docs/README.md` and `docs/CHANGELOG.md` are symlinks to root documents;
  README links must work both in the repository and on the generated site.
- `deeptree/package.yml` imports `variables/static/name.yml` for composed names.
  Only technician values need a local template copy.

## Commands

- `git status --short --branch`: show the current branch and worktree state.
- `git diff --stat`: review the size and spread of pending changes.
- `git log --oneline --decorate -5`: inspect recent commit history.
- `npm ci`: install locked dependencies and initialize Husky.
- `npm test`: run release unit and isolated integration tests.
- `npm run release:check`: check release prerequisites without releasing.
- `npm run release -- --dry-run`: preview without executing lifecycle hooks.
- `npm run release`: build and format docs, then commit and tag locally.
- `RELEASE_PUBLISH=1 npm run release`: also push and create a GitHub draft.
- `npm run format:site`: format supported generated site files with Prettier.
- `./.venv/bin/zensical build`: build the generated documentation site only
  when explicitly requested by the user.
- `espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external`:
  install the package from Git. URL length is an 80-character exception.
- `espanso package update deeptree`: update the installed package.

## Testing

- `npm test` uses Node's test runner with no external test framework.
- Integration tests use temporary repositories and real Git, versioning, and
  Prettier, with fake Zensical/GitHub CLI and a local bare remote.
- Tests do not build this worktree's site or contact GitHub.
- Validate YAML syntax for `deeptree/**/*.yml` and `templates/**/*.yml` when
  changing package files.
- Run an Espanso install smoke test when package layout or metadata changes.

## Linting and Formatting

- Commit messages are linted by Commitlint through `.husky/commit-msg`.
- `npm run format:site` formats generated files with pinned Prettier and skips
  unknown formats. Do not format generated files without explicit permission.
- No source YAML, Markdown, or shell formatter command is defined.
- Keep changes minimal and consistent with the existing file style.

## CI and Release

- Use Conventional Commits for every commit. Prefer a scope when it adds
  clarity.
- Use `npm run release` from the repository root, not the shared `verg`
  wrapper, which duplicates builds and publishing outside these safeguards.
- Pinned `commit-and-tag-version` reads `.versionrc.json` to bump
  `package.json`, `package-lock.json`, and `deeptree/_manifest.yml` together.
- `scripts/release.cjs` requires a clean worktree and defaults to branch
  `main`. `RELEASE_BRANCH` explicitly permits a different exact branch.
- `postchangelog` builds Zensical, formats `site/`, and stages only that
  directory. `commitAll` includes it in the release commit, then tagging runs.
- `posttag` publishes only with `RELEASE_PUBLISH=1`: atomically push the exact
  branch/tag to `origin`, then create a GitHub draft using committed notes.
- Default releases remain local. Neither releases, site builds, nor pushes
  may be run by agents without an explicit user request.
- Preview with `npm run release -- --dry-run`; hooks do not execute in previews.
- Use `docs/releasing.md` for setup, experiment tags, and publishing recovery.
- `.github/workflows/docs.yml` builds with `zensical build --clean` and
  formats the output with Prettier before deploying GitHub Pages on pushes
  to `main` or `master`.
- Never create, edit, or update `CHANGELOG.md` manually.
- `CHANGELOG.md` is generated and maintained by release tooling only.
- If release automation adds or changes generated files, let the tooling own
  those updates.

## Conventions

- Use small, correct changes that fit the existing project structure.
- Keep Espanso package files split by topic unless consolidation is required.
- Give every match a descriptive `name`, `comment`, and search `label`, plus
  a short YAML comment above it explaining its purpose in the existing style.
- Treat match-level `name` and `comment` as documentation metadata. Preserve
  variable `name` values, which are functional references.
- Keep technician-specific values out of the `deeptree` package.
- Agents must never read, create, edit, delete, move, stage, commit, or
  otherwise touch `todo.txt`; only the user may modify it manually.
- Prefer amending small related corrections into the relevant current-branch
  commit instead of creating separate `fixup`, `chore`, or cleanup commits.
- Keep `AGENTS.md` as instructions, not as a changelog, diary, or work log.
- Do not add update notes, status logs, or change summaries to `AGENTS.md`.

## Security and Compliance

- Never commit secrets, credentials, tokens, or private keys.
- Keep personal technician data in local templates or user config, not in the
  package-managed Espanso files.
- Verify new dependencies, automation, and scripts before trusting them.

## Dependencies and Services

- Espanso is the external runtime for package installation and expansion.
- Git is required for installing the private package with `--git`.
- Shell date helpers require a Bourne-compatible shell and GNU `date`.
- Credential scripts require Bash, `sed`, `tr`, and `awk`; direct weekday
  ranges also use `tr`. Script paths use Espanso's `%PACKAGES%` placeholder.
- Node dependencies support commit validation, versioning, and Prettier.
- Zensical generates the static documentation site.
- GitHub CLI is required only for explicitly enabled draft publishing.

## Troubleshooting

- If package installation fails, verify `_manifest.yml`, `package.yml`, and
  `README.md` exist under `deeptree/`.
- If snippets using signatures fail, verify the user copied and configured
  `templates/work_information.yml` in their Espanso match directory. Check the
  package name import and duplicate local globals as in `docs/installation.md`.
- If docs are stale, report that `site/` needs a manual rebuild. Run
  `./.venv/bin/zensical build` only when explicitly requested by the user.
- If publishing fails after tagging, retry only `release:publish` with the
  existing tag as documented in `docs/releasing.md`; do not rerun versioning.
- If generated or managed files change unexpectedly, verify which tool owns
  them before editing.

## Refining Existing AGENTS.md

- Re-check every statement against the repository before keeping it.
- Remove stale, duplicated, or vague guidance.
- Replace placeholders with exact commands, paths, and verified workflows.
- Keep bullets short and easy for AI agents to scan.
- Preserve this section order when improving the file.

## Maintenance

- After every change, without exception, review documentation against the
  current implementation. This applies to code, configuration, package,
  dependency, tooling, and documentation changes, including follow-up edits.
- Always perform the review, even when no documentation update seems needed.
  Inspect the full change set and trace affected behavior and workflows to
  their implementation; do not rely only on which documentation files changed.
- Check the root and package READMEs, `docs/`, and relevant `AGENTS.md`
  guidance for affected instructions, examples, triggers, variables,
  dependencies, paths, links, and workflows.
- Automatically document new or changed behavior that lacks coverage, correct
  existing documentation that no longer matches the implementation, and remove
  or revise obsolete instructions and references as part of the same work.
- Recheck documentation after follow-up edits. Complete necessary corrections
  and verification before declaring work finished or committing and pushing it.
  If accuracy cannot be verified, report the specific blocker.
- Report the documentation review outcome in the final response, including
  when the review finds that no documentation updates are required.
- Preserve generated-file ownership: documentation review does not authorize
  local `site/` builds or manual `CHANGELOG.md` edits.
- After any code, config, or doc change, verify that `AGENTS.md` still
  matches the repository.
- When `AGENTS.md` needs an update, make it in a separate `docs` Conventional
  Commit such as `docs(agents): update repo instructions`.
- Keep `AGENTS.md` out of mixed code commits whenever possible.
- Remove stale instructions instead of appending historical notes.
