import Gallery from "../../components/Gallery/Gallery";
import archHorizImages from "./ArchitectureHorizImages";
import archVertImages from "./ArchitectureVertImages";

export default function Architecture() {
  const architectureProps = {
    sectionTitle: "Architecture",
    horizBackgroundImg: archHorizImages[0],
    vertBackgroundImg: archHorizImages[0],
    gallerySwiperImgs: { horiz: archHorizImages, vert: archVertImages },
    copy: `Having been rooted in Denver since 1995, David understands the architectural heartbeat of Colorado. This gallery displays a broad spectrum of his work, including Christy Sports storefronts in both Boulder and Avon, as well as various office spaces, meeting rooms, and lounge areas.
    
    Whether you're a business owner looking to showcase your commercial space or an architect wishing to document your latest project, David’s expertise extends from retail environments to corporate settings and beyond.`
  };

  return <Gallery galleryProps={architectureProps} />;
}
