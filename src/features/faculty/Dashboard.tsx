import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Users, CheckCircle, Clock, Award } from 'lucide-react';

export function FacultyDashboard() {
  const stats = [
    { label: 'Mentees', value: '12', icon: Users },
    { label: 'Pending Approvals', value: '3', icon: Clock },
    { label: 'Verified Logs', value: '45', icon: CheckCircle },
    { label: 'Credits Awarded', value: '28', icon: Award },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and guide your mentees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-brand-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Faculty dashboard features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}