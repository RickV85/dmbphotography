import styles from "./gallery.module.css";
import Header from "../../components/Header/Header";
import GallerySwiper from "../../components/GallerySwiper/GallerySwiper";
import Image from "next/image";

export default function Gallery({ galleryProps }) {
  return (
    <>
      <Header sectionTitle={galleryProps.sectionTitle} />
      <div className={styles["rotate-message-container"]}>
        <h3>Best viewed in landscape - Rotate device</h3>
      </div>
      <div className={styles["background-image-container"]}>
        {/* might need to adjust these fixed vertical dims for bkgd img */}
        <Image
          priority={true}
          src={galleryProps.backgroundImgSrc}
          alt={galleryProps.backgroundImgAltText}
          height={galleryProps.backgroundImgDims.height}
          width={galleryProps.backgroundImgDims.width}
          className={styles["gallery-background-img"]}
        />
      </div>
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
