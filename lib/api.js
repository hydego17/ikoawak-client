import client, { previewClient } from "./sanity";
import imgUrlBuilder from "@sanity/image-url";

//
//

export const getClient = (preview) => (preview ? previewClient : client);

// Builder for Image Cropping functionality
const builder = imgUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

//
//

export const projectFields = `
title,
subtitle,
content,
techStacks,
coverImage,
link,
code,
'slug':slug.current,
`;

export async function getAllProjects() {
  // For pagination, take only 3 first data
  // Descending order (newest first)
  const results = await client.fetch(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}
   `
  );

  return results;
}

export async function getSingleProject(slug, preview) {
  const currClient = getClient(preview);
  const result = await currClient
    .fetch(
      `*[_type== "projects" && slug.current == $slug]
    { ${projectFields}
      content[]{..., "asset": asset-> }
    }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

export async function getPaginatedProjects({ offset = 0 } = { offset: 0 }) {
  const data = await client.fetch(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}[${offset}...${offset + 3}]
   `
  );

  return data;
}
