import type { CreditRecord, LogEntry } from './models';

export function computeCredits(
  logs: LogEntry[],
  facultyScore: number,
  companyScore: number
): CreditRecord['creditsAwarded'] {
  const hours = logs.reduce((a, b) => a + b.hours, 0);
  
  // Base credits: 1 credit per 30 hours
  const base = Math.floor(hours / 30);
  
  // Bonus based on performance scores (0-10 each, combined max +2 credits)
  const avgScore = (facultyScore + companyScore) / 2;
  const bonus = Math.round((avgScore / 10) * 2);
  
  return Math.max(0, base + bonus);
}

export function calculateEmployabilityScore(profile: {
  skills: string[];
  applications: number;
  completedInternships: number;
  credits: number;
}): number {
  let score = 0;
  
  // Skills (max 40 points)
  score += Math.min(profile.skills.length * 5, 40);
  
  // Application activity (max 20 points)
  score += Math.min(profile.applications * 2, 20);
  
  // Completed internships (max 30 points)
  score += Math.min(profile.completedInternships * 15, 30);
  
  // Credits earned (max 10 points)
  score += Math.min(profile.credits * 2, 10);
  
  return Math.min(score, 100);
}