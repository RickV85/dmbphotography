import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{ position: "relative" }}>
        <div className={styles.gallery} style={{zIndex: -1}}>
          <Image
            src="/images/DMB_9836.jpg" // Use your actual image path
            layout="fill"
            objectFit="cover" // Cover the entire div, cropping if necessary
            objectPosition="center" // Center the image
            quality={100}
            priority={true} // Load the image with priority
          />
        </div>

        {`Test`}
      </div>
    </main>
  );
}
