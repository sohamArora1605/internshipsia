import { create } from 'zustand';
import type { LogEntry, Report, CreditRecord } from '../core/models';
import { api } from '../core/mockApi';

interface FacultyState {
  logs: LogEntry[];
  reports: Report[];
  credits: CreditRecord[];
  loading: boolean;

  loadLogs: (studentId?: string) => Promise<void>;
  verifyLog: (logId: string, feedback: string) => Promise<void>;
  
  loadReports: () => Promise<void>;
  approveReport: (reportId: string) => Promise<void>;
  
  loadCredits: () => Promise<void>;
  awardCredits: (credit: CreditRecord) => Promise<void>;
}

export const useFacultyStore = create<FacultyState>((set, get) => ({
  logs: [],
  reports: [],
  credits: [],
  loading: false,

  loadLogs: async (studentId) => {
    set({ loading: true });
    try {
      const logs = await api.listLogs(studentId || '');
      set({ logs, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  verifyLog: async (logId, feedback) => {
    const { logs } = get();
    const log = logs.find(l => l.id === logId);
    if (log) {
      log.verifiedByFaculty = true;
      log.mentorFeedback = feedback;
      await api.updateLog(log);
      get().loadLogs();
    }
  },

  loadReports: async () => {
    set({ loading: true });
    try {
      const reports = await api.listReports();
      set({ reports, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  approveReport: async (reportId) => {
    const { reports } = get();
    const report = reports.find(r => r.id === reportId);
    if (report) {
      report.approved = true;
      await api.upsertReport(report);
      get().loadReports();
    }
  },

  loadCredits: async () => {
    set({ loading: true });
    try {
      const credits = await api.listCredits();
      set({ credits, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  awardCredits: async (credit) => {
    await api.addCredit(credit);
    get().loadCredits();
  },
}));