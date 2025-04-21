import React from 'react';
import { AuthButton } from './AuthButton';
import { Blog } from './Blog';
import { Calendar, NotebookPen, Clock, Cloud, Users, Lock, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-lg border-b border-secondary-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 text-white p-2 rounded-lg shadow-soft">
              <Calendar className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Calendar Notes
            </h1>
          </div>
          <AuthButton />
        </nav>
      </header>

      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-primary-600 hover:text-primary-700">
              Home
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-secondary-400" />
          <li>
            <a href="/calendar" className="text-primary-600 hover:text-primary-700">
              Calendar
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-secondary-400" />
          <li>
            <span className="text-secondary-600">
              Notes
            </span>
          </li>
        </ol>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {children}

        <section className="mt-16 py-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-soft" aria-label="Features">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-secondary-800 mb-12">
              Why Choose Calendar Notes?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="flex flex-col items-center text-center p-6">
                <NotebookPen className="w-12 h-12 text-primary-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Effortless Note Taking
                </h3>
                <p className="text-secondary-600">
                  Quickly capture your thoughts, tasks, and memories with our intuitive calendar interface.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-6">
                <Clock className="w-12 h-12 text-primary-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Time Management
                </h3>
                <p className="text-secondary-600">
                  Organize your schedule and notes in one place for better time management.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-6">
                <Cloud className="w-12 h-12 text-primary-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Cloud Sync
                </h3>
                <p className="text-secondary-600">
                  Access your notes from anywhere with secure cloud synchronization.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-6">
                <Users className="w-12 h-12 text-primary-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Free to Use
                </h3>
                <p className="text-secondary-600">
                  Start organizing your life with our completely free calendar and note-taking tool.
                </p>
              </article>

              <article className="flex flex-col items-center text-center p-6">
                <Lock className="w-12 h-12 text-primary-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Privacy First
                </h3>
                <p className="text-secondary-600">
                  Your notes are secure with our encrypted storage and privacy-focused approach.
                </p>
              </article>
            </div>
          </div>
        </section>

        <Blog />
      </main>

      <footer className="bg-white/70 backdrop-blur-lg border-t border-secondary-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">About Calendar Notes</h2>
              <p className="text-secondary-600">
                Your personal digital calendar for organizing notes, tasks, and memories. Stay organized and productive with our intuitive interface.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-primary-600 hover:text-primary-700 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="text-primary-600 hover:text-primary-700 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-primary-600 hover:text-primary-700 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">Connect With Us</h2>
              <p className="text-secondary-600 mb-2">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <a 
                href="mailto:support@calendar-notes.com"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                support@calendar-notes.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-200 text-center">
            <p className="text-secondary-500">
              &copy; {new Date().getFullYear()} Calendar Notes • Your Personal Digital Note Taking Calendar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}