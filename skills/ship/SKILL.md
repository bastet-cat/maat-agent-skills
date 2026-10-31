---
name: ship
description: Prepare completed Maat implementation work for delivery by reconciling validation evidence, then committing, pushing, or opening a pull request when the user explicitly requests those actions.
---

# Ship completed Maat work

Use this skill after implementation is complete and the user asks to commit, push, open a pull request, or ship the change. It prepares the Git delivery from verified Maat scope and validation evidence. It does not implement unfinished product work; use the approved implementation workflow first.

## Maat gates

Before any Maat write, confirm the Maat MCP connection with a short read such as `skill_list` or `brain_get`. If the client reports an invalid session, follow its documented recovery once; do not invent or mix transport/session mechanisms. Then state, in three short lines, the objective, artifacts to be touched, and non-goals.

Discover live tool names and schemas from the active Maat connection. Do not assume client-specific tool aliases. Read the approved feature or bug, linked checks, review/decision state, and validation records from their authoritative Maat stores. Confirm that:

- The human review and decision are recorded through supported review operations.
- The required checks belong to the same proposal and project.
- Validation records reflect commands actually run and identify the implementation revision.
- No required validation remains failed, unrun, or inconclusive.

Operational drafts are in-flight notes, not approvals or product documents. If a required relation or state cannot be verified, stop before delivery mutations and report the exact missing evidence. Do not claim Maat records are closed from chat summaries alone. Preserve the distinction between document content SHA, Git commit SHA, and provenance SHA.

For contributions that change skills, documentation, or workflow tooling and have no applicable Maat feature/bug record, use the user's explicit request and the repository's documented validation steps as the scope and evidence. Do not invent product records or approvals for this work. If an applicable Maat proposal or check does exist, follow its gates as above.

If the implementation workflow has not recorded validation, use its supported validation path before delivery. For Maat writes, use the current document SHA with `expected_sha`; on conflict, reread and reassess. Never set `reviewed` or `accepted` through a generic document update. Warn before editing an already reviewed document because that can reopen approval.

## Confirm delivery scope

Inspect the repository, current branch, working tree, staged and unstaged diffs, recent commit style, remotes, and the intended base branch. Reconcile the changed paths and commit with the approved Maat proposal and checks. Treat the current checkout as the target only after repository identity, branch, and revision match the Maat references or the user explicitly confirms them.

Before staging, summarize in at most five bullets what will enter the commit and what will stay out. Stage selected paths only; never blindly stage the whole tree. Exclude secrets, generated artifacts, and unrelated changes. If work is mixed with unrelated changes or an existing staged diff cannot be safely separated, stop and report the choice needed.

Use a descriptive branch such as `feat/short-description`, `fix/short-description`, or `docs/short-description`. Never commit directly to `main`, `master`, or `develop`; if currently on one, create or switch to a suitable feature branch before committing. Do not rewrite shared history, force-push, use `--no-verify`, or add `Co-Authored-By` trailers. Respect repository hooks and instructions.

Use conventional commit subjects (`type(scope): description`) and professional, concise prose. Split commits only when the staged changes represent genuinely independent work. Include a `BREAKING CHANGE` footer when applicable.

## Explicit delivery authorization

Treat each external Git action separately:

- Commit only when the user explicitly asks to commit or ship the changes. A Maat approval to implement does not authorize a commit.
- Push only when the user explicitly asks to push or the request explicitly includes shipping/pushing. A generic “continue” or “siga adiante” does not authorize push.
- Open a pull request only when the user explicitly asks for a PR or the request explicitly includes opening one.

When a requested action is explicit, complete that action without an extra confirmation prompt. Do not bundle an unrequested push or PR into a commit request. Before each authorized Git mutation, verify the exact target branch and paths. If push is rejected for divergence, stop and ask how to proceed; never force-push by default.

## Push and pull request

Before pushing, confirm the remote and branch mapping. Set upstream only when needed. If credentials, remote access, or GitHub authentication are unavailable, leave the verified local result intact and report the specific blocker; never ask the user to paste credentials.

For an authorized PR, identify the base branch from repository configuration or ask if ambiguous. Check for an existing PR before creating one. If one exists, report its URL and ask before updating it. Use a conventional title and a concise body grounded in the diff and Maat records. Include summary, notable changes, validation run and results, and relevant Maat proposal/check references. Add diagrams or screenshots only when they materially clarify behavior or UI changes; do not add empty template sections.

If GitHub CLI or another authorized PR interface is unavailable, report that limitation and provide the prepared title and body for the user. Do not claim a PR was opened unless the tool confirms it.

## Report

Return the branch and base, commit hash(es), push status, PR URL when created, and the Maat feature/check/validation references with their actual states. Distinguish completed operations from prepared next steps. Include any files left unstaged and any validation gaps that block delivery. Never describe a change as ready for review when required evidence is missing.
# Recheck authorization for delivery

Before any requested delivery action, reread the supported review and linked artifacts and confirm that the explicit recorded decision applies to the exact current IDs and SHAs/versions. Approval for older content does not authorize delivery of changed content. Do not repeat a prompt for an already approved exact revision. If the UI appears approved but Maat reads pending, repeat reads, compare identifiers/versions, report the sync discrepancy, and stop the dependent delivery action. Never infer or synthesize a Maat decision.
