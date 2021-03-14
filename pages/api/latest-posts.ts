import { NextApiRequest, NextApiResponse } from 'next';
import { getCategoryPosts, getLatestPosts } from 'lib/post';

export default async function getSelectedCategoryPosts(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.category;

  try {
    if (!id) {
      const data = await getLatestPosts();
      res.status(200).json({
        message: 'Fetched Featured Posts',
        data,
      });
    } else {
      const data = await getCategoryPosts({ categoryId: id });

      res.status(200).json({
        message: 'Fetched Category Posts',
        data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
}
