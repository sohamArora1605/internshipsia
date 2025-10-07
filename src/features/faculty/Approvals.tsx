import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function Approvals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Approvals</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and approve student reports</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Approvals features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}