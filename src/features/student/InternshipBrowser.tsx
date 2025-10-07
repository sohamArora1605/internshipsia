import React, { useEffect, useState } from 'react';
import { useCatalogStore } from '../../stores/useCatalog';
import { useStudentStore } from '../../stores/useStudent';
import { useUserStore } from '../../stores/useUser';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { ApplicationModal } from './ApplicationModal';
import { Search, MapPin, Clock, DollarSign } from 'lucide-react';

export function InternshipBrowser() {
  const { user } = useUserStore();
  const { internships, loadInternships } = useCatalogStore();
  const { applications, applyToInternship, loadApplications } = useStudentStore();
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [paidFilter, setPaidFilter] = useState<string>('all');
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    loadInternships();
    if (user) {
      loadApplications(user.id);
    }
  }, [loadInternships, loadApplications, user]);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(search.toLowerCase()) ||
                         internship.description.toLowerCase().includes(search.toLowerCase()) ||
                         internship.skillsRequired.some(skill => 
                           skill.toLowerCase().includes(search.toLowerCase())
                         );
    
    const matchesMode = modeFilter === 'all' || internship.mode === modeFilter;
    const matchesPaid = paidFilter === 'all' || 
                       (paidFilter === 'paid' && internship.paid) ||
                       (paidFilter === 'unpaid' && !internship.paid);

    return matchesSearch && matchesMode && matchesPaid;
  });

  const handleApplyClick = (internship: any) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  const handleApply = async (applicationData?: any) => {
    if (user && selectedInternship) {
      try {
        await applyToInternship(user.id, selectedInternship.id);
        loadApplications(user.id);
        console.log('Application submitted:', applicationData);
      } catch (error) {
        console.error('Application failed:', error);
      }
    }
  };

  const isApplied = (internshipId: string) => {
    return applications.some(app => app.internshipId === internshipId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Internships</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover opportunities that match your skills and interests
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="all">All Modes</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>

            <select
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="all">All Types</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>

            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              {filteredInternships.length} internships found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Internship List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{internship.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{internship.mode}</Badge>
                    {internship.paid && (
                      <Badge variant="success">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ₹{internship.stipend?.toLocaleString()}
                      </Badge>
                    )}
                    {internship.isTrial && <Badge variant="warning">Trial</Badge>}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {internship.durationWeeks}w
                  </div>
                  {internship.city && (
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {internship.city}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {internship.description}
              </p>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Required Skills:
                </p>
                <div className="flex flex-wrap gap-1">
                  {internship.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {internship.openings} opening{internship.openings !== 1 ? 's' : ''}
                </div>
                <Button
                  onClick={() => handleApplyClick(internship)}
                  disabled={isApplied(internship.id)}
                  variant={isApplied(internship.id) ? 'secondary' : 'default'}
                >
                  {isApplied(internship.id) ? '✅ Applied' : '🚀 Apply Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No internships found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}

      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        internship={selectedInternship}
        onApply={handleApply}
      />
    </div>
  );
}