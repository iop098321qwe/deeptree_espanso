# Updating the Package

## Update Command

Update the shared Deeptree package with:

```sh
espanso package update deeptree
```

## Deeptree Package Update Notifications

There will be a notification sent out to all employees when the package is
updated. You will need to manually run the command above to update the package.
This will only change the `deeptree` package and will leave your own
configuration untouched. If you have made changes to the `work_information.yml`
file, those changes will not be overwritten by the update.

Update notifications will come with any additional information and instructions
if `work_information.yml` has any local changes that need to be made.
