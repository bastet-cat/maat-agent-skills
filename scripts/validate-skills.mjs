import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const skillsRoot = join(repoRoot, 'skills');
const errors = [];

const maatUiResumeContract = {
  id: 'keep-maat-docs-current-for-ui-resume',
  pattern:
    /Keep Maat documents current for UI and resume[\s\S]*later session can resume from document paths\/IDs alone/i,
};

/** Behavioral contracts that keep workflow skills aligned with the closed-loop process. */
const skillContracts = {
  'to-scope': [maatUiResumeContract],
  'to-tech-plan': [maatUiResumeContract],
  'to-plan': [maatUiResumeContract],
  'validate-plan': [
    {
      id: 'compare-plan-scope-implementation-evidence',
      pattern:
        /Compare plan, scope, implementation, and evidence|plan vs scope|Plan vs implementation|Plan\/implementation vs evidence/i,
    },
    {
      id: 'independent-validator',
      pattern:
        /independent validator|validator independent of the author|fresh context|independent reviewer/i,
    },
    {
      id: 'keep-validator-current',
      pattern: /Keep the validator packet current|refresh the validator inputs/i,
    },
    {
      id: 'closed-loop-to-implement',
      pattern: /resume the published `to-implement`|Close the loop until the work is verifiable/i,
    },
    {
      id: 'no-premature-next-steps',
      pattern:
        /Do not end with a backlog of next steps|Do not stop with a list of next steps/i,
    },
    {
      id: 'manual-validation',
      pattern: /manual-validation/,
    },
    maatUiResumeContract,
    {
      id: 'preserve-authorization',
      pattern:
        /does \*\*not\*\* authorize commit|never assume commit or push|Continuity covers already authorized/i,
    },
  ],
  'to-implement': [
    {
      id: 'validate-plan-closed-loop',
      pattern: /validate-plan` closed loop|validate-plan closed loop|re-enter `validate-plan`/i,
    },
    {
      id: 'manual-validation',
      pattern: /manual-validation/,
    },
    {
      id: 'no-premature-next-steps',
      pattern:
        /Do not stop with a list of next steps|Do not end the scope run with a backlog of next steps/i,
    },
    maatUiResumeContract,
    {
      id: 'preserve-authorization',
      pattern:
        /does not authorize commit or push|Ask explicitly before commit|never assume push/i,
    },
  ],
};

for (const entry of readdirSync(skillsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const skillPath = join(skillsRoot, entry.name, 'SKILL.md');
  try {
    statSync(skillPath);
  } catch {
    errors.push(`${entry.name}: missing SKILL.md`);
    continue;
  }

  const content = readFileSync(skillPath, 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    errors.push(`${entry.name}: missing YAML frontmatter`);
    continue;
  }

  const name = frontmatter[1].match(/^name:\s*([\w-]+)\s*$/m)?.[1];
  const description = frontmatter[1].match(/^description:\s*(.+)\s*$/m)?.[1];

  if (!name) errors.push(`${entry.name}: frontmatter needs a name`);
  if (!description) errors.push(`${entry.name}: frontmatter needs a description`);
  if (name && name !== basename(entry.name)) {
    errors.push(`${entry.name}: name must match its directory`);
  }
  if (/^\s*(?:TODO|First step|Describe when this skill)\b/im.test(content)) {
    errors.push(`${entry.name}: unfinished scaffold text remains`);
  }

  const contracts = skillContracts[entry.name];
  if (contracts) {
    for (const contract of contracts) {
      if (!contract.pattern.test(content)) {
        errors.push(
          `${entry.name}: missing behavioral contract "${contract.id}"`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Skill metadata validation passed.');
}
