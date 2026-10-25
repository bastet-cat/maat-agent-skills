---
name: to-plan
description: Turn decided product requirements into evidence-grounded Maat feature or bug proposals with traceable checks for human review.
---

# Plan Maat implementation proposals

Use this skill when asked to plan/specify a feature or fix, including “planeje a feature {x}”, “monte um plano”, or “especifique um feature/bug”. Keep the result as a proposal for human review. Do not implement it or record an unapproved decision.

Choose the input mode from the invocation:

- **PRD mode:** an argument identifies a PRD document. Read it as the scope source and map its requirements to all technically necessary feature and/or bug proposals.
- **Conversation mode:** no document argument is supplied. Use the current conversation as the request context and prepare a proposal for the needed feature or bug. Do not assume an absent PRD.

## Check whether planning needs a PRD first

Direct prompt or conversation-context entry is for short, well-defined requests that fit in exactly one feature or one bug/fix. Before planning, assess both scope and product readiness. If interpreting the prompt or conversation context would produce more than one feature/fix, combines distinct user journeys or initiatives, is too broad to deliver as one outcome, or leaves consequential actors, goals, constraints, or success measures undecided, do not generate any feature/fix from `to-plan`: explain the concrete signals and require the user to start with `to-prd` and capture the scope in a PRD first.

Do not use an arbitrary count of requirements, components, or implementation steps as the threshold: decide whether the user's short request can be expressed as one observable outcome with one coherent set of acceptance criteria. In PRD mode, one PRD may produce multiple independently reviewable features/fixes when its requirements justify them; do not send the user back to create another PRD just because several proposals are needed. If the PRD's product intent is too ambiguous to support defensible slices, identify the unresolved decisions and recommend PRD refinement before creating operational records.

## Establish the Maat context

Check the active client's Maat capabilities individually. If a SessionStart receipt is available, confirm every configured skill loaded. Its absence alone does not block operational writes: continue when the operational MCP is connected and exposes the required live operations and schemas. If the operational MCP is disconnected or a required create/link schema is missing, stop before writing and name the exact gap. Never assume a tool prefix or a capability exposed by another client.

For repository work, establish project identity and revision from explicit Maat references; use `codebase_status`, `workspace_search`, and operational/document search when available. Keep project, branch/revision, document IDs/revisions, and code locations with evidence. If there is no unambiguous Maat reference, ask the user for the repository URL and intended branch/access. Once provided, clone it into an isolated workspace and map the codebase at the checked-out commit before making project-specific claims. Identify clone evidence as such, not as indexed Maat evidence; report unknown Maat operational context separately. Missing or stale evidence is not proof that no impact or related work exists. Do not start index updates or request credentials in chat.

Carry forward a project context record with canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, and unresolved gaps. Reuse it only while identity and commit match; refresh it when they change. Persist it only through confirmed Maat fields/relations, otherwise retain it in the proposal packet and say it is not structured Maat context.

## Build the proposal set

### PRD mode

1. Resolve the provided argument as one unambiguous source document. Read it without editing it; record its title, stable identifier or location, revision marker, goals, requirements, constraints, and references. If it cannot be read or does not identify one PRD, ask for the missing path/access/identifier and stop.
2. Trace every requirement and relevant user flow through affected projects, systems, data ownership, APIs/events, authorization, persistence, operations, and failure behavior. Distinguish direct evidence from inference and make each inference checkable.
3. Map requirements to the smallest coherent set of proposals needed for delivery. Create a **feature** for new product behavior and a **bug** for correcting behavior that contradicts an established expectation. Do not classify work from wording alone: confirm the current behavior or cite the source that establishes the expected behavior. A PRD can yield multiple proposals, and one can cover closely related requirements.
4. Choose boundaries by independently reviewable and verifiable outcomes. Prefer a vertical slice that demonstrates user-visible or operational value across the layers it needs. Split only when each part can be reviewed and validated independently or has a real dependency; merge parts that cannot demonstrate the intended outcome alone. Avoid one item per technical layer, duplicate proposals, and speculative scope. Write the proposed grouping and dependency edges in a concise numbered breakdown before creating records. If the source leaves a material split/merge or dependency decision open, ask one focused question; otherwise proceed without an approval round that repeats the later product review.
5. For each proposal, state source requirement(s), intended outcome, current/expected behavior, boundaries, affected projects/components, real dependencies, observable acceptance criteria, failure scenarios, and technical risks. Separate direct evidence, inference, recommendation, assumption, and unresolved product decision. Do not decide product questions for the owner.

