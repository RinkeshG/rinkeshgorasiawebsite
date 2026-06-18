# Backlog — design & future work

Captured after the fresh-eyes UI/UX + code audits. This file tracks what's done and
what's intentionally deferred so it isn't lost.

---

## ✅ Shipped this pass (branch `claude/affectionate-allen-b46ea5`)

- [x] **Mobile home buries the pitch** — merged from `claude/busy-jackson-66ef0e`: name
  leads, square photo capped, one column with intentional spacing + touch hygiene.
- [x] **Real logos on the home cards (was P0).** Career Leap, Product Sense Lab and Sniff
  added (processed to crisp 120px assets); Career Leap also wired into the work page. One
  well silhouette holds two honest families — **bare glyphs** (Savior, Career Leap, KYP)
  float with padding; **app-icon tiles** (Sniff, PSL) fill edge-to-edge (`.lmark.tile`).
  Reads as an intentional product grid, not a sticker sheet. Accel + Vouch stay monograms.
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
  (`work.html#savior` / `#career-leap` / `#accel`), landing under the sticky bar.
- [x] **Work-page "now" section redesigned** — the neglected one-liner became three
  compact logo cards linking to the live products; lighter than the home cards so it
  complements rather than repeats.
- [x] **KnowYourPay & Product Sense Lab live again (was P1).** Migrated both off the
  suspended Vercel account onto "Rinks' projects" (Pro): re-imported from GitHub, env
  vars pulled + pushed via CLI, GitHub auto-deploy connected, deployed, and the brand
  domains re-pointed — `knowyourpay.in` and `productsenselab.com` both serving (200).
  Site links updated to the real domains.
- [x] **Real copy — home + work (Savior, Career Leap, Accel, products).** Written from
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

- [x] **Home page** — real intro + track-record cards (Savior, Career Leap, Accel) +
  building-now product one-liners, in voice. *(stat-rail numbers for the building-now
  products — scans/users/etc — are still rough; verify when you have them.)*
- [x] **Work page** — real case studies for Savior, Career Leap, Accel; "now" section live.
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
