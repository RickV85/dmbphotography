"use client";
import Image from "next/image";
import styles from "./BackgroundImg.module.css";
import { useState, useEffect } from "react";

export default function BackgroundImg({ vertImg, horizImg }) {
  const [backgroundImg, setBackgroundImg] = useState(undefined);
  const [mobileRes, setMobileRes] = useState(true);

  useEffect(() => {
    // Could be updated to have multiple breakpoints and
    // make mobileRes a quality value. Maybe for tablets?
    // Could be a util func? Used in 3 places
    const handleResizeMobileRes = () => {
      if (!window) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 550 && height < width;

      setMobileRes(isMobile);

      if (width > height) {
        setBackgroundImg(horizImg);
      } else {
        setBackgroundImg(vertImg);
      }
    };

    handleResizeMobileRes();

    window.addEventListener("resize", handleResizeMobileRes);
    window.addEventListener("orientation", handleResizeMobileRes);

    return () => {
      window.removeEventListener("resize", handleResizeMobileRes);
      window.removeEventListener("orientation", handleResizeMobileRes);
    };
  }, [backgroundImg, horizImg, vertImg]);

  return (
    <div className={styles["background-image-container"]}>
      {backgroundImg ? (
        <Image
          fill
          sizes={"100vw"}
          priority={true}
          quality={mobileRes ? 20 : 65}
          src={backgroundImg.src}
          alt={backgroundImg.alt}
          className={styles["gallery-background-img"]}
        />
      ) : null}
    </div>
  );
}
