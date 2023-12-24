import React from 'react';
import ContextWrapper from '@/context';
import ThemeRegistry from '@/theme/Theme-Registry';
import { Inter } from 'next/font/google';

import '@global/index.scss';
import 'mouse-follower/src/scss/index.scss';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import PageWrapper from '@/context/page-wrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <html lang="en" className={inter.variable}>
      <body className="body">
        <ThemeRegistry>
          <ContextWrapper>
            <PageWrapper>{children}</PageWrapper>
          </ContextWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
