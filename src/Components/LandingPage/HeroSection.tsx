
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "",
    subtitle: "",
    img: "https://cdn.globalso.com/ytfasthydraulic/75e4fbb3.jpg",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    img: "https://cdn.globalso.com/ytfasthydraulic/75e4fbb3.jpg",
    cta: "Explore Products",
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    img: "https://cdn.globalso.com/ytfasthydraulic/75e4fbb3.jpg",
    cta: "View Collection",
  },
  {
    id: 4,
    title: "",
    subtitle: "",
    img: "https://cdn.globalso.com/ytfasthydraulic/75e4fbb3.jpg",
    cta: "View Collection",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] 2xl:h-[600px] container mx-auto">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 ,ease: "easeInOut"}}
              className="absolute inset-0 w-full h-[500px] 2xl:h-[600px] flex items-center justify-center bg-[#F4F4F4]"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full"
              />
              <div className="relative z-10 text-center text-[#2E2E2E] px-4 md:px-8">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl mb-6">{slide.subtitle}</p>
             
              </div>
                 <button className="bg-black hover:bg-[#e65c00] absolute bottom-8 right-36 text-white px-6 py-3 rounded-md font-semibold transition">
                  {slide.cta}
                </button>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Slider Dots */}
      <div className="absolute h-full items-center justify-center mx-auto right-5  flex flex-col space-y-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-1.5 h-4 border rounded transition duration-500 ${
              idx === currentSlide ? "bg-gray-900 h-8" : "bg-white"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
