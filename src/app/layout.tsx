import type { Metadata, Viewport } from "next";
import "./globals.css";
import { wedding } from "@/config/wedding";
import { MusicProvider } from "@/components/MusicProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: wedding.site.title,
  description: wedding.site.description,
  openGraph: {
    type: "website",
    title: wedding.site.title,
    description: wedding.site.description,
    siteName: "Abinesh & Deepika",
    locale: "en_IN",
    images: [
      {
        url: wedding.site.ogImage,
        width: 1200,
        height: 630,
        alt: "Abinesh & Deepika — 11 November 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.site.title,
    description: wedding.site.description,
    images: [wedding.site.ogImage],
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: wedding.site.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&family=Noto+Serif+Tamil:wght@400;500&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
