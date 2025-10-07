export type ID = string;
export type Role = 'student' | 'faculty' | 'industry' | 'admin';

export interface User {
  id: ID;
  role: Role;
  name: string;
  email: string;
  phone?: string;
  collegeId?: ID;
  companyId?: ID;
  avatarUrl?: string;
  profileComplete: boolean;
  createdAt: string;
}

export interface College {
  id: ID;
  name: string;
  district: string;
  state: string;
}

export interface Company {
  id: ID;
  name: string;
  sector: string;
  verified: boolean;
  location?: string;
}

export interface StudentProfile {
  id: ID;
  userId: ID;
  branch: string;
  semester: number;
  cgpa?: number;
  skills: string[];
  interests: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  badges: string[];
  employabilityScore?: number;
}

export interface HabitTracker {
  id: ID;
  userId: ID;
  title: string;
  description: string;
  targetDays: number;
  completedDays: number;
  dailyChecks: { date: string; completed: boolean }[];
  createdAt: string;
}

export interface LearningResource {
  id: ID;
  title: string;
  provider: 'SWAYAM' | 'NPTEL' | 'Coursera' | 'edX';
  category: string;
  skills: string[];
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  logoUrl: string;
  url: string;
}

export interface ChatMessage {
  id: ID;
  podId: ID;
  userId: ID;
  message: string;
  timestamp: string;
}

export interface PomodoroSession {
  id: ID;
  userId: ID;
  podId?: ID;
  duration: number;
  completed: boolean;
  startTime: string;
  endTime?: string;
}

export interface Internship {
  id: ID;
  companyId: ID;
  title: string;
  description: string;
  mode: 'remote' | 'onsite' | 'hybrid';
  paid: boolean;
  stipend?: number;
  durationWeeks: number;
  skillsRequired: string[];
  city?: string;
  openings: number;
  isTrial?: boolean;
  createdAt: string;
}

export interface Application {
  id: ID;
  studentId: ID;
  internshipId: ID;
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected' | 'withdrawn';
  timeline: { ts: string; note: string; by?: ID }[];
}

export interface LogEntry {
  id: ID;
  studentId: ID;
  internshipId: ID;
  date: string;
  tasks: string;
  hours: number;
  mentorFeedback?: string;
  companyFeedback?: string;
  verifiedByFaculty?: boolean;
}

export interface Report {
  id: ID;
  studentId: ID;
  internshipId: ID;
  weekNo: number;
  summary: string;
  reflections: string;
  learningOutcomes: string[];
  approved?: boolean;
}

export interface CreditRecord {
  id: ID;
  studentId: ID;
  internshipId: ID;
  hours: number;
  facultyScore: number;
  companyScore: number;
  creditsAwarded: number;
  approvedBy: ID;
  approvedAt: string;
}

export interface Certificate {
  id: ID;
  studentId: ID;
  internshipId: ID;
  issueDate: string;
  badgeId: string;
  chainIndex: number;
  prevHash?: string;
  hash: string;
}

export interface MentorSession {
  id: ID;
  studentId: ID;
  mentorId: ID;
  topic: string;
  start: string;
  end: string;
  notes?: string;
}

export interface PeerPod {
  id: ID;
  title: string;
  memberIds: ID[];
  sponsorCompanyId?: ID;
  description?: string;
}

export interface Notification {
  id: ID;
  userId: ID;
  ts: string;
  type: string;
  title: string;
  body?: string;
  seen?: boolean;
}

export interface Analytics {
  bySkill: Record<string, number>;
  byDistrict: Record<string, number>;
  avgEmployability: number;
}