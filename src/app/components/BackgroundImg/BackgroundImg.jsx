"use client";
import Image from "next/image";
import styles from "./BackgroundImg.module.css";
import { useState, useEffect } from "react";

export default function BackgroundImg({ vertImg, horizImg }) {
  const [backgroundImg, setBackgroundImg] = useState(undefined);
  const [backgroundImgDims, setBackgroundImgDims] = useState(undefined);
  const [mobileRes, setMobileRes] = useState(true);

  useEffect(() => {
    // Could be updated to have multiple breakpoints and
    // make mobileRes a quality value. Maybe for tablets?
    // Could be a util func? Used in 3 places
    const handleResizeMobileRes = () => {
      if (!window) return;
      const width = window.innerWidth;
      const isMobile = width <= 750;

      setMobileRes(isMobile);

      // Can be deleted after development to eliminate logs while resizing
      if (isMobile) {
        console.log("Mobile resolution");
      } else {
        console.log("Desktop resolution");
      }
    };

    handleResizeMobileRes();

    window.addEventListener("resize", handleResizeMobileRes);

    return () => window.removeEventListener("resize", handleResizeMobileRes);
  }, [backgroundImg]);

  useEffect(() => {
    const updateViewport = () => {
      const vw = window.innerWidth * 0.01;
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vw", `${vw}px`);
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      setBackgroundImgDims({
        h: window.innerHeight,
        w: window.innerWidth,
      }); 

      if (vw > vh) {
        setBackgroundImg(horizImg);
      } else {
        setBackgroundImg(vertImg);
      }
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, [vertImg, horizImg]);

  return (
    <div className={styles["background-image-container"]}>
      {backgroundImg ? (
        <Image
          priority={true}
          quality={mobileRes ? 15 : 65}
          src={backgroundImg.src}
          alt={backgroundImg.alt}
          height={backgroundImgDims.h}
          width={backgroundImgDims.w}
          className={styles["gallery-background-img"]}
        />
      ) : null}
    </div>
  );
}
