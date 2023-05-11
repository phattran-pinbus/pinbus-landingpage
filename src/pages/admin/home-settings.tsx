import React, { useEffect, useState } from 'react'
import FeatureSettingSection from '../../components/admin/home/FeatureSettingSection'
import HeroSettingComponent from '../../components/admin/home/HeroSettingComponent'
import ProductSetting from '../../components/admin/home/ProductSetting'
import StepSetting from '../../components/admin/home/StepSetting'
import SubProductSetting from '../../components/admin/home/SubProductSetting'
import CollapseComponent from '../../components/atoms/CollapseComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'
import { getAllSection } from '../../utils/APIs'
import { ISectionProps } from '../../utils/interface'
import Link from 'next/link'
import VideoSectionSetting from '../../components/admin/home/VideoSectionSetting'
import NetworkSettingSection from '../../components/admin/home/NetworkSettingSection'
import IntroSettingSection from '../../components/admin/home/IntroSettingSection'

const HomeSettingPage = (...props) => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const getSections = async () => {
      try {
        const {
          data: { message }
        } = await getAllSection()

        setSections(message)
      } catch (error) {
        console.error('err when get home sections: ', error)
      }
    }

    getSections()
  }, [])

  const intro: ISectionProps = sections.find((section) => section.home_section === 'intro_section') || {}
  const features: ISectionProps = sections.find((section) => section.home_section === 'header_home') || {}
  const steps: ISectionProps = sections?.find((section) => section.home_section === 'features') || {}
  const products: ISectionProps = sections?.find((section) => section.home_section === 'product_and_service_1') || {}
  const subProducts: ISectionProps = sections?.find((section) => section.home_section === 'product_and_service_2') || {}
  const videoSection: ISectionProps = sections?.find((section) => section.home_section === 'video_demo') || {}
  const partnerSection: ISectionProps = sections?.find((section) => section.home_section === 'partner_network') || {}

  return (
    <AdminLayoutComponent {...props}>
      <HeroSettingComponent />
      <div className="mt-4">
        <IntroSettingSection sectionHeaderData={intro} />
      </div>
      <div className="mt-4">
        <FeatureSettingSection sectionHeaderData={features} />
      </div>
      <div className="mt-4">
        <StepSetting sectionHeaderData={steps} />
      </div>
      <div className="mt-4">
        <ProductSetting sectionHeaderData={products} />
      </div>
      <div className="mt-4">
        <SubProductSetting sectionHeaderData={subProducts} />
      </div>
      <div className="mt-4">
        <div className="relative">
          <CollapseComponent title="Promotion section" onEdit={null}>
            <div className="p-6 text-center font-inter">
              To edit this section, please go to the{' '}
              <Link href="/admin/promotion-settings" aria-label="promotion" passHref>
                <a className="font-bold underline text-blue-600 hover:text-blue-400">Promotion section setting</a>
              </Link>{' '}
              page
            </div>
          </CollapseComponent>
        </div>
      </div>
      <div className="mt-4">
        <VideoSectionSetting sectionHeaderData={videoSection} />
      </div>
      <div className="mt-4">
        <NetworkSettingSection sectionHeaderData={partnerSection} />
      </div>
      <div className="mt-4">
        <div className="relative">
          <CollapseComponent title="Location Section" onEdit={null}>
            <div className="p-6 text-center font-inter">
              To edit this section, please go to the{' '}
              <Link href="/admin/highlight-location-settings" aria-label="promotion" passHref>
                <a className="font-bold underline text-blue-600 hover:text-blue-400">Locations setting</a>
              </Link>{' '}
              page
            </div>
          </CollapseComponent>
        </div>
      </div>
      <div className="mt-4">
        <div className="relative">
          <CollapseComponent title="Testimonial section" onEdit={null}>
            <div className="p-6 text-center font-inter">
              To edit this section, please go to the{' '}
              <Link href="/admin/testimonial-settings" aria-label="testimonial" passHref>
                <a className="font-bold underline text-blue-600 hover:text-blue-400">Testimonial section setting</a>
              </Link>{' '}
              page
            </div>
          </CollapseComponent>
        </div>
      </div>
      <div className="mt-4">
        <div className="relative">
          <CollapseComponent title="News section" onEdit={null}>
            <div className="p-6 text-center font-inter">
              To edit this section, please go to the{' '}
              <Link href="/admin/news-settings" aria-label="testimonial" passHref>
                <a className="font-bold underline text-blue-600 hover:text-blue-400">News setting</a>
              </Link>{' '}
              page
            </div>
          </CollapseComponent>
        </div>
      </div>
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(HomeSettingPage, ['root', 'content'])
