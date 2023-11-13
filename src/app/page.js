import styles from "./page.module.css";
import HomeSwiper from "./components/HomeSwiper/HomeSwiper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import homeVertImages from "./HomeVertImages";
import homeHorizImages from "./HomeHorizImages";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <HomeSwiper
        images={{horiz: homeHorizImages, vert: homeVertImages}}
      />
      <Footer />
    </main>
  );
}
