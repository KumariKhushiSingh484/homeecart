import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { getBanners } from "../services/bannerService";

function HeroCarousel() {
  const [banners, setBanners] =
  useState([]);

useEffect(() => {
  async function loadBanners() {
    try {
      const bannerList =
        await getBanners();

      const activeBanners =
        bannerList.filter(
          (banner) => banner.isActive
        );

      setBanners(activeBanners);
    } catch (error) {
      console.error(error);
    }
  }

  loadBanners();
}, []);
if (!banners.length) {
  return null;
}
  return (
    <div className="w-full px-4 mt-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={banners.length > 1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
           <img
  src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-[140px] sm:h-[180px] md:h-[230px] lg:h-[260px] object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroCarousel;