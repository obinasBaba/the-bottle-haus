'use client';

import React, { FC } from 'react';
import { ManagedUIContext } from '@/context/ui/context';
import AppProvider from '@/context/app';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';

// const CommerceProvider = getCommerceProvider();

const ContextWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <ManagedUIContext>
        <MotionValueContextWrapper>{children}</MotionValueContextWrapper>
      </ManagedUIContext>
    </AppProvider>
  );
};
export default ContextWrapper;
