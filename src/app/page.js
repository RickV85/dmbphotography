import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <div className={styles.gallery} >
          <a className={styles.link} href="/architecture">
            TEST
          </a>
          <Image
            src="/images/DMB_9836.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            priority={true}
            alt={`image gallery of Dave's work`}
          />
        </div>
      </div>
    </main>
  );
}
