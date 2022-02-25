import { getAllPosts } from '@/data/posts';

export default async function generateSitemap(req, res) {
  // Fetch data from CMS.
  const externalPosts = await getAllPosts();

  const routes = externalPosts.map((post) => `/post/${post.slug}`);
  const localRoutes = ['/index', '/about', '/post'];

  const pages = routes.concat(localRoutes);

  const urlSet = pages
    .map((page) => {
      // Remove none route related parts of filename.
      const path = page.replace('pages', '').replace(/(.tsx|.ts)/, '');
      // Remove the word index from route
      const route = path === '/index' ? '' : path;
      // Build url portion of sitemap.xml
      return `<url><loc>https://ikoawak.me${route}</loc></url>`;
    })
    .join('');

  // Add urlSet to entire sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  // set response content header to xml
  res.setHeader('Content-Type', 'text/xml');
  // write the sitemap
  res.write(sitemap);
  res.end();
}
