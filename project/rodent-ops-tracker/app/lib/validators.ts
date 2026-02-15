import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(2),
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED']),
  revenue: z.number().nonnegative(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullable().optional()
});

export const expenseSchema = z.object({
  title: z.string().min(2),
  amount: z.number().positive(),
  date: z.string().datetime(),
  category: z.enum(['EQUIPMENT', 'LABOR', 'SOFTWARE', 'TRAVEL', 'OTHER']),
  projectId: z.string().min(1)
});
