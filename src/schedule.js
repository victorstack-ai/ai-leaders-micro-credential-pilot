function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map((value) => Number.parseInt(value, 10));
  return new Date(Date.UTC(year, month - 1, day));
}

function formatIsoDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function buildSessionBlueprints(modules) {
  const sessions = [];
  modules.forEach((module) => {
    module.topics.forEach((topic) => {
      sessions.push({
        moduleTitle: module.title,
        topic,
        format: module.format ?? 'workshop'
      });
    });
  });
  return sessions;
}

function buildSessionDates(startDate, weeks, daysOfWeek) {
  const sessionDates = [];
  const start = parseIsoDate(startDate);

  for (let week = 0; week < weeks; week += 1) {
    const weekStart = addDays(start, week * 7);
    const weekStartDay = weekStart.getUTCDay();

    daysOfWeek.forEach((dayOfWeek) => {
      const offset = (dayOfWeek - weekStartDay + 7) % 7;
      sessionDates.push(addDays(weekStart, offset));
    });
  }

  return sessionDates.sort((a, b) => a.getTime() - b.getTime());
}

export function generateSchedule(config) {
  const totalSessions = config.weeks * config.sessionsPerWeek;
  const sessionDates = buildSessionDates(config.startDate, config.weeks, config.daysOfWeek);
  const blueprints = buildSessionBlueprints(config.modules);

  const sessions = [];
  for (let index = 0; index < totalSessions; index += 1) {
    const blueprint = blueprints[index] ?? {
      moduleTitle: 'Capstone & Flex',
      topic: 'Capstone review, sponsor feedback, and cohort retrospective',
      format: 'capstone'
    };
    const date = sessionDates[index];

    sessions.push({
      sessionNumber: index + 1,
      date: formatIsoDate(date),
      module: blueprint.moduleTitle,
      topic: blueprint.topic,
      format: blueprint.format,
      durationMinutes: config.sessionMinutes
    });
  }

  return sessions;
}

export function getScheduleSummary(schedule) {
  if (!schedule.length) {
    return {
      startDate: null,
      endDate: null
    };
  }

  return {
    startDate: schedule[0].date,
    endDate: schedule[schedule.length - 1].date
  };
}
