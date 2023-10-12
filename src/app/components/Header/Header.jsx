"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./Header.module.css";
import { Squash as Hamburger } from "hamburger-react";

const mobileMenuItems = (
  <>
    <a href="/galleries/architecture">
      <span className={styles["menu-option"]}>Architecture</span>
    </a>
    <a href="/galleries/product">
      <span className={styles["menu-option"]}>Product</span>
    </a>
    <a href="/galleries/travel">
      <span className={styles["menu-option"]}>Travel</span>
    </a>
    <a href="/galleries/lifestyle">
      <span className={styles["menu-option"]}>Lifestyle</span>
    </a>
    <a href="/about_contact">
      <span className={styles["menu-option"]}>About/Contact</span>
    </a>
  </>
);

const desktopMenuItems = (activeMenuItem) => (
  <>
    <a href="/galleries/architecture">
      <span
        className={`${styles["menu-option"]} ${styles["link"]} ${
          activeMenuItem === "Architecture"
            ? styles["active-section-heading"]
            : ""
        }`}
      >
        Architecture
      </span>
    </a>
    <span className={styles["menu-option"]}>+</span>
    <a href="/galleries/product">
      <span
        className={`${styles["menu-option"]} ${styles["link"]} ${
          activeMenuItem === "Product" ? styles["active-section-heading"] : ""
        }`}
      >
        Product
      </span>
    </a>
    <span className={styles["menu-option"]}>+</span>
    <a href="/galleries/travel">
      <span
        className={`${styles["menu-option"]} ${styles["link"]} ${
          activeMenuItem === "Travel" ? styles["active-section-heading"] : ""
        }`}
      >
        Travel
      </span>
    </a>
    <span className={styles["menu-option"]}>+</span>
    <a href="/galleries/lifestyle">
      <span
        className={`${styles["menu-option"]} ${styles["link"]} ${
          activeMenuItem === "Lifestyle" ? styles["active-section-heading"] : ""
        }`}
      >
        Lifestyle
      </span>
    </a>
    <span className={styles["menu-option"]}>+</span>
    <a href="/about_contact">
      <span
        className={`${styles["menu-option"]} ${styles["link"]} ${
          activeMenuItem === "About/Contact"
            ? styles["active-section-heading"]
            : ""
        }`}
      >
        About/Contact
      </span>
    </a>
  </>
);

export default function Header({ sectionTitle }) {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(undefined);
  const [headerDisplayMode, setHeaderDisplayMode] = useState(undefined);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

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
        return (
          // This loads a blank div to prevent site title from jumping on load
          <div className={styles["preload-spacer"]}></div>
        );
      case "mobile":
        return (
          <>
            <h2 className={styles["section-title"]}>{sectionTitle}</h2>
            <div className={styles["hamburger-menu"]}>
              <Hamburger
                color="#ffffff"
                toggled={hamMenuOpen}
                toggle={toggleHamMenu}
                label="Open or close navigation menu"
              />
            </div>
          </>
        );
      case "desktop":
        return (
          <menu className={styles["desktop-menu"]}>
            <nav>{desktopMenuItems(activeMenuItem)}</nav>
          </menu>
        );
      default:
        return null;
    }
  }, [
    headerDisplayMode,
    sectionTitle,
    hamMenuOpen,
    toggleHamMenu,
    activeMenuItem,
  ]);

  useEffect(() => {
    setActiveMenuItem(sectionTitle);
  }, [sectionTitle]);

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
  // THIS NEEDS TO BE UPDATED
  useEffect(() => {
    if (screenWidth >= 950) {
      setHeaderDisplayMode("desktop");
    } else if (screenWidth < 950) {
      setHeaderDisplayMode("mobile");
    }
  }, [screenWidth]);

  return (
    <header className={styles["nav-main"]}>
      <div
        className={styles["nav-background"]}
        style={
          sectionTitle === "About/Contact" ? { position: "relative" } : null
        }
      >
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
          <hr className={styles["dropdown-divider"]} />
          <nav className={styles["dropdown-nav"]}>{mobileMenuItems}</nav>
          <hr className={styles["dropdown-divider"]} />
        </menu>
      ) : null}
    </header>
  );
}
