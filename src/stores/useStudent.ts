import { create } from 'zustand';
import type { StudentProfile, Application, LogEntry, Report, Certificate, MentorSession, PeerPod } from '../core/models';
import { api } from '../core/mockApi';
import { queue } from '../core/offline';

interface StudentState {
  profile: StudentProfile | null;
  applications: Application[];
  logs: LogEntry[];
  reports: Report[];
  certificates: Certificate[];
  mentorSessions: MentorSession[];
  peerPods: PeerPod[];
  loading: boolean;

  loadProfile: (userId: string) => Promise<void>;
  updateProfile: (profile: StudentProfile) => Promise<void>;
  
  loadApplications: (studentId: string) => Promise<void>;
  applyToInternship: (studentId: string, internshipId: string) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;
  
  loadLogs: (studentId: string, internshipId?: string) => Promise<void>;
  addLog: (log: Omit<LogEntry, 'id'>) => Promise<void>;
  
  loadReports: (studentId: string, internshipId?: string) => Promise<void>;
  saveReport: (report: Report) => Promise<void>;
  
  loadCertificates: (studentId: string) => Promise<void>;
  
  loadMentorSessions: (studentId: string) => Promise<void>;
  scheduleMentorSession: (session: MentorSession) => Promise<void>;
  
  loadPeerPods: () => Promise<void>;
  joinPeerPod: (podId: string, studentId: string) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  profile: null,
  applications: [],
  logs: [],
  reports: [],
  certificates: [],
  mentorSessions: [],
  peerPods: [],
  loading: false,

  loadProfile: async (userId) => {
    set({ loading: true });
    try {
      const profile = await api.getStudentProfile(userId);
      set({ profile, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  updateProfile: async (profile) => {
    await api.upsertStudentProfile(profile);
    set({ profile });
  },

  loadApplications: async (studentId) => {
    set({ loading: true });
    try {
      const applications = await api.listApplicationsByStudent(studentId);
      set({ applications, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  applyToInternship: async (studentId, internshipId) => {
    if (navigator.onLine) {
      await api.apply(studentId, internshipId);
      get().loadApplications(studentId);
    } else {
      queue({ type: 'apply', payload: { studentId, internshipId } });
    }
  },

  withdrawApplication: async (applicationId) => {
    await api.withdrawApplication(applicationId);
    const { applications } = get();
    const app = applications.find(a => a.id === applicationId);
    if (app) {
      get().loadApplications(app.studentId);
    }
  },

  loadLogs: async (studentId, internshipId) => {
    set({ loading: true });
    try {
      const logs = await api.listLogs(studentId, internshipId);
      set({ logs, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addLog: async (log) => {
    if (navigator.onLine) {
      await api.addLog(log);
      get().loadLogs(log.studentId, log.internshipId);
    } else {
      queue({ type: 'addLog', payload: log });
    }
  },

  loadReports: async (studentId, internshipId) => {
    set({ loading: true });
    try {
      const reports = await api.listReports(studentId, internshipId);
      set({ reports, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  saveReport: async (report) => {
    if (navigator.onLine) {
      await api.upsertReport(report);
      get().loadReports(report.studentId, report.internshipId);
    } else {
      queue({ type: 'upsertReport', payload: report });
    }
  },

  loadCertificates: async (studentId) => {
    set({ loading: true });
    try {
      const certificates = await api.listCertificates(studentId);
      set({ certificates, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  loadMentorSessions: async (studentId) => {
    set({ loading: true });
    try {
      const mentorSessions = await api.listMentorSessions(studentId);
      set({ mentorSessions, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  scheduleMentorSession: async (session) => {
    await api.scheduleMentorSession(session);
    get().loadMentorSessions(session.studentId);
  },

  loadPeerPods: async () => {
    set({ loading: true });
    try {
      const peerPods = await api.listPeerPods();
      set({ peerPods, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  joinPeerPod: async (podId, studentId) => {
    const { peerPods } = get();
    const pod = peerPods.find(p => p.id === podId);
    if (pod && !pod.memberIds.includes(studentId)) {
      pod.memberIds.push(studentId);
      await api.upsertPeerPod(pod);
      get().loadPeerPods();
    }
  },
}));