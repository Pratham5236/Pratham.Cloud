import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pratham Gajjar | Software Developer - Coming Soon',
  description:
    'Pratham Gajjar - Backend developer specializing in real-time systems, cloud architecture, and modern web technologies. Portfolio coming soon.',
  keywords: [
    'Pratham Gajjar',
    'software developer',
    'backend developer',
    'full-stack developer',
    'React',
    'Node.js',
    'TypeScript',
    'Flutter',
    'Python',
    'AWS',
    'cloud architecture',
    'devops',
    'portfolio',
  ],
  authors: [{ name: 'Pratham Gajjar' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '64x64' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Pratham Gajjar | Software Developer - Coming Soon',
    description:
      'Backend Developer | Cloud Architect | Linux Power User - Portfolio coming soon',
    url: 'https://pratham.cloud',
    siteName: 'Pratham Gajjar',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pratham Gajjar | Software Developer - Coming Soon',
    description:
      'Backend Developer | Cloud Architect | Linux Power User - Portfolio coming soon',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
