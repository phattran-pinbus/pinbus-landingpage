/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { SectionTitle } from '../atoms'
import { getSectionById } from './../../utils/APIs'
import { ISectionContent, ISectionProps } from '../../utils/interface'
import RenderHTML from '../atoms/RenderHTML'

const Steps = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [steps, setStep] = React.useState<ISectionContent[]>([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (sectionData.home_nanoid) {
      getStepData(sectionData.home_nanoid)
    }
  }, [sectionData.home_nanoid])

  const getStepData = async (id) => {
    try {
      const {
        data: { message }
      } = await getSectionById(id)
      setStep(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <section className="relative bg-primary-400 pt-20" data-aos="fade-down" data-aos-delay="450">
      <div className="relative lg:max-w-none mx-auto px-4 sm:px-24">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} bottomDivider />
        </div>
        <div
          className="max-w-xs mx-auto sm:max-w-none md:max-w-xl lg:max-w-none grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          data-aos-id-featbl
        >
          {steps &&
            steps.map((step, index) => {
              const isHover = index === active
              return (
                <article
                  key={index}
                  className="relative group px-6 py-4 sm:py-8"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-featposts]"
                  data-aos-delay="100"
                  style={{
                    height: 260
                  }}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(undefined)}
                >
                  <figure>
                    {step.home_detail_media?.media_url && (
                      <img
                        className="absolute inset-0 w-full h-full object-cover group-hover:bg-dark-400 transition duration-700 ease-out rounded-xl"
                        src={step?.home_detail_media?.media_url}
                        width={258}
                        height={300}
                        alt="Related post 03"
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-dark-400 opacity-30 group-hover:bg-dark-400 group-hover:opacity-100 transition duration-700 ease-out rounded-xl"
                      aria-hidden="true"
                    ></div>
                  </figure>
                  <div className="relative flex flex-col h-full text-white justify-center hover:text-primary-400">
                    <header className="text-center">
                      <h3 className="text-2xl font-red-hat-display font-bold tracking-tight mb-2">
                        {step.home_detail_title}
                      </h3>

                      {isHover && (
                        <p className={`text-gray-400 opacity-0 ${isHover && 'opacity-100'}`}>
                          <RenderHTML content={step.home_detail_content[0]} />
                        </p>
                      )}
                    </header>
                  </div>
                </article>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Steps
