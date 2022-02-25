import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Transition from '@/components/Transition';
import NProgress from '@/components/NProgress';
import GlobalStyles from '@/styles/globals';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <NProgress />

      <GlobalStyles />

      <Header />

      <Transition location={router.pathname}>
        <LayoutStyled className="container">{children}</LayoutStyled>
      </Transition>

      <Footer />
    </>
  );
};

const LayoutStyled = styled.div`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
`;

export default Layout;
