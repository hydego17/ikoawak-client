import { supabaseAdmin } from '@/lib/supabase-admin';

export async function getPageViews(slug: string) {
  // Query the pages table in the database where slug equals the params slug
  const res = await supabaseAdmin.from('pages').select('view_count').filter('slug', 'eq', slug);
  const viewCount = res.data?.[0]?.view_count as number;

  return viewCount || null;
}

export async function incrementPageView(slug: string) {
  if (typeof window !== 'undefined') {
    // Get session status of current post
    const sessionData = JSON.parse(window.sessionStorage.getItem('page_visited') as string) as
      | Record<string, boolean>
      | undefined;

    // Check if user already has a session
    const firstTimeVisit = !sessionData?.[slug];

    // If no session found, store a new one and update page views
    if (firstTimeVisit) {
      const updatedSessionData = {
        ...(sessionData || {}),
        [slug]: true,
      };

      window.sessionStorage.setItem('page_visited', JSON.stringify(updatedSessionData));

      // Call our stored procedure with the page_slug set by the params slug
      await supabaseAdmin.rpc('increment_page_view', {
        page_slug: slug,
      });
    }
  }
}
