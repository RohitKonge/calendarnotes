import React from 'react';
import { Calendar, BookOpen, PenTool, Brain, Book, Clock, Target } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Best Calendar Notes App for Daily Planning in 2025",
    slug: "best-calendar-notes-app-2025",
    excerpt: "Discover why Calendar Notes is rated the #1 free digital calendar for note-taking and daily planning. Compare features and see real user reviews.",
    content: "Looking for the perfect calendar app that combines note-taking with daily planning? Our comprehensive guide...",
    date: "2025-04-27",
    readTime: "7 min read",
    category: "Product Guide",
    icon: Calendar
  },
  {
    id: 2,
    title: "Digital Calendar vs Traditional Planners: A Complete Comparison",
    slug: "digital-calendar-vs-traditional-planners",
    excerpt: "Find out why digital calendars are replacing paper planners. Learn about the benefits of digital note-taking and calendar management.",
    content: "The debate between digital and paper planning tools continues, but modern features...",
    date: "2025-04-25",
    readTime: "8 min read",
    category: "Productivity",
    icon: Book
  },
  {
    id: 3,
    title: "How to Organize Notes Using a Digital Calendar System",
    slug: "organize-notes-digital-calendar",
    excerpt: "Learn expert strategies for organizing your notes efficiently using a digital calendar. Tips and tricks for better productivity.",
    content: "An organized note-taking system is crucial for productivity. Here's how to leverage your digital calendar...",
    date: "2025-04-23",
    readTime: "6 min read",
    category: "Organization",
    icon: Target
  },
  {
    id: 4,
    title: "The Ultimate Guide to Digital Note Taking with Calendar Integration",
    slug: "ultimate-guide-digital-note-taking",
    excerpt: "Master the art of digital note-taking with our comprehensive guide. Learn how calendar integration can transform your productivity.",
    content: "Digital note-taking has evolved significantly, and calendar integration is the key...",
    date: "2025-04-21",
    readTime: "10 min read",
    category: "Guides",
    icon: PenTool
  },
  {
    id: 5,
    title: "Time Management Using Calendar Notes: Expert Tips",
    slug: "time-management-calendar-notes",
    excerpt: "Optimize your time management with our expert calendar notes techniques. Learn how to plan, organize, and execute effectively.",
    content: "Effective time management is essential in today's fast-paced world...",
    date: "2025-04-19",
    readTime: "5 min read",
    category: "Time Management",
    icon: Clock
  },
  {
    id: 6,
    title: "Boost Your Productivity with Smart Calendar Note Taking",
    slug: "boost-productivity-smart-calendar-notes",
    excerpt: "Discover advanced techniques for taking smart calendar notes that enhance your productivity and organization.",
    content: "Smart note-taking is about more than just writing things down...",
    date: "2025-04-17",
    readTime: "6 min read",
    category: "Productivity",
    icon: Brain
  }
];

export function Blog() {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-secondary-800">
          Latest from Our Blog
        </h2>
        <p className="text-center text-secondary-600 mb-12 max-w-2xl mx-auto">
          Expert tips, guides, and insights about digital calendar note-taking, productivity, and organization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const Icon = post.icon;
            return (
              <article 
                key={post.id}
                className="bg-white rounded-2xl shadow-soft p-6 transition-all duration-300 hover:shadow-lg"
                itemScope 
                itemType="http://schema.org/BlogPosting"
              >
                <meta itemProp="datePublished" content={post.date} />
                <meta itemProp="timeRequired" content="PT{post.readTime.split(' ')[0]}M" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-secondary-800 mb-3" itemProp="headline">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-600 transition-colors"
                    itemProp="url"
                  >
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-secondary-600 mb-4" itemProp="description">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-secondary-500">
                  <time dateTime={post.date} itemProp="datePublished">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span itemProp="timeRequired">{post.readTime}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/blog"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all duration-200 shadow-soft hover:shadow-md"
          >
            <BookOpen className="w-5 h-5" />
            <span>View All Articles</span>
          </a>
        </div>
      </div>
    </section>
  );
}