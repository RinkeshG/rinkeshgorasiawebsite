# Changelog

> Institutional memory of the negative space — what was changed, what was considered, what was rejected, and why. Git log records what shipped; this records what was thought about.

## How to use this doc

Before designing any change, search for the relevant tag (`#typography`, `#hero`, `#nav`, etc.) and read prior decisions in that area. **Especially read the "Considered & rejected" entries** — those are the most likely to be re-suggested by a fresh session that doesn't know the history.

After landing a structural or design change, add an entry. The entry should be in the same shape every time:

```
### YYYY-MM-DD — short title — commit-ref
- **What changed:** one or two lines.
- **Why:** the problem this was solving.
- **Alternatives considered:** what else was on the table and why it lost.
- **Outcome / open question:** is this settled, or are we watching something?
- **Tags:** #tag1 #tag2
```

Anchor reference: [`docs/about.md`](about.md). If a change contradicts the anchor, the anchor wins — or the anchor needs updating first.

---

## Shipped

Reverse-chronological. Most recent first.

### 2026-04-28 — Refine essay + writing.html: subtler footers, retitle, drop intro line, trim list

- **What changed:**
  - **Field notes essay retitled.** From *"Field notes — On building"* to *"On building products — Things I keep coming back to"*. Reason: "Field notes" is journalist/researcher jargon many visitors don't know; the new title says what's inside.
  - **Dropped the intro meta-line** *"Some are mine, most aren't. The credits are at the bottom; the lessons are above."* Felt like talking about the page; the page should just be the page. Credits stay at the bottom — readers find them.
  - **Replaced the big-CTA footer on field-notes and writing.html.** New shape: hairline rule + `← back to writing` link (essay only) + plain contact line (`email · @rinks__g · LinkedIn`) + credit. Big serif *"Something here worth a conversation?"* removed from these two pages.
  - **Trimmed writing.html essay list** to two: field-notes (live) and Career Leap (`soon`, dimmed and unlinked instead of bouncing to Twitter).
  - **Removed the Twitter CTA** *("Most of what's in my head ends up on Twitter first… Follow on X →")* from writing.html. Replaced with one quiet italic line: *"More as the list earns it."*
  - **Page header sub-copy** on writing.html no longer points at Twitter. Now: *"Where the longer pieces live. Posted when something earns the long form."*
  - **`writing.html` un-noindexed.** Now that it has a real essay, it's `index, follow`.
