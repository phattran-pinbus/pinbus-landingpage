import React, { useEffect, useState } from 'react'
import FaqsComponent from '../components/faqs-end-user'
import NewsComponent from '../components/news'
import MainLayout from '../layout/main'
import { getFaqs, getHeroSection } from '../utils/APIs'
import { IFaqs, IHeroSection } from '../utils/interface'

const FaqsEndUserPage = () => {
  const [faqsEndUser, setFaqsEndUser] = useState<IFaqs[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHeroSectionData('endUser')
    getFaqsData('endUser')
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

  const getFaqsData = async (faqs_type_section) => {
    try {
      setLoading(true)
      const {
        data: { message }
      } = await getFaqs(faqs_type_section)
      setFaqsEndUser(message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="Các câu hỏi thường gặp dành cho Người dùng">
      <FaqsComponent faqsEndUser={faqsEndUser} pageData={pageData} loading={loading} />
    </MainLayout>
  )
}

export default FaqsEndUserPage
