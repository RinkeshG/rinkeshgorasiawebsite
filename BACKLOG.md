# Backlog — design & future work

Captured after the fresh-eyes UI/UX + code audits. **All code P0/P1 are already fixed
and shipped** (commit 9849eb0). This file tracks what's intentionally deferred so it
isn't lost. Content/copy is placeholder and out of scope everywhere below.

---

## UX / design — to do (from the design audit, nothing here done yet)

### P0
- [ ] **Mixed real logos vs letter fallbacks** on the home cards. Sniff / Career Leap /
  PSL fall back to plain initials because `assets/img/career-leap.png` and
  `assets/img/psl.png` are missing, sitting next to real marks (KYP, Savior) → half the
  cards look unfinished. Fix: supply the two marks, **or** commit to one uniform monogram
  style for all so the fallback reads as deliberate.

### P1
- [ ] **Mobile home buries the pitch.** The portrait fills the whole first viewport
  (~812px); name + credibility line start ~1130px, below the fold. Fix: on mobile lead
  with name + one-line positioning, cap the photo to ~50–60vh (or move it below the intro).
- [ ] **Work-close button widths inverted (desktop).** Secondary "DM on X" stretches
  ~700px while the primary "copy my email" is ~175px → eye lands on the wrong action.
  (Mobile is fine.) Fix: equal widths, or make the primary the larger/filled one.
- [ ] **Dim grey secondary text fails ~AA contrast** site-wide (`--mut` on `--bg`):
  inactive nav, "or a DM on X →", "all writing →", the writing index numbers 01–04, stat
  labels, shelf deck labels. Writing numbers are nearly invisible. Fix: lift the secondary
  grey one step (clear 4.5:1); reserve the dimmest tone for purely decorative text.
  *(Note: this is the same `--mut` token in both themes — fixing it helps light mode too.)*

### P2
- [ ] **Coffee swaps the whole accent lime→amber** — can read as a different site. Fix:
  keep lime on the persistent chrome (nav, pulse), theme only the page's own content amber.
- [ ] **Essay line length ~85ch** on desktop — tiring for the one page built for reading.
  Fix: constrain `.prose` to ~62–68ch.
- [ ] **404 digits can overlap into illegibility on mobile** on some random collapses.
  Fix: tighten the random offsets on narrow viewports so 4·0·4 stays readable.
- [ ] **⌘K is undiscoverable** from home/work/essay, and the hint still shows on touch
  where it's inert. Fix: small persistent `⌘K` affordance in the top bar on desktop only.

---

## Code — P2 (deferred; P0/P1 already shipped)

- [ ] **Shelf a11y depth:** dealt cards are click-only `div`s (keyboard/SR-invisible); no
  `<main>` landmark; coffee map pins are mouse-only. Give dealt cards `role="button"` +
  `tabindex` + keydown, or expose the gallery/cards view as the accessible path.
- [ ] **Duplicate `.stack` class** with conflicting meaning (colophon chip-row in v3.css vs
  the shelf card-stack inline) — namespace one (`.deck-stack`) before a shared component
  named `.stack` silently breaks one.
- [ ] **Shelf konami keydown** doesn't ignore typing in inputs — harmless today (no input
  on the page), would double-fire if a search/filter is ever added.
- [ ] **Inline `onerror` on logo imgs** → move to a delegated JS handler **if** a strict
  CSP is ever added (inline handlers are CSP-blocked). No CSP today, so deferred.
- [ ] **No `theme-color` light variant** (`<meta ... media="(prefers-color-scheme: light)">`)
  — defer until/if light ships.

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
