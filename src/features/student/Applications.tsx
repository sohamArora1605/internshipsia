import React, { useEffect } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { useCatalogStore } from '../../stores/useCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { StatusBadge } from '../shared/Badge';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

export function Applications() {
  const { user } = useUserStore();
  const { applications, loadApplications, withdrawApplication } = useStudentStore();
  const { internships, companies, loadInternships, loadCompanies } = useCatalogStore();

  useEffect(() => {
    if (user) {
      loadApplications(user.id);
    }
    loadInternships();
    loadCompanies();
  }, [user, loadApplications, loadInternships, loadCompanies]);

  const handleWithdraw = async (applicationId: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      await withdrawApplication(applicationId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your internship applications and their status
        </p>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => {
            const internship = internships.find(i => i.id === application.internshipId);
            const company = companies.find(c => c.id === internship?.companyId);
            
            return (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {internship?.title || 'Unknown Internship'}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">
                        {company?.name || 'Unknown Company'}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  {internship && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {internship.durationWeeks} weeks
                      </div>
                      {internship.city && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          {internship.city}
                        </div>
                      )}
                      {internship.paid && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4 mr-2" />
                          ₹{internship.stipend?.toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timeline</h4>
                    <div className="space-y-2">
                      {application.timeline.map((event, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-brand-600 rounded-full mr-3" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {new Date(event.ts).toLocaleDateString()} - {event.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {application.status === 'applied' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWithdraw(application.id)}
                    >
                      Withdraw Application
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start browsing internships to submit your first application
            </p>
            <Button>Browse Internships</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}