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

## Optional Form Expansions

Use a colon (`:`) instead of a semicolon (`;`) to open a form for the
templates listed below. Type only the form trigger: do not append a recipient,
number, comma, or final period. Fill in the fields, then click **Submit** or
press **Ctrl+Enter**. Canceling the form does not insert a completed template.

For example, `;emailnotiJordan.` expands directly, while `:emailnoti` asks
for the recipient and an optional multiline message. Enter `Jordan` in the
Recipient field and type your message on as many lines as needed. The generated
email uses the same package text, randomized variables, and local signature
values as the direct version. After submission, the cursor is placed after
your message so you can continue drafting. Leave Message blank to draft there
instead. The signature dependencies described below apply to both versions.

### Email and Dispatch Forms

All general email forms include Recipient and an optional multiline Message:

- `:emailnorm`, `:emailreq`, `:emaildisk`, `:emailfu`, `:emaildy`
- `:emailvm`, `:emailnovm`, `:emailmissvm`, `:emailmissnovm`
- `:emailnoti`, `:emailcomp`

`:emaildisk` also includes an optional Computer suffix field. Include a leading
space if supplying a computer identifier, such as ` PC-123`. Its multiline
Message is a separate paragraph rather than part of the computer sentence.

Dispatch forms also include Recipient and an optional multiline Message:

- `:resreqapp`, `:resreqnoapp`, `:resinc`, `:resspam`

The form versions preserve the template paragraphs and add a drafting area
where the direct template has none. Message text stays separate from the
standard paragraphs in the missed-appointment and spam forms.

### Structured Ticket Forms

Use `:tmpreq` for a request ticket. It provides:

- Request details (multiline).
- Impact (multiline).
- Due date (single line, free text).

Use `:tmpinc` for an incident ticket. It provides:

- Issue description (multiline).
- When it happens (multiline).
- When it first started (single line, free text).
- Impact (multiline).
- Troubleshooting steps already taken (multiline).

Ticket fields can be left blank. Both forms keep the existing headings and
follow-up reminders, preserve the line breaks you enter, and place the cursor
at the end of the ticket for additional notes.

### Credential Forms

All supported clients have a form version asking for First name and Last name:

- `:credafs`, `:credaslc`, `:credanai`, `:credcfa`
- `:credccs`, `:credcrmc`, `:credgsak`, `:credjaoa`
- `:credkc`, `:credklebs`, `:credorers`, `:credppos`

These forms use the same client settings and credential generator as the
direct triggers. They still require your separately configured `;tp` match
for the temporary password; the form does not generate a password itself.

### Date and Range Forms

Date forms ask for the number normally typed into a parameterized trigger:

- `:tmr` and `:yst` ask for Days.
- `:wkago` and `:nxtweek` ask for Weeks.
- `:lstmon`, `:lsttues`, `:lstwed`, `:lstthur`, `:lstfri`, `:lstsat`,
  and `:lstsun` ask for Weeks before the previous matching weekday.
- `:nxtmon`, `:nxttues`, `:nxtwed`, `:nxtthur`, `:nxtfri`, `:nxtsat`,
  and `:nxtsun` ask for Weeks after the next matching weekday.
- `:lstwkof`, `:lstwrkwkof`, `:nxtwkof`, and `:nxtwrkwkof` ask for Weeks
  using the same calculations as the parameterized week-range triggers.
- `:lstwkly` and `:nxtwkly` ask for Weeks for weekly filename ranges.
- `:weekdays` lets you choose start and end weekday names.

Numeric fields default to `1` and accept non-negative whole numbers, including
`0`. Blank, negative, fractional, or nonnumeric input aborts the expansion.
The calculations require GNU `date`, just like their direct counterparts.
For example, `:tmr` with `3` produces the same date as `;3.tmr`.

Forms are available for input-taking expansions and structured tickets.
Short fixed-text helpers such as `;signature`, `;greet`, and client-name
shortcuts keep their direct triggers.

## Dynamic Emails

Dynamic email triggers create full email drafts. Type the trigger, the person's
or group's name, and the final period.

