import { z } from 'zod';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const moduleSchema = z.object({
  title: z.string().min(1),
  topics: z.array(z.string().min(1)).min(1),
  format: z.enum(['workshop', 'lab', 'seminar', 'panel', 'coach', 'capstone']).optional()
});

export const pilotConfigSchema = z.object({
  cohortName: z.string().min(1),
  startDate: z.string().regex(isoDateRegex, 'Use YYYY-MM-DD for startDate.'),
  weeks: z.number().int().min(1),
  sessionsPerWeek: z.number().int().min(1),
  sessionMinutes: z.number().int().min(30),
  capacity: z.number().int().min(1),
  facilitatorRatio: z.number().int().min(1).optional(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1),
  targetRoles: z.array(z.string().min(1)).min(1),
  outcomes: z.array(z.string().min(1)).min(1),
  modules: z.array(moduleSchema).min(1)
}).refine((data) => data.daysOfWeek.length === data.sessionsPerWeek, {
  message: 'daysOfWeek must have the same length as sessionsPerWeek.',
  path: ['daysOfWeek']
});

export function validateConfig(input) {
  return pilotConfigSchema.parse(input);
}
