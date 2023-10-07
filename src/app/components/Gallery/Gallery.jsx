import styles from "./gallery.module.css";
import Header from "../../components/Header/Header";
import GallerySwiper from "../../components/GallerySwiper/GallerySwiper";
import BackgroundImg from "../BackgroundImg/BackgroundImg";

export default function Gallery({ galleryProps }) {
  return (
    <>
      <Header sectionTitle={galleryProps.sectionTitle} />
      <div className={styles["rotate-message-container"]}>
        <h3>Best viewed in landscape - Rotate device</h3>
      </div>
      <BackgroundImg
        vertImg={galleryProps.vertBackgroundImg}
        horizImg={galleryProps.horizBackgroundImg}
      />
      <section className={styles.gallery}>
        <div className={styles["gallery-spacer"]}></div>
        <div className={styles["gallery-swiper"]}>
          <GallerySwiper
            images={{
              horiz: galleryProps.gallerySwiperImgs.horiz,
              vert: galleryProps.gallerySwiperImgs.vert,
            }}
          />
        </div>
        <div className={styles["section-title-container"]}>
          <h2>{galleryProps.sectionTitle}</h2>
        </div>
      </section>
    </>
  );
}
