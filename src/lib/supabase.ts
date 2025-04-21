import { createClient } from '@supabase/supabase-js';
import { type Note } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
  
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user;
}

export async function getNotes(date?: string, userId?: string) {
  const query = supabase
    .from('notes')
    .select('*');
  
  if (date) {
    query.eq('date', date);
  }
  
  if (userId) {
    query.eq('user_id', userId);
  } else {
    query.is('user_id', null);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Note[];
}

export async function saveNote(note: Partial<Note>) {
  const { data, error } = await supabase
    .from('notes')
    .upsert(note)
    .select()
    .single();
  
  if (error) throw error;
  return data as Note;
}

export async function deleteNote(id: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}