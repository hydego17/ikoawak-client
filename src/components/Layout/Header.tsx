import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='sticky top-0 z-40 lg:mt-8 w-full [backdrop-filter:saturate(100%)_blur(20px)]'>
      <div className='container flex items-center space-x-4 py-8 sm:justify-between sm:space-x-0'>
        <nav className='flex gap-6'>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <Link href='/post'>Posts</Link>
        </nav>

        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
              <Moon className='hidden h-5 w-5 dark:block' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
