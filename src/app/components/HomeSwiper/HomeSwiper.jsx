import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";

// Installed Cloudinary - if not using, run "npm uninstall @cloudinary/url-gen @cloudinary/react",
// and remove from next.config.js
// import {Cloudinary} from "@cloudinary/url-gen";

// const cld = new Cloudinary({cloud: {cloudName: 'ddsopsgpi'}});

export default function HomeSwiper({ homeImages }) {
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
      onSwiper={(swiper) => {console.log(swiper)}}
    >
      {/* Map an array of img srcs rec'd as props and return SwiperSlides */}
      {homeImages
        ? homeImages.map((img, i) => (
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
        : <></>}
    </Swiper>
  );
}
