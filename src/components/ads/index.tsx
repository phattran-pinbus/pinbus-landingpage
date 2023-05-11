import React from 'react'
import { IHeroSection, IArticle } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import BecomeAdsComponent from './BecomeAds'
import PostAdsComponent from './PostAdsComponent'

const AdsComponent = ({ pageData, ads }: { pageData: IHeroSection; ads: IArticle[] }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent
        data={{
          ...pageData,
          main_bg_title: '',
          main_bg_sub_title: '',
          main_bg_content: ''
        }}
      />
      <BecomeAdsComponent />
      <PostAdsComponent ads={ads} content={pageData} />
    </main>
  )
}

export default AdsComponent
