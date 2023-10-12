"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./GallerySwiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GallerySwiper({ images }) {
  const [galleryImages, setGalleryImages] = useState(undefined);
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
      const isMobile = width <= 750;

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
  }, [galleryImages]);

  useEffect(() => {
    // Starts swiper autoplay once the first three images are loaded
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
        setGalleryImages(images.horiz);
      } else {
        setGalleryImages(images.vert);
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

  useEffect(() => {
    const vw = window.innerWidth;
    if (initialImgsLoaded && vw < 950) {
      setTimeout(() => {
        const layout = document.querySelector(".layout_main__ElgIk");
        const gallerySwiperDiv = document.querySelector(
          ".gallery_gallery-swiper__YzmVA"
        );
        if (gallerySwiperDiv && layout) {
          console.log("mobile horiz scroll fired");
          const rect = gallerySwiperDiv.getBoundingClientRect();
          layout.scrollTo({
            top: rect.top,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, [initialImgsLoaded, mobileRes]);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          console.log(swiper);
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
        navigation={true}
        pagination={true}
        spaceBetween={50}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        lazyPreloadPrevNext={3}
        loop={true}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
      >
        {galleryImages ? (
          galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                fill={true}
                priority={i <= 1 ? true : false}
                quality={mobileRes ? 20 : 85}
                src={img.src}
                alt={img.alt}
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
