# Deeptree Espanso

A private Espanso package for Deeptree snippets, global variables, and
scripts.

This repository provides Deeptree-managed Espanso expansions without replacing
a technician's existing Espanso configuration. The `deeptree` package contains
shared snippets, shared variables, and scripts that can be updated centrally.

Technician-specific variables are kept outside the package in a local template.
That lets package updates change shared Deeptree content without overwriting a
technician's name, title, or work email.

## Install

Install the package from this Git repository:

```sh
espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external
```

Then copy `templates/work_information.yml` into your Espanso match directory
and update the values for the technician using the workstation.

## Update

Update the shared Deeptree package with:

```sh
espanso package update deeptree
```
