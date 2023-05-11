import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'

import { IPromotion, IHeroSection } from '../../utils/interface'
import ListPromotionComponent from './ListPromotionComponent'

const PromotionComponent = ({ pageData, promotions }: { pageData: IHeroSection; promotions: IPromotion[] }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <ListPromotionComponent promotions={promotions} />
    </main>
  )
}

export default PromotionComponent
