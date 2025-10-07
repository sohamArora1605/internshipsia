import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function Applicants() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applicants</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and manage applicants</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Applicants features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}