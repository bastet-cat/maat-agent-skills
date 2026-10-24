# Contributing

## Add a skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Use the directory name as the skill's `name` in YAML frontmatter.
3. Write a concise `description` that explains the capability and when it
   applies.
4. Keep each skill focused. Add `references/` or `scripts/` only when the
   workflow needs them.
5. Link every supporting file from the skill that uses it.
6. Add the skill to the Available skills table in `README.md`.
7. Run `node scripts/validate-skills.mjs` and
   `npx skills@latest add ./ --list` before opening a pull request.

## Maat-specific guidance

- Write every skill for the portable Agent Skills format and for all Maat
  clients, including Codex, Copilot, Claude, OpenCode, Gemini, and Hermes.
  Keep each shared `SKILL.md` usable without client-specific frontmatter,
  prompt syntax, filesystem paths, or tool aliases. Use client-specific
  metadata or adapters only when an integration requires them, and keep them
  optional.
- Treat tools as runtime capabilities: discover the exact tools and schemas
  exposed by the active client's Maat MCP connection. Do not assume a client
  prefix or a tool is available everywhere; give a clear stop condition when a
  required capability is missing.
- Validate portable package structure with the repository checks. When the
  relevant clients are available, also verify that each can discover and load
  the skill; report any client that could not be checked. A successful package
  listing alone does not prove cross-client compatibility.
- Keep GitHub installation and Maat registry publication as separate steps.
- Do not claim a skill is available to Maat SessionStart until its release is
  published and usable in the Maat registry.
- Keep tool-specific instructions out of shared skill text when a portable
  instruction or documented fallback works.
- Do not include tokens, credentials, or private user data in skills,
  references, examples, or test fixtures.

## Review checklist

- The skill has one clear purpose and a discriminating description.
- Its instructions preserve the user's scope and authorization.
- References resolve within the skill package or point to maintained sources.
- Any scripts are needed by the workflow and have been executed during review.
- README and skill metadata agree on the skill name and purpose.
- Contributions are submitted under the repository's MIT License and preserve
  required third-party notices.
