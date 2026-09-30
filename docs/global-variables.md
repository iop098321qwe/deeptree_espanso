# Global Variables

This reference covers all 35 names declared under `global_vars` in
`deeptree/matches/**/*.yml` and `templates/work_information.yml`: 21 random
variables with 224 choices, 13 echo variables, and one date variable.
Source paths below are relative to the repository root.

## Scope and Behavior

Use a global as `{{variable}}` in a replacement or another variable's
content. Dependencies below mean globals referenced by that variable's
content, not every snippet that uses it. `None` means no such references.

Only entries under `global_vars` are globals. A match's `vars` entries are
local to that match, even when its file lives under `matches/globals/`.
For example, `clipboard` in `globals/paste_clipboard.yml` is local;
date helpers such as `mydate`, `week_start`, and `week_end` are also local.
Named regex captures, such as `person` from `(?P<person>.*)`, come from
the typed trigger and are not declared globals. `$|$` is a cursor marker,
not a variable.

Random variables select one configured choice when evaluated. They do not
rotate through the list or guarantee unique results: consecutive expansions
can repeat. There is no fixed default choice. References such as `{{dthelp}}`
inside choices are retained below and resolved when expanding the content.

The numbered lists preserve all choices in source order. Inline code shows
the exact string content; surrounding quotes on whitespace-sensitive
choices are delimiters, not output. Thus `"Hello "` ends with one space,
`" I hope this email finds you well,"` starts with one space, and `""`
means an empty string. Quotes within the `quote` choices are actual output.
Exact long strings and source paths are code line-length exceptions so their
content is not altered by wrapping.

Both `greeting` and `addongreeting` have an empty option. In email templates,
`{{greeting}}{{person}},{{addongreeting}}` retains the person's name and the
template's comma even when either or both random selections are empty.

Package globals are loaded through `deeptree/package.yml` imports.
**`deeptree/matches/variables/static/name.yml` is not imported there.**
Its `myname` and `mylegalname` definitions exist in source but are not loaded
through that entry point. Matches and `signature` reference these names, so
they need definitions loaded separately to resolve. This reference records
the omission; it does not change imports or repair it.

Technician globals are supplied by `templates/work_information.yml`, not
the package. Copy that template into your Espanso match directory outside
the package and customize its placeholder values. Package updates do not
manage those local values.

`helpdesk_email`, `myemail`, and `today` are declared but currently unused
by replacements or variable content in `deeptree/matches/**/*.yml` and the
technician template. They remain available for user-defined snippets.

## Technician Variables

### myfirst

- Type: `echo`.
- Default content: `First`.
- Purpose: Technician's first name; used by `;first` and composite names.
- Dependencies: None.
- Source: `templates/work_information.yml`.

### mymiddle

- Type: `echo`.
- Default content: `Middle`.
- Purpose: Technician's middle name for `mylegalname`.
- Dependencies: None.
- Source: `templates/work_information.yml`.

### mylast

- Type: `echo`.
- Default content: `Last`.
- Purpose: Technician's last name; used by `;last` and composite names.
- Dependencies: None.
- Source: `templates/work_information.yml`.

### myemail

- Type: `echo`.
- Default content: `personal@example.com`.
- Purpose: Technician's personal email address; currently unused in package
  replacements and variable content.
- Dependencies: None.
- Source: `templates/work_information.yml`.

### workemail

- Type: `echo`.
- Default content: `first.last@deeptree.tech`.
- Purpose: Technician's work email address for the `;dtemail` expansion,
  not the signature.
- Dependencies: None.
- Source: `templates/work_information.yml`.

### title

- Type: `echo`.
- Default content: `Technician`.
- Purpose: Technician's job title in `signature`.
- Dependencies: None.
- Source: `templates/work_information.yml`.

## Static and Composite Variables

### myname

- Type: `echo`.
- Exact content: `{{myfirst}} {{mylast}}`.
- Purpose: First and last name for `;name` and `signature`; template defaults
  would produce `First Last` if this definition were loaded.
- Dependencies: `myfirst`, `mylast`.
- Source: `deeptree/matches/variables/static/name.yml`.
- Loading: Missing from `deeptree/package.yml` imports.

### mylegalname

