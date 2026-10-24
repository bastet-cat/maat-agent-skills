---
name: session-guide
description: Guide agents through Maat session checks, repository context, and skill assets.
---

# Maat session guide

Use Maat's published skill registry and Codebase Memory as the source of
operational context when those MCP tools are available.

## Check session initialization

1. Discover whether the active client exposes a Maat SessionStart receipt.
2. If exposed, confirm it reports `N/N` loaded skills and names every
   configured skill ID. If initialization is incomplete, do not continue with
   Maat-dependent repository or stateful workflow work; diagnose listed IDs
   with `skill_list` and `skill_resolve`, using only releases whose status is
   `published` and `usable=true`.
3. If no receipt or Maat registry tools are exposed, state that limitation.
   Continue read-only analysis from sources the user supplied or explicitly
   identified, labeling their provenance. Do not claim registry/session state,
   and stop before any Maat write or state transition that cannot be verified.

## Select repository context

For repository work, confirm project identity and revision from explicit Maat
references with `codebase_status`. Use `workspace_search` for structural
searches when available and verify that the returned snapshot matches the
requested revision. Never infer that the current checkout is the target from
its directory name, open tabs, or a similar project name.

If Maat has no unambiguous project reference, ask the user for the repository
URL and intended branch/access. After they provide it, clone into an isolated
workspace and map the codebase at the checked-out commit. Label that as direct
checkout evidence, not Codebase Memory evidence; state separately which Maat
operational context is still unknown. Never present an unavailable or stale
index as current evidence, request credentials in chat, or start an index
update yourself.

For a project mapped during the current conversation, carry forward this
compact record (omit fields that do not apply):

```yaml
project_context:
  repository: canonical URL or explicit local path
  maat_project_id: confirmed ID or unknown
  branch: confirmed branch or unknown
  baseline_commit: full SHA or unknown
  evidence_source: maat_index | direct_checkout | user_document
  mapped_at: timestamp or unknown
  surfaces_and_contracts: evidence-backed paths, symbols, or interfaces
  unresolved_gaps: questions or unavailable sources
```

Reuse it only while repository identity, branch, and baseline commit match;
refresh it when any of them changes. Pass it between workflow stages in supported document
fields/relations when available, otherwise include it in the working proposal
or report. Do not claim it was persisted in Maat without a confirmed field or
operation. Mark fields as unknown rather than filling them from directory
names or inference.

Before a skill acts on a project, summarize the identified project, revision,
goal, relevant evidence, scope, and open questions in plain language. If the
user already confirmed this same project, revision, goal, and scope in the
current conversation, carry that confirmation forward without asking again.
Ask for confirmation when the understanding is new, materially changed, or
still ambiguous; incorporate corrections before dependent work begins. Keep
this understanding check separate from any later product review or decision
gate.

## Resolve skills and assets

Resolve a skill by its registered ID. Read only content from a published,
usable release. For package scripts, fetch the asset from that exact release,
check the returned commit and digest, preserve its relative path, and execute
the script when the task requires it.

For stateful Maat workflows, use the current session and the origin metadata
provided by the active client. Never reuse session or thread IDs from examples
or another conversation.
