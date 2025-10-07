import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Plus, Eye, Edit, Trash2, MapPin, Clock, DollarSign, Search, Users } from 'lucide-react';

const generateApplicants = () => {
  const names = ['Rahul Sharma', 'Priya Patel', 'Arjun Kumar', 'Sneha Singh', 'Vikram Gupta'];
  const colleges = ['IIT Delhi', 'NIT Trichy', 'BITS Pilani', 'VIT Vellore', 'SRM Chennai'];
  const skills = ['React', 'Node.js', 'Python', 'Java', 'JavaScript'];
  
  return Array.from({length: 50}, (_, i) => ({
    id: `app_${i + 1}`,
    name: names[Math.floor(Math.random() * names.length)],
    email: `student${i + 1}@example.com`,
    college: colleges[Math.floor(Math.random() * colleges.length)],
    cgpa: (7 + Math.random() * 3).toFixed(2),
    skills: skills.slice(0, Math.floor(Math.random() * 3) + 2),
    appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: ['pending', 'shortlisted', 'rejected'][Math.floor(Math.random() * 3)]
  }));
};

const samplePostings = [
  {
    id: '1',
    title: 'Full Stack Developer Intern',
    description: 'Work on React and Node.js applications, learn modern web development practices.',
    mode: 'remote',
    paid: true,
    stipend: 15000,
    duration: 12,
    skills: ['JavaScript', 'React', 'Node.js'],
    applications: generateApplicants(),
    openings: 3,
    status: 'active',
    postedDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'Mobile App Developer Intern', 
    description: 'Develop mobile applications using React Native and Flutter frameworks.',
    mode: 'hybrid',
    paid: true,
    stipend: 18000,
    duration: 10,
    skills: ['React Native', 'Flutter'],
    applications: generateApplicants().slice(0, 15),
    openings: 2,
    status: 'active',
    postedDate: '2024-01-15'
  },
  {
    id: '3',
    title: 'DevOps Engineer Intern',
    description: 'Learn cloud infrastructure, CI/CD pipelines, and containerization.',
    mode: 'onsite',
    paid: true,
    stipend: 20000,
    duration: 16,
    skills: ['AWS', 'Docker', 'Kubernetes'],
    applications: generateApplicants().slice(0, 8),
    openings: 1,
    status: 'closed',
    postedDate: '2024-01-05'
  }
];

export function Postings() {
  const [postings, setPostings] = useState(samplePostings);
  const [viewingApplicants, setViewingApplicants] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const updateApplicantStatus = (postingId: string, applicantId: string, newStatus: string) => {
    setPostings(postings.map(posting => 
      posting.id === postingId 
        ? {
            ...posting,
            applications: posting.applications.map((app: any) => 
              app.id === applicantId ? { ...app, status: newStatus } : app
            )
          }
        : posting
    ));
  };

  const filteredApplicants = viewingApplicants?.applications.filter((app: any) => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.college.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">💼 My Postings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your internship opportunities
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Posting</span>
        </Button>
      </div>

      <div className="space-y-4">
        {samplePostings.map((posting) => (
          <Card key={posting.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{posting.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Posted on {new Date(posting.postedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={posting.status === 'active' ? 'success' : 'secondary'}>
                    {posting.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{posting.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{posting.mode}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">{posting.duration} weeks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {posting.paid ? `₹${posting.stipend?.toLocaleString()}` : 'Unpaid'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {posting.applications.length} applications
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Required Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {posting.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {posting.openings} opening{posting.openings !== 1 ? 's' : ''} available
                  </span>
                  <Button size="sm" onClick={() => setViewingApplicants(posting)}>
                    View Applications ({posting.applications.length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Applicants Modal */}
      <Modal 
        isOpen={!!viewingApplicants} 
        onClose={() => setViewingApplicants(null)}
        title={`Applicants for ${viewingApplicants?.title}`}
        size="xl"
      >
        {viewingApplicants && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredApplicants.map((applicant: any) => (
                <div key={applicant.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{applicant.name}</h4>
                        <Badge variant={applicant.status === 'shortlisted' ? 'success' : applicant.status === 'rejected' ? 'danger' : 'default'}>
                          {applicant.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">College: </span>
                          <span className="text-gray-900 dark:text-white">{applicant.college}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">CGPA: </span>
                          <span className="text-gray-900 dark:text-white">{applicant.cgpa}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateApplicantStatus(viewingApplicants.id, applicant.id, 'shortlisted')}
                        disabled={applicant.status === 'shortlisted'}
                      >
                        {applicant.status === 'shortlisted' ? '✅ Shortlisted' : 'Shortlist'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateApplicantStatus(viewingApplicants.id, applicant.id, 'rejected')}
                        disabled={applicant.status === 'rejected'}
                      >
                        {applicant.status === 'rejected' ? '❌ Rejected' : 'Reject'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}