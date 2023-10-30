import styles from "./Footer.module.css";

export default function Footer({ galleryStyling, galleryTitle }) {
  let varText;
  if (galleryStyling && galleryTitle === "Architecture") {
    varText = "Architectural";
  } else {
    varText = galleryTitle;
  }

  return (
    <footer
      className={`${styles["footer-background"]} ${
        galleryStyling ? styles["gallery-styling"] : ""
      }`}
    >
      <address className={styles["footer-address"]}>
        {galleryStyling && (
          <>
            <span
              className={styles["footer-copy"]}
            >{`${varText} Photographer`}</span>
            <span className={styles["pipe-spacers"]}>|</span>
          </>
        )}
        <span className={styles["footer-copy"]}>Based in Denver, Colorado</span>
        <span className={styles["pipe-spacers"]}>|</span>
        <span className={styles["footer-copy"]}>{`(303) 807-8479`}</span>
        <span className={styles["pipe-spacers"]}>|</span>
        <a href="mailto:dbuddphoto@me.com" className={styles["footer-copy"]}>
          <span>dbuddphoto@me.com</span>
        </a>
      </address>
    </footer>
  );
}
