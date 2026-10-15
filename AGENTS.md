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
- Node dependencies are defined by `package.json` and `package-lock.json`.
- Commit hooks use Husky and Commitlint.
- Espanso `2.4.0` was verified locally during package conversion work.
- Python virtual environment tooling exists under `.venv/` for Zensical.

## Repository Overview

- `.github/workflows/`: GitHub Pages documentation build and deployment.
- `.husky/`: Git hook scripts for Commitlint.
- `.venv/`: Local Python virtual environment used for Zensical commands.
- `deeptree/`: Espanso external package source.
- `docs/`: Markdown documentation sources for the generated site.
- `node_modules/`: Installed Node dependencies for commit tooling.
- `site/`: Generated static documentation output.
- `templates/`: Local technician template files that are not package-managed.

## Tracked Files Overview

- `.github/workflows/docs.yml`: Builds and deploys docs on `main`/`master`
  pushes.
- `.gitignore`: Excludes local caches, Node dependencies, and the Python venv.
- `.husky/commit-msg`: Runs Commitlint for commit messages.
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
- `docs/usage.md`: User guide for package expansions and scripts.
- `docs/updating.md`: Package update guide source.
- `done.txt`: Root completed task list placeholder.
- `inbox.txt.tuxedo-lock`: Blank Tuxedo inbox lock file.
- `LICENSE`: Project license text.
- `package-lock.json`: Locked Node dependency graph.
- `package.json`: Node package metadata and scripts.
- `README.md`: Primary repository overview and setup notes.
- `site/`: Generated static documentation output; summarize as a directory.
- `templates/work_information.yml`: Local technician variable template.
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
- `deeptree/package.yml` currently omits `variables/static/name.yml`.
  Installation docs explain loading composed name globals in a local file.

## Commands

- `git status --short --branch`: show the current branch and worktree state.
- `git diff --stat`: review the size and spread of pending changes.
- `git log --oneline --decorate -5`: inspect recent commit history.
- `npm run test`: currently exits with `Error: no test specified`.
- `./.venv/bin/zensical build`: build the generated documentation site only
  when explicitly requested by the user.
- `espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external`:
  install the package from Git. URL length is an 80-character exception.
- `espanso package update deeptree`: update the installed package.

## Testing

- No automated test suite is currently defined.
- `npm run test` is not a valid verification gate because it intentionally
  exits with an error.
- Validate YAML syntax for `deeptree/**/*.yml` and `templates/**/*.yml` when
  changing package files.
- Run an Espanso install smoke test when package layout or metadata changes.

## Linting and Formatting

- Commit messages are linted by Commitlint through `.husky/commit-msg`.
- No YAML, Markdown, or shell formatter command is currently defined.
- Keep changes minimal and consistent with the existing file style.

## CI and Release

- Use Conventional Commits for every commit. Prefer a scope when it adds
  clarity.
- Site builds and `build(site):` commits are manual steps. Never perform
  either locally without an explicit user request.
- `.github/workflows/docs.yml` builds with `zensical build --clean` and
  deploys GitHub Pages on pushes to `main` or `master`.
- Never create, edit, or update `CHANGELOG.md` manually.
- `CHANGELOG.md` is generated and maintained by release tooling only.
- If release automation adds or changes generated files, let the tooling own
  those updates.

## Conventions

- Use small, correct changes that fit the existing project structure.
- Keep Espanso package files split by topic unless consolidation is required.
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
- Node dependencies support commit-message validation.
- Zensical generates the static documentation site.

## Troubleshooting

- If package installation fails, verify `_manifest.yml`, `package.yml`, and
  `README.md` exist under `deeptree/`.
- If snippets using signatures fail, verify the user copied and configured
  `templates/work_information.yml` in their Espanso match directory and loaded
  the composed name globals as described in `docs/installation.md`.
- If docs are stale, report that `site/` needs a manual rebuild. Run
  `./.venv/bin/zensical build` only when explicitly requested by the user.
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
