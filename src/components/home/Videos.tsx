import Image from 'next/image'
import React, { useEffect } from 'react'
import { ISectionContent, ISectionProps } from '../../utils/interface'
import { SectionTitle } from '../atoms'
import Modal from '../atoms/Modal'
import { getSectionById } from './../../utils/APIs'

const Videos = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [videos, setVideos] = React.useState<ISectionContent[]>([])
  const [openVideo, setOpenVideo] = React.useState<string>('')

  useEffect(() => {
    getVideoData(sectionData.home_nanoid)
  }, [sectionData])

  const getVideoData = async (id) => {
    try {
      const {
        data: { message }
      } = await getSectionById(id)
      setVideos(message)
    } catch (error) {
      console.error('err when get get video section: ', error)
    }
  }

  return (
    <section className="relative bg-primary-400 py-20" data-aos="fade-down" data-aos-delay="450">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
        <Modal show={!!openVideo} handleClose={() => setOpenVideo('')}>
          <div className="relative pb-9/16">
            <iframe className="absolute w-full h-full" src={openVideo} title="Video" allowFullScreen></iframe>
          </div>
        </Modal>

        <div className="md:py-10">
          <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} bottomDivider />
        </div>

        <div className="max-w-sm mx-auto grid gap-12 md:gap-x-6 lg:gap-x-12 md:grid-cols-3 items-start md:max-w-none">
          {videos &&
            videos.map((video, index) => {
              return (
                <div className="relative flex flex-col items-center" key={index}>
                  <div className="inline-flex relative justify-center items-center">
                    {/* Image inside mockup size: 290x624px (or 580x1248px for Retina devices) */}
                    <div className="absolute">
                      {video.home_detail_media.media_thumbnail && (
                        <Image
                          src={video.home_detail_media.media_thumbnail}
                          width="290"
                          height="624"
                          className="object-cover w-full h-full rounded-lg"
                          alt="App screen 04"
                        />
                      )}
                    </div>
                    <Image
                      className="relative max-w-full mx-auto h-auto pointer-events-none"
                      src={require('../../assets/images/iphone-mockup.png').default}
                      width="344"
                      height="674"
                      alt="iPhone mockup"
                      aria-hidden="true"
                    />
                    <a
                      className="absolute group"
                      href="#0"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpenVideo(video?.home_detail_media?.media_url)
                      }}
                      aria-controls="modal"
                    >
                      <Image
                        src={require('../../assets/images/play-button.svg').default}
                        width="96"
                        height="96"
                        alt="Play"
                      />
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Videos
