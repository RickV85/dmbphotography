"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import "./GallerySwiper.css"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GallerySwiper({ images }) {
  const [galleryImages, setGalleryImages] = useState(undefined);

  useEffect(() => {
    const updateViewport = () => {
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

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      className="mySwiper"
      navigation={true}
      pagination={true}
      // This fixed issue with very small overlap to next slide
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
              // Dims come from gallery page css
              // Width currently 85vw, height 100vh - 135px
              width={window.innerWidth * 0.85}
              height={window.innerHeight - 135}
              priority={img.priority ? img.priority : undefined}
              loading={img.lazy ? img.lazy : undefined}
              src={img.src}
              alt={img.alt}
            />
          </SwiperSlide>
        ))
      ) : (
        <></>
      )}
    </Swiper>
  );
}
