---
name: ship
description: Prepare completed Maat implementation work for reviewable delivery by reconciling scope and base, reviewing and validating the exact result, then committing, pushing, or opening a pull request only when explicitly requested.
---

# Ship completed Maat work

Use this skill after implementation is complete and the user asks to commit, push, open a pull request, or ship the change. Prepare a reviewable delivery from verified scope and validation evidence. This skill does not implement unfinished product work; use the approved implementation workflow first.

Follow the stages below in order. Do not open a new PR until the branch is reconciled with the current canonical base, the complete reconciled diff is reviewed, and local gates have run against the exact resulting SHA. A large diff or a branch behind its base is work to reconcile, not a reason by itself to stop.

## 1. Reconcile scope and authorization

Before changing Git state or remote services, inventory and record:

- Repository identity, current branch, HEAD SHA, configured remotes/upstream, and candidate base branch.
- Commits on the branch and their relationship to the candidate base.
- Staged, unstaged, and untracked paths (`git status --short`; inspect staged and unstaged diffs separately).
- Existing PRs for the branch, their base/head, review state, and checks. Use `gh pr list/view` when GitHub CLI is available; otherwise use the repository's configured PR interface. If neither is available, state the limitation.
- Applicable local changes, proposal/check records, and validation evidence.

Reconcile changed paths and intended commit with the approved proposal and linked checks. For skill, documentation, and workflow-tooling contributions without an applicable Maat proposal, use the user's explicit request and the repository's validation instructions as scope and evidence; do not invent product records or approvals.

Ask only when scope or authorization is materially ambiguous. If the user says all current changes belong to this work, treat every current staged, unstaged, and untracked change as authorized scope; do not discard, omit, or stop merely because there are many files. If there is concrete evidence of unrelated work, name the exact paths and propose a practical separation (for example, commit the requested paths and leave named unrelated paths untouched, or move the unrelated work to a separate branch/worktree). Do not mutate or discard the unrelated work while its ownership is unclear. A list of many files alone is not evidence of mixed scope.

Before any Maat write, confirm the Maat MCP connection with a short read such as `skill_list` or `brain_get`. If the client reports an invalid session, follow its documented recovery once; do not mix transport/session mechanisms. Then state, in three short lines, the objective, artifacts to be touched, and non-goals. Discover live tool names and schemas from the active Maat connection. Read the approved feature or bug, linked checks, review/decision state, and validation records from authoritative Maat stores. Confirm human review and decision, check ownership, and validation records tied to the implementation revision. Operational drafts are notes, not approvals. If a required relation/state cannot be verified, stop before dependent delivery mutations and report the exact missing evidence. Do not claim Maat records are closed from chat summaries alone. Preserve the distinction between document content SHA, Git commit SHA, and provenance SHA.

For Maat writes, use the current document SHA with `expected_sha`; on conflict, reread and reassess. Never set `reviewed` or `accepted` through a generic document update. Warn before editing an already reviewed document because that can reopen approval. If required validation is not recorded, use the supported validation path before delivery. Do not reuse evidence for an older implementation SHA.

Before staging, summarize in at most five bullets what will enter the commit and what will stay out. Stage selected paths only; never blindly stage the whole tree. Exclude secrets and generated artifacts unless they are an intentional, reviewed deliverable. Use a descriptive feature branch, not `main`, `master`, or `develop`. Do not rewrite shared history or force-push without explicit authorization and a compatible repository policy. Do not use `--no-verify` or add `Co-Authored-By` trailers. Follow repository instructions and hooks.

## 2. Reconcile the branch with its base

This stage is mandatory before opening a new PR and before updating an existing PR. Determine the canonical base from repository configuration or the existing PR. If it remains materially ambiguous, ask which base is intended. Fetch current remote refs (`git fetch <remote> --prune`) and compare the complete branch to the current base SHA, not a stale local tracking ref. Record base and head SHAs and inspect the full commit and file differences.

Check whether branch commits are already integrated, equivalent, or superseded in the current base. Use ancestry and patch/content comparison (for example `git merge-base`, `git log`, `git cherry`, and targeted diff inspection) to avoid reapplying work already present. If all intended work is already in base, do not create a duplicate PR; report the evidence and reconcile any remaining local changes.

If the branch is behind or diverged, reconcile before PR creation/update:

1. Prefer a true rebase onto the fetched canonical base when repository policy allows it. A successful rebase must leave the feature commits based on the current base SHA; a merge commit is not a rebase.
2. Preserve an already published remote branch. Do not force-push rewritten published history without explicit user authorization and repository policy permitting it.
3. If published history cannot be rewritten, create a replacement feature branch from the current base and reapply only the intended, non-duplicated work (for example with carefully selected cherry-picks). Validate the replacement first; only after its PR is ready may it replace the old PR.
4. Use a merge from base only when repository policy or concrete context justifies merge instead of rebase. Describe it accurately as a merge; never claim it was rebased.

