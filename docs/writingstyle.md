# Writing style

> The voice you write in is the voice the visitor hears. This doc is the working rulebook for *how* things get written here — a constraint set, not a manual. Read by section when about to write.

> Voice anchor: [`docs/about.md`](about.md#voice--tone). When `about.md` and this doc disagree, `about.md` wins — or this doc updates first.

---

## How to use this doc

Two modes:

**Writing from blank page.** Find the relevant surface section below (UI copy, bio, work card, essay, etc.) and read those rules before drafting. The universal rules and AI anti-patterns apply on top.

**Iterating on a Rinkesh draft.** Treat the draft as the anchor. Don't rewrite from scratch. Make surgical proposals — *cut these words; this line drifts AI; here are 2–3 ways to say this sentence*. Full protocol in [§ Iteration protocol](#the-iteration-protocol--when-rinkesh-gives-a-draft).

---

## The voice in one paragraph

The writing on this site sounds like one person, talking plainly, about things they actually did. Concrete over abstract. Specific names and numbers. No buzzwords. Failures named, not euphemized. Italic for warmth; period for weight. If a sentence could come from a press release, an "I help X do Y" LinkedIn post, or an LLM that has never built anything — it doesn't belong.

---

## Universal rules

These apply to every word on the site, regardless of surface.

1. **Clear over clever.** If the line needs explaining, rewrite it.
2. **Plain words.** "Use" not "leverage." "Help" not "facilitate." "Big" not "robust." "Show" not "demonstrate." "Start" not "initiate." If a thesaurus would suggest the word, suspect it.
3. **No jargon, ever.** If a buzzword is unavoidable, name it as buzzword and disclaim it: *"Not an MVP in the buzzword sense."*
4. **Concrete, always.** "85 hospitals" not "many hospitals." "₹15L revenue" not "monetized." "Acquired by Zocdoc" not "successful exit."
5. **Skin in the claim.** Don't generalize from things you haven't done.
6. **Lead with the thing.** Open with the claim or the moment. No "I want to talk about…" or "In this post…"
7. **Cut every sentence twice.** Read each draft and ask *"what gets removed without loss?"* Cut. Then ask again.
8. **Story before principle.** A specific moment ("the third person I showed it to said *I just use Doppler*") earns the right to a general claim. Never the reverse.
9. **Periods over commas.** Short sentences land. Long sentences drift.
10. **Italic for warmth, not decoration.** Save it for lines that mean something personally (*"just say hi"*, *"let's talk"*). Don't sprinkle.
11. **First person, present tense.** "I shut down Career Leap." Not "Career Leap was shut down."
12. **Trust the reader.** Skip the obvious. They followed the link; they're paying attention.
13. **No em dashes (`—`). Ever.** Hard rule. Replace with a period (for a hard pause), a comma (for a parenthetical or soft pause), a colon (for an introduction or list), or a middle dot `·` (for a divider in a label). The em dash is a tell of AI prose; we don't ship it. This applies to the body text, headings, alt text, meta tags, titles, and any UI string. The only acceptable dashes on the site are hyphens in compound words (`high-pressure`) and the en dash inside numerical ranges if needed.

---

## AI voice — the anti-patterns

The visitor should never wonder if a person wrote this. These are the tells, with replacements.

### Hedging filler — cut on sight

Words that say nothing. Strike them every time:

- *actually*, *really*, *truly*, *essentially*, *fundamentally*, *basically*, *ultimately*, *literally*
- *"It's worth noting that…"*, *"It's important to recognize that…"*, *"Let me start by saying…"*

### Forbidden words

These flag AI authorship for trained eyes. Not allowed without an explicit reason:

*delve*, *tapestry*, *navigate (used on abstractions)*, *robust*, *leverage*, *seamless*, *innovative*, *transformative*, *holistic*, *unlock potential*, *exciting opportunities*, *cutting-edge*, *game-changer*, *journey (as a metaphor)*, *passionate (as a self-claim)*, *synergy*

### Transition crutches

Don't open paragraphs with these. Let the prose do the work:

*Furthermore*, *Moreover*, *Thus*, *On the other hand*, *In conclusion*, *In summary*

### Triplet syndrome

LLMs reach for three because three has rhythm. Don't.

- ❌ "Fast, scalable, and powerful."
- ❌ "Built, shipped, and refined."
- ✅ Pick one. Two if necessary. Three only when the third is doing real work.

### "Not just X but also Y"

A construction that pads thin claims:

- ❌ "It's not just a website, it's a credential."
- ✅ "The website IS the credential."

### Headers that summarize what's coming

- ❌ "In this section, we'll explore the principles behind…"
- ✅ Skip the meta. Write the principles.

### Concluding paragraphs that recap

If you covered it, you covered it. Stop when the last point lands. No *"In summary, we've discussed…"*

### Praise / acknowledgment openings

- ❌ "Great question." "That's a really insightful point."
- ✅ Just answer.

### Sentence-rhythm tells

Real prose has rhythm (short, long, short, very short) driven by what each sentence is doing. AI prose has metronome rhythm. Tells:

- All sentences the same length.
- **Em dashes anywhere.** See universal rule #13. Hard ban. Replace with period, comma, colon, or middle dot `·` per context.
- Every other sentence in passive voice.
- Lists when prose would do.
- Every paragraph the same shape.

If a paragraph reads like a checklist of equal-weight items separated by periods, rewrite.

---

## By writing surface

Different surfaces, different rules. Find the relevant section before writing.

### UI copy — headlines, section labels, buttons, captions

The unit is the phrase, not the sentence.

- **Lowercase by default** for nav, captions, footer credit. Match the site: *home*, *work*, *writing*, *powered by claude, tokens & coffee*.
- **Section labels:** small caps with letterspacing. ALL CAPS not allowed.
- **Headlines:** serif italic for warmth. *"Hi, I'm Rinkesh."* / *"Work. The full version."* / *"Writing. Things I think out loud."*
- **Buttons:** lowercase, action-led, 2–3 words. *"follow on x"* / *"say hi"*. Never *"Click here"* or *"Get in touch."*
- **CTAs:** invite, don't push. *"If something here resonated, just say hi."* Never *"Subscribe now"* or *"Book a call."*
- **Captions:** lowercase, 2–3 words, ampersand allowed. *"coffee & a view"*, *"lego batman"*.

✅ Works:
- "Open to building the next 0→1 and beyond."
- "If something here resonated, *just say hi*."
- "powered by claude, tokens & coffee ☕"

❌ Doesn't:
- "Get in touch to discuss opportunities."
- "Innovative product builder available for new challenges."
- "Subscribe to my newsletter for weekly insights."

References: [Patrick Collison](inspirations.md#patrick-collison--patrickcollisoncom), [Sam Altman](inspirations.md#sam-altman--blogsamaltmancom), [Derek Sivers](inspirations.md#derek-sivers--siversrs-writing-voice).

### Bio / intro paragraph

The hardest copy on the site. ~50–100 words doing four jobs: who, what (specific), what now, what next.

The pattern that works (current home + `llms.txt`):

> "Product builder and two-time founder based in Bengaluru, India. Built Savior (healthcare ops platform, acquired by Zocdoc) and Career Leap (EdTech, shut down 2023). Currently building KnowYourPay, Product Sense Lab, and Twittr Gems while looking for the next thing."

Rules:
- Specific projects with one-line outcomes. Not "experience in healthcare" — *"Savior, healthcare ops, acquired by Zocdoc."*
- Include the failures. *"Career Leap (shut down 2023)"* not *"Career Leap (former venture)."*
- End with action: *"looking for the next thing"*, *"open to…"*

Reference: [Peyton Klein](inspirations.md#peyton-klein--peytonkleincom) — currently / previously / broadly structure.

### Work cards (companies, projects)

Dense, factual, scannable. Numbers do the work.

Pattern: outcome line + 2–4 specifics + role.

Current example (`work.html`, Savior):

> "Healthcare operations and preventive-care software for hospitals. Built OPD management, patient follow-up systems, and admin dashboards. Onboarded 30+ hospitals. Acquired by Zocdoc."

Rules:
- A number in every card. *"30+ hospitals"* beats *"many hospitals."*
- Verbs that earn their place: *built*, *shipped*, *killed*, *acquired*, *scaled*, *shut down*.
- Adjectives only when load-bearing.
- Outcome is either the lede or the kicker — never the middle.

### Principles / how-i-work declarative

The high-density opinion lines. Shape: bold-claim + reason + concrete example.

Current example:

> "**Doing beats planning.** A working thing teaches you more than a perfect document. I'll always bias toward making something real, even if it's rough."

Rules:
- Open with the claim. The bold sentence IS the headline; the rest elaborates.
- One example per principle, not three.
- Cap at 5–6 principles per page. The form loses force after that.

References: [Morgan Housel](inspirations.md#morgan-housel--collabfundcomblog) (durable phrasing), [James Clear](inspirations.md#james-clear--jamesclearcom) (distillation), [Sam Altman](inspirations.md#sam-altman--blogsamaltmancom) (brevity).

### Essay prose

Long-form. ~500–2500 words. Different cadence from the rest of the site.

Rules:
- **Open with a moment, not a thesis.** First paragraph is a specific scene. The general claim earns its place by paragraph two or three.
- **Vary sentence length by intent.** Long sentences wind through a thought. Short sentences land it.
- **Show the wrong turns.** *"I thought X. Then I noticed Y. So now I think Z."* Revising in public is the voice.
- **No headers under 1500 words.** Headers below that length break flow without earning the break.
- **End hard.** Last sentence carries disproportionate weight. Don't waste it on a recap.
- **First person.** "I" — not "we" or "you" or implicit.
- **Story → principle.** Always. The specific earns the general.
- **One claim per essay.** If you have five ideas, write five essays.

References: [Paul Graham](inspirations.md#paul-graham--paulgrahamcom), [Lawrence Yeo](inspirations.md#lawrence-yeo--more-to-that--more-to-thatcom), [Nabeel Qureshi](inspirations.md#nabeel-qureshi--nabeelquco), [Kevin Simler](inspirations.md#kevin-simler--melting-asphalt--meltingasphaltcom), [Derek Sivers](inspirations.md#derek-sivers--siversrs-writing-voice).

### Email / contact CTAs

The site's signature pattern: invite, don't sell.

Shape: *conditional opening* + *italic action line* + *email address inline*.

Current examples:

> "If something here resonated, *just say hi*. rinkeshgorasia@gmail.com"
> "If this sounds like how you think too, *let's talk*. rinkeshgorasia@gmail.com"
> "Something here worth a conversation? *I'm easy to reach.* rinkeshgorasia@gmail.com"

Rules:
- The conditional opening filters for the right person before inviting them.
- The italic line IS the action.
- Email inline. No form, no Calendly, no chat widget.
- Never *"Reach out"* / *"Connect"* / *"Get in touch"* / *"Drop me a line."*

### Meta copy — page titles, OG descriptions, alt text

Read by skim-readers and AI crawlers. Slightly different optimization.

- **Page title:** name + role + qualifier. *"Rinkesh Gorasia — Product Builder."*
- **Meta description / OG description:** one full sentence, ~100–155 chars. Specific, not generic. The site's voice still applies — failures are fine in meta too.
- **Alt text:** describe the image's role, not its appearance. ✅ *"Photo of Rinkesh."* ❌ *"Smiling man with beard against neutral background."* Keep short.

### `/reading` entries (when the page is built)

Each book entry on the planned `/reading` page follows the "books that changed my mind" shape:

> **Book title** — Author. *I used to think X. Then I read Y. Now I think Z.* (Optional: one more specific line on a passage that hit hardest.)

Rules:
- Every entry has a real claim about a real change. No bare titles. No "great book on X."
- 2–4 sentences max per entry.
- Specific over impressionistic. *"It made me kill Career Leap a quarter earlier than I would have"* beats *"It changed how I think about decisions."*

The "if you're working on…" footer block uses a different shape:

> **If you're [problem]:** [Book] (one line on why).

Reference: [Derek Sivers](inspirations.md#derek-sivers--siversbook) — every entry must have voice.

---

## Storytelling principles

For anything with narrative shape — essays, post-mortems, the Graveyard, work cards.

1. **Lead with the scene.** *"It was a Tuesday in November when the third person I showed Hypersync to said 'I just use Doppler.'"* Beats *"Today I want to discuss product validation."*
2. **Show the friction.** A story without resistance has no shape. Name what went wrong before naming what worked.
3. **Be specific.** Names. Numbers. Dates. Places. Specifics build trust faster than any qualifier.
4. **Skin in it.** First person. Present-tense thinking even on past-tense action. *"I thought we were ready. We weren't."*
5. **Don't summarize the lesson.** Show the moment that taught it; let the reader name it themselves. The best lesson is one the reader thinks they discovered.
6. **One claim per piece.** A 1500-word essay defends one idea, not five.

---

## The iteration protocol — when Rinkesh gives a draft

When Rinkesh shares a draft, the workflow is:

1. **Don't rewrite from scratch.** The draft is the anchor. Improvements are surgical.
2. **First pass: cut.** Read for cuts only. Where can words come out without loss? Mark those, propose them.
3. **Second pass: voice match.** Where does this drift toward AI voice or generic register? Flag specific lines with the issue (hedging, jargon, triplet, throat-clearing) and propose a replacement.
4. **Third pass: options.** When a sentence could go several ways, offer 2–3 alternatives — never silently pick one. Format:
   > Original: ___
   > Option A: ___
   > Option B: ___
   > Option C (terser, riskier): ___

   Let Rinkesh pick.
5. **Don't smuggle changes.** Every edit is visible and explained.
6. **Preserve idiosyncrasies.** Specific tells — italic at the end of a CTA, *"X, not Y"* constructions, low-pressure email sign-offs, em dashes for pauses — stay. They are the voice; don't sand them.
7. **Cut, don't add.** When in doubt, default to cutting. Adding sentences is rarely the answer.

What this protocol is not: a rewrite assistant. A rewrite assistant flattens voice. The protocol's job is to *raise the floor* on a draft Rinkesh wrote, not replace it with one Claude wrote.

---

## Pinned examples — the voice in lines

A growing list of lines that are the voice. Calibration before writing.

From the current site:
- "Hi, I'm Rinkesh." — opener.
- "Open to building the next 0→1 and beyond." — availability without job-board register.
- "Sunk cost is the enemy of good judgment." — principle, plain.
- "Career Leap (EdTech, shut down 2023)." — failure named without euphemism.
- "Real users in 3 days beats a perfectly refined prototype in 3 weeks." — story-led principle.
- "If something here resonated, *just say hi*." — invite, not pitch.
- "Things I think out loud." — modesty as frame.
- "Not an MVP in the buzzword sense. The smallest thing that *actually does the job for one real person.*" — buzzword named and disclaimed.
- "powered by claude, tokens & coffee ☕" — credit with personality.
- "coffee & a view." / "lego batman." — caption pattern: lowercase, 2–3 words, no fluff.

Add to this list when something new lands well.

---

## Forbidden by precedent

Lines that would read fine on first pass but fail on second. Don't write these here.

- ❌ "Passionate about building products that delight users." — *passionate* is filler; *delight* is product-management cliché.
- ❌ "Available for new opportunities." — generic. The site says *"open to building the next 0→1."*
- ❌ "Innovative product leader with a proven track record." — adjective stack with no claim.
- ❌ "Reach out to discuss." — pushy and vague. Say what for.
- ❌ "It's worth mentioning that I founded two companies." — throat-clearing. *"Two-time founder."*
- ❌ "I'm excited to share my thoughts on…" — performative. Just share them.
- ❌ "In today's fast-paced world…" — anti-specific opening. Lead with a moment.

---

## Pinned anti-patterns (from past feedback)

These are patterns Rinkesh has explicitly flagged as AI voice across past sessions. Banned. Any prose draft must be checked against this list before commit. New entries get added here whenever Rinkesh flags one — and to [`scripts/audit-prose.sh`](../scripts/audit-prose.sh) at the same time, so the guardrail tightens over time.

### Mirror constructions
- **Pattern:** "X is Y, Z is W" with parallel rhythm.
- **Examples flagged:** *"bugs are loud, importance is quiet"* / *"the request is the symptom, the why is the product"* / *"In B2C, ... In B2B, ..."* (when both halves carry the same shape).
- **Why it sounds AI:** the parallel construction is doing rhythm, not information. AI prose loves this; people don't talk this way.
- **Fix:** rewrite without the mirror. Or pick one half — the other is usually padding.

### Triplet rhythm padding
- **Pattern:** "no X, no Y, just Z" or any forced three-list where the items aren't doing distinct work.
- **Example flagged:** *"no demo, no screenshots, just conversations and a slowly sharpening problem."*
- **Why:** AI reaches for three because three has rhythm.
- **Fix:** if the items aren't distinct, cut to one or two. Or split into separate sentences.

### Aphoristic punchlines and blockquotes
- **Pattern:** a short, polished closing line meant to "land." Often a `<blockquote>`.
- **Examples flagged:** *"that's a signal, not a virtue"* / *"the roadmap is the diagnosis"* / *"trendy is rarely meaningful."*
- **Why:** sounds like an essayist trying to be quotable, not a person talking.
- **Fix:** drop. The substance already made the point. If you can't drop without losing meaning, the substance was thin.

### Italic essay flourishes
- **Pattern:** italic phrases used for emphasis on abstract claims (`<em>X</em> is rarely <em>Y</em>`).
- **Example flagged:** *"<em>Trendy</em> is rarely <em>meaningful</em>."*
- **Why:** italic on abstract concepts reads as decorative essay-writing.
- **Fix:** save italic for *warmth* (*"just say hi"*, *"let's talk"*) and quoted phrases. Not for emphasis on ideas.

### Essayist connectives
- **Pattern:** *"Worse:"*, *"There's a second X worth naming"*, *"Note also:"*, *"Notably,"*.
- **Examples flagged:** *"Worse: if your product has unfixed problems..."* / *"There's a second asymmetry worth naming."*
- **Why:** essayist trying to add gravitas to the next sentence.
- **Fix:** use a casual link. *"And here's the worse version."* / *"One more thing on that."*

### Mirror cluster intros
- **Pattern:** *"Two X, two Y."* / *"X. Y. The job isn't Z. It's W."*
- **Examples flagged:** *"Two stages, two different jobs."* / *"Customers say a lot. Most of it is the symptom, not the disease. The job isn't to gather requests. It's to figure out what the requests are about."*
- **Why:** mirror rhythm without information work.
- **Fix:** rewrite as a single conversational sentence.

### Hedging filler ("actually", "really", "essentially")
- **Pattern:** these words used as emphasis on already-clear sentences.
- **Why:** AI prose loves them; people use them sparingly.
- **Fix:** cut by default. Keep only where the word is doing real contrast work (*"what tech actually does"* — emphasis on contrast — keep; *"actually run through"* — filler — cut).

### Em dashes (already banned)
See universal rule #13. The audit script catches em dashes in prose; CSS section dividers are excluded.

---

## Audit before commit (mandatory)

Before committing any prose change, run:

```bash
./scripts/audit-prose.sh
```

(or pass specific files as arguments). The script flags every known AI pattern with line numbers.

**Address each flag.** If a flag is a genuine false positive, exercise judgment and note why in the commit message — so future sessions don't get confused.

If a NEW pattern shows up that the script doesn't catch, add it to BOTH:
- This section above (with example, why, fix)
- The regex list in `scripts/audit-prose.sh`

The guardrail tightens with every flagged pattern.

---

## When this doc disagrees with itself

A real edit will surface a tension between rules. When it does:

1. **Concrete > brevity.** Don't cut a number to save a word.
2. **Voice match > rule compliance.** If a sentence breaks a rule but sounds *right*, it's right. Note it as a precedent and update this doc.
3. **The anchor doc wins.** If [`about.md`](about.md) and this doc disagree, `about.md` is canonical and this doc updates first.
