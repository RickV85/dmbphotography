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

  const indyPlazaImg = archVertImages.find((img) => {
    if (
      img.src === "/images/architecture/vertical/Indyplaza 916.jpg"
    ) {
      return img;
    }
  });

  const architectureProps = {
    sectionTitle: "Architecture",
    horizBackgroundImg: christysImg,
    vertBackgroundImg: indyPlazaImg,
    gallerySwiperImgs: { horiz: archHorizImages, vert: archVertImages },
  };

  return <Gallery galleryProps={architectureProps} />;
}
