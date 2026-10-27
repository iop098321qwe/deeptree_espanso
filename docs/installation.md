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

=== "Ubuntu"

    ### Ubuntu

    Use Espanso's official Debian packages on Ubuntu. The commands below use
    the latest upstream release; choose the package for your current desktop
    session rather than assuming it from your Ubuntu version. These steps also
    apply to Ubuntu 24.04 and 26.04 LTS when the release package's dependencies
    are available for your system.

    #### Check Architecture and Desktop Session

    Open Terminal in your logged-in desktop session and run:

    ```sh
    dpkg --print-architecture
    printenv XDG_SESSION_TYPE
    ```

    The downloads below require `amd64` (64-bit Intel or AMD). For `arm64` or
    another architecture, use the [upstream Linux installation guide][linux]
    for source-build instructions instead of installing an `amd64` package.

    The session command should print `wayland` or `x11`. Select the matching
    tab below. If it prints nothing, check your desktop session type before
    continuing; an SSH session does not identify the local desktop reliably.

    #### Install Prerequisites

    Install the download tool, Git, and Deeptree's shell runtime dependencies:

    ```sh
    sudo apt update
    sudo apt install wget git bash coreutils sed gawk
    ```

    Git must be able to authenticate to the private Deeptree repository for
    step 4. No Node.js or Python installation is needed to use the package.

    #### Download and Install Espanso

    Run the commands from a writable directory, such as your Downloads folder.
    Install only the package matching your session. The `./` prefix tells
    `apt` to install the downloaded file and resolve its runtime dependencies.

    === "Wayland"

        ```sh
        sudo apt install libcap2-bin wl-clipboard
        wget -O espanso-debian-wayland-amd64.deb https://github.com/espanso/espanso/releases/latest/download/espanso-debian-wayland-amd64.deb
        sudo apt install ./espanso-debian-wayland-amd64.deb
        sudo setcap 'cap_dac_override+p' "$(command -v espanso)"
        getcap "$(command -v espanso)"
        ```

        `libcap2-bin` provides `setcap` and `getcap`; `wl-clipboard` supplies
        Wayland clipboard tools. Espanso requires the capability above to
        access the input devices used to detect triggers and insert text.
        The final command should show `cap_dac_override=p` for the Espanso
        executable. See [upstream Wayland setup][wayland] for details.

        If an Espanso binary update removes this capability, apply the
        `setcap` command again and restart Espanso with `espanso restart`.

    === "X11"

        ```sh
        wget -O espanso-debian-x11-amd64.deb https://github.com/espanso/espanso/releases/latest/download/espanso-debian-x11-amd64.deb
        sudo apt install ./espanso-debian-x11-amd64.deb
        ```

    If `apt` reports unavailable dependencies, consult the [upstream Linux
    installation guide][linux] for a compatible installation method rather
    than forcing the package installation.

    Continue with step 2 to register and start Espanso as your desktop user.
    Then complete steps 3 through 6 to install Deeptree, personalize the local
    technician template using either Linux setup tab, and check expansions.

    #### Wayland Keyboard Layout

    After the first start creates the configuration, non-US layouts and some
    US variants need an explicit layout in `config/default.yml` beneath the
    `Config:` directory reported by `espanso path`. For example, for a UK
    keyboard, add or update:

    ```yaml
    keyboard_layout:
      layout: "gb"
    ```

    Use your actual layout code and preserve any existing configuration.
    Restart Espanso after editing. On Ubuntu's GNOME desktop, inspect your
    configured input sources with:

    ```sh
    gsettings get org.gnome.desktop.input-sources sources
    ```

    See [upstream Wayland setup][wayland] for layout variants and limitations.
    If expansions fail, check `espanso service status` and `espanso log`, then
    confirm that you installed the package matching your desktop session.

