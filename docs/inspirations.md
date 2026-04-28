# Inspirations

> A working tool, not a museum. Each entry exists because there is something concrete to learn from it, *applied to this site*. If an entry doesn't have a clear "where this applies on my site," it doesn't belong.

## How to use this doc

When designing a change, search this file for the relevant tag (`#voice`, `#now-page`, `#typography`, `#bio`, etc.) and read only those entries. Don't read top-to-bottom — read by topic.

Each entry follows the same shape:

- **Pattern** — one sentence, the actual technique
- **Apply on my site** — the specific page/section it could improve
- **Steal** — what to take
- **Skip** — what to leave behind, so we don't accidentally inherit it
- **Tags** — for grep

Anchor reference for what "fits" means: [`docs/about.md`](about.md). When in doubt, the anchor wins.

---

## Voice & copy

Sites where the lesson is **how to write** for a personal site, not how to lay one out.

### Paul Graham — paulgraham.com
*Essayist; the canonical "essays only" site.*
- **Pattern:** the essay is bare HTML and the words carry the entire weight; no nav cruft, no decoration, no "subscribe."
- **Apply on my site:** writing.html, and any future essay page.
- **Steal:** the conversational opening; willingness to be tentative ("I think…", "Maybe…") instead of certainty-shouting; short sentences for emphasis.
- **Skip:** the bare-HTML aesthetic. PG can afford it because his name is the design. For a builder claiming taste, unstyled = anti-signal.
- **Tags:** `#voice` `#writing`

### Sam Altman — blog.samaltman.com
*Investor/founder essayist.*
- **Pattern:** posts can be 200 words and still feel substantive when the thinking is sharp. Brevity is the format.
- **Apply on my site:** writing.html essay list — gives permission for short posts.
- **Steal:** the discipline that a single observation can be a complete post. No "intro / body / conclusion" scaffolding required.
- **Skip:** the un-styled register; same reason as PG.
- **Tags:** `#voice` `#writing` `#brevity`

### Derek Sivers — sive.rs (writing voice)
*Founder/writer; the patron saint of brevity.*
- **Pattern:** ruthless cutting. Sivers writes a post, then cuts it in half, then cuts it in half again. Most posts are under 200 words. Plain words ("use" not "leverage"; "help" not "facilitate"). Strong claims, plainly stated, no hedging. The headline often *is* the thesis — the post is one elaboration. Conversational — reads like he's writing to one person, not to "an audience."
- **Apply on my site:** every writing surface. Sivers is the calibration reference for "is this as short as it can be?" and "is this in plain words?"
- **Steal:** the cutting discipline (write it, halve it, halve it again); the ban on jargon at the sentence level; the willingness to write a 100-word post and stop.
- **Skip:** the koan-density at the limit — Sivers can write three-sentence posts because he has 25 years of context behind him; for Rinkesh, target 200–500 words for blog posts and let cards/UI copy be much shorter.
- **Tags:** `#voice` `#writing` `#brevity` `#copy-discipline`