- Type: `echo`.
- Exact content: `{{myfirst}} {{mymiddle}} {{mylast}}`.
- Purpose: Full name for `;legalname` and `;fullname`; template defaults
  would produce `First Middle Last` if this definition were loaded.
- Dependencies: `myfirst`, `mymiddle`, `mylast`.
- Source: `deeptree/matches/variables/static/name.yml`.
- Loading: Missing from `deeptree/package.yml` imports.

The composite inserts literal spaces around `mymiddle`; an empty middle
name does not remove either space.

### helpdesk_email

- Type: `echo`.
- Exact content: `helpdesk@deeptree.tech`.
- Purpose: Shared help desk email address; currently unused in package
  replacements and variable content.
- Dependencies: None.
- Source: `deeptree/matches/variables/static/company.yml`.

### company

- Type: `echo`.
- Exact content: `Deeptree, Inc.`.
- Purpose: Company name in `signature`.
- Dependencies: None.
- Source: `deeptree/matches/variables/static/company.yml`.

### dthelp

- Type: `echo`.
- Exact content: `+1 907 206 2373`.
- Purpose: Shared help desk phone number for signatures, email contact
  instructions, and random response-request paragraphs.
- Dependencies: None.
- Source: `deeptree/matches/variables/static/phone_numbers.yml`.

### today

- Type: `date`.
- Exact format: `%Y-%m-%d`.
- Content: Current date at evaluation, as a four-digit year, two-digit month,
  and two-digit day separated by hyphens, for example `2026-09-30`.
- Purpose: Reusable current date; currently unused in package replacements
  and variable content. It is not a fixed date or the local `mydate` helper.
- Dependencies: None; uses Espanso's date extension.
- Source: `deeptree/matches/variables/static/date.yml`.

### assornoass

- Type: `echo`.
- Purpose: Combines both assistance-status paragraphs. It does not randomly
  choose between them: it includes one `stillreqass` choice, a blank line,
  and one `nolongerreqass` choice.
- Dependencies: `stillreqass`, `nolongerreqass`; transitively `dthelp`.
- Source: `deeptree/matches/variables/static/assornoass.yml`.

Exact content (`|-` in YAML strips the final newline):

```text
{{stillreqass}}

{{nolongerreqass}}
```

### signature

- Type: `echo`.
- Purpose: Dynamic email signature with a random signoff and quote, the
  technician's name and title, company, and shared help desk phone number.
- Dependencies: `signoff`, `myname`, `title`, `company`, `dthelp`, `quote`;
  transitively `myfirst` and `mylast` through `myname`.
- Source: `deeptree/matches/variables/static/signature.yml`.

Exact content (`|-` in YAML strips the final newline):

```text
{{signoff}}

{{myname}}
{{title}}
{{company}}
{{dthelp}}

---
{{quote}}
```

The signature does **not** include any email address: neither `workemail`,
`myemail`, nor `helpdesk_email` appears in its content. Its `myname`
dependency is affected by the missing `static/name.yml` package import.

## Random Variables

Each entry has type `random`, no fixed default, and the complete list of
exact configured choices below.

### addongreeting

- Type: `random`.
- Purpose: Optional continuation after the recipient's name and comma.
  Nonempty choices begin with one space; the final choice is empty.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/addongreeting.yml`.

Choices (22):

1. `" I hope this email finds you well,"`
2. `" I hope you are doing well,"`
3. `" a quick email for you,"`
4. `" just reaching out with an email for you,"`
5. `" I hope everything is going smoothly,"`
6. `" I hope you are having a productive week,"`
7. `" I trust you are having a great day so far,"`
8. `" hope all is well with you,"`
9. `" hope your week is going well so far,"`
10. `" I hope your day has been treating you kindly,"`
11. `" I hope this message reaches you in good spirits,"`
12. `" reaching out with a brief email,"`
13. `" I trust all is proceeding smoothly on your side,"`
14. `" hoping things are going well for you,"`
15. `" a quick message to stay in touch,"`
16. `" wishing you a smooth and productive day,"`
17. `" I hope your week is progressing positively,"`
18. `" I trust everything is running well on your end,"`
19. `" I hope matters are going well for you,"`
20. `" I wanted to take a moment to connect with you,"`
21. `" an email for your consideration,"`
22. `""`

### assigned

- Type: `random`.
- Purpose: Confirms assignment of a support ticket to a technician.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/assigned.yml`.

