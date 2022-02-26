import { sanityClient, previewClient } from '@/lib/sanity';
import { supabaseAdmin } from '@/lib/supabase-admin';

import { IPost, IPopularPost } from '@/types/post';
import { ICategory } from '@/types/categories';

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
  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post"] 
      | order(publishedAt desc)
      {${postFields}}[0...3]
     `
  );
}

export async function getAllPosts() {
  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post"] 
      | order(publishedAt desc)
      {${postFields}}
     `
  );
}

export async function getPopularPosts() {
  const { data: viewsData } = await supabaseAdmin.from('pages').select();
  const posts = await getAllPosts();

  const popularPosts = viewsData
    ?.sort((a, b) => b.view_count - a.view_count)
    ?.map((popular) => ({
      slug: popular.slug ?? '',
      view_count: popular.view_count ?? 0,
      post: posts.find((post) => post.slug === popular.slug) ?? {},
    }))
    ?.slice(0, 3);

  return popularPosts as IPopularPost[];
}

export async function getTotalPosts() {
  return await sanityClient.fetch<number>(`count(*[_type == "post"])`);
}

type paginatedPostsParam = {
  offset: number;
  search?: string;
};

export async function getPaginatedPosts({ offset = 0, search = '' }: paginatedPostsParam) {
  if (search.length > 0) {
    return await sanityClient.fetch<IPost[]>(
      `*[_type == "post" && title match "${search}*"] 
        | order(publishedAt desc)
        {${postFields}}
       `
    );
  }

  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post"] 
    | order(publishedAt desc)
    {${postFields}}[${offset}...${offset + 10}]
   `
  );
}

export async function getSearchPosts({ title }) {
  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post" && title match "${title}*"] 
      | order(publishedAt desc)
      {${postFields}}
     `
  );
}

export async function getSinglePost(slug: string, preview: boolean) {
  const currClient = preview ? previewClient : sanityClient;
  const result = await currClient
    .fetch(
      `*[_type== "post" && slug.current == $slug]
    { ${postFields}
      body[]{..., "asset": asset-> }
    }`,
      { slug }
    )
    .then((res) => {
      // return preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]

      let result = res?.[0];

      if (preview) {
        result = res?.[1] || res?.[0];
      }

      return result;
    });

  return result as IPost;
}

export async function getCategoryPosts(id: string) {
  // If no id or id = all, we'll showing the 3 latest posts
  if (id === 'all') {
    return await sanityClient.fetch<IPost[]>(
      `*[_type == "post"] 
        | order(publishedAt desc)
        {${postFields}}[0...3]
       `
    );
  }

  // Show posts based on category id
  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post" && "${id}" in categories[]._ref] 
      | order(publishedAt desc)
      {${postFields}}[0...3]
     `
  );
}

export async function getCategories() {
  return await sanityClient.fetch<ICategory[]>(
    `*[_type == "category"] 
      | order(publishedAt desc)
     `
  );
}
