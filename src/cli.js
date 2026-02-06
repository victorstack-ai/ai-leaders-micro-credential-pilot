import fs from 'node:fs';
import { validateConfig } from './model.js';
import { buildReport } from './report.js';

function loadConfig(path) {
  const raw = fs.readFileSync(path, 'utf8');
  return JSON.parse(raw);
}

function renderMarkdown(report) {
  const scheduleRows = report.schedule
    .map(
      (session) =>
        `| ${session.sessionNumber} | ${session.date} | ${session.module} | ${session.topic} | ${session.format} | ${session.durationMinutes} |`
    )
    .join('\n');

  return `# ${report.cohort} Pilot Plan\n\n` +
    `## Summary\n` +
    `- Cohort start: ${report.startDate}\n` +
    `- Cohort end: ${report.endDate}\n` +
    `- Sessions: ${report.totalSessions}\n` +
    `- Total hours: ${report.totalHours}\n` +
    `- Capacity: ${report.capacity}\n` +
    `- Facilitators: ${report.facilitators}\n` +
    `\n` +
    `## Target Roles\n` +
    `${report.targetRoles.map((role) => `- ${role}`).join('\n')}\n\n` +
    `## Outcomes\n` +
    `${report.outcomes.map((outcome) => `- ${outcome}`).join('\n')}\n\n` +
    `## Schedule\n` +
    `| # | Date | Module | Topic | Format | Minutes |\n` +
    `| --- | --- | --- | --- | --- | --- |\n` +
    `${scheduleRows}\n`;
}

const [configPath, ...flags] = process.argv.slice(2);

if (!configPath) {
  console.error('Usage: node src/cli.js <config.json> [--json]');
  process.exit(1);
}

const config = validateConfig(loadConfig(configPath));
const report = buildReport(config);

if (flags.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(renderMarkdown(report));
}