Choices (4):

1. `Your ticket has been assigned to a technician.`
2. `A technician has been assigned to your ticket.`
3. `This has been assigned to a technician.`
4. `We have assigned a technician to your ticket.`

### checkup

- Type: `random`.
- Purpose: Asks the recipient to verify completed work despite no required
  further action.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/checkup.yml`.

Choices (5):

1. `Although no further action is required at this time, we recommend confirming that there are no remaining errors and that the work meets your expectations.`
2. `No additional action is currently required, but we recommend reviewing the results to ensure everything is working as expected and no issues remain.`
3. `While there are no further steps required, it is recommended that you verify the work and confirm that everything meets your expectations.`
4. `No additional action is needed at this time; however, we recommend checking that there are no outstanding errors and that the work is satisfactory.`
5. `Although no further action is necessary, please take a moment to confirm that everything is functioning properly and that the work meets your expectations.`

### completedwork

- Type: `random`.
- Purpose: Announces completion of requested work and ticket closure.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/completedwork.yml`.

Choices (15):

1. `I am reaching out to let you know that the work associated with your ticket has been completed and the ticket will now be closed.`
2. `I wanted to inform you that the requested work has been completed and your ticket will be closed at this time.`
3. `The work related to your request has been completed, and we will be closing your ticket at this time.`
4. `I am following up to confirm that the work for your ticket has been completed and the ticket will now be closed.`
5. `I am writing to confirm that your request has been completed and your ticket will be closed at this time.`
6. `The requested work has now been completed, and your ticket will be closed accordingly.`
7. `I wanted to provide an update that the work associated with your ticket is complete and the ticket will now be closed.`
8. `Your requested work has been completed, and we will proceed with closing the ticket at this time.`
9. `I am reaching out to confirm that the work requested in your ticket has been completed and the ticket is ready to be closed.`
10. `The work for your ticket has been completed successfully, and we will be closing the ticket at this time.`
11. `I am following up to let you know that your request has been completed and the associated ticket will now be closed.`
12. `We have completed the work associated with your request and will be closing the ticket at this time.`
13. `I wanted to let you know that the requested work is now complete and your ticket will be closed.`
14. `The work outlined in your ticket has been completed, and we will now proceed with closing the ticket.`
15. `I am emailing to confirm that the requested work has been completed and your ticket will be closed at this time.`

### deadlines

- Type: `random`.
- Purpose: Requests deadlines or scheduling constraints and directs urgent
  requests to phone support.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/deadlines.yml`.

Choices (6):

1. `Are there any hard deadlines or scheduling requirements for this ticket? If this is urgent or requires immediate assistance, please call us so we can connect you with a technician.`
2. `Please let us know of any hard deadlines, required timeframes, or scheduling factors for this ticket. For urgent issues or emergencies, please call us for direct technician assistance.`
3. `Are there any specific deadlines or timing requirements we should consider for this ticket? If immediate assistance is needed, please call us so we can connect you with a technician.`
4. `Could you clarify any hard deadlines or scheduling constraints related to this ticket? If this is urgent, please call us directly so we can connect you with a technician.`
5. `Please share any deadlines or scheduling requirements that may affect this ticket. If this is an urgent ticket or emergency, please call us for immediate technician assistance.`
6. `Are there any required completion dates or scheduling limitations for this ticket? If immediate support is needed, please call us so we can connect you directly with a technician.`

### followup

- Type: `random`.
- Purpose: Checks support ticket status and outstanding work or concerns.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/followup.yml`.

Choices (5):

1. `This email is to follow up on the current status of your support ticket and to confirm that any remaining items related to your request are being properly addressed.`
2. `I am reaching out to check on the status of your support ticket and to ensure that any outstanding concerns or requests are receiving the appropriate attention.`
3. `This message is intended to follow up on your support ticket and verify that all remaining matters associated with your request are being addressed as needed.`
4. `I am following up regarding your support ticket to confirm its current status and ensure that any unresolved items are being appropriately handled.`
5. `This email is to check in on your support request and make sure that any outstanding questions, concerns, or remaining work are being addressed.`

### greeting

