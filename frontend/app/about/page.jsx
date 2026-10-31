"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Globe2,
  Users,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

// ── Placeholder data — swap these out for the real content/images ──
const GALLERY_IMAGES = [
  "class1.jpeg",
  "/18_image.png",
  "/19_image.png",
  "/section image (study visa).png",
  "/certificte.jpeg",
];

const COACHING_TABS = [
  { label: "IELTS", color: "bg-blue-900" },
  { label: "PTE", color: "bg-pink-500" },
  { label: "TOEFL", color: "bg-teal-600" },
  { label: "Spoken English", color: "bg-pink-400" },
];

const FACULTY_MEMBERS = [
  {
    name: "Maaz Khan",
    designation: "Director and Expert Trainer",
    image: "/18_image.png",
  },
  {
    name: "Aaliya Roshni",
    designation: "French and Spoken English Trainer",
    image: "/24_image.png",
  },
  {
    name: "Bushra Abdullah",
    designation: "German and English Trainer",
    image: "/23_image.png",
  },
  {
    name: "Milan Kumar",
    designation: "Marketing Manager",
    image: "/images/Mr. Andhera.png",
  },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/academy/course" },
  { label: "Event", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "About Us", href: "/about" },
];

const visaLinks = [
  { label: "Study Visa", href: "/visa/study" },
  { label: "Visitor Visa", href: "/visa/visitor" },
  { label: "Work Visa", href: "/visa/work" },
  { label: "Permanent Residency", href: "/visa/pr" },
];

const socialLinks = [
  {
    url: "https://www.linkedin.com/company/iilstudyabroad/",
    Icon: FaLinkedin,
    hoverClass: "hover:bg-blue-600 hover:text-white",
  },
  {
    url: "https://www.facebook.com/iiLstudyabroad",
    Icon: FaFacebook,
    hoverClass: "hover:bg-blue-600 hover:text-white",
  },
  {
    url: "https://www.instagram.com/iil.studyabroad",
    Icon: FaInstagram,
    hoverClass: "hover:bg-gradient-to-tr hover:from-red-500 hover:to-orange-400 hover:text-white",
  },
];

const WHATSAPP_NUMBER = "918630048365";
const WHATSAPP_MESSAGE = "Hi, I'm interested in your services. Please share more information.";