- **Why:** Rinkesh's call after seeing the essay live — the big CTA was shouting after a contemplative read, "Field notes" wasn't conveying content, and writing.html was bouncing visitors to Twitter (which contradicts the "no Twitter redirect long-term" decision in [`about.md`](about.md#information-architecture)).
- **Alternatives considered:**
  - Footer Option B (signature: *"— rinkesh, bengaluru"*) — not picked; user wanted clean over signed.
  - Footer Option C (closing line *"more as more sticks"* with email below) — rejected; the closing line read as a CTA in disguise.
  - Keeping the "If something landed — for or against — write back" sign-off — explicitly rejected as mechanical.
  - Hard-removing the Career Leap entry until it's written — rejected; user wanted it visible as a planned piece. Solved with `post-item-pending` styling.
- **Scope:** Subtle footer applies to *read* pages (field-notes, writing). Landing pages (home, work, how-i-work) keep the bigger CTA — they're meant to convert visitors into conversations. Different page types, different footers.
- **Tags:** `#footer` `#field-notes` `#writing` `#twitter-redirect` `#voice`

### 2026-04-28 — `field-notes.html` shipped (first on-site essay)
- **What changed:** new page `field-notes.html` — first real essay on the site. 10 numbered observations on building, grouped into 5 clusters (what to build before how / where to spend energy / what to chase / who to listen to / the industry honestly). Five visual diagrams: two-stage split (#1), 2×2 opportunity quadrant (#2), foundation stack for durable demand (#5), iceberg SVG for request-vs-why (#7), B2C/B2B flow comparison (#9). Linked from writing.html as the most recent post (2026).
- **Why:** writing.html was previously redirecting to Twitter for all essays; this is the first piece that actually lives on the site. Sets the publishing pattern for future essays.
- **Alternatives considered:**
  - Standalone `/notes` or `/field-notes` page outside the writing IA — rejected per Rinkesh's call: keep this in writing.html as one of the essays, not a parallel page.
  - Putting field notes in `/reading` — rejected; `/reading` is for books, this is product-building observations.
  - Tables for the visuals — rejected; user critique was that tables felt generic and just restated prose. Replaced with actual diagrams (quadrant, stack, iceberg SVG, flow boxes).
  - Cross-references between entries (`→ Same lesson as #X`) — rejected; user found them noise rather than signal.
- **Iteration history (in chat):** v1 attribution-heavy commonplace book → v2 lesson-led, footer credit → v3 mechanism + trap + move format with depth → v4 visuals replacing tables, cuts down to 10 entries. Final version is v4.
- **Open question:** what's the sustainable publishing flow for future essays? Hand-edited HTML for the next 1–2 pieces, then evaluate a Markdown→HTML build only if the friction proves real.
- **Tags:** `#writing` `#essay` `#field-notes` `#first-on-site-essay`

### 2026-04-28 — Internal docs system added — *pending commit*
- **What changed:** four working docs in [`docs/`](.) — [`about.md`](about.md) (anchor), [`writingstyle.md`](writingstyle.md) (voice rulebook), [`inspirations.md`](inspirations.md) (curated patterns from other sites), [`changelog.md`](changelog.md) (this file). Plus [`CLAUDE.md`](../CLAUDE.md) at root pointing into them.
- **Why:** the site has accumulated taste decisions that were ephemeral across sessions. The docs make voice, structure, and prior decisions queryable so future sessions don't re-litigate or drift. The negative space (rejected ideas, with reasoning) is the highest-value piece — git log can't capture it.
- **Tags:** `#docs` `#anchor` `#voice` `#process`


### 2026-04-09 — Remove `loading=lazy` from artifact images — `b663d88`
- **What changed:** dropped `loading=lazy` on the artifact-grid images on the homepage.
- **Why:** lazy loading combined with the swatch-then-real-image swap caused images to remain hidden in some cached states.
- **Alternatives considered:** not recorded at the time. Likely candidates: keeping lazy + fixing the swap logic; using `loading=eager` only for above-the-fold artifacts. Backfill when relevant.
- **Outcome:** images render reliably; small perf cost on first paint accepted as a fair trade.
- **Tags:** `#home` `#artifact-grid` `#performance`

### 2026-04-07 — SEO, AI discoverability, and accessibility overhaul — `9f485d5`
- **What changed:** added/refined `meta` tags, OG/Twitter cards, JSON-LD `Person` and `WebSite` schema, `llms.txt`, `robots.txt`, `sitemap.xml`, `manifest.json`, skip-link, focus-visible styles, and `meta name="robots"` per page.
- **Why:** the site needs to be findable (SEO), citable (AI crawlers), and usable (a11y) without compromising the visual restraint.
- **Alternatives considered:** not recorded at the time. Worth noting going forward: whether to host an `llms-full.txt` with full text vs. the index-only `llms.txt` we currently have.
- **Outcome:** baseline established. Open question: should `writing.html` be indexed (currently `noindex, follow`)?
- **Tags:** `#seo` `#a11y` `#llms-txt` `#meta`

### 2026-04-06 — Make section labels more prominent, remove writing nav link — `9a482d6`
- **What changed:** section labels (small-caps headers like "Companies", "Side Projects") got more visual weight; the "writing" link was removed from the primary nav on home.
- **Why:** section labels were under-doing their job as anchors; the writing page wasn't strong enough to justify primary-nav real estate yet.
- **Alternatives considered:** not recorded. Likely on the table: keeping writing in nav and just strengthening the page; moving writing into a footer link only.
- **Outcome:** writing.html is still reachable but de-emphasized. Open question (carried into [`about.md`](about.md#open-questions--under-exploration)): does writing earn a nav slot back if it hosts actual essays?
- **Tags:** `#nav` `#section-labels` `#writing`

### 2026-04-06 — Tighten spacing, rename Twittr Gems, clean up Graveyard — `d9bc031`
- **What changed:** spacing audit across home; "Twittr Gems" renamed (the previous name had a typo or branding issue); Graveyard list pruned.
- **Why:** spacing had drifted from the intended density; Graveyard was carrying entries that no longer served the "honest about failure" goal.
- **Alternatives considered:** not recorded.
- **Outcome:** density restored. Graveyard is now a tighter, more honest list.
- **Tags:** `#spacing` `#graveyard` `#copy`

### 2026-04-06 — Fix side project card layout, readability, and copy — `123fa6c`
- **What changed:** restructured the side-project cards (KnowYourPay / Product Sense Lab / Twittr Gems) for layout balance and readability.
- **Why:** the cards were carrying inconsistent metadata structure and copy quality.
- **Alternatives considered:** not recorded.
- **Outcome:** consistent card pattern across side projects.
- **Tags:** `#side-projects` `#cards` `#copy`

---

## Planned

Decided directions, not yet implemented. Tracked here so future sessions don't re-decide them.

### 2026-04-28 — writing.html will host original essays
- **Decision:** writing.html will host real essay pages, not redirect to Twitter. The Twitter CTA section will be removed/de-emphasized once first essay is up.
- **Why:** Rinkesh has writing he wants to publish; his own site is the right home, not a Twitter-driven detour.
- **Open question:** what's the minimum-effort publishing flow — static HTML pages, Markdown→HTML build, something else? Decide when first essay is ready.
- **Tags:** `#writing` `#publishing-flow`

### 2026-04-28 — `/reading` page (hybrid shape)
- **Decision:** add a `/reading` page (not `/bookshelf` — broader scope to allow essays/papers later). Shape: hybrid of "books that changed my mind" (body, ~10–12 entries) + "if you're working on…" problem-pointer block (footer, 4–5 entries) + a one-line "currently reading" at the top.
- **Why this shape:** the "changed my mind" framing is the strongest anti-dead-page lever — every entry must carry a real claim and a revision, so copying from another list is impossible. The problem-pointer block adds visitor utility cheaply. "Currently reading" gives the page a pulse without a maintenance cliff.
- **Alternatives considered:**
  - Option 1: pure "press into your hands" curated top-N — rejected as not distinctive enough; many builders have favorite-book lists.
  - Option 3: pure "reading by problem" indexed — rejected as having too much structural overhead and pinning to a fixed problem set; kept as a sliver instead.
  - "Bookshelf" naming — rejected for `/reading` to leave room for essays/papers if the page grows.
- **Open question:** publishing flow (static HTML page hand-edited vs. Markdown→HTML build) and seed list. Awaiting Rinkesh's seed of ~5 books before building.
- **Tags:** `#bookshelf` `#reading-list` `#curation` `#planned`

---

## Considered & rejected

Ideas that were proposed and explicitly decided against. **This section is the most valuable part of this doc** — these are the ideas most likely to be re-suggested in a fresh conversation. Read here before proposing anything that "feels new."

### 2026-04-28 — `/now` page
- **What was proposed:** a `/now` page in the Nat Eliason / Brian Lovin style — what I'm working on right now, updated monthly.
- **Why it was rejected:** doesn't fit the site's pulse. The site has a slow, episodic cadence — not a monthly check-in cadence. Current state already lives on the home page intro and the artifact grid; a dedicated `/now` would add maintenance overhead without unique value.
- **Conditions for revisit:** if the home page stops carrying current-state signals, or if Rinkesh's writing rhythm changes to something monthly.
- **Tags:** `#now-page` `#nav`

### 2026-04-28 — Public `/changelog` page
- **What was proposed:** publish a curated subset of [`docs/changelog.md`](changelog.md) as a public page.
- **Why it was rejected:** the changelog is internal decision-memory, not public content. Public changelogs work for tools and SaaS where users want to see what's new; on a personal site they invite meta-narcissism without earning attention. The site is not a meta-site about its own evolution.
- **Conditions for revisit:** if the site ever hosts a public-facing tool or product whose changes users would want to track.
- **Tags:** `#changelog` `#public-page`

### 2026-04-28 — Public `/colophon` page (deferred, not killed)
- **What was proposed:** publish a curated subset of [`docs/inspirations.md`](inspirations.md) as a public colophon page (Brian Lovin / Robin Rendle style).
- **Why it was deferred:** not a priority right now. Conceptually fine — a colophon is a respectable personal-site genre — but adds maintenance and isn't load-bearing. May reconsider later.
- **Conditions for revisit:** when there's a clear narrative reason to surface inspirations publicly (e.g., a redesign drawing heavily on a specific reference), or when the site's page set has settled and adding one more makes sense.
- **Tags:** `#colophon` `#public-page` `#deferred`

---

## Watch list

Things shipped recently that we want to monitor before declaring settled.

*(Empty for now. Populate when something ships with an explicit "let's see how this lands.")*

Format:

```
### YYYY-MM-DD — what shipped — commit-ref
- **What we're watching for:** the signal that would confirm or reject the change.
- **By when:** the time horizon.
- **Decision:** filled in when we decide to keep, revert, or iterate.
```
