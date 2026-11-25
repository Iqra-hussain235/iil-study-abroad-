"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaGlobe, FaCertificate, FaComments, FaCheckCircle, 
  FaArrowLeft, FaGraduationCap, FaPlane, FaFileSignature
} from "react-icons/fa";
import { ChevronDown, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import ServiceEnquiryForm from "@/components/ServiceEnquiryForm";

// ------------------------------
// EXTRA DISPLAY CONTENT (sirf design ke liye, yahan se text badal sakte ho)
// ------------------------------
const COURSE_TAGLINES = {
  english: "Speak with clarity and confidence",
  french: "Learn the language of culture",
  german: "Your gateway to study in Germany",
  ielts: "Score the band you need",
  pte: "Computer-based test, faster results",
  oet: "English for healthcare professionals",
  dl: "Quick online English test",
  celpip: "English test for Canada",
  "teacher-trainer": "Train to teach with confidence",
  interview: "Walk into every interview ready",
};

const QUOTES = [
  { quote: "The limits of my language mean the limits of my world.", by: "Ludwig Wittgenstein" },
  { quote: "Success is the sum of small efforts repeated day in and day out.", by: "Team IIL" },
];

const STATS = [
  { value: "10+", label: "Programs" },
  { value: "Online & Offline", label: "Flexible Modes" },
  { value: "Group & Solo", label: "Batch Options" },
  { value: "Weekly", label: "Mock Tests" },
];

const WHY_POINTS = [
  "Extra grammar improvement classes",
  "Multimedia classes with modern facilities",
  "Up-to-date library of study material",
  "Weekly mock tests for practice analysis",
];

const STEPS = [
  { title: "Pick Your Course", desc: "Choose a language, exam or skill program from the list above." },
  { title: "Customise It", desc: "Select mode, type and level step by step to suit your needs." },
  { title: "Share Your Details", desc: "Submit your name and phone number to complete the booking." },
  { title: "We Call You", desc: "Our advisors contact you shortly to guide you further." },
];

const PHOTOS = ["/class1.jpeg", "/class2.jpeg", "/18_image.png"];

// ------------------------------
// ANIMATION HELPERS
// ------------------------------
function Reveal({ children, delay = 0, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const wordParent = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const wordChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function AnimatedWords({ text }) {
  return (
    <motion.span variants={wordParent} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordChild} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionHeading({ eyebrow, title }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span className="mx-auto mb-3 block w-fit rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
    </Reveal>
  );
}

function QuoteBand({ quote, by }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2545] to-[#123a6b] px-6 py-20 text-center md:px-16 md:py-28">
      <motion.div
        aria-hidden
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-10 top-6 h-56 w-56 rounded-full bg-[#ff2f56]/20 blur-[80px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 26, 0], x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-blue-400/20 blur-[90px]"
      />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[10rem] font-black leading-none text-white/5">“</span>
      <div className="relative mx-auto max-w-3xl">
        <p className="text-2xl font-bold italic leading-snug text-white sm:text-3xl md:text-4xl">
          <AnimatedWords text={quote} />
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-8 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
        />
        <Reveal delay={0.5}>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-pink-300">{by}</p>
        </Reveal>
      </div>
    </section>
  );
}

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

  const isLanding = currentStep === -1 && !selectedCourse;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden">

      {/* Background Subtle Pastels */}
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-[150px] opacity-50 pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-10%] w-96 h-96 bg-rose-100 rounded-full blur-[150px] opacity-40 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto z-10 relative py-16 px-4 md:px-8">

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
        <div className="text-center mb-16 relative">
          {isLanding && (
            <>
              <motion.div
                aria-hidden
                animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute left-[2%] top-6 hidden text-[#ff2f56]/40 md:block"
              >
                <FaGraduationCap size={38} />
              </motion.div>
              <motion.div
                aria-hidden
                animate={{ y: [0, 18, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute right-[2%] top-2 hidden text-[#0F4C81]/40 md:block"
              >
                <FaGlobe size={38} />
              </motion.div>
            </>
          )}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            {selectedCourse ? selectedCourse.name : "Explore Our World-Class Courses"}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
          />
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

          {isLanding && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4"
              >
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-4 shadow-sm backdrop-blur">
                    <p className="text-sm font-extrabold text-[#0F4C81] sm:text-base">{s.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
                  </div>
                ))}
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="mt-8 flex justify-center text-[#ff2f56]"
              >
                <ChevronDown size={28} />
              </motion.div>
            </>
          )}
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
                  <Reveal x={-30} y={0}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-l-4 border-[#0F4C81] pl-4">
                      {category.title}
                    </h2>
                  </Reveal>
                  <motion.div
                    variants={staggerParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {category.courses.map((course) => (
                      <motion.div
                        key={course.id}
                        variants={staggerChild}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleStartCourse(course)}
                        className="relative group cursor-pointer"
                      >
                        <div className="relative h-full overflow-hidden bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center text-center gap-4 border border-slate-200 hover:border-[#0F4C81] transition-all">
                          <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] transition-transform duration-500 group-hover:scale-x-100" />
                          <div className="p-4 bg-blue-50 rounded-xl text-[#0F4C81] transition-all duration-300 group-hover:bg-[#0F4C81] group-hover:text-white group-hover:rotate-6">
                            {course.icon}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0F4C81] transition-colors">
                            {course.name}
                          </h3>
                          {COURSE_TAGLINES[course.id] && (
                            <p className="text-sm text-slate-500">{COURSE_TAGLINES[course.id]}</p>
                          )}
                          <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#ff2f56] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            Start Enquiry <ArrowRight size={14} />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
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

      {/* EXTRA SECTIONS (sirf course list wale page par dikhte hain) */}
      {isLanding && !serviceParam && (
        <>
          <QuoteBand quote={QUOTES[0].quote} by={QUOTES[0].by} />

          {/* WHY LEARN WITH US */}
          <section className="bg-white px-6 py-16 md:px-16 md:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
              <Reveal x={-40} y={0}>
                <div className="group relative">
                  <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-[#ff2f56]/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="/class2.jpeg"
                      alt="Learning at IIL"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Reveal>
              <Reveal x={40} y={0} delay={0.15}>
                <span className="inline-block rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
                  Why Learn With Us
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl">
                  Courses Designed Around You
                </h2>
                <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
                <p className="mt-5 text-slate-600">
                  Whether you are learning a language, preparing for an international exam or
                  getting ready for an interview, our trainers guide you at every step with
                  regular practice, feedback and a supportive classroom.
                </p>
                <motion.ul
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-6 space-y-3"
                >
                  {WHY_POINTS.map((p) => (
                    <motion.li
                      key={p}
                      variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <Star size={16} className="shrink-0 fill-pink-500/20 text-pink-500" />
                      {p}
                    </motion.li>
                  ))}
                </motion.ul>
              </Reveal>
            </div>
          </section>

          {/* PHOTO STRIP */}
          <section className="px-6 py-16 md:px-16">
            <SectionHeading eyebrow="Life At IIL" title="Moments From Our Classes" />
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3"
            >
              {PHOTOS.map((src, i) => (
                <motion.div
                  key={src}
                  variants={staggerChild}
                  whileHover={{ y: -8 }}
                  className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-lg ${
                    i === 2 ? "col-span-2 md:col-span-1" : ""
                  }`}
                >
                  <img
                    src={src}
                    alt={`Class moment ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* HOW IT WORKS */}
          <section className="bg-white px-6 py-16 md:px-16 md:py-24">
            <SectionHeading eyebrow="Simple Process" title="How Enrolling Works" />
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {STEPS.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={staggerChild}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
                >
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] text-xl font-extrabold text-white shadow-md">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-[#0b1c3d]">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <QuoteBand quote={QUOTES[1].quote} by={QUOTES[1].by} />

          {/* CLOSING CTA */}
          <section className="px-6 py-16 md:px-16">
            <Reveal>
              <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-14 text-center sm:px-12">
                <motion.div
                  aria-hidden
                  animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white"
                />
                <div className="relative max-w-2xl">
                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Not Sure Which Course To Pick?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                    Talk to our advisors and get guidance on the right program for your goal.
                  </p>
                </div>
                <Link
                  href="/enquiry"
                  className="group relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1c3d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Enquire Now
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </section>
        </>
      )}
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