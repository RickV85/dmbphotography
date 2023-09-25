import styles from "./layout.module.css";

export default function GalleriesLayout({ children }) {
  return <main className={styles.main}>{children}</main>;
}
