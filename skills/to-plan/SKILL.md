---
name: to-plan
description: Turn decided product requirements into evidence-grounded Maat feature or bug proposals with traceable checks for human review.
---

# Plan Maat implementation proposals

Use this skill when asked to plan/specify a sigle feature or fix, including “planeje a feature {x}”, “monte um plano”, or “especifique um feature/bug”. Keep the result as a proposal for human review. Do not implement it or record an unapproved decision.

## Required agent mode

Run this skill only in the agent's Plan mode. At invocation, confirm that Plan mode is active and keep it active through evidence gathering, proposal preparation, and review-packet creation. If the agent is in another mode, switch to Plan mode before continuing; if the runtime does not expose a mode switch, stop before doing the planning work and ask the user to relaunch or switch the agent to Plan mode. Do not continue this workflow in another mode.

Choose the input mode from the invocation:

- **Scope mode:** an argument identifies a scope document. Read it as the product-scope source and map its requirements to all technically necessary feature and/or bug proposals.
- **Conversation mode:** no document argument is supplied. Use the current conversation as the request context and prepare a proposal for the needed feature or bug. Do not assume an absent scope document.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Handshake before any Maat write.

## Check whether planning needs a scope document first

Direct prompt or conversation-context entry is for short, well-defined requests that fit in exactly one feature or one bug/fix. Before planning, assess both scope and product readiness. If interpreting the prompt or conversation context would produce more than one feature/fix, combines distinct user journeys or initiatives, is too broad to deliver as one outcome, or leaves consequential actors, goals, constraints, or success measures undecided, do not generate any feature/fix from `to-plan`: explain the concrete signals and require the user to start with `to-scope` and capture the product scope in a scope document first.

Do not use an arbitrary count of requirements, components, or implementation steps as the threshold: decide whether the user's short request can be expressed as one observable outcome with one coherent set of acceptance criteria. In scope mode, one scope document may produce multiple independently reviewable features/fixes when its requirements justify them; do not send the user back to create another scope document just because several proposals are needed. If the scope document's product intent is too ambiguous to support defensible slices, identify the unresolved decisions and recommend scope refinement before creating documents.

## Establish the Maat context

Confirm Maat MCP is alive and discover live tool schemas. A SessionStart receipt, when present, can list configured skills; its absence alone does not block documentary writes when `brain_*` responds. If required create/update schemas are missing, stop before writing and name the exact gap. Never assume a tool prefix or a capability exposed by another client.

For repository work, establish project identity and revision from explicit Maat references; use `codebase_status`, `workspace_search`, and document/operational search when available. Keep project, branch/revision, document paths/content SHAs, and code locations with evidence. If there is no unambiguous Maat reference, ask the user for the repository URL and intended branch/access. Once provided, clone it into an isolated workspace and map the codebase at the checked-out commit before making project-specific claims. Identify clone evidence as such, not as indexed Maat evidence; report unknown Maat operational context separately. Missing or stale evidence is not proof that no impact or related work exists. Do not start index updates or request credentials in chat.

Carry forward a project context record with canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, and unresolved gaps. Reuse it only while identity and commit match; refresh it when they change. Persist it only through confirmed Maat fields/relations, otherwise retain it in the proposal packet and say it is not structured Maat context.

## Build the proposal set

### Scope mode

1. Resolve the provided argument as one unambiguous source document (`brain_get` for Maat paths, or file/URL tools). Read it without editing it; record its title, stable identifier or location, revision/content SHA, goals, requirements, constraints, and references. If it cannot be read or does not identify one scope document, ask for the missing path/access/identifier and stop.
2. Trace every requirement and relevant user flow through affected projects, systems, data ownership, APIs/events, authorization, persistence, operations, and failure behavior. Distinguish direct evidence from inference and make each inference checkable.
3. Map requirements to the smallest coherent set of proposals needed for delivery. Create a **feature** for new product behavior and a **bug** for correcting behavior that contradicts an established expectation. Do not classify work from wording alone: confirm the current behavior or cite the source that establishes the expected behavior. A scope document can yield multiple proposals, and one can cover closely related requirements.
4. Choose boundaries by independently reviewable and verifiable outcomes. Prefer a vertical slice that demonstrates user-visible or operational value across the layers it needs. Split only when each part can be reviewed and validated independently or has a real dependency; merge parts that cannot demonstrate the intended outcome alone. Avoid one item per technical layer, duplicate proposals, and speculative scope. Write the proposed grouping and dependency edges in a concise numbered breakdown before creating documents. If the source leaves a material split/merge or dependency decision open, ask one focused question (≤3 options with default); otherwise proceed without an approval round that repeats the later product review.
5. For each proposal, state source requirement(s), intended outcome, current/expected behavior, boundaries, affected projects/components, real dependencies, observable acceptance criteria, failure scenarios, and technical risks. Separate direct evidence, inference, recommendation, assumption, and unresolved product decision. Do not decide product questions for the owner.

