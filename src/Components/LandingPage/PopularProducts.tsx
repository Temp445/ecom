import Image from 'next/image'
import React from 'react'
import product from "@/assets/images/product.jpg"

const PopularProducts = () => {
  return (
    <div className='py-16 px-4 md:px-8 lg:px-16 container mx-auto'>
      <h2 className='text-3xl md:text-4xl font-bold pb-8 text-gray-900'>
        Most Popular Products
      </h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item}
            className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white'
          >
            <div className='relative aspect-square overflow-hidden'>
              <Image 
                src={product} 
                alt={`Product ${item}`}
                fill
                className='object- group-hover:scale-110 transition-transform duration-300'
              />
            </div>
            
            <div className='p-4'>
              <h3 className='font-semibold text-lg text-gray-800 mb-1'>
                Product Name
              </h3>
              <p className='text-gray-600 text-sm mb-2'>
                Product description
              </p>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold font-sans text-gray-900'>₹ 1000</span>
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