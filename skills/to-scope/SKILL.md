---
name: to-scope
description: Turn a source document or the current conversation into a Maat scope document and make it available through supported Maat document workflows.
---

# Create a Maat scope document

Use this skill for requests such as “faça uma mudança no produto {x}”, “altere o produto”, “corrija o produto”, or “crie no produto”. Produce a **scope** document proposal (`type=scope`); do not implement product changes or record an unapproved decision.

Choose the source from the invocation:

- **Document mode:** an argument identifies a document by local path or URL. Read it as source material and identify all required new behaviors (**features**) and corrections to existing behavior (**bugs/fixes**) that belong in the scope document.
- **Conversation mode:** no document argument is supplied. Treat the current conversation as the proposal to formalize as a scope document. Clarify material gaps before finalizing requirements.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Handshake before any Maat write.

## Establish the Maat context

Confirm Maat MCP is alive. A SessionStart receipt, when exposed, is useful for listing configured skills; its absence alone does not block work when `brain_*` / search tools respond. Discover exact tool names and schemas; do not assume prefixes or capabilities. Diagnose skill load only with `skill_list` (`published` + non-empty `active_release_id`).

For repository-related claims, confirm project identity and current revision from Maat references first. Use `codebase_status` and `workspace_search` when exposed, and verify the indexed snapshot matches the revision before relying on it. Search documentary and operational sources for related scope documents, features, bugs, reviews, decisions, ADRs, and in-flight work when supported. Keep IDs/revisions and code evidence with the claims they support.

If Maat has no unambiguous reference to the project, do not infer it from the current directory, document title, repository name, or similar projects. Ask the user for the repository URL and intended branch (and access if needed). After they provide it, clone the repository into an isolated workspace and map the codebase at the checked-out commit before making project-specific claims. If Maat indexing is unavailable, label the clone as direct checkout evidence, not Codebase Memory evidence; report unknown Maat operational context separately. Never ask the user to paste credentials. Do not start index updates yourself.

Carry forward a compact project context record (canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, and gaps). Reuse it only while identity and commit match; refresh it after revision changes. Persist it through Maat only in confirmed fields/relations, otherwise keep it in the proposal/report and do not claim Maat persistence.

### Keep operational and documentary records distinct

This skill produces a **documentary** scope document via `brain_create` / `brain_update` with `type=scope` (or `operational_draft_convert` when staging a draft). Before writing, identify the actual store and operation from the active session's schema and response:

- A Maat document operation creates or updates a scope document and may return a separate review record/link. Report only the document and review states that were returned or verified. Always use `expected_sha` on updates.
- Operational records from `operational_record` are **drafts only** and cannot stand in for scope creation or documentary review. Allowed draft kinds are those in the live schema — not a substitute scope document.
- Conversely, a scope document or review does not establish that operational proposals or checks exist. Do not claim those records or relations unless verified through the correct store reads.

If scope document creation is unavailable, present the complete scope proposal in the conversation and name the missing document operation. Do not create an operational draft as a silent substitute for the requested scope unless the user asks to stage a draft and convert it. If the user separately asks to break the scope into implementation proposals, hand that stage to `to-plan` and verify its documents independently.

## Understand the request and form the scope

In document mode, resolve the URL or local path, read the document without editing it, and record its title, stable ID or path, revision marker, goals, requirements, constraints, and references. If it cannot be read or identifies multiple possible sources, ask for the missing access or identifier and stop.

Before asking the user, search the supplied source, relevant repository/docs, and Maat context for facts the agent can establish. Ask the owner only for decisions or context unavailable from those sources. Use a progressive interview: ask the next question only when its prerequisite is settled, normally one question at a time. Prefer at most three numbered options with a default when a choice is needed. Each question should state the recommended answer and why, when a recommendation is supportable. Do not ask again for information already present in the source or conversation.

Recover the problem before settling on a solution:

