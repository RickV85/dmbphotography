"use client"

import Image from "next/image";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";

// Installed Cloudinary - if not using, run "npm uninstall @cloudinary/url-gen @cloudinary/react",
// and remove from next.config.js
// import {Cloudinary} from "@cloudinary/url-gen";

// const cld = new Cloudinary({cloud: {cloudName: 'ddsopsgpi'}});

// This might work for gallery sliders too, if so rename SwiperGallery
// and rename state
export default function HomeSwiper({ images }) {
  const [homeImages, setHomeImages] = useState(null);

  useEffect(() => {
    const updateViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);

      if (vw > vh) {
        setHomeImages(images[0]);
      } else {
        setHomeImages(images[1]);
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
      {homeImages ? (
        homeImages.map((img, i) => (
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
