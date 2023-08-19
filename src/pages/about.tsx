import Image from 'next/image';

import { sanityImageUrl } from '@/lib/sanity';
import { getAboutPageContent } from '@/data/pages';

import SeoContainer from '@/components/SeoContainer';
import BlockContent from '@/components/block-content';

export const getStaticProps = async () => {
  const aboutPageContent = await getAboutPageContent();

  return {
    props: {
      content: aboutPageContent,
    },
    revalidate: 60,
  };
};

export default function About({ content }: InferNextProps<typeof getStaticProps>) {
  const parsedImageUrl = sanityImageUrl(content.image).saturation(-100).url() || '';

  return (
    <>
      <SeoContainer
        title={`About - Rahmat Panji`}
        description={`${content.subtitle} | Rahmat Panji`}
      />

      <div className='py-16'>
        <div className='space-y-4'>
          <h1 className='page-title'>{content.title}</h1>
          <p className='text-subtitle text-lg'>{content.subtitle}</p>
        </div>

        <hr className='my-6' />

        <article className='space-y-6'>
          <BlockContent blocks={content.description} className='pb-8' />

          <figure className='relative h-[400px]'>
            <Image src={parsedImageUrl} alt='Rahmat Panji' fill className='object-cover' />
          </figure>

          <p className='font-semibold text-mini'>Selamat Membaca!</p>
        </article>
      </div>
    </>
  );
}
