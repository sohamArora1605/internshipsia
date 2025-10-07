import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Input, Textarea } from '../shared/Input';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { Zap, Edit, Upload } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: any;
  onApply: (applicationData?: any) => void;
}

export function ApplicationModal({ isOpen, onClose, internship, onApply }: ApplicationModalProps) {
  const { user } = useUserStore();
  const { profile } = useStudentStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    whyInterested: '',
    relevantExperience: '',
    availability: '',
    expectedSalary: '',
    portfolioLinks: ''
  });

  const handleAutoApply = () => {
    onApply({
      type: 'auto',
      coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for the ${internship.title} position. With my background in ${profile?.branch} and skills in ${profile?.skills.slice(0, 3).join(', ')}, I believe I would be a great fit for this role.\n\nThank you for considering my application.\n\nBest regards,\n${user?.name}`,
      autoFilled: true
    });
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      type: 'manual',
      ...formData,
      autoFilled: false
    });
    onClose();
  };

  if (!showForm) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="🚀 Apply for Internship" size="md">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {internship?.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose how you'd like to apply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-brand-200 dark:border-brand-800 rounded-xl p-6 hover:border-brand-400 transition-colors">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Auto Apply</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Quick application using your profile data
                  </p>
                </div>
                <Button onClick={handleAutoApply} className="w-full">
                  Apply Instantly ⚡
                </Button>
              </div>
            </div>

            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-gray-400 transition-colors">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Edit className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Manual Apply</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Customize your application with personal details
                  </p>
                </div>
                <Button variant="outline" onClick={() => setShowForm(true)} className="w-full">
                  Customize Application ✏️
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📝 Customize Your Application" size="lg">
      <form onSubmit={handleManualSubmit} className="space-y-6">
        <Textarea
          label="Cover Letter"
          value={formData.coverLetter}
          onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
          placeholder="Write a compelling cover letter..."
          className="min-h-[120px]"
          required
        />

        <Textarea
          label="Why are you interested in this role?"
          value={formData.whyInterested}
          onChange={(e) => setFormData({...formData, whyInterested: e.target.value})}
          placeholder="Explain your interest in this specific internship..."
          required
        />

        <Textarea
          label="Relevant Experience"
          value={formData.relevantExperience}
          onChange={(e) => setFormData({...formData, relevantExperience: e.target.value})}
          placeholder="Describe any relevant projects, coursework, or experience..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Availability"
            value={formData.availability}
            onChange={(e) => setFormData({...formData, availability: e.target.value})}
            placeholder="e.g., Immediately, After exams"
          />

          <Input
            label="Expected Stipend (if applicable)"
            value={formData.expectedSalary}
            onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
            placeholder="e.g., ₹15,000/month"
          />
        </div>

        <Input
          label="Portfolio/Project Links"
          value={formData.portfolioLinks}
          onChange={(e) => setFormData({...formData, portfolioLinks: e.target.value})}
          placeholder="GitHub, portfolio website, project demos..."
        />

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Submit Application 🚀
          </Button>
        </div>
      </form>
    </Modal>
  );
}