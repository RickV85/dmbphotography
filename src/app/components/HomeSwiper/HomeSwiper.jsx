import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";

export default function HomeSwiper() {
  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Autoplay]}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      loop={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="/images/vertical/florissanthornbek_916.jpeg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/vertical/christy_bcpoint1_916.jpeg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/vertical/4014_916.jpeg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/vertical/kotor 916.jpeg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/vertical/Indyplaza 916.jpeg"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/vertical/edison7tvfinal_916.jpeg"></img>
      </SwiperSlide>
    </Swiper>
  );
}
