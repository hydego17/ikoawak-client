import React from 'react';
import SanityBlockContent from '@sanity/block-content-to-react';

import { cn } from '@/lib/utils';

import s from './block-content.module.css';
import Image from 'next/image';

type BlockContentProps = React.ComponentProps<'div'> & {
  blocks: any;
};

const ImageRenderer = (props) => {
  const {
    node: { asset, alt },
  } = props;
  return (
    <div className=''>
      <Image alt={alt} src={asset.url} objectFit='cover' height={500} width={800} />
      {alt && <span className='text-sm'>{alt}</span>}
    </div>
  );
};

export default function BlockContent({ blocks, className, ...props }: BlockContentProps) {
  return (
    <article {...props} className={cn(s.blockcontent, className)}>
      <SanityBlockContent blocks={blocks} serializers={{ types: { image: ImageRenderer } }} />
    </article>
  );
}
