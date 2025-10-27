import Image from 'next/image'
import React from 'react'
import { ChevronRight } from 'lucide-react';
import product from "@/assets/Category/double_acting_hydraulic.png"
import Link from 'next/link'

const PopularProducts = () => {
  return (
    <div className='bg-white px-4 md:px-8 lg:px-8 py-10 container mx-auto'>
     <div className='pb-8 flex justify-between'>
       <h2 className='text-3xl md:text-4xl font-medium text-gray-900'>
        Most Popular Products
      </h2>

      <Link href="/" className='bg-gray-900 text-white pl-3 pr-1 flex items-center rounded text-sm'>View All <ChevronRight className='w-5 h-5' /> </Link>
     </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[1, 2, 3, 4,5,6,7,8].map((item) => (
          <div 
            key={item}
            className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl border transition-all duration-300 bg-white'
          >
            <div className='relative h-52 w-full aspect-square  overflow-hidden'>
              <Image 
                src={product} 
                alt={`Product ${item}`}
                fill
                className=' object-contain group-hover:scale-110 transition-transform duration-300'
              />
            </div>
            
            <div className='p-4'>
              <h3 className='font-semibold text-lg text-gray-800 mb-1'>
                Hydraulic Cylinders
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold font-sans text-gray-900'>₹ 10,000</span>
                <button className='px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts