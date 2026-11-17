#!/usr/bin/env bash
# PreToolUse hook: when a tool call touches a marketing blog post
# (content/blog/*.md), remind the model that every post
# must go through the `blog-post` skill (house constitution) and the
# `claude-blog` skills/gates (/blog write, /blog analyze, quality_gate) and
# the dash grep. Non-blocking: it injects context, it never rejects the call.
set -euo pipefail

input="$(cat)"
if ! printf '%s' "$input" | grep -qE 'content/blog/[A-Za-z0-9._-]+\.md'; then
  exit 0
fi

read -r -d '' msg <<'MSG' || true
BLOG RULE (repo policy, CLAUDE.md + .claude/skills/blog-post): this call touches a marketing blog post. Every post is written AND checked through the claude-blog skill suite, under the house blog-post constitution. Required order: (1) Skill blog-post (frontmatter, cobalt design, SVG flow diagram, author slug from team.ts, no em dash, ~1,500 words, "At a glance"); (2) draft/rewrite via the claude-blog skills: Skill blog-write for a new post, blog-rewrite for edits, with blog-post rules winning on any conflict (our frontmatter fields, ~1,500 words not 2,000+, the SVG diagram as card/hero/share image, two Unsplash photos per skill section 4b, no Key Takeaways box); (3) gates before "done": the dash grep below must print nothing, and Skill blog-analyze / analyze_blog.py on the RENDERED page scores 90+.

  grep -rlE $'\u2014|\u2013| -- ' content/blog/*.md

KNOWLEDGE RULE: EUDR facts are grounded in the local corpus at ~/Documents/eudr/markdown_en/ (161 source docs converted to Markdown, one folder per doc) BEFORE any web search: ls it, grep -ril "<term>" ~/Documents/eudr/markdown_en/, read the matching .md. Every EUDR fact, date, figure and article number must trace to a passage read there. It grounds the claim; the published citation is still the document's PUBLIC url (EUR-Lex, the Commission), never a local path. No corpus passage and no public primary source: cut the claim. See blog-post skill section 10.

Do NOT use lint_prose.py as the dash gate: it only walks the claude-blog repo layout and never sees this content directory. If those skills were not invoked yet in this session, invoke them before continuing.
MSG

# The message goes over stdin rather than argv: it is multi-line now, and the
# original argv form was fragile about that.
printf '%s' "$msg" | python3 -c '
import json, sys
print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "additionalContext": sys.stdin.read(),
    }
}))
'

