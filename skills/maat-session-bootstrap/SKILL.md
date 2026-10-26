---
name: maat-session-bootstrap
description: Shared Maat MCP 2026 bootstrap and agent↔human friction contract. Use at session start, when loading any Maat-published skill package, or when brain/operational/review tool calls fail due to session, truncation, SHA, or lifecycle mistakes.
---

# Maat session bootstrap

Canonical shared contract for Maat MCP after protocol `2026-07-28` (stateless `/mcp/2026`) and for low-friction agent↔human iteration.

## When to use

- Before the first Maat write in a session.
- When `help` or another skill points here.
- When loading a published skill package via `skill_list` / `resources/*`.
- When recovering from Invalid session ID, truncated tool output, `expected_sha` conflict, or confusion between operational drafts and project documents.

## Required reading (this package)

1. Follow discovery in `references/maat-mcp-bootstrap.md` to load **this** skill’s published release when the registry is available; otherwise use the files in this working package after verifying they are the intended checkout.
2. Apply `references/maat-session-friction.md` for the entire session.

Other flow skills (`session-guide`, `to-scope`, `to-tech-plan`, `to-plan`, `validate-plan`, `to-implement`) must cite these references and must not invent conflicting MCP or lifecycle rules.

## Product behavior this skill does not own

This skill does not create scope documents, features, plans, or implementations. It only standardizes transport, package discovery, tool lifecycle, and interaction shape so those skills stay aligned.