- Type: `random`.
- Purpose: Optional opening before the recipient's name. Nonempty choices
  end with one space; the final choice is empty.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/greeting.yml`.

Choices (13):

1. `"Hello "`
2. `"Hello there "`
3. `"How are you "`
4. `"Greetings "`
5. `"Salutations "`
6. `"Regards "`
7. `"High regards "`
8. `"Blessings "`
9. `"Hail "`
10. `"Cordial greetings "`
11. `"Humble greetings "`
12. `"Salute "`
13. `""`

### missappnovm

- Type: `random`.
- Purpose: Explains a missed appointment when no contact or message was
  possible and requests rescheduling.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/missappnovm.yml`.

Choices (15):

1. `As we were unable to reach you, leave a voicemail, or leave a message at the scheduled appointment time, the appointment could not be completed and we will need to coordinate a new time that works with your availability.`
2. `We were unable to connect with you or leave a voicemail or message at the scheduled appointment time, so the appointment could not be completed and will need to be rescheduled.`
3. `Since we were unable to reach you or leave a message at the scheduled time, we could not complete the appointment and will need to arrange a new time to connect.`
4. `We were unable to make contact or leave a voicemail or message during the scheduled appointment, so we will need to coordinate another time based on your availability.`
5. `As we could not reach you or leave a voicemail or message at the scheduled time, the appointment was unable to be completed and will need to be rescheduled.`
6. `We attempted to connect at the scheduled appointment time but were unable to reach you or leave a voicemail or message. We will need to coordinate a new time that works for you.`
7. `Since we were unable to make contact or leave a message at the scheduled appointment time, we will need to arrange another time to complete the appointment.`
8. `We were unable to reach you and could not leave a voicemail or message at the scheduled time, so the appointment could not proceed and will need to be rescheduled.`
9. `As we were unable to connect with you or leave a voicemail or message during the scheduled appointment, we will need to coordinate a new time that aligns with your availability.`
10. `We were not able to reach you or leave a message at the scheduled appointment time, so the appointment could not be completed and a new time will need to be arranged.`
11. `Because we were unable to make contact or leave a voicemail or message at the scheduled time, we will need to reschedule the appointment for a time that better fits your availability.`
12. `We were unable to connect as scheduled and could not leave a voicemail or message. We will need to coordinate a new appointment time that works with your schedule.`
13. `Since we could not reach you or leave a voicemail or message during the scheduled appointment window, we will need to arrange another time to connect.`
14. `The scheduled appointment could not be completed because we were unable to reach you or leave a voicemail or message. We will need to coordinate a new time to connect.`
15. `As we were unable to establish contact or leave a message at the scheduled appointment time, we will need to reschedule for a time that works with your availability.`

### missappvm

- Type: `random`.
- Purpose: Explains a missed appointment and the need to reschedule. The
  email template supplies the separate `voicemail` paragraph; these choices
  do not themselves say that a voicemail was left.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/missappvm.yml`.

Choices (15):

1. `As we were unable to reach you at the scheduled appointment time, the appointment could not be completed and we will need to coordinate a new time that works with your availability.`
2. `We were unable to connect with you at the scheduled appointment time, so the appointment could not be completed. We will need to arrange a new time that better aligns with your availability.`
3. `Since we were unable to reach you at the scheduled time, we were not able to complete the appointment and will need to coordinate another time to connect.`
4. `We were unable to make contact at the scheduled appointment time, so we will need to reschedule for a time that works with your availability.`
5. `As we could not reach you at the scheduled appointment time, we were unable to complete the appointment and will need to arrange a new time to connect.`
6. `We were unable to connect as scheduled, so the appointment could not be completed. We will need to coordinate a new appointment time based on your availability.`
7. `Since we were not able to reach you at the scheduled time, the appointment was unable to be completed and will need to be rescheduled for a more convenient time.`
8. `We attempted to connect at the scheduled appointment time but were unable to reach you. We will need to coordinate a new time that aligns with your availability.`
9. `As we were unable to make contact at the scheduled time, the appointment could not proceed and we will need to arrange another time to connect.`
10. `We were unable to reach you for the scheduled appointment, so we will need to reschedule and coordinate a new time that works for you.`
11. `Because we were unable to connect at the scheduled appointment time, the appointment could not be completed and a new time will need to be arranged.`
12. `We were not able to make contact at the scheduled time, so the appointment will need to be rescheduled for a time that better fits your availability.`
13. `Since we were unable to connect with you as scheduled, we will need to coordinate another appointment time that works with your schedule.`
14. `The scheduled appointment could not be completed because we were unable to reach you at that time. We will need to arrange a new time to connect.`
15. `As we were unable to reach you during the scheduled appointment window, we will need to coordinate a new time to complete the appointment.`

### nolongerreqass

- Type: `random`.
- Purpose: Requests confirmation for ticket closure if support is no longer
  needed; also supplies the second paragraph of `assornoass`.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/nolongerreqass.yml`.

