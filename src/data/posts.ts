import { sanityClient, previewClient } from '@/lib/sanity';
import { supabaseAdmin } from '@/lib/supabase-admin';

import { IPost, IPopularPost, ICategory } from '@/types';

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

export async function getPaginatedPosts(params: {
  offset: number;
  pageSize: number;
  search?: string;
}) {
  const { offset = 0, pageSize = 20, search = '' } = params;

  // Show all posts related to title
  if (search.length > 0) {
    return await sanityClient.fetch<IPost[]>(
      `*[_type == "post" && title match "${search}*"] 
        | order(publishedAt desc)
        {${postFields}}
      `
    );
  }

  // Show posts with pagination
  return await sanityClient.fetch<IPost[]>(
    `*[_type == "post"] 
      | order(publishedAt desc)
      {${postFields}}[${offset}...${offset + pageSize}]
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

export async function getSinglePost(slug: string, preview: boolean) {
  const currClient = preview ? previewClient : sanityClient;

  const query = `*[_type== "post" && slug.current == $slug]
                  {${postFields}
                  body[]{..., "asset": asset-> }
                  }`;

  const post = await currClient.fetch(query, { slug }).then((res) => {
    // return preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]
    let data = res?.[0];

    if (preview) {
      data = res?.[1] || res?.[0];
    }

    return data;
  });

  return post as IPost;
}
