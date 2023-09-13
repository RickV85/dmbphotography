import styles from "./page.module.css";
import Header from "../components/Header/Header";
import GallerySwiper from "../components/GallerySwiper/GallerySwiper";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";
import Image from "next/image";

export default function Architecture() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles["background-image-container"]}>
        <Image
          priority={true}
          src={"/images/home/vertical/Indyplaza 916.webp"}
          alt={"elevator shaft in an elegant building"}
          height={1440}
          width={810}
          className={styles["gallery-background-img"]}
        />
      </div>
      <GallerySwiper images={[archHorizImages, archVertImages]} />
      <div className={styles["section-title-container"]}>
        <h2 className={styles["section-title"]}>Architecture</h2>
      </div>
    </main>
  );
}
