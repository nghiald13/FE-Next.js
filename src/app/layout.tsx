import type { Metadata } from "next";
import { Inter, Source_Serif_4, IBM_Plex_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-inter' });

const sourceSerif4 = Source_Serif_4({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'], weight: ['200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font-source-serif-4' });

const iBMPlexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'vietnamese'], weight: ['100', '200', '300', '400', '500', '600', '700'], variable: '--font-ibm-plex-mono' });


export const metadata: Metadata = {
  title: "MECSU Another way",
  description: "Landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", inter.variable, sourceSerif4.variable, iBMPlexMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
