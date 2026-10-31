"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ServiceDetailPanel } from "@/components/ServicesAccordion";

const IMAGES = {
  graduation: "/09_inhouse_coaching.png",
  laptop: "/10_online_coaching.png",
  passport: "/11_visa_assistance.png",
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function ServiceCategoryCards({
  categories,
  selectedId,
  onSelect,
  animateOnView = true,
}) {
  const motionProps = animateOnView
    ? {
        variants: containerVariant,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-80px" },
      }
    : {
        variants: containerVariant,
        initial: "hidden",
        animate: "visible",
      };

  const selectedCategory = categories.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        {...motionProps}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {categories.map((category) => {
          const isSelected = selectedId === category.id;

          return (
            <motion.button
              key={category.id}
              type="button"
              layout
              variants={cardVariant}
              whileHover={!isSelected ? { y: -6, scale: 1.02 } : {}}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(isSelected ? null : category.id)}
              aria-expanded={isSelected}
              className={`group relative block w-full overflow-hidden rounded-3xl text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isSelected
                  ? "ring-2 ring-[#0F4C81] shadow-2xl shadow-blue-900/15"
                  : "ring-1 ring-slate-200 hover:ring-blue-300 shadow-md hover:shadow-xl bg-white"
              }`}
              style={{ "--card-glow": category.glow }}
            >
              {/* Full illustration — title, description, and "click to explore" are already part of the image */}
              <div className="relative w-full bg-slate-900">
                <img
                  src={IMAGES[category.icon] || IMAGES.graduation}
                  alt={category.title}
                  className="block w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Expand/collapse indicator, floats in the corner so it doesn't collide with the baked-in text */}
              <motion.span
                animate={{ rotate: isSelected ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md shadow-sm"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.span>

              <div
                className="absolute bottom-0 left-0 right-0 h-1.5 transition-opacity"
                style={{
                  opacity: isSelected ? 1 : 0.7,
                  background: `linear-gradient(90deg, transparent, ${category.accent}, transparent)`,
                }}
              />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Inline expanded panel below cards */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4 }}
          >
            <ServiceDetailPanel category={selectedCategory} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
