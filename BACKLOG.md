# Backlog — design & future work

Captured after the fresh-eyes UI/UX + code audits. This file tracks what's done and
what's intentionally deferred so it isn't lost.

---

## ✅ Shipped — round 9: "bring it into view" — the reveal-in-place principle (branch `claude/light-version-ux-audit-dfd5d4`)

Correction + deepening of round 8. The round-8 inline popover was still wrong: on a phone,
tapping "Open to 0→1 roles" opened the note **below the fold**, so the visitor had to hunt
for it by scrolling. The principle it violated, applied everywhere this pass: **activating a
control must bring the thing it reveals into view — never leave it off-screen to be found.**

- **Availability note on mobile → bottom sheet.** Was inline (pushed content down, opened
  below the fold). → on phones (≤640px) it's now a fixed **bottom sheet**: a dimming scrim,
  a drag-handle, slides up from the bottom (`sheetup`), background scroll-locked
  (`body.avail-open`). The content lands *in the viewport* the instant you tap. Dismiss by
  tapping the scrim or Esc. Desktop keeps the floating popover (there's room there).
  — hide/show uses `display` + a keyframe (not a transform), so the reduced-motion
  `transform:none!important` rule can't strand it open.
- **Availability note on desktop, near the footer.** On `work.html` the trigger sits in the
  close section just above the footer and the popover opens *downward* — so depending on
  scroll it could open partly below the fold (same sin). → on desktop, after opening, if the
  popover's bottom is past the viewport it `scrollBy`s exactly the overflow (+20px) into view.
  Guarded to only fire when it actually overflows (no-op in the hero on `index.html`), and
  respects reduced-motion (`behavior:auto`).
- **Skills — external-link affordance on touch.** The `↗` on linked skills only appeared on
  hover; touch has no hover, so on a phone the 5 real links looked identical to the 2 unlinked
  "Mine" ones. → `↗` is always shown ≤760px, so tappable skills read as tappable.
- **Coffee — selecting a café now scrolls its card into view.** On mobile the map and the
  detail card stack; tapping a pin/row updated a card that was off-screen below. → `select()`
  now `scrollIntoView({block:'nearest'})` on ≤820px, so the card you asked for is the card you
  see.

Verified in-browser at 375px and 1280px: bottom sheet slides in + scrim + scroll-lock +
dismiss + copy-✓; desktop popover floats unaffected and nudges into view only when it would
overflow; skills `↗` shown on touch; coffee card scrolls to the selection. No console errors,
no horizontal overflow on any page. Cache bumped to `?v=22`.

## ✅ Shipped — round 8: mobile experience pass (branch `claude/light-version-ux-audit-dfd5d4`)

Triggered by a real iPhone screenshot: the availability popover rendered badly on mobile.
Walked every page on a phone-width viewport at the experience level (not just code).

- **Availability popover on mobile** — was `position:absolute`, so it overflowed the viewport
  bottom (its "write to me / DM" part cut off) and floated over the content below, with the
  Simba photo's crop-mark bleeding through the overlap. → on phones it now expands **inline**
  (pushes content down like a native disclosure); still floats on desktop where there's room.
- **Touch targets** — nav links (~23px), the availability trigger (17px) and footer social
  icons (16px) were well under a comfortable tap size. → hit areas expanded on phones (nav via
  a transparent `::after`, so the visuals don't move; padding on the trigger/icons/footer
  links). Nav ~40px, social icons 34px now.
- **Work "Building now" rows on mobile** — side-by-side squeezed the copy into a narrow column
  beside a floating 84px thumbnail. → stacks on phones: full-width text, a modest ~190px
  preview below.

Verified clean on mobile: coffee (map + toggle), writing article (measure), shelf deck, 404
topple, skills. No horizontal overflow, no console errors, desktop unchanged.

## ✅ Shipped — round 7: motion audit + fixes (branch `claude/light-version-ux-audit-dfd5d4`)

Ran the `improve-animations` and `find-animation-opportunities` skills (Emil Kowalski's bar).
The site was already disciplined (no `ease-in`, no `transition:all`, no `scale(0)`, transforms/
opacity only) — if anything, slightly over-motioned for "calm." Implemented all findings:

- **Scroll-assemble was springy.** `.snap.in` used `cubic-bezier(.2,1.42,.4,1)` — a 1.42 overshoot
  bounce on every row/card/post, the loudest motion on the site and at odds with "calm over
  clever." → a calm fade-up (`translateY(8px)`→0, `var(--ease-out)` = `cubic-bezier(.23,1,.32,1)`,
  .34s), no bounce.
- **Reduced-motion nuked everything** (`*{transition:none!important}`). → now stops looping/
  decorative keyframes and positional travel but **keeps** opacity/colour fades and comprehension
  cues (chevron, shadow depth), per Emil's "fewer, not zero."
- **Popovers didn't feel anchored** — `.avail-pop` / `.die-pop` slid `translateY`. → they now
  scale from the corner nearest their trigger (`transform-origin: top left` / `top right`,
  `scale(.96)`→1, `var(--pop)`).
- **Copy-email confirmation was flat.** → the "copied ✓" beat pops in (`copypop .15s ease-out`).
- **Consolidated curves** into `--ease-out` / `--pop` tokens in `ledger.css :root`; trimmed the
  dead `.next-entry` from the assemble selector.

Left intentionally: the shelf deck, coffee pins, 404 topple — deliberate playful set-pieces, all
reduced-motion-gated. The find-opportunities sweep returned essentially one net-new item (the
copy pop); the honest result is this UI needs *less* motion, not more.

## ✅ Shipped — round 6: nav + SEO audit (branch `claude/light-version-ux-audit-dfd5d4`)

- **Coffee removed from the header nav** (Home · Work · Writing · Skills). The page stays live
  and reachable from the hero "filter coffee" link and the footer "the coffee log →". Shelf's
  own bar updated to match (Coffee → Skills).
- **Full SEO/meta audit across every page, desktop + mobile. Fixes:**
  - `manifest.json` still had the **old dark theme colours** (`#0d0d0c`) → set to light `#FCFCF9`.
  - `llms.txt` had **stale facts** the site was corrected away from (Career Leap "EdTech for
    career transitions", Savior "$1M ARR / team of 8 / 30 clients", `knowyourpay.vercel.app`,
    PSL "in beta") → rewritten to match the site (real domains, statuses, corrected copy).
  - Added **Person + WebSite JSON-LD** to the home page (was none).
  - `design-system.html` had **two `<h1>`** → the type sample is now a styled div.
  - `writing.html` meta description was thin (70 chars) → richer (on-page intro unchanged).
  - Refreshed all **sitemap `<lastmod>`** to today.
- **Verified clean:** unique titles, canonical == og:url on every indexable page, OG + Twitter
  cards, favicon/apple-touch-icon/theme-color/manifest present, viewport + lang, robots.txt
  (AI crawlers explicitly allowed + sitemap), sitemap covers all 10 indexable pages, 404 +
  design-system `noindex`, every `<img>` has alt, one h1 per page, no broken internal links,
  no console errors. Committed + pushed.
- **Still your call (unchanged):** the project stat numbers (5K scans, 12K checks, etc.) are
  rough — they now also appear in `llms.txt`; verify them. Skills-list curation (Firecrawl/
  Vercel borderline). Vouch cover image (`assets/img/lab/vouch.jpg`).

## ✅ Shipped — round 5 (branch `claude/light-version-ux-audit-dfd5d4`)

- **House bracket → a literal `[ ]`.** The corner crop-marks still read fussy, so the tag is
  now a plain red square bracket around a quiet word — `[ ACQUIRED ]`, `[ MINE ]`. One mark,
  red reserved for the brackets. Design system updated to match.
- **Skills page cut to quality, not quantity.** Removed every generic/bundled Anthropic skill
  (docs, pdf, code-review, deep-research, skill-creator, dataviz, brand-system, writing-
  guidelines, web-animation, artifact-design…) and `ankit-style-tweets`. Left a tight curated
  set: **my two** (design-craft, cliche-blacklist) + Emil Kowalski's design-eng + Firecrawl
  (search, scrape) + Vercel (react-best-practices, optimize) = 7 across 3 groups. Dropped the
  "21 skills · 3 mine…" stat line.
  - *Curation is still yours to finalize.* Firecrawl/Vercel are borderline "tools anyone can
    add" — if you want it tighter (just yours + Emil), say so; equally, add back anything I cut
    that you actually authored or want to showcase.

## ✅ Shipped — round 4 (branch `claude/light-version-ux-audit-dfd5d4`)

- **Lab screenshots were dominating the 2×2.** Going 3-across → 2×2 widened each card to
  ~27rem, so the 16:10.5 shots ballooned to ~18rem tall and became a wall of images. Cut the
  shot to a short **16:7 preview banner** (product hero top) + softened the frame shadow, so
  the image supports the card instead of out-shouting the name/one-liner/stat. 2×2 kept.
- **Coffee page footer no longer self-links.** Removed the "the coffee log →" link from
  `coffee.html`'s own footer (it pointed at the page you're already on). Every other page keeps
  it.