Choices (11):

1. `If the issue has been resolved and no further support is needed, please let us know so that we may proceed with closing the ticket.`
2. `If the matter has already been resolved and you no longer need assistance, kindly let us know so we can proceed with closing the ticket.`
3. `Should the issue be resolved and no additional support required, please inform us so we may finalize and close the ticket.`
4. `If your concern has been addressed and no further help is needed, please reply to confirm so that we can close the ticket.`
5. `In the event that the issue has been resolved and support is no longer necessary, please notify us so we may close the ticket.`
6. `If the problem has been resolved and you require no additional assistance, kindly let us know so that we can complete the ticket closure.`
7. `Should no further assistance be required and the matter be resolved, please confirm with us so we may close the ticket accordingly.`
8. `If your issue has been successfully resolved and you no longer need support, please inform us so we can proceed with closing the ticket.`
9. `Once the issue is resolved and no additional support is necessary, we kindly ask that you let us know so we may close the ticket.`
10. `If there is no longer a need for support and the issue is resolved, please reply to this message so that we may close the ticket.`
11. `Should the matter already be resolved and no further help required, please confirm with us so we may finalize the ticket closure.`

### noresponse

- Type: `random`.
- Purpose: Follows up when no recent response or update has been received.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/noresponse.yml`.

Choices (9):

1. `As we have not received a recent response, we would like to confirm the current status of your ticket and ensure it is addressed in a timely manner.`
2. `As we have not yet received a reply, we would like to confirm the current status of your ticket and ensure it is progressing appropriately.`
3. `Since we have not heard back recently, we are reaching out to verify the status of your ticket and confirm that it is being addressed in a timely manner.`
4. `Because no recent response has been received, we are checking in to determine the current status of your ticket and to confirm it remains on track for resolution.`
5. `As there has been no recent communication, we would like to follow up regarding the status of your ticket and confirm that it is moving forward as expected.`
6. `Given we do not have a recent update, we are writing to check on the current status of your ticket and ensure it receives the attention it requires.`
7. `Since we have not received an update, we would like to confirm where your ticket currently stands and make sure it is being handled without delay.`
8. `As we have not heard from you, we want to follow up on the status of your ticket and ensure it is receiving the necessary attention.`
9. `Because no recent update has been provided, we are reaching out to review the current status of your ticket and confirm timely resolution.`

### notification

- Type: `random`.
- Purpose: Notification footer inviting replies or calls if anything needs
  attention.
- Dependencies: `dthelp`.
- Source: `deeptree/matches/variables/adjustable/email/notification.yml`.

Choices (5):

1. `This is a notification email. If anything does not meet satisfactory completion standards, please reply directly to this email or call {{dthelp}} with any additional information, questions, or concerns.`
2. `This message is intended as a notification. If anything does not meet satisfactory standards or requires further attention, please respond directly to this email or contact {{dthelp}} with any additional details or concerns.`
3. `This is a notification email. If anything appears incomplete, incorrect, or requires additional attention, please reply to this email or call {{dthelp}} with any questions, concerns, or further information.`
4. `This message serves as a notification. If anything requires further review or attention, please respond directly to this email or contact {{dthelp}} with any additional information, questions, or concerns.`
5. `This is a notification email. If you have any additional information, questions, or concerns, or if anything does not meet satisfactory standards, please reply directly to this email or call {{dthelp}}.`

### novoicemail

- Type: `random`.
- Purpose: Explains an unsuccessful call when no voicemail or contact was
  possible and follows up by email.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/novoicemail.yml`.

Choices (15):

