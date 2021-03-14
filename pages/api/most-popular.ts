import { NextApiRequest, NextApiResponse } from 'next';
import { SupabaseAdmin } from 'lib/supabase-admin';
import { getAllPosts } from 'lib/post';
import { TPosts } from 'types/post';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data } = await SupabaseAdmin.from('pages').select();
    const posts: TPosts = await getAllPosts();

    if (data) {
      return res.status(200).json(
        data
          .sort((a, b) => b.view_count - a.view_count)
          .map(popular => ({
            slug: popular.slug,
            view_count: popular.view_count,
            post: posts.find(post => post.slug === popular.slug),
          }))
          .slice(0, 3),
      );
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  });
};
