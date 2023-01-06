import { domAnimation, LazyMotion, m } from 'framer-motion';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { ReactNode } from 'react';

import Header from './Header';
import SEO from '../../seo/next-seo.json';
import TITLE from '../../seo/title.json';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const currentTitle = TITLE.find((item) => item.path == router.pathname) || {
    path: '/',
    title: SEO.title,
  };

  const seo = { ...SEO, titleTemplate: currentTitle.title };

  return (
    <>
      <DefaultSeo {...seo} />
      <Header />
      <LazyMotion features={domAnimation}>
        <m.main
          className='flex-1'
          initial='initial'
          animate='enter'
          exit='exit'
        >
          {children}
        </m.main>
      </LazyMotion>
    </>
  );
};

export default Layout;
