import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "David M. Budd Photography",
  description: "Photographer for hire in Denver, CO",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#272727' },
    { media: '(prefers-color-scheme: dark)', color: '#272727' },
    { color: '#272727' }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
