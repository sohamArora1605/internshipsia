import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Plus, Target, CheckCircle, Edit, Trash2, Calendar } from 'lucide-react';

const sampleHabits = [
  {
    id: '1',
    title: 'Learn DSA Daily',
    description: 'Solve 2 coding problems every day for 6 months',
    targetDays: 180,
    completedDays: 45,
    streak: 7,
    progress: 25
  },
  {
    id: '2', 
    title: 'React Practice',
    description: 'Build one React component daily',
    targetDays: 90,
    completedDays: 23,
    streak: 3,
    progress: 26
  },
  {
    id: '3',
    title: 'Read Tech Articles',
    description: 'Read 1 technical article every day',
    targetDays: 60,
    completedDays: 38,
    streak: 12,
    progress: 63
  }
];

export function HabitTracker() {
  const [habits, setHabits] = useState(sampleHabits);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [newHabit, setNewHabit] = useState({ title: '', description: '', targetDays: 30 });

  const toggleTodayCheck = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedDays: habit.completedDays + 1, 
            streak: habit.streak + 1,
            progress: Math.round(((habit.completedDays + 1) / habit.targetDays) * 100)
          }
        : habit
    ));
  };

  const addHabit = () => {
    if (!newHabit.title.trim()) return;
    
    const habit = {
      id: Date.now().toString(),
      title: newHabit.title,
      description: newHabit.description,
      targetDays: newHabit.targetDays,
      completedDays: 0,
      streak: 0,
      progress: 0
    };
    
    setHabits([...habits, habit]);
    setNewHabit({ title: '', description: '', targetDays: 30 });
    setShowAddModal(false);
  };

  const updateHabit = () => {
    if (!editingHabit?.title.trim()) return;
    
    setHabits(habits.map(habit => 
      habit.id === editingHabit.id 
        ? { 
            ...editingHabit,
            progress: Math.round((editingHabit.completedDays / editingHabit.targetDays) * 100)
          }
        : habit
    ));
    setEditingHabit(null);
  };

  const deleteHabit = (habitId: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

  const resetStreak = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, streak: 0 }
        : habit
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 Habit Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Build consistent learning habits and track your progress
          </p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>New Habit</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <Card key={habit.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{habit.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {habit.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={habit.progress >= 100 ? 'success' : 'default'}>
                    {habit.progress}%
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingHabit(habit)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteHabit(habit.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      {habit.completedDays} / {habit.targetDays} days
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      🔥 {habit.streak} day streak
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(habit.progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Today ({new Date().toLocaleDateString()})
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => toggleTodayCheck(habit.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Mark Done
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resetStreak(habit.id)}
                      title="Reset streak"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last 7 days:
                  </p>
                  <div className="flex space-x-1">
                    {Array.from({length: 7}, (_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center ${
                          Math.random() > 0.3
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {new Date(Date.now() - (6-i) * 24 * 60 * 60 * 1000).getDate()}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Habit Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New Habit"
      >
        <div className="space-y-4">
          <Input
            label="Habit Title"
            value={newHabit.title}
            onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
            placeholder="e.g., Read for 30 minutes daily"
          />
          <Input
            label="Description"
            value={newHabit.description}
            onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
            placeholder="Brief description of your habit"
          />
          <Input
            label="Target Days"
            type="number"
            value={newHabit.targetDays}
            onChange={(e) => setNewHabit({...newHabit, targetDays: parseInt(e.target.value) || 30})}
            min="1"
            max="365"
          />
          <div className="flex space-x-3 pt-4">
            <Button onClick={addHabit} className="flex-1">
              Add Habit
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Habit Modal */}
      <Modal 
        isOpen={!!editingHabit} 
        onClose={() => setEditingHabit(null)}
        title="Edit Habit"
      >
        {editingHabit && (
          <div className="space-y-4">
            <Input
              label="Habit Title"
              value={editingHabit.title}
              onChange={(e) => setEditingHabit({...editingHabit, title: e.target.value})}
            />
            <Input
              label="Description"
              value={editingHabit.description}
              onChange={(e) => setEditingHabit({...editingHabit, description: e.target.value})}
            />
            <Input
              label="Target Days"
              type="number"
              value={editingHabit.targetDays}
              onChange={(e) => setEditingHabit({...editingHabit, targetDays: parseInt(e.target.value) || 30})}
              min="1"
              max="365"
            />
            <Input
              label="Completed Days"
              type="number"
              value={editingHabit.completedDays}
              onChange={(e) => setEditingHabit({...editingHabit, completedDays: parseInt(e.target.value) || 0})}
              min="0"
            />
            <Input
              label="Current Streak"
              type="number"
              value={editingHabit.streak}
              onChange={(e) => setEditingHabit({...editingHabit, streak: parseInt(e.target.value) || 0})}
              min="0"
            />
            <div className="flex space-x-3 pt-4">
              <Button onClick={updateHabit} className="flex-1">
                Update Habit
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditingHabit(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}