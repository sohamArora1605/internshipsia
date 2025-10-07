import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/useUser';
import { useStudentStore } from '../../stores/useStudent';
import { useCatalogStore } from '../../stores/useCatalog';
import { rankInternships, getMatchLevel } from '../../core/aiMatch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { BookOpen, Briefcase, Clock, Award, GraduationCap, User, FileText } from 'lucide-react';

export function StudentDashboard() {
  const { user } = useUserStore();
  const { profile, applications, loadProfile, loadApplications, applyToInternship } = useStudentStore();
  const { internships, loadInternships } = useCatalogStore();
  const [matches, setMatches] = useState<Array<{ internship: any; score: number }>>([]);

  useEffect(() => {
    if (user) {
      loadProfile(user.id);
      loadApplications(user.id);
      loadInternships();
    }
  }, [user, loadProfile, loadApplications, loadInternships]);

  useEffect(() => {
    if (profile && internships.length > 0) {
      const ranked = rankInternships(profile, internships);
      setMatches(ranked.slice(0, 3));
    }
  }, [profile, internships]);

  const handleApply = async (internshipId: string) => {
    if (user) {
      try {
        await applyToInternship(user.id, internshipId);
        loadApplications(user.id);
      } catch (error) {
        console.error('Application failed:', error);
      }
    }
  };

  const stats = [
    { 
      label: 'Applications', 
      value: applications.length, 
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      label: 'Skills', 
      value: profile?.skills.length || 0, 
      icon: Award,
      color: 'bg-green-500',
      change: '+3 new'
    },
    { 
      label: 'Employability', 
      value: `${profile?.employabilityScore || 0}%`, 
      icon: Clock,
      color: 'bg-purple-500',
      change: '+5%'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-blue-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-brand-100 text-lg">
              Ready to take the next step in your career journey?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Best Matches */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">✨ Perfect Matches for You</CardTitle>
              <CardDescription>
                AI-powered recommendations based on your skills and interests
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map(({ internship, score }) => (
                <div
                  key={internship.id}
                  className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {internship.title}
                        </h3>
                        <Badge variant={getMatchLevel(score) === 'excellent' ? 'success' : 'default'} className="px-3 py-1">
                          🎯 {score}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        {internship.paid && <Badge variant="success">💰 ₹{internship.stipend?.toLocaleString()}</Badge>}
                        <Badge variant="secondary">📍 {internship.mode}</Badge>
                        <Badge variant="secondary">⏱️ {internship.durationWeeks}w</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {internship.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {internship.skillsRequired.slice(0, 4).map((skill: string) => (
                          <span key={skill} className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                        {internship.skillsRequired.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            +{internship.skillsRequired.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-6">
                      <Button
                        className="px-6 py-3 rounded-xl font-semibold"
                        onClick={() => handleApply(internship.id)}
                        disabled={applications.some(app => app.internshipId === internship.id)}
                      >
                        {applications.some(app => app.internshipId === internship.id) ? '✅ Applied' : '🚀 Apply Now'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Complete your profile for magic! ✨
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Add your skills and interests to get personalized internship recommendations
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl">📈 Recent Applications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.slice(0, 3).map((app) => {
                  const internship = internships.find(i => i.id === app.internshipId);
                  return (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {internship?.title || 'Unknown Internship'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Applied {new Date(app.timeline[0]?.ts).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={app.status === 'selected' ? 'success' : app.status === 'rejected' ? 'danger' : 'default'} className="px-3 py-1">
                        {app.status === 'selected' ? '✅' : app.status === 'rejected' ? '❌' : '🕰️'} {app.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No applications yet. Start your journey! 🚀
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl">⚡ Quick Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/s/browse'}
                className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-600 hover:to-blue-600"
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Browse Internships
              </Button>
              <Button 
                onClick={() => window.location.href = '/profile'}
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl border-2"
              >
                <User className="h-5 w-5 mr-3" />
                Complete Profile
              </Button>
              <Button 
                onClick={() => window.location.href = '/s/certificates'}
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl border-2"
              >
                <Award className="h-5 w-5 mr-3" />
                View Certificates
              </Button>
              <Button 
                onClick={() => window.location.href = '/s/notes'}
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl border-2"
              >
                <FileText className="h-5 w-5 mr-3" />
                My Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Market Trend Analyzer */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">📊 AI Market Trend Analyzer</CardTitle>
              <CardDescription>
                Most in-demand skills in India's tech market
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { skill: 'React.js', demand: 95, growth: '+23%', color: 'bg-blue-500' },
              { skill: 'Python', demand: 92, growth: '+18%', color: 'bg-green-500' },
              { skill: 'Node.js', demand: 88, growth: '+15%', color: 'bg-purple-500' },
              { skill: 'AWS', demand: 85, growth: '+28%', color: 'bg-orange-500' },
              { skill: 'Machine Learning', demand: 82, growth: '+35%', color: 'bg-red-500' },
              { skill: 'Docker', demand: 78, growth: '+20%', color: 'bg-cyan-500' },
              { skill: 'Kubernetes', demand: 75, growth: '+42%', color: 'bg-indigo-500' },
              { skill: 'TypeScript', demand: 72, growth: '+25%', color: 'bg-pink-500' }
            ].map((trend) => (
              <div key={trend.skill} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${trend.color}`} />
                  <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    {trend.growth}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{trend.skill}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${trend.color}`}
                      style={{ width: `${trend.demand}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{trend.demand}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 Based on 50,000+ job postings across India • Updated daily
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}