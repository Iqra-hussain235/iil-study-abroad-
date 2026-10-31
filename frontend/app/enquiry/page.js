"use client";

import { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getEnquiryDisplayTitle,
  getEnquiryCourseValue,
} from "@/utils/serviceEnquiry";

const COURSE_OPTIONS = [
  "IELTS",
  "PTE",
  "TOEFL",
  "Spoken English",
  "Study Abroad",
  "German Language",
  "French Language",
  "English Basic",
  "English Moderate",
  "English Advanced",
  "Visa Assistance",
];

function EnquiryForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service") || "";
  const levelParam = searchParams.get("level") || "";
  const categoryParam = searchParams.get("category") || "";

  const hasServiceParams = Boolean(serviceParam);
  const displayTitle = hasServiceParams
    ? getEnquiryDisplayTitle(serviceParam, levelParam)
    : "";
  const prefillCourse = hasServiceParams
    ? getEnquiryCourseValue(serviceParam, levelParam, categoryParam)
    : "IELTS";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: prefillCourse,
  });
  const [selectedCourses, setSelectedCourses] = useState(
    hasServiceParams ? [prefillCourse] : []
  );
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const handleCourseToggle = (course) => {
    setSelectedCourses((prev) => {
      const next = prev.includes(course)
        ? prev.filter((item) => item !== course)
        : [...prev, course];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setLoading(true);

    const resolvedCourses = hasServiceParams
      ? [form.course]
      : selectedCourses;

    if (!hasServiceParams && resolvedCourses.length === 0) {
      setFeedback("Please select at least one course.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/enquiry", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: resolvedCourses.join(", "),
        courses: resolvedCourses,
        service: serviceParam || undefined,
        level: levelParam || undefined,
        category: categoryParam || undefined,
      });

      if (response.data?.success !== false) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setFeedback(
        error.response?.data?.message ||
          "Unable to submit enquiry. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-500/30 bg-emerald-50 px-5 py-4 shadow-2xl backdrop-blur-xl"
              role="alert"
            >
              <p className="text-center text-sm font-semibold text-emerald-800 sm:text-base">
                Enquiry submitted successfully! Redirecting...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:rounded-[36px] sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-block rounded-full bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81]">
                Start Your Journey
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {hasServiceParams ? (
                  <>
                    Enquire About{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] to-[#ff2f56]">
                      {displayTitle}
                    </span>
                  </>
                ) : (
                  "Ready to take the next step?"
                )}
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600 leading-relaxed">
                Submit your details below. Our expert team will contact you shortly and guide you with complete admissions, coaching, and visa procedures.
              </p>
              {categoryParam && (
                <p className="mt-2 text-sm text-slate-500 font-medium">{categoryParam}</p>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-md sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    disabled={success}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Email Address (Optional)
                  </label>
                  <input
                    value={form.email}
                    onChange={handleChange("email")}
                    disabled={success}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Phone Number *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={handleChange("phone")}
                    disabled={success}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                    placeholder="+91 90000 00000"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Course Interest {hasServiceParams ? "" : "(Select one or more)"}
                  </label>
                  {hasServiceParams ? (
                    <input
                      type="text"
                      value={form.course}
                      readOnly
                      className="w-full cursor-default rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 font-medium outline-none"
                    />
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {COURSE_OPTIONS.map((course) => {
                        const isChecked = selectedCourses.includes(course);
                        return (
                          <label
                            key={course}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${
                              isChecked
                                ? "border-[#0F4C81] bg-blue-50 text-[#0F4C81] font-semibold"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCourseToggle(course)}
                              disabled={success}
                              className="h-4 w-4 rounded border-slate-300 text-[#0F4C81] focus:ring-[#0F4C81]"
                            />
                            <span>{course}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-5 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading || success || !form.name || !form.phone || (!hasServiceParams && selectedCourses.length === 0)}
                  >
                    {loading
                      ? "Submitting..."
                      : success
                        ? "Redirecting..."
                        : "Submit Enquiry & View Courses"}
                  </button>
                </div>

                {feedback && (
                  <p className="mt-2 text-center text-sm font-medium text-red-500">{feedback}</p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:rounded-[36px] sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Why International Institute Of Language?
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-700 sm:mt-6 sm:text-base">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#0F4C81]">
                1
              </span>
              Personalized course guidance for immigration, IELTS, PTE, and spoken English.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#0F4C81]">
                2
              </span>
              Instant access to our extensive course catalogue right after your enquiry.
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#0F4C81]">
                3
              </span>
              Our expert team will follow up quickly to answer any of your questions.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-slate-600 sm:mt-8 sm:p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900">Need a different connection?</h3>
            <p className="mt-2 text-sm leading-relaxed">
              If you prefer communicating over direct chat or call, please reach out to us at our main contact portal.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Enquiry() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
            Loading enquiry form...
          </div>
        }
      >
        <EnquiryForm />
      </Suspense>
      <Footer />
    </>
  );
}
