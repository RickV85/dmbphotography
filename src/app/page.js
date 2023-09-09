// Remove if/when any state/useEffects are removed from this Home component to render page server-side
"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import HomeSwiper from "./components/HomeSwiper/HomeSwiper";
import Header from "./components/Header/Header";

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
      <div className={styles.layout}>
        {/* Make this nav a component to reuse on all pages */}
        {/* <nav className={styles["nav-background"]}>
          <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
          <div className={styles["hamburger-menu"]}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
            <div className={styles.line3}></div>
          </div>
        </nav> */}
        <Header />
        <HomeSwiper className={styles.gallery} />
        {/* Make this footer a component, same as nav */}
        <footer className={styles["footer-background"]}>
          <h3>Based in Denver, Colorado</h3>
          <h3>{`(303) 807-8479`}</h3>
          <h3>dbuddphoto@me.com</h3>
        </footer>
      </div>
    </main>
  );
}
