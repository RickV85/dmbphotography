import Gallery from "../../components/Gallery/Gallery";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";

export default function Architecture() {
  const architectureProps = {
    sectionTitle: "Architecture",
    backgroundImgSrc: archHorizImages[1].src,
    backgroundImgAltText: archHorizImages[1].alt,
    backgroundImgDims: { width: 1440, height: 810 },
    gallerySwiperImgs: { horiz: archHorizImages, vert: archVertImages },
  };

  return <Gallery galleryProps={architectureProps} />;
}
