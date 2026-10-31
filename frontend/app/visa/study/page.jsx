"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Globe, Award, ArrowRight, CheckCircle,
  Plane, Heart, Shield, Camera, Compass, Star, Clock, MessageCircle,
  GraduationCap, BookOpen, Users, ChevronDown, ChevronUp, X, Menu,
  Sparkles, Target, Image as ImageIcon, ChevronLeft, ChevronRight,
  Send, FileText
} from "lucide-react";
import { submitVisaEnquiry } from "@/services/visaEnquiry";

/* ─── Social SVG Icons ─── */
const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─── Country Data (Simplified - no counts, no tags) ─── */
const countries = [
  { name: "Australia", code: "au", route: "/visa/study/australia" },
  { name: "Canada", code: "ca", route: "/visa/study/canada" },
  { name: "UK", code: "gb", route: "/visa/study/united-kingdom" },
  { name: "USA", code: "us", route: "/visa/study/usa" },
  { name: "Germany", code: "de", route: "/visa/study/germany" },
  { name: "France", code: "fr", route: "/visa/study/france" },
  { name: "Ireland", code: "ie", route: "/visa/study/ireland" },
  { name: "Singapore", code: "sg", route: "/visa/study/singapore" },
  { name: "Italy", code: "it", route: "/visa/study/italy" },
  { name: "Malta", code: "mt", route: "/visa/study/malta" },
  { name: "Poland", code: "pl", route: "/visa/study/poland" },
  { name: "Spain", code: "es", route: "/visa/study/spain" },
  { name: "Switzerland", code: "ch", route: "/visa/study/switzerland" },
  { name: "Netherlands", code: "nl", route: "/visa/study/netherlands" },
  { name: "Cyprus", code: "cy", route: "/visa/study/cyprus" },
  { name: "Hungary", code: "hu", route: "/visa/study/hungary" },
  { name: "Czech Republic", code: "cz", route: "/visa/study/czech-republic" },
  { name: "Lithuania", code: "lt", route: "/visa/study/lithuania" },
  { name: "Latvia", code: "lv", route: "/visa/study/latvia" },
];

/* ─── Visa Services (Simplified colors) ─── */
const visaServices = [
  { icon: GraduationCap, title: "Study Visa", desc: "Expert guidance for student visas in top destinations worldwide" },
  { icon: Plane, title: "Visitor Visa", desc: "Tourist and visitor visa assistance for all major countries" },
  { icon: Shield, title: "Work Visa", desc: "Professional work permit and employment visa services" },
  { icon: Heart, title: "Spouse Visa", desc: "Family reunification and dependent visa processing" },
  { icon: Users, title: "Dependent Visa", desc: "Complete support for dependent and family member visas" },
  { icon: Globe, title: "Permanent Residency", desc: "PR pathway planning and permanent settlement visas" },
  { icon: Compass, title: "Tour Visa", desc: "Holiday and sightseeing visa for global travelers" },
];

/* ─── Accordion Data (SAFE CONTENT - no big claims) ─── */
const accordionData = [
  { 
    title: "Student Success Stories", 
    content: "IIL has helped numerous students achieve their dreams of studying abroad. Our dedicated counselors provide end-to-end support from university selection to visa guidance, ensuring a smooth journey for every applicant." 
  },
  { 
    title: "University Partnerships", 
    content: "We maintain connections with universities across multiple countries. These partnerships help students access priority application processing and explore scholarship opportunities available to international students." 
  },
  { 
    title: "Expert Visa Guidance", 
    content: "Our team of experienced visa consultants handles documentation, interview preparation, and follow-up with embassies. We guide students through each step of the visa application process with professional care." 
  },
];

/* ─── Gallery Images ─── */
const galleryImages = [
  { src: "/image section(study visa).png", alt: "Student Success", caption: "Student Success" },
  { src: "/(study visa)image section.png", alt: "Campus Life", caption: "Campus Life" },
];