### Conversation mode

Use the conversation as the source. First establish whether it describes a new capability or a deviation from behavior already promised or relied on; classify the proposal as a feature or bug accordingly. If the expected behavior or outcome is unclear, ask only questions that materially change scope. Ground repository claims in current Maat code/document evidence; label assumptions and unknowns instead of inventing implementation facts.

### Both modes: derive validation checks

For each proposed feature or bug, derive concrete validation checks from its acceptance criteria and important failure/regression scenarios. A check must be falsifiable and state: a stable ID, the criterion(s) covered, the highest reliable user-facing or system contract to observe, the setup/action as needed, and the observable pass condition/evidence. Prefer testing external behavior at an existing stable seam; do not prescribe internal implementation details unless the contract itself is internal.

Cover every acceptance criterion with at least one check and every high-risk failure path with an appropriate check. Each new-behavior check must target behavior absent from the current baseline; each bug regression check should reproduce the defect before the fix when it can be reproduced. If a check already passes at baseline, determine whether the behavior is already satisfied, the criterion is not new, or the check is ineffective; do not present a vacuous check as proof. Keep checks within the proposal that owns the behavior and map them back to criterion IDs. Do not inflate check count with multiple checks that prove the same outcome without distinct risk coverage.

Before writing, perform a coverage pass in both directions: every source need is represented by a proposal or explicitly marked out of scope/unresolved, and every acceptance criterion has a check. Mark any exposed surface not defined by the source (for example authorization, empty/error states, migration, or operations) as existing behavior, not applicable, or unresolved; never turn the sweep into invented requirements. Identify durable architectural choices only when evidence shows one is needed. Present alternatives and trade-offs for human choice. An ADR is appropriate only for a durable architectural decision; do not turn routine implementation details into ADRs.

## Confirm the shared understanding

Before creating proposal/check documents, show a concise, plain-language summary of the source goal, current behavior, intended outcome, mapped feature/bug slices, affected project and revision, linked checks, scope boundaries, evidence versus inference, and unresolved questions. Carry forward confirmation already given for the same source, project revision, and scope; do not repeat that question. Ask only if the understanding is new, materially changed, or consequentially ambiguous. Incorporate corrections before writing; human product review remains a separate gate.

## Create and verify project documents

Primary outputs are **project documents** in the documentary store: feature or bug, plan, and checks. This is distinct from operational drafts and from product review approval.

### Preflight the documentary contract

Discover live schemas. Before the first write, confirm that `brain_create` (and `brain_update` with `expected_sha`) can create the needed document types, or that the supported path is `operational_record` (**draft only**) → `operational_draft_convert` → project document. Confirm how `feature_id` / `related` / path conventions work on this installation (logical paths with `.md`, e.g. `features/….md`, `plans/….md`, `checks/….md`).

**Hard rule:** `operational_record` does **not** create feature, plan, or check documents. Its live schema accepts only draft kinds such as activity, decision, adr, blocker, validation, handoff, and bug-as-draft — and only `status=draft`. Do not instruct or attempt `kind: feature|plan|check` or `status: planned` on `operational_record`.

Map scope, evidence, criteria, risks, dependencies, and open questions into fields the live schema accepts. Require `owner`, `repository`, and provenance `sha` on documentary creates/updates as the schema specifies. If documentary create is unavailable and draft-convert is also unavailable, make no writes and report the exact gap. Do not substitute free-form notes for these documents without saying so.

Lack of a document-review operation is not a preflight failure. Continue with document creation and report the missing review capability afterward.

### Avoid duplicates and write in dependency order

Before creating documents, search documentary sources (and operational drafts if relevant) for matches using source identity, project, stable paths/IDs, and proposal/check meaning. Reuse exact matching documents. If they already exist, `brain_get` them before deciding whether to reuse or update; do not overwrite human review state or approved decisions. Update only with the exact current `expected_sha`. On conflict, re-read and reassess — never force.