=== "Fedora"

    ### Fedora

    #### Wayland

    These commands install Espanso for a Wayland desktop session. Check your
    session with `printenv XDG_SESSION_TYPE`; it should print `wayland`.
    For X11 or another session, see
    [Other Desktop Sessions](#other-desktop-sessions).

    To install Espanso on Fedora, first install the Terra third-party repository:

    ```sh
    sudo dnf install --nogpgcheck --repofrompath 'terra,https://repos.fyralabs.com/terra$releasever' terra-release terra-gpg-keys
    ```

    You can then install using the Terra repository and Linux package manager
    `dnf` with the following command:

    ```sh
    sudo dnf install espanso-wayland
    ```

=== "Arch Based"

    ### Arch Linux and Derivatives

    #### Wayland (AUR)

    These commands install Espanso for a Wayland desktop session using the AUR
    package `espanso-wayland`. Check your session with
    `printenv XDG_SESSION_TYPE`; it should print `wayland`.
    For X11 or another session, see
    [Other Desktop Sessions](#other-desktop-sessions).

    > [!TIP] Derivatives of Arch Linux
    This includes Omarchy and CachyOS!

    === "yay"

        #### Yay
    
        For yay, you can use the following command:
    
        ```sh
        yay -S espanso-wayland
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

### Other Desktop Sessions

X11 and other desktop-session setup on Fedora and Arch Linux are not fully
documented in this documentation. For session-specific packages, dependencies,
and setup instructions, use the [upstream Linux installation guide][linux] and
[Espanso installation documentation][install]. Choose a method compatible with
your distribution and desktop session before continuing with step 2.

## 2. Start and Enable Espanso Service

=== "Linux"

    ### Linux

    After installation, register Espanso's user service once and start it from
    your logged-in desktop session. Run these commands as your normal user,
    without `sudo`, so Espanso uses your configuration and starts automatically
    at login:

    ```sh
    espanso service register
    espanso start
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

Run the following command to verify that Espanso is installed:

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

The version command does not check whether the service is running. Check that
separately with:

```sh
espanso service status
```

## 4. Install the Package

Now you have Espanso installed and running. Now it is time to install the
preconfigured Deeptree package.

Install the Deeptree package with the following command:

Git must be installed and able to authenticate to this private repository.
Use your organization's configured Git credentials for the HTTPS URL below.

```sh
espanso install deeptree --git https://github.com/iop098321qwe/deeptree_espanso --external
```

This adds the shared Deeptree snippets, variables, and scripts without
replacing the user's existing Espanso configuration. Users receive subsequent
updates by running `espanso package update deeptree`; they do not need to edit
their personal configuration for shared package changes.

### Script Requirements

The package includes all shared expansion definitions, composed name globals,
and the credential script. No other Espanso package or personal expansion is
required. Technician-specific values still need the local template in step 5.

Runtime requirements depend on the expansions you use:

- Relative dates, weekday dates, and week ranges: a Bourne-compatible shell
  and GNU `date` with `-d` support, including their numeric form versions.
- Direct weekday ranges, such as `;m-f`: a compatible shell and `tr`.
  The `:weekdays` form uses built-in form and echo extensions instead.
- Credential triggers and forms: Bash, `sed`, `tr`, and `awk`. The included
  script formats names, usernames, and email addresses; no Python is needed.
- Clipboard helpers, `;tp`, and credentials: a working clipboard with the
  text you intend to insert. Credentials append the package's `;tp` match.
- Signatures, emails, and personal-name helpers: local technician values from
  step 5. `;dtemail` uses your local `workemail` value.
- Native date/time, random text, and forms: Espanso's built-in extensions.
  Forms need a working graphical Espanso session, not a separate GUI package.

On Linux, Espanso uses Bash by default for shell extensions. Ensure the tools
are installed with your system package manager:

```sh
# Ubuntu
sudo apt install bash coreutils sed gawk git

# Fedora
sudo dnf install bash coreutils sed gawk git

# Arch Linux and derivatives
sudo pacman -S --needed bash coreutils sed gawk git
```

GNU coreutils supplies `date` and `tr`; `gawk` supplies `awk`. Check that the
commands are available in the environment Espanso runs in:

```sh
command -v bash date sed tr awk git
date -d 'tomorrow' +'%Y-%m-%d'
```

The second command must print tomorrow's date without an error. After changing
the service environment or its `PATH`, restart Espanso. A command available
only through a terminal alias may not be available to Espanso.

The Windows and macOS walkthroughs are incomplete. These shell snippets are
written for a Bourne-compatible shell, not Windows' default PowerShell. macOS
ships BSD `date`, which does not provide the required GNU `-d` behavior.
Installing Espanso alone, or installing GNU date only as `gdate`, does not make
all helpers work: the snippets invoke `date`. A compatible shell and GNU `date`
under that command name must be available to Espanso. Full package operation
on those platforms has not been verified here.

Credential script arguments use Espanso's `%PACKAGES%` placeholder:
`%PACKAGES%/deeptree/scripts/credential-generator.sh`. This resolves from the
configured package directory shown by `espanso path`, including custom paths.
No separate script copy is required. Node.js and Python are repository tooling,
not expansion runtime dependencies. Git authentication is needed to install
and update the private package; the bundled expansions make no network calls.

The package includes the `;tp` temporary-password match. It inserts
`Password: ` followed by the clipboard contents, with the cursor on the next
line. Create and copy the password before using credential expansions; the
package does not generate passwords. No separate local `;tp` match is needed.
See the [credential usage guide](usage.md#credential-generation) for details.

### Verify Package Installation

You can verify that the package was installed correctly by running the following command:

```sh
espanso package list
```

For example, you should see something similar to the following output:

```text
> espanso package list
- deeptree - version: 0.1.6 (git: https://github.com/iop098321qwe/deeptree_espanso)
```

The version may differ after a release. A listed package confirms installation;
the expansion checks below verify your local setup.

## 5. Set Work Information

Copy `templates/work_information.yml` from the [Github repository][repo] into
the user's Espanso match directory within the config directory and update the
values for that technician.

### Load the Composed Name Variables

`deeptree/package.yml` imports `matches/variables/static/name.yml` automatically.
It defines `myname` and `mylegalname` by composing your local first, middle,
and last name values. Only `work_information.yml` needs to be copied locally;
do not copy `name.yml` or create another local composed-name file.

If you use a custom package directory outside `match`, ensure your configuration
includes that package's `package.yml`.

An empty `mymiddle` leaves two spaces between first and last name in
`mylegalname`; `myname` always uses just first and last name.

> [!INFO] Setup Tip
Middle click or control click the Github repository link to open it in a new
tab to copy the `templates/work_information.yml` and leave this page open.

=== "Linux GUI"

    ### Linux GUI Setup

    Use this alternative walkthrough to complete step 5 with a web browser, file
    manager, and graphical text editor. Espanso must already be installed and the
    Deeptree package installed as described above. This does not require a separate
    Espanso configuration GUI.
    
    #### Download the Template
    
    1. Open the [work information template on Github][repo] in your browser.
    2. Select **Download raw file** in the file toolbar (on the right hand
       side).
    3. Save the file in your **Downloads** folder with the exact filename
      `work_information.yml`. Make sure the browser has not added `.txt` or
      `.html` to the filename.
    
    #### Copy the File into Espanso
    
    1. Open your file manager, such as Files, Dolphin, or Thunar, and open your
      **Home** folder.
    2. Enable **Show Hidden Files** in the file manager's menu. In many Linux file
       managers, **Ctrl+H** toggles this setting.
    3. From the `Home` directory, open `.config`, then `espanso`, then `match`.
       The default destination is `/home/<username>/.config/espanso/match`,
       where `<username>` is your Linux account name.
    4. In another file manager window (or tab), open **Downloads**, right-click
       `work_information.yml`, and select **Copy**. Return to Espanso's `match`
       folder and select **Paste**.
    
    Do not paste the file into `match/packages/deeptree`. Package updates manage
    that folder, while your work information belongs directly in `match`.
    
    If `work_information.yml` already exists in the destination, cancel any
    overwrite prompt. Open the existing file and review its values instead of
    replacing your personalized information. Keep any backup outside the Espanso
    `match` folder so it is not loaded as another match file.
    
    The path above is the default Linux location. If `.config/espanso` is missing
    or your installation uses a custom configuration directory, run
    `espanso path` as shown in the Linux tab below to find the **Config:**
    path, then open its `match` folder in your file manager. Do not create a new
    configuration folder just to match the default path.
    
    #### Edit the Technician Values
    
    1. Right-click the copied `work_information.yml` in the `match` folder and
      choose **Open With**, then select a graphical plain-text editor, such as
      GNOME Text Editor, Kate, or Mousepad (or your choice). Do not use a word processor.
    2. Read each `label` and `comment` to identify the value. Replace only the
      text between the double quotes on each `echo:` line. For example, change
      `echo: "First"` to `echo: "Dallas"`.
    3. Fill in all six values: first name (`myfirst`), middle name
      (`mymiddle`), last name (`mylast`), personal email (`myemail`), work
      email (`workemail`), and work title (`title`). If you do not use a middle name,
      leave its value empty as `echo: ""`. You can also omit the personal email if
      you do not want to use it in matches.
    4. Preserve the double quotes, indentation, and all other fields. Do not
      change `global_vars`, `name`, `label`, `comment`, `type`, or `params`, and
      do not replace indentation spaces with tabs.
    5. Select **Save** or press **Ctrl+S**. Keep the file as plain text named
      `work_information.yml`, not `work_information.yml.txt`.
    
    #### Check the Result
    
    The package supplies the composed name definitions automatically.
    After saving, allow Espanso a moment to reload its configuration. Open a new
    blank document in a text editor and type `;signature`. Confirm that the
    expanded signature contains your name and work title instead of placeholders.
    Use a local test document rather than an email or ticket that could be sent.
    
    If the expansion still uses placeholders or Espanso reports a configuration
    error, reopen the file from the `match` folder. Check that your changes were
    saved, the filename ends in `.yml`, and the quotes and indentation still match
    the original template. Also confirm that you edited the copied file rather
    than the download or a file inside `match/packages/deeptree`.

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

    After saving your technician values, allow Espanso to reload.
    In a local text document, check `;first`, `;name`, `;signature`, and
    `;dtemail` against your configured values. If first name and email work but
    signatures fail, confirm the installed package imports `static/name.yml`
    and check `espanso log` for missing or duplicate variable definitions.

=== "Windows (WIP)"

    ### Windows (WIP)

    **Currently under construction...**

    *(but like why are you using Windows anyway? :P)*

=== "MacOS (WIP)"

    ### MacOS (WIP)

    **Currently under construction...**

    *(but like why are you using MacOS anyway? :P)*

## 6. Check Expansion Dependencies

In a blank local text document, verify these representative expansions:

1. Type `;name`, `;legalname`, `;signature`, and `;dtemail`. Confirm your
   configured name, title, and email appear in the appropriate expansions.
2. Type `;emailnotiTest.` to check a full email with nested signature globals.
3. Type `;date`, `;tmr`, `;wkly`, and `;m-f`. The relative date and week range
   check GNU `date`; `;m-f` should insert `Monday - Friday` using the shell.
4. Copy harmless test text such as `ExamplePassword`, then type `;tp` and
   `;credafsJane,Smith.`. Confirm the credential output includes the username,
   email address, and copied test password.
5. Open `:credafs` and `:tmr` to check graphical forms and their script or shell
   dependencies. Use synthetic names and a non-negative whole number of days.

If an expansion fails, run `espanso log`. Check missing commands against the
requirements above, confirm script paths against the `Packages:` output of
`espanso path`, and review missing or duplicate globals. Keep test output in
the local document rather than sending it as a real email or ticket.

[install]: <https://espanso.org/install/>
[linux]: <https://espanso.org/docs/install/linux/>
[wayland]: <https://espanso.org/docs/install/linux/#deb-wayland>
[repo]: <https://github.com/iop098321qwe/deeptree_espanso/blob/main/templates/work_information.yml>
