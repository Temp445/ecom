import Header from '@/Components/Header'
import About from '@/Components/LandingPage/About'
import BlogSection from '@/Components/LandingPage/BlogSection'
import CategorySection from '@/Components/LandingPage/CategorySection'
import HeroSection from '@/Components/LandingPage/HeroSection'
import IndustryUsage from '@/Components/LandingPage/IndustryUsage'
import NewProduct from '@/Components/LandingPage/NewProduct'
import Offer from '@/Components/LandingPage/Offer'
import PopularProducts from '@/Components/LandingPage/PopularProducts'
import RequestQuote from '@/Components/LandingPage/RequestQuote'
import Testimonials from '@/Components/LandingPage/Testimonials'
import FeatureList from '@/Components/LandingPage/WhyChooseUs'
import Navbar from '@/Components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* <Header/>
      <Navbar/> */}
      <HeroSection/>
      <FeatureList/>
      <CategorySection/>
      <NewProduct/>
      <Offer/>

      <PopularProducts/>
      {/* <RequestQuote/> */}
      <About/>
      <IndustryUsage/>
      <Testimonials/>
      <BlogSection/>
    </div>
  )
}

export default page