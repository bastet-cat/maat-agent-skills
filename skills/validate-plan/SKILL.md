---
name: validate-plan
description: Independently validate a Maat product plan against scope, implementation, and evidence, then close the loop with to-implement until the work is implementable and verifiable or only true external blockers remain.
---

# Validate a Maat implementation plan

Use this skill to take a Maat scope, feature, bug/fix, or post-implementation set to an **implementable and verifiable** state. Reconstruct the source intent independently before judging the plan, so the plan's framing does not hide an omission or silently redefine the goal.

Validation is a closed loop, not a stop-and-report pass. It produces findings, records evidence, updates Maat state, and resumes authorized remediation through `to-implement` until every required check has a recorded result or only true external blockers remain. It does not approve the product proposal, invent product decisions, or authorize commit, push, PR, force-push, or other irreversible external actions.

Follow the stages below in order. Missing criteria, incomplete validations, or doc/code divergence are work to finish when already authorized and executable — not a reason by themselves to stop with a list of next steps.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Handshake before any Maat write. Offer ≤3 options with a default when the path forks; never assume commit or push. Load companion skills (`to-implement` and any delegated independent verifier) only via bootstrap discovery (`published` + `active_release_id` + manifest + revalidation).

## 1. Load the source and evidence

Confirm Maat MCP is alive when Maat state will be cited or written. A SessionStart receipt, when exposed, can list configured skills; if unavailable, say so and assess only evidence that is directly accessible; report Maat state and relations as unknown when tools do not respond. Discover exact Maat tool names and schemas from the active client. Resolve the source scope document or conversation reference, each proposal, its checks, review/decision records, validation records, and target project via `brain_get` / search and operational reads as appropriate. Record paths/IDs, types, content SHAs/revisions, and links. If there is a source scope or durable source document, first extract its goals, explicit requirements, constraints, and open questions without using the downstream plan as a substitute; then compare the plan against that baseline. For repository claims, confirm repository identity and revision with `codebase_status`, use `workspace_search` for structural searches, and verify the index snapshot matches the revision being assessed. Search related documents and in-flight operational drafts when supported.

If Maat has no unambiguous reference for the target project, ask the user for the repository URL and intended branch/access instead of inferring from the current directory or document name. Once provided, clone it into an isolated workspace and map the codebase at the checked-out commit. Label local checkout evidence distinctly from Maat-index evidence; report unavailable Maat operational context as unknown. If a source, required relationship, repository, or index is missing or stale, report it as an evidence gap and block only verdicts that depend on it. Do not treat unavailable evidence as proof of correctness or absence of related work. Do not request credentials in chat or start index updates.

Carry forward a project context record (canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, unresolved gaps). Reuse it only for the same identity and commit; refresh it when either changes. Distinguish structured Maat context from a map carried in the report.

### Identify each memory store before assessing links

Maat's operational memory and documentary memory are separate evidence sources. Inspect the live tool/schema and the returned item to classify each source; never infer its store or identity from a title, matching text ID, or search result alone.

- **Documentary** records (scope documents, features, bugs, plans, checks, reviews, decisions, validations) carry product/work documents. Verify paths, content SHAs, statuses, and links through `brain_get` (and related document tools).
- **Operational** records from `operational_*` are drafts or in-flight memory. They are not feature/plan/check documents. Verify them only through operational reads. A draft still listed after `operational_draft_convert` is expected and does not by itself invalidate a converted document.
- A record in one store does not prove a matching record, relation, review, approval, or check exists in the other. Join evidence across stores only through an explicit relation confirmed by a supported read.
- Draft/planned operational state is not documentary review submission or human approval. `submitted` means a review was routed, not approved. Require a confirmed human decision (and finalize tools when used) before treating a gate as complete. Never treat `reviewed`/`accepted` set via generic `brain_update` as valid process.

If one store is unavailable, mark only evidence that depends on that store as unknown or blocked; continue independent checks supported by the other store. Do not let the absence of documentary review erase verified documents, or let operational drafts stand in for missing documents/review. Missing evidence is never a pass.

