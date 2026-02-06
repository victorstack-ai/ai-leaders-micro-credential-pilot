import assert from 'assert';
import { validateConfig } from '../src/model.js';
import { buildReport } from '../src/report.js';

const baseConfig = {
  cohortName: 'AI Leaders Micro-Credential',
  startDate: '2026-03-02',
  weeks: 6,
  sessionsPerWeek: 2,
  sessionMinutes: 120,
  capacity: 30,
  facilitatorRatio: 15,
  daysOfWeek: [1, 3],
  targetRoles: ['Directors', 'Product leads'],
  outcomes: ['Define strategy', 'Ship pilot'],
  modules: [
    {
      title: 'Foundations',
      topics: ['Intro', 'Value framing', 'Stakeholder map'],
      format: 'seminar'
    },
    {
      title: 'Responsible Adoption',
      topics: ['Governance', 'Data readiness', 'Ethics'],
      format: 'workshop'
    },
    {
      title: 'Delivery & Change',
      topics: ['Discovery', 'Capability', 'Change playbooks'],
      format: 'lab'
    },
    {
      title: 'Pilot Launch',
      topics: ['Experiment design', 'Comms', 'Capstone rehearsal'],
      format: 'panel'
    }
  ]
};

describe('buildReport', () => {
  it('generates a full schedule with expected end date', () => {
    const config = validateConfig(baseConfig);
    const report = buildReport(config);

    assert.strictEqual(report.totalSessions, 12);
    assert.strictEqual(report.startDate, '2026-03-02');
    assert.strictEqual(report.endDate, '2026-04-08');
    assert.strictEqual(report.schedule.length, 12);
  });

  it('enforces daysOfWeek length', () => {
    assert.throws(() => {
      validateConfig({
        ...baseConfig,
        sessionsPerWeek: 3,
        daysOfWeek: [1, 3]
      });
    }, /daysOfWeek/);
  });
});
