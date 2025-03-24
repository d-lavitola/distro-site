import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ColorSchemeScript } from '@mantine/core';
import { Layout } from '@/components/Layout';
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Distro - Music Distribution Platform',
  description: 'Upload and distribute your music to all major streaming platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
