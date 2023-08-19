import Image from 'next/image';

import { sanityImageUrl } from '@/lib/sanity';
import { getAboutPageContent } from '@/data/pages';
import type { InferNextProps } from '@/types/infer-next-props-type';

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
        image={parsedImageUrl}
        type='Website'
      />

      <div className='py-16'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold'>{content.title}</h1>
          <p className='text-subtitle'>{content.subtitle}</p>
        </div>

        <hr className='my-6' />

        <article className='space-y-6'>
          <BlockContent blocks={content.description} className='pb-8' />

          <figure className='relative h-[400px]'>
            <Image src={parsedImageUrl} alt='Rahmat Panji' fill className='object-cover' />
          </figure>

          <div>
            <span className='font-bold text-sm'>Selamat Membaca!</span>
          </div>
        </article>
      </div>
    </>
  );
}
