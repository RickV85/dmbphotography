import Gallery from "../../components/Gallery/Gallery";
import productHorizImages from "./ProductHorizImages";
import productVertImages from "./ProductVertImages";

export default function Product() {
  const christysHorizImg = productHorizImages.find((img) => {
    if (
      img.src === "/images/product/horizontal/christy_bcpoint4.webp"
    ) {
      return img;
    }
  });

  const christysVertImg = productVertImages.find((img) => {
    if (
      img.src === "/images/product/vertical/christy_bcpoint1_916.webp"
    ) {
      return img;
    }
  });

  const productProps = {
    sectionTitle: "Product",
    horizBackgroundImg: christysHorizImg,
    vertBackgroundImg: christysVertImg,
    gallerySwiperImgs: { horiz: productHorizImages, vert: productVertImages },
  };

  return <Gallery galleryProps={productProps} />;
}
