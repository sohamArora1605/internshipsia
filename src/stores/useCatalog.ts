import { create } from 'zustand';
import type { College, Company, Internship } from '../core/models';
import { api } from '../core/mockApi';

interface CatalogState {
  colleges: College[];
  companies: Company[];
  internships: Internship[];
  loading: boolean;
  
  loadColleges: () => Promise<void>;
  loadCompanies: () => Promise<void>;
  loadInternships: (filter?: any) => Promise<void>;
  
  upsertCollege: (college: College) => Promise<void>;
  deleteCollege: (id: string) => Promise<void>;
  
  upsertCompany: (company: Company) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  
  createInternship: (internship: Omit<Internship, 'id' | 'createdAt'>) => Promise<Internship>;
  updateInternship: (internship: Internship) => Promise<void>;
  deleteInternship: (id: string) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  colleges: [],
  companies: [],
  internships: [],
  loading: false,

  loadColleges: async () => {
    set({ loading: true });
    try {
      const colleges = await api.listColleges();
      set({ colleges, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  loadCompanies: async () => {
    set({ loading: true });
    try {
      const companies = await api.listCompanies();
      set({ companies, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  loadInternships: async (filter) => {
    set({ loading: true });
    try {
      const internships = await api.listInternships(filter);
      set({ internships, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  upsertCollege: async (college) => {
    await api.upsertCollege(college);
    get().loadColleges();
  },

  deleteCollege: async (id) => {
    await api.deleteCollege(id);
    get().loadColleges();
  },

  upsertCompany: async (company) => {
    await api.upsertCompany(company);
    get().loadCompanies();
  },

  deleteCompany: async (id) => {
    await api.deleteCompany(id);
    get().loadCompanies();
  },

  createInternship: async (internship) => {
    const created = await api.createInternship(internship);
    get().loadInternships();
    return created;
  },

  updateInternship: async (internship) => {
    await api.updateInternship(internship);
    get().loadInternships();
  },

  deleteInternship: async (id) => {
    await api.deleteInternship(id);
    get().loadInternships();
  },
}));