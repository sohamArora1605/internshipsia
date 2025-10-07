import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';

export function CreditPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Credit Panel</h1>
        <p className="text-gray-600 dark:text-gray-400">Award credits to students</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Credit Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Credit panel features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}