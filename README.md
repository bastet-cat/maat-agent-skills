# Product workflow agent skills

Portable Agent Skills for moving product changes from discovery through
planning, implementation, and verification. Their workflow is motivated by
Tech Leads Club (TLC) and Matt Pocock's engineering skills: interview before
settling a solution, ground plans in source evidence, keep work observable, and
verify outcomes against explicit obligations. Each skill lives in its own
directory under `skills/` and can be installed with the `skills` CLI.

## Motivations

- [TLC Discover](https://agent-skills.techleads.club/skills/tlc-discover/) and
  [TLC Plan](https://agent-skills.techleads.club/skills/tlc-plan/) motivate
  progressive discovery, explicit unresolved decisions, and plans grounded in
  repository evidence.
- [Matt Pocock's Grill with Docs](https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md),
  [to-spec](https://github.com/mattpocock/skills/blob/main/docs/engineering/to-spec.md),
  and [to-tickets](https://github.com/mattpocock/skills/blob/main/docs/engineering/to-tickets.md)
  motivate shared terminology, durable decisions, and demonstrable work
  slices.

These are design influences, not dependencies. The catalog adapts their ideas
to its own review, evidence, and validation workflows.

## Install

Install the bootstrap skill for Codex:

```bash
npx skills@latest add bastet-cat/maat-agent-skills \
  --skill session-guide -a codex
```

Install it for Claude Code:

```bash
npx skills@latest add bastet-cat/maat-agent-skills \
  --skill session-guide -a claude-code
```

List the skills published by this repository:

```bash
npx skills@latest add bastet-cat/maat-agent-skills --list
```

See [INITIALIZATION_PROMPT.md](INITIALIZATION_PROMPT.md) for the reusable
prompt to continue building the catalog.

The `skills` CLI is the installer; this repository does not need a separate
install script. Codex uses the shared `.agents/skills/` location. Claude Code
uses `.claude/skills/`.

`.agents/skills/` points to the same packages under `skills/` for clients that
use cross-tool project skill discovery. Hermes supports this project-local
path and may require repository trust before loading skills ([Hermes skill
guide](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)).
Maat SessionStart availability remains separate and requires a published,
usable Maat registry release.

## Available skills

| Skill | Purpose |
| --- | --- |
| [`session-guide`](skills/session-guide/SKILL.md) | Guide Maat session checks, repository context, and skill assets. |
| [`to-tech-plan`](skills/to-tech-plan/SKILL.md) | Analyze a scope document against indexed Maat projects, prepare technical refinement for review, and revise it after approval. |
| [`to-scope`](skills/to-scope/SKILL.md) | Turn a source document or conversation into a scope document (`type=scope`) and publish it through supported Maat document workflows. |
| [`to-plan`](skills/to-plan/SKILL.md) | Decompose a scope document or conversation into feature/bug proposals with linked validation checks for human review. |
| [`validate-plan`](skills/validate-plan/SKILL.md) | Assess whether a Maat proposal and its linked checks are complete, traceable, and ready for review or implementation. |
| [`to-implement`](skills/to-implement/SKILL.md) | Implement an approved Maat feature or bug using linked checks and record validation evidence. |
| [`ship`](skills/ship/SKILL.md) | Prepare completed Maat implementation work for commit, push, or pull request with verified validation evidence. |
| [`diff-review`](skills/diff-review/SKILL.md) | Review PR and Git diffs for high-confidence bugs. |
| [`owasp-top-10`](skills/owasp-top-10/SKILL.md) | Review OWASP skill security controls that remain unverified by Maat's static scanner. |

## Maat integration

Some skills can use Maat's document and MCP workflows when configured.
Installing a skill from GitHub makes its files available to the selected
agent; it does not publish the skill to Maat's MCP registry. Skills selected
for Maat SessionStart must also be published there as usable releases.

## License

This repository is licensed under the [MIT License](LICENSE). Copyright
attribution: Euclides Okamoto, 2026.
