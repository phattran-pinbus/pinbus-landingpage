import React, { useEffect, useState } from 'react'
import AdsComponent from '../components/ads'
import PostPartnerComponent from '../components/partners/PostPartnerComponent'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const AdsPage = () => {
  const [ads, setAds] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('ads')
    getAdsData('ads')
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

  const getAdsData = async (article_section) => {
    try {
      const {
        data: { message }
      } = await getArticles(article_section)
      setAds(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="ĐĂNG KÝ QUẢNG CÁO">
      <AdsComponent ads={ads} pageData={pageData} />
    </MainLayout>
  )
}

export default AdsPage
