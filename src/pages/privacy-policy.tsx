import React, { useEffect, useState } from 'react'
import PrivacyComponent from '../components/privacy'
import MainLayout from '../layout/main'
import { getHeroSection, getPolicy } from '../utils/APIs'
import { IHeroSection, IPolicy } from '../utils/interface'

const PrivacyPage = () => {
  const [privacy, setPrivacy] = useState<IPolicy>()
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('privacy')
    getPolicyData('privacy')
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

  const getPolicyData = async (policy_type_section) => {
    try {
      const {
        data: { message }
      } = await getPolicy(policy_type_section)
      setPrivacy(message[0])
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="CHÍNH SÁCH BẢO MẬT">
      {privacy && <PrivacyComponent privacy={privacy} pageData={pageData} />}
    </MainLayout>
  )
}

export default PrivacyPage
