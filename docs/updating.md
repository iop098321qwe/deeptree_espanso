# Updating the Package

## Maintainer Release Versions

The repository-local `.versionrc.json` configures `commit-and-tag-version`
to update `package.json`, `package-lock.json`, and
`deeptree/_manifest.yml` to the same release version. The shared `verg`
shell function invokes this tool and uses this configuration when releasing
from this repository; other repositories are unaffected.

To preview the version updates without creating a release, run this directly
from the repository root:

```sh
npx commit-and-tag-version --dry-run
```

## Update Command

Update the shared Deeptree package with:

```sh
espanso package update deeptree
```

Updates are manual. Git must be installed and able to authenticate to the
private repository. Before updating, review the release instructions for
trigger changes and any required local setup changes.

Keep personal matches and `work_information.yml` outside the installed
package directory. Changes made inside the installed package are
package-managed and may be replaced by an update.

### Package-Managed Name Definitions

The package imports `matches/variables/static/name.yml`, supplying `myname`
and `mylegalname` from your local technician values. Package updates manage
these composed name definitions. Keep your personalized `work_information.yml`
in your Espanso match directory outside the package; its values remain locally
managed and are required by the composed names.

Credential scripts now use `%PACKAGES%/deeptree/scripts/credential-generator.sh`
so custom package directories are supported. No local script copy is needed.

> [!INFO] Deeptree Package Update Notifications
> There will be a notification sent out to all employees when the package is
updated. You will need to manually run the command above to update the package.
This will only change the `deeptree` package and will leave your own
configuration untouched. If you have made changes to the `work_information.yml`
file, those changes will not be overwritten by the update.
>
> Update notifications will come with any additional information and instructions
if `work_information.yml` has any local changes that need to be made.
