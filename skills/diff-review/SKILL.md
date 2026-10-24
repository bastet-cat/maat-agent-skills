---
name: diff-review
description: Review PR and Git diffs for high-confidence bugs.
---

# Diff review

Review source changes as a skeptical reviewer who has not seen the author's reasoning. Report only actionable, high-confidence findings. This skill is read-only: do not edit files, change Git state, run tests, or post comments or reviews to a PR.

## Select the diff

Use the user's argument and explicit Maat project references to select exactly one review scope. Do not infer a repository from the current directory or a similar name.

1. **Pull request supplied:** Resolve the PR and its repository, target branch, base SHA, and head SHA through the active client's available provider tools or existing local refs. Discover the exact tools available; do not assume a client-specific tool name. Review the PR's base-to-head diff only. Do not mix in unrelated local changes. If the PR or exact SHAs cannot be read, ask for a usable PR reference or diff and stop. Do not fetch or change refs to obtain it.
2. **No argument:** Review the current checkout only when Maat context or the user's explicit instruction identifies it as the target. If neither does, ask for the repository/PR link and stop. If the target is confirmed and the current branch is the remote default branch, use the current `HEAD` as the base so the review covers the working-tree changes. Otherwise, identify the branch from which the current branch was created using available branch configuration, reflogs, and commit ancestry. Use that branch as the base.
3. **Primary branch supplied (for example, `main`):** Treat it as the target base and compare the current checkout against `origin/HEAD`. Confirm that `origin/HEAD` resolves to the requested primary branch before reviewing. If the symbolic ref is missing or points elsewhere, stop and ask which remote base to use.
4. **Other explicit base branch supplied:** Resolve that exact local or remote ref and compare the current checkout against it. Do not substitute a different branch silently.

For local review scopes, report the resolved base and current `HEAD`. Collect committed changes with `git diff --find-renames <base>...HEAD` and tracked staged/unstaged changes with `git diff --find-renames HEAD`. Enumerate untracked, non-ignored files with `git ls-files --others --exclude-standard` and inspect them separately; do not add or stage them. When the base is current `HEAD`, the committed-change diff is empty. If Git cannot find a merge base, stop and ask the user for a usable base. Exclude ignored files.

If Maat has no unambiguous reference for the identified repository but the user supplied a PR URL, use that URL as the explicit repository identity; do not ask for the same project link again. Resolve the PR's exact head SHA through the provider or supplied local refs. If additional code context is needed and the head source is accessible, clone into an isolated workspace and map the codebase at that head SHA. Label this as direct checkout evidence, not indexed Maat evidence. If no user-supplied PR/repository URL identifies the project, ask for its URL and intended branch/access before making repository-specific claims. Do not change refs in an existing checkout to obtain the review diff, and never request credentials in chat.

The no-argument branch base must be supported by repository evidence. Check branch creation reflog entries, configured branch metadata, and ancestry; do not assume the default branch is the base merely because it exists. If the base cannot be determined confidently, ask the user for the base ref and stop.

At the start of the result, state the selected scope and the base/head refs or SHAs. For PR review, state that only the PR diff was included. For local review, note whether staged, unstaged, and untracked files were included.

Before inspecting the diff, restate in clear, non-technical language which project and exact change will be reviewed, the expected intent/scope, and what evidence is available or missing. Carry forward confirmation already given for the same diff/revision and review scope; ask only when the target is new, materially changed, or ambiguous. If corrected, resolve the scope again before proceeding; do not review a guessed target.

## Inspect the diff and context

Read the complete selected diff before judging it. Detect the language, framework, and test conventions from repository files; do not assume a stack. For each changed behavior, inspect relevant implementations and callers outside the diff when a conclusion depends on them. Follow data, authorization, error, retry, and lifecycle paths far enough to support a concrete finding.

Check the areas that apply:

1. **Lookup semantics:** Verify what decision-making queries and helpers actually return. Check status, tenant, deletion, legacy, and failure filters, plus fields lost by mappers.
2. **Resource symmetry:** Trace every resource acquisition and release, including error, timeout, retry, and early-return paths. Check matching keys and outcomes.
3. **Keys and formats:** Verify that producers and consumers use the same IDs, prefixes, casing, separators, trimming, encoding, and URL formats.
4. **Legacy and inconsistent data:** Check compatibility with existing records, partial writes, nulls, duplicates, and migrated data.
5. **Shared state and concurrency:** Check retries, re-runs, concurrent requests, in-progress work, and timing assumptions where one attempt's result is inferred from global state.
6. **Error paths:** Look for swallowed errors, unsafe continuation, incorrect fail-open/fail-closed behavior, partial batch failure, and pagination or offset mistakes.
7. **Security:** Report only a plausible exploit chain, such as missing server-side authorization, injection, unsafe deserialization, SSRF, secret exposure, or sensitive data in logs.
8. **Tests:** Inspect tests for changed behavior. Look for missing coverage of important new branches, mocks that hide real semantics, and assertions tied to implementation rather than outcome. Do not run tests.
9. **Docs and configuration:** Check whether behavior changes are reflected in relevant docs, schemas, configuration types, specs, changelogs, and migrations.

Only report defects introduced or exposed by the selected diff. Do not report style, hypothetical risks without a concrete failure path, or pre-existing issues unrelated to the change. If uncertain, omit the finding and list the uncertainty under what could not be verified.

## Report

Order findings by severity. For each finding, include:

- Severity: `high`, `medium`, or `low`.
- `file:line` pointing to the changed line that causes the issue.
- A concrete input or sequence that triggers it.
- Why the current code fails in that scenario.
- The smallest practical fix.

Do not pad an empty review. If there are no high-confidence findings, say so. Close with one-line checks that found nothing and a short list of what could not be verified, including unavailable PR/base data or uninspected test behavior.