## ✅ Shipped — round 3 (branch `claude/light-version-ux-audit-dfd5d4`)

- **Track-record figures re-formatted.** The label-left / value-right column mixed numbers
  (`85`) with phrases (`profitable → exit`), so right-aligning left a ragged, gappy column.
  Fixed by *stacking* each fact — quiet label, prominent value below — so the number owns its
  line and phrases read clean. Same treatment desktop + mobile now.
- **Crop-bracket tag refined.** It read cramped because fixed corner-marks are proportionally
  large around a tiny word. Gave the label real air (more padding, smaller/wider-tracked text)
  so the brackets frame it like an intentional clipped stamp, like the portrait frame.
- **Availability popover reworked.** "write to me" now **copies the email** (click → "copied ✓",
  clipboard API + legacy fallback) instead of firing a mail client. The reply-time line is gone
  (a reply-time promise is a liability); replaced with a quiet **"or DM me on X →"** as the
  alternative channel.
- **New `/skills` page + nav item.** A public shelf of AI skills, designed in the Ledger
  language — each skill is its `/command` invocation (mono, red slash), grouped by craft with
  counts, sources on the right, and *my* three marked with the house bracket ("MINE"). 2-col
  desktop → 1-col mobile. Added to nav, sitemap, and llms.txt.

