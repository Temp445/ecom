"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import  thumbnail from "@/assets/banners/banner.png"

export default function BlogSection() {
  const blogs = [
    {
      title: "How to Maintain Hydraulic Cylinders for Longevity",
      date: "Oct 2025",
      image: thumbnail,
      link: "#",
    },
    {
      title: "Top Innovations in Industrial Lifting Systems",
      date: "Sep 2025",
      image: thumbnail,
      link: "#",
    },
    {
      title: "Choosing the Right Hydraulic Cylinder for Your Needs",
      date: "Aug 2025",
      image: thumbnail,
      link: "#",
    },
  ];

  return (
    <section className="text-center px-6">
      <h2 className="text-3xl font-bold mb-8">Latest Insights</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden text-left"
          >
            <Image
              src={b.image}
              alt={b.title}
              width={400}
              height={250}
              className="object- w-full h-52"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">{b.date}</p>
              <h3 className="font-semibold text-lg mt-1 mb-2">{b.title}</h3>
              <a
                href={b.link}
                className="text-blue-600 text-sm flex items-center gap-1"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
