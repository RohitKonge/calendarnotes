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
    ? 'Calendar Notes - #1 Free Digital Calendar for Notes & Task Management'
    : 'Write & Organize Notes | Calendar Notes';

  // Schema markup for better SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://calendarnotes.online/#website",
        "name": "Calendar Notes",
        "url": "https://calendarnotes.online",
        "description": "The best free digital calendar for organizing notes & tasks. Beautiful, simple & powerful note-taking calendar.",
        "applicationCategory": "ProductivityApplication",
        "browserRequirements": "Requires JavaScript",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://calendarnotes.online/#webpage",
        "url": "https://calendarnotes.online",
        "name": "Calendar Notes - #1 Free Digital Calendar for Notes & Task Management",
        "isPartOf": { "@id": "https://calendarnotes.online/#website" },
        "about": { "@id": "https://calendarnotes.online/#website" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "@id": "https://calendarnotes.online/#primaryimage",
          "url": "https://calendarnotes.online/social-preview.jpg",
          "width": 1200,
          "height": 630
        },
        "datePublished": "2025-04-27T00:00:00+00:00",
        "dateModified": "2025-04-27T00:00:00+00:00",
        "description": "Transform your daily planning with Calendar Notes - The best free digital calendar for organizing notes & tasks. Beautiful, simple & powerful note-taking calendar."
      }
    ]
  };

  return (
    <AuthProvider>
      <NotesProvider>
        <SEOHead 
          title={pageTitle}
          path={currentPath}
          description={
            currentPath === '/'
              ? 'Transform your daily planning with Calendar Notes - The best free digital calendar for organizing notes & tasks. Beautiful, simple & powerful note-taking calendar.'
              : 'Take and organize your notes efficiently with our digital calendar. Free, beautiful, and easy to use calendar notes application.'
          }
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
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