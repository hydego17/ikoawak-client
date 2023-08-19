import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export default function PreviewAlert() {
  return (
    <div className='bg-slate-200 dark:bg-slate-800 relative rounded-sm mb-12 p-4 flex items-center justify-between'>
      <h3>(Preview Mode)</h3>

      <Link
        href='/api/exit-preview'
        className={buttonVariants({
          variant: 'default',
          size: 'icon',
          className: 'h-6 w-6 text-sm'
        })}
      >
        <XIcon size={16} />
      </Link>
    </div>
  );
}
