import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Haus of Lyra — Des Moines, Iowa | Photography, Film & Brand',
  description: 'Haus of Lyra is a creative studio in Des Moines, Iowa. Senior portraits, wedding photography, wedding films, and brand visuals — built with intention.',
};

// Prevent stale HTML caches from referencing removed /_next/static assets.
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300;1,400&family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
