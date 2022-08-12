import React from 'react';
import s from './loadingmodal.module.scss';

import LoadingBg from '@/public/loading-bg.png';
import Logo from '@/public/logo-2.png';
import Image from 'next/image';
import { MotionParent } from '@/components/common/MotionItems';

const loadingVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const LoadingModal = () => {
  return (
    <MotionParent className={s.container} variants={loadingVariants}>
      <div className={s.bg}>
        <Image src={LoadingBg} layout="fill" alt="loading background" />
        <Image src={Logo} alt="customized logo" />
      </div>
    </MotionParent>
  );
};

export default LoadingModal;
