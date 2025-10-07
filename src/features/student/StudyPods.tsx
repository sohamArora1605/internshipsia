import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Users, Clock, Trophy, BookOpen, MessageCircle, Play, Plus, Settings } from 'lucide-react';

const samplePods = [
  {
    id: '1',
    title: 'MERN Stack Masters',
    description: 'Learn full-stack development with MongoDB, Express, React, and Node.js',
    members: 24,
    maxMembers: 30,
    category: 'Web Development',
    level: 'Intermediate',
    sponsor: 'TechCorp India',
    currentStudying: 'React Hooks & Context API',
    todayWinner: 'Priya S.',
    studyDuration: '2h 45m',
    joined: false
  },
  {
    id: '2',
    title: 'Data Science Explorers',
    description: 'Dive deep into machine learning, statistics, and data visualization',
    members: 18,
    maxMembers: 25,
    category: 'Data Science',
    level: 'Advanced',
    sponsor: 'InnovateLabs',
    currentStudying: 'Neural Networks & Deep Learning',
    todayWinner: 'Rahul K.',
    studyDuration: '3h 20m',
    joined: true
  },
  {
    id: '3',
    title: 'Python Beginners Circle',
    description: 'Start your programming journey with Python fundamentals',
    members: 32,
    maxMembers: 40,
    category: 'Programming',
    level: 'Beginner',
    sponsor: null,
    currentStudying: 'Object-Oriented Programming',
    todayWinner: 'Anita M.',
    studyDuration: '1h 30m',
    joined: false
  },
  {
    id: '4',
    title: 'UI/UX Design Studio',
    description: 'Master user interface and user experience design principles',
    members: 15,
    maxMembers: 20,
    category: 'Design',
    level: 'Intermediate',
    sponsor: 'StartupXYZ',
    currentStudying: 'Figma Advanced Prototyping',
    todayWinner: 'Karan T.',
    studyDuration: '2h 15m',
    joined: true
  },
  {
    id: '5',
    title: 'Cybersecurity Warriors',
    description: 'Learn ethical hacking, network security, and penetration testing',
    members: 12,
    maxMembers: 15,
    category: 'Security',
    level: 'Advanced',
    sponsor: 'TechCorp India',
    currentStudying: 'Web Application Security',
    todayWinner: 'Sneha R.',
    studyDuration: '4h 10m',
    joined: false
  },
  {
    id: '6',
    title: 'Mobile App Developers',
    description: 'Build amazing mobile apps with React Native and Flutter',
    members: 21,
    maxMembers: 25,
    category: 'Mobile Development',
    level: 'Intermediate',
    sponsor: 'InnovateLabs',
    currentStudying: 'State Management in React Native',
    todayWinner: 'Arjun P.',
    studyDuration: '2h 55m',
    joined: false
  }
];

export function StudyPods() {
  const [pods, setPods] = useState(samplePods);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPod, setNewPod] = useState({
    title: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    maxMembers: 25,
    currentStudying: ''
  });

  const categories = ['All', 'Web Development', 'Data Science', 'Programming', 'Design', 'Security', 'Mobile Development'];

  const filteredPods = selectedCategory === 'All' 
    ? pods 
    : pods.filter(pod => pod.category === selectedCategory);

  const handleJoinPod = (podId: string) => {
    setPods(pods.map(pod => 
      pod.id === podId 
        ? { ...pod, joined: !pod.joined, members: pod.joined ? pod.members - 1 : pod.members + 1 }
        : pod
    ));
  };

  const createPod = () => {
    if (!newPod.title.trim()) return;
    
    const pod = {
      id: Date.now().toString(),
      title: newPod.title,
      description: newPod.description,
      members: 1,
      maxMembers: newPod.maxMembers,
      category: newPod.category,
      level: newPod.level,
      sponsor: null,
      currentStudying: newPod.currentStudying,
      todayWinner: 'You',
      studyDuration: '0h 0m',
      joined: true
    };
    
    setPods([pod, ...pods]);
    setNewPod({
      title: '',
      description: '',
      category: 'Programming',
      level: 'Beginner',
      maxMembers: 25,
      currentStudying: ''
    });
    setShowCreateModal(false);
  };

  const startStudySession = (podId: string) => {
    alert(`Starting study session for pod ${podId}. This would open a collaborative study interface.`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 Study Pods</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join collaborative study groups and learn together with peers
          </p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Create Pod</span>
        </Button>
      </div>

      {/* Category Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPods.map((pod) => (
          <Card key={pod.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  {pod.sponsor && (
                    <Badge variant="secondary" className="text-xs">
                      Sponsored
                    </Badge>
                  )}
                </div>
                <Badge variant={getLevelColor(pod.level)} className="text-xs">
                  {pod.level}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{pod.title}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pod.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Members</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pod.members}/{pod.maxMembers}
                  </span>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Currently Studying:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                    {pod.currentStudying}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400">Today's Winner:</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pod.todayWinner}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">Study Time:</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {pod.studyDuration}
                  </span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => handleJoinPod(pod.id)}
                    variant={pod.joined ? 'secondary' : 'default'}
                    className="flex-1"
                    disabled={!pod.joined && pod.members >= pod.maxMembers}
                  >
                    {pod.joined ? '✅ Joined' : pod.members >= pod.maxMembers ? 'Full' : '🚀 Join Pod'}
                  </Button>
                  {pod.joined && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startStudySession(pod.id)}
                        title="Start Study Session"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        title="Chat"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Pod Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create Study Pod"
      >
        <div className="space-y-4">
          <Input
            label="Pod Title"
            value={newPod.title}
            onChange={(e) => setNewPod({...newPod, title: e.target.value})}
            placeholder="e.g., React Mastery Group"
          />
          <Input
            label="Description"
            value={newPod.description}
            onChange={(e) => setNewPod({...newPod, description: e.target.value})}
            placeholder="What will your pod focus on?"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={newPod.category}
                onChange={(e) => setNewPod({...newPod, category: e.target.value})}
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Level
              </label>
              <select
                value={newPod.level}
                onChange={(e) => setNewPod({...newPod, level: e.target.value})}
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <Input
            label="Max Members"
            type="number"
            value={newPod.maxMembers}
            onChange={(e) => setNewPod({...newPod, maxMembers: parseInt(e.target.value) || 25})}
            min="5"
            max="50"
          />
          <Input
            label="Currently Studying"
            value={newPod.currentStudying}
            onChange={(e) => setNewPod({...newPod, currentStudying: e.target.value})}
            placeholder="What topic are you starting with?"
          />
          <div className="flex space-x-3 pt-4">
            <Button onClick={createPod} className="flex-1">
              Create Pod
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}