*Note: Sivers also appears in [Curation as identity](#derek-sivers--siversbook) for the bookshelf-structure lesson. Two distinct lessons, two entries.*

### James Clear — jamesclear.com
*Author/newsletter operator.*
- **Pattern:** every sentence earns its place. The whole site reads like it was rewritten ten times to remove a word from each line.
- **Apply on my site:** the principles list on how-i-work.html, the bio paragraph on home.
- **Steal:** the distillation discipline — read your draft and ask "what gets cut without loss."
- **Skip:** the author-business funnel (book → newsletter → course). Rinkesh isn't selling.
- **Tags:** `#voice` `#copy-discipline`

### Morgan Housel — collabfund.com/blog
*Investor essayist.*
- **Pattern:** durable phrasing. He rephrases familiar ideas in shapes that stick — "X, not Y" constructions, anchor-stories before any generalization.
- **Apply on my site:** the principle copy on how-i-work.html ("Doing beats planning," "Distribution is part of the product"). This is where Rinkesh already does this; Housel is the reference for *why it works*.
- **Steal:** lead with a specific story, then state the general principle.
- **Skip:** the institutional masthead.
- **Tags:** `#voice` `#principles` `#how-i-work`

### Julia Evans — jvns.ca
*Programmer-writer who explains hard things kindly.*
- **Pattern:** voice can carry warmth without losing rigor. "I" voice, short paragraphs, willingness to walk through thinking step-by-step.
- **Apply on my site:** how-i-work.html, and any future deep-dive on a specific product (e.g., a long-form Career Leap post-mortem).
- **Steal:** the warmth-with-rigor combination; the "let me show you what I was confused about" opening that earns trust.
- **Skip:** the zine illustrations — heavy lift, not Rinkesh's craft.
- **Tags:** `#voice` `#how-i-work` `#post-mortem`

### Alexey Guzey — guzey.com
*Independent researcher.*
- **Pattern:** epistemic-status tags. "Confidence: weak." "This is half-baked." Labeling your own confidence lets you publish more, faster, without overclaiming.
- **Apply on my site:** future essay or "ideas" page; anywhere Rinkesh wants to publish a still-forming thought.
- **Steal:** the honesty primitive. In a world of certainty-shouters, "I'm 60% on this" is a competitive advantage.
- **Skip:** the academic dryness; Rinkesh's voice is warmer.
- **Tags:** `#voice` `#writing` `#honesty`

### Nabeel Qureshi — nabeelqu.co
*Ex-Palantir, AI investor.*
- **Pattern:** a single canonical essay ("How To Understand Things") becomes the calling card. People forward it; it explains who he is better than a bio.
- **Apply on my site:** writing.html — what is the *one* essay people forward to friends? That essay deserves disproportionate care.
- **Steal:** depth without academic pretension; the willingness to write the long piece that defines you.
- **Skip:** the heavy book-recommendation density.
- **Tags:** `#voice` `#writing` `#canonical-essay`

### Lawrence Yeo — More to That — more-to-that.com
*Illustrator-essayist.*
- **Pattern:** the voice IS the design system. Patient, story-first, philosophical. The writing has a recognizable rhythm before you see his name.
- **Apply on my site:** any long-form essay; the bio paragraph if it ever expands.
- **Steal:** the patient opening — start with a small concrete moment before any abstract claim.
- **Skip:** the original illustrations — heavy lift, not Rinkesh's medium.
- **Tags:** `#voice` `#long-form` `#writing`

### Farza — farza.com
*Ex-Buildspace founder.*
- **Pattern:** the founder-confessional voice — "some of this worked, most didn't" — done unironically and without performative humility.
- **Apply on my site:** the Graveyard section on work.html, post-mortems, the "what I don't do" block on how-i-work.html.
- **Steal:** matter-of-factness about failure. Rinkesh already does this — Farza is the proof point that this voice resonates.
- **Skip:** the energy-and-casualness register; Rinkesh's voice is calmer and more measured.
- **Tags:** `#voice` `#failure-honesty` `#graveyard`

---

## Long-form essay craft

Sites whose lesson is **how to present a single piece of writing well.** Relevant when (if) writing.html starts hosting actual essays rather than redirecting to Twitter.

### Kevin Simler — Melting Asphalt — meltingasphalt.com
*Long-form essayist.*
- **Pattern:** scholarly framing for non-academic ideas — sidenotes, careful figures, generous margins, footnotes that pay off.
- **Apply on my site:** any long-form essay layout; if Rinkesh writes a 4000-word piece, this is the layout reference.
- **Steal:** the sidenote pattern; the willingness to invest layout effort in essays you expect to last.
- **Skip:** the very-long-form length — Rinkesh's voice is shorter and faster.
- **Tags:** `#typography` `#long-form` `#essay-design`

### Maggie Appleton — maggieappleton.com
*Illustrator-essayist.*
- **Pattern:** typographic discipline at the highest level — every heading hierarchy, every line-length, every paragraph spacing chosen on purpose.
- **Apply on my site:** writing.html, any change to type elsewhere.
- **Steal:** treating typography as the primary craft surface of a writer's site. Type *is* the design.
- **Skip:** the illustration program; would be a 6-month commitment Rinkesh doesn't need.
- **Tags:** `#typography` `#writing` `#essay-design`

### Robin Rendle — robinrendle.com
*Designer-writer focused on web typography.*
- **Pattern:** typography respect taken to its limit — content design as the primary craft.
- **Apply on my site:** before any change to font sizes, line heights, or spacing on writing.html or essays.
- **Steal:** the principle that typography decisions should be made deliberately, not by drift.
- **Skip:** the experimental newsletter-as-website projects — outside scope.
- **Tags:** `#typography` `#essay-design`

### Julian Shapiro — julian.com
*Builder/writer.*
- **Pattern:** "book on the web" — pillar pages with deep cross-links, treating a body of knowledge as a structured artifact rather than a chronological feed.
- **Apply on my site:** if how-i-work.html ever expands into multiple chapters (acquisition, retention, hiring, etc.), this is the reference.
- **Steal:** the structured-guide format — name the framework, define it, give an example.
- **Skip:** the marketing-funnel framing.
- **Tags:** `#how-i-work` `#structure` `#long-form`

---

## Structure & information architecture

Sites whose lesson is **how to organize the page set itself** — what pages exist, what each page does, how the nav signals priority.

### Patrick Collison — patrickcollison.com
*Stripe CEO.*
- **Pattern:** a page can just be a list, no apology, no decoration. Bookshelf, advice, questions — each its own page, plain typography.
- **Apply on my site:** if a bookshelf page or "questions I'm thinking about" page gets considered.
- **Steal:** the dignity of a list-as-page. The list IS the work; it doesn't need a header animation.
- **Skip:** the institutional CEO register.
- **Tags:** `#structure` `#bookshelf` `#list-as-page`

### David Perell — perell.com
*Writing teacher.*
- **Pattern:** a body of writing organized into pillars (essays grouped by theme), each pillar discoverable on its own page.
- **Apply on my site:** future writing/essays IA if essays grow past ~10.
- **Steal:** the discoverable taxonomy — a reader landing on one essay finds the related ones.
- **Skip:** the heavy "buy my course" framing.
- **Tags:** `#structure` `#writing` `#taxonomy`

### Nat Eliason — nateliason.com
*Writer-builder hybrid.*
- **Pattern:** a personal site that is both portfolio and writing archive without one drowning the other. The nav signals priority (writing | projects | newsletter | now).
- **Apply on my site:** the relationship between work.html and writing.html, and the eventual /now page.
- **Steal:** the "now" page model, the writer/builder split nav, the discipline that a /now page is short.
- **Skip:** the heavy-newsletter pitch — Rinkesh doesn't have a list.
- **Tags:** `#now-page` `#nav` `#writer-builder`

### Sriram Krishnan — sriramk.com
*Operator-investor.*
- **Pattern:** clean essay archive organized by category, plus a "what I'm reading" page. Each artifact respects the reader's time.
- **Apply on my site:** writing.html restructure if essays grow; potential reading page.
- **Steal:** the categorized archive layout; the brevity of each landing page.
- **Skip:** the VC-firm institutional aura.
- **Tags:** `#structure` `#writing` `#reading-list`

### Sachin Rekhi — sachinrekhi.com
*PM/exec, frameworks-oriented.*
- **Pattern:** framework-as-essay format — name the framework, define it, give an example, link to the long version. The site is a public knowledge base.
- **Apply on my site:** how-i-work.html if it ever expands into named frameworks; future post-mortems.
- **Steal:** the format itself — naming a framework is half the work of explaining it.
- **Skip:** the formal blog-post register; Rinkesh's voice is more conversational.
- **Tags:** `#how-i-work` `#frameworks` `#structure`

### Jordan Gonen — jordangonen.com
*Builder/writer.*
- **Pattern:** five-link nav (Now / About / Bookshelf / Travel / Writing). The nav itself is the statement of what matters. Nothing else on the homepage.
- **Apply on my site:** any nav change; the question of whether to add a /now page.
- **Steal:** the principle that the nav is a values statement, not a sitemap. Five is enough.
- **Skip:** the no-styling — for Rinkesh, restrained ≠ unstyled.
- **Tags:** `#nav` `#now-page` `#minimal`

### Jon Bo — jon.bo
*Minimal personal site.*
- **Pattern:** homepage = bio + recent posts + **evergreen posts** (a separate section for the few pieces that should outlast the chronology).
- **Apply on my site:** writing.html — currently flat-by-date. The evergreen/recent split would surface the strongest pieces.
- **Steal:** the evergreen vs. recent distinction.
- **Skip:** the journaling-personal register.
- **Tags:** `#writing` `#structure` `#evergreen`

### Peyton Klein — peytonklein.com
*Operator.*
- **Pattern:** the **currently / previously / broadly + importantly** structure — three professional registers (what I'm doing, what I've done, the long-arc themes) plus one humanizing personal block.
- **Apply on my site:** home page restructure or a future /about page.
- **Steal:** the structure itself. "Broadly" is the strongest part — it forces you to articulate the long-arc themes that span across specific projects. "Importantly" is the humanizing pressure-release.
- **Skip:** the warmth-forward voice ("shameless hugger") — not Rinkesh's register.
- **Tags:** `#bio` `#home` `#structure` `#about`

### Brian Lovin — brianlovin.com
*Designer-engineer at Campsite, prev. GitHub.*
- **Pattern:** the textbook builder-site discipline. `/now`, `/uses`, `/writing`, `/changelog`, `/bookmarks` — each page does one job, every detail considered. The closest reference for "what could this site look like in two years if Rinkesh keeps tending it."
- **Apply on my site:** almost every IA decision. This is the north-star reference.
- **Steal:** the page set, the public /changelog idea, the discipline of versioning visual updates.
- **Skip:** the dark mode (Rinkesh is light-mode locked); the heavy interaction layer (cursor effects, animated transitions).
- **Tags:** `#structure` `#nav` `#changelog` `#now-page` `#uses-page` `#north-star`

### Linus Lee — thesephist.com
*Researcher (ex-Notion, AI).*
- **Pattern:** an "intellectual builder" site — essays cross-linked deeply enough that reading one leads to two more, but without becoming an unstructured digital garden.
- **Apply on my site:** how-i-work.html or future essays.
- **Steal:** the visible interconnection — a piece of writing pointing forward and backward.
- **Skip:** the experimental UI work — heavy lift, not Rinkesh's medium.
- **Tags:** `#writing` `#interconnection` `#how-i-work`

---

## Curation as identity

Sites whose lesson is that **what you choose to share is a position statement.** A "free ideas" page or a reading list signals abundance, taste, and seriousness more than a CV does.

### Blake Robbins — blakeir.com
*VC.*
- **Pattern:** monthly reading list as a recurring artifact. The cadence builds a return habit; the list reveals how the curator's mind moves over time.
- **Apply on my site:** potential reading page or monthly note. Currently we have no recurring artifact.
- **Steal:** the cadence as the design. A monthly artifact gives the site a pulse.
- **Skip:** the VC-list framing (deal links, fund news).
- **Tags:** `#reading-list` `#cadence` `#bookshelf`

### Derek Sivers — sive.rs/book
*Founder/writer; the canonical bookshelf-that-doesn't-die.*
- **Pattern:** every book entry has the same shape — title, author, his rating, a 1-paragraph "what I learned," and a link to longer notes. Maintained over 10+ years without becoming a dead archive because every entry has voice; nothing is just a title.
- **Apply on my site:** the planned bookshelf/reading page. This is the structural reference for "why a curated annotated list outlives a flat enumeration."
- **Steal:** the principle that every entry must have voice. No bare titles. The "what I learned" line is the entire point of the page; without it, you have a Goodreads export.
- **Skip:** the rating system (1–10 numeric). Stars on a personal site read as performative; voice in the line itself does the work.
- **Tags:** `#bookshelf` `#reading-list` `#curation` `#annotation`

### Carolyn Zhang — carolynzhang.com/free-ideas
*Designer/builder.*
- **Pattern:** a "free ideas" page — bulleted list of product/business ideas she won't build, with explicit "no CTAs, just shared." Generous publishing as a positioning move.
- **Apply on my site:** potential addition to writing.html or as a standalone /ideas page.
- **Steal:** the format and the explicit "no CTA" stance. Signals abundance and taste in a way that no listicle can.
- **Skip:** nothing. This pattern fits cleanly.
- **Tags:** `#ideas-page` `#curation` `#writing`

### Alana Goyal — alanagoyal.com/about-me
*VC at Bessemer.*
- **Pattern:** a single distinctive theme (Apple Notes interface) carried through with discipline becomes the entire visual identity.
- **Apply on my site:** validates the principle that ONE strong design idea beats five small ones. Rinkesh's "warm cream + serif italic + grain texture" is already this — Alana's site is the proof.
- **Steal:** the principle. Don't borrow the theme.
- **Skip:** the Apple Notes look itself — too borrowed for a site whose visual signature is already calmer.
- **Tags:** `#design-discipline` `#visual-identity`

---

## Considered and dropped

Honest list of what was on the inspiration list but isn't carried forward, with reasoning. Future sessions should not re-litigate these unless the reasoning has changed.

- **Farnam Street — fs.blog.** Dropped: it's a media business now (multiple authors, paid newsletter, course catalog), not a personal site. The lessons that mattered (long-running essay archive, mental-models taxonomy) are present in better-fitting refs above (Sriram Krishnan, Nabeel Qureshi).
- **Manas Saloi — manassaloi.com.** Borderline: prolific Indian PM writing is a useful peer reference, but the actionable lesson (high-volume publishing) doesn't fit a site that prefers fewer, denser pieces. Re-add only if the writing strategy changes.
- **Nirant K.** Dropped: peer reference for Indian builder context, but I couldn't articulate a specific applicable pattern beyond "exists as a peer." A reference without a pattern doesn't earn a slot here.
- **Sheel Mohnot.** Dropped: voice/personality is too distinct to translate; the lesson "have one memorable craft detail" is already covered by Alana Goyal more cleanly.
- **Ryan Dawidjan.** Dropped: known to Rinkesh as a distinctive online persona but I couldn't pin a specific transferable pattern. If Rinkesh has the angle, add it back manually.
- **Vbud — vbud.dev.** Dropped: the integration of personal/professional through health-transparency is interesting but probably not the path Rinkesh wants. Peyton Klein's "importantly" block achieves the humanizing goal more compatibly.
- **Kening Zhu.** Dropped: couldn't verify the specific lesson without confirmed URL; the general principle (micro-interactions as care) doesn't justify a slot without specifics.
- **Jacky Zhao — jzhao.xyz.** Dropped: an excellent digital-garden site, but the digital-garden model is explicitly anti-positioning per [`docs/about.md`](about.md#what-this-site-is-not). Keeping it here would just confuse future sessions.
- **Niki V — nikiv.dev.** Held: site appears to be SPA-rendered and didn't return content via fetch. Not dropped — revisit on next manual browse.

---

## Where to mine for more

These are not personal sites to learn from directly. They are catalogs of personal-site ideas. Browse when looking for a specific pattern (a kind of page, a curation idea, a list format).

- **Dead Simple Sites — deadsimplesites.com** — directory of minimal personal sites. Useful for IA inspiration when stuck.
- **32bit.cafe — 32bit.cafe/websiteideas/** — long, categorized list of "things to add to a personal site."
- **Things You Can Add — things.joodaloop.com/lists/** — category-based prompts (Words / Media / Quality / Personal / Useful) for what to put on a site.
- **JamesG — jamesg.blog/2024/02/19/personal-website-ideas** — same shape as the above, different curator.