// ────────────────────────────────────────────────────────────────
// FOOTER (not the default export — rendered inside AboutPage below)
// ────────────────────────────────────────────────────────────────
function Footer() {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-900 text-slate-300 border-t border-slate-800">
        <img
          src="/15_footer_background.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-[20%] left-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[5%] h-[40%] w-[40%] rounded-full bg-[#ff2f56]/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/01_logo.png"
                  alt="International Institute Of Language logo"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="text-base font-extrabold leading-tight text-white">
                  International Institute
                  <br />
                  Of Languages &amp; Study Abroad
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Empowering students to achieve their global dreams through
                quality education, language training, and expert guidance.
              </p>

              <div className="mt-5 flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.Icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLink(social.url)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 ${social.hoverClass}`}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:bg-green-500 hover:text-white"
                >
                  <FaWhatsapp size={16} />
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Quick Links
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-red-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Visa Services
              </p>
              <ul className="space-y-3">
                {visaLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-red-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Contact Us
              </p>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-blue-400" />
                  <span>Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-blue-400" />
                  <span>+91-8630048365</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="shrink-0 text-blue-400" />
                  <span>Contact@iilstudyabroad.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiClock className="shrink-0 text-blue-400" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </li>
              </ul>

              <Link
                href="/enquiry"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,47,86,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,47,86,0.4)]"
              >
                Enquire Now
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
            <p>© 2026 International Institute Of Language. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-slate-300">Privacy Policy</span>
              <span className="cursor-pointer hover:text-slate-300">Terms &amp; Conditions</span>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Glowing floating WhatsApp button */}
      <button
        type="button"
        onClick={openWhatsApp}
        className="whatsapp-glow fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl transition-transform duration-300 hover:scale-110"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} className="text-white" />
      </button>

      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 0 20px rgba(37, 211, 102, 0.5);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0), 0 0 25px rgba(37, 211, 102, 0.6);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 0 20px rgba(37, 211, 102, 0.5);
          }
        }
        .whatsapp-glow {
          animation: whatsapp-pulse 2.2s infinite;
        }
      `}</style>
    </>
  );
}

// ────────────────────────────────────────────────────────────────
// ABOUT PAGE (default export)
// ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((s) => (s + 1) % GALLERY_IMAGES.length);
  const prevSlide = () =>
    setSlide((s) => (s - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <div className="w-full bg-white text-slate-800">
      {/* ────────────────── HERO ────────────────── */}
      <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden">
        {/* Replace this img src with the real hero photo */}
        <img
          src="/study-banner.png"
          alt="International Institute Of Languages & Study Abroad"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1f]/80 via-[#0a0f1f]/60 to-[#0a0f1f]/90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg overflow-hidden">
            <img src="/logo.jpeg" alt="IIL Logo" className="h-full w-full object-contain p-2" />
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            International Institute Of Languages
            <br className="hidden sm:block" /> &amp; Study Abroad
          </h1>
          <p className="mt-4 max-w-xl text-sm text-blue-100 sm:text-base">
            Empowering students to achieve their global dreams through quality
            education, language training, and expert guidance.
          </p>
        </div>
      </section>

      {/* ────────────────── BEST IMMIGRATION & VISA CONSULTANTS ────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl">
              Best Immigration And Visa Consultants
            </h2>
            <p className="mt-5 text-slate-600">
              There are lots of students in India who dream of studying,
              working or living abroad. But it is not as easy as it seems. It
              requires hard work and proper guidance. Today, it is a challenge
              for students to search for a trustworthy study visa consultant.
            </p>
            <p className="mt-4 text-slate-600">
              Here at International Institute Of Languages &amp; Study Abroad
              (IIL), we promise to provide accurate advice about study visas,
              work permits, visitor visas, and PR related to your profile. IIL
              is a registered and certified immigration consultancy
              established in Moradabad.
            </p>
            <p className="mt-4 font-semibold text-[#0b1c3d]">
              We have tie-ups with highly reputed professionals, colleges, and
              universities in Canada, Australia, New Zealand, the USA/UK,
              Portugal, Ireland, Poland, Singapore, Cyprus, Sweden, Germany,
              France, and many more countries.
            </p>
          </div>
          <img
            src="/images/consulting.webp"
            alt="Consultation"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* ────────────────── PHOTO CAROUSEL ────────────────── */}
      <section className="bg-[#050b18] px-6 py-16 md:px-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
          Moments From IIL
        </h2>
        <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            aria-label="Previous photo"
            className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex w-full max-w-3xl gap-4 overflow-hidden">
            {[0, 1, 2].map((offset) => {
              const idx = (slide + offset) % GALLERY_IMAGES.length;
              return (
                <img
                  key={idx}
                  src={GALLERY_IMAGES[idx]}
                  alt={`Gallery ${idx + 1}`}
                  className={`h-48 flex-1 rounded-xl object-cover shadow-lg transition sm:h-56 ${
                    offset === 1 ? "scale-105 opacity-100" : "hidden opacity-60 sm:block"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next photo"
            className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-6 bg-blue-400" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ────────────────── WHY CHOOSE IIL ────────────────── */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[#0b2545] to-[#123a6b] px-6 py-12 sm:px-12">
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            Why Choose IIL?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: CheckCircle2,
                title: "Certified Consultants",
                desc: "Registered and certified immigration consultancy with proven track record",
              },
              {
                icon: Globe2,
                title: "Global Network",
                desc: "Partnerships with top universities across 20+ countries worldwide",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Dedicated counsellors with years of field experience",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto mb-4 h-9 w-9 text-pink-400" />
                <h3 className="mb-2 font-bold text-white">{title}</h3>
                <p className="text-sm text-blue-100">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── COACHING PROGRAMS ────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-[#0b1c3d]">
          Our Language Coaching Programs
        </h2>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              {COACHING_TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition ${tab.color} ${
                    activeTab === i ? "ring-2 ring-offset-2 ring-blue-400" : "opacity-80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <p className="text-slate-600">
              IIL has centres in Moradabad to prepare you for the language
              ability tests. Our IELTS, PTE, and spoken English trainers
              possess incomparable expertise and teaching skills. We have a
              team of IDP and British Council-certified faculty.
            </p>
            <p className="mt-4 text-slate-600">
              We have designed the curriculum and followed the teaching
              techniques that are suitable for every student. We offer online
              and offline coaching, allowing them to get the desired band
              score.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Extra grammar improvement classes",
                "Multimedia classes with modern facilities",
                "Up-to-date library of study material",
                "Weekly mock tests for practice analysis",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <Star size={16} className="shrink-0 text-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/class2.jpeg"
            alt="Coaching class"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* ────────────────── FACULTY & TRAINERS ────────────────── */}
      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <h2 className="mb-3 text-center text-3xl font-extrabold text-[#0b1c3d]">
          Meet Our Faculty &amp; Trainers
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-slate-600">
          Certified, experienced trainers dedicated to helping you reach your
          target score and your goals abroad.
        </p>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-2xl bg-white text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-[#0b1c3d]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-pink-500">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────── FLAGS VIDEO + QUOTE ────────────────── */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 h-full w-full">
          <iframe
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-150 pointer-events-none"
            src="https://www.youtube-nocookie.com/embed/31s-kuyS5eM?autoplay=1&mute=1&loop=1&playlist=31s-kuyS5eM&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Flags background video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
        {/* Startup cover — hides the brief YouTube UI flash, fades out after load */}
        <div className="absolute inset-0 z-[5] animate-[fadeOutCover_2.5s_ease-out_forwards] bg-black" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <p className="max-w-2xl text-2xl font-bold italic text-white sm:text-3xl">
            "Your dreams don't have a border — and neither should your future."
          </p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeOutCover {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
      `}</style>

      {/* ────────────────── OUR OFFICES ────────────────── */}
      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-blue-700">
          We are Professional Experts in Immigration Visa
        </p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-[#0b1c3d]">
          Our Offices
        </h2>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-[220px_1fr]">
          <div className="overflow-hidden rounded-xl bg-[#0b2a4a]">
            <div className="bg-[#0b2a4a] px-5 py-4 font-semibold text-white">
              Select Office
            </div>
            <button className="w-full bg-[#123a6b] px-5 py-4 text-left font-medium text-white">
              Moradabad
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#0b1c3d]">
              <MapPin size={18} className="text-pink-500" /> Moradabad Office
            </h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-700" />
                Main Office, Civil Lines, Moradabad, Uttar Pradesh
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-blue-700" /> info@iilmoradabad.com
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-blue-700" /> Mon–Sat: 9:00 AM – 6:00 PM
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-blue-700" /> +91-8630048365
              </p>
            </div>
            <div className="mt-6 h-64 w-full overflow-hidden rounded-lg">
              <iframe
                title="Moradabad office map"
                className="h-full w-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=Moradabad,Uttar%20Pradesh&output=embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <Footer />
    </div>
  );
}