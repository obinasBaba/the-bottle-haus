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
      <NavBar></NavBar>
      <main className={s.main}> {children} </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
