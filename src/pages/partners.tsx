import React, { useEffect, useState } from 'react'
import PartnerComponent from '../components/partners'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const PartnerPage = () => {
  const [partners, setPartner] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('partners')
    getPartnersData('partners')
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

  const getPartnersData = async (article_section) => {
    try {
      const {
        data: { message }
      } = await getArticles(article_section)
      setPartner(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="TRỞ THÀNH ĐỐI TÁC">
      <PartnerComponent partners={partners} pageData={pageData} />
    </MainLayout>
  )
}

export default PartnerPage
