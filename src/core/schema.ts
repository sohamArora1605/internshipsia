import { z } from 'zod';

export const InternshipSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  mode: z.enum(['remote', 'onsite', 'hybrid']),
  paid: z.boolean(),
  stipend: z.number().optional(),
  durationWeeks: z.number().int().min(1, 'Duration must be at least 1 week'),
  skillsRequired: z.array(z.string()).min(1, 'At least one skill is required'),
  city: z.string().optional(),
  openings: z.number().int().min(1, 'At least 1 opening required'),
  isTrial: z.boolean().optional(),
});

export const StudentProfileSchema = z.object({
  branch: z.string().min(2, 'Branch is required'),
  semester: z.number().int().min(1).max(8),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  interests: z.array(z.string()),
  resumeUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
});

export const LogEntrySchema = z.object({
  date: z.string(),
  tasks: z.string().min(5, 'Tasks description must be at least 5 characters'),
  hours: z.number().min(0.5).max(12, 'Hours must be between 0.5 and 12'),
});

export const ReportSchema = z.object({
  summary: z.string().min(50, 'Summary must be at least 50 characters'),
  reflections: z.string().min(30, 'Reflections must be at least 30 characters'),
  learningOutcomes: z.array(z.string()).min(1, 'At least one learning outcome required'),
});

export const CompanySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  sector: z.string().min(2, 'Sector is required'),
  location: z.string().optional(),
});

export const CollegeSchema = z.object({
  name: z.string().min(2, 'College name is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().min(2, 'State is required'),
});