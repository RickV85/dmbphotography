import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";

// Installed Cloudinary - if not using, run "npm uninstall @cloudinary/url-gen @cloudinary/react",
// and remove from next.config.js
// import {Cloudinary} from "@cloudinary/url-gen";

// const cld = new Cloudinary({cloud: {cloudName: 'ddsopsgpi'}});

export default function HomeSwiper() {
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
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image width={810} height={1440} priority="true" src="/images/vertical/florissanthornbek_916.webp" alt="starry night sky" />
      </SwiperSlide>
      <SwiperSlide>
        <Image width={810} height={1440} priority="true" src="/images/vertical/christy_bcpoint1_916.webp" alt="patio with mountain view" />
      </SwiperSlide>
      <SwiperSlide>
        <Image width={810} height={1440} loading="lazy" src="/images/vertical/4014_916.webp" alt="steam train engine in field" />
      </SwiperSlide>
      <SwiperSlide>
        <Image width={810} height={1440} loading="lazy" src="/images/vertical/kotor 916.webp" alt="boat on waterway in front of a mountain" />
      </SwiperSlide>
      <SwiperSlide>
        <Image width={810} height={1440} loading="lazy" src="/images/vertical/Indyplaza 916.webp" alt="elevator shaft in an elegant building" />
      </SwiperSlide>
      <SwiperSlide>
        <Image width={810} height={1440} loading="lazy" src="/images/vertical/edison7tvfinal_916.webp" alt="living room" />
      </SwiperSlide>
    </Swiper>
  );
}
