# Maat session friction contract

Copy these interaction rules into every Maat flow skill session so agents reduce human round-trips and state surprises.

## Opening (mandatory, ~30s)

Before any Maat write: handshake from `maat-mcp-bootstrap.md`, recover Invalid session ID once if needed, then announce objective / artifacts / non-goals in three lines.

## Options `a` / `b` / `c` with defaults

When the path forks, offer **at most three** options with an explicit default.

- Short human replies (`b`, `sim`, `siga adiante`) execute the mapped option — do not re-print the menu.
- `siga adiante` means the next step already stated in the agent’s last message.
- Commit / push / force / amend only on **explicit** ask (`sim` to “quer que eu commit?” counts). Generic `siga adiante` does **not** imply push.

## Source-of-truth table (update each milestone)

| Artifact | Store | Status | Content SHA | Git provenance |
| --- | --- | --- | --- | --- |
| feature / plan / checks / validation / scope | Maat doc or operational draft | … | doc sha | commit |

Rules:

- Local `.specs/` and Maat docs may diverge — declare which governs the current decision.
- Check “Verified” ≠ stale plan prose. Reconcile the plan before declaring close.
- Provenance (`metadata.sha` / tool `sha`) ≠ Maat document content SHA ≠ git HEAD. Name which one you are aligning.

## Reads without pain

- Use logical paths with `.md` for project documents.
- On truncate: recover via bootstrap truncation rules; do not treat truncate as immediate fatal failure.
- Never stub-write a real document to “test” a tool.

## Writes — real lifecycle

- Always `expected_sha` on `brain_update`. Conflict → re-read, do not force.
- Do not set `reviewed` / `accepted` via generic `brain_update`.
- Warn before editing `reviewed` docs (may become `final` and reopen approval).
- Validation close = documentary validation with allowed done status after convert when that path applies.
- `operational_draft_convert` leaving a draft in `in_flight` is expected; explain in one line if the human asks.

## Commits and scope

- Before `git add`, list in ≤5 bullets what enters and what stays out.
- After commit (only when explicitly requested): return full hash + what remains unstaged.
- Never assume push.

## Verification vs narrative

- Do not mark a check passed without running the command.
- If a documented gate is too narrow, widen the command or narrow the proof — do not fake pass.
- Independent verification when `to-implement` requires it: return `READY` / `READY_WITH_GAPS` / `NOT_READY` with only real blockers.

## Maat UI and resume

- After every material state change, update plan, feature/bug, checks, and validations so status, tags, related links, assessed revision, evidence, pending items, and risks match reality.
- Read back with `brain_get` before claiming the UI or a later session can recover the work.
- Keep scope ↔ feature/bug ↔ plan ↔ checks ↔ validations relations current at the end of every validation cycle.

## Busy-human communication

- Lead with a 1–2 sentence verdict.
- Prefer short tables over prose.
- Do not restate the task; do not list undone work unless it blocks.
- After each milestone: execute remaining authorized work in the closed loop; do not end with a next-step backlog while remediation or re-validation is still executable. Report only a finished cycle or a true external/human blocker (for example `manual-validation`) with concrete resume instructions.
