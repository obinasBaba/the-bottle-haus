import React, { FC } from 'react';
import { ManagedUIContext } from '@/context/ui/context';
import { getCommerceProvider } from '@/context/SWRHookContext';
import AppProvider from '@/context/app';

const CommerceProvider = getCommerceProvider();

const ContextWrapper: FC<{ children: React.ReactElement }> = ({ children }: any) => {
  return (
    <AppProvider>
      <ManagedUIContext>
        <CommerceProvider>{children}</CommerceProvider>
      </ManagedUIContext>
    </AppProvider>
  );
};
export default ContextWrapper;
