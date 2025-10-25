"use client";

import { useState } from "react";

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    product: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted!");
    setFormData({ name: "", company: "", product: "", contact: "" });
  };

  return (
    <section className="text-center my-10 px-6">
      <h2 className="text-3xl font-bold mb-6">Request a Quote</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow"
      >
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg border"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company Name"
            className="p-3 rounded-lg border"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />
        </div>
        <input
          type="text"
          placeholder="Product Interested In"
          className="w-full p-3 rounded-lg border mb-4"
          required
          value={formData.product}
          onChange={(e) =>
            setFormData({ ...formData, product: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Contact Info (Phone / Email)"
          className="w-full p-3 rounded-lg border mb-4"
          required
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
        <button type="submit" className="w-full">
          Submit Request
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Or contact us directly on <span className="text-blue-600">WhatsApp</span>
        </p>
      </form>
    </section>
  );
}
