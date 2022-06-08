import React from 'react';
import s from './layout.module.scss';
import { getCommerceProvider } from '@/context/SWRHookContext';
import FixedLayer from '@fixedLayer/index';

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
        <FixedLayer />
        <main className={s.main}> {children} </main>
        <footer>
          <h1>this is fotter</h1>
        </footer>
      </div>
    </CommerceProvider>
  );
};

export default Layout;
