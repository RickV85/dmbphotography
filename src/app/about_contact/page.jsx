import Image from "next/image";
import Header from "../components/Header/Header";
import styles from "./page.module.css";

export default function AboutContact() {
  return (
    <>
      <Header sectionTitle={"About/Contact"} />
      <section className={styles["about-main"]}>
        <section className={styles["bio-section"]}>
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
          <div className={styles["name-div"]}>
            <h3 className={styles["name-header"]}>David M. Budd</h3>
            <hr className={styles["name-hr"]} />
          </div>
          <p>
            David Budd’s passion for photography started with a gift from his
            father: a 1965 Nikon F that had belonged to his grandfather. After
            growing up in the Boston area, and living several years in Steamboat
            Springs, Colorado, he moved to Santa Barbara, California to attend
            the Brooks Institute of Photography. After graduating with a
            bachelors degree in Color Technology/Illustration, he returned to
            Colorado, settling in Denver in 1995. He lives on a not so quiet
            street with his wife Elizabeth (a writer and editor), Hubbell (a
            Rottweiler), Oxford (an English Bulldog), and Willow (an Scottish
            Fold cat).
          </p>
          <p>
            David’s specialties include capturing images of Architecture,
            Product, Lifestyle, and Travel. His cameras have taken him to jobs
            around the United States and worldwide.
          </p>
          <ul className={styles["client-list"]}>
            <p>His clients include:</p>
            <li>Kieding Interior Architects</li>
            <li>Christy Sports</li>
            <li>Rocky Mountain Events</li>
            <li>PMG Construction</li>
            <li>Spiritual Directors International</li>
            <li>iDesign Colorado</li>
            <li>Jackson Associates</li>
            <li>The Child’s World</li>
            <li>Bicycle Colorado</li>
            <li>NES Technology Holdings</li>
          </ul>
        </section>
        <section className={styles["contact-section"]}>
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
          <div className={styles["name-div"]}>
            <h3 className={styles["name-header"]}>Contact</h3>
            <hr className={styles["name-hr"]} />
          </div>
          <address>
            <p>Based in Denver, Colorado</p>
            <p>(303) 807-8479</p>
            <a href="mailto:">dbuddphoto@me.com</a>
          </address>
          <p>Call or email me today to discuss your next project!</p>
        </section>
      </section>
    </>
  );
}
