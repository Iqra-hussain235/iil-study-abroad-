"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe, GraduationCap, Award, ArrowRight, Phone, Mail,
  MapPin, Shield, Briefcase, Heart, Users, Sparkles,
  TrendingUp, Send, X, Building, MessageCircle, CheckCircle,
  Compass, FileText, Wallet, Languages, Landmark, Info
} from "lucide-react";

const PHONE_NUMBER = "+91-8630048365";
const WHATSAPP_NUMBER = "918630048365";
const EMAIL = "Contact@iilstudyabroad.com";
const ADDRESS = "Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India";
const YEARS_EXPERIENCE = "9";
const SOCIALS = {
  instagram: "https://www.instagram.com/iil.studyabroad",
  facebook: "https://www.facebook.com/iiLstudyabroad",
  linkedin: "https://www.linkedin.com/company/iilstudyabroad/",
  youtube: "https://youtube.com/@iil.studyabroad",
};

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const FrancePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "France",
    qualification: "",
    course: "",
    message: "",
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);

      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            purpose: formData.qualification + " - " + formData.course,
            message: formData.message,
            visaType: "Study Visa",
            country: "France",
          }),
        });

        const data = await res.json();

        if (data.success) {
          setShowPopup(true);
          setFormData({ name: "", email: "", phone: "", country: "France", qualification: "", course: "", message: "" });
        } else {
          alert("Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const closePopup = useCallback(() => setShowPopup(false), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Floating WhatsApp ── */}
      <a
        href={whatsappLink("Hi, I'm interested in studying in France. Please share more information.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold text-sm pr-1">WhatsApp Us</span>
      </a>

      {/* ── Success Popup ── */}
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for France Study Visa. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-blue-800 text-white px-4 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-red-800 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                Study Visa Guidance
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Study in{" "}
                <span className="block text-red-300">France</span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                France is among the most popular study destinations in Europe — home to
                world-class institutions, rich culture, and a welcoming environment for
                international students seeking quality education.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  Enquire Now <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Call Us
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: Building, bold: `${YEARS_EXPERIENCE}+ Years`, sub: "Guiding Students" },
                  { icon: GraduationCap, bold: "Top Ranked", sub: "Universities" },
                  { icon: Award, bold: "End-to-End", sub: "Visa Support" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-blue-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-900">
                <Image
                  src="/france.png"
                  alt="Study in France"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Personalised Guidance</p>
                    <p className="text-xs text-gray-500">From Application to Visa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100">
              <Image
                src="/france%20image.png"
                alt="About France"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                About France
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Discover France
              </h2>
              <p className="text-gray-600 leading-relaxed">
                France is one of the most sought-after study destinations in Europe, known
                for its academic excellence, research culture, and rich history. With
                thousands of institutions offering programs across every discipline, France
                attracts hundreds of thousands of international students every year.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the iconic city of Paris to vibrant university towns like Lyon, Grenoble,
                and Bordeaux — studying in France means world-class education combined with
                an unparalleled cultural experience in the heart of Europe.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "Paris", lbl: "Capital City" },
                  { val: "Euro (€)", lbl: "Currency" },
                  { val: "French / English", lbl: "Languages" },
                  { val: "6.77 Crores", lbl: "Population" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <p className="font-bold text-xl text-blue-800">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY FRANCE
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Study in France?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key reasons international students choose France for higher education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "World-Class Institutions",
                desc: "France is home to globally recognised universities, grandes écoles, and research institutes offering programs across all disciplines.",
              },
              {
                icon: Wallet,
                title: "Affordable Education",
                desc: "Public universities in France are known for their accessible tuition structures — making quality European education available to a wide range of students.",
              },
              {
                icon: Briefcase,
                title: "Career & Business Exposure",
                desc: "France hosts the European headquarters of many global companies, offering strong internship and career opportunities across diverse industries.",
              },
              {
                icon: Award,
                title: "Scholarship Opportunities",
                desc: "Various scholarships from the French government, universities, and international programs may be available for eligible international students.",
              },
              {
                icon: Heart,
                title: "Rich Culture & Lifestyle",
                desc: "Studying in France means experiencing world-renowned art, cuisine, architecture, and lifestyle — along with easy travel across Europe.",
              },
              {
                icon: Languages,
                title: "International Language",
                desc: "French is spoken across five continents. Learning French while completing your degree adds a valuable skill to your global career profile.",
              },
              {
                icon: Sparkles,
                title: "Research & Innovation",
                desc: "French institutions are at the forefront of research and innovation, with strong ties to industry and cutting-edge laboratory facilities.",
              },
              {
                icon: Shield,
                title: "Safe & Welcoming",
                desc: "France is a safe and inclusive destination with a large international student community, making it easy for new students to settle in.",
              },
              {
                icon: TrendingUp,
                title: "Post-Study Pathways",
                desc: "France offers post-study stay options for graduates looking to gain work experience in Europe. Contact our team for current eligibility details.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW WE HELP
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Support You
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our team guides you at every step — from choosing the right university to visa preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Compass,
                title: "Course & University Guidance",
                desc: "Personalised recommendations based on your academic background, budget, and career goals.",
              },
              {
                icon: FileText,
                title: "Documentation Support",
                desc: "Help organising and reviewing all documents your admission and visa application will need.",
              },
              {
                icon: Shield,
                title: "Visa File Preparation",
                desc: "Guidance on preparing a complete Campus France and VFS application as per current requirements.",
              },
              {
                icon: Heart,
                title: "Pre-Departure Assistance",
                desc: "Practical guidance on travel, accommodation, and settling in once your visa is approved.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-800" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA nudge */}
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <Info className="w-8 h-8 text-blue-700 mx-auto mb-3" />
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about visa requirements, documents, costs, eligible universities,
              and current intake dates —{" "}
              <span className="font-semibold text-blue-800">
                speak directly with our team.
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-900 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about studying in France.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#1ebe57] transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENQUIRY FORM
      ══════════════════════════════════════════ */}
      <section id="enquiry" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-2">

              {/* Left – contact info */}
              <div className="bg-blue-900 p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-3">Apply for France Study Visa</h2>
                <p className="text-blue-100 mb-8 text-sm leading-relaxed">
                  Fill out the form and our team will reach out to guide you through the entire process.
                </p>

                <div className="space-y-5">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in France. Please share more information.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">WhatsApp Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">Visit Us</p>
                      <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                </div>

                {/* Experience + socials */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-7 h-7 text-yellow-400 shrink-0" />
                    <div>
                      <p className="font-bold">{YEARS_EXPERIENCE}+ Years Experience</p>
                      <p className="text-xs text-blue-200">Guiding students on their study abroad journey</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right – form */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required autoComplete="email"
                      placeholder="Enter your email address"
                      value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qualification" name="qualification" required
                      value={formData.qualification} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select qualification</option>
                      <option value="12th">12th Standard / High School</option>
                      <option value="bachelor">Bachelor&apos;s Degree</option>
                      <option value="master">Master&apos;s Degree</option>
                      <option value="diploma">Diploma</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course" name="course" required
                      value={formData.course} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select course</option>
                      <option value="engineering">Engineering</option>
                      <option value="business">Business / Management</option>
                      <option value="arts">Arts / Humanities</option>
                      <option value="science">Science</option>
                      <option value="fashion">Fashion / Design</option>
                      <option value="culinary">Culinary Arts</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <input type="hidden" name="country" value={formData.country} />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={3} autoComplete="off"
                      placeholder="Tell us about your study plans..."
                      value={formData.message} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-800 text-white py-4 rounded-lg font-semibold hover:bg-blue-900 active:bg-blue-950 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : <>Submit Enquiry <Send className="w-5 h-5" /></>}
                  </button>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in France. Please share more information.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM BANNER
      ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-red-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/france%20image.png" alt="France" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Your Journey to{" "}
            <span className="text-red-300">France</span>
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Let IIL guide you toward world-class French education. Your European adventure begins here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("enquiry")}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/visa/study"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Back to Countries
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FrancePage;