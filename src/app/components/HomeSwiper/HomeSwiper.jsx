"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";

import Loading from "../Loading/Loading";

export default function HomeSwiper({ images }) {
  const [homeImages, setHomeImages] = useState(null);
  const [mobileRes, setMobileRes] = useState(true);
  const [loadedImgKeys, setLoadedImgKeys] = useState([]);
  const [initialImgsLoaded, setInitialImgsLoaded] = useState(false);

  useEffect(() => {
    // Resets loading state when images swap from horiz
    // to vertical or vice versa. Images are reloaded
    // at times when window is resized to match sizing.
    setInitialImgsLoaded(false);
    setLoadedImgKeys([]);
  }, [homeImages]);

  // Can be deleted after build phase
  useEffect(() => {
    if (loadedImgKeys.includes(0) && loadedImgKeys.includes(1)) {
      setInitialImgsLoaded(true);
      console.log("initial images loaded");
    }
    console.log(loadedImgKeys);
  }, [loadedImgKeys]);

  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth >= 550) {
        console.log("Desktop resolution");
        setMobileRes(false);
      } else if (
        window.innerWidth < 550 &&
        window.screen.orientation.type === "portrait-primary"
      ) {
        console.log("Mobile resolution");
        setMobileRes(true);
      }

      const vw = window.innerWidth * 0.01;
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vw", `${vw}px`);
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      if (vw > vh) {
        setHomeImages(images.horiz);
      } else {
        setHomeImages(images.vert);
      }
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, [images]);

  return (
    <>
      {initialImgsLoaded ? null : <Loading />}
      <div
        className={`swiper-container ${
          initialImgsLoaded ? "swiper-visible" : "swiper-hidden"
        }`}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          loop={true}
          onSwiper={(swiper) => {
            console.log(swiper);
          }}
        >
          {homeImages ? (
            homeImages.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  fill={true}
                  priority={true}
                  src={img.src}
                  alt={img.alt}
                  quality={mobileRes ? 20 : 85}
                  onLoadingComplete={() => {
                    setLoadedImgKeys((prevKeys) => [...prevKeys, i]);
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <></>
          )}
        </Swiper>
      </div>
    </>
  );
}
