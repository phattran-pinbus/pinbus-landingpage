import React, { useEffect, useState } from 'react'
import NewsComponent from '../components/news'
import ProductComponent from '../components/products'
import ServiceComponent from '../components/services'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const ServicePage = () => {
  const [services, setServices] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('services')
    getProductsData('services')
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

  const getProductsData = async (article_section) => {
    try {
      const {
        data: { message }
      } = await getArticles(article_section)
      setServices(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="Dịch Vụ Pin Sạc Công Nghệ Pinbus">
      <ServiceComponent services={services} pageData={pageData} />
    </MainLayout>
  )
}

export default ServicePage
