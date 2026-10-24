---
name: owasp-top-10
description: Review OWASP Agentic Skills Top 10 controls that remain unverified by Maat's static skill scanner. Use with an exact Maat skill release identity; this review does not replace runtime testing or approve risk.
---

# OWASP Top 10 review

Assess security controls for one exact, published Maat skill release that the deterministic scanner cannot prove. This is a read-only review of package evidence. Do not execute package scripts, install dependencies, contact referenced external services, alter the assessed skill, publish or promote a release, or approve risk.

## Required identity and source

Require the caller to identify the target with `skill_id`, `release_id`, `commit`, and package `digest`. This assessment requires Maat registry/package tools and the pinned checklist release; if they are unavailable, report that prerequisite and stop without substituting the working tree or a public branch. Do not silently choose the latest release. If any identity value is missing, request it before reviewing.

1. Resolve that exact release through Maat and compare the returned identity and usability with all four supplied values. Stop if it is missing, unusable, or mismatched.
2. Retrieve package files only from that `release_id` using Maat's package or asset retrieval tools. Preserve the returned commit and per-file digests. Do not substitute the working tree, a GitHub branch, or a newer release.
3. Retrieve the OWASP Agentic Skills Top 10 checklist from the exact published release Maat identifies as its pinned checklist. Record its `skill_id`, `release_id`, commit, and digest. Do not update the checklist as part of this review.

Before assessing controls, summarize in plain language the exact skill/release/package digest, what security properties this complementary review will inspect, what it will not establish, and which evidence sources are available. Carry forward confirmation already given for this exact package identity and scope; ask only when the identity is new, changes, or remains ambiguous. If corrected, resolve and verify the exact identity again; do not choose a nearby or latest release. If a conclusion requires a code project that Maat does not identify unambiguously, ask the user for its repository URL and intended branch/access; after they provide it, clone into an isolated workspace and map that codebase at the checked-out commit. Keep repository evidence distinct from the exact published skill package. Never request credentials in chat.

## Establish scanner coverage

Run Maat's deterministic security lint on the target's exact `skill_id` and `release_id`. Verify that its report identifies the same package digest and commit. Capture the ruleset name and digest, report timestamp, and every control ID and status.

Inspect the scanner implementation or ruleset definition for that reported ruleset when Maat exposes it through its documented sources. Trace which rules can set a control to `fail`, what evidence can set it to another status, and how the final report is assembled. A listed control or a clean package-scan verdict is not proof that the control was statically verified. If implementation details are unavailable, say so and use only the report's per-control statuses to identify residual controls. Never infer coverage from a remembered, hard-coded, or older rule list.

- Review controls whose current report status is `not_verified`.
- Preserve scanner `pass`, `fail`, and other conclusions as scanner conclusions. Do not re-evaluate, restate, downgrade, or overwrite them. Refer to static findings by report/control ID where useful.
- If lint fails, the report is missing, or package identity does not match, stop the complementary assessment and report why. Do not treat `clean` as evidence that OWASP controls passed: it means only that no static findings were reported.

Use the exact pinned checklist to interpret each residual control and its severity. Assess applicable evidence across the complete package, including instructions, scripts, manifests, dependencies, configuration, declared permissions, network and data access, persistence, secrets, prompt-injection exposure, delegation, and runtime behavior. Follow package-local references and callers. Do not fetch external URLs or run package code; record unresolved external or runtime claims as limitations and recommend an isolated test where needed.

## Evidence and outcomes

For each residual control, record its OWASP ID and exactly one complementary result:

- `pass`: direct, verifiable evidence supports the control. Cite precise package path and line, or a test or artifact tied to this release. Textual instructions alone cannot prove runtime enforcement, isolation, authentication, or observed behavior.
- `fail`: direct evidence demonstrates that the control is violated. Include the concrete behavior or exposure and a precise reference.
- `not_applicable`: explain why the control does not apply to this package and cite the evidence for that scope decision.
- `not_verified`: evidence is absent, indirect, ambiguous, inaccessible, or requires execution, provider behavior, deployment configuration, or runtime observation.

Absence of evidence is never a pass. Recommend focused dynamic tests for `not_verified` controls when they could establish the claim, including the needed isolation and observation. Do not run those tests, scripts, installs, network calls, or other external actions without explicit authorization and an adequate isolated environment.

Bind the report to the exact target package identity and digest, scanner report and ruleset digest, and checklist release identity and digest. Preserve signed artifacts and their original digest/signature metadata byte-for-byte; do not fabricate signatures, attestations, verification results, or provenance. Keep the complementary report separate from the package and from the scanner report.

Before attempting to record evidence in Maat, inspect the current Maat tool catalog and documented API for an official security-evidence registration interface, whether exposed as a tool or HTTP endpoint. The current Maat implementation exposes `POST /api/v1/skills/{skill_id}/security-evidence`; treat it as a registry write and recheck its live contract before use. Signed attestations bind the skill ID, package digest, ruleset, control ID, producer, schema, outcome, evidence ID, and kind; they require an Ed25519 signature from a configured trusted producer. Verify the exact current schema, canonicalization, binding, and key requirements. The current implementation also marks a skill compromised when accepted signed evidence reports `fail`; confirm this effect before any submission. The review itself must not create a signature or claim a producer identity it does not hold. Do not invent an interface or call one whose identity, validation, signing requirements, or write effects are unclear. Require explicit user authorization before an external evidence-registration write. Never use risk-acceptance, publish, or promotion operations in this workflow. If no usable official registration interface or valid signed evidence is available, deliver the evidence as a report and say it was not registered in Maat.

## Report

Return:

1. **Identity and provenance:** target skill/release/commit/digest; scanner report, ruleset and digest; pinned checklist release/commit/digest.
2. **Static scanner summary:** counts by scanner status and any static findings by ID, without repeating their analysis. State explicitly that `clean` means no static findings only.
3. **Residual control matrix:** include every control that the scanner reported as `not_verified`, with OWASP ID, complementary result, method, evidence reference (path and line, test, or artifact), and a short rationale. Keep any control that could not be assessed as `not_verified` and explain why. Explain every `not_applicable` result.
4. **Findings and remediations:** concrete security issue, affected control, severity from the pinned checklist, evidence, impact, and a practical remediation. Do not restate static findings as complementary findings.
5. **Limits and follow-up:** what could not be verified, recommended isolated tests, and whether evidence was registered through an official Maat mechanism.
6. **Conclusion:** distinguish “no static findings” from the exact controls verified in this complementary review. Never imply that a textual review replaces operational or dynamic evidence.
