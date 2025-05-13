# Deeptree Espanso

Espanso matches that could be shared for Global use at Deeptree

## Installation

### Windows

### Linux

## Importing Espanso Configurations

## Espanso Helper

## Personalization

### Using Espanso Helper

### Editing Configuration Files

In the Espanso configuration folder, navigate to the `variables_global` directory.

To adjust the configurations, open the `personalized_variables.yml` file in a
text editor. Replace the placeholder values with your own.

For example, there is an entry for your First Name, which you would then
replace with your first name.

In the repository, you will see:

```yaml
- label: First Name
  name: myfirst
  comment: "Input your first name in the 'echo' field."
  type: echo
  params:
    echo: firstname
```

To personalize it for `Dallas`, you would need to change it to:

```yaml
- label: First Name
  name: myfirst
  comment: "Input your first name in the 'echo' field."
  type: echo
  params:
    echo: Dallas
```

> Only the `echo` field needs to be changed under `params`.

Continue to do this for each of the variables in the
`personalized_variables.yml` file. I have included a comment for each variable
to help you understand what it is for, what to fill in, and where to fill it
in.

## Give it a Try

Open up a text editor or enter into a text field in the browser.

Type `;first` and you should see your first name appear in place of the trigger.

## Expansion Descriptions

There are a few different expansions that are available to you.

The first one is an expansion for client names. This allows the user to type in
an acronym and have it expand to the full name of the client.

For example, for `Indian Family Health Clinic`, you would type `;ifhc` and it
would expand to the full client name.
