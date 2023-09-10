import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer-background"]}>
      <h3>Based in Denver, Colorado</h3>
      <h3>{`(303) 807-8479`}</h3>
      <h3>dbuddphoto@me.com</h3>
    </footer>
  );
}
