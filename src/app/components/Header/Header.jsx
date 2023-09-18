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
    <a href="/travel">
      <h2 className={styles["menu-option"]}>Travel</h2>
    </a>
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
    <a href="/travel">
      <h2 className={styles["menu-option"]}>Travel</h2>
    </a>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>Lifestyle</h2>
    <h2 className={styles["menu-option"]}>+</h2>
    <h2 className={styles["menu-option"]}>About/Contact</h2>
  </>
);

export default function Header({ sectionTitle }) {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(undefined);
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

  const determineDisplayStyling = useCallback(() => {
    switch (headerDisplayMode) {
      case undefined:
        return null;
      case "mobile":
        return (
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
        );
      case "desktop":
        return (
          <menu className={styles["desktop-menu"]}>{desktopMenuItems}</menu>
        );
      default:
        return null;
    }
  }, [headerDisplayMode, sectionTitle, hamMenuOpen, toggleHamMenu]);

  useEffect(() => {
    if (hamMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hamMenuOpen, handleClickOutside]);

  useEffect(() => {
    const updateScreenWidth = () => {
      const vw = window.innerWidth;

      setScreenWidth(vw);
    };

    updateScreenWidth();

    window.addEventListener("resize", updateScreenWidth);
    window.addEventListener("orientationchange", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      window.removeEventListener("orientationchange", updateScreenWidth);
    };
  }, []);

  // IF BREAKPOINT FOR DESKTOP CHANGES FROM 950PX
  // THIS NEEDS TO BE UPDATES
  useEffect(() => {
    if (screenWidth >= 950) {
      setHeaderDisplayMode("desktop");
    } else if (screenWidth < 950) {
      setHeaderDisplayMode("mobile");
    }
  }, [screenWidth]);

  return (
    <nav className={styles["nav-main"]}>
      <div className={styles["nav-background"]}>
        <a href="/">
          <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
        </a>
        {determineDisplayStyling()}
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
