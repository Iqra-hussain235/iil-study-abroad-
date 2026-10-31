"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaCheckCircle, FaArrowLeft, FaGlobe, FaUsers, FaClock, FaBoxOpen, FaUserAstronaut } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Configuration for steps
const STEPS = [
  { id: "mode", title: "Learning Mode", icon: <FaGlobe /> },
  { id: "type", title: "Session Type", icon: <FaUsers /> },
  { id: "duration", title: "Course Duration", icon: <FaClock /> },
  { id: "package", title: "Study Package", icon: <FaBoxOpen /> },
  { id: "details", title: "Your Details", icon: <FaUserAstronaut /> },
];

const OPTIONS = {
  mode: ["Online", "Offline (Campus)"],
  type: ["Solo (1-on-1)", "Group Batch"],
  duration: ["1 Month", "3 Months", "6 Months", "Flexible"],
  package: ["Basic", "Standard", "Premium"],
};

export default function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  const courseSlug = typeof params?.slug === "string" ? params.slug : "";
  const courseName = courseSlug
    ? courseSlug.charAt(0).toUpperCase() + courseSlug.slice(1)
    : "";

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    course: courseName,
    mode: "",
    type: "",
    duration: "",
    package: "",
    name: "",
    email: "",
    phone: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    nextStep();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
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
      const response = await axios.post("/api/academy/enquiry", formData);
      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/academy/course");
        }, 3000);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center py-16 px-4 font-sans relative overflow-hidden">
      
      {/* Background Pastel Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-100 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>

      <div className="w-full max-w-3xl z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/academy/course" className="text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors font-medium">
            <FaArrowLeft /> Back to Courses
          </Link>
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {courseName} Enrollment
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-semibold">Configure your journey</p>
          </div>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#0F4C81] -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
            <div className="relative flex justify-between">
              {STEPS.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 transition-all duration-300 ${
                    idx <= currentStep ? "bg-[#0F4C81] text-white shadow-md" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.icon}
                </div>
              ))}
            </div>
            <div className="text-center mt-6 text-xl font-bold text-slate-900">
              {STEPS[currentStep].title}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200 min-h-[400px] flex flex-col justify-center relative">
          
          <AnimatePresence mode="wait">
            
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div 
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-block text-emerald-600 text-7xl"
                >
                  <FaCheckCircle />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  Enquiry Submitted!
                </h2>
                <p className="text-slate-600 text-lg">
                  Thank you for your interest in {courseName}. Our advisors will contact you shortly.
                </p>
                <p className="text-sm text-slate-400">Redirecting to courses...</p>
              </motion.div>
            ) : currentStep < 4 ? (
              
              <motion.div
                key={STEPS[currentStep].id}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid gap-4 md:grid-cols-2"
              >
                {OPTIONS[STEPS[currentStep].id].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(STEPS[currentStep].id, opt)}
                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-[#0F4C81] hover:text-[#0F4C81] shadow-sm transition-all flex items-center justify-center text-lg font-bold text-slate-800"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>

            ) : (
              
              <motion.div
                key="form"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-md mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" name="name" 
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
                    <input 
                      type="email" name="email" 
                      value={formData.email} onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" name="phone" 
                      value={formData.phone} onChange={handleChange}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  {errorMsg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center">
                      {errorMsg}
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Complete Enquiry"}
                  </button>
                </form>
              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Navigation Controls */}
          {(!isSuccess && currentStep > 0) && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={prevStep}
              className="absolute bottom-6 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors uppercase text-xs tracking-wider font-bold"
            >
              &larr; Back
            </motion.button>
          )}

        </div>
        
      </div>
    </div>
  );
}
