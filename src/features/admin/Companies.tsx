import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function Companies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Companies</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage registered companies</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Company Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Companies features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}