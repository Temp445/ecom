"use client";

import { motion } from "framer-motion";
import { Car, Factory, Wrench, Ship } from "lucide-react";

export default function IndustryApplications() {
  const industries = [
    { name: "Automotive", icon: Car },
    { name: "Construction", icon: Factory },
    { name: "Manufacturing", icon: Wrench },
    { name: "Marine", icon: Ship },
  ];

  return (
    <section className="text-center px-6">
      <h2 className="text-3xl font-bold mb-8">Industry Applications</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {industries.map((ind, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center shadow-sm"
          >
            <ind.icon className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold">{ind.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