### ⚑ Notes / needs you

- **Skills content is my best-effort curation.** ~21 skills across 6 groups; authorship marked
  "MINE" only for the three clearly yours (design-craft, cliche-blacklist, ankit-style-tweets)
  and sourced to Anthropic / Vercel / Firecrawl / Emil Kowalski otherwise. Verify the list,
  the attributions, and add/remove to taste. No repo links yet (none to link to) — say if
  there's a GitHub and each `/command` can link out.
- **"This isn't looking good" — I read it as the ACQUIRED crop-bracket** (the image you sent)
  and refined its proportions. If you meant a different element (the Vouch cover, the popover),
  point me at it.

---

## ✅ Shipped — the "calm record", round 2 (branch `claude/light-version-ux-audit-dfd5d4`)

- **Header** — Bengaluru moved off the name and into the clock: one mono line, `Bengaluru ·
  HH:MM IST`. Place lives with time, everywhere. (Clock still hides on phones.)
- **House bracket** — the portrait's red corner crop-marks are now a reusable tag motif
  (`.crop`). "Acquired" wears it instead of parentheses; the design system documents it as the
  one way to tag a label (`Acquired / Shipped / Live` demos). No generic pills anywhere.
- **Availability popover** — "Open to 0→1 roles" is no longer a bare mailto. It opens a small
  note (die-popover styled) on what a 0→1 role means here + a mailto, and a **time-aware reply
  line** read off Bengaluru's clock ("It's evening in Bengaluru right now — I'll reply when I'm
  back at the desk"). On home hero and work close. Placeholder copy — refine in your voice.
- **Lab is a 2×2 grid of four cards.** Vouch is a full card now (not a text row), with a
  designed dark/gold cover + "Just shipped". See the Vouch-image note below.
- **Work "Building now" thumbnails** got warm elevation + hover-lift (were flat/placeholder-
  ish); Vouch there uses a matching dark/gold "vouch" tile.
- **Intro personality line** — the hero closes on coffee, board games and Simba, linking the
  coffee log and the shelf, so it reads as a person not a menu.
- **`design-system.html` rebuilt** to the current system: house bracket, availability note,
  social icons, 2×2 project card, updated principles (calm-over-clever, depth on real things
  only), motion, and "never" list. Removed dead `--live` tokens from `ledger.css`.

