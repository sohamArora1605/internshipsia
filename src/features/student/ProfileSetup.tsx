import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { useCatalogStore } from '../../stores/useCatalog';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { generateId } from '../../core/localDb';
import { api } from '../../core/mockApi';

interface ProfileSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSetup({ isOpen, onClose }: ProfileSetupProps) {
  const { user } = useUserStore();
  const { updateProfile } = useStudentStore();
  const { colleges, loadColleges } = useCatalogStore();
  const [formData, setFormData] = useState({
    branch: '',
    semester: 1,
    cgpa: '',
    skills: '',
    interests: '',
    collegeId: ''
  });

  useEffect(() => {
    loadColleges();
  }, [loadColleges]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const profile = {
      id: generateId(),
      userId: user.id,
      branch: formData.branch,
      semester: formData.semester,
      cgpa: formData.cgpa ? parseFloat(formData.cgpa) : undefined,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean),
      badges: [],
      employabilityScore: 50
    };

    await updateProfile(profile);
    
    // Update user profile complete status
    const updatedUser = { ...user, profileComplete: true, collegeId: formData.collegeId };
    await api.upsertUser(updatedUser);
    
    onClose();
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="✨ Complete Your Profile" size="lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Help us personalize your internship experience
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">College</label>
            <select
              value={formData.collegeId}
              onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">Select your college</option>
              {colleges.map(college => (
                <option key={college.id} value={college.id}>{college.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="Branch/Stream"
            value={formData.branch}
            onChange={(e) => setFormData({...formData, branch: e.target.value})}
            required
            placeholder="e.g., Computer Science"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Semester</label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            >
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <Input
            label="CGPA (Optional)"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={formData.cgpa}
            onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
            placeholder="e.g., 8.5"
          />
        </div>

        <Input
          label="Skills"
          value={formData.skills}
          onChange={(e) => setFormData({...formData, skills: e.target.value})}
          required
          placeholder="e.g., JavaScript, Python, React (comma separated)"
        />

        <Input
          label="Interests"
          value={formData.interests}
          onChange={(e) => setFormData({...formData, interests: e.target.value})}
          placeholder="e.g., Web Development, AI, Data Science (comma separated)"
        />

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Skip for now
          </Button>
          <Button type="submit" className="flex-1">
            Complete Profile 🚀
          </Button>
        </div>
      </form>
    </Modal>
  );
}