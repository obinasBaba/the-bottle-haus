'use client';

import { AnimatePresence } from 'framer-motion';

export const AnimatePresenceCb = ({ children, custom }: any) => {
  return (
    <AnimatePresence
      mode="wait"
      custom={custom}
      onExitComplete={() => {
        console.log('exit complete ---------- ');

        // transitionCallback();
        // cursor.current?.removeText();
        // cursor.current?.removeState('-opaque');
        // cursor.current?.removeState('-pointer');
        // document.body.querySelector('.mf-cursor')?.classList.remove('.')
        // scroll?.scrollTo(0, { duration: 0, disableLerp: true });
      }}>
      {children}
    </AnimatePresence>
  );
};
