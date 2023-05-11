import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'
import { IHeroSection, IFaqs } from '../../utils/interface'
import ListPostFaqsMerchantComponent from './ListPostFaqsMerchantComponent'

const FaqsMerchantComponent = ({
  pageData,
  faqsMerchant,
  loading
}: {
  pageData: IHeroSection
  faqsMerchant: IFaqs[]
  loading: boolean
}) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <ListPostFaqsMerchantComponent faqsMerchant={faqsMerchant} loading={loading} />
    </main>
  )
}

export default FaqsMerchantComponent
