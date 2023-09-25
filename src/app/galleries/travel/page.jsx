import Gallery from "../../components/Gallery/Gallery";
import travelHorizImages from "./TravelHorizImages";
import travelVertImages from "./TravelVertImages";

export default function Travel() {
  const travelProps = {
    sectionTitle: "Travel",
    backgroundImgSrc: travelHorizImages[7].src,
    backgroundImgAltText: travelHorizImages[7].alt,
    backgroundImgDims: { width: 1440, height: 810 },
    gallerySwiperImgs: { horiz: travelHorizImages, vert: travelVertImages },
  };

  return <Gallery galleryProps={travelProps} />;
}
