import React from 'react';
import { Layout } from './components/Layout';
import { Calendar } from './components/Calendar';
import { NoteEditor } from './components/NoteEditor';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { Toaster } from 'react-hot-toast';
import { SEOHead } from './components/SEOHead';

function App() {
  const currentPath = window.location.pathname;
  const pageTitle = currentPath === '/' 
    ? 'Calendar Notes - Your Digital Note Taking Calendar'
    : 'Write & Organize Notes | Calendar Notes';

  return (
    <AuthProvider>
      <NotesProvider>
        <SEOHead 
          title={pageTitle}
          path={currentPath}
          description={
            currentPath === '/'
              ? 'Organize your thoughts, tasks, and memories with Calendar Notes. A beautiful, intuitive calendar app for taking and organizing daily notes.'
              : 'Take and organize your notes efficiently with our digital calendar. Free, beautiful, and easy to use calendar notes application.'
          }
        />
        <Layout>
          <div 
            className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1600px] mx-auto"
            itemScope 
            itemType="https://schema.org/WebApplication"
          >
            <meta itemProp="name" content="Calendar Notes" />
            <meta itemProp="applicationCategory" content="ProductivityApplication" />
            <meta itemProp="operatingSystem" content="Web" />
            
            <div className="xl:col-span-2">
              <Calendar />
            </div>
            <div className="xl:col-span-1">
              <NoteEditor />
            </div>
          </div>
        </Layout>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#333333',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              padding: '16px',
            },
            duration: 3000,
          }}
        />
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;