The package fills in the greeting, email body, and signature. Some parts are
randomized by package variables so the output does not always sound exactly the
same. Your locally configured setup values supply your name and title. The
signature includes the company and helpdesk phone number, not an email address;
`;dtemail` separately inserts your work email address.

See the [global variable guide](global-variables.md) for variable definitions.
Below, **direct** globals are referenced by the expansion itself. **Indirect**
globals are referenced inside those globals, including nested dependencies.
Regex values such as `person` are typed captures, not global variables.

Every general email and dispatch response directly uses
[greeting](global-variables.md#greeting),
[addongreeting](global-variables.md#addongreeting), and
[signature](global-variables.md#signature). Their shared indirect dependencies
come from `signature`: [signoff](global-variables.md#signoff),
[myname](global-variables.md#myname), [title](global-variables.md#title),
[company](global-variables.md#company), [dthelp](global-variables.md#dthelp),
and [quote](global-variables.md#quote). In turn, `myname` uses
[myfirst](global-variables.md#myfirst) and [mylast](global-variables.md#mylast).
Each email below inherits this shared indirect list; additional paths are
listed separately, even when they reach the same `dthelp` global.

**Current import limitation:** `deeptree/package.yml` does not import
`deeptree/matches/variables/static/name.yml`, which defines `myname` and
`mylegalname`. Signatures, full emails, and name expansions that depend on
these globals require them to be loaded separately. Local first and last name
values alone do not load these composed globals. This guide documents the
limitation; it does not change the package imports.

### General Email Templates

- `;emailnorm<person>.` creates a normal Deeptree email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [dthelp](global-variables.md#dthelp).
  Indirect: shared signature dependencies only.
- `;emailreq<person>.` creates a response-requested email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emaildisk<person>.` creates a disk-space cleanup request.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emailfu<person>.` creates a follow-up email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [followup](global-variables.md#followup),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emaildy<person>.` creates a done-yet follow-up email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [noresponse](global-variables.md#noresponse),
  [assornoass](global-variables.md#assornoass).
  Indirect: shared list, plus `assornoass` includes both
  [stillreqass](global-variables.md#stillreqass) and
  [nolongerreqass](global-variables.md#nolongerreqass); `stillreqass` uses
  [dthelp](global-variables.md#dthelp). Both assistance paragraphs appear;
  `assornoass` is not a random choice between them.
- `;emailvm<person>.` creates a voicemail follow-up email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [voicemail](global-variables.md#voicemail),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emailnovm<person>.` creates an unable-to-leave-voicemail follow-up.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [novoicemail](global-variables.md#novoicemail),
  [novmfollowup](global-variables.md#novmfollowup),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emailmissvm<person>.` creates a missed-appointment email when a voicemail
  or message was left.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [voicemail](global-variables.md#voicemail),
  [missappvm](global-variables.md#missappvm),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emailmissnovm<person>.` creates a missed-appointment email when no
  voicemail was left.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [novoicemail](global-variables.md#novoicemail),
  [missappnovm](global-variables.md#missappnovm),
  [reqresponse](global-variables.md#reqresponse).
  Indirect: shared list, plus `reqresponse` uses
  [dthelp](global-variables.md#dthelp).
- `;emailnoti<person>.` creates a notification email that says no response is
  required.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [notification](global-variables.md#notification).
  Indirect: shared list, plus `notification` uses
  [dthelp](global-variables.md#dthelp).
- `;emailcomp<person>.` creates a completion notification email.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [completedwork](global-variables.md#completedwork),
  [checkup](global-variables.md#checkup), [dthelp](global-variables.md#dthelp).
  Indirect: shared signature dependencies only.

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
  Direct: [signature](global-variables.md#signature).
  Indirect: the shared signature dependencies listed under Dynamic Emails.
- `;greet` inserts a randomized greeting.
  Direct: [greeting](global-variables.md#greeting). Indirect: none.
- `;addongreet` inserts a randomized sentence that follows a greeting.
  Direct: [addongreeting](global-variables.md#addongreeting). Indirect: none.
- `;otu` inserts a short explanation for a one-time-use link.
  Direct and indirect globals: none; this is static text.
- `;dtemail` inserts your configured Deeptree work email address.
  Direct: [workemail](global-variables.md#workemail). Indirect: none.
- `;quote` inserts a randomized quotation.
  Direct: [quote](global-variables.md#quote). Indirect: none.

Use these when you want help with only part of an email instead of generating a
full template.

## Dispatch Responses

Dispatch response expansions create first-response email templates. They use the
same name pattern as the dynamic email templates.

- `;resreqapp<person>.` creates a request response with an appointment step.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [outreachthanks](global-variables.md#outreachthanks),
  [assigned](global-variables.md#assigned),
  [setappointment](global-variables.md#setappointment),
  [deadlines](global-variables.md#deadlines).
  Indirect: shared signature dependencies only.
- `;resreqnoapp<person>.` creates a request response without an appointment
  step.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [outreachthanks](global-variables.md#outreachthanks),
  [assigned](global-variables.md#assigned),
  [deadlines](global-variables.md#deadlines).
  Indirect: shared signature dependencies only.
- `;resinc<person>.` creates an incident response with an appointment step.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [outreachthanks](global-variables.md#outreachthanks),
  [assigned](global-variables.md#assigned),
  [setappointment](global-variables.md#setappointment).
  Indirect: shared signature dependencies only.
- `;resspam<person>.` creates a spam-ticket response.
  Direct: [greeting](global-variables.md#greeting),
  [addongreeting](global-variables.md#addongreeting),
  [signature](global-variables.md#signature),
  [outreachthanks](global-variables.md#outreachthanks),
  [assigned](global-variables.md#assigned).
  Indirect: shared signature dependencies only.

Example:

```text
;resreqappJordan.
```

This creates a response addressed to `Jordan`, thanks them for reaching out,
adds assignment and scheduling language, and includes your signature.

## Random-Choice Outcomes

For a fixed recipient and fixed technician configuration, with no handwritten
content added at the cursor, every full email has the same base choice count:
[greeting](global-variables.md#greeting) (13) `*`
[addongreeting](global-variables.md#addongreeting) (22) `*`
[signoff](global-variables.md#signoff) (15) `*`
[quote](global-variables.md#quote) (17) = **72,930**.
`signature` composes the signoff and quote; it is not another random factor.

The table multiplies this base by each email's additional random variables.
Counts describe random-choice combinations, not guaranteed unique rendered
strings. They assume all dependencies resolve, including the missing name
import described above. Random selections may repeat between expansions.
These counts make no claims about selection probabilities.

Table rows exceed 80 columns to keep factor names and arithmetic auditable.

| Full email trigger | Additional factors (variable and choice count) | Additional multiplier | Combinations (72,930 * multiplier) |
| --- | --- | ---: | ---: |
| `;emailnorm<person>.` | None | 1 | 72,930 |
| `;emailreq<person>.` | `reqresponse` (12) | 12 | 875,160 |
| `;emaildisk<person>.` | `reqresponse` (12) | 12 | 875,160 |
| `;emailfu<person>.` | `followup` (5) `*` `reqresponse` (12) | 60 | 4,375,800 |
| `;emaildy<person>.` | `noresponse` (9) `*` `stillreqass` (11) `*` `nolongerreqass` (11); the two assistance variables come via `assornoass` | 1,089 | 79,420,770 |
| `;emailvm<person>.` | `voicemail` (15) `*` `reqresponse` (12) | 180 | 13,127,400 |
| `;emailnovm<person>.` | `novoicemail` (15) `*` `novmfollowup` (5) `*` `reqresponse` (12) | 900 | 65,637,000 |
| `;emailmissvm<person>.` | `voicemail` (15) `*` `missappvm` (15) `*` `reqresponse` (12) | 2,700 | 196,911,000 |
| `;emailmissnovm<person>.` | `novoicemail` (15) `*` `missappnovm` (15) `*` `reqresponse` (12) | 2,700 | 196,911,000 |
| `;emailnoti<person>.` | `notification` (5) | 5 | 364,650 |
| `;emailcomp<person>.` | `completedwork` (15) `*` `checkup` (5) | 75 | 5,469,750 |
| `;resreqapp<person>.` | `outreachthanks` (3) `*` `assigned` (4) `*` `setappointment` (6) `*` `deadlines` (6) | 432 | 31,505,760 |
| `;resreqnoapp<person>.` | `outreachthanks` (3) `*` `assigned` (4) `*` `deadlines` (6) | 72 | 5,250,960 |
| `;resinc<person>.` | `outreachthanks` (3) `*` `assigned` (4) `*` `setappointment` (6) | 72 | 5,250,960 |
| `;resspam<person>.` | `outreachthanks` (3) `*` `assigned` (4) | 12 | 875,160 |

## Dispatch Ticket Templates

Dispatch ticket templates help start ticket bodies with the standard prompts and
follow-up reminders already included.

All expansions in this section use no direct or indirect globals. They insert
static text and a cursor marker, with no local variables or typed captures.

- `;tmpreq` creates a request ticket template.
- `;tmpinc` creates an incident ticket template.

Use these in ticket descriptions when you want a structured starting point for
the request, impact, due date, symptoms, troubleshooting, and follow-up steps.

## Credential Generation

Credential expansions generate starter username and email documentation for
supported clients, then invoke a separate `;tp` match for the password.

The credential definitions listed here reference no globals directly.
`firstname` and `lastname` are regex captures. `client_config`, `credentials`,
and `temppass` are match-local variables: they supply client settings, run the
script, and invoke the `;tp` match for the temporary password, respectively.
They are not technician name globals. The package does not define `;tp`, so
its behavior and any indirect global dependencies depend on your local match.

Before using a credential expansion, configure `;tp` separately. If your match
inserts clipboard text, create the user's password and copy it first. You can
use `xkpasswd.net` to create a memorable password. Copying a password alone
does not supply the missing match.

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
normalizes the name, applies the client username format, and creates the email
address for that client.
The script does not supply the password; your separately configured `;tp`
match does.

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
  Direct: [myfirst](global-variables.md#myfirst). Indirect: none.
- `;last` inserts your last name.
  Direct: [mylast](global-variables.md#mylast). Indirect: none.
- `;name` inserts your full display name.
  Direct: [myname](global-variables.md#myname).
  Indirect: [myfirst](global-variables.md#myfirst),
  [mylast](global-variables.md#mylast).
- `;legalname` inserts your full legal name.
  Direct: [mylegalname](global-variables.md#mylegalname).
  Indirect: [myfirst](global-variables.md#myfirst),
  [mymiddle](global-variables.md#mymiddle),
  [mylast](global-variables.md#mylast).
- `;fullname` also inserts your full legal name.
  Direct: [mylegalname](global-variables.md#mylegalname).
  Indirect: [myfirst](global-variables.md#myfirst),
  [mymiddle](global-variables.md#mymiddle),
  [mylast](global-variables.md#mylast).
  This is an alias of `;legalname` with the same dependencies.

## Client Name Shortcuts

Client name shortcuts expand short codes into full client names and place your
cursor after the inserted name.

All client name shortcuts listed here use no direct or indirect globals. They
insert static names and cursor markers, with no local variables or captures.

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

All clipboard expansions listed here use no direct or indirect globals. Each
defines its own match-local `clipboard` variable using the clipboard extension;
there are no typed captures.

- `;cbb` places the cursor before the clipboard text.
- `;cbe` places the cursor after the clipboard text.
- `;cbn` inserts the clipboard text, then leaves a blank line below it.
- `;cba` leaves a blank line above the clipboard text.

These are useful when quoting copied text and then writing above, below, or
around it.

## Date and Time

Date and time expansions generate dates from your current system date and time.
Some use fixed triggers, and some let you type a number for a relative date.

All date and time expansions in every subsection below, including aliases,
use no direct or indirect globals. They use match-local date or shell variables
and, for regex triggers, typed captures such as `days`, `weeks`, `start`, and
`end`. A local result can feed another local calculation, such as a week end
derived from a week start; that is not a global dependency. In particular,
`;today` and its alias `;daydate` use the local `current_day` date variable,
not the global [today](global-variables.md#today).

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