### ⚑ Flagged / needs you

- **Vouch has no fetchable cover image.** `vouchforit.club` exposes no `og:image` and has no
  `<img>` on the page (every OG route returns app HTML). I built an on-brand dark/gold CSS
  cover from the live site's look. To use a real shot, drop it at `assets/img/lab/vouch.jpg`
  and swap the `.shot.vcover` block for an `<img>`. Vouch also has no metrics yet → "Just
  shipped" holds the figure slot; add real numbers when you have them.
- **Timezone idea — my read:** the header clock (his local time) + the availability popover's
  time-aware reply line already deliver the useful, thoughtful version (sets reply
  expectations at the contact moment). A full "your time vs my time" visitor-timezone diff
  would be a gimmick — more clutter than value — so I did **not** build it. Say if you disagree.
- **Coffee "no-photo / detect context" note was unclear** — all three current coffee entries
  have photos, and the card already falls back to a mono-initial tile when one is missing.
  Left unchanged; tell me what you were seeing if there's a specific case.

---

## ✅ Shipped — the "calm record" edit (branch `claude/light-version-ux-audit-dfd5d4`)

Direction: strip the landing-page scaffolding (badges, stamps, buttons, catalog numbers,
reading-time), let the writing and work carry weight, one plain language throughout.

- **Hero** — removed the pulsing status badge and the Write-to-me / DM-on-X buttons.
  "Open to 0→1 roles" is now a quiet mono link (mailto) after the intro. No CTAs.
- **Header** — "Bengaluru" sits beside the wordmark (small mono, faint) on every page.
  The die is now a real `<button>`; its "roll me" invite shows on hover before the first roll.
- **Track record** — the rotated red "Acquired" stamp → a subtle `(acquired)` mono aside in
  the figure-caption's voice. Data figures bumped up a notch (they're the proof).
- **Home "The lab" → "Built & shipped w/ AI"** (sub-line dropped). "Live" pills removed from
  every project. Vouch is live now — the dashed "brewing" box became a real link row to
  `vouchforit.club`.
- **Work / Building now** — rebuilt as context-led rows: name + domain + a sharp "why /
  what's hard" line + figures, with the screenshot demoted to a small side thumbnail (no
  longer the hero). Vouch added with a "V" monogram tile. Close section lost its buttons and
  ends on the same quiet availability link.
- **Writing** — catalog numbers (01/02/…) removed from the list and article kickers;
  "~2 min · written from…" reading-time lines removed; "Field note(s)" language purged (one
  word: writing). "all writing →" moved to the foot of the home list. Article "talk to me
  about it →" removed. Career-Leap meta description completed (was truncated mid-word).
- **Footer** — dropped the "Product builder in Bengaluru · open to the next 0→1" tagline;
  Email / X / LinkedIn are now solid ink glyph icons.

## ⚑ Flagged this pass — not changed, your call

- **`design-system.html` is now out of sync.** It documents the *old* components (status
  badge, Live pill, filled buttons, boxed stamp, post numbers) as live examples — all of
  which this pass changed or removed, so it renders stale. It's internal and unlinked (not in
  nav or sitemap). Decision: refresh it to the new system, or retire it.
- **Project stat numbers are still rough** (5K scans, 12K checks, 800+ PMs, ₹15L, etc.).
  They're now visually louder (bigger figures + count-up). Worth confirming the real values
  before they're the loudest thing on the page. The "why / what's hard" copy on the work page
  is my honest draft from each product's premise — read it in your own voice and adjust.
- **The die is now one of the last playful elements** after this calm-down. It's personality,
  not noise — I'd keep it — but worth a deliberate keep/cut call rather than default.
- **Header shows both "Bengaluru" and local IST time.** Mild place/timezone redundancy; reads
  fine as bookends. Noting only if you'd rather drop one.
- **Every header/footer/`<head>` edit had to be scripted across 9 files.** Reinforces the
  standing Astro note below — the shared chrome is copy-pasted, and it's the real friction.

---

## ✅ Shipped earlier (branch `claude/affectionate-allen-b46ea5`)

- [x] **Mobile home buries the pitch** — merged from `claude/busy-jackson-66ef0e`: name
  leads, square photo capped, one column with intentional spacing + touch hygiene.