Optional staging: create an operational draft with `operational_record` (`status=draft`, required `document_path`, `operation_id`, `expected_version`) then convert with `operational_draft_convert`. Conversion does not delete the draft; `operational_in_flight` may still list it — say so in one line if asked. Prefer direct `brain_create` when that is the clearer path.

Create or update only the documents needed, in this order:

1. **Feature or bug document:** choose feature for new behavior and bug for a correction. Record source, problem/current behavior, intended outcome, scope and exclusions, affected project/evidence, acceptance criteria, risks, dependencies, and open questions. Use a proposal-friendly status the schema allows (commonly `draft` or `final`). Never set `reviewed`/`accepted` via `brain_update`.
2. **Plan document:** create with `feature_id` (or equivalent relation) pointing at the feature/bug document. Include delivery scope/slices, criterion coverage, evidence, dependencies, risks, and unresolved decisions.
3. **Check documents:** one check document per falsifiable check, each related to the same feature/bug. Every check must identify its criterion, scenario/setup and action, and observable expected result/evidence. Keep paths/IDs stable across retries.

If an unexpected write failure occurs after some documents were created, report the exact partial state and paths/SHAs; do not conceal it or recreate successful writes. Resume only missing/failed writes after reading current state.

### Read back and verify

After writes, `brain_get` (or confirmed reads) for the feature/bug, plan, and every check. Verify and report each path, type, content SHA/status, and `feature_id`/related links. Confirm all documents point to the same feature/bug and remain in a pre-approval status unless a human decision is independently confirmed. If a read is unavailable, report exactly which documents or relations could not be verified; do not claim successful verification.

## Prepare the review packet and choose a review route

Every feature/bug needs a self-contained review packet containing the proposal, plan, checks, source traceability, evidence, risks, and open questions. First check whether the live document workflow can create a review document and relate it to these exact document paths/IDs. Create that document only when the supported schema explicitly accepts those relations. Submit it through a Maat review operation only when that operation accepts the relevant IDs. Capture returned paths, content SHAs, links, and states. A review document is distinct from the feature/plan/check documents.

If a review document or Maat review operation is unavailable, present the complete review packet in the chat and invite the user to review it there. Do not abandon already verified documents or imply that a Maat review link exists. Treat the user's comments in chat as review feedback, not automatic approval; incorporate requested changes through supported updates (`expected_sha`) and show the revised packet. Set an approved/`reviewed` state only after the user explicitly approves and a supported review/finalize operation can record that decision (e.g. `product_review_finalize_documents` after an accepted review). If Maat review is submitted but pending, report `submitted`, not `approved`; confirm approval through a supported read before claiming it.

## Regression safeguards

- Documentary writes are available while document review is unavailable: create and read back the feature/bug, plan, and checks, then present the review packet in chat and wait for the user's review.
- Matching documents already exist: reuse them, or update with current `expected_sha`; do not create duplicates.
- A required document type, create schema, or `feature_id` relation cannot be supported: preflight and stop before any write, naming the missing operation/field/relation.
- Never call `operational_record` with feature/plan/check kinds or non-draft status.
- Never set or claim `reviewed`/`accepted`/`approved` without an explicit human decision recorded through a supported review operation and verified afterward.
- Chat review is used: capture feedback, update supported documents, and show the revised packet; do not infer approval unless the user explicitly approves.

The review packet must make the proposal understandable without relying on unstated context. Include:

- proposal type and concise title;
- source conversation or scope document identity/revision and requirement coverage;
- problem/current behavior and intended outcome;
- technical scope, affected project evidence, boundaries, and dependencies;
- observable acceptance criteria and relevant failure cases;
- associated validation checks, each mapped to one or more acceptance criteria;
- real dependency edges and why each blocker is necessary;
- risks, alternatives, assumptions, and questions requiring human choice.

Before submitting, check the proposed breakdown for over-splitting and missing integration: each proposal should answer “what can a user or operator observe when this lands?” and each dependency should name the prerequisite outcome, not merely a related component. Keep the user's original requirements intact when removing an unnecessary ticket/slice.

Report the verified document paths, types, content SHAs, statuses, and relations; summarize source traceability and unresolved gaps. Include a review document or link only when created and returned/verified by a supported operation. Otherwise include the review packet in chat and wait for feedback. Distinguish review feedback from explicit approval; only a confirmed human decision may authorize an approved/`reviewed` state.
