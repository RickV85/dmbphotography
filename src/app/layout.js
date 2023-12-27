import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Photographer | David M. Budd | Denver, Colorado",
  description: "Photographer for hire in Denver, Colorado",
  keywords:
    "Denver photography, architecture photography, product photography, affordable photography, contractual photography, Denver CO photography",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  authors: [{
    name: "Rick Vermeil - Vermeil Web Solutions LLC",
    url: "https://rickvermeil.com/freelance",
  }],
  generator: "Next.js",
  metadataBase: new URL('https://www.davidmbuddphotography.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'David M. Budd Photography',
    description: 'Portfolio site for David M. Budd Photography, a photographer for hire in Denver, Colorado.',
    images: '/images/about_contact/xpro1self.jpg',
    url: new URL('https://www.davidmbuddphotography.com'),
    locale: "en_US",
  },
};

export const viewport = {
  themeColor: "#272727",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
