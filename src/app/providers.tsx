'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        primaryColor: 'blue',
        fontFamily: 'var(--font-inter)',
      }}
      defaultColorScheme="light"
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
} 
