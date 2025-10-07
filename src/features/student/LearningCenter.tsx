import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { BookOpen, Search, ExternalLink, Clock, Star, Bookmark, BookmarkCheck, Play } from 'lucide-react';

const learningResources = [
  {
    id: '1',
    title: 'Introduction to Programming through C++',
    provider: 'NPTEL',
    category: 'Programming',
    skills: ['C++', 'Programming', 'Data Structures'],
    duration: '12 weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    logoUrl: '/nptel-logo.png',
    url: 'https://nptel.ac.in',
    progress: 0,
    bookmarked: false
  },
  {
    id: '2',
    title: 'Database Management System',
    provider: 'SWAYAM',
    category: 'Database',
    skills: ['SQL', 'Database Design', 'DBMS'],
    duration: '8 weeks',
    difficulty: 'Intermediate',
    rating: 4.6,
    logoUrl: '/swayam-logo.png',
    url: 'https://swayam.gov.in',
    progress: 45,
    bookmarked: true
  },
  {
    id: '3',
    title: 'Machine Learning',
    provider: 'Coursera',
    category: 'AI/ML',
    skills: ['Python', 'Machine Learning', 'Data Science'],
    duration: '11 weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    logoUrl: '/coursera-logo.png',
    url: 'https://coursera.org',
    progress: 78,
    bookmarked: true
  },
  {
    id: '4',
    title: 'Web Development Fundamentals',
    provider: 'NPTEL',
    category: 'Web Development',
    skills: ['HTML', 'CSS', 'JavaScript'],
    duration: '10 weeks',
    difficulty: 'Beginner',
    rating: 4.7,
    logoUrl: '/nptel-logo.png',
    url: 'https://nptel.ac.in',
    progress: 100,
    bookmarked: false
  },
  {
    id: '5',
    title: 'Data Structures and Algorithms',
    provider: 'SWAYAM',
    category: 'Programming',
    skills: ['DSA', 'Problem Solving', 'Algorithms'],
    duration: '14 weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    logoUrl: '/swayam-logo.png',
    url: 'https://swayam.gov.in',
    progress: 23,
    bookmarked: true
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS',
    provider: 'edX',
    category: 'Cloud',
    skills: ['AWS', 'Cloud Computing', 'DevOps'],
    duration: '6 weeks',
    difficulty: 'Advanced',
    rating: 4.5,
    logoUrl: '/edx-logo.png',
    url: 'https://edx.org',
    progress: 0,
    bookmarked: false
  }
];

export function LearningCenter() {
  const [resources, setResources] = useState(learningResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showBookmarked, setShowBookmarked] = useState(false);

  const categories = ['All', 'Programming', 'Web Development', 'AI/ML', 'Database', 'Cloud'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
    const matchesBookmark = !showBookmarked || resource.bookmarked;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  const toggleBookmark = (resourceId: string) => {
    setResources(resources.map(resource => 
      resource.id === resourceId 
        ? { ...resource, bookmarked: !resource.bookmarked }
        : resource
    ));
  };

  const updateProgress = (resourceId: string, progress: number) => {
    setResources(resources.map(resource => 
      resource.id === resourceId 
        ? { ...resource, progress }
        : resource
    ));
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'NPTEL': return 'bg-blue-500';
      case 'SWAYAM': return 'bg-green-500';
      case 'Coursera': return 'bg-purple-500';
      case 'edX': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📚 Learning Center</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover courses from top platforms to enhance your skills
        </p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>

            <div className="flex items-center space-x-4">
              <Button
                variant={showBookmarked ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowBookmarked(!showBookmarked)}
              >
                <Bookmark className="h-4 w-4 mr-1" />
                Bookmarked
              </Button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredResources.length} courses found
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${getProviderColor(resource.provider)}`}>
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {resource.rating}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleBookmark(resource.id)}
                  >
                    {resource.bookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {resource.provider}
                </Badge>
                <Badge variant={getDifficultyColor(resource.difficulty)} className="text-xs">
                  {resource.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>

                  {resource.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {resource.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${resource.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills you'll learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {resource.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {resource.progress > 0 ? 'Continue' : 'Start Learning'}
                  </Button>
                  {resource.progress > 0 && resource.progress < 100 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newProgress = Math.min(resource.progress + 10, 100);
                        updateProgress(resource.id, newProgress);
                      }}
                      title="Mark 10% progress"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}