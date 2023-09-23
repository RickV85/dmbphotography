// import styles from "./page.module.css";
// import Header from "../../components/Header/Header";
// import GallerySwiper from "../../components/GallerySwiper/GallerySwiper";
import Gallery from "../../components/Gallery/Gallery";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";
// import Image from "next/image";

export default function Architecture() {
  const architectureProps = {
    sectionTitle: "Architecture",
    backgroundImgSrc: archVertImages[1].src,
    backgroundImgAltText: archVertImages[1].alt,
    backgroundImgDims: {width: 810, height: 1440},
    gallerySwiperImgs: {horiz: archHorizImages, vert: archVertImages}
  }
  return (
    <Gallery galleryProps={architectureProps} />
  );
}
