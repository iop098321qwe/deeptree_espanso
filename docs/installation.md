# Installation Guide

## Install Espanso

Install Espanso on your system using your preferred method. It may be installed
via package managers, direct downloads, or from source. Follow the instructions
for your operating system. Please reference [Espanso installation guide][1]
for more details to install on your system.

### AUR

Espanso can be installed on Arch Linux and derivatives of Arch Linux using the
AUR package `espanso-wayland`. This is the recommended package as the
`espanso-wayland-bin` package is not up to date.

!!! tip "'Derivatives of Arch Linux'"
    This includes Omarchy and CachyOS.

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

You will utilize the config path to access the 'match' directory. You will need
to copy the `templates/work_information.yml` file from the repository into the
`match` directory and update the values with your information.

Keep this copied file local to the technician. It contains values such as name,
title, personal email, and work email that should not be overwritten by package
updates.

[1]: <https://espanso.org/install/>
