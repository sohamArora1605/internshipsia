import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { useCatalogStore } from '../../stores/useCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Badge } from '../shared/Badge';
import { User, Edit, Save, X, Plus, Trash2 } from 'lucide-react';

export function Profile() {
  const { user } = useUserStore();
  const { profile, loadProfile, updateProfile } = useStudentStore();
  const { colleges, loadColleges } = useCatalogStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    branch: '',
    semester: 1,
    cgpa: '',
    skills: [] as string[],
    interests: [] as string[],
    resumeUrl: '',
    portfolioUrl: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile(user.id);
      loadColleges();
    }
  }, [user, loadProfile, loadColleges]);

  useEffect(() => {
    if (profile) {
      setFormData({
        branch: profile.branch,
        semester: profile.semester,
        cgpa: profile.cgpa?.toString() || '',
        skills: [...profile.skills],
        interests: [...profile.interests],
        resumeUrl: profile.resumeUrl || '',
        portfolioUrl: profile.portfolioUrl || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        branch: formData.branch,
        semester: formData.semester,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : undefined,
        skills: formData.skills,
        interests: formData.interests,
        resumeUrl: formData.resumeUrl,
        portfolioUrl: formData.portfolioUrl
      };
      await updateProfile(updatedProfile);
      setEditing(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({...formData, skills: [...formData.skills, newSkill.trim()]});
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({...formData, skills: formData.skills.filter(s => s !== skill)});
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({...formData, interests: [...formData.interests, newInterest.trim()]});
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
  };

  const college = colleges.find(c => c.id === user?.collegeId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and skills</p>
        </div>
        <Button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className="flex items-center space-x-2"
        >
          {editing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          <span>{editing ? 'Save Changes' : 'Edit Profile'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <p className="text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">College</label>
                  <p className="text-gray-900 dark:text-white">{college?.name || 'Not specified'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <p className="text-gray-900 dark:text-white">{user?.phone || 'Not specified'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Branch/Stream"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  disabled={!editing}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Semester</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                    disabled={!editing}
                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                  >
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="CGPA"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                  disabled={!editing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Resume URL"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                disabled={!editing}
                placeholder="https://..."
              />
              <Input
                label="Portfolio URL"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                disabled={!editing}
                placeholder="https://..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Skills & Interests */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-1">
                      <Badge variant="default">{skill}</Badge>
                      {editing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <div className="flex space-x-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add new skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-1">
                      <Badge variant="secondary">{interest}</Badge>
                      {editing && (
                        <button
                          onClick={() => removeInterest(interest)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editing && (
                  <div className="flex space-x-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add new interest"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button onClick={addInterest} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Employability Score</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{profile?.employabilityScore || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Skills Count</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formData.skills.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Badges Earned</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{profile?.badges.length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {editing && (
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}