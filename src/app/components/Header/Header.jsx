"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./Header.module.css";
import { Squash as Hamburger } from "hamburger-react";

const mobileMenuItems = (
  <>
    <a href="/architecture">
      <h2 className={styles["menu-option"]}>Architecture</h2>
    </a>
    <h2 className={styles["menu-option"]}>Product</h2>
    <h2 className={styles["menu-option"]}>Landscape</h2>
    <h2 className={styles["menu-option"]}>Lifestyle</h2>
    <h2 className={styles["menu-option"]}>About/Contact</h2>
  </>
);

const desktopMenuItems = (
  <>
    <a href="/architecture">
      <h2 className={styles["menu-option"]}>Architecture</h2>
    </a>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>Product</h2>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>Landscape</h2>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>Lifestyle</h2>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>About/Contact</h2>
  </>
);

export default function Header({ sectionTitle }) {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(undefined);
  const [screenHeight, setScreenHeight] = useState(undefined);
  const [headerDisplayMode, setHeaderDisplayMode] = useState(undefined);

  const toggleHamMenu = useCallback(() => {
    setHamMenuOpen((prevHamMenuOpen) => !prevHamMenuOpen);
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (hamMenuOpen && event.target.id !== "mobileDropdownMenu") {
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
    if (screenWidth >= 950) {
      setHeaderDisplayMode("desktop");
    } else {
      setHeaderDisplayMode("mobile");
    }
  }, [screenWidth]);

  return (
    <nav className={styles["nav-main"]}>
      <div className={styles["nav-background"]}>
        <a href="/">
          <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
        </a>
        {headerDisplayMode === "mobile" ? (
          <>
            <h2 className={styles["section-title"]}>{sectionTitle}</h2>
            <div className={styles["hamburger-menu"]}>
              <Hamburger
                color="#ffffff"
                toggled={hamMenuOpen}
                toggle={toggleHamMenu}
                label="show menu items"
              />
            </div>
          </>
        ) : (
          <menu className={styles["desktop-menu"]}>{desktopMenuItems}</menu>
        )}
      </div>
      {headerDisplayMode === "mobile" ? (
        <menu
          id="mobileDropdownMenu"
          className={`${styles["dropdown-menu"]} ${
            hamMenuOpen ? styles["open"] : ""
          }`}
        >
          <hr className={styles["dropdown-divider"]}></hr>
          {mobileMenuItems}
          <hr className={styles["dropdown-divider"]}></hr>
        </menu>
      ) : null}
    </nav>
  );
}
