import client, { previewClient } from "./sanity";
import { getClient } from "./api";

const projectFields = `
title,
content,
'slug':slug.current,
date,
`;

export async function getAllArchives() {
  // For pagination, take only 3 first data
  // Descending order (newest first)
  const results = await client.fetch(
    `*[_type == "archive"] 
      | order(date desc)
      {${projectFields}}
     `
  );

  return results;
}

export async function getSingleArchive(slug, preview) {
  const currClient = getClient(preview);

  const result = await currClient
    .fetch(
      `*[_type== "archive" && slug.current == $slug]
        { ${projectFields}
        content[]{..., "asset": asset-> }
        }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}
