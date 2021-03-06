import client from './sanity';

export async function getHomePageContent() {
  const result = await client.fetch(
    `*[_type == "home"][0] 
      {
        title,
        description,
        'subtitle': description[].children[0][0].text,
      }
     `,
  );

  return result;
}

export async function getAboutPageContent() {
  const result = await client.fetch(
    `*[_type == "about"][0] 
      {
        title,
        subtitle,
        image,
        description
      }
     `,
  );

  return result;
}
