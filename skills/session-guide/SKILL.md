---
name: session-guide
description: Guide agents through Maat session checks, repository context, and skill assets.
---

# Maat session guide

Use Maat's published skill registry and Codebase Memory as the source of operational context when those MCP tools are available.

## Maat session contract

Before Maat-dependent work, follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md` in this package. Never continue on partial discovery success.

## Check session initialization

1. Run the bootstrap handshake (alive check + Invalid session ID recovery once if needed) and announce objective / artifacts / non-goals.
2. Discover whether the active client exposes a Maat SessionStart receipt. Its absence alone does not block read-only work when Maat MCP tools respond.
3. If a receipt is exposed, confirm it reports loaded skills and names configured skill IDs. Diagnose missing IDs only with `skill_list`: require `status=published` and non-empty `active_release_id`. Do **not** call `skill_resolve`, do not require `usable=true`, and do not fall back to candidate or historical releases.
4. If no receipt and Maat registry tools are unavailable, state that limitation. Continue read-only analysis from sources the user supplied, labeling provenance. Do not claim registry/session state, and stop before any Maat write that cannot be verified.

## Select repository context

For repository work, confirm project identity and revision from explicit Maat references with `codebase_status`. Use `workspace_search` for structural searches when available and verify that the returned snapshot matches the requested revision. Never infer that the current checkout is the target from its directory name, open tabs, or a similar project name.

## Navigate the codebase

Prefer Maat Codebase Memory navigation tools over shell text-search commands when exploring a repository:

1. Use `codebase_find` to locate files, symbols, routes, handlers, and configuration.
2. Use `codebase_how` to understand modules, entrypoints, and flows.
3. Use `codebase_context` and `codebase_evidence` to inspect a result and its supporting source evidence.
4. Use `workspace_search` for literal or structural text searches across the indexed snapshot.

Do not default to `grep`, `rg`, or `pgrep` for repository navigation. Use them only when the needed file or text is not represented in Codebase Memory (for example, an unindexed or newly created local file), or when a Maat navigation tool is unavailable or cannot answer the question. Check `codebase_status` first when results may be stale; do not treat an unavailable or stale index as current evidence. Clearly label any shell-search result as local checkout evidence.

If Maat has no unambiguous project reference, ask the user for the repository URL and intended branch/access. After they provide it, clone into an isolated workspace and map the codebase at the checked-out commit. Label that as direct checkout evidence, not Codebase Memory evidence; state separately which Maat operational context is still unknown. Never present an unavailable or stale index as current evidence, request credentials in chat, or start an index update yourself.

For a project mapped during the current conversation, carry forward this compact record (omit fields that do not apply):

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

Reuse it only while repository identity, branch, and baseline commit match; refresh it when any of them changes. Pass it between workflow stages in supported document fields/relations when available, otherwise include it in the working proposal or report. Do not claim it was persisted in Maat without a confirmed field or operation. Mark fields as unknown rather than filling them from directory names or inference.

Before a skill acts on a project, summarize the identified project, revision, goal, relevant evidence, scope, and open questions in plain language. If the user already confirmed this same project, revision, goal, and scope in the current conversation, carry that confirmation forward without asking again. Ask for confirmation when the understanding is new, materially changed, or still ambiguous; incorporate corrections before dependent work begins. Keep this understanding check separate from any later product review or decision gate.

## Resolve skills and assets

Resolve a skill by its registered ID using only the bootstrap discovery procedure (`skill_list` → paginated `resources/list` → `_manifest` → `resources/read` → digest checks → `skill_list` revalidation). Read only content from that published active release. For package scripts, fetch the asset from that exact release, verify size and SHA-256 against the manifest, preserve its relative path, and execute the script when the task requires it.

Do not assume `Mcp-Session-Id` on `/mcp/2026`. Do not treat `clientInfo` as authorization. Do not reuse session or thread IDs from examples or another conversation as Maat transport identity.
