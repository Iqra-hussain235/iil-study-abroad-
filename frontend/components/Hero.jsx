"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slideData = [
  {
    type: "imagePair",
    title: "Meet Our Director & Expert Trainer",
    subtitle: "Guided by industry-certified IELTS trainers and academic experts.",
    description: "Our director personally oversees every student's journey — from counselling to visa success.",
    images: ["/IMG_5745.JPG.jpeg"],
    imageLabel: "Director & Expert Trainer",
    imageSubLabel: "Maaz Khan — IIL Founder",
    buttonText: "Enquiry Now",
    link: "/academy/course",
  },
  {
    type: "imagePair",
    title: "Meet Our English & German Trainer",
    subtitle: "Certified in English Speaking and German Language teaching.",
    description: "Our expert trainer brings hands-on expertise, personalized coaching, and proven strategies to help you achieve fluency and confidence.",
    images: ["/23_image.png"],
    imageLabel: "Expert Trainer",
    imageSubLabel: "English Speaking & German Language",
    buttonText: "Enquiry Now",
    link: "/academy/course",
  },
  {
    type: "imagePair",
    title: "Meet Our French Trainer",
    subtitle: "Learn French from a certified language expert with real-world fluency.",
    description: "Our French trainer helps students master conversational and academic French with proven teaching techniques.",
    images: ["/24_image.png"],
    imageLabel: "French Trainer",
    imageSubLabel: "Certified Language Coach",
    buttonText: "Enquiry Now",
    link: "/academy/course",
  },
  {
    type: "imagePair",
    title: "Meet Our English Trainer",
    subtitle: "Certified IELTS and spoken English coach with years of teaching experience.",
    description: "Our English trainer focuses on building confidence, fluency, and exam-ready skills for every student.",
    images: ["/24_image.png"],
    imageLabel: "English Trainer",
    imageSubLabel: "Certified IELTS Coach",
    buttonText: "Enquiry Now",
    link: "/academy/course",
  },
  {
    type: "imagePair",
    title: "Meet Our Faculty Team",
    subtitle: "A dedicated team of trainers guiding every student toward success.",
    description: "Our experienced faculty works together to deliver quality training, mentorship, and career-ready guidance to every student.",
    images: ["/19_image.png"],
    imageLabel: "Our Faculty Team",
    imageSubLabel: "Certified Trainers & Mentors",
    buttonText: "Enquiry Now",
    link: "/academy/course",
  },
  {
    type: "image",
    title: "Free Live Master Class",
    subtitle: "IELTS, PTE, TOEFL, and spoken English preparation with industry experts.",
    description: "Fast-track your band score with dynamic coaching, live practice, and detailed feedback.",
    image: "/class1.jpeg",
    buttonText: "Explore Our Courses",
    link: "/academy/course",
  },
  {
    type: "image",
    title: "Visa & Admission Support",
    subtitle: "End-to-end student visa processing and documentation support.",
    description: "Applicants receive personalized consultation, SOP drafting, and embassy-ready application management.",
    image: "/class2.jpeg",
    buttonText: "Start Your Enquiry",
    link: "/academy/course",
  },
];

function ImageFadePair({ images, title, imageLabel, imageSubLabel }) {
  const img = images[0];
  const label = imageLabel || "Director & Expert Trainer";
  const subLabel = imageSubLabel || "";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px]"
    >
      <div className="absolute -inset-2 rounded-[1.8rem] bg-blue-100/70 blur-xl" />

      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/80 bg-white">
        <div className="h-[240px] sm:h-[270px] flex items-center justify-center p-3 bg-slate-50/80">
          <img
            src={img}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        
        <div className="p-5 bg-white border-t border-slate-100">
          <div className="h-1 w-10 bg-[#0F4C81] rounded-full mb-2" />
          <p className="text-slate-900 font-bold text-base">{label}</p>
          {subLabel && (
            <p className="text-[#0F4C81] font-medium text-xs mt-1">{subLabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        autoHeight={true}
        style={{
          "--swiper-navigation-color": "#0F4C81",
          "--swiper-pagination-color": "#0F4C81",
          "--swiper-pagination-bullet-inactive-color": "#94a3b8",
          "--swiper-pagination-bullet-inactive-opacity": "0.6",
          "--swiper-navigation-size": "24px",
        }}
        className="w-full relative z-10"
      >
        {slideData.map((slide, index) => (
          <SwiperSlide
            key={index}
            data-swiper-autoplay={slide.autoplayDelay || undefined}
          >
            <div className="relative w-full flex items-center justify-center px-6 pt-5 pb-8 sm:pt-6 sm:pb-10 lg:px-24 lg:pt-6 lg:pb-10 min-h-[400px] lg:min-h-[440px]">
              <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col justify-center max-w-2xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1 pt-4 lg:pt-0"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="inline-block w-fit mx-auto lg:mx-0 bg-blue-50 border border-blue-200 text-[#0F4C81] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-sm"
                  >
                    ★ YOUR DREAM. OUR GUIDANCE. GLOBAL SUCCESS.
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.7 }}
                    className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                    className="mt-3 text-base sm:text-lg font-semibold text-slate-700"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    className="mt-5 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Link
                      href={slide.link}
                      className="group inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] rounded-full shadow-lg shadow-blue-900/15 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {slide.buttonText}
                      <svg className="w-5 h-5 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="order-1 lg:order-2 flex items-center justify-center"
                >
                  {slide.type === "imagePair" ? (
                    <ImageFadePair 
                      images={slide.images} 
                      title={slide.title} 
                      imageLabel={slide.imageLabel}
                      imageSubLabel={slide.imageSubLabel}
                    />
                  ) : (
                    <div className="relative group mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
                      <div className="absolute -inset-3 bg-gradient-to-tr from-blue-100 via-transparent to-indigo-100 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

                      <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/70 bg-white">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          priority={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center transform transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
