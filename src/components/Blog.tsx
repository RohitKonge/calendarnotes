import React from 'react';
import { Calendar, BookOpen, PenTool, Brain } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "How to Use a Digital Calendar for Better Note Organization",
    slug: "digital-calendar-note-organization",
    excerpt: "Learn how to effectively organize your notes using a digital calendar system. Discover tips and tricks for better productivity.",
    content: "In today's fast-paced digital world, keeping your notes organized is more important than ever...",
    date: "2025-04-21",
    readTime: "5 min read",
    category: "Productivity",
    icon: Calendar
  },
  {
    id: 2,
    title: "The Power of Daily Note-Taking: Building Better Habits",
    slug: "power-of-daily-note-taking",
    excerpt: "Discover how daily note-taking can transform your productivity and help build lasting habits.",
    content: "Daily note-taking is more than just writing down thoughts - it's about building a system...",
    date: "2025-04-20",
    readTime: "4 min read",
    category: "Habits",
    icon: PenTool
  },
  {
    id: 3,
    title: "Digital Notes vs Paper Notes: Making the Right Choice",
    slug: "digital-vs-paper-notes",
    excerpt: "Compare the benefits of digital and paper note-taking to find the perfect system for you.",
    content: "The debate between digital and paper notes has been ongoing for years...",
    date: "2025-04-19",
    readTime: "6 min read",
    category: "Productivity",
    icon: BookOpen
  },
  {
    id: 4,
    title: "Mind Mapping with Calendar Notes: A Complete Guide",
    slug: "mind-mapping-calendar-notes",
    excerpt: "Learn how to combine mind mapping techniques with your calendar notes for enhanced creativity.",
    content: "Mind mapping is a powerful tool for organizing thoughts and ideas...",
    date: "2025-04-18",
    readTime: "7 min read",
    category: "Creativity",
    icon: Brain
  }
];

export function Blog() {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary-800 mb-12">
          Latest from Our Blog
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => {
            const Icon = post.icon;
            return (
              <article 
                key={post.id}
                className="bg-white rounded-2xl shadow-soft p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-secondary-800 mb-3">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-secondary-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-secondary-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>{post.readTime}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}