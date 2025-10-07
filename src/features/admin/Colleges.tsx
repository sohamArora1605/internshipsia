import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Plus, MapPin, Users, Edit, Trash2 } from 'lucide-react';

const sampleColleges = [
  {
    id: '1',
    name: 'IIT Delhi',
    district: 'New Delhi',
    state: 'Delhi',
    students: 245,
    activeInternships: 89,
    verified: true
  },
  {
    id: '2',
    name: 'NIT Warangal',
    district: 'Warangal',
    state: 'Telangana', 
    students: 189,
    activeInternships: 67,
    verified: true
  },
  {
    id: '3',
    name: 'BITS Pilani',
    district: 'Pilani',
    state: 'Rajasthan',
    students: 156,
    activeInternships: 45,
    verified: false
  },
  {
    id: '4',
    name: 'VIT Vellore',
    district: 'Vellore',
    state: 'Tamil Nadu',
    students: 298,
    activeInternships: 112,
    verified: true
  }
];

export function Colleges() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🏫 College Directory</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage registered educational institutions
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add College</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sampleColleges.map((college) => (
          <Card key={college.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{college.name}</CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {college.district}, {college.state}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={college.verified ? 'success' : 'warning'}>
                    {college.verified ? '✅ Verified' : '⏳ Pending'}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-blue-600">{college.students}</p>
                  <p className="text-xs text-blue-600">Students</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-600">{college.activeInternships}</p>
                  <p className="text-xs text-green-600">Active Internships</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}