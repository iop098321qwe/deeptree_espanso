# Usage Guide

This guide explains how to use the Deeptree Espanso package after Espanso is
installed, the package is installed, and your local work information file is
configured.

It is written for day-to-day use. You do not need to understand how the package
is built to use these expansions.

## How to Type Expansions

Most Deeptree expansions begin with `;`. Type the full trigger exactly as shown
and Espanso replaces it with the configured text.

Some expansions use a small typed value inside the trigger. In this guide, text
inside angle brackets shows the part you replace while typing.

For example:

```text
;emailnoti<person>.
```

To write a notification email to Deeptree, type:

```text
;emailnotiDeeptree.
```

The final period is part of the trigger. It tells Espanso where the name ends.
Espanso uses the value before that final period as the name in the generated
email.

Many longer templates place your cursor where you should continue typing. This
cursor position is shown in examples as `$|$`, but Espanso moves the cursor
there instead of printing `$|$`.

## Dynamic Emails

Dynamic email triggers create full email drafts. Type the trigger, the person's
or group's name, and the final period.

The package fills in the greeting, email body, and signature. Some parts are
randomized by package variables so the output does not always sound exactly the
same. Your locally configured setup values are used for technician details such
as your name, title, and email information.

This guide does not explain those variables in detail. A separate variable guide
is planned for that.

### General Email Templates

- `;emailnorm<person>.` creates a normal Deeptree email.
- `;emailreq<person>.` creates a response-requested email.
- `;emaildisk<person>.` creates a disk-space cleanup request.
- `;emailfu<person>.` creates a follow-up email.
- `;emaildy<person>.` creates a done-yet follow-up email.
- `;emailvm<person>.` creates a voicemail follow-up email.
- `;emailnovm<person>.` creates an unable-to-leave-voicemail follow-up.
- `;emailmissvm<person>.` creates a missed-appointment email when a voicemail
  or message was left.
- `;emailmissnovm<person>.` creates a missed-appointment email when no
  voicemail was left.
- `;emailnoti<person>.` creates a notification email that says no response is
  required.
- `;emailcomp<person>.` creates a completion notification email.

Example:

```text
;emailnotiDeeptree.
```

This expands into a no-response-required notification email addressed to
`Deeptree`. The greeting, notification text, signoff, quote, and signature are
assembled from package and setup values.

## Email Blocks

Email block expansions insert smaller pieces that are useful while composing an
email manually.

- `;signature` inserts your Deeptree email signature.
- `;greet` inserts a randomized greeting.
- `;addongreet` inserts a randomized sentence that follows a greeting.
- `;otu` inserts a short explanation for a one-time-use link.
- `;dtemail` inserts your configured Deeptree work email address.

Use these when you want help with only part of an email instead of generating a
full template.

## Dispatch Responses

Dispatch response expansions create first-response email templates. They use the
same name pattern as the dynamic email templates.

- `;resreqapp<person>.` creates a request response with an appointment step.
- `;resreqnoapp<person>.` creates a request response without an appointment
  step.
- `;resinc<person>.` creates an incident response with an appointment step.
- `;resspam<person>.` creates a spam-ticket response.

Example:

```text
;resreqappJordan.
```

This creates a response addressed to `Jordan`, thanks them for reaching out,
adds assignment and scheduling language, and includes your signature.

## Dispatch Ticket Templates

Dispatch ticket templates help start ticket bodies with the standard prompts and
follow-up reminders already included.

- `;tmpreq` creates a request ticket template.
- `;tmpinc` creates an incident ticket template.

Use these in ticket descriptions when you want a structured starting point for
the request, impact, due date, symptoms, troubleshooting, and follow-up steps.

## Credential Generation

Credential expansions generate a starter username, email address, and temporary
password for supported clients.

Type the client credential trigger, the first name, a comma, the last name, and
the final period.

```text
;cred<client><first>,<last>.
```

Example:

```text
;credafsJane,Smith.
```

The expansion runs the package script `credential-generator.sh`. The script
normalizes the name, applies the client username format, creates the email
address for that client, and adds a temporary password from the package.

Supported credential triggers:

- `;credafs<first>,<last>.` for Alaska Family Services.
- `;credaslc<first>,<last>.` for Alaska SeaLife Center.
- `;credanai<first>,<last>.` for Anchorage Neurosurgical Associates, Inc.
- `;credcfa<first>,<last>.` for Camp Fire Alaska.
- `;credccs<first>,<last>.` for CCS Early Learning.
- `;credcrmc<first>,<last>.` for Cross Road Medical Center.
- `;credgsak<first>,<last>.` for Girl Scouts of Alaska.
- `;credjaoa<first>,<last>.` for Junior Achievement of Alaska.
- `;credkc<first>,<last>.` for Kijik Corporation.
- `;credklebs<first>,<last>.` for KLEBS Heating & Mechanical.
- `;credorers<first>,<last>.` for O'Banion Real Estate & Relocation
  Services.
- `;credppos<first>,<last>.` for Pioneer Peak Orthopedic Surgery.

## Personal Information

Personal information expansions use the values you configured during setup.

- `;first` inserts your first name.
- `;last` inserts your last name.
- `;name` inserts your full display name.
- `;legalname` inserts your full legal name.
- `;fullname` also inserts your full legal name.

## Client Name Shortcuts

Client name shortcuts expand short codes into full client names and place your
cursor after the inserted name.

- `;asa` expands to `Air Source Alaska`.
- `;akcf` expands to `AK Child & Family`.
- `;acbhc` expands to `Alaska Commission for Behavioral Health Certification`.
- `;acoa` expands to `Alaska Correctional Officers Association`.
- `;afs` expands to `Alaska Family Services`.
- `;ajeatt` expands to `Alaska Joint Electrical Apprenticeship & Training
  Trust`.
- `;aplc` expands to `Alaska Pacific Leasing Company, Inc.`.
- `;arg` expands to `Alaska Rock Gym`.
- `;aslc` expands to `Alaska SeaLife Center`.
- `;aeb` expands to `Aleutians East Borough`.
- `;amar` expands to `Alutiiq Museum & Archaeological Repository`.
- `;anai` expands to `Anchorage Neurosurgical Associates Inc.`.
- `;ao` expands to `Anchorage Opera`.
- `;aos` expands to `Arctic Oral Surgery`.
- `;bc` expands to `Bauer Construction`.
- `;boa` expands to `Bayshore Owners Association`.
- `;bmm` expands to `Beacon Media + Marketing`.
- `;cfa` expands to `Camp Fire Alaska`.
- `;cg` expands to `Cashion Gilmore`.
- `;ccs` expands to `CCS Early Learning`.
- `;cci` expands to `Commercial Contractors, Inc.`.
- `;crmc` expands to `Cross Road Medical Center`.
- `;dpt` expands to `Deeptree, Inc`.
- `;dda` expands to `Denali Daniels + Associates`.
- `;dc` expands to `Dimond Center`.
- `;ee` expands to `Eagle Enterprises, Inc.`.
- `;flcc` expands to `Farm Loop Christian Center`.
- `;fb` expands to `Fireside Books`.
- `;gsak` expands to `Girl Scouts of Alaska`.
- `;gptlhb` expands to `Great Plains Tribal Leaders Health Board`.
- `;jaoa` expands to `Junior Achievement of Alaska`.
- `;kc` expands to `Kijik Corporation`.
- `;knom` expands to `Knom Radio Mission, Inc.`.
- `;lc` expands to `Larson Chiropractic`.
- `;nwf` expands to `North Wend Foods, Inc.`.
- `;orers` expands to `O'Banion Real Estate & Relocation Services`.
- `;opc` expands to `Optimum Performance Chiropractic`.
- `;pt` expands to `Pango Technology`.
- `;ppos` expands to `Pioneer Peak Orthopedic Surgery`.
- `;ssmh` expands to `Samuel Simmonds Memorial Hospital`.
- `;sfa` expands to `Steve Fishback Architect`.
- `;sco` expands to `Stinebaugh & Company`.
- `;al` expands to `The American Legion`.
- `;tes` expands to `The Eureka Space`.
- `;ttcd` expands to `Tyonek Tribal Conservation District`.
- `;uwm` expands to `United Way of Mat-Su`.
- `;vfj` expands to `Victims for Justice`.
- `;ywca` expands to `YWCA Alaska`.

## Clipboard Helpers

Clipboard helpers paste your current clipboard text and place the cursor around
it in useful ways.

