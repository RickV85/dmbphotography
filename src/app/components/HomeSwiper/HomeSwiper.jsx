"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./HomeSwiper.css";
import {
  createHandleResizeMobileRes,
  resetSwiperAndLoadingState,
  startSwiperAfterImageLoad,
  createUpdateViewport,
} from "@/app/utils/utils";

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
    const handleResizeMobileRes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return createHandleResizeMobileRes(
        width,
        height,
        setMobileRes,
        setHomeImages,
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
  }, [homeImages]);

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

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 1) {
            swiper.params.lazyPreloadPrevNext = 1;
          }
        }}
        lazyPreloadPrevNext={0}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        loop={true}
      >
        {homeImages ? (
          homeImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                fill
                sizes={"100vw"}
                as={"image"}
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
