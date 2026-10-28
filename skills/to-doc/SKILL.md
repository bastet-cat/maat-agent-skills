---
name: to-doc
description: Analyze a repository's architecture and quality, then create evidence-grounded project documentation in Maat memory. Use when asked for a deep codebase assessment, prioritized backlog, engineering workflow, coding conventions, agent configuration guidance, or project overview.
---

# To Doc

Analyze the selected repository and create or update its project documentation in Maat's document memory. The expected deliverables are `backlog`, `workflow`, `conventions`, and `configs`; after validating them, create a complete document of type `project`.

## Required agent mode

Run this skill only in the agent's Plan mode. At invocation, confirm that Plan mode is active and keep it active through repository analysis, document preparation, Maat writes, and validation. If the agent is in another mode, switch to Plan mode before continuing; if the runtime does not expose a mode switch, stop before doing the documentation work and ask the user to relaunch or switch the agent to Plan mode. Do not continue this workflow in another mode.

## Establish repository evidence

1. Call `codebase_status` with the repository path and intended branch. Record `repo_id`, branch, `indexed_sha`, `stale`, and `dirty` before analyzing.
2. When the index is stale, or a search reports indexing/incomplete results, use `codebase_update` with the reported operation identity and target SHA when available, or allow the active `workspace_search` indexing operation to finish. Repeat `codebase_status` until `stale=false` before making claims about indexed structure. Do not start a duplicate update while one is active.
3. Use Maat's indexed search and symbol/relationship map before local search. `workspace_search(query)` is the canonical ranked full-text search over the snapshot (FTS BM25), with freshness, pagination, and compact snippets. `codebase_find(query)` locates files, symbols, routes, handlers, and configuration; inspect its returned `method` because a result can be textual or parser-backed. `codebase_how(module?)` summarizes modules, entrypoints, and flows; `codebase_context(key)` follows a file/symbol record and adjacent relationships; `codebase_evidence(key)` supplies source locations and provenance. For dependency analysis, use `codebase_impact(target)` and `codebase_trace(from, to)` to inspect observed graph edges and paths, labeling AST/parser provenance when returned and separating it from inference. Keep Maat provenance (`repo_id`, branch, SHA, freshness, and retrieval method) attached to evidence.
4. Read local files only to inspect uncommitted changes when `dirty=true`, or to inspect a file or passage Maat located. Label that as direct checkout evidence and do not silently merge it with indexed evidence. Do not use shell `grep`/`rg` as the default repository search.
5. If repository identity, branch, or freshness cannot be established, state the limitation and avoid presenting unverified codebase claims as current.

## Analyze and prioritize

Build a repository-wide assessment grounded in the available evidence. Cover architecture and major flows, code organization, conventions, quality risks, and maintainability. Identify `TODO`, `FIXME`, and `HACK` markers, group duplicates or related themes, and assess whether each is actionable, stale, or needs owner/context confirmation. Do not infer that a marker is a defect without evidence.

Categorize findings by severity using impact and likelihood: critical, high, medium, or low. For each finding record its evidence (path and symbol or line where available), observed behavior or risk, impact, confidence, and a concrete recommended activity. Separate confirmed defects from risks, opportunities, and unknowns. Avoid duplicating the same root cause across findings.

Measure a quality baseline using metrics that the repository evidence can support. State the measurement method, scope, snapshot SHA, and limitations for each metric. Prefer reproducible counts or proportions such as test/build/lint coverage signals, TODO-family counts, high-severity finding counts, and relevant complexity or duplication indicators when available. Mark unavailable metrics as unknown; do not invent scores or imply that a static review proves runtime quality.

Group recommended work into dependency-ordered waves. Make prerequisites explicit, preserve traceability from each backlog activity to findings and evidence, and identify sequencing assumptions. Keep the backlog actionable with outcomes, dependencies, priority/severity, and a verification approach. Do not implement fixes as part of this documentation task.

## Create project documents

Use the active Maat tool schemas and document lifecycle guidance (discover via `maat_mcp_tools`/`help` when needed). Identify the target project and document profile/scope explicitly. Do not guess document paths, accepted document types, or lifecycle operations. Read existing documents first; update them with the supported optimistic-concurrency mechanism, preserving unrelated content and review state.

Create or update these project-memory documents:

- `backlog`: prioritized, dependency-ordered activities grouped into waves, with severity, evidence links, expected outcome, dependencies, and validation criteria.
- `workflow`: recommended development workflow grounded in the observed build, test, review, release, and contribution paths; mark gaps where repository evidence is absent.
- `conventions`: observed coding and repository conventions, separating established patterns from recommendations and noting exceptions.
- `configs`: agent configuration guidance or proposed configuration files, grounded in repository/tooling evidence. Clearly label proposed settings; do not write configuration files into the repository unless the user separately asks for implementation.

After those documents are complete, cross-check that all four exist in the intended project memory, are mutually consistent, and include accurate provenance and uncertainty. Check backlog traceability and dependency order; ensure workflow and conventions match repository evidence; ensure configs are explicitly observed or proposed. Correct material gaps before proceeding.

Then create a complete document of type `project` using the supported Maat document operation. Summarize purpose, architecture, key components and flows, technologies, conventions, quality baseline, major risks, and evidence limitations. Include a dedicated `Project documents` section containing navigable links to `backlog`, `workflow`, `conventions`, and `configs` using the link syntax supported by Maat's document system; verify each target resolves. If Maat supports typed document relations, also relate each base document to the project document, but do not substitute relations or plain path mentions for the links in the project body. Include repository identity, branch, indexed SHA, freshness, and open questions. Do not mark documents reviewed/accepted or record human approval unless the user explicitly provides that decision through the supported workflow.

### Architecture views for the project document

Add an architecture section with diagrams grounded in the inspected repository. Cover each of these views: class, object, component, deployment, package, composite structure, profile, use case, sequence, activity, state machine, communication, timing, and interaction overview. Put every diagram in a fenced Mermaid block inside its Markdown document. Use Mermaid's native diagram syntax where it fits; for UML views Mermaid does not model directly, create a Mermaid flowchart or other suitable Mermaid view and label it as an approximation of that UML view. Do not substitute PlantUML, image attachments, or plain-text diagrams.

Derive participants, relationships, states, deployments, constraints, and flows from codebase evidence. Label inferred or conceptual elements and cite the evidence snapshot. Do not fabricate detail to make a diagram appear complete: when a view is genuinely inapplicable or evidence is insufficient, include the view heading and state why, what is unknown, and which evidence would resolve it. Keep diagrams readable and scoped to the major architecture; split large views by bounded context or flow. Check that names and relationships agree across diagrams and with the four base documents.

## Final validation and report

Read back the persisted documents and validate consistency, completeness, document type, target project, and provenance. Resolve inconsistencies or report the exact unresolved gap; do not claim successful persistence without a confirmed tool result. Summarize the baseline, highest-priority waves, document paths, evidence snapshot, and remaining unknowns to the user.
