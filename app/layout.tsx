import type { Metadata } from 'next';
import { satoshi, inter } from '@/lib/fonts';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BazaarX · Direct Peer-to-Peer Marketplace',
  description:
    'Buy, sell, and rent items directly with people near you. Zero middleman fees, direct chat, and in-person verification.',
  keywords: ['marketplace', 'peer to peer', 'buy sell rent', 'olx alternative', 'bazaarx'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased bg-bg text-text min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Accessibility skip to main content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-btn focus:shadow-md"
          >
            Skip to main content
          </a>

          <Header />

          <main id="main-content" className="flex-1 flex flex-col w-full">
            {children}
          </main>

          <Footer />

          {/* Sonner toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'border hairline-border bg-surface text-text font-sans shadow-subtle-hover rounded-card text-small',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

