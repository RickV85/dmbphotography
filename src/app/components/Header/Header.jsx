"use client";
import { useState } from "react";
import styles from "./Header.module.css";
import { Squash as Hamburger } from "hamburger-react";

export default function Header() {
  const [hamMenuOpen, setHamMenuOpen] = useState(false);

  const toggleHamMenu = () => {
    setHamMenuOpen(!hamMenuOpen);
  };

  return (
    <nav className={styles["nav-main"]}>
      <div className={styles["nav-background"]}>
        <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
        <div className={styles["hamburger-menu"]}>
          <Hamburger
            color="#ffffff"
            toggled={hamMenuOpen}
            toggle={toggleHamMenu}
          />
        </div>
      </div>
      <menu className={`${styles["dropdown-menu"]} ${hamMenuOpen ? styles['open'] : ''}`}>
        <line className={styles["dropdown-divider"]}></line>
        <a href="/architecture">
          <h2 className={styles["menu-option"]}>Architecture</h2>
        </a>
        <h2 className={styles["menu-option"]}>Product</h2>
        <h2 className={styles["menu-option"]}>Landscape</h2>
        <h2 className={styles["menu-option"]}>Lifestyle</h2>
        <h2 className={styles["menu-option"]}>About/Contact</h2>
        <line className={styles["dropdown-divider"]}></line>
      </menu>
    </nav>
  );
}
