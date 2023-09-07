"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";

export default function Home() {
  const windowHeight = window.innerHeight;

  useEffect(() => {
    const updateViewHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewHeight();

    window.addEventListener('resize', updateViewHeight);

    return () => window.removeEventListener('resize', updateViewHeight);
  }, []);

  return (
        <main className={styles.main}>
          <div className={styles.layout}>
            {/* Make this nav a component to reuse on all pages */}
            <nav className={styles["nav-background"]}>
              <h1 className={styles["site-title"]}>
                David M. Budd Photography
              </h1>
              <div className={styles["hamburger-menu"]}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
              </div>
            </nav>
            <Image
              className={styles.gallery}
              src="/images/DMB_9836.jpg"
              width={3600}
              height={2400}
              quality={100}
              priority={true}
              alt={`image gallery of David's work`}
            />
            {/* Make this footer a component, same as nav */}
            <footer className={styles["footer-background"]}>
              <h3>Based in Denver, Colorado</h3>
              <h3>{`(303) 807-8479`}</h3>
              <h3>dbuddphoto@me.com</h3>
              <p style={{'textAlign': 'center'}}>{`WINDOW HEIGHT: ${windowHeight}`}</p>
            </footer>
          </div>
        </main>
  );
}
