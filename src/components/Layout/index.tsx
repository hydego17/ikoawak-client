import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { fontSans } from '@/lib/fonts/fonts';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router]);

  return (
    <div className={cn(fontSans.className, 'relative flex min-h-screen flex-col')}>
      <Header />

      <main className='container flex-1'>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
