import { create } from 'zustand';
import type { Analytics } from '../core/models';
import { read } from '../core/localDb';

interface AdminState {
  analytics: Analytics | null;
  loading: boolean;
  
  loadAnalytics: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  analytics: null,
  loading: false,

  loadAnalytics: async () => {
    set({ loading: true });
    try {
      // Compute analytics from stored data
      const internships = read('internships');
      const studentProfiles = read('studentProfiles');
      const colleges = read('colleges');
      
      const bySkill: Record<string, number> = {};
      const byDistrict: Record<string, number> = {};
      
      // Count skills
      for (const internship of internships) {
        for (const skill of internship.skillsRequired) {
          bySkill[skill] = (bySkill[skill] || 0) + 1;
        }
      }
      
      // Count by district
      for (const college of colleges) {
        byDistrict[college.district] = (byDistrict[college.district] || 0) + 1;
      }
      
      // Calculate average employability
      const scores = studentProfiles
        .map(p => p.employabilityScore)
        .filter(s => s !== undefined) as number[];
      const avgEmployability = scores.length > 0 
        ? scores.reduce((a, b) => a + b, 0) / scores.length 
        : 0;
      
      const analytics: Analytics = {
        bySkill,
        byDistrict,
        avgEmployability
      };
      
      set({ analytics, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));