/* ─── Scroll Animation Hook ─── */
function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s` }}>
      {children}
    </div>
  );
}

const PHONE_NUMBER = "+91-8630048365";
const WHATSAPP_NUMBER = "918630048365";
const EMAIL = "Contact@iilstudyabroad.com";
const ADDRESS = "Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India";

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function StudyVisaPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(-1); // ← DEFAULT CLOSED
  const [stickyHeader, setStickyHeader] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ─── FORM STATES ───
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => setStickyHeader(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); }
  };

  const openLightbox = (index) => { setLightboxIndex(index); setLightboxOpen(true); };
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // ─── FORM HANDLERS ───
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [formErrors]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }
    if (!formData.country) errors.country = "Please select a country";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!validateForm()) return;
      setLoading(true);
      try {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          country: formData.country,
          message: formData.message.trim(),
          visaType: "Study Visa",
          page: "Study Visa Main",
        };
        const res = await submitVisaEnquiry(payload);
        if (!res.ok) throw new Error(res.message || "Failed to submit");
        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", country: "", message: "" });
        setFormErrors({});
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again or contact us on WhatsApp.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const closePopup = useCallback(() => setShowPopup(false), []);

  return (
    <>
      <Head>
        <title>Study Visa | International Institute of Language</title>
        <meta name="description" content="Expert study visa consultants for Australia, Canada, UK, USA, Germany, France and more." />
      </Head>

      {/* ═══ SUCCESS POPUP ═══ */}
      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={closePopup}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePopup} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a href={whatsappLink("Hi, I just submitted an enquiry for Study Visa. Please assist me further.")} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button onClick={closePopup} className="flex-1 bg-blue-800 text-white px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ LIGHTBOX ═══ */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ChevronLeft className="w-8 h-8" /></button>
          <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].alt} className="max-w-full max-h-[75vh] object-contain rounded-lg" onError={(e) => { e.target.style.display = "none"; }} />
            <p className="text-white text-center mt-4 text-lg font-semibold">{galleryImages[lightboxIndex].caption}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><ChevronRight className="w-8 h-8" /></button>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><X className="w-6 h-6" /></button>
        </div>
      )}

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a href={whatsappLink("Hi, I\'m interested in Study Visa. Please share more information.")} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
        title="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
        <span className="absolute right-16 bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat on WhatsApp</span>
      </a>

      {/* ═══ TOP BAR ═══
      <div className="bg-blue-950 text-blue-200 py-2.5 px-4 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-blue-300"><Clock className="w-4 h-4" />India UTC +05:30</span>
          <div className="h-4 w-px bg-blue-800 hidden sm:block" />
          <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="w-4 h-4" />{PHONE_NUMBER}</a>
          <div className="h-4 w-px bg-blue-800 hidden sm:block" />
          <a href={whatsappLink("Hi, I\'m interested in Study Visa.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors"><WhatsAppIcon size={14} />{PHONE_NUMBER}</a>
        </div>
      </div> */}

      {/* ═══ HEADER ═══ */}
      {/* <header className={`${stickyHeader ? "fixed top-0 left-0 right-0 shadow-xl z-40" : "relative"} bg-white border-b border-gray-100 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
              <img src="/IIL-logo.png" alt="International Institute of Languages & Study Abroad" className="h-14 w-auto" />
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">International Institute of Languages</h1>
                <p className="text-sm text-gray-600 font-semibold">& Study Abroad</p>
              </div>
            </button> */}

            {/* <nav className="hidden lg:flex items-center gap-1">
              <button onClick={() => scrollToSection("about")} className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all uppercase tracking-wide">About</button>
              <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all uppercase tracking-wide">Visas</button>
              <button onClick={() => scrollToSection("gallery")} className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all uppercase tracking-wide">Events</button>
              <button onClick={() => scrollToSection("enquiry")} className="px-4 py-2 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-all uppercase tracking-wide">Enquire Now</button>
            </nav> */}

            {/* <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <button onClick={() => scrollToSection("about")} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-all">About</button>
              <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-all">Visas</button>
              <button onClick={() => scrollToSection("gallery")} className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-all">Events</button>
              <button onClick={() => scrollToSection("enquiry")} className="block w-full text-left px-4 py-3 text-sm font-bold text-white bg-blue-800 rounded-lg transition-all">Enquire Now</button>
            </div>
          </div>
        )}
      </header> */}

      {/* ═══ HERO SECTION — DARK BLUE THEME ═══ */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />Professional Immigration Experts
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Make Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Future</span> With Our Experts
              </h2>
              <p className="text-lg text-blue-300 mb-8 leading-relaxed">
                Planning to study abroad? IIL provides comprehensive study visa services for the UK, USA, Canada, Australia, Germany, France, Europe and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection("enquiry")} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                  <Send className="w-5 h-5" />Enquire Now
                </button>
                <a href={`tel:${PHONE_NUMBER}`} className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all flex items-center gap-2">
                  <Phone className="w-5 h-5" />Call Now
                </a>
                <a href={whatsappLink("Hi, I\'m interested in Study Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                  <WhatsAppIcon size={20} />WhatsApp
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-700/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-blue-900/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/study-banner.png" alt="Study Abroad" className="w-full h-auto" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center text-white/60 bg-blue-900/50">
                    <BookOpen className="w-16 h-16 mb-4" /><p className="text-lg font-semibold">Add study-banner.png</p><p className="text-sm">to public folder</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <div className="border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-blue-300">Popular:</span>
              {["Australia", "Canada", "UK", "USA", "Germany", "France"].map((country) => (
                <button key={country} onClick={() => scrollToSection("countries")} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-blue-200 transition-all border border-white/10 hover:border-white/30">{country}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COUNTRIES SECTION (Simplified - no counts, no tags) ═══ */}
      <section id="countries" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              <Globe className="w-4 h-4" />Study Destinations
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Countries We Serve For <span className="text-blue-800">Study Visa</span></h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Click on any country to explore detailed visa information and requirements.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {countries.map((country) => (
                <Link key={country.name} href={country.route} className="group bg-white rounded-2xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center cursor-pointer hover:-translate-y-1">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-gray-100 group-hover:border-blue-300 mx-auto">
                    <img src={`https://flagcdn.com/w160/${country.code}.png`} alt={`${country.name} flag`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm group-hover:text-blue-800 transition-colors">{country.name}</h3>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ VISA SERVICES SECTION ═══ */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />Our Services
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-blue-800">Visa Services</span></h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Comprehensive visa solutions for all your immigration needs</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visaServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.08}>
                <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-left h-full hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                    Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 to-blue-400/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] border border-gray-100">
                  <img src="/about us visa.png" alt="About IIL" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center text-gray-400 bg-slate-50">
                    <Users className="w-16 h-16 mb-4" /><p className="text-lg font-semibold">Add about us visa.png</p><p className="text-sm">to public folder</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">9+ Years</div>
                      <div className="text-xs text-gray-500">Of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                <Target className="w-4 h-4" />About Us
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About <span className="text-blue-800">IIL</span></h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Study Visa Experts to Empowering Your Dreams. International Institute of Language provides study visas for all countries worldwide with professional guidance.
              </p>

              <div className="space-y-3">
                {accordionData.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors bg-white">
                    <button onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)} className={`w-full flex items-center justify-between px-5 py-4 text-left font-semibold transition-all ${activeAccordion === index ? "bg-blue-50 text-blue-900" : "bg-white text-gray-700 hover:bg-blue-50/50"}`}>
                      <span className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${activeAccordion === index ? "bg-blue-900 text-white shadow-lg" : "bg-blue-100 text-blue-600"}`}>
                          {index === 0 ? <Award className="w-4 h-4" /> : index === 1 ? <Globe className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        </div>
                        {item.title}
                      </span>
                      {activeAccordion === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: activeAccordion === index ? "200px" : "0" }}>
                      <div className="px-5 py-4 text-gray-600 text-sm leading-relaxed bg-blue-50/30">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══ ENQUIRY FORM SECTION ═══ */}
      <section id="enquiry" className="py-20 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-blue-200 text-sm font-semibold mb-4">
              <FileText className="w-4 h-4" />Get In Touch
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Apply For <span className="text-blue-300">Study Visa</span></h2>
            <p className="text-lg text-blue-300 max-w-2xl mx-auto">Fill out the form and our team will reach out to guide you through the entire process.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="grid lg:grid-cols-2">
                {/* Left Sidebar */}
                <div className="bg-blue-900 p-8 lg:p-12 text-white">
                  <h3 className="text-2xl font-bold mb-3">Contact Us</h3>
                  <p className="text-blue-200 mb-8 text-sm leading-relaxed">
                    Have questions about studying abroad? Our team is here to help you with every step.
                  </p>
                  <div className="space-y-5">
                    <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                      <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Call Us</p>
                        <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                      </div>
                    </a>
                    <a href={whatsappLink("Hi, I\'m interested in Study Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                      <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">WhatsApp Us</p>
                        <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                      </div>
                    </a>
                    <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                      <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Email Us</p>
                        <p className="font-semibold text-sm">{EMAIL}</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-300">Visit Us</p>
                        <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 mb-5">
                      <Award className="w-7 h-7 text-yellow-400 shrink-0" />
                      <div>
                        <p className="font-bold">9+ Years Experience</p>
                        <p className="text-xs text-blue-300">Guiding students on their study abroad journey</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="https://www.instagram.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                        <InstagramIcon size={18} />
                      </a>
                      <a href="https://www.facebook.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                        <FacebookIcon size={18} />
                      </a>
                      <a href="https://www.linkedin.com/company/iilstudyabroad/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                        <LinkedinIcon size={18} />
                      </a>
                      <a href="https://youtube.com/@iil.studyabroad" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                        <YoutubeIcon size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Form */}
                <div className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input id="name" name="name" type="text" required autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <input id="email" name="email" type="email" required autoComplete="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                      <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Country <span className="text-red-500">*</span></label>
                      <select id="country" name="country" required value={formData.country} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.country ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-lg outline-none transition-all text-gray-900`}>
                        <option value="">Select country</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea id="message" name="message" rows={3} autoComplete="off" placeholder="Tell us about your study plans..." value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-800 text-white py-4 rounded-lg font-semibold hover:bg-blue-900 active:bg-blue-950 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <>Submit Enquiry <Send className="w-5 h-5" /></>
                      )}
                    </button>
                    <a href={whatsappLink("Hi, I\'m interested in Study Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <section id="gallery" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              <ImageIcon className="w-4 h-4" />Gallery
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-blue-800">Events & Gallery</span></h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Glimpses of our student success stories and memorable moments</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {galleryImages.map((img, index) => (
                <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all" onClick={() => openLightbox(index)}>
                  <div className="aspect-video bg-gray-200">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{img.caption}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="text-center mt-8">
            <button onClick={() => scrollToSection("countries")} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all">
              Explore Study Destinations <ArrowRight className="w-4 h-4" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FOOTER — DARK BLUE ═══ */}
      <footer className="bg-blue-950 text-blue-300 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/IIL-logo.png" alt="International Institute of Languages & Study Abroad" className="h-14 w-auto" />
                <div>
                  <h3 className="text-lg font-bold text-white">International Institute of Languages</h3>
                  <p className="text-sm text-blue-400 font-semibold">& Study Abroad</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-blue-400">Your trusted partner for study abroad dreams. Years of excellence in immigration and visa consulting services.</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-blue-400 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-300" />
                  <span>{ADDRESS}</span>
                </p>
                <p className="text-sm text-blue-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-blue-300" />
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
                </p>
                <p className="text-sm text-blue-400 flex items-center gap-2">
                  <WhatsAppIcon size={14} />
                  <a href={whatsappLink("Hi, I\'m interested in Study Visa.")} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">{PHONE_NUMBER}</a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-blue-700 transition-colors"><FacebookIcon size={16} /></a>
                <a href="https://twitter.com/iilstudyabroad" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-blue-700 transition-colors"><TwitterIcon size={16} /></a>
                <a href="https://www.instagram.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-pink-600 transition-colors"><InstagramIcon size={16} /></a>
                <a href="https://youtube.com/@iil.studyabroad" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-red-600 transition-colors"><YoutubeIcon size={16} /></a>
                <a href="https://www.linkedin.com/company/iilstudyabroad/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-blue-700 transition-colors"><LinkedinIcon size={16} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Important Links</h4>
              <ul className="space-y-2.5">
                {["About Us", "Contact Us", "Career", "Our Branches", "FAQ\'s", "Testimonials", "Terms & Conditions"].map((link) => (
                  <li key={link}><span className="text-sm text-blue-400 hover:text-white transition-colors cursor-default">{link}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Visa</h4>
              <ul className="space-y-2.5">
                {["Study Visa", "Visitor Visa", "Work Visa", "Dependent Visa", "Spouse Visa", "Permanent Residency", "Tour Visa"].map((link) => (
                  <li key={link}><span className="text-sm text-blue-400 hover:text-white transition-colors cursor-default">{link}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Coaching</h4>
              <ul className="space-y-2.5">
                {["About Our Courses", "Inhouse Courses", "Online Courses", "Practice Pack"].map((link) => (
                  <li key={link}><span className="text-sm text-blue-400 hover:text-white transition-colors cursor-default">{link}</span></li>
                ))}
              </ul>
              <h4 className="text-white font-bold mt-6 mb-4 uppercase text-sm tracking-wider">Resources</h4>
              <ul className="space-y-2.5">
                {["Articles", "Test Prep Material", "English Assessment", "CRS Calculator"].map((link) => (
                  <li key={link}><span className="text-sm text-blue-400 hover:text-white transition-colors cursor-default">{link}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-blue-500">&copy; 2026 International Institute of Language. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}