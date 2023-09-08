import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "David M. Budd Photography",
  description: "Photographer for hire in Denver, CO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme_color" content="#272727" />
        <meta name="background_color" content="#272727"></meta>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
