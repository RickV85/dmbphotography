"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./HomeSwiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomeSwiper({ images }) {
  const [homeImages, setHomeImages] = useState(null);
  const [mobileRes, setMobileRes] = useState(true);
  const [loadedImgKeys, setLoadedImgKeys] = useState([]);
  const [initialImgsLoaded, setInitialImgsLoaded] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Could be updated to have multiple breakpoints and
    // make mobileRes a quality value. Maybe for tablets?
    const handleResizeMobileRes = () => {
      if (!window) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 550 && height < width;

      setMobileRes(isMobile);
    };

    handleResizeMobileRes();

    window.addEventListener("resize", handleResizeMobileRes);

    return () => window.removeEventListener("resize", handleResizeMobileRes);
  }, []);

  useEffect(() => {
    // Resets loading state when images swap from horiz
    // to vertical or vice versa. Images are reloaded
    // at times when window is resized to match sizing.
    setInitialImgsLoaded(false);
    setLoadedImgKeys([]);
    swiperRef.current.slideTo(0);
    swiperRef.current.autoplay.stop();
  }, [homeImages]);

  useEffect(() => {
    // Starts swiper autoplay once first three images are loaded
    // Can delete the last console log after build
    if (
      [0, 1].every((key) => loadedImgKeys.includes(key)) &&
      swiperRef.current
    ) {
      if (!initialImgsLoaded) {
        setInitialImgsLoaded(true);
        swiperRef.current.autoplay.start();
        console.log("initial images loaded");
      }
    }
    console.log(loadedImgKeys);
  }, [loadedImgKeys, initialImgsLoaded]);

  useEffect(() => {
    const updateVpSetImgs = () => {
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

    updateVpSetImgs();

    window.addEventListener("resize", updateVpSetImgs);
    window.addEventListener("orientationchange", updateVpSetImgs);

    return () => {
      window.removeEventListener("resize", updateVpSetImgs);
      window.removeEventListener("orientationchange", updateVpSetImgs);
    };
  }, [images]);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          console.log(swiper);
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        lazyPreloadPrevNext={1}
        loop={true}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
      >
        {homeImages ? (
          homeImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                fill
                sizes={"100vw"}
                priority={i <= 1 ? true : false}
                src={img.src}
                alt={img.alt}
                quality={mobileRes ? 20 : 85}
                onLoadingComplete={() => {
                  setLoadedImgKeys((prevKeys) => [...prevKeys, i]);
                }}
              />
              <div className="swiper-lazy-preloader" />
            </SwiperSlide>
          ))
        ) : (
          <></>
        )}
      </Swiper>
    </>
  );
}