1. `I attempted to reach you by phone earlier but was unable to make contact. I was not able to leave a voicemail or reach the number on file, so I am following up by email to ensure the message was received.`
2. `I tried to contact you by phone earlier but was unable to reach you. I could not leave a voicemail or connect using the number on file, and am following up with this email instead.`
3. `I attempted to call you earlier but was unable to make contact. Since I was unable to leave a voicemail or reach the number provided, I am following up by email to ensure you receive the message.`
4. `I reached out by phone earlier but was unable to get in touch. I was unable to leave a voicemail or connect through the number on file, so I am sending this email as a follow-up.`
5. `I attempted to contact you earlier by phone but was unable to reach you. I could not leave a voicemail or successfully connect using the number on file, and am following up by email.`
6. `I tried to reach you by phone earlier but was unsuccessful. I was unable to leave a voicemail or reach the listed number, so I am following up with this email to make sure the message reaches you.`
7. `I attempted to call earlier but was unable to connect. I was not able to leave a voicemail or reach you at the number on file, and am following up by email to ensure the message is received.`
8. `I was unable to reach you by phone earlier and could not leave a voicemail or connect using the number on file. I am following up with this email to ensure you receive the information.`
9. `I tried to get in touch by phone earlier but was unable to make contact. Since I could not leave a voicemail or reach the number on file, I am following up by email.`
10. `I attempted to reach you earlier by phone but was unable to connect. I could not leave a voicemail or successfully reach the number listed, so I am following up with this email.`
11. `I reached out by phone earlier but was unable to make contact. I was unable to leave a voicemail or reach the number we have on file, and am following up by email to ensure the message is received.`
12. `I attempted to contact you by phone earlier but was unsuccessful. I could not leave a voicemail or connect using the listed number, so I am following up with this email.`
13. `I tried to reach you earlier by phone but was unable to connect. Because I was unable to leave a voicemail or reach the number on file, I am following up by email to make sure the message is received.`
14. `I attempted to call you earlier but was not able to reach you. I could not leave a voicemail or connect through the number on file, and am now following up with this email.`
15. `I was unable to make contact by phone earlier and was not able to leave a voicemail or reach the listed number. I am following up by email to ensure you receive the message.`

### novmfollowup

- Type: `random`.
- Purpose: Proposes coordinating a time to connect after unsuccessful
  contact without a message.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/novmfollowup.yml`.

Choices (5):

1. `Since we were unable to reach you or leave a message, we will likely need to coordinate a time to connect that works with your availability.`
2. `As we were unable to make contact or leave a message, we will need to arrange a time to connect that is convenient for you.`
3. `Because we were unable to reach you or leave a message, we will likely need to schedule a time to connect based on your availability.`
4. `We were unable to reach you or leave a message, so we will need to coordinate a suitable time to connect with you.`
5. `Since we could not make contact or leave a message, we will likely need to arrange a new time to connect that works with your schedule.`

### outreachthanks

- Type: `random`.
- Purpose: Thanks the recipient for contacting the help desk or submitting
  a ticket.
- Dependencies: None; the company wording is literal, not `{{company}}`.
- Source: `deeptree/matches/variables/adjustable/email/thanking.yml`.

Choices (3):

1. `Thank you for reaching out to the Deeptree helpdesk.`
2. `We appreciate you bringing this to our attention.`
3. `We extend our thanks for submitting this ticket.`

### quote

- Type: `random`.
- Purpose: Quotation and attribution for `signature` and `;quote`.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/quotes.yml`.

Choices (17), including literal quotation marks:

1. `"The only thing more expensive than hiring a professional is hiring an amateur." - Red Adair`
2. `"If you define the problem correctly, you almost have the solution." - Steve Jobs`
3. `"Every problem has a solution. You just have to be creative enough to find it." - Travis Kalanick`
4. `"A problem well stated is a problem half solved." - Charles Kettering`
5. `"Efficiency is doing things right; effectiveness is doing the right things." - Peter Drucker`
6. `"Knowledge is of no value unless you put it into practice." - Anton Chekhov`
7. `"To err is human, but to really foul things up you need a computer." - Paul R. Ehrlich`
8. `"Cybersecurity is much more than a matter of IT." - Stephane Nappo`
9. `"An ounce of prevention is worth a pound of cure." - Benjamin Franklin`
10. `"Quality means doing it right when no one is looking." - Henry Ford`
11. `"Security is a process, not a product." - Bruce Schneier`
12. `"Never trust a computer you cannot throw out a window." - Steve Wozniak`
13. `"Computers are good at following instructions, but not at reading your mind." - Donald Knuth`
14. `"Technology is best when it brings people together." - Matt Mullenweg`
15. `"There are no problems, only solutions." - John Lennon`
16. `"Progress is impossible without change, and those who cannot change their minds cannot change anything." - George Bernard Shaw`
17. `"In IT, change is the only constant." - Common Industry Aphorism`

