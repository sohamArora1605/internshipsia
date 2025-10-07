import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { verifyCert, exportCertAsJSON } from '../../core/hashChain';
import { Shield, Download, ExternalLink, Award, BookOpen } from 'lucide-react';

const earnedCertificates = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    provider: 'NPTEL',
    issueDate: '2024-01-15',
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: '2',
    title: 'Python Programming',
    provider: 'SWAYAM',
    issueDate: '2024-02-20',
    skills: ['Python', 'Programming']
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    provider: 'Coursera',
    issueDate: '2024-03-10',
    skills: ['DSA', 'Problem Solving']
  },
  {
    id: '4',
    title: 'React.js Complete Course',
    provider: 'NPTEL',
    issueDate: '2024-03-25',
    skills: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '5',
    title: 'Machine Learning Basics',
    provider: 'SWAYAM',
    issueDate: '2024-04-10',
    skills: ['ML', 'Python', 'Data Science']
  }
];

export function Certificates() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { certificates, loadCertificates } = useStudentStore();
  const [verificationStatus, setVerificationStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      loadCertificates(user.id);
    }
  }, [user, loadCertificates]);

  const handleVerify = async (cert: any) => {
    try {
      const isValid = await verifyCert(cert);
      setVerificationStatus(prev => ({ ...prev, [cert.id]: isValid }));
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const handleDownload = (cert: any) => {
    const jsonData = exportCertAsJSON(cert);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${cert.badgeId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allCertificates = [...earnedCertificates, ...certificates];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🏆 My Certificates</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View, verify, and manage your earned certificates
          </p>
        </div>
        <Button onClick={() => navigate('/s/learning')} className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Browse Courses</span>
        </Button>
      </div>

      {allCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCertificates.map((cert) => (
            <Card key={cert.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-brand-100 dark:bg-brand-900 rounded-lg">
                    <Award className="h-6 w-6 text-brand-600" />
                  </div>
                  <Badge variant="success" className="text-xs">
                    ✅ Earned
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Issued by {cert.provider} • {new Date(cert.issueDate).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skills Covered:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Certificate earned on completion
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No certificates yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Complete courses to earn your first certificate!
            </p>
            <Button onClick={() => navigate('/s/learning')}>
              <BookOpen className="h-4 w-4 mr-2" />
              Explore Courses
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}