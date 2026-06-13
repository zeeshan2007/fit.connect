import type { Metadata } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FitHire — Find Your Perfect Fitness Professional in Pakistan',
  description:
    'Browse and hire certified fitness trainers, nutritionists, and dieticians across Pakistan. Connect instantly via WhatsApp — no sign-up required.',
  keywords: [
    'fitness trainer Pakistan',
    'dietician Lahore',
    'nutritionist Pakistan',
    'hire fitness trainer',
    'online dietician',
    'weight loss trainer Pakistan',
  ],
  verification: {
    google: 'bgmQa2DaQv6kfvCAdY-_jxF-kfgM_LdTmi0HLEWDCR0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('fithire-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${barlow.variable} font-body`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
