import React, { useEffect, useState } from 'react'
import AwesomeSlider from 'react-awesome-slider'
import { getAllSlideHome } from '../../utils/APIs'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
const AutoplaySlider = withAutoplay(AwesomeSlider)

import { ISlideContent, ISlideHome } from '../../utils/interface'
import Button from '../atoms/Button'
import RenderHTML from '../atoms/RenderHTML'

const HeroSection = () => {
  const [heroData, setHeroData] = useState<ISlideHome>({})

  useEffect(() => {
    getHeroData()
  }, [])

  const getHeroData = async () => {
    try {
      const {
        data: { message }
      } = await getAllSlideHome()
      setHeroData(message[0])
    } catch (error) {
      console.error('err when get hero section: ', error)
    }
  }

  return (
    <div className="h-screen">
      <AutoplaySlider
        fillParent={true}
        className="bg-primary-400 mt-28 lg:mt-0"
        buttons={false}
        bullets={true}
        play={true}
        interval={5000}
        infinite={true}
        startupScreen={<div />}
      >
        {heroData &&
          heroData.content &&
          heroData.content.map((item: ISlideContent, index) => {
            return (
              <div className="container mx-auto max-w-7xl px-4 sm:px-24 relative" key={index}>
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-6">
                  <div className="lg:col-span-2 flex flex-wrap justify-center lg:flex-col lg:justify-center -m-1 lg:mx-0">
                    <div className="mb-4 font-inter text-dark-400 text-center lg:text-left" data-aos="fade-down">
                      <RenderHTML content={item.title} />
                    </div>
                    <div className="mb-4 font-inter text-dark-400 text-center lg:text-left" data-aos="fade-down">
                      <RenderHTML content={item.subtitle} />
                    </div>

                    <div
                      data-aos="fade-down"
                      data-aos-delay="450"
                      className="text-dark-400 font-inter render—html render—custom-ul-li"
                    >
                      <RenderHTML content={item.content} />
                    </div>
                    <div className="mt-8" data-aos="fade-down" data-aos-delay="300">
                      <div className="flex flex-col sm:flex-row justify-left max-w-sm mx-auto sm:max-w-md md:mx-0">
                        <Button
                          href="https://webapp.pinbus.vn/"
                          text="Trải nghiệm ngay"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 max-w-sm mx-auto md:max-w-2xl lg:max-w-3xl">
                    <div className="text-center" data-aos="fade-down">
                      <div className="relative inline-flex justify-center items-center">
                        {item.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.image} alt="Features illustration" className="object-cover" width="80%" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </AutoplaySlider>
    </div>
  )
}

export default HeroSection
