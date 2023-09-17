import styles from "./page.module.css";
import Header from "../components/Header/Header";
import GallerySwiper from "../components/GallerySwiper/GallerySwiper";
import travelHorizImages from "./TravelHorizImages";
import travelVertImages from "./TravelVertImages";
import Image from "next/image";

export default function Travel() {
  return (
    <main className={styles.main}>
      <Header sectionTitle="Travel" />
      <div className={styles["rotate-message-container"]}>
        <h3 className={styles["rotate-message"]}>
          Best viewed in landscape - Rotate device
        </h3>
      </div>
      <div className={styles["background-image-container"]}>
        {/* might need to adjust these fixed vertical dims for bkgd img */}
        <Image
          priority={true}
          src={"/images/home/horizontal/florissanthornbek_final webhor.webp"}
          alt={"starry night sky"}
          height={810}
          width={1440}
          className={styles["gallery-background-img"]}
        />
      </div>
      <section className={styles.gallery}>
        <div className={styles["gallery-spacer"]}></div>
        <div className={styles["gallery-swiper"]}>
          <GallerySwiper
            images={{ horiz: travelHorizImages, vert: travelVertImages }}
          />
        </div>
        <div className={styles["section-title-container"]}>
          <h2>Travel</h2>
        </div>
      </section>
    </main>
  );
}
