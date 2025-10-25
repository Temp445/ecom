import Header from '@/Components/Header'
import About from '@/Components/LandingPage/About'
import BlogSection from '@/Components/LandingPage/BlogSection'
import CategorySection from '@/Components/LandingPage/CategorySection'
import HeroSection from '@/Components/LandingPage/HeroSection'
import IndustryApplications from '@/Components/LandingPage/IndustryApplications'
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
      <Header/>
      <Navbar/>
      <HeroSection/>
      <FeatureList/>
      <CategorySection/>
      <PopularProducts/>
      <About/>
      <Offer/>
      <IndustryApplications/>
      <RequestQuote/>
      <BlogSection/>
      <Testimonials/>
    </div>
  )
}

export default page