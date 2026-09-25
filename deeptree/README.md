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
- `myname`
- `mylegalname`
- `myemail`
- `workemail`
- `title`
