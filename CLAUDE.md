# CLAUDE.md

Working notes for Claude when helping on this site.

## What this site is

A personal site for Rinkesh Gorasia — two-time founder, product builder, currently looking for the next thing. Restrained, warm, honest about failure. Not a SaaS landing page, not a portfolio in the agency sense, not a content-marketing operation.

The full anchor is in [`docs/about.md`](docs/about.md). **Read it before designing any change.** If a change contradicts the anchor, the anchor wins — or the anchor needs updating first, in which case do that explicitly.

## The four docs

Four living docs, all in [`docs/`](docs/), are the brain of this project:

1. **[`docs/about.md`](docs/about.md)** — the anchor. What the site is, who it's for, the voice, the design principles, what it is *not*. The decision test at the bottom is the canonical "should we ship this?" gate.
2. **[`docs/writingstyle.md`](docs/writingstyle.md)** — the voice rulebook. Universal rules, AI-voice anti-patterns, surface-specific rules (UI copy / bio / work cards / principles / essay prose / email CTAs / meta / `/reading`), storytelling principles, iteration protocol for drafts. Read before writing any copy.
3. **[`docs/inspirations.md`](docs/inspirations.md)** — curated patterns from other personal sites, each tagged with where it applies on this site. Not a museum; a working tool.
4. **[`docs/changelog.md`](docs/changelog.md)** — what shipped, what's planned, **what was rejected and why**. The negative space is the point — git log can't capture it.

## How to use the docs

**Before designing a change:**
1. Re-read [`docs/about.md`](docs/about.md) — at least the "Non-negotiables", "What this site is NOT", and "The decision test" sections.
2. Grep [`docs/changelog.md`](docs/changelog.md) for the relevant tag (`#nav`, `#typography`, `#hero`, etc.). Check the "Considered & rejected" section especially — it's the most likely place to find that the new idea has already been argued out.
3. Grep [`docs/inspirations.md`](docs/inspirations.md) for the same tag. Use what's there as concrete reference, not just "for inspiration."

**While designing:**
- Voice should match the site's voice (plainspoken, concrete, unembarrassed about failure). Surface-specific rules in [`docs/writingstyle.md`](docs/writingstyle.md). The AI-voice anti-patterns section is mandatory reading before writing any copy.
- Design should respect the non-negotiables: warm cream background, Fraunces + Inter, 600px content column, light mode locked, no popups/modals/newsletter capture.
- Restraint over flourish. If a feature needs a tutorial in the footer to be appreciated, it doesn't belong.

**When Rinkesh gives a draft:**
Follow the iteration protocol in [`docs/writingstyle.md`](docs/writingstyle.md#the-iteration-protocol--when-rinkesh-gives-a-draft). Do **not** rewrite from scratch. The draft is the anchor. Make surgical proposals (cut these words / this drifts AI / here are 2–3 ways to phrase this). When a sentence has multiple good shapes, offer 2–3 options — never silently pick one.

**After landing a structural or visual change:**
- Propose a changelog entry following the schema in [`docs/changelog.md`](docs/changelog.md) — at minimum: what changed, why, alternatives considered, outcome.
- If the change introduced a new pattern worth keeping in mind, suggest an inspirations.md update too.
- The user reviews and approves the entry before commit. Do not auto-write changelog entries silently.

**When proposing something that conflicts with the anchor:**
Don't smuggle it through. Surface the conflict explicitly: "This conflicts with `about.md` X — I think the anchor should change because Y. Here's the change to the anchor for review." Then wait for confirmation.

## Site map

- [`index.html`](index.html) — home
- [`work.html`](work.html) — full work history
- [`how-i-work.html`](how-i-work.html) — process and principles
- [`writing.html`](writing.html) — essays + Twitter redirect
- [`cv.html`](cv.html) — formal CV view
- [`preview.html`](preview.html) — experimental variant of home (scratch)
- [`styles.css`](styles.css) — shared styles
- [`llms.txt`](llms.txt), [`robots.txt`](robots.txt), [`sitemap.xml`](sitemap.xml), [`manifest.json`](manifest.json) — discoverability + PWA
- [`images/`](images/) — assets

## Working preferences

- Match the existing voice precisely. Read [`docs/writingstyle.md`](docs/writingstyle.md) and the surrounding copy before writing new copy.
- Edit existing files; only create new ones with explicit reason.
- Never add comments to HTML/CSS unless the *why* is non-obvious.
- Don't add SEO/meta/a11y patterns that aren't already there without flagging the addition.
- For UI changes, always preview in a browser before declaring done. If you can't preview, say so.
- No AI-voice tells in any output, including this conversation: no triplet-syndrome, no hedging filler, no throat-clearing, no forbidden-word list (`delve`, `tapestry`, `leverage`, `seamless`, etc.). The full list is in [`docs/writingstyle.md`](docs/writingstyle.md#ai-voice--the-anti-patterns).
