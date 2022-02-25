import { sanityClient } from '@/lib/sanity';
import { IAboutPage, IHomePage } from '@/types/page';

export async function getHomePageContent() {
  return await sanityClient.fetch<IHomePage>(
    `*[_type == "home"][0] 
      {
        title,
        description,
        image,
        'subtitle': description[].children[0][0].text,
      }
     `
  );
}

export async function getAboutPageContent() {
  return await sanityClient.fetch<IAboutPage>(
    `*[_type == "about"][0] 
      {
        title,
        subtitle,
        image,
        description
      }
     `
  );
}
