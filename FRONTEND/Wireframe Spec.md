# Meeting Minutes System — Wireframe Specification

Two variants of one product for meeting secretaries and managers. Visual language: Samruk-Kazyna Design System (navy #17335D, gold #A78C6D, PT Sans, 0–2px radii, flat grey page, hairline borders, gold 9px top bar on key panels).

Working mockups: `Task Tracker Dashboard.dc.html`, `Live Session.dc.html`.

---

## Global rules (both variants)

Design principle applied everywhere:
- One primary action per screen. It is the only navy filled button, always top-right of the content header (or bottom of a drawer/modal). Everything else is outline, ghost, or text link. The user never has to choose between two equal buttons.
- One idea per screen. Settings, filters and secondary data stay off screens where they do not serve the task.
- Same shell on every screen, so a user learns it once: navy left sidebar (232px), content column on grey page, white cards with 1px #D1D1D1 border.
- Status is always text + colour, never colour alone (accessibility, and colour meaning survives translation).

App shell (every screen except Live session / Processing, which go full-width to give the transcript room):
- Sidebar: logo; section label "Meeting minutes"; nav items — New meeting, Meetings, Tasks, Reminders (count badge, gold), Settings. Active item: navy-800 fill, gold text.
- Sidebar footer: deployment indicator "On-premises · local models" with a dot (gold = healthy, grey = degraded), and one-line note "Audio and text stay inside the internal network." Clicking opens Settings → Deployment.
- Language: Қаз / Рус / Eng switcher (DS LangSelect) in Settings and in the sidebar footer.

Language-neutral layout:
- All strings are keys in a resource file (RU, KZ, EN). No text inside images or icons.
- Allow +30% string length: buttons are content-sized with min-width, never fixed; table headers wrap to two lines; no `nowrap` on labels.
- Dates dd.mm.yyyy, 24-hour time, numbers with locale separators. Transcript text is shown as spoken; each line carries a language tag RU / KZ / RU+KZ (Shala-Kazakh).

On-premises note: the system runs on local, self-hosted speech and language models inside a closed network. The UI therefore never shows "cloud", "uploading to server X", or third-party AI branding; processing times shown are those of the local server. Out of scope, shown only as disabled "Coming soon": EDMS integration, voice identification by timbre, production deployment controls.

Consent and demo data (both variants):
- Recording cannot start until the host ticks a consent confirmation. A consent notice is posted automatically to participants (meeting chat + bot display name "Recording · AI transcription").
- Every screen that shows transcript text in the demo carries a "Demo data · names anonymized" tag. Real recordings used for demos must be anonymized (names replaced, voices not identifiable) before import.

Shared status set for action items: In progress (navy outline), Overdue (muted red fill + red text), Completed (grey, strikethrough text). Tags: area (Finance, HR, IT, Operations, Procurement — grey outline) + optional Urgent (gold fill).

---

## Variant A — Live transcript

### A1. Start recording screen

Layout: app shell. Centred single card (max 640px) with gold top bar.
- Title "Start a meeting".
- Field: Meeting link (text input, accepts Teams / Zoom / Google Meet URL; platform detected and shown as a label under the field — no platform picker needed).
- Field: Meeting title (prefilled from the calendar invite if available).
- Field: Expected languages — three checkboxes RU, KZ, RU+KZ (all on by default).
- Consent block (grey #EEEEEE box): text "All participants will be told that this meeting is recorded and transcribed by AI." + required checkbox "I confirm participants have been informed and agree to recording."
- Primary action: "Join and start recording" (disabled until link is valid and consent is ticked; the disabled reason is shown under the button).
- Below the card: text link "Or upload a recording" (routes to Variant B flow if both are deployed).

Components: TextField ×2, platform label, Checkbox group, consent box, Checkbox (required), Button primary, ArrowLink.

Why: everything needed to start fits in one card; the consent tick sits directly above the button so it cannot be missed or skipped.

### A2. Live session screen (mockup)

Layout: full-width, no sidebar (fewer distractions during a meeting).
- Header bar (72px, white): logo (back to dashboard); meeting title + "Zoom · date · N participants"; recording status pill (pulsing red dot, "Recording", elapsed hh:mm:ss; grey dot "Paused" when paused); detected language tags; right side: ghost "Pause", primary "End and summarize".
- Consent strip (grey band, full width, always visible): shield icon, "This meeting is being recorded and transcribed by AI. All participants were notified…", right-aligned "Consent confirmed by host · time".
- Body: two columns.
  - Left (flexible): Live transcript card. Rows: time, speaker avatar (number), speaker label, language tag, text. A "Listening…" placeholder row sits at the bottom while speech is in progress.
  - Right (420px): Action items detected card, gold top bar, count in header, list of item cards, footnote "Items are drafts until the meeting ends…".

Transcript scrolling and updating:
- New lines append at the bottom; the feed auto-scrolls while the user is at the bottom ("Following live" in the card header).
- If the user scrolls up more than ~48px, auto-scroll pauses (header reads "Auto-scroll paused while you read") and a floating pill appears: "3 new lines · Jump to live". Clicking it scrolls to the bottom and resumes following.
- Lines that produced an action item get a light gold background for ~5 seconds.
- Speakers are labelled Speaker 1, 2… by diarization; the host can rename a label once and all lines update (voice identification by timbre is out of scope).

Action item cards:
- Description, Responsible, Deadline, "Said at hh:mm:ss" link (scrolls transcript to the source line and highlights it), Edit, Not a task.
- New cards enter at the top with a gold border and "New" tag, fading to normal after 5 seconds.
- Missing fields are shown as "Not detected — add" in red text, so the secretary sees what to fix.

Editing during the session: Edit turns the card into an inline form (description textarea, responsible select, deadline date, Cancel / Save). "Not a task" removes the card (recoverable on the summary screen). Editing never pauses the transcript.

Editing after the session: on the Summary screen (shared S1) — same inline form per item.

End: "End and summarize" opens a confirmation modal ("Keep recording" / "End and summarize"), then routes to S1.

Components: header bar, status pill, language tags, Button ghost + primary, consent strip, transcript feed, speaker avatar, language tag, jump-to-live pill, action item card (view/edit states), select, date input, confirmation modal.

Why: the secretary's only job during the meeting is to watch that tasks are captured correctly, so the tasks panel is always visible and every card has one obvious fix path (Edit). The primary action — ending and summarizing — is the one decision they make.

### Navigation flow — Variant A

```
Dashboard (Tasks) ──New meeting──> A1 Start recording ──Join──> A2 Live session
      ^                                                           │ End and summarize
      │                                                           v
      │<──────────── S1 Summary & action items ──Export──> S6 Export
      │                     ^
S5 Meeting history ─────────┘
S2 Tasks ──row click──> S3 Item detail (drawer) ──Send reminder──> S4 Reminders
S4 Reminders ──item name──> S3 Item detail
```

---

## Variant B — Post-processing

### B1. Upload or start recording screen

Layout: app shell. Centred card (max 640px) with gold top bar and two tabs: "Upload file" (default) | "Record now".
- Upload tab: drop zone (dashed #C4C4C4, 200px tall) "Drag an audio or video file here or choose a file"; accepted formats and size limit in small text (MP3, WAV, M4A, MP4, up to 4 hours). After selection, file row with name, duration, remove.
- Record tab: meeting link field (bot joins and records without live transcript) or "Record from this device" (microphone level meter).
- Meeting title, meeting date (prefilled from file metadata), expected languages (RU / KZ / RU+KZ).
- Consent block: "This file contains other people's voices. I confirm they were informed that the meeting was recorded and agreed to AI transcription." Required checkbox. For demo uploads, a second required checkbox: "This recording is anonymized for demo use."
- Primary action: "Start processing" (disabled until file + consent).

Components: Tabs, drop zone, file row, TextField, date input, checkbox group, consent box, Button primary.

Why: upload and record are the same task with different sources, so they share one card; the consent sits directly above the only button.

### B2. Processing screen

Layout: app shell, centred card (max 640px).
- Meeting title, file name, duration.
- Progress bar (thin navy line on grey, DS loader style) with percentage and stage text: 1 Transcribing → 2 Identifying speakers → 3 Extracting action items → 4 Writing summary. Current stage in navy, done stages with check, future stages grey.
- Estimated time remaining ("About 6 min left"), calculated from local server load.
- Deliberately no transcript or items preview.
- Secondary text link: "Cancel processing".
- Primary action: none needed while running — instead "Notify me when ready" is on by default (toggle). When complete, the card changes to "Minutes are ready" with primary "Open summary".

While processing the user can: leave the screen (processing continues on the server), start another upload, work in Tasks / Meetings. The meeting appears in Meeting history with status "Processing 42%"; a sidebar toast appears when done.

Components: meeting meta, progress bar, stage list, ETA, toggle, text link, Button primary (on completion).

Why: a single calm progress view answers the only question the user has ("when will it be ready?") and frees them to leave.

### Editing after processing (Variant B)

On S1, each action item row has Edit (inline form: description, responsible, deadline). Items start as "Draft — review"; the secretary confirms all at once with the screen's primary action "Confirm and send tasks", which creates tasks on the dashboard and schedules reminders.

### Navigation flow — Variant B

```
Dashboard ──New meeting──> B1 Upload / record ──Start processing──> B2 Processing
                                                                    │ (user may leave; toast on done)
                                                                    v
S5 Meeting history (status: Processing / Ready) ──> S1 Summary & action items ──> S6 Export
S2 Tasks ──row──> S3 Item detail ──> S4 Reminders (and back)
```

---

## Shared screens

### S1. Summary and action items

Layout: app shell. Header: meeting title, date, platform/source, duration, participants count; primary action top-right: "Confirm and send tasks" (before confirmation) → "Export minutes" (after). Three stacked sections in one column (max 1080px), no tabs, so a secretary can scroll and proofread in order:
1. Summary — white card, gold top bar, 4–8 bullet points; Edit (text link) turns into a textarea.
2. Action items — table: description, responsible (select), deadline (date), area tag, "Said at" link (scrolls to transcript line). Row Edit/remove. Counter "3 need review" when fields are missing.
3. Full transcript — speaker label, time, language tag, text. Search field above it. "Rename speakers" link.

Variant difference: A — items already reviewed live are marked "Checked during meeting"; B — all items arrive as drafts.

Components: meeting meta header, Button primary, summary card, editable table, select, date input, tags, transcript list, SearchInput.

Why: the order (summary → tasks → evidence) matches how minutes are read, and one primary action closes the job.

### S2. Task tracker dashboard (mockup)

Layout: app shell. Header "Tasks" + one-line hint. Filter row: status segmented control with counts (All / In progress / Overdue / Completed), Responsible select, Meeting date select (7 / 14 / 30 days), "Clear filters" link when anything is set. Table: complete-circle, action item (description + source meeting · date), area tag (+ Urgent), responsible, deadline, status badge. Default sort: overdue first, then by nearest deadline.

Manager actions:
- Mark complete: click the circle at row start. Row greys and strikes through; toast "Marked complete · Undo" (4 s).
- Reassign: the Responsible cell is an inline select (border appears on hover). Change → toast "Reassigned to X. They will be notified."
- Change deadline: the Deadline cell is an inline date input. Overdue dates show in red.
- Every change is written to the item's edit history.
- Row click (anywhere except those controls) opens S3.

Primary action: working the list; no header button competes with it.

Components: sidebar, page header, segmented status filter, selects, text link, table, circle checkbox, tags, inline select, inline date, status badge, toast, empty state.

### S3. Action item detail

Opens as a 480px right drawer over the dashboard (keeps the list context; Esc/scrim closes). Also reachable by URL.
- Gold top bar; label "Action item"; close.
- Status badge + tags.
- Description (editable textarea, saved on blur).
- Responsible (select) and Deadline (date) side by side.
- Source meeting link → S1.
- Transcript excerpt: the source line (gold-tinted) with one line before and after; "Open full transcript" link.
- Edit history: date-time, who, what changed ("Deadline: 18.09 → 19.09"). If none: "Not corrected. Extracted automatically from the transcript."
- Footer: primary "Mark complete" (or "Reopen"), outline "Send reminder".

Why: everything needed to judge and fix one task, in reading order; the transcript excerpt settles disputes about what was actually said.

### S4. Reminders and notifications

Layout: app shell. Header "Reminders". Filter: segmented All / Scheduled / Sent / Missed deadlines. Log table: date-time, recipient, action item (link → S3), trigger, channel (email / internal messenger), status (Scheduled, Sent, Snoozed until…, Failed). Row actions: Resend, Snooze (1 day / 3 days / pick date).

Triggers (fixed defaults, editable later in Settings): 3 days before deadline, 1 day before, on the deadline morning, 1 day after (overdue), then every 3 days while overdue. Reassignment or deadline change resets the schedule.

Missed deadline: a red "Missed deadlines" section pinned above the log listing each overdue item, days overdue, reminders already sent, responsible person, and primary action per section "Contact responsible" (opens reminder composer); secondary links: Change deadline, Reassign (open S3). The sidebar Reminders badge counts missed deadlines.

Components: segmented filter, alert section, log table, status badges, row actions menu, snooze popover, composer modal.

### S5. Meeting history

Layout: app shell. Header "Meetings"; primary "New meeting". Search + date range. List (not action items): date, title, source (Zoom / Teams / Meet / Uploaded file), duration, languages, action items count (open / total), status (Ready, Processing 42% — Variant B only, Draft). Row click → S1.

### S6. Export

Export is an action, not a page: primary button on S1 opens a small modal.
- Format: PDF / DOCX (radio, two cards).
- Include: summary, action items, full transcript (checkboxes; transcript off by default).
- Language of headings: RU / KZ / EN.
- Primary "Download". Disabled row "Send to EDMS — coming soon".
File uses the organisation's minutes template (header, date, participants, signatures block).

### S7. Settings

Layout: app shell, single column of sections (no nested tabs):
1. Language — interface language Қаз / Рус / Eng (radio); default transcript languages.
2. Deployment — status panel: "On-premises · local models", server health (Online / Degraded / Offline), model versions, data location "Internal network only". Read-only for users.
3. Reminders — default schedule (from S4).
4. Integrations — EDMS (disabled card, "Coming soon"); Voice identification by timbre (disabled, "Coming soon").
Primary action: "Save changes" (appears only when something changed).

---

## Navigation between Tasks, Detail and Reminders

- Tasks (S2) row → Detail drawer (S3). Closing returns to the same scroll position and filters.
- Detail → "Send reminder" sends immediately and logs to Reminders (S4); toast offers "View in reminders".
- Reminders (S4) item name → Detail (S3) drawer over the reminders log.
- Sidebar Reminders badge = number of missed deadlines; clicking lands on S4 with "Missed deadlines" filter.
- Detail → Source meeting → Summary (S1), scrolled to the transcript line.
