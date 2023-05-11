import React, { useEffect } from 'react'
import Image from 'next/image'
import { getTestimonialSection } from './../../utils/APIs'
import { ISectionProps, ITestimonials } from '../../utils/interface'
import { SectionTitle } from '../atoms'

const Testimonials = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [testimonials, setTestimonials] = React.useState<ITestimonials[]>([])

  useEffect(() => {
    getTestimonialData()
  }, [])

  const getTestimonialData = async () => {
    try {
      const {
        data: { message }
      } = await getTestimonialSection()
      setTestimonials(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <section className="relative bg-primary-400 pt-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24" data-aos="fade-down" data-aos-delay="450">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} />
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-12 items-start sm:max-w-none md:max-w-2xl lg:max-w-none">
          {testimonials &&
            testimonials.map((testimonial) => (
              <div
                className="text-center max-w-2xl bg-dark-400 p-10 rounded-3xl tracking-wide shadow-lg relative"
                key={testimonial.testimonial_nanoid}
              >
                <div className="absolute -top-8 right-0 left-0">
                  <Image
                    className="rounded-full"
                    src={testimonial.testimonial_avatar}
                    width="56"
                    height="56"
                    alt="user-avatar"
                  />
                </div>
                <blockquote className="text-gray-600 dark:text-gray-400">
                  {testimonial.testimonial_content}
                </blockquote>
                <div className="font-inter font-bold mt-2">
                  <cite className="not-italic">—{testimonial.testimonial_name}</cite>,{' '}
                  <a className="text-primary-400 transition duration-150 ease-in-out" href="#0">
                    {testimonial.testimonial_position_company_name}
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
