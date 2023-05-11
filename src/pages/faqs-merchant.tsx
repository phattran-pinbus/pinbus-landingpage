import React, { useEffect, useState } from 'react'
import FaqsMerchantComponent from '../components/faqs-merchant'
import MainLayout from '../layout/main'
import { getFaqs, getHeroSection } from '../utils/APIs'
import { IFaqs, IHeroSection } from '../utils/interface'

const FaqsMerchantPage = () => {
  const [faqsMerchant, setFaqsMerchant] = useState<IFaqs[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getHeroSectionData('merchant')
    getFaqsData('merchant')
  }, [])

  const getHeroSectionData = async (main_bg_section) => {
    try {
      setLoading(true)
      const {
        data: { message }
      } = await getHeroSection(main_bg_section)
      setPageData(message[0])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('err when get header post section: ', error)
    }
  }

  const getFaqsData = async (faqs_type_section) => {
    try {
      const {
        data: { message }
      } = await getFaqs(faqs_type_section)
      setFaqsMerchant(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="Các câu hỏi thường gặp dành cho Đối tác">
      <FaqsMerchantComponent faqsMerchant={faqsMerchant} pageData={pageData} loading={loading} />
    </MainLayout>
  )
}

export default FaqsMerchantPage
