import TopImageCarousel from "@/components/TopImageCarousel";
import Hero from "@/components/Hero";
import FlagVideoBackground from "@/components/FlagVideoBackground";
import DreamDestinations from "@/components/DreamDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

import Marquee from "@/components/home/Marquee";
import HomeIntro from "@/components/home/HomeIntro";
import HomeExpertise from "@/components/home/HomeExpertise";
import PathFinder from "@/components/home/PathFinder";
import HomeCourses from "@/components/home/HomeCourses";
import HomeJourney from "@/components/home/HomeJourney";
import HomeAppointment from "@/components/home/HomeAppointment";
import { FaqPreview, EnquiryMap } from "@/components/home/HomeFaqContact";

const COURSE_CHIPS = [
  "Spoken English",
  "IELTS",
  "PTE",
  "OET",
  "CELPIP",
  "German",
  "French",
  "Interview Preparation",
  "Study Abroad",
  "Visa Guidance",
];

const COUNTRY_CHIPS = ["Canada", "UK", "Germany", "Australia", "USA", "France"];

// Navbar is already rendered by app/layout.tsx, so it is not repeated here.
export default function Home() {
  return (
    <>
      <div className="relative max-h-[780px] overflow-hidden">
        <FlagVideoBackground />
        <div className="relative z-10">
          <TopImageCarousel />
          <Hero />
        </div>
      </div>

      <Marquee items={COURSE_CHIPS} />
      <HomeIntro />
      <HomeExpertise />
      <PathFinder />
      <HomeCourses />
      <HomeJourney />
      <HomeAppointment />
      <DreamDestinations />
      <Marquee items={COUNTRY_CHIPS} reverse repeat={5} />
      <WhyChooseUs />
      <GoogleReviews showCards={false} />
      <FaqPreview />
      <EnquiryMap />
      <Footer />
    </>
  );
}