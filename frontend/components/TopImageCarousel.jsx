"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const cards = [
  { image: "/18_image.png" },
  { image: "/images/img2.jpeg" },
  { image: "/images/img5.jpeg" },
  { image: "/images/img6.jpeg" },
  { image: "/class.jpeg" },
];

const AUTOPLAY_DELAY = 2800;

export default function TopImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const goTo = (i) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(i);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-3">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Autoplay, Navigation, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={1.15}
          spaceBetween={28}
          grabCursor={true}
          navigation
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 32, centeredSlides: false },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          style={{
            "--swiper-navigation-color": "#0f172a",
            "--swiper-navigation-size": "20px",
          }}
          className="top-carousel !py-6"
        >
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            return (
              <SwiperSlide key={i}>
                <motion.div
                  animate={{ scale: isActive ? 1.04 : 0.96 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative mx-auto w-full max-w-[300px]"
                >
                  {/* Subtle ambient light shadow */}
                  <div
                    className="absolute -inset-2 rounded-[1.8rem] bg-gradient-to-tr from-blue-200/50 via-sky-200/40 to-indigo-200/50 blur-xl transition-opacity duration-700"
                    style={{ opacity: isActive ? 0.8 : 0.15 }}
                  />

                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border-2 bg-white transition-all duration-700 shadow-md"
                    style={{
                      borderColor: isActive ? "#0F4C81" : "#e2e8f0",
                      boxShadow: isActive
                        ? "0 14px 30px -8px rgba(15,76,129,0.25)"
                        : "0 4px 14px rgba(0,0,0,0.06)",
                    }}
                  >
                    <img
                      src={card.image}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-slate-900/5" />
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Progress bar */}
        <div className="mx-auto mt-5 flex max-w-2xl gap-1.5 px-4">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-slate-200"
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === activeIndex && (
                <motion.div
                  key={activeIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#0F4C81]"
                />
              )}
              {i < activeIndex && (
                <div className="absolute inset-0 rounded-full bg-[#0F4C81]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
