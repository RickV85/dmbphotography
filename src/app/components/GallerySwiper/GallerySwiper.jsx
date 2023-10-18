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
  const layoutRef = useRef(null);
  const galleryRef = useRef(null);

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

  // This detects a orientation change on a mobile device (vw < 950px
  //  && landscape view) then fires an auto scroll to top of the gallery.
  // Query selection based on class names rendered on DOM from modules.
  useEffect(() => {
    const autoScrollMobileHoriz = () => {
      const vw = window.innerWidth;
      const horizDeviceOrientation =
        window.screen.orientation.type === "landscape-primary";
      if (vw < 950 && horizDeviceOrientation) {
        setTimeout(() => {
          const gallerySwiperDiv = document.querySelector(".gallery_gallery-swiper__YzmVA");
          if (gallerySwiperDiv) {
            const rect = gallerySwiperDiv.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }, 750);
      }
    };
  
    autoScrollMobileHoriz();
  
    window.addEventListener("orientationchange", autoScrollMobileHoriz);
  
    return () => {
      window.removeEventListener("orientationchange", autoScrollMobileHoriz);
    };
  }, []);  

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          console.log(swiper);
        }}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 1) {
            swiper.params.lazyPreloadPrevNext = 2;
          }
        }}
        lazyPreloadPrevNext={0}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
        navigation={true}
        pagination={true}
        spaceBetween={50}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        loop={true}
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
