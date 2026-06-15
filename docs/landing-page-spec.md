# Gathr — Landing Page Spec
**Item EP | planwithgather.com marketing site**
Version 1.1 — June 2026

---

## What this is

The public-facing marketing site at `planwithgather.com`. Entirely separate from the app at `getgathr.co`. No Supabase dependency, no auth, no tenant context. A single `index.html` with inline CSS and vanilla JS.

Primary job: convert organizers into request form submissions.
Secondary job: send people to `getgathr.co` to sign in if they already have an account.

---

## Repository and deployment

- Repo: `kristinseed/gathr-marketing` (separate from `kristinseed/gather-app`)
- Deployment: Cloudflare Pages (auto-deploys on push to main)
- Domain: `planwithgather.com` (Namecheap → Cloudflare Pages)
- No framework. Single `index.html` with inline CSS and vanilla JS.
- The only external dependency is a Resend API call for the form submission.

---

## What getgathr.co shows unauthenticated visitors

`getgathr.co` is the app. Unauthenticated visitors who land there see a minimal splash — Gathr wordmark, "Sign in" button, and a "Learn more →" link to `planwithgather.com`. Not the full marketing page. That redirect behavior is app work, not this spec.

---

## The one strategic rule

Every word on this page is written for the organizer. Attendees don't find Gathr — organizers do. The attendee experience is a retention story told to the organizer, not a separate pitch.

---

## Page structure

### 1. Nav bar

```
[Gathr wordmark — left]         [Sign in — right, ghost link → getgathr.co/login]
```

No hamburger. No additional links. Sticky on scroll.
Background: warm white `#FDFCFA`, bottom border `#E8E4DC`.

---

### 2. Hero section

**Headline (H1, Georgia serif, 2rem):**
> Your reunion plans itself.

**Subhead (body, muted, max-width 560px centered):**
> Gathr guides you from first invite to final headcount — so you spend less time managing a spreadsheet and more time looking forward to the event.

**Primary CTA button:**
> Get started — it's free

Clicking smooth-scrolls to `#request`.

**Secondary link below button:**
> Already have an account? [Sign in →] (links to `getgathr.co/login`)

**Visual treatment:** Warm background `#F5F3EE`, centered content, generous vertical padding (80px top/bottom). No illustration, no photo. Typography carries it.

---

### 3. Pain points row

No section heading. Three short statements in a horizontal row.

```
📋                              📬                              🤷
Your contact list is            People say "I'll let            You have no idea where
spread across three apps.       you know" and vanish.           things actually stand.
```

Simple inline SVG icons, monochrome. Text color `#5F5E5A`, 14px.
Stack vertically below 768px.

---

### 4. How it works

**Section heading (H2, Georgia serif):**
> Set up in minutes. Run the whole thing from one place.

Three cards in a row, each: step number in amber `#BA7517`, short title, one sentence.

```
1. Bring your people
Paste your contact list or upload a CSV.
Gathr creates your member list instantly.

2. Gathr keeps track
RSVPs, reminders, headcount — who's in
and who's still deciding. All in one place.

3. Show up and celebrate
Your guests arrive informed. You arrive
relaxed. The software did the work.
```

Card style: `#F5F3EE` background, `#E8E4DC` border, 12px border-radius.

---

### 5. Who it's for

**Section heading (H2, Georgia serif):**
> Built for the people who volunteer to make it happen.

Six cards in a 3×2 grid. Icon + label only.

```
🏫 High school reunions       🎓 College & university       🔱 Fraternities & sororities
🌿 Civic organizations        👨‍👩‍👧 Family reunions            ✦ Other gatherings
```

On hover: border shifts to `#C8C4BC`.

---

### 6. Organizer vs. attendee

**Section heading (H2, Georgia serif):**
> Good for the person running it. Easy for everyone else.

Two columns side by side.

**Left — For organizers** (amber left border, 3px, `#BA7517`):
Heading: "You stay in control."
- Import your existing contact list in seconds
- One dashboard shows you exactly where things stand
- Gathr tells you what needs attention and when
- Members update their own RSVPs — you don't chase anyone