### Conversation mode

Use the conversation as the source. First establish whether it describes a new capability or a deviation from behavior already promised or relied on; classify the proposal as a feature or bug accordingly. If the expected behavior or outcome is unclear, ask only questions that materially change scope. Ground repository claims in current Maat code/document evidence; label assumptions and unknowns instead of inventing implementation facts.

### Both modes: derive validation checks

For each proposed feature or bug, derive concrete validation checks from its acceptance criteria and important failure/regression scenarios. A check must be falsifiable and state: a stable ID, the criterion(s) covered, the highest reliable user-facing or system contract to observe, the setup/action as needed, and the observable pass condition/evidence. Prefer testing external behavior at an existing stable seam; do not prescribe internal implementation details unless the contract itself is internal.

Cover every acceptance criterion with at least one check and every high-risk failure path with an appropriate check. Each new-behavior check must target behavior absent from the current baseline; each bug regression check should reproduce the defect before the fix when it can be reproduced. If a check already passes at baseline, determine whether the behavior is already satisfied, the criterion is not new, or the check is ineffective; do not present a vacuous check as proof. Keep checks within the proposal that owns the behavior and map them back to criterion IDs. Do not inflate check count with multiple checks that prove the same outcome without distinct risk coverage.

Before writing, perform a coverage pass in both directions: every source need is represented by a proposal or explicitly marked out of scope/unresolved, and every acceptance criterion has a check. Mark any exposed surface not defined by the source (for example authorization, empty/error states, migration, or operations) as existing behavior, not applicable, or unresolved; never turn the sweep into invented requirements. Identify durable architectural choices only when evidence shows one is needed. Present alternatives and trade-offs for human choice. An ADR is appropriate only for a durable architectural decision; do not turn routine implementation details into ADRs.

## Confirm the shared understanding

Before creating proposal/check records, show a concise, plain-language summary of the source goal, current behavior, intended outcome, mapped feature/bug slices, affected project and revision, linked checks, scope boundaries, evidence versus inference, and unresolved questions. Carry forward confirmation already given for the same source, project revision, and scope; do not repeat that question. Ask only if the understanding is new, materially changed, or consequentially ambiguous. Incorporate corrections before writing; human product review remains a separate gate.

## Create and verify operational records

Use structured operational records as the primary output of this skill. This is distinct from creating a document and submitting it to product review. In conversation mode, lack of a document-review workflow is never a reason to omit operational records.

### Preflight the operational contract

Discover the active client's actual operational tools and schemas. Before the first write, confirm that the operational MCP is connected and `operational_record` can create the needed `feature` or `bug`, a `plan`, and `check` records; confirm that both `plan` and `check` accept the returned feature ID through `feature_id`. Inspect the fields and status behavior to confirm the records can carry the proposal content and remain `planned`. Do not infer these capabilities from the document catalog or a different client's tools.

Map scope, evidence, criteria, risks, dependencies, and open questions into fields the live schema actually accepts. Confirm how the live schema accepts `operation_id` and `expected_version`, including the documented expected version for creation and update. Use both on each write as the contract specifies; reuse the same operation ID when retrying the same logical write. Preflight all three record kinds, the required concurrency/idempotency fields, and the `feature_id` relation before creating anything. If the operational MCP is disconnected, or a required create kind, field, or link is unsupported, make no writes and report exactly which operation/schema element is missing. Do not substitute Markdown documents, `brain_import_markdown`, or free-form notes for these records.

The lack of an available document-review operation is not a preflight failure. Continue with operational record creation and report the missing review capability afterward.

### Avoid duplicates and write in dependency order

Before creating records, search supported operational sources for matches using source identity, project, stable IDs, and proposal/check meaning. Reuse exact matching records. If records already exist, read them before deciding whether to reuse or update; do not overwrite human review state or approved decisions. If collection search is unavailable, look up stable IDs with supported reads and use the documented `operation_id` idempotency contract; report when a broad duplicate search could not be performed. Update only through a supported operation using the exact current `expected_version`. On a version conflict, read the latest record and reassess instead of retrying blindly.

Use stable IDs for the feature, plan, and each check wherever the schema allows caller-supplied IDs. Otherwise, retain the IDs returned by Maat. Use a stable `operation_id` for each logical write and reuse it on retries; never create a new operation ID just to retry the same write. Supply `expected_version` according to the live schema's documented create/update semantics; do not guess an initial version or invent a field.

