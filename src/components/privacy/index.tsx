import React from 'react'
import { IHeroSection, IPolicy } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import PostPrivacyComponent from './PostPrivacyComponent'

const PrivacyComponent = ({ pageData, privacy }: { pageData: IHeroSection; privacy: IPolicy }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <PostPrivacyComponent privacy={privacy} />
    </main>
  )
}

export default PrivacyComponent
