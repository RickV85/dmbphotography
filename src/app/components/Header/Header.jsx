"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./Header.module.css";
import { Squash as Hamburger } from "hamburger-react";

export default function Header() {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);

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

  return (
    <nav className={styles["nav-main"]}>
      <div className={styles["nav-background"]}>
        <a href="/">
          <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
        </a>
        <div className={styles["hamburger-menu"]} aria-label="Hamburger menu button">
          <Hamburger
            color="#ffffff"
            toggled={hamMenuOpen}
            toggle={toggleHamMenu}
          />
        </div>
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
