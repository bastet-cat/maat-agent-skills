import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const skillsRoot = join(repoRoot, 'skills');
const errors = [];

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
  if (/TODO|First step|Describe when this skill/i.test(content)) {
    errors.push(`${entry.name}: unfinished scaffold text remains`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Skill metadata validation passed.');
}