**Right — For your people:**
Heading: "They stay in the loop."
- One-click RSVP from any device
- Easy to change their mind — no awkward calls
- Event details always in one place
- After it's over, a shared space for photos and memories

Both columns: `#F5F3EE` background, `#E8E4DC` border, 12px radius.
List items use a dash (—) not bullets. Text color `#5F5E5A`.

---

### 7. Request form

**Anchor:** `id="request"`

**Section heading (H2, Georgia serif):**
> Ready to get started?

**Subhead:**
> Tell us about your reunion and we'll get you set up — usually within one business day.

**Fields:**

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Your name | text | Yes | Sarah Johnson |
| Your email | email | Yes | sarah@email.com |
| Type of reunion | select | Yes | High school, College/university, Fraternity, Sorority, Civic organization, Family reunion, Other |
| Organization name | text | Yes | e.g. Lawrenceville High School or The Kim Family |
| Event you're planning | text | No | e.g. Class of 1986 40-year reunion |
| Anything else? | textarea | No | Optional — max 300 chars |

**Submit button:** "Request access" — full-width, amber `#BA7517`, white text.

**Below button (small, muted):**
> We'll email you within one business day. No credit card required.

**On submit:**
- POST to Resend API with all fields, sends to `kristinseed@gmail.com`
- Disable button during send, show "Sending…"
- On success: hide form, show confirmation message:
  > "You're on the list. Check your inbox — we'll be in touch soon."
- On failure: show inline error:
  > "Something went wrong — email us directly at hello@getgathr.co"

**No `<form>` tags.** Use button onclick handler only.

---

### 8. Footer

```
© 2026 Gathr     hello@getgathr.co     Privacy · Terms
```

Privacy and Terms are dead links for now (`href="#"`).
Background `#EDE9E0`, text `#5F5E5A`, 14px.

---

## Copy rules

- Sentence case everywhere — no ALL CAPS, no Title Case In Every Label
- No exclamation points
- No "powerful," "seamless," "robust," or any SaaS filler adjective
- Contractions are fine — sounds human
- Never say "platform" — say Gathr
- Never say "users" — say organizers, or use second person

---

## Design tokens (hardcoded in this file — no CSS framework)

```
Amber accent:       #BA7517
Amber hover:        #9E6312
Warm white:         #FDFCFA
Surface:            #F5F3EE
Surface dark:       #EDE9E0
Text primary:       #2C2C2A
Text muted:         #5F5E5A
Border:             #E8E4DC
Border strong:      #C8C4BC
Heading font:       Georgia, 'Times New Roman', serif
Body font:          system-ui, -apple-system, sans-serif
Border radius:      6px (inputs), 12px (cards)
```

---

## Resend email format

Send to `kristinseed@gmail.com` from `invitations@mail.getgathr.co`:

```
Subject: New Gathr request — [Org name]

Name: [name]
Email: [email]
Reunion type: [type]
Org name: [org name]
Event: [event or "not provided"]
Notes: [notes or "none"]

Submitted: [ISO timestamp]
```

The Resend API key is stored as an environment variable `RESEND_API_KEY` in Cloudflare Pages settings — never hardcoded in the file.

Because this is a public page with no auth, the form submission must go through a Cloudflare Pages Function (`/functions/submit.js`) to keep the API key server-side. The HTML calls `/submit` via fetch POST. The Pages Function handles the Resend call.

---

## File structure

```
gathr-marketing/
├── index.html          ← entire page: HTML + inline CSS + inline JS
├── functions/
│   └── submit.js       ← Cloudflare Pages Function for Resend API call
└── docs/
    └── EP-landing-page-spec.md
```

---

## What this does NOT cover

- `/privacy` and `/terms` pages (stub or omit for now)
- SEO meta tags and OG image (item BU — post-beta)
- Analytics / tracking (post-beta)
- Mobile-optimized layout (this is laptop-optimized for beta, but basic stacking below 768px is fine)
- Self-serve org creation replacing the request form (item EH — roadmap)

---

*Commit to `docs/EP-landing-page-spec.md` in `kristinseed/gathr-marketing`. Build with Claude Code writing index.html and functions/submit.js directly.*
