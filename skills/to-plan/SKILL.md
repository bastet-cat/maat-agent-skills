---
name: to-plan
description: Turn decided product requirements into evidence-grounded Maat feature or bug proposals with traceable checks for human review.
---

# Plan Maat implementation proposals

Use this skill when asked to plan/specify a feature or fix, including “planeje a feature {x}”, “monte um plano”, or “especifique um feature/bug”. Keep the result as a proposal for human review. Do not implement it or record an unapproved decision.

Choose the input mode from the invocation:

- **PRD mode:** an argument identifies a PRD document. Read it as the scope source and map its requirements to all technically necessary feature and/or bug proposals.
- **Conversation mode:** no document argument is supplied. Use the current conversation as the request context and prepare a proposal for the needed feature or bug. Do not assume an absent PRD.

## Establish the Maat context

Check whether the active client exposes a Maat SessionStart receipt and tools. If unavailable, say so; continue source-based read-only analysis, but stop before Maat writes or claims about Maat state that cannot be verified. If a receipt is exposed, confirm every configured skill loaded. Discover exact tool names and schemas; never assume a prefix or a capability exposed by another client.

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

## Submit proposals for human review

Before writing, inspect the actual Maat document catalog, available document operations, relationship syntax, and review workflow. The catalog describes `prd` and `check` as proposed capabilities; do not infer PRD CRUD, check documents, or relationships from catalog text. Markdown `[[...]]` links are documented; do not assume proposed `docs://` links are supported. A skill execution review is not a product proposal review.

Create a Maat `feature` or `bug` proposal and its validation checks through confirmed Maat operations, preserving source/related-document links only through confirmed fields and relationship formats. Associate every check with the proposal and retain its criteria traceability. The catalog currently lists `check` as a proposed artifact, not an implemented document type. If the active Maat session has no confirmed mechanism to create and associate checks, stop before creating the feature/bug and report the exact missing capability; do not treat a prose-only list or unrelated document type as an integrated check record. Then submit each proposal to the supported human product-review workflow. The catalog currently describes `review` as associated with a feature or ADR; confirm whether the installed workflow supports reviewing a bug proposal and relating PRD-originated proposals. If any required create, check, relationship, or review operation is unavailable, stop and report the exact missing capability. Do not claim a proposal was submitted, substitute a local file, or record a decision on behalf of the reviewer.

For every write, retain an operation receipt with returned proposal/check IDs, type, revision/status, and confirmed source, proposal, and criterion relations. Verify those links through a supported read when available. If the Maat contract cannot create or expose the required relation, report the precise gap and do not describe the check as integrated.

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

After submission, show the user each proposal and review identifier/link returned by Maat, its source traceability, and any unresolved gap. Stop at human review. A later review response can drive proposal edits; only a human decision may authorize the next state in the document flow.

