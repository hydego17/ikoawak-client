import client, { previewClient } from './sanity';

const postFields = `
title,
subtitle,
'slug':slug.current,
'author': author->name,
mainImage,
'categories': categories[]->title,
publishedAt,
body,
`;

export async function getFeaturedPosts() {
  // For pagination, take only 3 first data
  // Descending order (newest first)
  const results = await client.fetch(
    `*[_type == "post"] 
      | order(_createdAt desc)
      {${postFields}}[0...3]
     `,
  );

  return results;
}
