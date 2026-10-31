"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  MapPin, Users, GraduationCap, FileText,
  CheckCircle, BookOpen, Globe, Award,
  Briefcase, ArrowRight, Phone, Mail,
  Shield, Languages, TrendingUp,
  Sun, Landmark, Info, Send, Target, Lightbulb,
  Rocket, X, Calendar,
  FlaskConical, Monitor, Stethoscope, Wrench,
  BookMarked, TreePine,
} from "lucide-react";

const CzechPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    course: "",
    message: "",
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
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
          country: "Czech Republic",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", qualification: "", course: "", message: "" });
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const closePopup = useCallback(() => setShowPopup(false), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Success Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closePopup} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been submitted successfully. Our team will contact you shortly!
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
              <p className="text-sm text-gray-500 mb-1">Submitted for:</p>
              <p className="font-semibold text-blue-800">Czech Republic Study Visa</p>
            </div>
            <button onClick={closePopup} className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold w-full">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                Study in Czech Republic
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Czech Republic
                <span className="block text-blue-300">Study Visa</span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Experience high-quality education in the heart of Europe. Czech Republic offers diverse English-taught programs, affordable costs, rich culture, and Schengen access — an ideal destination for international students.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
                >
                  Apply Now <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="https://wa.me/918630048365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Expert Guidance
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  End-to-End Support
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Trusted Consultants
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-900">
                <img
                  src="/czech republic-image.png"
                  alt="Study in Czech Republic"
                  className="w-full h-[400px] object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/Czech Republic.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Czech Republic */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/Czech Republic.png"
                alt="About Czech Republic"
                className="w-full h-[400px] object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/czech republic-image.png'; }}
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                About Czech Republic
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Discover Czech Republic
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Czech Republic, also known as Czechia, is a landlocked country in Central Europe bordered by Germany, Austria, Slovakia, and Poland. With its capital Prague — the "City of a Hundred Spires" — it is one of Europe's most culturally rich and architecturally stunning destinations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A member of the Schengen Area, Czech Republic offers international students freedom to travel across Europe. The country is particularly renowned for engineering, medicine, and sciences — making it a top choice for students seeking quality European education at accessible costs.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-bold text-2xl text-blue-800">Prague</p>
                  <p className="text-sm text-gray-600">Capital City</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-bold text-2xl text-blue-800">10.5M+</p>
                  <p className="text-sm text-gray-600">Population</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-bold text-2xl text-blue-800">Koruna</p>
                  <p className="text-sm text-gray-600">Currency (CZK)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-bold text-2xl text-blue-800">Schengen</p>
                  <p className="text-sm text-gray-600">EU Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study in Czech Republic */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Study in Czech Republic?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top reasons why Czech Republic is a preferred destination for international students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Quality Education",
                desc: "Czech universities are recognized across Europe and globally. Engineering, medicine, and technology programs are especially well-regarded, with degrees valid throughout the EU.",
              },
              {
                icon: Languages,
                title: "Programs in English",
                desc: "A wide variety of degree programs are taught in English across bachelor's, master's, and doctoral levels — making it accessible for international students without Czech language skills.",
              },
              {
                icon: Briefcase,
                title: "Work While Studying",
                desc: "International students can work part-time during their studies. No separate work permit is required — though studies must remain your primary purpose of stay.",
              },
              {
                icon: FlaskConical,
                title: "Research & STEMM Focus",
                desc: "Czech universities are highly active in science, technology, engineering, mathematics, and medicine. Research opportunities are available for both undergraduate and postgraduate students.",
              },
              {
                icon: Rocket,
                title: "Post-Study Options",
                desc: "After completing your degree, you may stay to look for employment or explore business opportunities. Contact our team for current post-study visa details.",
              },
              {
                icon: TrendingUp,
                title: "Schengen Access",
                desc: "A Czech student visa gives you the benefit of Schengen Area access — making it easy to travel across Europe during your holidays and breaks.",
              },
              {
                icon: Target,
                title: "Affordable Living",
                desc: "Compared to Western Europe, Czech Republic offers significantly lower costs of living. Prague and other student cities are budget-friendly without compromising quality of life.",
              },
              {
                icon: Sun,
                title: "Rich Culture & Heritage",
                desc: "From medieval castles and spa towns to vibrant city life — Czech Republic offers a deeply enriching cultural experience that goes beyond the classroom.",
              },
              {
                icon: Lightbulb,
                title: "Safe & Welcoming",
                desc: "Czech Republic is consistently ranked among Europe's safest countries. Its international student community is large and welcoming, making it easy to settle in.",
              },
            ].map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-xl hover:shadow-md transition-all group border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <reason.icon className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Support You */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How We Support You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From application to arrival — IIL Study Abroad guides you at every step
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "University Selection",
                desc: "We help you choose the right university and program based on your academic profile and career goals.",
              },
              {
                icon: FileText,
                title: "Documentation Help",
                desc: "Our team assists you in preparing and verifying all required documents for your visa application.",
              },
              {
                icon: Shield,
                title: "Visa Application",
                desc: "We guide you through the entire Czech student visa process — from form filling to embassy appointment.",
              },
              {
                icon: Globe,
                title: "Pre-Departure Support",
                desc: "Accommodation advice, travel guidance, and orientation support before you depart for Czech Republic.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-blue-800" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-blue-900 rounded-2xl p-8 text-center text-white shadow-lg">
            <Info className="w-10 h-10 text-blue-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Visa Requirements, Costs & Eligibility</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Detailed information about Czech Republic student visa requirements, tuition fees, living costs, scholarship options, and eligibility criteria — contact our team for personalized guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Enquire Now <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="https://wa.me/918630048365"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side */}
              <div className="bg-blue-900 p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">Apply for Czech Republic Study Visa</h2>
                <p className="text-blue-100 mb-8">
                  Fill out the form and our experts will guide you through the entire Czech Republic study visa process.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Call Us</p>
                      <p className="font-semibold">+91-8630048365</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Email Us</p>
                      <p className="font-semibold">Contact@iilstudyabroad.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Visit Us</p>
                      <p className="font-semibold">Near MIT College, Wave Cinema Road, Moradabad</p>
                    </div>
                  </div>
                </div>
                {/* Social Icons */}
                <div className="mt-8 flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://wa.me/918630048365" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required
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
                      id="email" name="email" type="email" required
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
                      id="phone" name="phone" type="tel" required
                      placeholder="Enter your phone number"
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Highest Qualification
                    </label>
                    <select
                      id="qualification" name="qualification"
                      value={formData.qualification} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select qualification</option>
                      <option value="12th">12th / High School</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Interested Course / Field
                    </label>
                    <input
                      id="course" name="course" type="text"
                      placeholder="e.g. Engineering, Medicine, Business"
                      value={formData.course} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
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
                    {loading ? "Submitting..." : <>Submit Enquiry <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/Czech Republic.png"
            alt="Czech Republic"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = '/czech republic-image.png'; }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Your Czech Republic Journey Today
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Let IIL Study Abroad guide you to quality European education in the heart of Czechia. Your journey begins here!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
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
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918630048365"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
};

export default CzechPage;