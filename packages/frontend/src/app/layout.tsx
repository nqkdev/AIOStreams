import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AIOStreams',
  description: 'The all in one addon for Stremio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="AIOStreams" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
