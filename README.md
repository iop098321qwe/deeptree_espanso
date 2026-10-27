# Deeptree Espanso Package

> [!INFO] Get Started NOW
If you wish to get started without reading about Espanso or the purpose of the
Deeptree Espanso package, you can skip directly to the [installation
instructions][installation].

This is a private Espanso package for centrally managing the Deeptree snippets,
global variables, and scripts for Espanso users.

Use it alongside your existing personal snippets or as your starting collection
if you are new to Espanso. The installation guide covers installing Espanso and
setting up this package.

## What Is [Espanso][espanso]?

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
technician's name and title, company, and shared helpdesk phone number.
The signature does not include an email address; `;dtemail` separately inserts
the technician's work email address. It will also randomly select
sentences, quotes, and partial sentences to randomize this email generation
each time it is used to avoid sounding too automated or templated.

The examples assume your local technician values are loaded. The package loads
the composed name definitions from `static/name.yml`; follow the
[installation guide][installation] to configure your technician values and
install the runtime dependencies for shell-based expansions.

## What Is the Deeptree Espanso Package?

Deeptree manages the shared snippets, global variables, and scripts centrally.
You personalize them with the repository's `templates/work_information.yml`
template, copied into your own Espanso configuration outside the package. Its
local values supply your name, title, and work email to the shared expansions.

New snippets and scripts can be shared centrally without requiring users to
edit their own Espanso configuration. Users receive these changes by running
`espanso package update deeptree`; package updates are not automatic and leave
separately managed personal configuration intact.

To read more about Espanso, visit the [Espanso website][espanso].

[espanso]: https://espanso.org/
[installation]: https://iop098321qwe.github.io/deeptree_espanso/installation/
