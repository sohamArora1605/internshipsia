import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { GraduationCap, Building2, Users, FileText } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Students', value: '1,234', icon: Users },
    { label: 'Colleges', value: '45', icon: GraduationCap },
    { label: 'Companies', value: '78', icon: Building2 },
    { label: 'Certificates Issued', value: '567', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">System overview and management</p>
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
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Admin dashboard features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}