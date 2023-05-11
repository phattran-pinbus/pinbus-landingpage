import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'

import { IFaqs, IHeroSection } from '../../utils/interface'
import ListPostFaqsComponent from './ListPostFaqsComponent'

const FaqsComponent = ({
  pageData,
  faqsEndUser,
  loading
}: {
  pageData: IHeroSection
  faqsEndUser: IFaqs[]
  loading: boolean
}) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <ListPostFaqsComponent faqsEndUser={faqsEndUser} loading={loading} />
    </main>
  )
}

export default FaqsComponent
