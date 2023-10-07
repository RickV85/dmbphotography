"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import "./GallerySwiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "./Loading";

export default function GallerySwiper({ images }) {
  const [galleryImages, setGalleryImages] = useState(undefined);
  const [mobileRes, setMobileRes] = useState(true);
  const loadedImgKeys = useRef([]);
  // const isInitialImgLoaded = useRef(false);

  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth > 550) {
        console.log("Desktop resolution");
        setMobileRes(false);
      } else if (window.innerWidth < 550 && window.screen.orientation.type === "portrait-primary") {
        console.log("Mobile resolution");
        setMobileRes(true);
      }

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

    updateViewport();

    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, [images]);

  // useEffect(() => {
  //   if (loadedImgKeys.current.length && loadedImgKeys.current.includes(0)) {
  //     isInitialImageLoaded.current = true;
  //     console.log("true");
  //   }
  // }, [galleryImages, loadedImgKeys]);

  return (
    <>
      <Swiper
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
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
      >
        {galleryImages ? (
          galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                fill={true}
                priority={true}
                quality={mobileRes ? 25 : 75}
                src={img.src}
                alt={img.alt}
                // onLoadingComplete={() => {
                //   loadedImgKeys.current.push(i);
                //   console.log(loadedImgKeys.current);
                // }}
              />
            </SwiperSlide>
          ))
        ) : (
          <></>
        )}
      </Swiper>
    </>
  );
}
