---
name: to-implement
description: Implement an approved Maat feature or bug using linked checks, or run dependency-aware parallel implementation across every approved proposal linked to a scope, then validate-plan and stabilize only after all validations pass.
---

# Implement an approved Maat proposal

Use this skill to implement an approved feature or bug/fix in the current repository. Do not start from an unreviewed proposal or make product decisions that have not been approved.

## Agent mode

Run this workflow in the current agent mode. Do not require, check for, or switch to a particular mode.

Choose the input mode from the invocation:

- **Proposal mode:** the argument identifies one feature or bug. Implement that single approved proposal.
- **Scope mode:** the argument identifies a scope document. Resolve every feature/bug linked to that scope, implement them in dependency waves (in parallel where viable), run `validate-plan` on the scope set, and stabilize parallel workstreams only when every validation has been checked and passed.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Handshake before any Maat write. Offer ≤3 options with a default when the path forks; never assume commit or push. Load companion skills (`validate-plan`, and any delegated implementers) only via bootstrap discovery (`published` + `active_release_id` + manifest + revalidation).

## Confirm the work is ready

Confirm Maat MCP is alive. If Maat tools are unavailable, do not infer approval, review state, check existence, or validation links; stop before code changes because implementation requires verified Maat approval and checks. A SessionStart receipt is optional context; discover exact tool names and schemas from the live connection.

### Proposal mode readiness

Resolve the requested feature/bug with `brain_get` (logical path with `.md` when applicable) and inspect its review and decision state through supported reads. Confirm that the human review is complete, the applicable decision is recorded (review/finalize tools — not a `reviewed` status invented via `brain_update`), required check documents exist and relate to the proposal, and the proposal identifies the target repository and revision/context. If a required gate or check is missing, stop and report it; do not infer approval from an operational draft or from a skill review.

### Scope mode readiness

Resolve the scope with `brain_get`. Read its **Planning** section (proposal index, dependency graph, viable parallelization map, stabilization rule). Collect every linked feature/bug through `related`, Planning index paths, documentary search, and plan `feature_id` links. For each proposal, verify the same gates as proposal mode: human review/decision, linked checks, repository/revision, and a parseable **Dependencies** field (`depends_on`, `dependency_reason`, `parallel_wave`). Rebuild the wave graph from those fields and compare it to the scope Planning map; if they disagree, stop and report the mismatch before code changes. If Planning is missing, derive waves from `depends_on` only, state that the scope map was absent, and continue only when the graph is acyclic and complete.

### Keep operational and documentary records distinct

Maat may expose both structured operational drafts (`operational_*`) and documentary records (features, bugs, plans, checks, reviews, validations via `brain_*`). Determine which store contains each item by inspecting the live tool schema and returned record; do not infer the store from a title, filename, matching ID text, or search result label.

- An operational draft records in-flight memory. It is not a human review, approval, or decision. A linked draft does not establish that a documentary review happened.
- A documentary scope document or review does not prove that feature/bug/check documents exist or are linked. Verify each required item and relation in its own store using confirmed reads.
- Proceed only when the proposal's human gate and its required checks are independently verified, with explicit relations to the same proposal and target project. If one store or relation cannot be read, report that exact gap and stop before code changes; do not treat records in the other store as a substitute.
- After implementation, record validation only through the workflow whose schema explicitly accepts the check and proposal relations (typically a validation document via `brain_create` or `operational_record` draft of kind `validation` → `operational_draft_convert`). A narrative note is not a validation receipt unless the live contract returns or confirms that relation. Conversion not deleting the operational draft is expected.

Confirm the repository identity, branch, and current revision from Maat references and the approved proposal. If Maat has no unambiguous repository reference, ask the user for the repository URL and intended branch/access; do not infer it from the current directory or feature title. Once provided, clone into an isolated workspace, map the codebase, and verify the checked-out commit before implementation. Label direct checkout evidence distinctly from Maat-index evidence and report unavailable operational context as unknown. Read repository instructions such as `AGENTS.md`. If the approved project cannot be accessed or mapped, stop. Never request credentials in chat.

