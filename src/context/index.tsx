import React, { FC } from 'react';
import { ManagedUIContext } from '@/context/ui/context';
import { getCommerceProvider } from '@/context/SWRHookContext';
import AppProvider from '@/context/app';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';

const CommerceProvider = getCommerceProvider();

const ContextWrapper: FC<{ children: React.ReactElement }> = ({ children }: any) => {
  return (
    <AppProvider>
      <ManagedUIContext>
        <MotionValueContextWrapper>
          <CommerceProvider>{children}</CommerceProvider>
        </MotionValueContextWrapper>
      </ManagedUIContext>
    </AppProvider>
  );
};
export default ContextWrapper;
