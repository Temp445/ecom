import React from 'react';
import Image from 'next/image';
import Van from "@/assets/icons/Van.png"
import Durable from "@/assets/icons/Durable.png"
import Verified from "@/assets/icons/Check.png"
import Payment from "@/assets/icons/Payment.png"

export default function FeaturesSection() {
  const features = [
    {
      icon: Van,
      title: 'Fast Delivery',
      description: 'Efficient logistics ensure timely delivery across India and abroad.'
    },
    {
      icon: Durable,
      title: 'Durable Design',
      description: 'Engineered for long-lasting performance in industrial and heavy-duty applications.'
    },
    {
      icon: Verified,
      title: 'Made in India',
      description: "Making it easy to return any items if you're not satisfied."
    },
    {
      icon: Payment,
      title: 'Secure Payment',
      description: 'Shop with confidence knowing that our secure payment'
    }
  ];

  return (
    <div className="w-full py-12 2xl:py-5 px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg  py-10 px-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center ml-2 gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center">
                    <Image src={feature.icon} alt="icons" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}