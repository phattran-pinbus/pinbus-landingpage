/* eslint-disable @next/next/no-img-element */
import { getSectionById } from './../../utils/APIs'
import React, { useEffect } from 'react'
import { ISectionContent, ISectionProps } from '../../utils/interface'
import Image from 'next/image'
import RenderHTML from './../atoms/RenderHTML'
import Modal from '../atoms/Modal'

const IntroSection = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [intro, setIntro] = React.useState<ISectionContent>({})
  const [openVideo, setOpenVideo] = React.useState(false)

  useEffect(() => {
    const getIntro = async () => {
      try {
        const {
          data: { message }
        } = await getSectionById(sectionData.home_nanoid)
        setIntro(message[0])
      } catch (error) {
        console.error('err when get header post section: ', error)
      }
    }

    getIntro()
  }, [sectionData.home_nanoid])

  return (
    <section className="relative bg-primary-400 py-12 lg:pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
        <div data-aos="fade-down" data-aos-delay="450">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-6">
            <div className="lg:col-span-2 lg:pr-16 flex flex-wrap justify-center lg:flex-col lg:justify-start -m-1 lg:mx-0">
              <h2 className="lg:text-title text-text-hero-mobile font-bold font-inter mb-4 text-dark-400">
                {intro?.home_detail_title}
              </h2>
              <div className="text-dark-400 render—html">
                {!!intro?.home_detail_content && <RenderHTML content={intro.home_detail_content[0]} />}
              </div>
            </div>

            <div className="lg:col-span-3 max-w-sm mx-auto md:max-w-2xl lg:max-w-3xl">
              <div className="text-center" data-aos="fade-down">
                <div className="relative inline-flex justify-center items-center">
                  {intro?.home_detail_media?.media_thumbnail && (
                    <Image
                      src={intro?.home_detail_media?.media_thumbnail}
                      width="800"
                      height="517"
                      className="object-cover rounded-2xl"
                      alt="Video intro"
                    />
                  )}
                  <a
                    className="absolute group"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setOpenVideo(true)
                    }}
                    aria-controls="modal"
                  >
                    <svg
                      className="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out"
                      viewBox="0 0 88 88"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient x1="78.169%" y1="9.507%" x2="24.434%" y2="90.469%" id="a">
                          <stop stopColor="#EBF1F5" stopOpacity=".8" offset="0%" />
                          <stop stopColor="#EBF1F5" offset="100%" />
                        </linearGradient>
                      </defs>
                      <circle fill="url(#a)" cx="44" cy="44" r="44" />
                      <path
                        className="fill-current text-dark-400"
                        d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={openVideo} handleClose={() => setOpenVideo(false)}>
        <div className="relative pb-9/16">
          <iframe
            className="absolute w-full h-full"
            src={intro?.home_detail_media?.media_url}
            title="Video"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  )
}

export default IntroSection
