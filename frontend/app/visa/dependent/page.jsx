"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Globe, Award, ArrowRight, CheckCircle, ChevronRight,
  Heart, Users, Shield, Plane, MessageCircle, X, Send, Sparkles, Star, Check
} from "lucide-react";

// ═══ FLAGS ═══
function CanadaFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="20" height="80" fill="#D52B1E"/>
      <rect x="70" y="10" width="20" height="80" fill="#D52B1E"/>
      <rect x="30" y="10" width="40" height="80" fill="white"/>
      <path fill="#D52B1E" d="M50 22 L53 30 L58 28 L55 35 L60 35 L56 40 L60 42 L55 45 L58 50 L53 48 L55 55 L50 52 L45 55 L47 48 L42 50 L45 45 L40 42 L44 40 L40 35 L45 35 L42 28 L47 30 Z"/>
      <rect x="48" y="52" width="4" height="12" fill="#D52B1E"/>
    </svg>
  );
}

function AustraliaFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#00247D" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="30" height="20" fill="#00247D"/>
      <path fill="white" d="M10 10 L40 30 M40 10 L10 30" strokeWidth="4" stroke="white"/>
      <path fill="white" d="M25 10 L25 30 M10 20 L40 20" strokeWidth="6" stroke="white"/>
      <path fill="#CF142B" d="M25 10 L25 30 M10 20 L40 20" strokeWidth="3" stroke="#CF142B"/>
      <path fill="#CF142B" d="M10 10 L40 30 M40 10 L10 30" strokeWidth="2" stroke="#CF142B"/>
      <polygon fill="white" points="70,25 71.5,29 76,29 72.5,32 73.5,36.5 70,34 66.5,36.5 67.5,32 64,29 68.5,29"/>
      <polygon fill="white" points="82,35 83,38 86.5,38 83.5,40.5 84.5,44 82,42 79.5,44 80.5,40.5 77.5,38 81,38"/>
      <polygon fill="white" points="75,48 76,51 79.5,51 76.5,53.5 77.5,57 75,55 72.5,57 73.5,53.5 70.5,51 74,51"/>
      <polygon fill="white" points="62,42 63,45 66.5,45 63.5,47.5 64.5,51 62,49 59.5,51 60.5,47.5 57.5,45 61,45"/>
      <polygon fill="white" points="85,55 86,57.5 88.5,57.5 86.5,59.5 87.5,62 85,60.5 82.5,62 83.5,59.5 81.5,57.5 84,57.5"/>
      <polygon fill="white" points="55,65 56,68 59.5,68 56.5,70.5 57.5,74 55,72 52.5,74 53.5,70.5 50.5,68 54,68"/>
    </svg>
  );
}

function UKFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#00247D" stroke="#e5e7eb" strokeWidth="2"/>
      <path fill="white" d="M10 10 L90 90 M90 10 L10 90" strokeWidth="16" stroke="white"/>
      <path fill="white" d="M50 10 L50 90 M10 50 L90 50" strokeWidth="20" stroke="white"/>
      <path fill="#CF142B" d="M10 10 L90 90 M90 10 L10 90" strokeWidth="8" stroke="#CF142B"/>
      <path fill="#CF142B" d="M50 10 L50 90 M10 50 L90 50" strokeWidth="10" stroke="#CF142B"/>
    </svg>
  );
}

function USAFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="16.15" width="80" height="6.15" fill="white"/>
      <rect x="10" y="22.3" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="28.45" width="80" height="6.15" fill="white"/>
      <rect x="10" y="34.6" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="40.75" width="80" height="6.15" fill="white"/>
      <rect x="10" y="46.9" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="53.05" width="80" height="6.15" fill="white"/>
      <rect x="10" y="59.2" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="65.35" width="80" height="6.15" fill="white"/>
      <rect x="10" y="71.5" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="77.65" width="80" height="6.15" fill="white"/>
      <rect x="10" y="83.8" width="80" height="6.15" fill="#B22234"/>
      <rect x="10" y="10" width="32" height="40" fill="#3C3B6E"/>
      <g fill="white">
        <circle cx="14" cy="14" r="1.2"/><circle cx="19" cy="14" r="1.2"/><circle cx="24" cy="14" r="1.2"/><circle cx="29" cy="14" r="1.2"/><circle cx="34" cy="14" r="1.2"/>
        <circle cx="16.5" cy="18" r="1.2"/><circle cx="21.5" cy="18" r="1.2"/><circle cx="26.5" cy="18" r="1.2"/><circle cx="31.5" cy="18" r="1.2"/><circle cx="36.5" cy="18" r="1.2"/>
        <circle cx="14" cy="22" r="1.2"/><circle cx="19" cy="22" r="1.2"/><circle cx="24" cy="22" r="1.2"/><circle cx="29" cy="22" r="1.2"/><circle cx="34" cy="22" r="1.2"/>
        <circle cx="16.5" cy="26" r="1.2"/><circle cx="21.5" cy="26" r="1.2"/><circle cx="26.5" cy="26" r="1.2"/><circle cx="31.5" cy="26" r="1.2"/><circle cx="36.5" cy="26" r="1.2"/>
        <circle cx="14" cy="30" r="1.2"/><circle cx="19" cy="30" r="1.2"/><circle cx="24" cy="30" r="1.2"/><circle cx="29" cy="30" r="1.2"/><circle cx="34" cy="30" r="1.2"/>
        <circle cx="16.5" cy="34" r="1.2"/><circle cx="21.5" cy="34" r="1.2"/><circle cx="26.5" cy="34" r="1.2"/><circle cx="31.5" cy="34" r="1.2"/><circle cx="36.5" cy="34" r="1.2"/>
        <circle cx="14" cy="38" r="1.2"/><circle cx="19" cy="38" r="1.2"/><circle cx="24" cy="38" r="1.2"/><circle cx="29" cy="38" r="1.2"/><circle cx="34" cy="38" r="1.2"/>
        <circle cx="16.5" cy="42" r="1.2"/><circle cx="21.5" cy="42" r="1.2"/><circle cx="26.5" cy="42" r="1.2"/><circle cx="31.5" cy="42" r="1.2"/><circle cx="36.5" cy="42" r="1.2"/>
      </g>
    </svg>
  );
}

function NZFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#00247D" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="30" height="20" fill="#00247D"/>
      <path fill="white" d="M10 10 L40 30 M40 10 L10 30" strokeWidth="4" stroke="white"/>
      <path fill="white" d="M25 10 L25 30 M10 20 L40 20" strokeWidth="6" stroke="white"/>
      <path fill="#CF142B" d="M25 10 L25 30 M10 20 L40 20" strokeWidth="3" stroke="#CF142B"/>
      <path fill="#CF142B" d="M10 10 L40 30 M40 10 L10 30" strokeWidth="2" stroke="#CF142B"/>
      <polygon fill="white" points="70,28 71.5,32 76,32 72.5,35 73.5,39.5 70,37 66.5,39.5 67.5,35 64,32 68.5,32"/>
      <polygon fill="white" points="82,38 83,41 86.5,41 83.5,43.5 84.5,47 82,45.5 79.5,47 80.5,43.5 77.5,41 81,41"/>
      <polygon fill="white" points="75,50 76,53 79.5,53 76.5,55.5 77.5,59 75,57.5 72.5,59 73.5,55.5 70.5,53 74,53"/>
      <polygon fill="white" points="62,45 63,48 66.5,48 63.5,50.5 64.5,54 62,52.5 59.5,54 60.5,50.5 57.5,48 61,48"/>
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.934L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const countries = [
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "New Zealand", code: "NZ" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Netherlands", code: "NL" },
  { name: "Switzerland", code: "CH" },
  { name: "Austria", code: "AT" },
  { name: "Denmark", code: "DK" },
  { name: "Norway", code: "NO" },
  { name: "Finland", code: "FI" },
  { name: "Poland", code: "PL" },
  { name: "Czech Republic", code: "CZ" },
];

const countryFlags = [
  { name: "Canada", flag: CanadaFlag, href: "/visa/dependent/canada" },
  { name: "Australia", flag: AustraliaFlag, href: "/visa/dependent/australia" },
  { name: "United Kingdom", flag: UKFlag, href: "/visa/dependent/uk" },
  { name: "United States", flag: USAFlag, href: "/visa/dependent/usa" },
  { name: "New Zealand", flag: NZFlag, href: "/visa/dependent/new-zealand" },
];

