"use client";
import Image from "next/image";
import styles from "./BackgroundImg.module.css";
import { useState, useEffect } from "react";
import { createHandleResizeMobileRes } from "@/app/utils/utils";

export default function BackgroundImg({ vertImg, horizImg }) {
  const [backgroundImg, setBackgroundImg] = useState(undefined);
  const [mobileRes, setMobileRes] = useState(true);

  useEffect(() => {
    const handleResizeMobileRes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return createHandleResizeMobileRes(
        width,
        height,
        setMobileRes,
        setBackgroundImg,
        vertImg,
        horizImg
      );
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
