# Updating the Package

Updates are manual. When you receive a Deeptree package update notification,
review its instructions for trigger changes or any required local setup changes.

## Update Deeptree

Git must be installed and able to authenticate to the private repository using
your organization's configured Git credentials.

Run this command in a terminal:

```sh
espanso package update deeptree
```

This updates the installed `deeptree` package. It does not update Espanso itself
or other installed packages.

## Keep Your Personal Configuration

Keep personal matches and `work_information.yml` outside the installed
package directory. Changes made inside the installed package are
package-managed and may be replaced by an update.

Your local technician values remain yours to manage. Package updates supply the
shared snippets, composed name definitions, and scripts without replacing your
personal configuration outside the package. Make any local changes requested in
the update notification using the [installation guide](installation.md).

## Check the Update

List your installed packages and confirm that Deeptree shows the expected
version from the update notification:

```sh
espanso package list
```

Allow Espanso to reload, then test `;name`, `;signature`, and `;dtemail` in a
blank local text document. Confirm they still use your configured technician
values, and check any changed triggers described in the update notification.

If the update command fails, check that Git can authenticate to the private
repository and review the error shown in the terminal. If expansions fail after
the update, run `espanso log` and check your local setup against the
[installation guide](installation.md#6-check-expansion-dependencies).
