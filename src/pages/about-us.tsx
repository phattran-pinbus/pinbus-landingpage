import React, { useEffect, useState } from 'react'
import AboutUsComponent from '../components/about-us'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const AboutUsPage = () => {
  const [aboutUs, setAboutUs] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('about-us')
    getAboutUsData('about-us')
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

  const getAboutUsData = async (article_section) => {
    try {
      const {
        data: { message }
      } = await getArticles(article_section)
      setAboutUs(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="VỀ CHÚNG TÔI">
      <AboutUsComponent aboutUs={aboutUs} pageData={pageData} />
    </MainLayout>
  )
}

export default AboutUsPage