Carry forward the mapped project context (canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, unresolved gaps). Reuse only when repository identity and commit match; refresh the map if they change. Keep the changed implementation revision distinct from the baseline map and link both in validation evidence. Persist context only through confirmed Maat fields/relations.

Before changing code, build a compact checklist from the approved proposal: each acceptance criterion, the linked check that proves it, the relevant behavior seam, and the evidence expected on success. Compare the checks with the current behavior at the starting revision. A feature check should fail because the requested behavior is absent; a bug check should reproduce the reported defect. If a check already passes or does not distinguish the approved outcome, flag the mismatch before implementation instead of claiming later that the work proved it. Prefer existing, high-level behavior seams; clarify a seam with the user only when the choice materially changes what will be verified (≤3 options with default).

Before editing code, explain in plain language the approved objective, project/repository and branch/revision, current behavior, planned change, linked checks, out-of-scope items, and any uncertainty. In scope mode, also show the wave map and which proposals will run in parallel. Carry forward confirmation already given for this same approved proposal or scope set, project, and revision; do not repeat it. Ask only if new evidence or corrections materially change the intended implementation or reveal consequential ambiguity. If corrected, reconcile the correction with the approved Maat proposal and obtain the required product decision/review before proceeding; do not silently change approved scope.

## Implement and validate (proposal mode)

Use the approved proposal as the scope boundary. Map each linked check to the change and required validation. For behavior changes, follow repository governance, including required specs and tests. Make the smallest complete change that satisfies the approved criteria. Do not expand scope to resolve unrelated issues; record newly discovered needs separately as proposals.

Implement in demonstrable behavior slices, not by technical layer alone. For each slice, keep its tests and acceptance evidence with it. Use test-driven development at the agreed seams where the repository supports it: demonstrate the missing behavior or regression first, make the smallest change that passes, then refactor while keeping the checks green. Run focused checks as the change develops and the broader repository-required suite at the end.

For work with multiple genuinely independent slices inside one proposal, use that proposal's internal dependency notes to determine what can proceed in parallel. Parallelize only when the active client supports isolated worktrees and agent execution, dependencies and shared-file conflicts are understood, and the user/session permits delegation. Otherwise implement the slices in dependency order in one workspace. Do not split a small cohesive change into tickets or agents merely to create parallelism.

Run the checks required by the proposal and repository instructions. For each check, record the actual result and evidence; do not mark an unrun or inconclusive check as passed. If a check fails, diagnose and correct within approved scope when possible, then rerun it. If it cannot pass or the fix requires a product/architecture decision, stop that part and record the blocker through a confirmed Maat operation.

After the implementation, ask for an independent verification pass using a fresh context or an available independent reviewer. Give the verifier the approved proposal, linked checks, changed revision, and access to the relevant evidence; have it determine whether each check actually proves its criterion, including regressions and failure cases. The verifier must report unsupported, missing, or contradictory evidence rather than accepting the implementer's summary. Address findings within approved scope, then re-run affected checks. If an independent verifier is unavailable, report that explicitly instead of presenting self-review as independent verification. Prefer machine-readable overall labels: `READY`, `READY_WITH_GAPS`, or `NOT_READY`, with only real blockers.

Then close the Maat record for that proposal (see **Close the Maat record**).

## Scope mode: parallel waves, validate-plan, stabilize

Completion criterion for scope mode: every linked approved proposal is implemented, every linked check has a recorded outcome, `validate-plan` reports the set ready enough to proceed, and parallel workstreams are stabilized only after all validations for the set are checked and successful.

### 1. Schedule waves

Order waves by `parallel_wave` / `depends_on`. A wave may start only when every prerequisite proposal in earlier waves has finished its own implement → check-run → validation-record path with outcome `pass` for required checks. Do not start a dependent proposal on provisional parallel output.

