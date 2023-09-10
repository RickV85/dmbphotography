// Remove if/when any state/useEffects are removed from this Home component to render page server-side
// Should do so for SEO, move state to a sub component like "layout" div
"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import HomeSwiper from "./components/HomeSwiper/HomeSwiper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Home() {
  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  return (
    <main className={styles.main}>
      {/* Make layout a component with state so Main loads from server for SEO? */}
      <div className={styles.layout}>
        <Header />
        <HomeSwiper className={styles.gallery} />
        <Footer />
      </div>
    </main>
  );
}
