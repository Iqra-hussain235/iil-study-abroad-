"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe, GraduationCap, Award, ArrowRight, Phone, Mail,
  MapPin, Shield, Briefcase, Plane, Heart, Users, Sparkles,
  TrendingUp, Send, X, Building, MessageCircle, CheckCircle,
  Compass, FileText, Wallet, Landmark, Sun, BookOpen, Languages
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

const NetherlandsPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgError, setImgError] = useState({ hero: false, about: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Netherlands",
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
        const purpose = `${formData.qualification} - ${formData.course}`;
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: purpose,
          message: formData.message,
          visaType: "Study Visa",
          country: "Netherlands",
        };

        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setShowPopup(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            country: "Netherlands",
            qualification: "",
            course: "",
            message: "",
          });
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit. Please check your connection.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const closePopup = useCallback(() => setShowPopup(false), []);

  const handleImgError = (key) => {
    setImgError((prev) => ({ ...prev, [key]: true }));
  };

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Floating WhatsApp ── */}
      <a
        href={whatsappLink("Hi, I'm interested in studying in Netherlands. Please share more information.")}
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
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for Netherlands Study Visa. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-orange-700 text-white px-4 py-3 rounded-lg hover:bg-orange-800 transition-colors font-semibold"
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
      <section className="relative bg-gradient-to-br from-orange-700 via-orange-600 to-red-800 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

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
                <span className="block text-orange-200">Netherlands</span>
              </h1>
              <p className="text-lg text-orange-100 leading-relaxed max-w-xl">
                Discover world-class education in a progressive, multicultural environment. The Netherlands offers 
                innovative teaching methods, English-taught programs, and a gateway to European opportunities for 
                ambitious international students.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-orange-700 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
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
                  { icon: GraduationCap, bold: "Expert Team", sub: "Professional Guidance" },
                  { icon: Award, bold: "Top Universities", sub: "Global Education" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-orange-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-orange-900">
                {!imgError.hero ? (
                  <Image
                    src="/netherland.png"
                    alt="Study in Netherlands"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                    priority
                    onError={() => handleImgError('hero')}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-orange-800 to-red-900 flex items-center justify-center">
                    <Building className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-orange-600" />
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
              {!imgError.about ? (
                <Image
                  src="/netherland-image.png"
                  alt="Netherlands Landscape"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  onError={() => handleImgError('about')}
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Building className="w-32 h-32 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                <Landmark className="w-4 h-4" />
                About Netherlands
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Discover Netherlands
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Netherlands is a vibrant country in Western Europe known for its innovative education system, 
                multicultural environment, and high standard of living. Dutch universities are renowned for their 
                practical, research-oriented approach and forward-thinking teaching methods that prepare students 
                for real-world success.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Dutch are known for their open-mindedness, tolerance, and fluency in English. The country 
                is a leader in renewable energy, sustainability, and innovation. With its central location in 
                Europe and excellent transport connections, the Netherlands offers an ideal setting for ambitious 
                international students seeking quality education and global exposure.
              </p>
              <p className="text-gray-600 leading-relaxed">
                English is widely spoken throughout the country, making it easy for international students to adapt. 
                The thriving startup scene, strong economy, and welcoming culture create abundant opportunities 
                for both academic growth and career development.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "Amsterdam", lbl: "Capital City" },
                  { val: "Euro (EUR)", lbl: "Currency" },
                  { val: "Dutch & English", lbl: "Languages" },
                  { val: "Mediterranean", lbl: "Climate" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-orange-50 transition-colors">
                    <p className="font-bold text-xl text-orange-700">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY NETHERLANDS
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Study in Netherlands?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key reasons international students choose the Netherlands for higher education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Languages,
                title: "English-Savvy Nation",
                desc: "The Netherlands has one of the highest English fluency rates in Europe. A wide range of programs are taught entirely in English, making it accessible for international students without language barriers.",
              },
              {
                icon: Globe,
                title: "Innovative Education",
                desc: "Dutch universities are known for innovative teaching methods, practical research-oriented education, and strong student associations that enhance the learning experience.",
              },
              {
                icon: GraduationCap,
                title: "High-Quality Education",
                desc: "World-renowned institutions with strong academic reputations. Degrees follow international standards and are recognized across the EU and worldwide.",
              },
              {
                icon: Wallet,
                title: "Affordable Tuition",
                desc: "Compared to UK and USA, the Netherlands offers relatively affordable tuition fees. Various scholarship options are available to help reduce financial burden.",
              },
              {
                icon: Heart,
                title: "Budget-Friendly Living",
                desc: "Students enjoy significant discounts at museums, restaurants, and public transport. The country offers a high quality of life at reasonable costs for students.",
              },
              {
                icon: Shield,
                title: "Safe & Tolerant Society",
                desc: "The Netherlands is known for its open-mindedness, tolerance, and safety. The welcoming environment makes it easy for international students to feel at home.",
              },
              {
                icon: TrendingUp,
                title: "Career Opportunities",
                desc: "Strong economy with many multinational companies and a thriving startup scene. Graduates have access to post-study work options and career pathways in Europe.",
              },
              {
                icon: Sparkles,
                title: "Central European Hub",
                desc: "Located at the heart of Europe with excellent transport connections. Easy access to major European cities for travel, networking, and cultural experiences.",
              },
              {
                icon: BookOpen,
                title: "Wide Range of Courses",
                desc: "A broad spectrum of programs across all fields including engineering, business, agriculture, design, and humanities. Something for every academic interest.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-orange-700" />
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
                desc: "Guidance on preparing a genuine, complete visa application as per current requirements.",
              },
              {
                icon: Heart,
                title: "Pre-Departure Assistance",
                desc: "Practical guidance on travel, accommodation, and settling in once your visa is approved.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA nudge */}
          <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about visa requirements, documents, eligible universities,
              and current intake dates —{" "}
              <span className="font-semibold text-orange-800">
                speak directly with our team.
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-orange-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-800 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about studying in Netherlands.")}
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
              <div className="bg-orange-700 p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-3">Apply for Netherlands Study Visa</h2>
                <p className="text-orange-100 mb-8 text-sm leading-relaxed">
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
                      <p className="text-xs text-orange-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in Netherlands. Please share more information.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200">WhatsApp Us</p>
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
                      <p className="text-xs text-orange-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-orange-200">Visit Us</p>
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
                      <p className="text-xs text-orange-200">Guiding students on their study abroad journey</p>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder-gray-400"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder-gray-400"
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qualification" name="qualification" required
                      value={formData.qualification} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select qualification</option>
                      <option value="12th">12th Standard / High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select course</option>
                      <option value="business">Business / Management</option>
                      <option value="engineering">Engineering</option>
                      <option value="it">IT / Computer Science</option>
                      <option value="agriculture">Agriculture / Life Sciences</option>
                      <option value="medicine">Medicine / Healthcare</option>
                      <option value="design">Design / Architecture</option>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-700 text-white py-4 rounded-lg font-semibold hover:bg-orange-800 active:bg-orange-900 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in Netherlands. Please share more information.")}
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
      <section className="relative bg-gradient-to-r from-orange-700 via-orange-600 to-red-800 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Your Journey to{" "}
            <span className="text-orange-200">Netherlands</span>
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Let IIL guide you toward world-class Dutch education and career opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("enquiry")}
              className="bg-white text-orange-700 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
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

export default NetherlandsPage;