### reqresponse

- Type: `random`.
- Purpose: Requests a reply or phone call to confirm ticket next steps.
- Dependencies: `dthelp`.
- Source: `deeptree/matches/variables/adjustable/email/reqresponse.yml`.

Choices (12):

1. `We kindly request that you respond to this email or call us at {{dthelp}} at your earliest convenience to confirm the next steps regarding your ticket.`
2. `Please reply to this email or contact us at {{dthelp}} when convenient so we can determine how to proceed with your ticket.`
3. `We would appreciate a response to this email or a call to {{dthelp}} so we can coordinate the next steps for your request.`
4. `When you have a chance, please respond to this email or reach us at {{dthelp}} so we can continue working on your ticket.`
5. `Please get back to us by replying to this email or calling {{dthelp}} so we can confirm how you would like to move forward.`
6. `At your convenience, please reply to this email or contact us at {{dthelp}} so we can continue assisting with your request.`
7. `We are awaiting your response before proceeding. Please reply to this email or contact us at {{dthelp}} when you are able.`
8. `Please follow up with us by replying to this email or calling {{dthelp}} so we can determine the appropriate next steps for your ticket.`
9. `When convenient, please send us a response to this email or contact us at {{dthelp}} so we can move forward with your ticket.`
10. `We would appreciate hearing back from you regarding this ticket. You may reply to this email or call us at {{dthelp}}.`
11. `Please provide an update by replying to this email or contacting us at {{dthelp}} so we can continue with the next steps for your ticket.`
12. `Please reply to this email or reach us at {{dthelp}} when you are available so we can proceed with your tickets next steps.`

### setappointment

- Type: `random`.
- Purpose: Requests available appointment dates and times and offers faster
  scheduling through the Service Coordinator by phone.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/setappointment.yml`.

Choices (6):

1. `To better facilitate this request, it would be best to set an appointment with the technician. Could you please provide a few dates and times that you are available so we can coordinate with the technician's availability? If you would like to set an appointment more quickly or discuss any blocking factors, please give us a call so you can work directly with our Service Coordinator to ensure the appointment is added to our calendar.`
2. `To best support this request, I recommend setting an appointment so we can work with the technician directly. Please send a few dates and times that would work for you, and I will do my best to coordinate an appointment around both your availability and the technician's schedule. If you would like to schedule this more quickly or discuss any blocking factors, please call us to work directly with our Service Coordinator and ensure the appointment is placed on our calendar.`
3. `In order to move forward effectively, it would be helpful to schedule an appointment with the technician. Could you provide multiple dates and times that you are available so we can find an appointment time that also works with the technician's availability? If you would like to set the appointment sooner or review any blocking factors, please give us a call so our Service Coordinator can work with you directly and make sure it is scheduled on our calendar.`
4. `To ensure this request is handled smoothly, I suggest we set up an appointment with the technician. Please share a few dates and times that work for you, and I will coordinate with the technician to schedule an appointment that aligns as closely as possible. If you would prefer to coordinate this faster or discuss any blocking factors, please call us to work directly with our Service Coordinator and ensure the appointment is set on our calendar.`
5. `For efficiency, it would be beneficial to schedule a time to work with the technician. Could you let me know several dates and times when you are available so we can compare them against the technician's availability? If you would like to arrange the appointment more quickly or discuss any blocking factors, please give us a call so you can work directly with our Service Coordinator to get it added to our calendar.`
6. `To facilitate this request, scheduling an appointment with the technician would be ideal. Please provide a few available dates and times so I can work to arrange an appointment around both your schedule and the technician's availability. If you would like to schedule sooner or discuss any blocking factors, please call us to work directly with our Service Coordinator and ensure the appointment is set on our calendar.`

### signoff

