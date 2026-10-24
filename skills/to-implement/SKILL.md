---
name: to-implement
description: Implement an approved Maat feature or bug proposal using its linked checks, then record validation evidence through supported Maat workflows.
---

# Implement an approved Maat proposal

Use this skill to implement an approved feature or bug/fix in the current repository. Do not start from an unreviewed proposal or make product decisions that have not been approved.

## Confirm the work is ready

Check whether the active client exposes a Maat SessionStart receipt and tools. If unavailable, do not infer approval, review state, check existence, or validation links; stop before code changes because implementation requires verified Maat approval and checks. If a receipt is exposed, confirm all configured skills loaded and discover exact tool names and schemas. Resolve the requested feature/bug and inspect its review and decision state. Confirm that the human review is complete, the applicable decision is recorded, required checks exist, and the proposal identifies the target repository and revision/context. If a required gate or check is missing, stop and report it; do not infer approval from a draft or from a skill review.

Confirm the repository identity, branch, and current revision from Maat references and the approved proposal. If Maat has no unambiguous repository reference, ask the user for the repository URL and intended branch/access; do not infer it from the current directory or feature title. Once provided, clone into an isolated workspace, map the codebase, and verify the checked-out commit before implementation. Label direct checkout evidence distinctly from Maat-index evidence and report unavailable operational context as unknown. Read repository instructions such as `AGENTS.md`. If the approved project cannot be accessed or mapped, stop. Never request credentials in chat.

Carry forward the mapped project context (canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, unresolved gaps). Reuse only when repository identity and commit match; refresh the map if they change. Keep the changed implementation revision distinct from the baseline map and link both in validation evidence. Persist context only through confirmed Maat fields/relations.

Before changing code, build a compact checklist from the approved proposal: each acceptance criterion, the linked check that proves it, the relevant behavior seam, and the evidence expected on success. Compare the checks with the current behavior at the starting revision. A feature check should fail because the requested behavior is absent; a bug check should reproduce the reported defect. If a check already passes or does not distinguish the approved outcome, flag the mismatch before implementation instead of claiming later that the work proved it. Prefer existing, high-level behavior seams; clarify a seam with the user only when the choice materially changes what will be verified.

Before editing code, explain in plain language the approved objective, project/repository and branch/revision, current behavior, planned change, linked checks, out-of-scope items, and any uncertainty. Carry forward confirmation already given for this same approved proposal, project, and scope; do not repeat it. Ask only if new evidence or corrections materially change the intended implementation or reveal consequential ambiguity. If corrected, reconcile the correction with the approved Maat proposal and obtain the required product decision/review before proceeding; do not silently change approved scope.

## Implement and validate

Use the approved proposal as the scope boundary. Map each linked check to the change and required validation. For behavior changes, follow repository governance, including required specs and tests. Make the smallest complete change that satisfies the approved criteria. Do not expand scope to resolve unrelated issues; record newly discovered needs separately as proposals.

Implement in demonstrable behavior slices, not by technical layer alone. For each slice, keep its tests and acceptance evidence with it. Use test-driven development at the agreed seams where the repository supports it: demonstrate the missing behavior or regression first, make the smallest change that passes, then refactor while keeping the checks green. Run focused checks as the change develops and the broader repository-required suite at the end.

For work with multiple genuinely independent slices, use the proposal's dependency graph to determine what can proceed in parallel. Parallelize only when the active client supports isolated worktrees and agent execution, dependencies and shared-file conflicts are understood, and the user/session permits delegation. Otherwise implement the slices in dependency order in one workspace. Do not split a small cohesive change into tickets or agents merely to create parallelism.

Run the checks required by the proposal and repository instructions. For each check, record the actual result and evidence; do not mark an unrun or inconclusive check as passed. If a check fails, diagnose and correct within approved scope when possible, then rerun it. If it cannot pass or the fix requires a product/architecture decision, stop that part and record the blocker through a confirmed Maat operation.

After the implementation, ask for an independent verification pass using a fresh context or an available independent reviewer. Give the verifier the approved proposal, linked checks, changed revision, and access to the relevant evidence; have it determine whether each check actually proves its criterion, including regressions and failure cases. The verifier must report unsupported, missing, or contradictory evidence rather than accepting the implementer's summary. Address findings within approved scope, then re-run affected checks. If an independent verifier is unavailable, report that explicitly instead of presenting self-review as independent verification.

## Close the Maat record

After implementation and verification, update the feature/bug and record each check result through the exact supported Maat validation workflow. The catalog describes `validation` as implemented but `check` as a proposed artifact; confirm the live workflow supports the required check and validation associations. For each result, preserve the check ID/revision, proposal ID/revision, implementation commit, validation ID/revision, outcome (`pass`, `fail`, `not run`, or `inconclusive`), and evidence reference. Verify that the validation is actually linked to the same check and proposal through confirmed fields/relations; a written result with no verifiable association does not close the check. Never invent document operations or claim a result was recorded if it was not. If a required write operation is unavailable, report the change and local evidence, plus the precise Maat recording gap.

Keep implementation evidence linked to the approved proposal and its checks: changed paths, relevant revision/commit, commands or procedures run, pass/fail status, and any blocker. Do not record a new product decision or create an ADR unless a human-approved durable architectural decision requires it.
