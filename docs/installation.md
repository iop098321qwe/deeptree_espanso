# Installation Guide

> [!INFO] Installation Guide Tips
Utilize the Table of Contents on the right to navigate to the numbered steps
for installation. Each section contains tabbed instructions for different
systems. Please ensure to select the tab corresponding to your operating system
for accurate installation instructions.

## 1. Install Espanso

Install Espanso on your system using your preferred method. It may be installed
via package managers, direct downloads, or from source. Follow the instructions
for your operating system.

> [!WARNING] "Read Installation Documentation"
Please reference [Espanso installation documentation][install] for installation
documentation on your system.

Specific instructions I have put together can be found below.

Please select from the tabs below:

=== "Fedora"

    ### Fedora

    To install Espanso on Fedora, you will first need to install the Terra third
    party repository. You can do this by running the following command:

    ```sh
    sudo dnf install --nogpgcheck --repofrompath 'terra,https://repos.fyralabs.com/terra$releasever' terra-release terra-gpg-keys
    ```

    You can then install using the Terra repository and Linux package manager
    `dnf` with the following command:

    ```sh
    sudo dnf install espanso-wayland
    ```

=== "Arch Based"

    ### AUR

    You can install Espanso on Arch Linux and derivatives of Arch Linux using the AUR package `espanso-wayland`.

    > [!TIP] Derivatives of Arch Linux
    This includes Omarchy and CachyOS!

    === "yay"

        #### Yay
    
        For yay, you can use the following command:
    
        ```sh
        yay -S espanso-wayland
        ```
    
    === "pacman"

        #### Pacman
    
        For pacman, you can use the following command:
    
        ```sh
        sudo pacman -S espanso-wayland
        ```
    
    === "Omarchy"

        #### Omarchy
    
        ##### Omarchy Menu
    
        On Omarchy, you can install Espanso by opening the `Omarchy Menu` ->
        `Install` -> `AUR` -> search `espanso-wayland` and install the package.
    
        ##### Omarchy Command
    
        You can also use the following command in the terminal:
    
        ```sh
        omarchy pkg aur add espanso-wayland
        ```

=== "Windows (WIP)"

    ### Windows (WIP)

    **Currently under construction...**

    *(but like why are you using Windows anyway? :P)*

=== "MacOS (WIP)"

    ### MacOS (WIP)

    **Currently under construction...**

    *(but like why are you using MacOS anyway? :P)*

## 2. Start and Enable Espanso Service

=== "Linux"

    ### Linux

    After installation, you will need to start the Espanso service. You will
    also need to enable it to start automatically on boot. You can do both of these
    by running the following command:

    ```sh
    espanso service register; espanso start
    ```

=== "Windows (WIP)"

    ### Windows (WIP)

    **Currently under construction...**

    *(but like why are you using Windows anyway? :P)*

=== "MacOS (WIP)"

    ### MacOS (WIP)

    **Currently under construction...**

    *(but like why are you using MacOS anyway? :P)*

## 3. Verify Espanso Installation

Run the following command to verify that Espanso is installed and running:

```sh
espanso --version
```

This should return the version of Espanso that is installed on your system. For example:

```text
> espanso --version
2.4.0
```

If you receive an error, please refer to the Espanso installation documentation
for troubleshooting steps.

## 4. Install the Package

Now you have Espanso installed and running. Now it is time to install the
preconfigured Deeptree package.

Install the Deeptree package with the following command:

```sh
espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external
```

This adds the shared Deeptree snippets, variables, and scripts without
replacing the user's existing Espanso configuration. It also allows updates to
be rolled out to all users without requiring them to manually update their
configuration.

### Verify Package Installation

You can verify that the package was installed correctly by running the following command:

```sh
espanso package list
```

For example, you should see something similar to the following output:

```text
> espanso package list
- deeptree - version: 0.1.1 (git: https://github.com/iop098321qwe/deeptree_espanso)
```

If you see the package listed, then the installation was successful.

## 5. Set Work Information

Copy `templates/work_information.yml` from the [Github repository][repo] into
the user's Espanso match directory within the config directory and update the
values for that technician.

> [!INFO] Setup Tip
Middle click or control click the Github repository link to open it in a new
tab to copy the `templates/work_information.yml` and leave this page open.

=== "Linux"

    ### Linux

    > [!WARNING] Privacy
    All of the information input into variables is stored locally and not
    sent to any external servers. All variables are resolved locally as well for
    expansions and scripts included in the package.

    Run `espanso path` to find your Espanso config directory:

    ```sh
    espanso path
    ```

    The output should look similar to this:

    ```text
    > espanso path
    Config: /home/<username>/.config/espanso
    Packages: /home/<username>/.config/espanso/match/packages
    Runtime: /home/<username>/.cache/espanso
    ```

    Use the `Config:` path, then open the `match` directory inside it. For the
    example above, the destination would be:

    ```text
    /home/<username>/.config/espanso/match/work_information.yml
    ```

    Copy `templates/work_information.yml` into that `match` directory. Do not put
    it inside `match/packages/deeptree`; that directory is managed by the
    installed package.

    Open the copied `work_information.yml` file and replace the placeholder
    values with the technician's information, including name, personal email,
    work email, and title.

    Change only the values on `echo` lines between the double quotes. The
    `label` and `comment` lines help you determine what you are changing and should
    not be modified. For example, you will change the following line:

    ```yaml hl_lines="6"
      - name: myfirst
    label: First Name Variable
    comment: "Input your first name in the 'echo' field."
    type: echo
    params:
      echo: "First"
    ```

    to
    
    ```yaml hl_lines="6"
      - name: myfirst
    label: First Name Variable
    comment: "Input your first name in the 'echo' field."
    type: echo
    params:
      echo: "Dallas"
    ```

    Repeat this for all variables in the file. Each individual label is denoted
    with a name, label, comment, type, params, and echo field. Again, the `echo`
    field is the only one that should be modified.

    > [!TIP] Comments
    Read the comment line for each variables instructions.

    Keep this copied file local to the technician. It contains personal
    technician values and should not be overwritten by Deeptree package updates.

=== "Windows (WIP)"

    ### Windows (WIP)

    **Currently under construction...**

    *(but like why are you using Windows anyway? :P)*

=== "MacOS (WIP)"

    ### MacOS (WIP)

    **Currently under construction...**

    *(but like why are you using MacOS anyway? :P)*

[install]: <https://espanso.org/install/>
[repo]: <https://github.com/iop098321qwe/deeptree_espanso/blob/main/templates/work_information.yml>
