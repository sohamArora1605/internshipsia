import { create } from 'zustand';
import type { Internship, Application } from '../core/models';
import { api } from '../core/mockApi';

interface IndustryState {
  internships: Internship[];
  applications: Application[];
  loading: boolean;

  loadInternships: (companyId: string) => Promise<void>;
  createInternship: (internship: Omit<Internship, 'id' | 'createdAt'>) => Promise<void>;
  updateInternship: (internship: Internship) => Promise<void>;
  deleteInternship: (id: string) => Promise<void>;
  
  loadApplications: (internshipId: string) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: Application['status'], note?: string) => Promise<void>;
}

export const useIndustryStore = create<IndustryState>((set, get) => ({
  internships: [],
  applications: [],
  loading: false,

  loadInternships: async (companyId) => {
    set({ loading: true });
    try {
      const internships = await api.listInternships({ companyId });
      set({ internships, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  createInternship: async (internship) => {
    await api.createInternship(internship);
    get().loadInternships(internship.companyId);
  },

  updateInternship: async (internship) => {
    await api.updateInternship(internship);
    get().loadInternships(internship.companyId);
  },

  deleteInternship: async (id) => {
    await api.deleteInternship(id);
    // Reload current company's internships
    const { internships } = get();
    if (internships.length > 0) {
      get().loadInternships(internships[0].companyId);
    }
  },

  loadApplications: async (internshipId) => {
    set({ loading: true });
    try {
      const applications = await api.listApplicationsByInternship(internshipId);
      set({ applications, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  updateApplicationStatus: async (applicationId, status, note) => {
    await api.updateApplicationStatus(applicationId, status, undefined, note);
    const { applications } = get();
    const app = applications.find(a => a.id === applicationId);
    if (app) {
      get().loadApplications(app.internshipId);
    }
  },
}));