"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./Header.module.css";
import { Squash as Hamburger } from "hamburger-react";

export default function Header() {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(undefined);
  const [screenHeight, setScreenHeight] = useState(undefined);
  const [headerDisplayMode, setHeaderDisplayMode] = useState(undefined);

  const toggleHamMenu = useCallback(() => {
    setHamMenuOpen((prevHamMenuOpen) => !prevHamMenuOpen);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (hamMenuOpen && event.target.id !== "dropdownMenu") {
        toggleHamMenu();
      }
    },
    [hamMenuOpen, toggleHamMenu]
  );

  useEffect(() => {
    if (hamMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hamMenuOpen, handleClickOutside]);

  useEffect(() => {
    const updateViewport = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      setScreenWidth(vw);
      setScreenHeight(vh);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 1024) {
      setHeaderDisplayMode("desktop");
      document.documentElement.style.setProperty("--headerFlexJustify", 'center');
    } else {
      setHeaderDisplayMode("mobile");
      document.documentElement.style.setProperty("--headerFlexJustify", 'space-between');
    }
  }, [screenWidth]);

  return (
    <nav className={styles["nav-main"]}>
      <div className={styles["nav-background"]}>
        <a href="/">
          <h1 className={headerDisplayMode === "mobile" ? styles["mobile-site-title"] : styles["desktop-site-title"]}>David M. Budd Photography</h1>
        </a>
        {headerDisplayMode === "mobile" ? (
          <div className={styles["hamburger-menu"]}>
            <Hamburger
              color="#ffffff"
              toggled={hamMenuOpen}
              toggle={toggleHamMenu}
              label="show menu items"
            />
          </div>
        ) : null}
      </div>
      <menu
        id="dropdownMenu"
        className={`${styles["dropdown-menu"]} ${
          hamMenuOpen ? styles["open"] : ""
        }`}
      >
        <hr className={styles["dropdown-divider"]}></hr>
        <a href="/architecture">
          <h2 className={styles["menu-option"]}>Architecture</h2>
        </a>
        <h2 className={styles["menu-option"]}>Product</h2>
        <h2 className={styles["menu-option"]}>Landscape</h2>
        <h2 className={styles["menu-option"]}>Lifestyle</h2>
        <h2 className={styles["menu-option"]}>About/Contact</h2>
        <hr className={styles["dropdown-divider"]}></hr>
      </menu>
    </nav>
  );
}
