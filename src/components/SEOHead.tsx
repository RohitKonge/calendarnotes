import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  path?: string;
}

export function SEOHead({ 
  title = 'Calendar Notes - Best Digital Calendar for Daily Notes & Task Management',
  description = 'Streamline your daily organization with Calendar Notes - the perfect digital calendar for taking and organizing notes. Free, beautiful, and easy to use.',
  canonical = 'https://calendar-notes.com',
  path = ''
}: SEOProps) {
  const pageUrl = `${canonical}${path}`;
  
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Calendar Notes"
        defaultTitle="Calendar Notes - Best Digital Calendar for Daily Notes & Task Management"
        description="Streamline your daily organization with Calendar Notes - the perfect digital calendar for taking and organizing notes. Free, beautiful, and easy to use."
        canonical={canonical}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonical,
          siteName: 'Calendar Notes',
          images: [
            {
              url: `${canonical}/social-preview.jpg`,
              width: 1200,
              height: 630,
              alt: 'Calendar Notes Preview',
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
            content: 'calendar notes, digital calendar, note taking app, daily planner, task management, calendar with notes, personal organizer, digital diary, daily journal, online calendar planner, free calendar app'
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