1. Establish the situation: is the product in use, under active construction, or not yet shipped? Is the product decision still open, or has someone already committed to the work? Treat a real commitment as context to record; do not manufacture an approval gate for a decision already made. Check what related work is in flight.
2. Identify who is affected and what they are trying to do. For a missing capability, find the current workaround and what remains impossible. For work in construction, identify what commitment or downstream work is blocked and why it needs to happen now. For a reported correction, establish current behavior and the desired behavior.
3. Ask what outcome would show the change worked, by when, and what early signal would show the direction is wrong. Seek a current baseline or an observable proxy. Never invent a metric or threshold. If measurement needs instrumentation that does not exist, mark it as a possible requirement or an unresolved question instead of pretending the result is measurable today.
4. Consider the smallest credible alternative to building the requested solution: remove a step, change a rule/default, handle an initial cohort manually, buy an existing capability, or defer. Compare alternatives only when they are viable in this context. Record the recommendation, its condition for winning, and why the other live option loses; the product owner decides.
5. Set a boundary for what this scope document answers and what remains outside it. If a high-impact decision is still unclear, keep it open and do not convert a guess into a requirement. A small, reversible change with clear agreement may need only a concise scope proposal, not a long discovery interview.

In both modes, translate the settled understanding into a scope proposal:

1. Identify the user problem, affected actors, current behavior, desired outcome, constraints, and relevant flows. Separate direct source facts from inference, recommendations, assumptions, and open questions.
2. Map each source statement or conversation need to a requirement ID and classify the delivery need as a **feature** (new behavior) or **bug/fix** (correction of existing behavior). Consolidate overlap, expose dependencies, and do not invent behavior to fill gaps.
3. Write requirements so they are identifiable and verifiable. Name actors/systems, preconditions, expected behavior, state changes, error cases, constraints, dependencies, and observable acceptance criteria when relevant. An outcome metric is not automatically a merge-time test; keep product outcomes distinct from implementation acceptance criteria.
4. Include out of scope, assumptions, unresolved questions, and decisions required from the owner. State which facts have source evidence and which are inferences. Preserve decisions already made; do not present a recommendation as an approved choice.
5. Use the canonical Maat scope template if the current installation provides one. Otherwise choose only sections needed to make the proposal self-contained, usually problem, desired outcome, users/flows, requirements, acceptance criteria, scope boundary, dependencies/risks, measurement, and open questions. Do not force empty headings into a short proposal.

Before publication, do a source-to-scope coverage pass: reread the source/request and account for every material need as a requirement, explicit out-of-scope item, or unresolved question. Check that no requirement lacks an origin, no recommendation became a commitment, and a reader who was absent from the discussion can understand the goal and how success will be recognized.

The scope document should preserve source provenance and distinguish confirmed requirements from unresolved questions. It must be understandable without relying on hidden conversation context.

## Confirm the shared understanding

Before creating or submitting the scope document, show the user a short plain-language summary of the problem, intended outcome, affected users/project, included and excluded scope, source evidence, and unresolved questions. Carry forward the user's confirmation already given in this conversation when it covers the same source revision, outcome, and scope; do not ask the same confirmation again. Ask only if the summary is new, materially changed, or leaves a consequential ambiguity. Incorporate corrections before writing. The later product review remains a separate decision gate.

## Publish and route for review

Before writing, inspect the active session's actual document operations and schemas. Confirm a supported way to create and expose a scope document (typically `brain_create` with `type=scope`, a logical path such as `scopes/….md`, plus `owner` / `repository` / provenance `sha`). Confirm relationship syntax before recording links. Markdown `[[...]]` links are documented; do not assume proposed `docs://` links work. If scope creation is unavailable, stop and show the complete proposed scope in the conversation with the exact missing capability; do not claim it is available in Maat or silently write a local substitute.

Create the scope document through the confirmed Maat operation, preserving the source document identity/revision or conversation provenance and any supported links to affected projects or existing documents. Prefer status values the live schema allows for a proposal (commonly `draft` or `final` — never invent `reviewed`/`accepted` via `brain_update`).

If a human review operation is available for a scope document, submit it through the confirmed review tools and report the returned scope and review identifiers/links. If no such operation is available, publish the scope as a proposal and state that review submission is unsupported; do not simulate a review or record a decision. Stop at human review and wait for the owner before treating proposed requirements as approved.

Treat each write response as an operation receipt: report only the document type (`scope`), identifier, revision/content SHA, links/relations, and review state actually returned or confirmed. On update conflicts, re-read with `brain_get` and retry with the new `expected_sha`. If the operation cannot return or verify an expected relation, state that limitation instead of implying a complete link.

When the reviewer requests changes, warn if the document is already `reviewed` (edit may reopen approval as `final`), update through the same confirmed Maat workflow with `expected_sha`, preserve history/provenance, and resubmit if supported. Record a decision only after the human provides one and only through a confirmed Maat operation — not via generic `brain_update` status fields.