## 2. Compare plan, scope, implementation, and evidence

Build and inspect a traceability chain for every material need:

`source goal/requirement → feature or bug → acceptance criterion → linked check → expected evidence`

When implementation has begun or finished, extend it through validation: `check path/SHA → validation path/SHA → result and evidence`. Verify the validation refers to the same check and proposal and to the implementation revision under assessment, using confirmed Maat relations/fields. Before implementation, mark this final link **not applicable yet**; after execution, a missing or unverifiable validation link is an evidence gap, never an implicit pass. Report paths/IDs and relation evidence rather than inferring links from matching titles.

Compare in both directions and record every material gap explicitly:

- **Plan vs scope:** every source need is covered; every proposal, criterion, or check has a justified source. Flag missing criteria, silent scope changes, inferred requirements presented as source facts, and open product questions left undecided.
- **Plan vs implementation:** when code or docs already exist for the proposal, compare the approved criteria and checks with the current revision. Flag behavior present in docs but absent in code, code that diverges from the plan, and checks that no longer discriminate the approved outcome.
- **Plan/implementation vs evidence:** every required check has a recorded outcome for the revision under assessment, with commands or procedures and observable proof. Flag incomplete validations, stale evidence tied to an older SHA, narrative claims without runnable proof, and contradictions between validation prose and actual results.

Use IDs or short labels so a reviewer can follow the chain. Then assess:

- **Meaning and scope:** new behavior is a feature; correction of existing behavior is a bug. Boundaries, exclusions, users/systems, dependencies, and any change from the source are explicit. A proposal added by inference must be labeled and justified, not presented as a source requirement.
- **Technical grounding:** affected projects/components and current behavior have revision-matched evidence. Separate observed facts, inference, recommendations, assumptions, and unresolved product decisions. Name which SHA you are aligning (git vs Maat content SHA).
- **Acceptance criteria:** each criterion describes an observable external outcome or invariant, covers important success/error behavior, and does not decide an open product question. Walk the affected user and system surfaces; record each relevant surface as covered, not applicable with a reason, or unresolved. Never omit an unresolved surface silently or invent a requirement to fill it.
- **Checks and baseline:** every criterion maps to a concrete check with a method and observable pass evidence; regression/error checks are included where relevant. Each new-behavior check should distinguish the planned result from the base revision; a bug regression check should demonstrate the defect at baseline when reproducible. If a check already passes at baseline, explain whether the criterion is already met or the check is not discriminating. Missing baseline access is an evidence gap, not a pass.
- **Sizing and dependencies:** each proposal is a coherent, independently reviewable outcome, not a horizontal layer. Ask whether each item can demonstrate a behavior when complete, whether coupled items should merge, and whether a true dependency blocks implementation. Require a parseable **Dependencies** field (`depends_on`, `dependency_reason`, `parallel_wave`) on every feature/bug when more than one proposal exists, or when a scope Planning map claims waves. For a scope source, verify the **Planning** section's proposal index, dependency graph, and viable parallelization map agree with those fields and contain no cycles. Report over-splitting, hidden coupling, unsupported blocker edges, missing wave assignments, map/document disagreement, or cycles; do not change the breakdown unless asked.
- **Workflow state:** identify whether the next gate is human product review, human decision, implementation, independent verification, or close-out. Pending review is not approval; implementation readiness requires the recorded human gates relevant to this document.
- **Architecture and risk:** surface durable architectural choices for human review and ADR treatment when appropriate; assess material data, security, privacy, migration, reliability, and operational risks.

Inspect the current session's actual document workflow before concluding check documents are integrated. Do not accept an inline list as an integrated check record unless the current Maat contract explicitly defines it that way. If native check creation or association is unavailable, report a blocking gap. Use **covered**, **not applicable** (with reason), **unresolved**, and **blocked** distinctly; unresolved or blocked requirements cannot be counted as passed.

## 3. Run an independent validator and keep it current

Do not treat the implementer's summary, chat narrative, or unchecked validation prose as proof. Run validations through a validator independent of the author of the implementation under assessment:

