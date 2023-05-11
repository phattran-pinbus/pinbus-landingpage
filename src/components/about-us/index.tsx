import React from 'react'
import { IArticle, IHeroSection } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import PostAboutUsComponent from './PostAboutUsComponent'

const AboutUsComponent = ({ pageData, aboutUs }: { pageData: IHeroSection; aboutUs: IArticle[] }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <PostAboutUsComponent aboutUs={aboutUs} />
    </main>
  )
}

export default AboutUsComponent
