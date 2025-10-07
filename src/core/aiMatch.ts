import type { Internship, StudentProfile } from './models';

export function scoreMatch(student: StudentProfile, internship: Internship): number {
  const skillSet = new Set(student.skills.map(s => s.toLowerCase()));
  const interestSet = new Set(student.interests.map(s => s.toLowerCase()));
  let score = 0;

  // Skill matching (highest weight)
  for (const req of internship.skillsRequired) {
    const r = req.toLowerCase();
    if (skillSet.has(r)) score += 6;
    if (interestSet.has(r)) score += 2;
  }

  // Mode preferences
  if (internship.mode === 'remote') score += 3;
  if (internship.paid) score += 2;
  if (internship.isTrial) score += 1;

  // Duration preference (shorter is better for students)
  if (internship.durationWeeks <= 8) score += 2;
  else if (internship.durationWeeks <= 12) score += 1;

  return score;
}

export function rankInternships(student: StudentProfile, internships: Internship[]) {
  return [...internships]
    .map(i => ({ internship: i, score: scoreMatch(student, i) }))
    .sort((a, b) => b.score - a.score);
}

export function getMatchLevel(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 15) return 'excellent';
  if (score >= 10) return 'good';
  if (score >= 5) return 'fair';
  return 'poor';
}