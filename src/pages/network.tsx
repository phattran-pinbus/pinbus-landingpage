import React, { useEffect, useState } from 'react'
import NetworkComponent from '../components/network'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const NetworkPage = () => {
  const [network, setNetwork] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})

  useEffect(() => {
    getHeroSectionData('network')
    getNetWorkData('network')
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

  const getNetWorkData = async (section) => {
    try {
      const {
        data: { message }
      } = await getArticles(section)
      setNetwork(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="MẠNG LƯỚI">
      <NetworkComponent network={network} pageData={pageData} />
    </MainLayout>
  )
}

export default NetworkPage
