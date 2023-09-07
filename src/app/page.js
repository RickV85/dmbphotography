"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
  
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
  
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    updateViewport();
  
    window.addEventListener('resize', updateViewport);
  
    return () => window.removeEventListener('resize', updateViewport);
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
            <p style={{textAlign: 'center', fontSize: '24px', color: 'red', backgroundColor: 'black', zIndex: '3', position: 'absolute', top: '200px'}}>{`WINDOW HEIGHT: ${windowHeight}`}</p>
            <p style={{textAlign: 'center', fontSize: '24px', color: 'red', backgroundColor: 'black', zIndex: '3', position: 'absolute', top: '230px'}}>{`WINDOW WIDTH: ${windowWidth}`}</p>

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
