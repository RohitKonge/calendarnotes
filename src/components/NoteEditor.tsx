import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNotes } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Save, AlertCircle, Loader2, Search } from 'lucide-react';

export function NoteEditor() {
  const { selectedDate, notesForDate, createNote, updateNote, removeNote, loading, searchNotes } = useNotes();
  const { user } = useAuth();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ date: string; notes: any[] }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');

  useEffect(() => {
    setNewNoteContent('');
    setIsSearching(false);
    setSearchQuery('');
  }, [selectedDate]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchNotes(searchQuery);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleCreateNote = async () => {
    if (!newNoteContent.trim()) return;
    
    await createNote(newNoteContent.trim());
    setNewNoteContent('');
  };

  const handleStartEdit = (id: string, content: string) => {
    setEditingNoteId(id);
    setEditingContent(content);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingContent.trim()) return;
    
    await updateNote(id, editingContent.trim());
    setEditingNoteId(null);
    setEditingContent('');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      await removeNote(id);
      if (editingNoteId === id) {
        setEditingNoteId(null);
        setEditingContent('');
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 min-h-[600px] transition-all duration-300 hover:shadow-lg">
      <div className="mb-6 space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          {formattedDate}
        </h2>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search notes..."
              className="w-full px-4 py-2.5 rounded-xl border border-secondary-200 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-200 placeholder:text-secondary-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
              <Search className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
        </div>
      ) : isSearching ? (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-secondary-700">Search Results</h3>
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-8 text-secondary-500">
              <AlertCircle className="w-8 h-8 mb-2 text-secondary-400" />
              <p className="text-lg">No matching notes found</p>
              <p className="text-sm text-secondary-400 mt-1">Try adjusting your search terms</p>
            </div>
          ) : (
            searchResults.map(({ date, notes }) => (
              <div key={date} className="border-b border-secondary-100 pb-4">
                <h4 className="text-sm font-medium text-secondary-600 mb-2">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </h4>
                {notes.map((note) => (
                  <div 
                    key={note.id} 
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-2 border border-secondary-200 hover:border-primary-300 transition-all duration-200"
                  >
                    <p className="text-secondary-700">{note.content}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-secondary-200">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-4 rounded-xl border border-secondary-200 bg-white/80 backdrop-blur-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-200 min-h-[200px] text-base placeholder:text-secondary-400"
              autoFocus
            />
            {newNoteContent.trim() && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleCreateNote}
                  className="flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white shadow-soft transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Note</span>
                </button>
              </div>
            )}
          </div>

          {notesForDate.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 text-secondary-500">
              <div className="w-16 h-16 mb-4 rounded-full bg-primary-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-primary-500" />
              </div>
              <p className="text-lg font-medium text-secondary-600">No notes for this date</p>
              <p className="text-sm text-secondary-400 mt-1">Start writing above to create your first note</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notesForDate.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-xl border border-secondary-200 hover:border-primary-300 transition-all duration-200 bg-white/50 backdrop-blur-sm shadow-soft"
                >
                  {editingNoteId === note.id ? (
                    <div className="animate-fadeIn">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full p-4 rounded-xl border border-secondary-200 bg-white/80 backdrop-blur-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-200 min-h-[150px]"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="py-2 px-4 rounded-xl bg-secondary-100 hover:bg-secondary-200 text-secondary-700 transition-all duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(note.id)}
                          disabled={!editingContent.trim()}
                          className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white shadow-soft transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-secondary-700 whitespace-pre-wrap mb-4">{note.content}</div>
                      <div className="flex justify-between items-center pt-3 border-t border-secondary-100">
                        <div className="text-sm text-secondary-500">
                          {new Date(note.created_at).toLocaleString()}
                          {note.user_id ? (
                            <span className="ml-2 text-primary-500 font-medium">
                              {note.user_id === user?.id ? '(You)' : ''}
                            </span>
                          ) : (
                            <span className="ml-2 text-secondary-400">(Guest)</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEdit(note.id, note.content)}
                            className="py-1.5 px-3 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-all duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}