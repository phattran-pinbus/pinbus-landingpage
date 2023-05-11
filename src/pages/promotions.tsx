import React, { useEffect, useState } from 'react'
import PromotionComponent from '../components/promotions'
import MainLayout from '../layout/main'
import { getPromotions, getHeroSection } from '../utils/APIs'
import { IPromotion, IHeroSection } from '../utils/interface'

const PromotionPage = () => {
  const [promotions, setPromotions] = useState<IPromotion[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('promotions')
    getPromotionsData()
  }, [])

  const getHeroSectionData = async (main_bg_section) => {
    try {
      const {
        data: { message }
      } = await getHeroSection(main_bg_section)
      setPageData(message[0])
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  const getPromotionsData = async () => {
    try {
      const {
        data: { message }
      } = await getPromotions()
      setPromotions(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="Chương trình khuyến mãi">
      <PromotionComponent promotions={promotions} pageData={pageData} />
    </MainLayout>
  )
}

export default PromotionPage
