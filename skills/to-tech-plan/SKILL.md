---
name: to-tech-plan
description: Analyze a PRD against Maat project evidence, prepare a technical refinement for human review, and revise it after approval.
---

# Refine a PRD for technical execution

Accept a PRD argument in the form `@<url-or-path>`; use the host client's skill invocation syntax and pass the argument through unchanged. Treat the referenced PRD as read-only. Discover technical impact and ambiguity, prepare a review for the product owner, and create a new PRD version only after that review is approved.

This is technical discovery and refinement before executable planning or implementation. Preserve the product intent in the source. Do not create implementation tickets, decide product questions for the owner, start coding, or turn recommendations into commitments. Optimize for faithful, evidence-backed interpretation; never claim a numeric confidence such as 99% without a measured evaluation.

## 1. Read the source

Resolve the argument after `@` as a local path or remote document using the available file or document tools. For remote sources, use an available authorized connector or browser; do not assume a particular provider. Capture the title, stable ID, revision or last-modified marker, objectives, requirements, constraints, and references. Record the exact source location and revision evidence.

If the source cannot be read, or the argument does not identify one PRD unambiguously, ask only for the missing path, access, or identifier and stop. Never edit or replace the source document.

## 2. Resolve context before asking the owner

First use the PRD, repository, domain docs, and Maat operational records to answer factual questions. Do not spend the owner's attention on facts the available sources can establish. Identify candidate projects, systems, features, integrations, and domains from explicit requirements and user flows. Label findings as **source requirement**, **verified current behavior**, **inference**, or **unresolved**; make each inference checkable and cite its evidence.

For each affected project:

1. Discover the exact Maat tool names and schemas exposed by the active client's MCP connection. Call Maat's `codebase_status` for the exact repository path or known repository ID and branch. Use `workspace_search` for repository searches; use the available codebase find/context/trace/evidence tools to follow symbols and relationships. Do not assume client-specific prefixes or that a tool exposed by one client is available in another. Keep project identity, branch, requested/indexed SHA, file paths, line numbers, and excerpts with findings. Inspect live files when needed to confirm indexed evidence.
2. Search Maat's operational/document sources for related features, bugs, reviews, decisions, ADRs, and in-flight work. Use the available `operational_search`, `operational_get`, `operational_in_flight`, project summaries, brain context, or configured Maat document MCPs as appropriate. Record document IDs, types, revisions, and supporting excerpts. Discover tool names and schemas from the current installation; do not invent endpoints or document operations. If a source is unavailable, mark the operational context as unknown and continue only with conclusions supported by remaining evidence; block any conclusion that depends on that missing source.
3. Confirm that each project's code and document sources are available and current. If no unambiguous project reference exists in Maat, ask the user for the repository URL and intended branch/access rather than guessing. After they provide it, clone into an isolated workspace and map the codebase at its checked-out commit. Label that as direct checkout evidence; do not present it as a current Maat index. An absent, stale, unindexed, or unavailable source is not evidence of no impact. Never ask the user to paste credentials.

Carry forward a compact project context record: canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, and unresolved gaps. Reuse it while identity and commit match, refresh it after revision changes, and persist it only through confirmed Maat fields/relations. Otherwise include it in the review packet and report that it was not stored as structured Maat context.

For each requirement, trace relevant surfaces instead of stopping at the first matching component: entry points and actors; authorization and tenant boundaries; state/data ownership and lifecycle; APIs, events, and integrations; empty, invalid, and failure behavior; privacy/security; migration and compatibility; operations, observability, reliability, and performance. Record each surface as **evidence found**, **not applicable with reason**, or **unresolved**. This is a coverage sweep, not permission to add requirements the PRD does not imply.

Before giving technical conclusions or submitting a review, stop if an identified project cannot be accessed or mapped from a confirmed source, or if a conclusion depends on unavailable evidence. Name the project, missing evidence, and what the user must provide. Do not start an index update yourself or continue with unsupported conclusions. When only a product decision remains open, state the precise decision and its consequences, give a recommendation with the condition under which it wins, and ask the smallest useful question. Ask only after checking sources; ask questions whose prerequisites are settled, preferably one at a time.

## 3. Check document capabilities before drafting or writing

Read the current Maat document catalog and inspect the actual tools available in this session. The catalog may describe proposed capabilities. In particular:

- `prd` may be proposed rather than implemented. Do not infer PRD CRUD, search, versioning, or relationships from its presence in a catalog.
- A `review` may only be supported for a feature or ADR. Confirm that the current Maat workflow can associate a product review with this PRD before using it.
- Use only relationship syntax verified for the current parser. Markdown `[[...]]` links are documented; do not assume proposed `docs://` links work.
- `skill_review_publish` reviews a stateful skill execution step. It is not a product document review workflow.
- An `operational_record` for feature, bug, decision, or ADR does not create a review or PRD. Do not use an incompatible type as a substitute.

