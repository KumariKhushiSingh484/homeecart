import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { getBanners } from "../services/bannerService";

function HeroCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function loadBanners() {
      try {
        const bannerList = await getBanners();

        setBanners(
          bannerList.filter(
            (banner) => banner.isActive
          )
        );
      } catch (error) {
        console.error(
          "Failed to load banners:",
          error
        );
      }
    }

    loadBanners();
  }, []);

  if (banners.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-4 w-full px-4"
      aria-label="Promotional Banners"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        loop={banners.length > 1}
        autoplay={
          banners.length > 1
            ? {
                delay: 4000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={{
          clickable: true,
        }}
        className="overflow-hidden rounded-2xl shadow-lg"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.title || "Promotional Banner"}
              loading="lazy"
              draggable={false}
              className="
                h-[140px]
                w-full
                rounded-2xl
                object-cover
                sm:h-[180px]
                md:h-[230px]
                lg:h-[260px]
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;