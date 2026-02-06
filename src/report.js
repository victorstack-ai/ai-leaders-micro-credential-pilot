import { generateSchedule, getScheduleSummary } from './schedule.js';

function estimateFacilitators(capacity, ratio) {
  const perFacilitator = ratio ?? 20;
  return Math.max(1, Math.ceil(capacity / perFacilitator));
}

export function buildReport(config) {
  const schedule = generateSchedule(config);
  const summary = getScheduleSummary(schedule);
  const totalSessions = schedule.length;
  const totalMinutes = totalSessions * config.sessionMinutes;

  return {
    cohort: config.cohortName,
    startDate: summary.startDate,
    endDate: summary.endDate,
    totalSessions,
    totalHours: Number((totalMinutes / 60).toFixed(1)),
    capacity: config.capacity,
    facilitators: estimateFacilitators(config.capacity, config.facilitatorRatio),
    targetRoles: config.targetRoles,
    outcomes: config.outcomes,
    schedule
  };
}
