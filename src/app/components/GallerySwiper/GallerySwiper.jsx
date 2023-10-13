"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./GallerySwiper.css";
import {
  createHandleResizeMobileRes,
  resetSwiperAndLoadingState,
  startSwiperAfterImageLoad,
  createUpdateViewport,
} from "@/app/utils/utils";

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
    const handleResizeMobileRes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return createHandleResizeMobileRes(
        width,
        height,
        setMobileRes,
        setGalleryImages,
        images.vert,
        images.horiz
      );
    };

    handleResizeMobileRes();

    window.addEventListener("resize", handleResizeMobileRes);
    window.addEventListener("orientationchange", handleResizeMobileRes);

    return () => {
      window.removeEventListener("resize", handleResizeMobileRes);
      window.removeEventListener("orientationchange", handleResizeMobileRes);
    };
  }, [images.vert, images.horiz]);

  useEffect(() => {
    resetSwiperAndLoadingState(
      setInitialImgsLoaded,
      setLoadedImgKeys,
      swiperRef
    );
  }, [galleryImages]);

  useEffect(() => {
    startSwiperAfterImageLoad(
      loadedImgKeys,
      initialImgsLoaded,
      setInitialImgsLoaded,
      swiperRef
    );
  }, [loadedImgKeys, initialImgsLoaded]);

  useEffect(() => {
    const updateViewport = () => createUpdateViewport();
    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
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
