"use client";

import { useState } from "react";
import { Send,User, Mail, Building2, Package, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    product: "",
    contact: "",
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted!");
    setFormData({ name: "", company: "", product: "", contact: "" });
  };

  return (
    <section className="relative  overflow-hidden">
      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Request a Quote
          </h2>
          {/* <p className="text-gray-600 text-lg">
            Fill out the form below and we'll get back to you within 24 hours
          </p> */}
        </div>

        <div className="relative bg-white/80 backdrop-blur-lg p-8 rounded shadow-2xl border border-gray-500 transition-all duration-300 hover:shadow-3xl overflow-clip">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900  rounded-bl-full"></div>
          
          <div className="grid sm:grid-cols-1 gap-6 mb-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-gray-600 transition-all outline-none bg-white"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="absolute left-4 top-[46px] text-gray-400 group-focus-within:text-gray-600 transition-colors">
                <User/>
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Your Company"
                className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all outline-none bg-white"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
              <Building2 className="absolute left-4 top-[46px] w-5 h-5 text-gray-400 group-focus-within:text-gray-500 transition-colors" />
            </div>
          </div>

          <div className="relative group mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Interested In *
            </label>
            <input
              type="text"
              placeholder="Hydraulic Cyclinder"
              className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all outline-none bg-white"
              required
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
            />
            <Package className="absolute left-4 top-[46px] w-5 h-5 text-gray-400 group-focus-within:text-gray-500 transition-colors" />
          </div>

          <div className="relative group mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all outline-none bg-white"
              required
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <Phone className="absolute left-4 top-[46px] w-5 h-5 text-gray-400 group-focus-within:text-gray-500 transition-colors" />
          </div> 

              <div className="relative group mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email ID *
            </label>
            <input
              type="email"
              placeholder="Email Id"
              className="w-full p-4 pl-12 rounded-xl border-2 border-gray-200 focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all outline-none bg-white"
              required
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <Mail className="absolute left-4 top-[46px] w-5 h-5 text-gray-400 group-focus-within:text-gray-500 transition-colors" />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-gray-800 text-white p-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Submit Request</span>
            <Send className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>


          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-3">or reach us instantly on</p>
            <a
              href="https://wa.me/your-number"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FaWhatsapp className="text-white text-2xl" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      
      </div>
    </section>
  );
}