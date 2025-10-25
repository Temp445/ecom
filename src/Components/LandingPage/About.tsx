'use client'

import Image from 'next/image'
import Link from 'next/link'
import factoryImg from '@/assets/images/hydraulic.jpg'

const About = () => {
  return (
    <section className="py-20 bg-[#10121B]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full h-80 md:h-[420px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={factoryImg}
            alt="Our Manufacturing Unit"
            fill
            className="object-cover object-center"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F0F0F5] mb-6">
            About Our Manufacturing
          </h2>
          <p className="text-[#B5B8C1] mb-6 leading-relaxed">
            We design and manufacture high-performance hydraulic cylinders using advanced CNC machining and precision assembly techniques. Our in-house testing ensures every cylinder meets global ISO standards.
          </p>
          <Link
            href="/about"
            className="inline-block bg-[#FFD33D] hover:bg-[#E6B800] text-[#121212] font-semibold px-6 py-3 rounded-md transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
