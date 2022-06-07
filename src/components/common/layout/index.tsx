import React from 'react';
import s from './layout.module.scss';
import NavBar from '@/components/common/NavBar';
import { getCommerceProvider } from '@/context/SWRHookContext';

interface Props {
  children: React.ReactNode;
  pageProps: {
    category?: any;
  };
}

const CommerceProvider = getCommerceProvider();

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  return (
    <CommerceProvider>
      <div className={s.root}>
        <NavBar />
        <main className={s.main}> {children} </main>
        <footer>
          <h1>this is fotter</h1>
        </footer>
      </div>
    </CommerceProvider>
  );
};

export default Layout;
