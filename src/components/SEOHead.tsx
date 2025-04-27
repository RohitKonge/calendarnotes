import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  path?: string;
}

export function SEOHead({ 
  title = 'Calendar Notes - Best Free Digital Calendar for Daily Notes & Task Management',
  description = 'Calendar Notes - The #1 free digital calendar for organizing notes, tasks & daily planning. Simple, beautiful & powerful note-taking calendar app for personal and work use.',
  canonical = 'https://calendarnotes.online',
  path = ''
}: SEOProps) {
  const pageUrl = `${canonical}${path}`;
  
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Calendar Notes"
        defaultTitle="Calendar Notes - Best Free Digital Calendar for Daily Notes & Task Management"
        description="Calendar Notes - The #1 free digital calendar for organizing notes, tasks & daily planning. Simple, beautiful & powerful note-taking calendar app for personal and work use."
        canonical={canonical}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonical,
          siteName: 'Calendar Notes',
          title: 'Calendar Notes - Best Free Digital Calendar for Daily Notes',
          description: 'Organize your life with Calendar Notes - The most intuitive digital calendar for notes and tasks. Free forever.',
          images: [
            {
              url: `${canonical}/social-preview.jpg`,
              width: 1200,
              height: 630,
              alt: 'Calendar Notes Preview',
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          handle: '@calendarNotes',
          site: '@calendarNotes',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'calendar notes, digital calendar, note taking app, daily planner, task management, calendar with notes, personal organizer, digital diary, daily journal, online calendar planner, free calendar app, best calendar app, digital note taking, calendar organizer, task planner'
          },
          {
            name: 'author',
            content: 'Calendar Notes'
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1'
          },
          {
            name: 'application-name',
            content: 'Calendar Notes'
          },
          {
            property: 'og:site_name',
            content: 'Calendar Notes'
          }
        ]}
        additionalLinkTags={[
          {
            rel: 'manifest',
            href: '/favicon/site.webmanifest'
          }
        ]}
      />
      {title && (
        <NextSeo
          title={title}
          description={description}
          canonical={pageUrl}
          openGraph={{
            url: pageUrl,
            title,
            description,
          }}
        />
      )}
    </>
  );
}