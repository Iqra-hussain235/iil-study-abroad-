import TopImageCarousel from "@/components/TopImageCarousel";
import Hero from "@/components/Hero";
import FlagVideoBackground from "@/components/FlagVideoBackground";
import Services from "@/components/Services";
import DreamDestinations from "@/components/DreamDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative max-h-[820px] overflow-hidden bg-white">
        <FlagVideoBackground />
        <div className="relative z-10">
          <TopImageCarousel />
          <Hero />
        </div>
      </div>
      <Services />
      <DreamDestinations />
      <WhyChooseUs />
      <GoogleReviews />
      <Footer />
    </>
  );
}
