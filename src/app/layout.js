import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Photographer | David M. Budd | Denver, Colorado",
  description: "Photographer for hire in Denver, Colorado",
  keywords:
    "Denver photography, architecture photography, product photography, affordable photography, contractual photography, Denver CO photography",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#272727" },
    { media: "(prefers-color-scheme: dark)", color: "#272727" },
    { color: "#272727" },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  other: {
    'google-site-verification': "PuE25LUJIVSsqY4ylCXSzBjMap71YGI5r1Fpm7Dp83o",
    // <meta name="google-site-verification" content="PuE25LUJIVSsqY4ylCXSzBjMap71YGI5r1Fpm7Dp83o" />
  },

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
