import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function Directory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Directory</h1>
        <p className="text-gray-600 dark:text-gray-400">District-wise internship directory</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Internship Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Directory features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}