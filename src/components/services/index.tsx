import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'

import { IHeroSection, IArticle } from '../../utils/interface'
import PostServiceComponent from './PostServiceComponent'

const ServiceComponent = ({ pageData, services }: { pageData: IHeroSection; services: IArticle[] }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <PostServiceComponent services={services} />
    </main>
  )
}

export default ServiceComponent
