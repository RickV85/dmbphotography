import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer-background"]}>
      <address className={styles["footer-address"]}>
        <span className={styles["footer-copy"]}>Based in Denver, Colorado</span>
        <span className={styles["pipe-spacers"]}>|</span>
        <span className={styles["footer-copy"]}>{`(303) 807-8479`}</span>
        <span className={styles["pipe-spacers"]}>|</span>
        <span className={styles["footer-copy"]}>dbuddphoto@me.com</span>
      </address>
    </footer>
  );
}