- `;cbb` places the cursor before the clipboard text.
- `;cbe` places the cursor after the clipboard text.
- `;cbn` inserts the clipboard text, then leaves a blank line below it.
- `;cba` leaves a blank line above the clipboard text.

These are useful when quoting copied text and then writing above, below, or
around it.

## Date and Time

Date and time expansions generate dates from your current system date and time.
Some use fixed triggers, and some let you type a number for a relative date.

### Current Date and Time

- `;time` inserts the current time in 24-hour format.
- `;date` inserts today's date as `YYYY-MM-DD`.
- `;disdate` inserts `Disabled YYYY-MM-DD`.
- `;now`, `;ddt`, `;datime`, and `;stamp` insert a full day, date, and time
  stamp.
- `;daily` inserts a daily note filename.
- `;day` inserts the current weekday name.
- `;daydate` and `;today` insert today with the weekday and date.
- `;tomorrow` inserts tomorrow with the weekday and date.
- `;yesterday` inserts yesterday with the weekday and date.
- `;month` inserts the current month name.

### Relative Days and Weeks

- `;tmr` inserts tomorrow's date.
- `;<days>.tmr` inserts the date that many days from now.
- `;yst` inserts yesterday's date.
- `;<days>.yst` inserts the date that many days ago.
- `;wkago` inserts the date one week ago.
- `;<weeks>.wkago` inserts the date that many weeks ago.
- `;nxtweek` inserts the same weekday next week.
- `;<weeks>.nxtweek` inserts the same weekday that many weeks ahead.

Examples:

```text
;3.tmr
;2.wkago
;4.nxtweek
```

### Weekday Names and Dates

Use these to insert the next matching weekday and date:

- `;mon`, `;tues`, `;wed`, `;thur`, `;fri`, `;sat`, `;sun`

Use these to insert the previous matching weekday and date:

- `;lstmon`, `;lsttues`, `;lstwed`, `;lstthur`, `;lstfri`, `;lstsat`,
  `;lstsun`

Use these to insert the matching weekday one full week beyond the next
occurrence:

- `;nxtmon`, `;nxttues`, `;nxtwed`, `;nxtthur`, `;nxtfri`, `;nxtsat`,
  `;nxtsun`

You can also type a number before the weekday pattern:

- `;<weeks>.lstmon` through `;<weeks>.lstsun` inserts that weekday from a
  previous week.
- `;<weeks>.nxtmon` through `;<weeks>.nxtsun` inserts that weekday from a
  future week.

Examples:

```text
;2.lstfri
;3.nxtwed
```

### Week Ranges

- `;wkof` inserts the current Monday-to-Sunday week range.
- `;wrkwkof` inserts the current Monday-to-Friday work week range.
- `;lstwkof` inserts last week's Monday-to-Sunday range.
- `;lstwrkwkof` inserts last week's Monday-to-Friday work week range.
- `;nxtwkof` inserts next week's Monday-to-Sunday range.
- `;nxtwrkwkof` inserts next week's Monday-to-Friday work week range.
- `;<weeks>.lstwkof` inserts the Monday-to-Sunday range that many weeks ago.
- `;<weeks>.lstwrkwkof` inserts the Monday-to-Friday range that many weeks ago.
- `;<weeks>.nxtwkof` inserts the Monday-to-Sunday range that many weeks ahead.
- `;<weeks>.nxtwrkwkof` inserts the Monday-to-Friday range that many weeks
  ahead.

### Weekly Filename Ranges

Weekly filename ranges use dates only and join them with `_-_`.

- `;wkly` inserts the current weekly date range.
- `;lstwkly` inserts last week's date range.
- `;nxtwkly` inserts next week's date range.
- `;<weeks>.lstwkly` inserts the weekly range that many weeks ago.
- `;<weeks>.nxtwkly` inserts the weekly range that many weeks ahead.

### Weekday Ranges

Weekday range expansions turn short weekday codes into readable ranges.

```text
;<start>-<end>
```

Use these weekday codes:

- `m` for Monday.
- `tu` for Tuesday.
- `w` for Wednesday.
- `th` for Thursday.
- `f` for Friday.
- `sa` for Saturday.
- `su` for Sunday.

Example:

```text
;m-f
```

This expands to:

```text
Monday - Friday
```

## Updating Your Package

When Deeptree publishes package updates, update your local installation with:

```sh
espanso package update deeptree
```

Your local work information file is not replaced by package updates.