- [x] **Real logos on the home cards (was P0).** Career Leap, Product Sense Lab and Sniff
  added (processed to crisp 120px assets); Career Leap also wired into the work page. One
  well silhouette holds two honest families — **bare glyphs** (Savior, Career Leap, KYP)
  float with padding; **app-icon tiles** (Sniff, PSL) fill edge-to-edge (`.lmark.tile`).
  Reads as an intentional product grid, not a sticker sheet. Vouch stays a monogram.
- [x] **Work-close button hierarchy (was P1).** Primary "copy my email" is now a filled
  lime button vs the ghost "DM on X" — emphasis, not width, carries the hierarchy; both
  content-width, neither stretches.
- [x] **`--mut` secondary-text contrast (was P1).** Lifted `#8f8c81` → `#9e9b90`
  (~5.8:1 → ~7:1 on bg), still clearly under `--read`. Added a `--faint` token reserved
  for purely decorative text.
- [x] **Coffee accent scoped (was P2).** Amber now themes only page content; the top bar
  (nav, live pulse, ⌘K) keeps the site lime so it reads as the same site.
- [x] **Essay line length (was P2).** `.prose` constrained to `39rem` (~64 chars).
- [x] **404 digit overlap on mobile (was P2).** Tip/lean angle + drift tightened on narrow
  viewports so 4·0·4 stays readable; tumbles left alone (stay in footprint).
- [x] **⌘K discoverability (was P2).** Persistent `⌘K` affordance injected into the top bar
  on every page; hidden on touch via `@media(hover:none)`.
- [x] **Code P2 — shelf a11y:** dealt cards now `role="button"` + `tabindex` + keydown;
  `main` landmark added; coffee map pins keyboard-operable + tab `aria-selected`.
- [x] **Code P2 — duplicate `.stack`:** shelf card-stack renamed to `.deck-stack`.
- [x] **Code P2 — shelf konami:** now ignores keydown while typing in inputs.
- [x] **Code P2 — inline `onerror`:** replaced with one delegated (capture) handler in
  `v3.js`, CSP-safe.
- [x] **P0 — sun/moon glyph + nav pulse removed.** Clock is plain "Bengaluru · time";
  the nav status pulse dot is gone on every page (the work-close live dot is kept).
- [x] **P0 — `.hl` underline removed** from the intro (weight emphasis kept, line dropped).
- [x] **⌘K moved to the footer** (out of the top bar); hover-only, hidden on touch.
- [x] **Experience cards deep-link** to the matching work section
  (`work.html#savior` / `#career-leap`), landing under the sticky bar.
- [x] **Work-page "now" section redesigned** — the neglected one-liner became three
  compact logo cards linking to the live products; lighter than the home cards so it
  complements rather than repeats.
- [x] **KnowYourPay & Product Sense Lab live again (was P1).** Migrated both off the
  suspended Vercel account onto "Rinks' projects" (Pro): re-imported from GitHub, env
  vars pulled + pushed via CLI, GitHub auto-deploy connected, deployed, and the brand
  domains re-pointed — `knowyourpay.in` and `productsenselab.com` both serving (200).
  Site links updated to the real domains.
- [x] **Real copy — home + work (Savior, Career Leap, products).** Written from
  real details in a plain founder voice (no em dashes, no rule-of-three, no AI tells):
  hero intro, the track-record cards (clear one-liner + substance highlights), and the
  deeper work-page case studies. Fixed old inaccuracies (Career Leap was soft-skills for
  tech people, not "career switchers"; Savior team was 85; dropped unverified ~$1M ARR).
- [x] **Coffee page — real places + card redesign.** Replaced placeholders with the real
  three (Maverick & Farmer, Anama Coffee, Kahale), correct spelling, looked-up map coords.
  "my order" split into clean DRINK / EAT rows; location line is the maps link (dropped the
  redundant "open in maps" button); cards are photo-ready (header renders only when a real
  image exists — no empty placeholder). **Photos still to add.**

---

## Still open

### Content & copy

- [x] **Home page** — real intro + track-record cards (Savior, Career Leap) +
  building-now product one-liners, in voice. *(stat-rail numbers for the building-now
  products — scans/users/etc — are still rough; verify when you have them.)*
