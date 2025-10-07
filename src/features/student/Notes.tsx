import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Badge } from '../shared/Badge';
import { Plus, Edit, Trash2, Search, BookOpen, Calendar, Tag } from 'lucide-react';

const sampleNotes = [
  {
    id: '1',
    title: 'React Hooks Deep Dive',
    content: 'Today I learned about useEffect cleanup functions and how they prevent memory leaks. Key points:\n\n1. Always cleanup subscriptions\n2. Use dependency arrays correctly\n3. Custom hooks for reusable logic\n\nNext: Practice with useReducer for complex state management.',
    tags: ['React', 'JavaScript', 'Frontend'],
    category: 'Learning',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Interview Preparation Notes',
    content: 'Common questions and my prepared answers:\n\n• Tell me about yourself\n• Why do you want this internship?\n• What are your strengths/weaknesses?\n• Technical questions on DSA\n\nPractice more behavioral questions tomorrow.',
    tags: ['Interview', 'Career', 'Preparation'],
    category: 'Career',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Project Ideas',
    content: 'Ideas for portfolio projects:\n\n1. E-commerce app with React + Node.js\n2. Task management tool with real-time updates\n3. Weather app with geolocation\n4. Blog platform with markdown support\n\nStart with the task management tool - good for showcasing CRUD operations.',
    tags: ['Projects', 'Portfolio', 'Ideas'],
    category: 'Projects',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13'
  }
];

export function Notes() {
  const [notes, setNotes] = useState(sampleNotes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    category: 'Learning'
  });
  const [newTag, setNewTag] = useState('');

  const categories = ['All', 'Learning', 'Career', 'Projects', 'Ideas', 'Personal'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    const note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      category: newNote.category,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', tags: [], category: 'Learning' });
    setShowAddModal(false);
  };

  const updateNote = () => {
    if (!editingNote?.title.trim() || !editingNote?.content.trim()) return;
    
    setNotes(notes.map(note => 
      note.id === editingNote.id 
        ? { ...editingNote, updatedAt: new Date().toISOString().split('T')[0] }
        : note
    ));
    setEditingNote(null);
  };

  const deleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const addTag = (noteData: any, setNoteData: any) => {
    if (newTag.trim() && !noteData.tags.includes(newTag.trim())) {
      setNoteData({...noteData, tags: [...noteData.tags, newTag.trim()]});
      setNewTag('');
    }
  };

  const removeTag = (tag: string, noteData: any, setNoteData: any) => {
    setNoteData({...noteData, tags: noteData.tags.filter((t: string) => t !== tag)});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📝 My Notes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Capture your learning journey and important thoughts
          </p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>New Note</span>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notes, tags, or content..."
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
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{note.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {note.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingNote(note)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4">
                  {note.content}
                </p>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Start capturing your thoughts and learning progress'
              }
            </p>
            {!searchTerm && selectedCategory === 'All' && (
              <Button onClick={() => setShowAddModal(true)}>
                Create Your First Note
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Note Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="📝 Create New Note"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            placeholder="Enter a descriptive title..."
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({...newNote, category: e.target.value})}
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              placeholder="Write your note content here..."
              className="w-full min-h-[200px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {newNote.tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-1">
                  <Badge variant="default">#{tag}</Badge>
                  <button
                    onClick={() => removeTag(tag, newNote, setNewNote)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && addTag(newNote, setNewNote)}
              />
              <Button onClick={() => addTag(newNote, setNewNote)} size="sm">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={addNote} className="flex-1">
              Create Note
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

      {/* Edit Note Modal */}
      <Modal 
        isOpen={!!editingNote} 
        onClose={() => setEditingNote(null)}
        title="✏️ Edit Note"
        size="lg"
      >
        {editingNote && (
          <div className="space-y-4">
            <Input
              label="Note Title"
              value={editingNote.title}
              onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={editingNote.category}
                onChange={(e) => setEditingNote({...editingNote, category: e.target.value})}
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                className="w-full min-h-[200px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editingNote.tags.map((tag: string) => (
                  <div key={tag} className="flex items-center space-x-1">
                    <Badge variant="default">#{tag}</Badge>
                    <button
                      onClick={() => removeTag(tag, editingNote, setEditingNote)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && addTag(editingNote, setEditingNote)}
                />
                <Button onClick={() => addTag(editingNote, setEditingNote)} size="sm">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={updateNote} className="flex-1">
                Update Note
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditingNote(null)}
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