- Type: `random`.
- Purpose: Closing salutation at the start of `signature`.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/signoffs.yml`.

Choices (15):

1. `Thank you,`
2. `Yours truly,`
3. `Best regards,`
4. `Respectfully,`
5. `Best wishes,`
6. `Many thanks,`
7. `With gratitude,`
8. `Cordially,`
9. `With best regards,`
10. `Thank you for your time,`
11. `With respect,`
12. `Sincerely,`
13. `With appreciation,`
14. `Kind regards,`
15. `With kind regards,`

### stillreqass

- Type: `random`.
- Purpose: Requests a reply or call if support is still needed; also supplies
  the first paragraph of `assornoass`.
- Dependencies: `dthelp`.
- Source: `deeptree/matches/variables/adjustable/email/stillreqass.yml`.

Choices (11):

1. `If you still require assistance, we kindly request that you respond to this email or call us at {{dthelp}} at your earliest convenience to confirm the next steps regarding your ticket.`
2. `If you continue to need assistance, please respond to this email or call us at {{dthelp}} at your earliest convenience so we can discuss the next steps for your ticket.`
3. `Should you still require support, we ask that you reply to this email or contact us at {{dthelp}} to determine the appropriate next steps regarding your ticket.`
4. `If further assistance is needed, kindly reply to this email or call {{dthelp}} at your convenience so we may proceed with the next steps for your ticket.`
5. `To move forward, please respond to this email or reach out to us at {{dthelp}} if you continue to require assistance with your ticket.`
6. `If you still need help, we encourage you to respond to this email or call us at {{dthelp}} promptly so that we can determine the next steps for your ticket.`
7. `Should you require additional assistance, please reply to this email or call {{dthelp}} at your earliest convenience to confirm the next steps for your ticket.`
8. `If you would like us to continue assisting you, kindly respond to this email or contact us at {{dthelp}} so we can determine how best to proceed with your ticket.`
9. `If assistance is still needed, please reply to this email or call {{dthelp}} at your convenience to review the next steps.`
10. `To ensure we can continue supporting you, we ask that you respond to this email or call {{dthelp}} so we may confirm the next steps on your ticket.`
11. `If you still require our help, please reply to this email or reach us at {{dthelp}} to determine how we should proceed with your ticket.`

### voicemail

- Type: `random`.
- Purpose: Explains an unsuccessful call where a voicemail or note was left
  and follows up by email.
- Dependencies: None.
- Source: `deeptree/matches/variables/adjustable/email/voicemail.yml`.

Choices (15):

1. `I attempted to reach you by phone earlier but was unable to make contact. I left a voicemail or note at that time and am following up by email to ensure you received the message.`
2. `I tried to contact you by phone earlier but was not able to reach you. I left a voicemail or note and wanted to follow up by email to make sure the message was received.`
3. `I attempted to call you earlier but was unable to connect. I left a voicemail or note and am following up with this email to ensure you received the information.`
4. `I reached out by phone earlier but was unable to get in touch. I left a voicemail or note at that time and am sending this email as a follow-up.`
5. `I attempted to contact you by phone earlier and was unable to reach you. I left a voicemail or note and am following up by email to make sure the message reached you.`
6. `I tried to reach you by phone earlier but was unsuccessful. I left a voicemail or note at that time and am following up with this email to ensure you are aware of the message.`
7. `I attempted to contact you earlier by phone but was unable to speak with you. I left a voicemail or note and am following up by email to ensure the information was received.`
8. `I was unable to reach you by phone earlier, so I left a voicemail or note at that time. I am following up by email to make sure the message was received.`
9. `I tried to reach you by phone earlier but was unable to make contact. I left a voicemail or note and wanted to follow up by email to ensure you received the message.`
10. `I attempted to call earlier but was unable to reach you. A voicemail or note was left at that time, and I am following up with this email to ensure the message was received.`
11. `I reached out by phone earlier but was unable to connect with you. I left a voicemail or note and am following up by email to make sure the message was received.`
12. `I attempted to contact you by phone earlier but was not able to reach you. I left a voicemail or note at that time and am sending this email as a follow-up.`
13. `I tried to get in touch by phone earlier but was unable to reach you. I left a voicemail or note and am following up with this email to make sure you received the message.`
14. `I attempted to reach you earlier by phone but was unable to connect. I left a voicemail or note and am following up via email to ensure the message was received.`
15. `I was unable to make contact by phone earlier, so I left a voicemail or note. I am following up with this email to ensure you received the information.`
