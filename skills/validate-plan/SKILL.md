---
name: validate-plan
description: Independently check whether a Maat product plan preserves its source intent and has grounded, traceable proposals and checks before review or implementation.
---

# Validate a Maat implementation plan

Use this skill to assess a proposed PRD, feature, bug/fix, or set of implementation records for completeness and readiness. Reconstruct the source intent independently before judging the plan, so the plan's framing does not hide an omission or silently redefine the goal. Validation produces findings and a readiness recommendation; it does not approve the product proposal, record a decision, or implement changes.

## Load the source and evidence

Check whether the active client exposes a Maat SessionStart receipt and tools. If unavailable, say so and assess only evidence that is directly accessible; report Maat state and relations as unknown. If a receipt is exposed, confirm every configured skill loaded. Discover exact Maat tool names and schemas from the active client. Resolve the source PRD or conversation reference, each proposal, its checks, review/decision records, and target project. Record IDs, types, revisions, and links. If there is a source PRD or durable source document, first extract its goals, explicit requirements, constraints, and open questions without using the downstream plan as a substitute; then compare the plan against that baseline. For repository claims, confirm repository identity and revision with `codebase_status`, use `workspace_search` for structural searches, and verify the index snapshot matches the revision being assessed. Search related operational documents and in-flight work when supported.

If Maat has no unambiguous reference for the target project, ask the user for the repository URL and intended branch/access instead of inferring from the current directory or document name. Once provided, clone it into an isolated workspace and map the codebase at the checked-out commit. Label local checkout evidence distinctly from Maat-index evidence; report unavailable Maat operational context as unknown. If a source, required relationship, repository, or index is missing or stale, report it as an evidence gap and block only verdicts that depend on it. Do not treat unavailable evidence as proof of correctness or absence of related work. Do not request credentials in chat or start index updates.

Carry forward a project context record (canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, unresolved gaps). Reuse it only for the same identity and commit; refresh it when either changes. Distinguish structured Maat context from a map carried in the report.

### Identify each memory store before assessing links

Maat's operational memory and documentary memory are separate evidence sources. Inspect the live tool/schema and the returned item to classify each source; never infer its store or identity from a title, matching text ID, or search result alone.

- Operational records (for example feature/bug, plan, check, and validation) carry structured work state and relations. Verify their IDs, versions, statuses, and links through operational reads.
- Documentary records (for example PRDs, reviews, decisions, and brain documents) carry source or review material. Verify their IDs, revisions, and links through the corresponding document operations.
- A record in one store does not prove a matching record, relation, review, approval, or check exists in the other. Join evidence across stores only through an explicit relation confirmed by a supported read.
- `planned` means operational planning state, not documentary review submission or human approval. `submitted` means a review was routed, not approved. Require a confirmed human decision before treating a gate as complete.

If one store is unavailable, mark only evidence that depends on that store as unknown or blocked; continue independent checks supported by the other store. Do not let the absence of documentary review erase verified operational records, or let operational records stand in for missing documents/review. Missing evidence is never a pass.

## Assess plan readiness

Build and inspect a traceability chain for every material need:

`source goal/requirement → feature or bug → acceptance criterion → linked check → expected evidence`

When implementation has begun or finished, extend it through validation: `check ID/revision → validation ID/revision → result and evidence`. Verify the validation refers to the same check and proposal and to the implementation revision under assessment, using confirmed Maat relations/fields. Before implementation, mark this final link **not applicable yet**; after execution, a missing or unverifiable validation link is an evidence gap, never an implicit pass. Report IDs and relation evidence rather than inferring links from matching titles.

Check both directions: every source need is covered, and every proposal, criterion, or check has a justified source. Use IDs or short labels so a reviewer can follow the chain. Then assess:

- **Meaning and scope:** new behavior is a feature; correction of existing behavior is a bug. Boundaries, exclusions, users/systems, dependencies, and any change from the source are explicit. A proposal added by inference must be labeled and justified, not presented as a source requirement.
- **Technical grounding:** affected projects/components and current behavior have revision-matched evidence. Separate observed facts, inference, recommendations, assumptions, and unresolved product decisions.
- **Acceptance criteria:** each criterion describes an observable external outcome or invariant, covers important success/error behavior, and does not decide an open product question. Walk the affected user and system surfaces; record each relevant surface as covered, not applicable with a reason, or unresolved. Never omit an unresolved surface silently or invent a requirement to fill it.
- **Checks and baseline:** every criterion maps to a concrete check with a method and observable pass evidence; regression/error checks are included where relevant. Each new-behavior check should distinguish the planned result from the base revision; a bug regression check should demonstrate the defect at baseline when reproducible. If a check already passes at baseline, explain whether the criterion is already met or the check is not discriminating. Missing baseline access is an evidence gap, not a pass.
- **Sizing and dependencies:** each proposal is a coherent, independently reviewable outcome, not a horizontal layer. Ask whether each item can demonstrate a behavior when complete, whether coupled items should merge, and whether a true dependency blocks implementation. Report over-splitting, hidden coupling, unsupported blocker edges, or cycles; do not change the breakdown unless asked.
- **Workflow state:** identify whether the next gate is human product review, human decision, or implementation. Pending review is not approval; implementation readiness requires the recorded human gates relevant to this document.
- **Architecture and risk:** surface durable architectural choices for human review and ADR treatment when appropriate; assess material data, security, privacy, migration, reliability, and operational risks.

The catalog describes `check` as proposed, so inspect the current session's actual document workflow before concluding check records are integrated. Do not accept an inline list as an integrated check record unless the current Maat contract explicitly defines it that way. If native check creation or association is unavailable, report a blocking gap. Use **covered**, **not applicable** (with reason), **unresolved**, and **blocked** distinctly; unresolved or blocked requirements cannot be counted as passed.

## Report findings

Before finalizing the assessment, restate in plain language which goal/source and project/revision were assessed, what the plan is meant to achieve, and which evidence and gaps informed the review. Carry forward confirmation already given for this same source, project revision, and scope; ask only if new evidence changes the assessed understanding or leaves a consequential ambiguity. If corrected, reassess against the corrected source and scope. Do not turn this understanding check into product approval or a Maat state change.

Return a concise readiness verdict: **ready for human review**, **ready for implementation** (only when human gates are complete), or **not ready**. Do not use a numeric confidence as a substitute for this verdict. The goal of 99% correct interpretation is aspirational; claim a measured percentage only after a representative blind evaluation with a fixed rubric, independently reviewed outcomes, and reported sample size. List findings by severity with document IDs/revisions, affected requirement/check IDs, and evidence. Separate blocking gaps from recommendations. For every missing or failing check, say which acceptance criterion lacks evidence and what would make it verifiable.

Do not modify source documents, create checks, submit reviews, change workflow state, or write validation documents unless the user explicitly requests that action and the active Maat session confirms the operation. If asked to repair the plan, make only supported edits and report exactly what changed; re-evaluate readiness afterward.
