# Installation Guide

## Install Espanso

Install Espanso on your system using your preferred method. It may be installed
via package managers, direct downloads, or from source. Follow the instructions
for your operating system. Please reference [Espanso installation guide][1]
for more details to install on your system.

### AUR

Espanso can be installed on Arch Linux and derivatives using the AUR package
`espanso-wayland`. This is the recommended package as the `espanso-wayland-bin`
package is not up to date.

## Install the Package

Install the Deeptree package from this Git repository:

```sh
espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external
```

This adds the shared Deeptree snippets, variables, and scripts without
replacing the user's existing Espanso configuration.

## Set Work Information

Copy `templates/work_information.yml` into the user's Espanso match directory
and update the values for that technician. You can find the match directory
with:

```sh
espanso path
```

Keep this copied file local to the technician. It contains values such as name,
title, personal email, and work email that should not be overwritten by package
updates.

## Update the Package

Update the shared Deeptree package with:

```sh
espanso package update deeptree
```

There will be a notification sent out to all employees when the package is
updated. This will only change the `deeptree` package and will leave your own
configuration untouched. If you have made changes to the `work_information.yml`
file, those changes will not be overwritten by the update.

Updates will come with any additional information if `work_information.yml` has
any changes that need to be made.

[1]: <https://espanso.org/install/>
