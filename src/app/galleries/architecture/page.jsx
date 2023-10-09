import Gallery from "../../components/Gallery/Gallery";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";

export default function Architecture() {
  const architectureProps = {
    sectionTitle: "Architecture",
    horizBackgroundImg: archHorizImages[0],
    vertBackgroundImg: archHorizImages[0],
    gallerySwiperImgs: { horiz: archHorizImages, vert: archVertImages },
  };

  return <Gallery galleryProps={architectureProps} />;
}
