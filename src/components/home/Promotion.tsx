/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { getActivePromotion } from '../../utils/APIs'
import { IPromotion, ISectionProps } from '../../utils/interface'
import { isMobile } from 'react-device-detect'

const Promotion = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [promotionData, setPromotionData] = useState<IPromotion[]>([])
  useEffect(() => {
    getPromotionData()
  }, [])

  const getPromotionData = async () => {
    try {
      const {
        data: { message }
      } = await getActivePromotion()
      setPromotionData(message)
    } catch (error) {
      console.error('err when get promotion data: ', error)
    }
  }

  //TODO: display promotion for moboile and desktop
  return (
    <div className="mb-8" data-aos="fade-down" data-aos-delay="450">
      <div className="relative">
        {promotionData &&
          promotionData
            .filter((promotion) => promotion.promotion_display_on_home)
            .map((item: IPromotion, index) => (
              <div className="" key={index}>
                <a href={item.promotion_link} target="_blank" rel={'noopener noreferrer'}>
                  <img
                    src={isMobile ? item.promotion_mobile_img : item.promotion_desktop_img}
                    alt="promotion-img"
                    className="w-full"
                  />
                </a>
              </div>
            ))}
      </div>

      <section className="cursor-pointer">
        <div className="md:grid md:grid-cols-12 md:gap-12 lg:gap-20 items-center image-column"></div>
      </section>
    </div>
  )
}

export default Promotion
