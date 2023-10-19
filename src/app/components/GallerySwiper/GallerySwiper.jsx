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
import { throttle } from "lodash";

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

      createHandleResizeMobileRes(
        width,
        height,
        setMobileRes,
        setGalleryImages,
        images.vert,
        images.horiz
      );
    };

    const throttledResize = throttle(handleResizeMobileRes, 100);

    throttledResize();

    window.addEventListener("resize", throttledResize);
    window.addEventListener("orientationchange", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
      window.removeEventListener("orientationchange", throttledResize);
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
    let lastOuterWidth = window.outerWidth;
    let lastOuterHeight = window.outerHeight;

    const autoScrollMobileHoriz = () => {
      setTimeout(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        console.log("FIRED", vw, vh);

        if (vw < 950 && vw > vh) {
          const gallerySwiperDiv = document.querySelector(
            ".gallery_gallery-swiper__YzmVA"
          );
          if (gallerySwiperDiv) {
            const rect = gallerySwiperDiv.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top;
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }
      }, 750);
    };

    const throttledAutoScroll = throttle(autoScrollMobileHoriz, 1000);

    const handleResize = () => {
      const currentOuterWidth = window.outerWidth;
      const currentOuterHeight = window.outerHeight;

      if (currentOuterWidth !== lastOuterWidth || currentOuterHeight !== lastOuterHeight) {
        throttledAutoScroll();
        lastOuterWidth = currentOuterWidth;
        lastOuterHeight = currentOuterHeight;
      }
    };

    throttledAutoScroll();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
