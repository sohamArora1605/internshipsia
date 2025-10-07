import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Plus, FileText, Download } from 'lucide-react';

export function Reports() {
  const { user } = useUserStore();
  const { reports, loadReports } = useStudentStore();

  useEffect(() => {
    if (user) {
      loadReports(user.id);
    }
  }, [user, loadReports]);

  const sampleReports = [
    {
      id: '1',
      weekNo: 1,
      internshipTitle: 'Full Stack Developer Intern',
      summary: 'Completed React component development and API integration tasks.',
      approved: true,
      submittedDate: '2024-01-15'
    },
    {
      id: '2', 
      weekNo: 2,
      internshipTitle: 'Full Stack Developer Intern',
      summary: 'Worked on database optimization and user authentication features.',
      approved: false,
      submittedDate: '2024-01-22'
    }
  ];

  const allReports = [...sampleReports, ...reports];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 Weekly Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your internship progress with weekly reports
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </Button>
      </div>

      <div className="space-y-4">
        {allReports.map((report) => (
          <Card key={report.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Week {report.weekNo} - {report.internshipTitle}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Submitted on {new Date(report.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.approved ? 'success' : 'warning'}>
                    {report.approved ? '✅ Approved' : '⏳ Pending'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{report.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}