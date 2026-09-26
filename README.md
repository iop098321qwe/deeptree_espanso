# Deeptree Espanso Package

This is a private Espanso package for centrally managing the Deeptree snippets,
global variables, and scripts for Espanso users.

## What Is Espanso?

Espanso is a cross-platform text expander that allows users to create custom
snippets and scripts that can be triggered by typing a specific keyword or key
combination. It is designed to improve productivity by automating repetitive
tasks and reducing the amount of typing required for common phrases or
commands.

It can be used to create snippets for frequently used text, such as email
signatures, email templates, code snippets, or any other text that is
repetitively typed. It can also be used to create scripts that can perform more
complex tasks, such as opening applications, running commands, or interacting
with APIs.

Between snippets and scripts, Espanso can be used to automate a wide range of
tasks and improve productivity for a wide range of users.

!!! info "WIP!"
    There will be an instructional video added in the future to introduce
    and explain Espanso better.

## How to Use Espanso

Once installed, Espanso can be configured to use custom snippets and scripts
with any trigger keyword or key combination. Users can create their own
snippets and scripts, or they can use pre-made packages like the Deeptree
Espanso package to quickly set up a collection of useful snippets and scripts.

Setting up your own snippets and scripts is easily performed by editing a
configuration file in the Espanso directory. The configuration file is written
in YAML format and allows users to define their own snippets, scripts, and
triggers.

This means that users can customize their Espanso experience to fit their
specific needs and workflows, making it a powerful tool for improving
productivity and efficiency.

Some of the more often used snippets and scripts include expanding acronyms,
such as typing "brb" to expand to "be right back", or typing "addr" to expand
to a full address.

The way that I often use it for example is typing something like `;signature` and it will expand my email signature automatically into:

```text
With kind regards,

Dallas Elliott
Rapid Response Team Lead
Deeptree, Inc.
+1 907 206 2373

---
"An ounce of prevention is worth a pound of cure." - Benjamin Franklin
```

Having been a long time Espanso user, this signature expansion is much more
advanced than it appears to be. The way that my signature is configured is by
using a selection of variables that I have added to create a dynamic signature
that changes each time that I type `;signature`.

I have taken this a step further to generate entire email templates, or ticket
templates. I can type a dynamic trigger that uses regex to write nearly an
entire email and place the cursor in the correct location for me to continue
typing. For example, I can type `;emailnotiDeeptree.` and it will expand into
the following, with the cursor placed at the `$|$` location for me to continue
typing:

```text
High regards Deeptree, an email for your consideration,

**NO RESPONSE REQUIRED**

$|$

This is a notification email. If anything does not meet satisfactory completion standards, please reply directly to this email or call +1 907 206 2373 with any additional information, questions, or concerns.

With appreciation,

Dallas Elliott
Rapid Response Team Lead
Deeptree, Inc.
+1 907 206 2373

---
"Technology is best when it brings people together." - Matt Mullenweg
```

Again, this is a dynamic template that uses variables to fill in the
technician's name, title, and work email address. It will also randomly select
sentences, quotes, and partial sentences to randomize this email generation
each time it is used to avoid sounding too automated or templated.

With this package, I have made it so that each individual can use these
expansion tools for themselves.

## What Is the Deeptree Espanso Package?

The repository contains templates for the technician-specific variables that
are kept outside the package. These are used to customize the expansions to
tailor for each individual technician's name, title, and work email address to
automatically be filled in using the shared snippets and scripts.

This package is designed to live alongside existing Espanso configuration. This
means that a user can install this package and still have their own personal
snippets and scripts in their Espanso configuration separately managed.
Whenever the package is updated, the shared snippets and scripts will be
updated only for the Deeptree Espanso package.

This means that new snippets and scripts can be added to the package and shared
with all users centrally and automatically without requiring each user to
manually update their own Espanso configuration or interfere with their custom
configurations.

To read more about Espanso, visit the [Espanso website][1].

## Install

Reference the [Installation](installation.md) documentation for installing
Espanso and configuring this package on your machine.

## Updating

Reference the [Updating](updating.md) documentation for instructions on how to
update the package.

[1]: https://espanso.org/
