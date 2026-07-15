import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";

const banners = [banner1, banner2];

function HeroCarousel() {
  return (
    <div className="w-full px-4 mt-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[180px] md:h-[230px] object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;