- Prefer a fresh context, delegated independent reviewer, or a separate agent that did not author the change.
- Give the validator the approved proposal(s), linked checks, current revision, and access to raw evidence (commands, logs, diffs, Maat validation records) — not only a pass/fail claim.
- Require the validator to decide, per criterion/check, whether the evidence actually proves the criterion, including regressions and failure cases.
- The validator must report unsupported, missing, contradictory, or stale evidence rather than accepting the implementer's framing.

Record for every evaluated criterion/check: criterion/check ID or path, commands or procedures run, implementation SHA assessed, outcome (`pass`, `fail`, `not run`, `inconclusive`, or `manual-validation`), evidence references, and residual risks.

Keep the validator packet current as the work evolves. When the plan, checks, implementation, or recorded results change, refresh the validator inputs (proposal/check SHAs, revision, commands, expected evidence) before the next pass. Do not reuse a stale verifier brief against a newer revision or rewritten criteria. If an independent validator is unavailable, state that explicitly, continue every check that can still be run from primary evidence, and never present self-review as independent verification.

Prefer machine-readable overall labels: `READY`, `READY_WITH_GAPS`, or `NOT_READY`, with only real blockers. `READY_WITH_GAPS` is allowed only when remaining gaps are documented external/manual dependencies, not when required checks are simply unrun.

## 4. Close the loop until the work is verifiable

After each assessment or independent validation pass, classify every finding:

1. **Executable within authorized scope** — missing or weak checks that can be written/associated with confirmed operations; implementation gaps inside the approved proposal; incomplete validations that can be re-run; plan/doc drift that can be reconciled without changing product intent; Maat relation/metadata gaps needed for UI and resume.
2. **Requires product or architecture decision** — open questions that change approved intent, boundaries, or durable design. Do not invent the decision; record the blocker and continue every independent item.
3. **External / unavailable dependency** — equipment, credentials, environments, human access, or irreversible actions that this session cannot perform. Complete all remaining work first; then record the dependency (see stage 5).

For class 1 findings, do not stop with a list of next steps. Immediately resume the published `to-implement` skill (proposal or scope mode as applicable) to correct the plan or implementation within authorized scope, update evidence, and return here for another validation pass. Repeat until:

- every required check has a recorded result for the revision under assessment; and
- either the set is `READY` / ready for the applicable human gate, or only class 2/3 blockers remain.

Continuity covers already authorized remediation and re-validation. It does **not** authorize commit, push, PR, force-push, production mutation, or other irreversible external actions; those still require explicit user authorization (and `ship` / `integrate-to` when delivery is requested). Do not expand into unapproved product scope. Newly discovered needs outside the approved proposal become separate proposals, not silent scope growth.

Before implementation has started, the same loop applies to plan readiness: repair missing criteria, checks, dependencies, Planning maps, and relation metadata when the live Maat contract supports those writes and the user invoked this skill to reach a reviewable/implementable state; then reassess. If a required write or association operation is unavailable, record that exact gap instead of inventing a substitute.

## 5. External blockers and `manual-validation`

Do not declare the work complete while any required check remains without a recorded result. Outcomes must be explicit: `pass`, `fail`, `not run`, `inconclusive`, or `manual-validation`.

When a step depends on equipment, access, credentials, environments, or a human decision that is unavailable in this session:

