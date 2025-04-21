import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <button 
        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-secondary-100 text-secondary-400 cursor-not-allowed transition-all duration-200"
        disabled
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading...</span>
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.user_metadata?.full_name || user.email}
              className="w-10 h-10 rounded-full ring-2 ring-white shadow-soft"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium ring-2 ring-white shadow-soft">
              {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
            </div>
          )}
          <span className="text-sm font-medium text-secondary-700 hidden md:inline-block">
            {user.user_metadata?.full_name || user.email}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-secondary-200 hover:bg-secondary-50 text-secondary-700 transition-all duration-200 shadow-soft hover:shadow-md"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-all duration-200 shadow-soft hover:shadow-md"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign in with Google</span>
    </button>
  );
}