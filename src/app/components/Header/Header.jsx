import styles from "./Header.module.css"

export default function Header() {
  return (
    <nav className={styles["nav-background"]}>
      <h1 className={styles["site-title"]}>David M. Budd Photography</h1>
      <div className={styles["hamburger-menu"]}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
    </nav>
  );
}