- Finish every other executable assessment, fix, check run, and Maat update first.
- Record the blocked check/criterion with outcome `manual-validation` (or the live contract's equivalent status) through the supported validation workflow.
- Include concrete resume instructions: what is blocked, why, what evidence is already gathered, exact commands or procedures to run when the dependency is available, which proposal/check/revision they attach to, and what “done” looks like.
- Keep `READY_WITH_GAPS` only for these documented external gaps. Unrun checks that the agent could have executed are `NOT_READY`, not gaps.

Never mark an unrun or inconclusive check as passed. Never treat `manual-validation` as a pass.

## 6. Keep Maat documents current for UI and resume

After every material state change in this skill — readiness assessment, independent validation pass, remediation handoff through `to-implement`, evidence refresh, `manual-validation` blocker, or cycle close-out — update the Maat plan, feature, associated bugs, checks, validations, and (when in scope mode) the scope Planning notes so they accurately reflect current status, evidence, pending items, risks, and next gate. Do not leave the durable record behind the conversation.

For each proposal and check touched in the cycle:

- Use supported writes with the current `expected_sha`. On conflict, re-read and reassess; never force. Warn before editing a `reviewed` document (may become `final` and reopen approval). Never set `reviewed`/`accepted` via generic `brain_update`.
- Keep `owner`, `repository`, provenance `sha`, discovery `tags`, and `related` / `feature_id` links among scope ↔ feature/bug ↔ plan ↔ checks ↔ validations populated so the Maat UI lists and opens the work correctly. Resend replaceable fields on every wholesale `brain_update`.
- Preserve check path/content SHA, proposal path/content SHA, implementation commit when applicable, validation path/content SHA, outcome, commands/evidence references, pending items, and residual risks so a later session can resume from document paths/IDs alone without chat history.
- Verify validations are linked to the same check and proposal through confirmed fields/relations; a written result with no verifiable association does not close the check.
- Prefer the documentary validation workflow the live contract accepts (typically `brain_create` for `validations/….md`, or `operational_record` kind `validation` → `operational_draft_convert`, then the allowed close status). Conversion leaving an operational draft listed is expected.
- After each write, `brain_get` the updated artifacts and verify type, status, content SHA, tags, relations, and outcomes. Report only verified paths/SHAs; if a required relation or field is missing, fix it before claiming the cycle is done.

If a required write or relation operation is unavailable, report the local evidence plus the exact Maat recording gap; do not claim the UI or a later session can recover that state from Maat.

## 7. Report only when executable work is done

Before finalizing, restate in plain language which goal/source and project/revision were assessed, what the plan is meant to achieve, which evidence and gaps informed the review, which remediation cycles ran, and which Maat records were updated. Carry forward confirmation already given for this same source, project revision, and scope; ask only if new evidence changes the assessed understanding or leaves a consequential ambiguity. If corrected, reassess against the corrected source and scope. Do not turn this understanding check into product approval.

Return a concise readiness verdict: **ready for human review**, **ready for implementation** (only when human gates are complete), **verified** (post-implementation, required checks recorded and independent validation satisfied), or **not ready**. Map to `READY` / `READY_WITH_GAPS` / `NOT_READY` when the caller wants machine-readable labels; list only real blockers. Do not use a numeric confidence as a substitute for this verdict. The goal of 99% correct interpretation is aspirational; claim a measured percentage only after a representative blind evaluation with a fixed rubric, independently reviewed outcomes, and reported sample size.

List findings by severity with document paths/content SHAs, affected requirement/check IDs, and evidence. Separate blocking gaps from recommendations. For every missing or failing check, say which acceptance criterion lacks evidence and what would make it verifiable. Include remaining `manual-validation` items with their resume instructions.

Do not end with a backlog of next steps while authorized, executable remediation or re-validation remains. The report closes a finished cycle or a hard external/human blocker — not a pause for work the agent could still do.

## Check workflow and decision integrity

Map only the stages applicable to the proposal: scope if product intent needs discovery; technical refinement if needed; feature/bug, plan, and checks; independent validation; implementation; closed-loop re-validation; delivery. For each applicable stage, identify artifact type, store/profile, path/ID, status, provenance SHA, links, and next human gate. Do not treat an operational draft as a product artifact or advance a draft by inference. A missing optional stage is not itself a defect; explain why it applies or does not.

Verify a review decision against the exact review and linked artifact IDs plus SHAs/versions using supported Maat reads. Status labels alone do not prove a decision. An approval applies only to the reviewed revisions. If `docs://review` appears approved but Maat reads pending, repeat reads, compare identifiers/versions, diagnose the sync discrepancy, and report it; do not recommend another prompt or dependent transition until resolved. Stored review fields do not prove that the UI presents the question and approve/request-changes actions: report this as unverified unless directly observed through the active client, naming the missing UI capability/component without inferring a backend defect.
