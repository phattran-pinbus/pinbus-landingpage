import React from 'react'
import Image from 'next/image'
import RenderHTML from './RenderHTML'

const PageHeroComponent = ({ data, center }: any) => {
  return (
    <section className="relative bg-dark-400">
      <div className="inset-0 h-24 box-content -z-1 pt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          src={data.main_bg_url_img}
          width="1440"
          height="577"
          alt="Testimonials"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400" aria-hidden="true"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-3xl" data-aos="fade-down">
            <article>
              <header>
                <div className="text-center md:text-left">
                  <h1 className="lg:text-header text-header-mobile font-bold mb-4 font-inter text-gray-100">
                    {data.main_bg_title}
                  </h1>
                  <p className="text-xl text-gray-400 font-inter" data-aos="fade-down" data-aos-delay="150">
                    {data.main_bg_sub_title}
                  </p>
                  < RenderHTML content={data.main_bg_content} />
                </div>
              </header>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHeroComponent
