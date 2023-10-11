import Image from "next/image";
import Header from "../components/Header/Header";
import styles from "./page.module.css";

export default function AboutContact() {
  return (
    <>
      <Header />
      <section className={styles["about-main"]}>
        <div className={styles["portrait-container"]}>
          <Image
            src={"/images/about_contact/xpro1self.jpg"}
            alt={"David Budd self portrait"}
            fill={true}
            quality={50}
            priority={true}
            className={styles["portrait-img"]}
          />
        </div>
        <section className={styles["bio-section"]}>
          <div className={styles["name-div"]}>
            <h3 className={styles["name-header"]}>David M. Budd</h3>
            <hr className={styles["name-hr"]}/>
          </div>
          <p className={styles["bio-copy"]}>David Budd’s passion for photography started with a gift from his father: a 1965 Nikon F that had belonged to his grandfather. After growing up in the Boston area, and living several years in Steamboat Springs, Colorado, he moved to Santa Barbara, California to attend the Brooks Institute of Photography. After graduating with a bachelors degree in Color Technology/Illustration, he returned to Colorado, settling in Denver in 1995. He lives on a not so quiet street with his wife Elizabeth (a writer and editor), Hubbell (a Rottweiler), Oxford (an English Bulldog), and Willow (an Scottish Fold cat).<br /><br />
          
          David’s specialties include capturing images of Architecture, Product, Lifestyle, and Travel. His cameras have taken him to jobs around the United States and worldwide.<br /><br />

          His clients include:<br /><br />

          Kieding Interior Architects<br />
          Christy Sports<br />
          Rocky Mountain Events<br />
          PMG Construction<br />
          Spiritual Directors International<br />
          iDesign Colorado<br />
          Jackson Associates<br />
          The Child’s World<br />
          Bicycle Colorado<br />
          NES Technology Holdings<br />
          </p>
        </section>
        <section className={styles["contact-section"]}>
          <div>
            <h3>Contact</h3>
            <hr />
          </div>
          <p>
            Based in Denver, Colorado
            (303) 807-8479
            dbuddphoto@me.com
            Call or email me today to discuss your next project!
          </p>
        </section>
      </section>
    </>
  );
}
