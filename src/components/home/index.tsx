import React, { useEffect } from 'react'
import DownloadApp from '../../components/home/DownloadApp'
import News from '../../components/home/News'
import Partner from '../../components/home/Partner'
import Products from '../../components/home/Products'
import Stats from '../../components/home/Stats'
import Steps from '../../components/home/Steps'
import Subscription from '../../components/home/Subscription'
import Testimonials from '../../components/home/Testimonials'
import Videos from '../../components/home/Videos'
import { getAllSection } from '../../utils/APIs'
import { ISectionProps } from '../../utils/interface'
import HeroSection from './HeroSection'
import IntroSection from './IntroSection'
import Promotion from './Promotion'

const HomePageComponent = () => {
  const [sectionData, setSectionData] = React.useState<ISectionProps[]>()
  useEffect(() => {
    getSectionData()
  }, [])

  const getSectionData = async () => {
    try {
      const {
        data: { message }
      } = await getAllSection()
      setSectionData(message)
    } catch (error) {
      console.error('err when get section: ', error)
    }
  }

  const featureSection: ISectionProps = sectionData?.find((section) => section.home_section === 'features') || {}
  const headerSection: ISectionProps = sectionData?.find((section) => section.home_section === 'header_home') || {}
  const productSection1: ISectionProps =
    sectionData?.find((section) => section.home_section === 'product_and_service_1') || {}
  const productSection2: ISectionProps =
    sectionData?.find((section) => section.home_section === 'product_and_service_2') || {}
  const promotionSection: ISectionProps = sectionData?.find((section) => section.home_section === 'promotion') || {}
  const videoSection: ISectionProps = sectionData?.find((section) => section.home_section === 'video_demo') || {}
  const partnerSection: ISectionProps = sectionData?.find((section) => section.home_section === 'partner_network') || {}
  const newsSection: ISectionProps = sectionData?.find((section) => section.home_section === 'news') || {}
  const locations: ISectionProps = sectionData?.find((section) => section.home_section === 'highlight_locations') || {}
  const testimonials: ISectionProps = sectionData?.find((section) => section.home_section === 'testimonials') || {}
  const introsection: ISectionProps = sectionData?.find((section) => section.home_section === 'intro_section') || {}

  return (
    <>
      <HeroSection />
      <IntroSection sectionData={introsection} />
      <Stats sectionData={headerSection} />
      <Steps sectionData={featureSection} />
      <Products sectionData={productSection1} subSectionData={productSection2} />
      <Promotion sectionData={promotionSection} />
      {videoSection.home_visible && <Videos sectionData={videoSection} />}
      <Partner sectionData={partnerSection} locationSectionData={locations} />
      <Testimonials sectionData={testimonials} />
      <DownloadApp />
      <News sectionData={newsSection} />
      <Subscription />
    </>
  )
}

export default HomePageComponent
