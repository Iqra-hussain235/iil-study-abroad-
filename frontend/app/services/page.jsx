"use client";

import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

export default function ServicesPage() {
  return (
    <>
      <ServicesSection
        id="services-page"
        showCta={false}
        animateOnView={false}
        className="pt-8"
      />
      <Footer />
    </>
  );
}
