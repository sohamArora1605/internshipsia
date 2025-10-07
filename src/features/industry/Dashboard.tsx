import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Briefcase, Users, Eye, TrendingUp } from 'lucide-react';

export function IndustryDashboard() {
  const stats = [
    { label: 'Active Postings', value: '5', icon: Briefcase },
    { label: 'Total Applications', value: '23', icon: Users },
    { label: 'Profile Views', value: '156', icon: Eye },
    { label: 'Hire Rate', value: '18%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Industry Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your internship programs</p>
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
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Industry dashboard features coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}