If the installed Maat has no confirmed operation to store and submit the technical review, stop and report the specific missing document operation. If no confirmed operation can create and relate a new PRD version after approval, report that limitation when it becomes relevant. Do not simulate a successful submission, publish to an unrelated destination, or write a substitute file without the user's request.

### Keep operational and documentary records distinct

The source PRD, technical review, and revised PRD are documentary artifacts. Operational `feature`/`bug`, `plan`, and `check` records describe executable work; they cannot substitute for any of those documents, for a documentary review, or for its approval. Likewise, a PRD or technical-review document does not prove operational feature/bug/check records exist.

Before reporting a document, review, or operational relation, identify its store from the live schema and verify it through a supported read. A `planned` operational status is not a review submission or approval. A review receipt is not approval until a human decision is confirmed. If the document review or revision workflow is missing, report that precise gap and keep conclusions within the available evidence; do not try to route the technical review through `operational_record`. If operational records are absent or unavailable, report that separately and do not let it invalidate a document review that is otherwise supported.

Before preparing the review, summarize in clear language what the PRD asks for, which project/revision was inspected, the affected surfaces, the technical interpretation, scope boundaries, evidence versus inference, and open decisions. Carry forward confirmation already given for the same PRD revision, project revision, and scope; do not ask the same understanding question again. Ask only when new evidence materially changes the interpretation or a consequential ambiguity remains. Incorporate corrections before writing or submitting; product review remains a separate gate.

## 4. Prepare the technical review

Once project and document coverage is verified, prepare a technical review using the actual Maat document format. Include a requirement coverage matrix with one row per source requirement and these fields: requirement ID/text; affected project/surface; current behavior; supporting source or code evidence; technical consequence; evidence class; and status (**covered**, **not applicable with reason**, or **unresolved**). Every source requirement must have a disposition; combine rows only when the shared treatment remains explicit.

The review must also include:

- PRD title, ID, source location, and source revision;
- technical summary and discovered scope;
- relevant current architecture and behavior with source references;
- candidate components and boundaries, dependencies, contracts, and data/operational impact;
- proposed acceptance criteria and failure scenarios only when they are entailed by the PRD. Map each to a source requirement or explicitly mark it as an unresolved product choice; do not silently promote an inference into a commitment;
- material security, privacy, migration, reliability, and operational risks;
- explicit facts, inferences, recommendations, assumptions, open questions, and decisions required from the owner.

For consequential technical choices, present the smallest viable set of alternatives (normally the recommended option and one credible alternative), explain trade-offs, and say what condition would make each option preferable. Do not list options you would not recommend shipping. Do not invent missing product behavior. State uncertainty and present recommendations as options, not approved decisions. Create an ADR only if discovery identifies a durable architectural decision that belongs in an ADR.

Submit the review only through a confirmed Maat document/review operation. Include the original PRD identity and revision, related projects, and evidence references. Show the user the exact review identifier or link returned by Maat, then wait for the human product review. Do not create the revised PRD before approval. Treat the operation response as a receipt. Report review type, ID, revision/status, and source/project relations only when returned or independently confirmed through a supported read; prose alone does not establish a Maat relation.

## 5. Revise only after approval

When the human reviewer responds:

- If changes are requested or the review is rejected, incorporate the feedback into the technical review and resubmit through the same supported workflow. Do not issue an approved PRD.
- If approved, incorporate the explicit decisions and feedback. Recheck technical claims affected by those decisions against current project sources and record new evidence.
- Write the revised PRD as a new document/version through a confirmed Maat PRD operation. Preserve the original. Make requirements identifiable and unambiguous for agent execution, naming actors and systems, preconditions, expected behavior, states and transitions, error scenarios, dependencies, constraints, verifiable acceptance criteria, and unresolved questions. Follow the canonical PRD template if the installation supplies one; do not force the technical-review structure onto the PRD.
- Record provenance and links to the original PRD and technical review only through confirmed Maat fields and relationship formats. If that operation is unavailable, stop and report the exact gap; do not write elsewhere or claim completion.

## Evidence discipline

Keep evidence close to each conclusion: source document revision, project/repository ID, branch and SHA, Maat document ID and revision, and file path/line or concise excerpt. Distinguish observed behavior from interpretation. Report source-access, indexing, and document-workflow limits explicitly; never treat missing evidence as proof of no impact.
