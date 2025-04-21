import fs from 'fs';
import { blogPosts } from '../src/components/Blog';

const baseUrl = 'https://calendar-notes.com';
const currentDate = new Date().toISOString().split('T')[0];

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
fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');