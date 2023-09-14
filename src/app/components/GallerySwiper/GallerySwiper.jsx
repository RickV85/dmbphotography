"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import "./GallerySwiper.css"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GallerySwiper({ images }) {
  const [galleryImages, setGalleryImages] = useState(null);

  useEffect(() => {
    const updateViewport = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

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
      {galleryImages ? (
        galleryImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              width={img.width}
              height={img.height}
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
