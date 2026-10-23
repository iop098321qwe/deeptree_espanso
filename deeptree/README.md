# Deeptree Espanso Package

This package provides Deeptree-managed Espanso snippets, global variables,
and scripts.

Technician-specific work information is not included in this package. Copy
`templates/work_information.yml` into your Espanso match directory and update
the values there after installing the package.

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

The package also requires `myname` and `mylegalname`, but `package.yml`
currently omits `matches/variables/static/name.yml` from its imports. Until
that import is added, copy that file into your local Espanso match directory
as `deeptree_names.yml`, alongside `work_information.yml`. It composes the
names from your local first, middle, and last name values. Keep both files
outside `match/packages/deeptree` so package updates preserve them.

## Script Requirements

Relative date and week-range helpers require GNU `date` with `-d` support.
Credential expansions require Bash, `sed`, `tr`, and `awk`.

## Temporary Passwords

The package includes `;tp`, which inserts `Password: ` followed by the current
clipboard contents and places the cursor on the next line. Credential triggers
and forms use this match automatically. Create the password and copy it before
expanding credentials; the package does not generate passwords.

After updating from a version that required a local `;tp` match, remove that
local definition so only the package match remains.
