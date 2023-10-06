import Gallery from "../../components/Gallery/Gallery";
import lifestyleHorizImages from "./LifestyleHorizImages";
import lifestyleVertImages from "./LifestyleVertImages";

export default function Lifestyle() {
  const cyclistsHorizImg = lifestyleHorizImages.find((img) => {
    if (
      img.src === "/images/lifestyle/horizontal/TOM1.jpg"
    ) {
      return img;
    }
  });

  const skierVertImg = lifestyleVertImages.find((img) => {
    if (
      img.src === "/images/lifestyle/vertical/christy 1.jpg"
    ) {
      return img;
    }
  });

  const lifestyleProps = {
    sectionTitle: "Lifestyle",
    horizBackgroundImg: cyclistsHorizImg,
    vertBackgroundImg: skierVertImg,
    gallerySwiperImgs: { horiz: lifestyleHorizImages, vert: lifestyleVertImages },
  };

  return <Gallery galleryProps={lifestyleProps} />;
}
