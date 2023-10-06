import Gallery from "../../components/Gallery/Gallery";
import travelHorizImages from "./TravelHorizImages";
import travelVertImages from "./TravelVertImages";

export default function Travel() {
  const starryHorizImg = travelHorizImages.find((img) => {
    if (
      img.src === "/images/travel/horizontal/florissanthornbek_final.webp"
    ) {
      return img;
    }
  });

  const canyonVertImg = travelVertImages.find((img) => {
    if (
      img.src === "/images/travel/vertical/antelopecyn1.jpg"
    ) {
      return img;
    }
  });

  const travelProps = {
    sectionTitle: "Travel",
    horizBackgroundImg: starryHorizImg,
    vertBackgroundImg: canyonVertImg,
    gallerySwiperImgs: { horiz: travelHorizImages, vert: travelVertImages },
  };

  return <Gallery galleryProps={travelProps} />;
}
