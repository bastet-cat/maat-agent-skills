---
name: to-tech-plan
description: Analyze a scope document against Maat project evidence, prepare a technical refinement for human review, and revise it after approval.
---

# Refine a scope document for technical execution

Accept a scope-document argument in the form `@<url-or-path>`; use the host client's skill invocation syntax and pass the argument through unchanged. Treat the referenced scope document as read-only. Discover technical impact and ambiguity, prepare a review for the product owner, and create a new scope document version only after that review is approved.

This is technical discovery and refinement before executable planning or implementation. Preserve the product intent in the source. Do not create implementation tickets, decide product questions for the owner, start coding, or turn recommendations into commitments. Optimize for faithful, evidence-backed interpretation; never claim a numeric confidence such as 99% without a measured evaluation.

This skill does not create feature/bug/plan/check **product documents**. It prepares a technical review and, after explicit approval, a refined scope document. Use `to-plan` after the product scope and technical refinement are ready when the user wants executable feature/bug documents.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Prefer published `maat-session-bootstrap` when discoverable; otherwise use local references. Handshake before any Maat write.

## 1. Read the source

Resolve the argument after `@` as a local path or remote document using the available file or document tools. For remote sources, use an available authorized connector or browser; do not assume a particular provider. Capture the title, stable ID, revision or last-modified marker, objectives, requirements, constraints, and references. Record the exact source location and revision evidence. For Maat-stored scope documents, use `brain_get` on the logical path (with `.md` when it is a project document) and keep the content SHA.

If the source cannot be read, or the argument does not identify one scope document unambiguously, ask only for the missing path, access, or identifier and stop. Never edit or replace the source document.

## 2. Resolve context before asking the owner

First use the scope document, repository, domain docs, and Maat documentary/operational records to answer factual questions. Do not spend the owner's attention on facts the available sources can establish. Identify candidate projects, systems, features, integrations, and domains from explicit requirements and user flows. Label findings as **source requirement**, **verified current behavior**, **inference**, or **unresolved**; make each inference checkable and cite its evidence.

For each affected project:

1. Discover the exact Maat tool names and schemas exposed by the active client's MCP connection. Call Maat's `codebase_status` for the exact repository path or known repository ID and branch. Use `workspace_search` for repository searches; use the available codebase find/context/trace/evidence tools to follow symbols and relationships. Do not assume client-specific prefixes. Keep project identity, branch, requested/indexed SHA, file paths, line numbers, and excerpts with findings. Inspect live files when needed to confirm indexed evidence.
2. Search Maat documentary and operational sources for related features, bugs, reviews, decisions, ADRs, and in-flight work. Use `brain_get` / document search, `operational_search`, `operational_get`, `operational_in_flight`, project summaries, or brain context as appropriate. Record document IDs, types, content SHAs/revisions, and supporting excerpts. Do not invent endpoints. If a source is unavailable, mark that context unknown and continue only with conclusions supported by remaining evidence; block any conclusion that depends on that missing source.
3. Confirm that each project's code and document sources are available and current. If no unambiguous project reference exists in Maat, ask the user for the repository URL and intended branch/access rather than guessing. After they provide it, clone into an isolated workspace and map the codebase at its checked-out commit. Label that as direct checkout evidence; do not present it as a current Maat index. An absent, stale, unindexed, or unavailable source is not evidence of no impact. Never ask the user to paste credentials.

Carry forward a compact project context record: canonical repository/project identity, branch, commit SHA, evidence source, mapping time, relevant surfaces/contracts, and unresolved gaps. Reuse it while identity and commit match, refresh it after revision changes, and persist it only through confirmed Maat fields/relations. Otherwise include it in the review packet and report that it was not stored as structured Maat context.

For each requirement, trace relevant surfaces instead of stopping at the first matching component: entry points and actors; authorization and tenant boundaries; state/data ownership and lifecycle; APIs, events, and integrations; empty, invalid, and failure behavior; privacy/security; migration and compatibility; operations, observability, reliability, and performance. Record each surface as **evidence found**, **not applicable with reason**, or **unresolved**. This is a coverage sweep, not permission to add requirements the scope document does not imply.

Assess whether the scope document describes one coherent product outcome or several distinct outcomes/initiatives, and whether its actors, constraints, and success conditions are sufficiently decided for technical refinement. If it combines independent initiatives or leaves consequential product choices unresolved, tell the user what is broad or undecided and recommend refining/splitting the scope with `to-scope` before presenting a technical design as ready for review. Pause conclusions that depend on those choices. A technically complex but coherent and decided requirement does not need another scope document solely because implementation may be large; document the complexity and risks in the review.

Before giving technical conclusions or submitting a review, stop if an identified project cannot be accessed or mapped from a confirmed source, or if a conclusion depends on unavailable evidence. Name the project, missing evidence, and what the user must provide. Do not start an index update yourself or continue with unsupported conclusions. When only a product decision remains open, state the precise decision and its consequences, give a recommendation with the condition under which it wins, and ask the smallest useful question (at most three options with a default). Ask only after checking sources; ask questions whose prerequisites are settled, preferably one at a time.

## 3. Check document capabilities before drafting or writing

Read the current Maat tools and schemas in this session. Catalog text may describe proposed capabilities. In particular:

