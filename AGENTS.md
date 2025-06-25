# Contribution Guidelines and Repository Overview

This repository contains [espanso](https://espanso.org/) configuration files used at Deeptree. It includes text expansion templates and variables for company-wide and personalized use.

## Repository Structure

- `expansions_deeptree/` – Common expansions for the entire organization.
- `expansions_personalized/` – User‑specific expansions (ticket notes, account info, etc.).
- `variables_global/` – Global variables split into editable `personalized_variables.yml` and static sets such as `deeptree_variables.yml`.
- `README.md` – Basic setup instructions.

All expansions are written in YAML. Each file begins with `# Espanso Match File` and follows espanso's syntax for `matches` or `global_vars`.

## Commit Message Conventions

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org) standard:

```
type(scope?): subject
```

Common `type` values:

- `feat` – New expansions or variables.
- `fix` – Bug fixes in expansions or variable values.
- `docs` – Documentation only changes.
- `style` – Formatting changes that do not affect behavior.
- `refactor` – Code restructuring without functional changes.
- `test` – Adding or modifying tests.
- `chore` – Routine tasks such as dependency updates.

The subject should be concise (preferably under 50 characters). Provide additional details in the body if needed.

## Testing and Validation

Before committing, validate YAML files using [`yamllint`](https://github.com/adrienverge/yamllint) and, if espanso is installed, run `espanso path/to/file` to verify syntax.

Example test commands:

```bash
# Lint all YAML files
yamllint .

# Validate espanso config (requires espanso)
espanso check
```

If these tools are unavailable, note the failure in the commit message or pull request.

## Notes for AI Contributions

When using AI to modify expansions or variables:

- Preserve comments that explain placeholders and usage.
- Keep file formatting consistent; lists should be indented with two spaces.
- Ensure triggers remain unique to avoid conflicts.
- Update `README.md` if new files or directories are added.

