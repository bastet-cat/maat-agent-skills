---
name: integrate-to
description: Integrate current work into a named target branch by running diff-review, fixing every actionable finding, shipping against that branch, and generating a release candidate when the repository defines how.
---

# Integrate current work into a target branch

Use this skill when asked to integrate into a branch, including `/integrate-to {branch}`, “integre na branch X”, or “ship against Y after review”. The required argument is the **integration target branch name** (for example `main`, `develop`, or `release/1.2`). Do not invent a target when the argument is missing; ask for the branch name and stop.

This skill prepares reviewable delivery onto the named branch. It does not implement unfinished product scope; unfinished approved work belongs to `to-implement` first.

## Maat session contract

Follow `references/maat-mcp-bootstrap.md` and `references/maat-session-friction.md`. Handshake before any Maat write. Offer ≤3 options with a default when the path forks. Load companion skills (`diff-review`, `ship`) only via bootstrap discovery (`published` + `active_release_id` + manifest + revalidation). Commit, push, PR, merge, and release-candidate mutations require explicit user authorization for each class of action; never assume push or production promotion.

## 1. Resolve the integration target

1. Parse the branch argument exactly. Resolve it as a local or remote ref (`git fetch` as needed). Prefer `origin/<branch>` when a remote tracking ref exists.
2. Confirm repository identity from Maat references or the user's explicit project/repo context. If Maat has no unambiguous repository reference and the user has not identified the project, ask for the repository URL and intended access; do not guess from a similar directory name.
3. Record current branch, HEAD SHA, working-tree state, and the resolved target base SHA. The named branch is the **canonical base** for review and for `ship`.
4. Restate in plain language: what will be integrated, the target branch/SHA, and that findings will be fixed before shipping. Carry forward confirmation already given for the same target and revision; ask only when the target is new, changed, or ambiguous.

## 2. Diff-review against the target branch

Load and follow the published `diff-review` skill with the named branch as the explicit base. Review the complete current checkout versus that base (committed range plus tracked staged/unstaged changes, and untracked non-ignored files enumerated separately).

Completion criterion for this step: a severity-ordered findings list (or an explicit empty-findings statement) with `file:line`, trigger, failure mode, and smallest practical fix for each item.

`diff-review` itself is read-only. This skill continues into remediation; do not stop at the report when findings exist.

## 3. Fix every actionable finding

Apply the smallest complete fix for each high- and medium-confidence finding from the review. Prefer the review's stated smallest practical fix. Re-read surrounding callers and contracts before editing. Do not expand into unrelated cleanup.

After fixes:

1. Re-run the same diff-review scope against the same target branch.
2. Repeat fix → re-review until there are no remaining actionable high/medium findings, or until a finding requires a product/architecture decision outside current authorization — then stop, report the blocker, and do not ship.
3. Low-severity items may remain only when documented for the ship packet with mitigation; do not silently drop high/medium findings.

Run repository-required local gates that the fixes touch. Record commands and outcomes against the resulting SHA.

## 4. Ship against the integrated branch

Load and follow the published `ship` skill with these bindings:

- Canonical base / PR base = the named integration branch from step 1.
- Delivery scope = the reviewed and fixed change set intended for that base.
- Reconcile, review, validate, commit, push, and PR only as far as the user has authorized each action.

Do not open a PR against a different base. If an existing PR targets the wrong base, follow `ship`'s replacement/update rules so the delivered PR uses the named integration branch. Keep Maat proposal/check/validation linkage when those records apply; for tooling-only changes without a Maat proposal, use the user's explicit request and repository validation instructions as scope evidence.

## 5. Release candidate when the repository defines one

After a successful ship path (or after local validation when the user authorized RC without a PR), inspect the repository for an **existing** release-candidate definition. Look only for concrete project evidence, for example:

- documented RC procedure (`README`, `CONTRIBUTING`, `docs/release*`, `AGENTS.md`);
- scripts or Make/Just targets named for release candidate / RC / pre-release;
- package or CI workflows that publish or tag an RC (`workflow_dispatch` inputs, `npm version prerelease`, goreleaser RC configs, changelog RC targets).

If such a definition exists and the user authorized release-candidate generation (an explicit `/integrate-to` request that includes RC, or a clear “generate RC” ask), execute that repository procedure exactly. Record the commands, resulting tag/version/artifact, and target branch/SHA.

Rules:

- Absence of an RC definition means skip RC and say so; do not invent a versioning or publishing scheme.
- An RC request does not authorize production promotion, force-push to protected branches, or mutating production deploy workflows.
- Before running any workflow that could affect production, inspect triggers, jobs, permissions, and effects; execute only the RC path the repo defines.

## Close-out

Report:

- target branch and base SHA used;
- review findings fixed (and any deferred lows/blockers);
- ship actions taken (commit / push / PR URL) and validated SHA;
- RC result or explicit “no RC definition / RC not authorized”;
- Maat artifact references when applicable.

Prefer machine-readable overall labels: `INTEGRATED`, `INTEGRATED_WITH_GAPS`, or `NOT_INTEGRATED`, with only real blockers named.
