import { getPaginatedPosts, getSearchPosts } from 'lib/post';
import client from 'lib/sanity';

export default async function getPosts(req, res) {
  const page = Number(req.query.page * 10);
  const perPage = 10;

  const title: string = req.query.title;

  if (title.length) {
    try {
      const data = await getSearchPosts({ title });

      res.status(200).json({
        message: 'Searched Posts',
        data,
      });
    } catch (err) {
      console.log(err.message);
      res.status(404).end();
    }
  } else {
    try {
      const data = await getPaginatedPosts({ offset: page });
      const totalPosts = await client.fetch(
        `*[_type == "post"] | order(_createdAt desc)`,
      );
      res.status(200).json({
        message: 'Fetched Posts',
        data,
        dataCount: data.length,
        firstData: totalPosts[0].slug,
        lastData: totalPosts[totalPosts.length - 1].slug,
        maxPage: Math.ceil(totalPosts.length / perPage),
      });
    } catch (err) {
      console.log(err.message);
      res.status(404).end();
    }
  }
}