- Do not infer scope CRUD, search, versioning, or relationships from catalog prose alone — confirm live `brain_*` / review tools.
- Confirm that the current Maat workflow can associate a product review with this scope document before using review tools.
- Use only relationship syntax verified for the current parser. Markdown `[[...]]` links are documented; do not assume proposed `docs://` links work.
- Skill-execution review tools (if any) are not a product document review workflow.
- `operational_record` creates drafts only and does not create a review or scope document. Do not use an incompatible type as a substitute.

If the installed Maat supports creating a review document but not submitting it for review, create and verify the document with `brain_create` / `brain_update` + `expected_sha`, then present its review packet in chat and invite the user to review it there. If document creation is unavailable, present the complete packet in chat instead. Continue only with conclusions supported by available evidence; do not claim a Maat review link exists unless a review operation returns one. If no confirmed operation can create and relate a new scope version after approval, report that limitation when it becomes relevant. Do not simulate a successful submission, publish to an unrelated destination, or write a substitute file without the user's request.

### Keep operational and documentary records distinct

The source scope, technical review, and revised scope are documentary artifacts. Operational drafts describe in-flight memory; they cannot substitute for those documents, for a documentary review, or for its approval. Likewise, a scope or technical-review document does not prove feature/bug/check documents exist.

Before reporting a document, review, or operational relation, identify its store from the live schema and verify it through a supported read. A draft operational status is not a review submission or approval. A review receipt is not approval until a human decision is confirmed. If the document review or revision workflow is missing, report that precise gap and keep conclusions within the available evidence; do not try to route the technical review through `operational_record`. If operational records are absent or unavailable, report that separately and do not let it invalidate a document review that is otherwise supported.

Before preparing the review, summarize in clear language what the scope document asks for, which project/revision was inspected, the affected surfaces, the technical interpretation, scope boundaries, evidence versus inference, and open decisions. Carry forward confirmation already given for the same scope revision, project revision, and scope boundary; do not ask the same understanding question again. Ask only when new evidence materially changes the interpretation or a consequential ambiguity remains. Incorporate corrections before writing or submitting; product review remains a separate gate.

## 4. Prepare the technical review

Once project and document coverage is verified, prepare a technical review using the actual Maat document format. Include a requirement coverage matrix with one row per source requirement and these fields: requirement ID/text; affected project/surface; current behavior; supporting source or code evidence; technical consequence; evidence class; and status (**covered**, **not applicable with reason**, or **unresolved**). Every source requirement must have a disposition; combine rows only when the shared treatment remains explicit.

The review must also include:

- Scope title, ID, source location, and source revision/content SHA;
- technical summary and discovered scope;
- relevant current architecture and behavior with source references;
- candidate components and boundaries, dependencies, contracts, and data/operational impact;
- proposed acceptance criteria and failure scenarios only when they are entailed by the scope document. Map each to a source requirement or explicitly mark it as an unresolved product choice; do not silently promote an inference into a commitment;
- material security, privacy, migration, reliability, and operational risks;
- explicit facts, inferences, recommendations, assumptions, open questions, and decisions required from the owner.

For consequential technical choices, present the smallest viable set of alternatives (normally the recommended option and one credible alternative), explain trade-offs, and say what condition would make each option preferable. Do not list options you would not recommend shipping. Do not invent missing product behavior. State uncertainty and present recommendations as options, not approved decisions. Create an ADR only if discovery identifies a durable architectural decision that belongs in an ADR.

When supported, create a documentary review artifact with the original scope identity/revision, related projects, and evidence references. Submit it through the confirmed Maat review operation only if that operation is available and accepts the artifact. Show the returned review identifier/link when one exists. If review submission is unavailable, present the document's review packet in chat and wait for the user's feedback. If document creation is unavailable, present the complete packet in chat. Chat review is a valid human review route, but it is not a Maat document/review record. In either route, do not create the revised scope document until the user explicitly approves the technical refinement. Treat tool responses as receipts; report Maat review type, ID, content SHA/status, and relations only when returned or independently confirmed. Do not infer approval from feedback, silence, or an operational draft.

## 5. Revise only after approval

When the human reviewer responds:

- If changes are requested or the review is rejected, incorporate the feedback into the technical review and resubmit through the same supported workflow (always `expected_sha` on updates). Do not issue an approved scope document. Warn before editing a `reviewed` document.
- If approved, incorporate the explicit decisions and feedback. Recheck technical claims affected by those decisions against current project sources and record new evidence.
- Write the revised scope document as a new document/version through a confirmed Maat operation with `type=scope` (`brain_create` or supported versioning). Preserve the original. Make requirements identifiable and unambiguous for agent execution, naming actors and systems, preconditions, expected behavior, states and transitions, error scenarios, dependencies, constraints, verifiable acceptance criteria, and unresolved questions. Follow the canonical scope template if the installation supplies one; do not force the technical-review structure onto the scope document. Never set `reviewed`/`accepted` via `brain_update`.
- Record provenance and links to the original scope document and technical review only through confirmed Maat fields and relationship formats. If that operation is unavailable, stop and report the exact gap; do not write elsewhere or claim completion.

## Evidence discipline

Keep evidence close to each conclusion: source document revision/content SHA, project/repository ID, branch and git SHA, Maat document path and content SHA, and file path/line or concise excerpt. Distinguish observed behavior from interpretation. Name which SHA you are aligning (git provenance vs Maat content SHA). Report source-access, indexing, and document-workflow limits explicitly; never treat missing evidence as proof of no impact.
