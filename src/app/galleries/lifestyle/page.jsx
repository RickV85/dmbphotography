import Gallery from "../../components/Gallery/Gallery";
import lifestyleHorizImages from "./LifestyleHorizImages";
import lifestyleVertImages from "./LifestyleVertImages";

export default function Lifestyle() {
  const lifestyleProps = {
    sectionTitle: "Lifestyle",
    horizBackgroundImg: lifestyleHorizImages[0],
    vertBackgroundImg: lifestyleVertImages[0],
    gallerySwiperImgs: { horiz: lifestyleHorizImages, vert: lifestyleVertImages },
  };

  return <Gallery galleryProps={lifestyleProps} />;
}
