import Link from 'next/link';
import { InstagramIcon, MailIcon, TwitterIcon } from 'lucide-react';

export default function Footer() {
  return (
    <div className='mt-16 w-full'>
      <div className='container flex flex-col items-center gap-4 py-16'>
        <div className='flex gap-6'>
          <Link
            title='Twitter'
            href='https://twitter.com/rhmtpanji'
            target='_blank'
            rel='noopener noreferrer'
            className='link flex items-center gap-2'
          >
            <TwitterIcon size={18} /> Twitter
          </Link>
          <Link
            title='Instagram'
            href='https://www.instagram.com/rahmatpanji_/'
            target='_blank'
            rel='noopener noreferrer'
            className='link flex items-center gap-2'
          >
            <InstagramIcon size={18} /> Instagram
          </Link>

          <Link
            title='Email'
            href='mailto:ikoawakpanji@mail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='link flex items-center gap-2'
          >
            <MailIcon size={18} /> Email
          </Link>
        </div>

        <div className='copyright text-sm'>
          Copyright &copy; {new Date().getFullYear()} Rahmat Panji
        </div>
      </div>
    </div>
  );
}
