import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">System configuration and data management</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Settings features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}