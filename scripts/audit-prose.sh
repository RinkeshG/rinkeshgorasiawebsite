#!/usr/bin/env bash
# audit-prose.sh — flags known AI-voice patterns in prose files.
#
# Run before committing any prose change. Add new patterns whenever
# Rinkesh flags one in feedback (also add to docs/writingstyle.md).
#
# Usage:
#   ./scripts/audit-prose.sh                        # audits live prose surfaces
#   ./scripts/audit-prose.sh path/to/file.html      # audits specific files

set -uo pipefail

# Default targets — the live prose surfaces on the site
DEFAULT_FILES=(
    "writing.html"
    "field-notes.html"
    "feature-usage.html"
)

if [[ $# -eq 0 ]]; then
    FILES=("${DEFAULT_FILES[@]}")
else
    FILES=("$@")
fi

issues=0

flag() {
    local file="$1"
    local label="$2"
    local pattern="$3"
    local hint="$4"

    local matches
    matches=$(grep -nE "$pattern" "$file" 2>/dev/null) || true
    if [[ -n "$matches" ]]; then
        printf '\n  ⚠ %s\n    Hint: %s\n' "$label" "$hint"
        printf '%s\n' "$matches" | sed 's/^/    /'
        issues=$((issues + 1))
    fi
}

for file in "${FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo "skip: $file (not found)"
        continue
    fi

    echo ""
    echo "── $file ──"
    before=$issues

    # ── Em dash in prose (CSS section dividers excluded) ──
    # Match em dash inside HTML element text content (between > and <)
    # This skips em dashes in CSS comments, attributes, JS strings.
    flag "$file" \
        "Em dash in prose" \
        '>[^<]*—[^<]*<' \
        "Banned by rule #13. Replace with period, comma, colon, or middle dot ·"

    # ── Forbidden words (AI vocabulary) ──
    flag "$file" \
        "Forbidden word" \
        '\b(delve|tapestry|leverage|seamless|innovative|transformative|holistic|cutting-edge|game[- ]changer|robust|synergy|navigate the|unlock potential|exciting opportunit|paradigm)\b' \
        "Plain word required"

    # ── Hedging filler (review case-by-case) ──
    flag "$file" \
        "Hedging filler" \
        '\b(actually|really|truly|essentially|fundamentally|basically|literally|ultimately) ' \
        "Cut unless the word is doing real work"

    # ── Transition crutches ──
    flag "$file" \
        "Transition crutch" \
        '\b(Furthermore|Moreover|Thus|On the other hand|In conclusion|In summary)\b' \
        "Let prose carry the transition; cut these openers"

    # ── Throat-clearing openers ──
    flag "$file" \
        "Throat-clearing" \
        "It's worth noting|It's important to (recognize|note)|Let me start by|I want to talk about" \
        "Cut on sight"

    # ── Aphoristic punchline blockquote ──
    flag "$file" \
        "Aphoristic blockquote" \
        '<blockquote>[^<]{0,200}, not (a|an|the) ' \
        "Likely an aphorism punchline. Drop or rewrite as plain sentence"

    # ── 'Worse:' essay connective ──
    flag "$file" \
        "'Worse:' connective" \
        '\bWorse:[[:space:]]' \
        "Replace with conversational link (e.g. 'And here's the worse version')"

    # ── 'There's a second X worth' essay flourish ──
    flag "$file" \
        "'worth naming' essay flourish" \
        "(asymmetry|tension|reason|trap|thing) worth (naming|noting)" \
        "Drop the 'worth naming' framing; just say it"

    # ── Mirror constructions: short clauses with 'is X, ... is Y' rhythm ──
    flag "$file" \
        "Possible mirror construction" \
        '\b[a-z]+ (is|are) [a-z]+, [a-z]+ (is|are) [a-z]+\b' \
        "If parallel rhythm with no information work — rewrite without the mirror"

    # ── 'Two X, two Y' triplet/parallel cluster intro ──
    flag "$file" \
        "Mirror cluster intro" \
        '\bTwo [a-z]+, two [a-z]+\b' \
        "Rewrite as a single conversational sentence"

    # ── Italic essay flourish ('X is rarely Y') ──
    flag "$file" \
        "Italic essay flourish" \
        '<em>[A-Za-z]+</em> is (rarely|never|often) <em>' \
        "Drop the italic-emphasis-on-abstract-claim pattern"

    # ── 'just X, no Y, no Z' triplet rhythm ──
    flag "$file" \
        "Possible triplet rhythm padding" \
        '\bno [a-z]+, no [a-z]+, (just|and) ' \
        "If items aren't doing distinct work — break up or cut"

    if [[ $issues -eq $before ]]; then
        echo "  ✓ no patterns flagged"
    fi
done

echo ""
if [[ $issues -gt 0 ]]; then
    echo "── $issues flag(s) total ──"
    echo "Address each before committing prose. Some may be false positives — exercise judgment."
    echo "If a flag is acceptable, note why in your commit message."
    exit 1
fi
echo "── Clean. No flags. ──"
