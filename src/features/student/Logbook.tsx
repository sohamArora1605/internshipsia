import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { useCatalogStore } from '../../stores/useCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Input, Textarea } from '../shared/Input';
import { Badge, StatusBadge } from '../shared/Badge';
import { Modal } from '../shared/Modal';
import { generateId } from '../../core/localDb';
import { Plus, Calendar, Clock, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export function Logbook() {
  const { user } = useUserStore();
  const { logs, applications, loadLogs, loadApplications, addLog } = useStudentStore();
  const { internships, loadInternships } = useCatalogStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    internshipId: '',
    date: new Date().toISOString().split('T')[0],
    tasks: '',
    hours: ''
  });

  useEffect(() => {
    if (user) {
      loadLogs(user.id);
      loadApplications(user.id);
      loadInternships();
    }
  }, [user, loadLogs, loadApplications, loadInternships]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const logEntry = {
      id: generateId(),
      studentId: user.id,
      internshipId: formData.internshipId,
      date: formData.date,
      tasks: formData.tasks,
      hours: parseFloat(formData.hours),
      verifiedByFaculty: false
    };

    await addLog(logEntry);
    setFormData({
      internshipId: '',
      date: new Date().toISOString().split('T')[0],
      tasks: '',
      hours: ''
    });
    setShowAddModal(false);
  };

  const activeInternships = applications
    .filter(app => app.status === 'selected')
    .map(app => internships.find(i => i.id === app.internshipId))
    .filter(Boolean);

  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
  const verifiedHours = logs.filter(log => log.verifiedByFaculty).reduce((sum, log) => sum + log.hours, 0);
  const pendingLogs = logs.filter(log => !log.verifiedByFaculty).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📝 Daily Logbook</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your daily internship activities and progress
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Entry</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Hours</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalHours}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified Hours</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{verifiedHours}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Verification</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingLogs}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Entries */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.slice().reverse().map((log) => {
                const internship = internships.find(i => i.id === log.internshipId);
                return (
                  <div key={log.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {internship?.title || 'Unknown Internship'}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(log.date).toLocaleDateString()} • {log.hours} hours
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {navigator.onLine ? (
                          <Wifi className="h-4 w-4 text-green-500" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={log.verifiedByFaculty ? 'success' : 'warning'}>
                          {log.verifiedByFaculty ? '✅ Verified' : '⏳ Pending'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{log.tasks}</p>
                    {log.mentorFeedback && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Mentor Feedback:
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{log.mentorFeedback}</p>
                      </div>
                    )}
                    {log.companyFeedback && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mt-2">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                          Company Feedback:
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">{log.companyFeedback}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No log entries yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start tracking your internship activities
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                Add Your First Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Entry Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="📝 Add Log Entry" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Internship</label>
            <select
              value={formData.internshipId}
              onChange={(e) => setFormData({...formData, internshipId: e.target.value})}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">Select internship</option>
              {activeInternships.map(internship => (
                <option key={internship.id} value={internship.id}>{internship.title}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <Input
              label="Hours Worked"
              type="number"
              step="0.5"
              min="0.5"
              max="12"
              value={formData.hours}
              onChange={(e) => setFormData({...formData, hours: e.target.value})}
              placeholder="e.g., 8"
              required
            />
          </div>

          <Textarea
            label="Tasks & Activities"
            value={formData.tasks}
            onChange={(e) => setFormData({...formData, tasks: e.target.value})}
            placeholder="Describe what you worked on today..."
            className="min-h-[120px]"
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {navigator.onLine ? 'Add Entry 🚀' : 'Queue Entry 💾'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}