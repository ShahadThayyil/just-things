import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/Categories'
import FeaturedProjects from '../components/FeaturedProjects'
import AboutUs from '../components/AboutUS'
import ServicesSection from '../components/ServiceSection'
import OnePhotoSection from '../components/OnePhotoSection'
import TestimonialsSection from '../components/Testimonials'
import InstagramFeed from '../components/InstaFeed'
import CallToAction from '../components/CallToAction'


const Home = () => {
  return (
    <div className="w-full bg-[#0A0A0A]">
        <HeroSection/>
        <CategorySection />
        <FeaturedProjects />
        <AboutUs/>
        <ServicesSection />
        <OnePhotoSection />
        <TestimonialsSection/>
        <InstagramFeed />
        <CallToAction />
     
    </div>
  )
}

export default Home