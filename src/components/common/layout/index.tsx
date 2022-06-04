import React from 'react';
import s from './layout.module.scss';
import NavBar from '@/components/common/NavBar';

interface Props {
  children: React.ReactNode;
  pageProps: {
    category?: any;
  };
}

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  return (
    <div className={s.root}>
      <NavBar />
      <main className={s.main}> {children} </main>
      <footer>
        <h1>this is fotter</h1>
      </footer>
    </div>
  );
};

export default Layout;
