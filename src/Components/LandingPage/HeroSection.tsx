// HeroSection.jsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const img1="https://www.freepik.com/free-vector/hand-drawn-repair-shop-template-design_30029496.htm#fromView=search&page=3&position=32&uuid=eeff1481-7960-40d5-9db6-9426976a8e8a&query=hydraulic+cyclinder+banner"

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
    title: "Custom Hydraulic Solutions",
    subtitle: "Engineered for Your Needs",
    img: "/images/hero2.jpg",
    cta: "Explore Products",
  },
  {
    id: 3,
    title: "Reliable Industrial Cylinders",
    subtitle: "Built to Last",
    img: img1,
    cta: "View Collection",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#F4F4F4]"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
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
      <div className="absolute top-1/2 right-5 transform -translate-x-1/2 flex flex-col space-y-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 border rounded-full transition ${
              idx === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
