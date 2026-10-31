"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import {
  getEnquiryDisplayTitle,
  getEnquiryCourseValue,
} from "@/utils/serviceEnquiry";

export default function ServiceEnquiryForm({ service, level, category }) {
  const displayTitle = getEnquiryDisplayTitle(service, level);
  const courseValue = getEnquiryCourseValue(service, level, category);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseValue,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg("Please fill in your Name and Phone Number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        course: courseValue,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service,
        level: level || undefined,
        category: category || undefined,
      };

      const response = await axios.post("/api/academy/enquiry", payload);
      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-xl"
      >
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mb-6 inline-block text-6xl text-emerald-600"
        >
          <FaCheckCircle />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Enquiry Submitted!
        </h2>
        <p className="mt-4 text-base text-slate-600">
          Thank you for your interest in <strong>{displayTitle}</strong>. Our advisors will contact you shortly.
        </p>
        <Link
          href="/services"
          className="mt-8 inline-flex rounded-lg bg-[#0F4C81] px-8 py-3 font-semibold text-white transition hover:bg-[#0c3c66] shadow-md"
        >
          Back to Services
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg"
    >
      <div className="mb-8 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C81] bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 rounded-full mb-3">
          Course Enquiry
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Enquire About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] to-[#ff2f56]">
            {displayTitle}
          </span>
        </h1>
        {category && (
          <p className="mt-2 text-sm text-slate-500 font-medium">{category}</p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Selected Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              readOnly
              className="w-full cursor-default rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none font-medium"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm font-medium text-red-500"
            >
              {errorMsg}
            </motion.p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-95 hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/academy/course"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <FaArrowLeft className="text-xs" /> Choose a different course
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
