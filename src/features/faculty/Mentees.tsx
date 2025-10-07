import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Users, Clock, CheckCircle, AlertTriangle, Search, MessageCircle, Edit, Eye } from 'lucide-react';

const sampleMentees = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    internship: 'Full Stack Developer',
    totalHours: 120,
    weeklyHours: 35,
    lastLogDate: '2024-01-15',
    riskLevel: 'low',
    pendingLogs: 2
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com', 
    internship: 'Data Science Intern',
    totalHours: 80,
    weeklyHours: 15,
    lastLogDate: '2024-01-10',
    riskLevel: 'high',
    pendingLogs: 5
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    email: 'arjun@example.com',
    internship: 'UI/UX Design Intern', 
    totalHours: 95,
    weeklyHours: 28,
    lastLogDate: '2024-01-14',
    riskLevel: 'medium',
    pendingLogs: 1
  }
];

export function Mentees() {
  const [mentees, setMentees] = useState(sampleMentees);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const filteredMentees = mentees.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.internship.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || student.riskLevel === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const approveLogs = (studentId: string) => {
    setMentees(mentees.map(student => 
      student.id === studentId 
        ? { ...student, pendingLogs: 0, totalHours: student.totalHours + 8 }
        : student
    ));
  };

  const provideFeedback = () => {
    if (selectedStudent && feedback.trim()) {
      alert(`Feedback sent to ${selectedStudent.name}: ${feedback}`);
      setFeedback('');
      setShowFeedbackModal(false);
    }
  };

  const updateRiskLevel = (studentId: string, newRisk: string) => {
    setMentees(mentees.map(student => 
      student.id === studentId 
        ? { ...student, riskLevel: newRisk }
        : student
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 My Mentees</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor and guide your students' internship progress
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name or internship..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="All">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMentees.map((mentee) => (
          <Card key={mentee.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{mentee.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mentee.internship}
                  </p>
                </div>
                <Badge variant={getRiskColor(mentee.riskLevel)}>
                  {mentee.riskLevel} risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Hours</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{mentee.totalHours}h</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">This Week</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{mentee.weeklyHours}h</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Log:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(mentee.lastLogDate).toLocaleDateString()}
                  </span>
                </div>

                {mentee.pendingLogs > 0 && (
                  <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-200">
                      {mentee.pendingLogs} logs pending verification
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => setSelectedStudent(mentee)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedStudent(mentee);
                      setShowFeedbackModal(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Details Modal */}
      <Modal 
        isOpen={!!selectedStudent && !showFeedbackModal} 
        onClose={() => setSelectedStudent(null)}
        title={`${selectedStudent?.name} - Details`}
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="text-gray-900 dark:text-white">{selectedStudent.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Hours</label>
                <p className="text-gray-900 dark:text-white">{selectedStudent.totalHours}h</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Level</label>
                <select
                  value={selectedStudent.riskLevel}
                  onChange={(e) => updateRiskLevel(selectedStudent.id, e.target.value)}
                  className="w-full h-8 rounded border border-gray-300 px-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Logs</label>
                <p className="text-gray-900 dark:text-white">{selectedStudent.pendingLogs}</p>
              </div>
            </div>
            
            {selectedStudent.pendingLogs > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                  This student has {selectedStudent.pendingLogs} pending log entries for approval.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => approveLogs(selectedStudent.id)}
                >
                  Approve All Logs
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Feedback Modal */}
      <Modal 
        isOpen={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(false)}
        title="Provide Feedback"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Feedback for {selectedStudent?.name}
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback..."
              className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button onClick={provideFeedback} className="flex-1">
              Submit Feedback
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowFeedbackModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}