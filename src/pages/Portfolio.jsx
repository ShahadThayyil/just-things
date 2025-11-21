import React from 'react'
import ScrollExpandMedia from '../components/scroll-expand-media.jsx'

function Portfolio() {
  return (
    <div>  
      <ScrollExpandMedia
                mediaType="video"
                mediaSrc="vid.mp4"
                posterSrc="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80"
                bgImageSrc="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80"
                title="Ocean Depth"
                date="EST 2024"
                scrollToExpand="Scroll to Dive In"
                textBlend={true}
              >
                {/* This content appears AFTER the video fully expands and you keep scrolling */}
                <div className="space-y-8 text-gray-300">
                  <h3 className="text-3xl font-bold text-white">The Deep Blue</h3>
                  <p>
                    As you descended, the video expanded to immerse you completely. Now you are
                    in the flow of the content. This section is standard HTML/JSX that lives
                    inside the component's children prop.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                    odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
                    Nullam ac odio ten.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
                    <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
                  </div>
                  <p>
                    Keep scrolling to see that the video above stays put (or scrolls away
                    depending on your layout preference) while this content moves up.
                  </p>
                </div>
              </ScrollExpandMedia>
    </div>
  )
}

export default Portfolio
