"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaGlobe, FaCertificate, FaComments, FaCheckCircle, 
  FaArrowLeft, FaGraduationCap, FaPlane, FaFileSignature
} from "react-icons/fa";
import Link from "next/link";
import ServiceEnquiryForm from "@/components/ServiceEnquiryForm";

// ------------------------------
// DATA SCHEMA & FLOW PATTERNS
// ------------------------------
const CATEGORIES = [
  {
    title: "Languages",
    courses: [
      {
        id: "english",
        name: "English Proficiency",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "type", title: "Select Type", type: "single", options: ["Group", "Solo"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["Basic to Professional Advance", "Moderate to Professional", "Advance to Professional", "Basic to Advance"] }
        ]
      },
      {
        id: "french",
        name: "French",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["A1", "A2", "B1", "B2", "C1", "C2"] }
        ]
      },
      {
        id: "german",
        name: "German",
        icon: <FaGlobe className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "level", title: "Select Level", type: "multiple", options: ["A1", "A2", "B1", "B2", "C1", "C2"] }
        ]
      }
    ]
  },
  {
    title: "English Exam Abroad",
    courses: [
      {
        id: "ielts", name: "IELTS", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "pte", name: "PTE", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "oet", name: "OET", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "dl", name: "Duolingo", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      },
      {
        id: "celpip", name: "CELPIP", icon: <FaFileSignature className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "modules", title: "Select Modules", type: "multiple", options: ["Reading", "Writing", "Listening", "Speaking"] }
        ]
      }
    ]
  },
  {
    title: "Skills & Interview Prep",
    courses: [
      {
        id: "teacher-trainer", name: "Teacher's Trainer", icon: <FaGraduationCap className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "type", title: "Select Type", type: "single", options: ["Training Only", "Training + Job"] }
        ]
      },
      {
        id: "interview", name: "Interview Preparation", icon: <FaComments className="text-4xl" />,
        flow: [
          { id: "mode", title: "Select Mode", type: "single", options: ["Online", "Offline"] },
          { id: "category", title: "Select Track", type: "single", options: ["Job Interview", "Visa Interview", "Corporate Presentation"] }
        ]
      }
    ]
  }
];

function CourseSelectionContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const levelParam = searchParams.get("level");
  const categoryParam = searchParams.get("category");

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [selections, setSelections] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetFlow = () => {
    setSelectedCourse(null);
    setCurrentStep(-1);
    setSelections({});
    setFormData({ name: "", email: "", phone: "" });
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleStartCourse = (course) => {
    setSelectedCourse(course);
    setCurrentStep(0);
    setSelections({});
    setIsSuccess(false);
    setErrorMsg("");
  };

  const handleOptionSelect = (stepId, option, isMultiple) => {
    if (isMultiple) {
      setSelections((prev) => {
        const currentSelected = prev[stepId] || [];
        if (currentSelected.includes(option)) {
          return { ...prev, [stepId]: currentSelected.filter((item) => item !== option) };
        } else {
          return { ...prev, [stepId]: [...currentSelected, option] };
        }
      });
    } else {
      setSelections((prev) => ({ ...prev, [stepId]: option }));
    }
  };

  const isCurrentStepValid = () => {
    if (currentStep < 0 || !selectedCourse) return true;
    if (currentStep >= selectedCourse.flow.length) return true;
    
    const currentValidationId = selectedCourse.flow[currentStep].id;
    const selectedData = selections[currentValidationId];
    return selectedData && (Array.isArray(selectedData) ? selectedData.length > 0 : selectedData !== "");
  };

  const handleNextStep = () => {
    if (isCurrentStepValid()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      resetFlow();
    }
  };

  const handleFormChange = (e) => {
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
        course: selectedCourse.name,
        ...selections,
        ...formData
      };
      for (const key in payload) {
        if (Array.isArray(payload[key])) {
          payload[key] = payload[key].join(", ");
        }
      }

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

  const slideVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 md:px-8 font-sans relative overflow-hidden">
      
      {/* Background Subtle Pastels */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-[150px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-100 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">

        {/* Service enquiry from URL params */}
        {serviceParam ? (
          <ServiceEnquiryForm
            service={serviceParam}
            level={levelParam || ""}
            category={categoryParam || ""}
          />
        ) : (
        <>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            {selectedCourse ? selectedCourse.name : "Explore Our World-Class Courses"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4"
          >
            {selectedCourse 
              ? "Customize your learning experience step-by-step."
              : "Find the perfect program to accelerate your career or broaden your global horizons."}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === -1 && !selectedCourse ? (
             
            // LANDING CATEGORY & COURSE SELECTION
            <motion.div
              key="landing"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="space-y-16"
            >
              {CATEGORIES.map((category, catIdx) => (
                <div key={catIdx} className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-l-4 border-[#0F4C81] pl-4">
                    {category.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartCourse(course)}
                        className="relative group cursor-pointer"
                      >
                        <div className="relative h-full bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center text-center gap-4 border border-slate-200 hover:border-[#0F4C81] transition-all">
                          <div className="p-4 bg-blue-50 rounded-xl text-[#0F4C81] transition-colors group-hover:bg-[#0F4C81] group-hover:text-white">
                            {course.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0F4C81] transition-colors">
                            {course.name}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

          ) : (

            // DYNAMIC MULTI-STEP FLOW OR FINAL FORM
            <motion.div
              key="flow"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200 relative min-h-[450px] flex flex-col justify-between">
                
                {/* Progress Indicator */}
                {!isSuccess && selectedCourse && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm text-slate-500 font-medium">
                         Step {currentStep + 1} of {selectedCourse.flow.length + 1}
                       </span>
                       <span className="text-sm text-[#0F4C81] font-bold">
                         {currentStep < selectedCourse.flow.length ? selectedCourse.flow[currentStep].title : "Final Details"}
                       </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / (selectedCourse.flow.length + 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Step Content */}
                <div className="flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {isSuccess ? (
                      
                      // Success State
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
                          Thank you for choosing <strong>{selectedCourse?.name}</strong>. Our advisors will contact you shortly.
                        </p>
                        <button
                          onClick={resetFlow}
                          className="mt-6 px-8 py-3 bg-[#0F4C81] hover:bg-[#0c3c66] text-white rounded-lg transition-colors font-semibold shadow-md"
                        >
                          Explore More Courses
                        </button>
                      </motion.div>

                    ) : currentStep < selectedCourse.flow.length ? (
                      
                      // Dynamic Options Stage
                      <motion.div
                        key={selectedCourse.flow[currentStep].id}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full"
                      >
                        <h3 className="text-2xl font-bold mb-6 text-center text-slate-900">
                           {selectedCourse.flow[currentStep].title}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {selectedCourse.flow[currentStep].options.map((opt) => {
                            const isMultiple = selectedCourse.flow[currentStep].type === "multiple";
                            const stepId = selectedCourse.flow[currentStep].id;
                            const currentSel = selections[stepId];
                            const isSelected = isMultiple ? currentSel?.includes(opt) : currentSel === opt;

                            return (
                              <button
                                key={opt}
                                onClick={() => handleOptionSelect(stepId, opt, isMultiple)}
                                className={`
                                  p-4 rounded-xl border-2 transition-all flex items-center justify-center text-base font-semibold tracking-wide
                                  ${isSelected 
                                    ? "bg-blue-50 border-[#0F4C81] text-[#0F4C81] shadow-sm scale-[1.02]" 
                                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}
                                `}
                              >
                                {opt} {isSelected && isMultiple && <span className="ml-2 text-[#0F4C81] font-bold">✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>

                    ) : (

                      // Final Enquiry Form Stage
                      <motion.div
                        key="form"
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-sm mx-auto"
                      >
                        <h3 className="text-2xl font-bold mb-6 text-center text-slate-900">
                           Student Details
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <input 
                              type="text" name="name" 
                              value={formData.name} onChange={handleFormChange}
                              className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <input 
                              type="email" name="email" 
                              value={formData.email} onChange={handleFormChange}
                              className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                              placeholder="Email Address"
                            />
                          </div>
                          <div>
                            <input 
                              type="tel" name="phone" 
                              value={formData.phone} onChange={handleFormChange}
                              className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100 transition-colors"
                              placeholder="Phone Number"
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
                            className="w-full mt-4 bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? "Submitting..." : "Complete Booking"}
                          </button>
                        </form>
                      </motion.div>

                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                {!isSuccess && (
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
                    <button
                      onClick={handlePrevStep}
                      className="text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors font-medium text-sm"
                    >
                      <FaArrowLeft /> {currentStep === 0 ? "Change Course" : "Back"}
                    </button>

                    {currentStep < selectedCourse.flow.length && (
                      <button
                        onClick={handleNextStep}
                        disabled={!isCurrentStepValid()}
                        className="px-6 py-2 bg-[#0F4C81] text-white font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0c3c66] transition-colors shadow-sm"
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}
                
              </div>
            </motion.div>

          )}
        </AnimatePresence>

        </>
        )}

      </div>
    </div>
  );
}

export default function CourseSelection() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-slate-500"
          >
            Loading...
          </motion.p>
        </div>
      }
    >
      <CourseSelectionContent />
    </Suspense>
  );
}
