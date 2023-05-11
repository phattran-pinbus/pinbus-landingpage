import React, { useEffect, useState } from 'react'
import TermAndConditionComponent from '../components/term-and-condition'
import MainLayout from '../layout/main'
import { getHeroSection, getPolicy } from '../utils/APIs'
import { IHeroSection, IPolicy } from '../utils/interface'

const TermAndConditionPage = () => {
  const [termAndCondition, setTermAndCondition] = useState<IPolicy>()
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('term_and_condition')
    getPolicyData('term_and_condition')
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
      setTermAndCondition(message[0])
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="ĐIỀU KHOẢN SỬ DỤNG">
      {termAndCondition && <TermAndConditionComponent termAndCondition={termAndCondition} pageData={pageData} />}
    </MainLayout>
  )
}

export default TermAndConditionPage