- [x] **Work page** — real case studies for Savior and Career Leap; "now" section live.
- [x] **Coffee page** — real cafés + personal notes done. **Photos still to add.**
- [ ] **Writing page** — real essay titles and excerpts instead of placeholder text. Dates
  accurate. Index numbers match actual post count.
- [ ] **Shelf page** — card backs have real descriptions/stories for each item (books,
  games, lego sets etc), not placeholder copy.
- [ ] **404 page** — the card labels that appear are placeholder; replace with real
  project/page names that match the actual site structure.

---

## Deliverables

- [ ] **1-page resume / PDF.** Build a clean single-page resume that matches the site's
  engineered/mono aesthetic. Should be exportable as PDF (print stylesheet or pre-generated
  PDF in `assets/`). Content: current role, top 3–4 work highlights with outcomes, skills,
  education. Link it from the home page and/or the ⌘K palette as "download resume".

---

## Code — still deferred

- [ ] **No `theme-color` light variant** (`<meta ... media="(prefers-color-scheme: light)">`)
  — intentionally not done: there's no light theme in production, so it would point at a
  background that never renders. Defer until/if light ships.

---

## Future / good-to-have

- [ ] **Move to Astro.** Replace the hand-rolled HTML/CSS/JS with an Astro project.
  Benefits: component reuse (nav, footer, cards are copy-pasted today), content collections
  for writing/work, easy MDX for essays, built-in image optimization, and a cleaner deploy
  story. Rough migration path: port the design system tokens + v3.css as global styles, port
  each page as an `.astro` component, migrate writing posts to MDX. Not urgent while the
  site is small; revisit when adding the 3rd essay or the 2nd project page.

### Logo polish (minor, optional)
- [ ] `assets/img/savior.png` is a low-res 56px source — renders OK at 40px but won't scale
  up. Swap for a higher-res mark if one exists.
- [ ] KYP is a wide wordmark that reads small in a square well — a square "K" mark would sit
  better beside the others.

---

## Light theme — parked (designed, prototyped, not in production)

Decision: **parked for now.** The work is done and saved so it can ship later without
redoing the thinking.

**Files**
- `assets/light.css` — the theme layer. Re-declares only colour/surface/elevation tokens
  under `[data-theme="light"]`; every component, the type scale, spacing, radius and motion
  are inherited from `v3.css` untouched. Activate with `<html data-theme="light">`.
- `light.html` — the home page in light, with a dark/light toggle to feel the continuity.
- `design-system-light.html` — the documented light system (palette mapping, the lime
  strategy, elevation, components), rendered *in* light.

**The design (so it's not re-derived)**
- Principle: not a second system — the same one in daylight. Dark's ink (warm cream)
  becomes light's paper; dark's paper (warm near-black) becomes light's ink. Same two warm
  tones, roles swapped. Cream, **not white** (white reads cold / off-brand).
- The lime splits by job: `--accent` taken deep (`#55731c`) for anything that must read
  (links, captions, pulse, borders); `--accent-bright` (`#c4e86b`) kept only for selection
  + small fills. Emphasis stays a clean underline in both modes (no highlighter — removed
  per feedback).
- Elevation: soft warm shadows (`rgba(70,58,28,.x)`), never the dark-mode black slab.
- Type: unchanged (fonts are the brand voice). Caveat: dark-on-light reads optically
  heavier, so 600 weights feel a touch bold — consider ~550 display weight in light only.

**Open decisions before shipping**
- [ ] Paper warmth (`#f4f1e8`) — warmer/creamier or cleaner toward white?
- [ ] Accent green (`#55731c`) — right, or more olive / more forest?
- [ ] Default behaviour — dark-first with light as an option, or auto-follow
  `prefers-color-scheme`?
- [ ] If shipping: add a real toggle persisted in `localStorage`, apply `data-theme`
  across all pages (not just the prototype), and add a light favicon + `theme-color`.

---

## Keep (don't regress) — both audits agreed these are strong
The shelf, the ⌘K palette, the terminal signature system (// labels, live pulse, lime
restraint), the 404. Code: universal `rel="noopener"`, thorough reduced-motion coverage
(even in inline scripts), the WAAPI `commitStyles()`+`cancel()` lifecycle, and the
clipboard fallback chain.
