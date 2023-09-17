import styles from "./page.module.css";
import Header from "../components/Header/Header";
import GallerySwiper from "../components/GallerySwiper/GallerySwiper";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";
import Image from "next/image";

export default function Architecture() {
  return (
    <main className={styles.main}>
      <Header sectionTitle="Architecture" />
        <div className={styles["rotate-message-container"]}>
          <h3>Best viewed in landscape - Rotate device</h3>
        </div>
        <div className={styles["background-image-container"]}>
          {/* might need to adjust these fixed vertical dims for bkgd img */}
          <Image
            priority={true}
            src={"/images/home/vertical/Indyplaza 916.webp"}
            alt={"elevator shaft in an elegant building"}
            height={1440}
            width={810}
            className={styles["gallery-background-img"]}
          />
        </div>
        <section className={styles.gallery}>
        <div className={styles["gallery-spacer"]}></div>
        <div className={styles["gallery-swiper"]}>
          <GallerySwiper
            images={{ horiz: archHorizImages, vert: archVertImages }}
          />
        </div>
        <div className={styles["section-title-container"]}>
          <h2>Architecture</h2>
        </div>
      </section>
    </main>
  );
}
