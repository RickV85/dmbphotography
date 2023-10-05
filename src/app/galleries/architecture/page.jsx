import Gallery from "../../components/Gallery/Gallery";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";

export default function Architecture() {
  const christysImg = archHorizImages.find((img) => {
    if (
      img.src === "/images/architecture/horizontal/Christy_Boulder_10_23_13_7 webhor.jpg"
    ) {
      return img;
    }
  });

  const architectureProps = {
    sectionTitle: "Architecture",
    backgroundImgSrc: christysImg.src,
    backgroundImgAltText: christysImg.alt,
    backgroundImgDims: { width: 1440, height: 810 },
    gallerySwiperImgs: { horiz: archHorizImages, vert: archVertImages },
  };

  return <Gallery galleryProps={architectureProps} />;
}
