import React from 'react';
import s from './layout.module.scss';

interface Props {
  children: React.ReactNode;
  pageProps: {
    category?: any;
  };
}

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  return (
    <div className={s.root}>
      <nav></nav>
      <main> {children} </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
