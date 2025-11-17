import Navbar from "./components/navbar";
import Hero from "./pages/Hero";
import ScrollVelocity from "./components/scrollVelocity";
import React from 'react'

function App() {
  return (
    <div className="bg-(--color-charcoal)">
      <Navbar />
      <Hero />
      <ScrollVelocity texts={[' Photography Automotive ',' Videography Production Shoots ']} 
      velocity={50}
      className="text-(--color-soft-grey)"/>
    </div>
  )
}

export default App
