import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer-background"]}>
      <h3 className={styles["footer-copy"]}>Based in Denver, Colorado</h3>
      <h3 className={styles["pipe-spacers"]}>|</h3>
      <h3 className={styles["footer-copy"]}>{`(303) 807-8479`}</h3>
      <h3 className={styles["pipe-spacers"]}>|</h3>
      <h3 className={styles["footer-copy"]}>dbuddphoto@me.com</h3>
    </footer>
  );
}
