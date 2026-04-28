# About this site

> The anchor doc. Read this before designing any change. If something on the site contradicts this, the site is wrong, not the doc — or the doc needs updating, in which case do that first.

---

## What this site is

A personal site for Rinkesh Gorasia — two-time founder, product builder, currently looking for the next thing. The site is a **credential made of artifact**: the page itself is part of the proof. A visitor leaves with three impressions in this order:

1. **Who he is** (founder, builder, calm not loud)
2. **What he's done** (Savior → Zocdoc; Career Leap; current side projects)
3. **How he thinks** (process, principles, what he won't do)

Everything else is in service of those three. If a section doesn't move one of them forward, it doesn't belong.

## Why it exists

1. To replace "send me your CV" with a single URL that does the work better than a CV does.
2. To compress a year of context (what I've shipped, killed, learned) into ten minutes of reading.
3. To filter — the right collaborators self-select in; the wrong ones bounce.
4. To be an owned platform that doesn't depend on Twitter, LinkedIn, or any algorithm staying alive.
5. Because for a builder, the artifact IS the credential. A clumsy site contradicts the claim of taste.

## Audience

**Primary:** founders, hiring managers, and operators evaluating Rinkesh for a senior product/growth role or founding-team seat. They are skim-reading ~10 sites in a row and have ~90 seconds before they decide to keep reading.

**Secondary:** peer builders who land here from Twitter or via word of mouth. They care less about the CV pitch and more about the thinking and the side projects.

**Not the audience:** recruiters running keyword scans, casual web surfers, anyone wanting consulting services. The site does not optimize for them.

## Voice & tone

The voice is **plainspoken, direct, and unembarrassed about failure.** Specific markers:

- **Concrete over abstract.** "85 hospitals" not "many hospitals." "40% completion" not "high engagement." "₹15L revenue" not "monetized."
- **Names the dead things.** Hypersync. Career Leap. The Graveyard section exists. Failure is not buried.
- **No buzzwords, and when one is unavoidable, it's disclaimed** — see "Not an MVP in the buzzword sense" on `how-i-work.html`.
- **Italic for warmth, not decoration.** "*just say hi.*" "*let's talk.*" "*I'm easy to reach.*" The italic is a soft signal that the line is meant personally.
- **Short sentences for emphasis.** "Sunk cost is the enemy of good judgment." "Shutting down is a decision, not a failure."
- **First-person, present tense, low-pressure CTAs.** No "Hire me." No "Book a call." Just an email address and a sentence that suggests it's fine to use it.

What the voice is **not:** breezy, performative, hyped, ironic-detached, or self-promotional in the LinkedIn sense.

## Design principles

The design is restrained on purpose. The lesson from every great personal site for a builder is the same: **let the content do the work; let the craft show in the details.**

- **Palette:** warm cream `#f8f6f2`, ink `#18160f`, mid `#6b6355`, faint `#aea79c`, rule `#e5dfd6`. Greens and reds reserved for status (live/shut). Light mode locked — no dark mode.
- **Type:** Fraunces (serif) for display, italic for emotional beats. Inter (sans) for body. Body line-height 1.65, content column 600px max.
- **Texture:** a low-opacity noise/grain overlay (0.35 opacity, `mix-blend-mode: overlay`). Subtle but it's the thing that keeps the cream from looking sterile.
- **Motion:** scroll-triggered fade-up on entry, ~700ms ease, threshold 0.05. No parallax, no scroll-jacking, no hero animations.
- **Density:** every section earns its space. White space is a feature; if a block can be deleted without loss, it should be.
- **Detail care:** weather widget pulling Bengaluru's current temp; section labels in small caps with letter-spacing; "powered by claude, tokens & coffee" footer credit. Tiny things that signal the maker cared.

Anti-patterns that should never appear: dark mode toggles, cookie banners, "Subscribe to my newsletter" modals, chat widgets, lottie hero animations, gradient buttons, "I help X do Y" headlines.

## Information architecture

Live pages, each with one job:

| Page | One job | Tone |
|---|---|---|
| [index.html](../index.html) | First-impression, current availability, snapshot of work | Inviting, calm |
| [work.html](../work.html) | Full work history including dead projects | Honest, detailed |
| [how-i-work.html](../how-i-work.html) | Process and principles — how he thinks | Opinionated, specific |
| [writing.html](../writing.html) | Original essays. First real essay live: [field-notes.html](../field-notes.html). Older list items still link to Twitter and will be replaced as essays get written. | Restrained |
| [field-notes.html](../field-notes.html) | First on-site essay: 10 product-building observations, grouped into 5 clusters, with diagrams (stage split, opportunity quadrant, foundation stack, iceberg, B2C/B2B flows). | Plainspoken, dense |
| [cv.html](../cv.html) | Traditional CV view for systems that need it | Formal, unstyled |

Planned pages (decided, not yet built):

| Page | One job | Status |
|---|---|---|
| `/reading` | Curated reading. Hybrid shape: "books that changed my mind" (body) + problem-pointer block ("if you're working on…") + a one-line "currently reading" at the top. Must be alive, not a snapshot. | Shape locked, awaiting seed. See [`changelog.md`](changelog.md#planned). |

Scratch: [preview.html](../preview.html) (experimental variant of home, noindexed — keep or delete is an open question).

Page rules:
- The nav stays the same across pages. No clever per-page navs.
- Every page has the same footer pattern (CTA → email → social → credit).
- No page should require horizontal scrolling at any width ≥ 360px.

## Non-negotiables

Things that need a real reason to change, not a passing whim:

- **The cream background.** It's load-bearing for the warm-restraint feeling.
- **Fraunces + Inter pairing.** This is the visual signature.
- **Honesty about dead projects.** The Graveyard stays. Hypersync stays.
- **The 600px content column.** Wider columns wreck the reading rhythm.
- **No newsletter capture, no chat widget, no popups, no analytics overlay.** Ever.
- **Weather widget for Bengaluru.** Personality detail; signals the site is alive.

## Open questions / under exploration

Things we have not figured out yet (tracked here so we don't keep re-asking):

- **Publishing flow.** Both writing.html (essays) and `/reading` need a publishing flow. Open question: hand-edited static HTML vs. Markdown→HTML build vs. something else. Decide when first essay or first book entry is ready.
- **Fate of `preview.html`** — keep as scratch or delete.

Decisions already made (so future sessions don't re-litigate them) live in [`changelog.md`](changelog.md) — see "Considered & rejected" and "Planned" sections.

## What this site is NOT

Anti-positioning. If a proposed change starts to feel like one of these, stop:

- **Not a SaaS landing page.** No "trusted by" logos, no feature comparison tables, no pricing sections, no waitlist forms.
- **Not a portfolio in the design-agency sense.** No before/after sliders, no case-study microsites, no immersive scrollytelling.
- **Not a content marketing operation.** No SEO-bait listicles, no "ultimate guide to X" posts, no email funnel.
- **Not a digital garden.** Notes don't accrete here unstructured. If something belongs, it gets a deliberate page.
- **Not a daily-updated site.** No `/now` page; current state lives on the home page where it's seen once and trusted to be roughly right. The site has a slow pulse, not a daily one.
- **Not a meta-site about its own evolution.** No public `/changelog`, no public `/colophon` (for now). The internal docs are working tools, not content.
- **Not an in-progress demo of every CSS trick.** If a feature requires a tutorial in the footer to be appreciated, it doesn't belong.

## The decision test

When a change is proposed, run it through these in order. If it fails any, push back or rework before shipping:

1. **Does it move "who he is / what he's done / how he thinks" forward?**
2. **Would the audience above (founder/hiring manager skimming 10 sites) be helped or distracted?**
3. **Is it consistent with the voice — plainspoken, concrete, unembarrassed?**
4. **Does it respect the non-negotiables?**
5. **Has a similar idea been tried and rejected before?** (Check `docs/changelog.md`.)
6. **Is there an inspiration we've already noted that does this better?** (Check `docs/inspirations.md`.)

If a change passes all six, ship it. After it ships, log it in `docs/changelog.md` so the next session has the context.
