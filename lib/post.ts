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

export async function getLatestPosts() {
  const results = await client.fetch(
    `*[_type == "post"] 
      | order(publishedAt desc)
      {${postFields}}[0...3]
     `,
  );

  return results;
}

export async function getAllPosts() {
  const results = await client.fetch(
    `*[_type == "post"] 
      | order(publishedAt desc)
      {${postFields}}
     `,
  );

  return results;
}

export async function getPaginatedPosts({ offset = 0 } = { offset: 0 }) {
  const data = await client.fetch(
    `*[_type == "post"] 
    | order(publishedAt desc)
    {${postFields}}[${offset}...${offset + 10}]
   `,
  );

  return data;
}

export async function getSearchPosts({ title }) {
  const results = await client.fetch(
    `*[title match "${title}*"] 
      | order(publishedAt desc)
      {${postFields}}
     `,
  );

  return results;
}

export async function getSinglePost(slug, preview) {
  const currClient = preview ? previewClient : client;
  const result = await currClient
    .fetch(
      `*[_type== "post" && slug.current == $slug]
    { ${postFields}
      body[]{..., "asset": asset-> }
    }`,
      { slug },
    )
    .then(res => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

// Get sorted Posts based on Category

export async function getCategoryPosts({ categoryId }) {
  const results = await client.fetch(
    `*[_type == "post" && "${categoryId}" in categories[]._ref] 
      | order(publishedAt desc)
      {${postFields}}[0...3]
     `,
  );

  return results;
}

export async function getCategories() {
  const results = await client.fetch(
    `*[_type == "category"] 
      | order(publishedAt desc)
     `,
  );

  return results;
}
