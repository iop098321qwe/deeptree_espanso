# Deeptree Espanso Package

This package provides Deeptree-managed Espanso snippets, global variables,
and scripts.

Technician-specific work information is configured in your own Espanso files,
outside this package. After installing, download or copy the
[`templates/work_information.yml` template][work-information] from the repository.
The template is stored at the repository root, outside `deeptree/`, and is not
included in the installed package.

Run `espanso path` to find your configuration directory, then place your copy
in its `match` directory as `work_information.yml`. For a default Linux setup,
this is `~/.config/espanso/match/work_information.yml`. Edit the copied file's
`echo` values to supply your name, email addresses, and work title.

Keep this personalized file in your own configuration, not inside the installed
`match/packages/deeptree` directory or a custom Deeptree package directory.
Package updates manage the shared package files while preserving your local
technician values. See the [installation guide][installation] for the full setup.

## Install

```sh
espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external
```

## Update

```sh
espanso package update deeptree
```

## Local Variables

The package expects these local variables to be available in the user's
Espanso match directory:

- `myfirst`
- `mymiddle`
- `mylast`
- `myemail`
- `workemail`
- `title`

The technician template defines these six values. `myemail` is available for
personal snippets but is not used by the package. The signature uses your name
and title, the company, and the shared helpdesk phone number; `;dtemail`
separately inserts `workemail`.

The package imports `matches/variables/static/name.yml`, which defines
`myname` and `mylegalname` from your local first, middle, and last name values.
No separate local name-definition file or external expansion package is needed.
Keep `work_information.yml` outside the installed package so updates preserve
your technician values.

## Script Requirements

Shell-based relative date, weekday-date, and week-range helpers require a
Bourne-compatible shell and GNU `date` with `-d` support. The direct weekday
range helper (`;m-f`, for example) requires a compatible shell and `tr`.
Espanso defaults to Bash on Linux; these commands are not PowerShell syntax.
Credential expansions explicitly invoke Bash and require `sed`, `tr`, and
`awk`. All commands must be available in the Espanso process's `PATH`.

Credential scripts are included and located through
`%PACKAGES%/deeptree/scripts/credential-generator.sh`, using Espanso's configured
package directory rather than assuming it is beneath the config directory.
Clipboard helpers and `;tp` use Espanso's built-in clipboard extension. Forms,
random text, and native date helpers use built-in extensions and need no
additional expansion packages, Python, or Node.js.

See the [installation guide][installation] for dependency installation commands,
verification steps, and current Windows/macOS limitations. Git and repository
authentication are required for installation and updates; the bundled
expansions do not call network services.

## Temporary Passwords

The package includes `;tp`, which inserts `Password: ` followed by the current
clipboard contents and places the cursor on the next line. Credential triggers
and forms use this match automatically. Create the password and copy it before
expanding credentials; the package does not generate passwords.

[installation]: https://iop098321qwe.github.io/deeptree_espanso/installation/
[work-information]: https://github.com/iop098321qwe/deeptree_espanso/blob/main/templates/work_information.yml