If the user says the PR targets the wrong base or was not rebased, treat that as direction to inspect and correct the branch and PR. Do not substitute “mergeable” for the requested base reconciliation. Never open a provisional PR to discover staleness or conflicts. Before proceeding, confirm the reconciled branch contains the current base SHA as its base/ancestor as appropriate, has no unresolved operation, and includes the intended changes exactly once.

## 3. Resolve conflicts consciously

Before resolving conflicts, list each affected path and classify it as code, schema/migration, workflow, tests, documentation, or catalog/data. Inspect the base and feature versions and relevant surrounding history. Do not apply `ours`, `theirs`, `-X ours`, or `-X theirs` globally without path-by-path evidence that both sides' behavior is preserved.

- For code and schema, combine intent from both sides and preserve recent base fixes.
- For migrations, keep journal/order coherent; check that new migrations neither duplicate nor reorder base migrations and preserve existing data.
- For JSON catalogs, combine distinct keys deterministically and flag conflicting values for review instead of silently overwriting either side.
- For chronological documentation, preserve recent history and decisions from both sides without duplicating whole sections.
- For workflows, preserve base improvements and inspect triggers, permissions, secrets, and runners, especially self-hosted runners and `pull_request_target`.

After resolution, verify there are no conflict markers or unresolved paths, inspect the resulting diff, and confirm intended feature and base changes remain. If a decision about product behavior or security cannot be inferred, pause only that decision; report exact paths, alternatives, and consequences while continuing independent work.

## 4. Review the reconciled branch before PR

Review the complete branch diff against the current canonical base after rebase or conflict resolution, not just the last commit. Use the repository's available review skill when applicable (for example `diff-review`); otherwise do a structured local review and state that it was not independent. Record actionable findings with path, line, severity, and evidence.

Check specifically for regressions introduced by integration, authorization and tenant isolation, data exposure, schema/migration and rollout/rollback compatibility, workflow permissions and PR code execution, configuration changes, data deletions, and generated artifacts. Fix actionable findings before PR creation/update. Do not use CI as a substitute for resolving evident local defects or conflicts. If only known non-blocking risks remain, document each risk and its mitigation for the PR.

## 5. Validate the reconciled SHA

Choose validation commands proportionate to the full diff and required by repository/project instructions. Run required gates after the rebase or conflict resolution; previous results do not validate the new SHA. Record exact commands, resulting HEAD SHA, outcomes, and gaps. Do not claim a check passed unless it ran successfully on that SHA. If validation changes files, review those changes and repeat affected gates against the resulting SHA.

If the project requires roadmap/issue synchronization, attempt the prescribed mechanism and record its result. If unavailable or unauthorized, identify the specific missing capability or permission and the impact; do not claim synchronization or invent a substitute.

## 6. Create or update a PR only after local gates

PR creation requires explicit user authorization. A request to commit does not authorize push or PR; a request to push does not by itself authorize a PR. Complete all earlier stages first. Search for an existing PR for the branch and verify its base and head. If one exists and the user explicitly authorized the PR delivery, update it without asking again. If its base/head is wrong, keep it open while preparing and validating the correct replacement; only after the replacement is ready, close the old PR with an objective explanation and link the two.

Use `gh` or the repository's authorized PR interface if available. If no interface/authentication is available, leave the verified local result intact and provide a prepared title/body; never claim a PR was opened. Use a conventional, specific title and a filled description with summary, scope, review findings, commands/results, exact validated SHA, known risks and mitigations, gaps, and rollout notes as applicable. Do not leave sections empty or promise checks that did not run. Include relevant Maat proposal/check references and actual states when applicable.

After opening/updating the PR, monitor remote required checks, preview, and migration gates. Fix failures and update the same PR while its branch remains correctly based. Do not merge while required checks, required review, or rollout gates are pending or failing. Distinguish release candidate/preview from production. A release-candidate request does not authorize production promotion or mutation. Before a workflow that could affect production, inspect its triggers, jobs, permissions, and concrete effects; do not execute production effects without explicit authorization.

## 7. Commit, push, and close out

Perform only Git actions explicitly requested by the user. Before each authorized mutation, verify the exact branch and paths. For push, confirm remote and branch mapping and set upstream only if needed. If push is rejected because of divergence, return to base reconciliation; never force-push by default. Use conventional commit subjects (`type(scope): description`), professional concise prose, and a `BREAKING CHANGE` footer when applicable. Split commits only for genuinely independent changes. Respect hooks.

Finish by confirming branch, base, head and validated SHA, clean/remaining local paths, commit(s), push status, PR URL and check status when applicable, and Maat feature/check/validation references with their actual states. For incomplete work, list each blocker with evidence, impact, and the concrete next action. Do not stop for a Git state that can be corrected safely, and do not describe work as ready for review while required evidence is missing.
