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

---

## Still open

### Content & copy (all placeholder, nothing real yet)

- [ ] **Home page** — real intro paragraph (first-person, not generic), stat rail numbers
  verified and current, credibility line reflects the actual current role/status.
- [ ] **Work page** — case study descriptions rewritten with real outcomes, metrics, and
  story arc (not bullet dumps). Each card needs: the problem, what you did, and the number
  that proves it worked.
- [ ] **Writing page** — real essay titles and excerpts instead of placeholder text. Dates
  accurate. Index numbers match actual post count.
- [ ] **Coffee page** — map pins represent places actually visited; descriptions are
  personal notes, not generic filler.
- [ ] **Shelf page** — card backs have real descriptions/stories for each item (books,
  games, lego sets etc), not placeholder copy.
- [ ] **404 page** — the card labels that appear are placeholder; replace with real
  project/page names that match the actual site structure.

### UX / design

**P0**
- [ ] **Remove sun/moon glyph from clock and pulse dot from nav.** The clock in `v3.js`
  injects a SUN svg (daytime) or MOON svg (night) next to "Bengaluru · time"; the status
  span has a `.pulse` dot before "open to 0→1 roles". Both feel busy and should be stripped.
  Fix: in `v3.js` `tick()`, output plain text time only (no svg injection). In HTML/CSS,
  remove `<span class="pulse"></span>` and the `.pulse` / `.pulse::after` styles.
- [ ] **Remove underlines from `.hl` and everywhere they appear.** The `.hl` class in the
  intro and case bodies uses `border-bottom: 1.5px solid var(--accentdim)` as an underline.
  Remove the border-bottom from `.intro .hl` and any other selectors that add a decorative
  underline (check `border-bottom` across v3.css). Keep font-weight emphasis, drop the line.

**P1**
- [ ] **Make KnowYourPay and PSL live again.** The two projects are linked from the home
  cards but the pages/apps are currently down or returning errors. Fix: either redeploy
  the apps and verify the links work, or update the cards to point to a case study page
  instead of a live product URL until the apps are back up.

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
