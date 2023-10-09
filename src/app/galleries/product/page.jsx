import Gallery from "../../components/Gallery/Gallery";
import productHorizImages from "./ProductHorizImages";
import productVertImages from "./ProductVertImages";

export default function Product() {
  const productProps = {
    sectionTitle: "Product",
    horizBackgroundImg: productHorizImages[0],
    vertBackgroundImg: productVertImages[0],
    gallerySwiperImgs: { horiz: productHorizImages, vert: productVertImages },
  };

  return <Gallery galleryProps={productProps} />;
}
