import Gallery from "../../components/Gallery/Gallery";
import travelHorizImages from "./TravelHorizImages";
import travelVertImages from "./TravelVertImages";

export default function Travel() {
  const travelProps = {
    sectionTitle: "Travel",
    horizBackgroundImg: travelHorizImages[0],
    vertBackgroundImg: travelVertImages[0],
    gallerySwiperImgs: { horiz: travelHorizImages, vert: travelVertImages },
  };

  return <Gallery galleryProps={travelProps} />;
}
