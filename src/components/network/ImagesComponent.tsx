/* eslint-disable @next/next/no-img-element */
import React from 'react'
function TestimonialsCircles() {
  const items = [
    {
      path: '/images/image-1.jpg',
      alt: 'Image 1',
      className: 'lg:col-span-4 col-span-12 w-full object-cover',
      width: 360
    },
    {
      path: '/images/image-2.jpg',
      alt: 'Image 2',
      className: 'lg:col-span-3 col-span-12 w-full object-cover',
      width: 270
    },
    {
      path: '/images/image-3.jpg',
      alt: 'Image 3',
      className: 'lg:col-span-5 col-span-12 w-full object-cover',
      width: 450
    },
    {
      path: '/images/image-4.jpg',
      alt: 'Image 4',
      className: 'lg:col-span-3 col-span-12 w-full object-cover',
      width: 270
    },
    {
      path: '/images/image-5.jpg',
      alt: 'Image 5',
      className: 'lg:col-span-5 col-span-12 w-full object-cover',
      width: 450
    },
    {
      path: '/images/image-6.jpg',
      alt: 'Image 6',
      className: 'lg:col-span-4 col-span-12 w-full object-cover',
      width: 360
    }
  ]

  return (
    <section className="bg-dark-400">
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pb-12 md:pb-20">
            <div className="grid grid-cols-12 gap-3" data-aos-id-gallery>
              {items.map((item, index) => (
                <img
                  key={index}
                  className={item.className}
                  src={item.path}
                  width={item.width}
                  style={{
                    maxHeight: '270px'
                  }}
                  alt={item.alt}
                  data-aos="fade-down" data-aos-delay="450"
                  data-aos-anchor="[data-aos-id-gallery]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default TestimonialsCircles
