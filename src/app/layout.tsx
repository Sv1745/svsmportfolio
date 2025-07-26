import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Interactive3D from '@/components/Interactive3D';
import Grid from '@/components/Grid';

export const metadata: Metadata = {
  title: 'Cosmic Coder | Srivathsa S Murthy',
  description: "Srivathsa S Murthy's portfolio: an AI/ML Engineer, 3D Modeler, and Space Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;700&family=Source+Code+Pro&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30">
        <Grid />
        <Interactive3D />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
