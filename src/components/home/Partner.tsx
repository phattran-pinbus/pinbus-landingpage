/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { IHighlightLocation, ISectionContent, ISectionProps } from '../../utils/interface'
import { SectionTitle } from '../atoms'
import ImageCard from '../atoms/ImageCard'
import { getHighlightLocation, getSectionById } from './../../utils/APIs'

const Partner = ({
  sectionData,
  locationSectionData
}: {
  sectionData: ISectionProps
  locationSectionData: ISectionProps
}) => {
  const [partners, setPartners] = React.useState<ISectionContent[]>([])
  const [highlightLocation, setHighlightLocation] = React.useState<IHighlightLocation[]>([])

  useEffect(() => {
    if (sectionData.home_nanoid) {
      getPartnerData(sectionData.home_nanoid)
    }
  }, [sectionData.home_nanoid])

  useEffect(() => {
    getLocations()
  }, [])

  const getLocations = async () => {
    try {
      const {
        data: { message }
      } = await getHighlightLocation()
      setHighlightLocation(message)
    } catch (error) {
      console.error('err when get locations: ', error)
    }
  }

  const getPartnerData = async (id) => {
    try {
      const {
        data: { message }
      } = await getSectionById(id)
      setPartners(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <section className="relative bg-primary-400 pt-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24" data-aos="fade-down" data-aos-delay="450">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} bottomDivider />
        </div>

        <div className="flex flex-wrap">
          {partners &&
            partners.map((item: ISectionContent) => (
              <ImageCard
                key={item.home_detail_nanoid}
                image={item?.home_detail_media?.media_url}
                title={item.home_detail_title}
                description={item.home_detail_content[0]}
                link={item.home_detail_link}
                linkLable="Xem thêm"
              />
            ))}
        </div>

        <div className="py-12" data-aos="fade-down" data-aos-delay="450">
          <h3 className="h3 lg:text-2xl mb-4 mt-8 text-gray-900 font-inter font-extrabold text-center">
            {locationSectionData.home_title}
          </h3>
          <div className="">
            <Carousel
              centerMode
              centerSlidePercentage={100 / (isMobile ? 1 : 3)}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              swipeable={true}
            >
              {highlightLocation &&
                highlightLocation.map((item: IHighlightLocation, index) => (
                  <a href={item.link} key={index} target="_blank" rel="noopener noreferrer">
                    <div className="max-w-2xl bg-dark-400 p-5 rounded-3xl tracking-wide shadow-lg m-2">
                      <div id="header" className="flex">
                        <img
                          alt="mountain"
                          className="rounded-2xl"
                          src={item.highlight_position_img}
                          style={{
                            width: 90,
                            height: 90
                          }}
                        />
                        <div className="flex flex-col ml-2 text-left">
                          <h4 id="name" className="text-xl font-bold">
                            {item.highlight_position_title}
                          </h4>
                          <p className="text-gray-400">{item.highlight_position_address}</p>
                        </div>
                      </div>
                      <div className="flex text-left justify-between items-end mt-2">
                        <div className="text-primary-400">
                          <span className="text-2xl font-bold mr-2">&#8226;</span>
                          {item.highlight_position_status === true ? 'Mở cửa' : 'Đóng cửa'}
                        </div>
                        <div>
                          <Image
                            alt="mountain"
                            src={require('../../assets/images/pins.png').default}
                            height={22}
                            width={71}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partner
