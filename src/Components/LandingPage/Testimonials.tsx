"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      company: "ABC Industries",
      review:
        "Their hydraulic cylinders are top-notch. Exceptional durability and performance for our heavy-duty equipment!",
      rating: 5,
    },
    {
      name: "Priya Verma",
      company: "AutoLift Solutions",
      review:
        "Excellent service and custom solutions. Delivery was on time, and the team was very responsive.",
      rating: 4,
    },
    {
      name: "Suresh Kumar",
      company: "MachTech Pvt Ltd",
      review:
        "High precision and long-lasting products. Definitely our go-to supplier for all hydraulic components.",
      rating: 5,
    },
  ];

  return (
    <section className="text-center px-6">
      <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
      <div className="flex overflow-x-auto gap-6 snap-x justify-center">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[300px] bg-white shadow-md rounded-2xl p-6 snap-center"
          >
            <div className="flex justify-center mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-500 w-5 h-5" />
              ))}
            </div>
            <p className="italic text-gray-700 mb-3">"{t.review}"</p>
            <h4 className="font-semibold">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.company}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
