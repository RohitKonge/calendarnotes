import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Note } from '../types';
import { getNotes, saveNote, deleteNote } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface NotesContextType {
  notes: Note[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  createNote: (content: string) => Promise<void>;
  updateNote: (id: string, content: string) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
  notesForDate: Note[];
  notesMap: Map<string, Note[]>;
  loading: boolean;
  searchNotes: (query: string) => Array<{ date: string; notes: Note[] }>;
}

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  
  // Use useMemo for notesMap to prevent unnecessary recalculations
  const notesMap = useMemo(() => {
    const map = new Map<string, Note[]>();
    notes.forEach(note => {
      const dateStr = note.date;
      const existing = map.get(dateStr) || [];
      map.set(dateStr, [...existing, note]);
    });
    return map;
  }, [notes]);

  // Use useCallback for memoized functions
  const searchNotes = useCallback((query: string) => {
    const searchResults = new Map<string, Note[]>();
    const lowerQuery = query.toLowerCase();
    
    notes.forEach(note => {
      if (note.content.toLowerCase().includes(lowerQuery)) {
        const existing = searchResults.get(note.date) || [];
        searchResults.set(note.date, [...existing, note]);
      }
    });

    return Array.from(searchResults.entries())
      .map(([date, notes]) => ({ date, notes }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [notes]);

  const createNote = useCallback(async (content: string) => {
    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
    try {
      if (!user) {
        if (!window.localStorage.getItem('guestNotes')) {
          window.localStorage.setItem('guestNotes', '[]');
        }

        const guestNotes = JSON.parse(window.localStorage.getItem('guestNotes') || '[]');
        const newNote = {
          id: crypto.randomUUID(),
          content,
          date: formattedSelectedDate,
          user_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        window.localStorage.setItem('guestNotes', JSON.stringify([...guestNotes, newNote]));
        setNotes(prev => [...prev, newNote]);
        toast.success('Note created');
        return;
      }

      const newNote: Partial<Note> = {
        content,
        date: formattedSelectedDate,
        user_id: user?.id || null
      };
      
      const savedNote = await saveNote(newNote);
      setNotes(prev => [...prev, savedNote]);
      toast.success('Note created');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }
  }, [user, selectedDate]);

  const updateNote = useCallback(async (id: string, content: string) => {
    try {
      if (!user) {
        const guestNotes = JSON.parse(window.localStorage.getItem('guestNotes') || '[]');
        const updatedNotes = guestNotes.map((note: Note) => 
          note.id === id ? { ...note, content, updated_at: new Date().toISOString() } : note
        );
        window.localStorage.setItem('guestNotes', JSON.stringify(updatedNotes));
        setNotes(prev => prev.map(note => note.id === id ? { ...note, content } : note));
        toast.success('Note updated');
        return;
      }

      const noteToUpdate = notes.find(note => note.id === id);
      if (!noteToUpdate) return;
      
      const updatedNote = await saveNote({
        id,
        content,
        date: noteToUpdate.date,
        user_id: noteToUpdate.user_id
      });
      
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      toast.success('Note updated');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note');
    }
  }, [user, notes]);

  const removeNote = useCallback(async (id: string) => {
    try {
      if (!user) {
        const guestNotes = JSON.parse(window.localStorage.getItem('guestNotes') || '[]');
        const updatedNotes = guestNotes.filter((note: Note) => note.id !== id);
        window.localStorage.setItem('guestNotes', JSON.stringify(updatedNotes));
        setNotes(prev => prev.filter(note => note.id !== id));
        toast.success('Note deleted');
        return;
      }

      await deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  }, [user]);

  // Use useMemo for derived state
  const formattedSelectedDate = useMemo(() => 
    format(selectedDate, 'yyyy-MM-dd'),
    [selectedDate]
  );

  const notesForDate = useMemo(() => 
    notesMap.get(formattedSelectedDate) || [],
    [notesMap, formattedSelectedDate]
  );

  useEffect(() => {
    let mounted = true;

    async function fetchNotes() {
      setLoading(true);
      try {
        const fetchedNotes = await getNotes(undefined, user?.id || null);
        if (mounted) {
          setNotes(fetchedNotes);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (mounted) {
          toast.error('Failed to load notes');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchNotes();

    return () => {
      mounted = false;
    };
  }, [user]);

  const contextValue = useMemo(() => ({
    notes,
    selectedDate,
    setSelectedDate,
    createNote,
    updateNote,
    removeNote,
    notesForDate,
    notesMap,
    loading,
    searchNotes
  }), [
    notes,
    selectedDate,
    createNote,
    updateNote,
    removeNote,
    notesForDate,
    notesMap,
    loading,
    searchNotes
  ]);

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};