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

export async function getSinglePost(slug, preview) {
  // const currClient = getClient(preview);
  const result = await client
    .fetch(
      `*[_type== "post" && slug.current == $slug]
    { ${postFields}
      body[]{..., "asset": asset-> }
    }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}