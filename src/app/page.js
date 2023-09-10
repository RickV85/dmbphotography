// Remove if/when any state/useEffects are removed from this Home component to render page server-side
// Should do so for SEO, move state to a sub component like "layout" div
"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import HomeSwiper from "./components/HomeSwiper/HomeSwiper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomeVertImages from "./HomeVertImages";
import HomeHorizImages from "./HomeHorizImages";

export default function Home() {
  const [homeImages, setHomeImages] = useState(null);

  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);

      if (vw > vh) {
        setHomeImages(HomeHorizImages);
      } else {
        setHomeImages(HomeVertImages);
      }
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
        <HomeSwiper className={styles.gallery} homeImages={homeImages} />
        <Footer />
      </div>
    </main>
  );
}