Create or update only the records needed, in this order:

1. **Feature or bug:** choose `feature` for new behavior and `bug` for a correction to established behavior. Record the source, problem/current behavior, intended outcome, scope and exclusions, affected project/evidence, acceptance criteria, risks, dependencies, and open questions in schema-supported fields.
2. **Plan:** create `kind: plan` with `feature_id` set to the feature/bug ID returned by Maat. Include the delivery scope/slices, criterion coverage, evidence, dependencies, risks, and unresolved decisions supported by the schema.
3. **Checks:** create one `kind: check` record per falsifiable check, each with the same `feature_id`. Every check must identify its criterion, scenario/setup and action, and observable expected result/evidence. Keep check IDs stable across retries and avoid duplicate checks for the same criterion/scenario.

Set or retain status `planned` for the feature/bug, plan, and checks until a human review/approval is actually recorded. Never write an approved decision on the user's behalf. If an unexpected write failure occurs after some records were created, report the exact partial state and IDs; do not conceal it or recreate successful writes. Resume only missing/failed writes with the same stable identifiers and operation IDs after reading current state.

### Read back and verify

After writes, use `operational_get` or another confirmed read operation to fetch the feature/bug, plan, and every check. Verify and report each record's ID, kind, current version/status, `feature_id` relation, and stored scope/criteria. Confirm that all records point to the same feature/bug and remain `planned` unless a human decision is independently confirmed. If a read operation is unavailable, report exactly which records or relations could not be verified; do not claim successful verification.

## Prepare the review packet and choose a review route

Every feature/bug needs a self-contained review packet containing the proposal, plan, checks, source traceability, evidence, risks, and open questions. First check whether the live document workflow can create a review document and relate it to these exact operational record IDs. Create that document only when the supported schema explicitly accepts those records and returns a verifiable relation. Submit it through a Maat review operation only when that operation accepts the relevant document/record IDs. Capture returned IDs, links, and states. A review document or Maat review is distinct from operational feature/plan/check records.

If a review document or Maat review operation is unavailable, present the complete review packet in the chat and invite the user to review it there. Do not abandon already verified operational records or imply that a Maat review link exists. Treat the user's comments in chat as review feedback, not automatic approval; incorporate requested changes through supported updates and show the revised packet. Set an approved state only after the user explicitly approves and a supported operation can record that decision. If Maat review is submitted but pending, report `submitted`, not `approved`; confirm approval through a supported read before claiming it. Never present the operational records themselves as a documentary review.

## Regression safeguards

- Operational writes are available while document review is unavailable: create and read back the feature/bug, plan, and checks, then present the review packet in chat and wait for the user's review.
- Matching records already exist: reuse them, or update with the current expected version and stable operation ID; do not create duplicates.
- A required kind, create schema, `feature_id` relation, or `planned` state cannot be supported: preflight and stop before any write, naming the missing operation/field/relation.
- Document review is available: create and verify operational records first, then create/submit only supported review artifacts; distinguish operational `planned` state, review `submitted`, and explicit human approval.
- Chat review is used: capture feedback, update supported records, and show the revised packet; do not infer approval unless the user explicitly approves.
- Never set or claim `approved` without an explicit human decision; record it only through a supported operation and verify the result.

The review packet must make the proposal understandable without relying on unstated context. Include:

- proposal type and concise title;
- source conversation or PRD identity/revision and requirement coverage;
- problem/current behavior and intended outcome;
- technical scope, affected project evidence, boundaries, and dependencies;
- observable acceptance criteria and relevant failure cases;
- associated validation checks, each mapped to one or more acceptance criteria;
- real dependency edges and why each blocker is necessary;
- risks, alternatives, assumptions, and questions requiring human choice.

Before submitting, check the proposed breakdown for over-splitting and missing integration: each proposal should answer “what can a user or operator observe when this lands?” and each dependency should name the prerequisite outcome, not merely a related component. Keep the user's original requirements intact when removing an unnecessary ticket/slice.

Report the verified operational IDs, kinds, versions, statuses, and `feature_id` relations; summarize source traceability and unresolved gaps. Include a review document or link only when created and returned/verified by a supported operation. Otherwise include the review packet in chat and wait for feedback. Distinguish review feedback from explicit approval; only a confirmed human decision may authorize an approved state.