### 2. Run each wave

Inside a wave, run the full proposal-mode implement-and-validate path for every proposal that belongs to that wave.

- Prefer true parallelism when the client supports isolated worktrees or delegated agents, shared-surface collision notes from Planning allow it, and the session permits delegation. Give each worker the exact proposal path, checks, repository/revision, and its Dependencies field.
- Otherwise run wave members sequentially in one workspace without claiming parallelism.
- Keep each parallel workstream provisional: do not merge worktrees, rewrite the integration branch, or declare the wave closed while any member is still running or has failing/incomplete validations.

If any proposal in the wave is `NOT_READY` or has a failed/inconclusive required check, stop advancement of later waves. Fix within approved scope when possible; otherwise record the blocker and leave later waves untouched.

### 3. validate-plan after the proposal set

After every proposal in the scope set has completed its implement-and-validate path (or after a hard stop), load and follow the published `validate-plan` skill against the same scope document and its linked proposals/checks/validations. Treat `validate-plan` findings as a gate: address actionable implementation gaps within approved scope and re-run affected checks; do not treat validate-plan as product approval.

### 4. Stabilize only on full success

Stabilize parallel workstreams only when all of the following hold:

- every required check for every proposal in the scope set has a recorded validation with outcome `pass`;
- no required check remains `not run`, `fail`, or `inconclusive`;
- `validate-plan` completed without readiness blockers that invalidate the implementation set (`NOT_READY` or equivalent blocks stabilization).

Stabilization means: merge or replay provisional parallel results into the single integration workspace/branch in wave order, resolve shared-surface conflicts consciously, re-run repository-required gates on the stabilized revision, and update Maat records to the stabilized commit SHAs. If any validation is incomplete or failed, keep workstreams provisional, report the exact failing paths/outcomes, and do not merge or close the scope set as done.

### 5. Scope close-out

Report per-proposal paths, validation outcomes, wave schedule, validate-plan readiness label, whether stabilization occurred, and the stabilized revision when it did. Ask explicitly before commit; never assume push. Delivery across an integration branch belongs to `ship` or `integrate-to` when the user requests it.

## Close the Maat record

After implementation and verification of a proposal, update the feature/bug document only through supported operations with `expected_sha`. Warn before editing a `reviewed` document (may become `final` and reopen approval). Record each check result through the exact supported Maat validation workflow — typically a `validations/….md` document created with `brain_create` or via `operational_record` (`kind=validation`, `status=draft`) then `operational_draft_convert`, then set the documentary status the live contract allows for close (often `done`). For each result, preserve the check path/content SHA, proposal path/content SHA, implementation commit, validation path/content SHA, outcome (`pass`, `fail`, `not run`, or `inconclusive`), and evidence reference. Verify that the validation is actually linked to the same check and proposal through confirmed fields/relations; a written result with no verifiable association does not close the check. Never invent document operations, set `reviewed`/`accepted` via `brain_update`, or claim a result was recorded if it was not. If a required write operation is unavailable, report the change and local evidence, plus the precise Maat recording gap.

Keep implementation evidence linked to the approved proposal and its checks: changed paths, relevant revision/commit, commands or procedures run, pass/fail status, and any blocker. Do not record a new product decision or create an ADR unless a human-approved durable architectural decision requires it. Ask explicitly before commit; never assume push.

## Recheck the approved revision

Immediately before implementation, reread the supported review and linked proposal/plan/check documents (and the scope Planning section in scope mode). Match identifiers and content SHAs/versions to the reviewed packet and confirm the explicit recorded Maat decision. An approval covers only those exact revisions; changed content requires the applicable review again. Do not re-prompt when that exact revision is already approved. If the UI appears approved but Maat reads pending, repeat reads and compare IDs/versions, report the sync discrepancy, and stop before code changes. Do not infer approval from a label, chat response, or UI display alone, and do not synthesize a decision.