const PHONE_NUMBER = "+91-8630048365";
const WHATSAPP_NUMBER = "918630048365";
const EMAIL = "Contact@iilstudyabroad.com";
const ADDRESS = "Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India";
const YEARS_EXPERIENCE = "9";

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function DependentVisaPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "", travelDate: "", message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
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
      if (!validateForm()) return;
      setLoading(true);
      try {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          country: formData.country,
          travelDate: formData.travelDate,
          message: formData.message.trim(),
          visaType: "Dependent Visa",
          page: "Dependent Main Page",
        };
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to submit");
        setShowPopup(true);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", country: "", travelDate: "", message: "" });
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

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setSubmitted(false);
  }, []);

  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [heroRef, heroVis] = useScrollReveal();
  const [countriesRef, countriesVis] = useScrollReveal();
  const [formRef, formVis] = useScrollReveal();
  const [whyRef, whyVis] = useScrollReveal();
  const [howRef, howVis] = useScrollReveal();
  const [statsRef, statsVis] = useScrollReveal();

  const whyCards = [
    { icon: Heart, title: "Family Reunification", desc: "Bring your loved ones together and build a life abroad as a family unit." },
    { icon: Users, title: "Spouse & Children", desc: "Visa support for your spouse, children, and dependent family members." },
    { icon: Shield, title: "Legal Compliance", desc: "We ensure all documentation meets embassy requirements accurately." },
    { icon: Plane, title: "Travel Together", desc: "Coordinate family travel plans and visa timelines for smooth relocation." },
    { icon: MessageCircle, title: "Ongoing Support", desc: "From application to approval, we stay with you at every step." },
    { icon: Award, title: "Expert Guidance", desc: "Years of experience in family visa processing across multiple countries." },
  ];

  const howCards = [
    { step: "01", title: "Free Assessment", desc: "We evaluate your eligibility and advise the best visa pathway for your family." },
    { step: "02", title: "Document Preparation", desc: "Our team helps compile and verify all required documents for submission." },
    { step: "03", title: "Application Filing", desc: "We file your application with precision and track its progress closely." },
    { step: "04", title: "Visa Approval", desc: "Receive your visa and travel guidance for a smooth family reunion." },
  ];

  const stats = [
    { value: "9+", label: "Years Experience", icon: Award },
    { value: "5000+", label: "Families Reunited", icon: Users },
    { value: "98%", label: "Success Rate", icon: CheckCircle },
    { value: "20+", label: "Countries Covered", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FF] text-[#2D1B4E] overflow-x-hidden">

      {/* ═══ SUCCESS POPUP ═══ */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-16 h-16 bg-[#EDE9FE] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for Dependent Visa. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-[#7C3AED] text-white px-4 py-3 rounded-lg hover:bg-[#6D28D9] transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ NAVBAR ═══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#E9D5FF]" : "bg-white shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#2D1B4E] leading-tight">International Institute of Languages</h1>
                <p className="text-xs text-[#7C3AED]">& Study Abroad</p>
              </div>
            </div>
            <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" />{PHONE_NUMBER}
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION — MODERN SPLIT DESIGN ═══ */}
      <section id="hero" ref={heroRef} className="relative pt-16 lg:pt-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F8F5FF] hidden lg:block rounded-l-[80px]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#A78BFA]/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${heroVis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#DDD6FE]">
                <Sparkles className="w-4 h-4" />
                Family Reunification Experts
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D1B4E] leading-tight mb-6">
                Dependent <br />
                <span className="text-[#7C3AED]">Visa Services</span>
              </h1>
              <p className="text-lg text-[#6B5B7A] mb-8 max-w-lg leading-relaxed">
                Reunite with your loved ones abroad. Our expert team helps you bring your spouse, children, and family members to join you in your destination country with seamless documentation.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={scrollToForm} className="bg-[#7C3AED] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6D28D9] hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#7C3AED]/30">
                  Start Your Application <ArrowRight className="w-5 h-5" />
                </button>
                <a href={`tel:${PHONE_NUMBER}`} className="border-2 border-[#7C3AED] text-[#7C3AED] px-8 py-4 rounded-xl font-semibold hover:bg-[#7C3AED] hover:text-white transition-all duration-300 flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Call Us
                </a>
              </div>

              <div className="flex items-center gap-2 text-[#6B5B7A] text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#EDE9FE] border-2 border-white flex items-center justify-center">
                      <Star className="w-4 h-4 text-[#7C3AED]" />
                    </div>
                  ))}
                </div>
                <span>Trusted by <strong className="text-[#7C3AED]">5000+ families</strong> worldwide</span>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${heroVis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#7C3AED]/20 border-4 border-white">
                <Image 
                  src="/dependent-visa-page.png" 
                  alt="Dependent Visa Services" 
                  width={600} 
                  height={500} 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  priority 
                />
                <div className="absolute inset-0 bg-[#7C3AED]/10" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-[#EDE9FE] hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#EDE9FE] rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D1B4E]">Family First</div>
                    <div className="text-xs text-[#6B5B7A]">Reunite with loved ones</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-[#EDE9FE] hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2D1B4E] text-sm">98% Success</div>
                    <div className="text-xs text-[#6B5B7A]">Rate Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS SECTION ═══ */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${statsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {stats.map((stat, i) => (
              <div key={i} className="group bg-[#F8F5FF] rounded-2xl p-6 text-center hover:bg-[#7C3AED] hover:shadow-xl hover:shadow-[#7C3AED]/20 transition-all duration-500">
                <div className="w-14 h-14 bg-[#EDE9FE] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                  <stat.icon className="w-7 h-7 text-[#7C3AED] group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl font-bold text-[#7C3AED] group-hover:text-white transition-colors mb-1">{stat.value}</div>
                <div className="text-sm text-[#6B5B7A] group-hover:text-white/80 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE SECTION ═══ */}
      <section ref={whyRef} className="py-20 bg-[#F8F5FF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#A78BFA]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#DDD6FE]">
              <Shield className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B4E]">
              Why Choose Our <span className="text-[#7C3AED]">Dependent Visa</span> Services
            </h2>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${whyVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {whyCards.map((card, i) => (
              <div key={i} className="group bg-white/80 backdrop-blur-sm border border-[#E9D5FF] rounded-2xl p-6 hover:border-[#7C3AED] hover:shadow-xl hover:shadow-[#7C3AED]/10 hover:-translate-y-2 transition-all duration-500">
                <div className="w-14 h-14 bg-[#EDE9FE] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#7C3AED] transition-colors duration-500">
                  <card.icon className="w-7 h-7 text-[#7C3AED] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6B5B7A] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE HELP SECTION ═══ */}
      <section ref={howRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#DDD6FE]">
              <ArrowRight className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B4E]">
              How We <span className="text-[#7C3AED]">Help You</span>
            </h2>
          </div>
          
          <div className={`relative transition-all duration-1000 ${howVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#EDE9FE] -translate-y-1/2 rounded-full" />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {howCards.map((card, i) => (
                <div key={i} className="group relative">
                  <div className="bg-white border-2 border-[#EDE9FE] rounded-2xl p-6 hover:border-[#7C3AED] hover:shadow-xl hover:shadow-[#7C3AED]/10 transition-all duration-500 relative z-10">
                    <div className="w-14 h-14 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#7C3AED]/30 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">{card.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#6B5B7A] leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#7C3AED] rounded-full border-4 border-white shadow-md z-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COUNTRIES SECTION ═══ */}
      <section ref={countriesRef} className="relative py-20 bg-[#F8F5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#DDD6FE]">
              <Globe className="w-4 h-4" />
              Global Coverage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D1B4E]">
              Countries We Serve For <span className="text-[#7C3AED]">Dependent Visa</span>
            </h2>
            <p className="text-[#6B5B7A] mt-4 max-w-2xl mx-auto">Click on any country to explore specific dependent visa requirements and start your application</p>
          </div>

          <div className={`flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 transition-all duration-1000 ${countriesVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {countryFlags.map((country, i) => (
              <Link key={i} href={country.href} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#7C3AED]/5 hover:shadow-xl hover:shadow-[#7C3AED]/20 border border-[#E9D5FF] hover:border-[#7C3AED] transition-all duration-500 hover:-translate-y-2 text-center w-[160px] sm:w-[180px]">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-500 border-4 border-[#EDE9FE] group-hover:border-[#7C3AED]">
                    <country.flag className="w-full h-full" />
                  </div>
                  <h3 className="text-base font-bold text-[#2D1B4E] group-hover:text-[#7C3AED] transition-colors">{country.name}</h3>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#7C3AED] font-medium bg-[#EDE9FE] px-3 py-1 rounded-full">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENQUIRY FORM ═══ */}
      <section id="enquiry-form" ref={formRef} className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl shadow-[#7C3AED]/10">

              {/* LEFT: Info Panel */}
              <div className="bg-[#7C3AED] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A78BFA]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6D28D9]/30 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white mb-6 border border-white/20">
                    <MessageCircle className="w-4 h-4" />
                    Get in Touch
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Apply for Dependent<br /><span className="text-[#DDD6FE]">Visa</span></h2>
                  <p className="text-[#DDD6FE] mb-10 leading-relaxed">
                    Fill out the form and our team will guide you through the family reunification process with expert care.
                  </p>
                  
                  <div className="space-y-6">
                    <a href={`tel:${PHONE_NUMBER}`} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Phone className="w-5 h-5 text-[#DDD6FE]" />
                      </div>
                      <div>
                        <div className="text-[#DDD6FE] text-sm">Call Us</div>
                        <div className="text-white font-semibold text-lg">{PHONE_NUMBER}</div>
                      </div>
                    </a>
                    <a href={`mailto:${EMAIL}`} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Mail className="w-5 h-5 text-[#DDD6FE]" />
                      </div>
                      <div>
                        <div className="text-[#DDD6FE] text-sm">Email Us</div>
                        <div className="text-white font-semibold text-lg">{EMAIL}</div>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#DDD6FE]" />
                      </div>
                      <div>
                        <div className="text-[#DDD6FE] text-sm">Visit Us</div>
                        <div className="text-white font-semibold text-lg">{ADDRESS}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#DDD6FE]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{YEARS_EXPERIENCE}+ Years Experience</div>
                      <div className="text-[#DDD6FE] text-sm">Trusted Family Visa Consulting</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div className="bg-white p-8 lg:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full bg-white border-2 ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#E9D5FF] focus:border-[#7C3AED] focus:ring-[#7C3AED]'} rounded-xl px-4 py-3 text-[#2D1B4E] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all`} placeholder="Enter your full name" />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-white border-2 ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#E9D5FF] focus:border-[#7C3AED] focus:ring-[#7C3AED]'} rounded-xl px-4 py-3 text-[#2D1B4E] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all`} placeholder="Enter your email" />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <div className={`flex items-center bg-white border-2 ${formErrors.phone ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#E9D5FF] focus-within:border-[#7C3AED] focus-within:ring-[#7C3AED]'} rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#7C3AED]/20 transition-all`}>
                      <div className="flex items-center gap-1 px-3 py-3 border-r border-[#E9D5FF]">
                        <span className="text-lg">🇮🇳</span><span className="text-sm text-[#6B5B7A]">+91</span>
                      </div>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="flex-1 bg-transparent px-4 py-3 text-[#2D1B4E] placeholder:text-[#9CA3AF] outline-none" placeholder="Enter your phone number" />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Preferred Country <span className="text-red-500">*</span></label>
                    <select name="country" value={formData.country} onChange={handleChange} className={`w-full bg-white border-2 ${formErrors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#E9D5FF] focus:border-[#7C3AED] focus:ring-[#7C3AED]'} rounded-xl px-4 py-3 text-[#2D1B4E] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all appearance-none cursor-pointer`}>
                      <option value="">Select a country</option>
                      {countries.map((c) => (<option key={c.code} value={c.name} className="bg-white">{c.name}</option>))}
                    </select>
                    {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Planned Travel Date</label>
                    <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full bg-white border-2 border-[#E9D5FF] rounded-xl px-4 py-3 text-[#2D1B4E] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D1B4E] mb-2">Message</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-white border-2 border-[#E9D5FF] rounded-xl px-4 py-3 text-[#2D1B4E] placeholder:text-[#9CA3AF] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 outline-none transition-all resize-none" placeholder="Tell us about your family and travel plans..." />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7C3AED]/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <Send className="w-5 h-5" /></>
                    )}
                  </button>
                  <a href={whatsappLink("Hi, I'm interested in Dependent Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BADGES ═══ */}
      <section className="py-16 bg-[#F8F5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-[#2D1B4E]">Trusted & Certified</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['MARA Agent', 'ICCRC Member', 'OISC Regulated', 'ISO 9001:2015', 'BBB Accredited'].map((badge, i) => (
              <div key={i} className="bg-white px-6 py-3 rounded-xl shadow-sm border border-[#E9D5FF] font-semibold text-[#6B5B7A] text-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a href={whatsappLink("Hi, I'm interested in Dependent Visa. Please share more information.")} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-2xl shadow-[#7C3AED]/40 hover:scale-110 transition-all duration-300 hover:shadow-[#7C3AED]/60 group"
        title="Chat on WhatsApp">
        <WhatsAppIcon className="w-7 h-7 text-white" />
        <span className="absolute right-16 bg-[#2D1B4E] text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat on WhatsApp</span>
      </a>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#2D1B4E] border-t border-[#4C1D95]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Image src="/IIL-logo.png" alt="IIL Logo" width={120} height={60} className="h-12 w-auto object-contain" onError={(e) => { e.target.style.display = "none"; }} />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-[#F8F5FF]">International Institute</h3>
                  <h3 className="text-lg font-bold text-[#F8F5FF]">of Languages</h3>
                  <p className="text-[#A78BFA] text-sm font-semibold">& Study Abroad</p>
                </div>
              </div>
              <p className="text-[#A78BFA] text-sm leading-relaxed mb-4">Your trusted partner for study abroad dreams. 9 years of excellence in immigration and visa consulting services.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#A78BFA]"><MapPin className="w-4 h-4 text-[#7C3AED] flex-shrink-0" /><span>{ADDRESS}</span></div>
                <div className="flex items-center gap-2 text-sm text-[#A78BFA]"><Phone className="w-4 h-4 text-[#7C3AED] flex-shrink-0" /><span>{PHONE_NUMBER}</span></div>
                <div className="flex items-center gap-2 text-sm text-[#A78BFA]"><Phone className="w-4 h-4 text-green-500 flex-shrink-0" /><span>{PHONE_NUMBER} (WhatsApp)</span></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.facebook.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"><FacebookIcon className="w-4 h-4" /></a>
                <a href="https://twitter.com/iilstudyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-slate-700 transition-all duration-300 hover:scale-110"><XIcon className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110"><InstagramIcon className="w-4 h-4" /></a>
                <a href="https://youtube.com/@iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"><YoutubeIcon className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/company/iilstudyabroad/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"><LinkedinIcon className="w-4 h-4" /></a>
                <a href={whatsappLink("Hi, I'm interested in Dependent Visa services.")} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#4C1D95] text-[#F8F5FF] flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110"><WhatsAppIcon className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-[#F8F5FF] font-semibold mb-4 uppercase text-sm tracking-wider">Important Links</h3>
              <ul className="space-y-3">
                {["About Us", "Contact Us", "Career", "Our Branches", "FAQ's", "Testimonials", "Terms & Conditions"].map((label) => (
                  <li key={label}><span className="text-[#A78BFA] text-sm hover:text-[#F8F5FF] transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#F8F5FF] font-semibold mb-4 uppercase text-sm tracking-wider">Visa</h3>
              <ul className="space-y-3">
                {["Study Visa", "Visitor Visa", "Work Visa", "Dependent Visa", "Spouse Visa", "Permanent Residency", "Tour Visa"].map((label) => (
                  <li key={label}><span className="text-[#A78BFA] text-sm hover:text-[#F8F5FF] transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#F8F5FF] font-semibold mb-4 uppercase text-sm tracking-wider">Coaching</h3>
              <ul className="space-y-3">
                {["About Our Courses", "Inhouse Courses", "Online Courses", "Practice Pack"].map((label) => (
                  <li key={label}><span className="text-[#A78BFA] text-sm hover:text-[#F8F5FF] transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
              <h3 className="text-[#F8F5FF] font-semibold mt-6 mb-4 uppercase text-sm tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {["Articles", "Test Prep Material", "English Assessment", "CRS Calculator"].map((label) => (
                  <li key={label}><span className="text-[#A78BFA] text-sm hover:text-[#F8F5FF] transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#4C1D95]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-[#A78BFA] text-sm">&copy; 2026 International Institute of Language. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}