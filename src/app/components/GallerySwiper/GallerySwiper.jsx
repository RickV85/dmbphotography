"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./GallerySwiper.css";
import { createHandleResizeMobileRes } from "@/app/utils/utils";

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
    const handleResizeMobileRes = () =>
      createHandleResizeMobileRes(
        setMobileRes,
        setGalleryImages,
        images.vert,
        images.horiz
      );

    handleResizeMobileRes();

    window.addEventListener("resize", handleResizeMobileRes);
    window.addEventListener("orientation", handleResizeMobileRes);

    return () => {
      window.removeEventListener("resize", handleResizeMobileRes);
      window.removeEventListener("orientation", handleResizeMobileRes);
    };
  }, [images.vert, images.horiz]);

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
    const updateVp = () => {
      const vw = window.innerWidth * 0.01;
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty("--vw", `${vw}px`);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVp();

    window.addEventListener("resize", updateVp);
    window.addEventListener("orientationchange", updateVp);

    return () => {
      window.removeEventListener("resize", updateVp);
      window.removeEventListener("orientationchange", updateVp);
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
                fill
                sizes={"85vw"}
                as={"image"}
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
