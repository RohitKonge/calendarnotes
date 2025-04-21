import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://calendar-notes.com';
const currentDate = new Date().toISOString().split('T')[0];

// Define blog posts directly here since we can't import from TSX in plain JS
const blogPosts = [
  {
    slug: "digital-calendar-note-organization",
    date: "2025-04-21"
  },
  {
    slug: "power-of-daily-note-taking",
    date: "2025-04-20"
  },
  {
    slug: "digital-vs-paper-notes",
    date: "2025-04-19"
  },
  {
    slug: "mind-mapping-calendar-notes",
    date: "2025-04-18"
  }
];

const staticPages = [
  {
    url: '/',
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/calendar',
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: '/features',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/privacy',
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    url: '/terms',
    changefreq: 'monthly',
    priority: '0.5'
  }
];

function generateSitemapXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add blog posts
  blogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

// Generate and write sitemap
const sitemap = generateSitemapXml();
const publicDir = path.join(__dirname, '..', 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');