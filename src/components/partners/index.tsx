import React from 'react'
import { IHeroSection, IArticle } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import BecomePartnerComponent from './BecomePartnerComponent'
import PostPartnerComponent from './PostPartnerComponent'

const PartnerComponent = ({ pageData, partners }: { pageData: IHeroSection; partners: IArticle[] }) => {
  return (
    <>
      <PageHeroComponent
        data={{
          ...pageData,
          main_bg_title: '',
          main_bg_sub_title: '',
          main_bg_content: ''
        }}
      />
      <BecomePartnerComponent />
      <PostPartnerComponent partners={partners} content={pageData} />
    </>
  )
}

export default PartnerComponent
