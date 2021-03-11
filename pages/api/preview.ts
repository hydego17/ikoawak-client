import { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePost } from 'lib/post';

export default async function previewReadOnly(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const post = await getSinglePost(req.query.slug, true);

  if (!post) {
    return res.status(401).json({ message: 'Invalid Slug' });
  }

  res.setPreviewData({ message: 'ok' });

  if (post) {
    res.writeHead(307, { Location: `/post/${post.slug}` });
  }

  res.end();
}
