import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'
import { IPolicy, IHeroSection } from '../../utils/interface'
import PostTermAndConditionComponent from './PostTermAndConditionComponent'

const TermAndConditionComponent = ({
  pageData,
  termAndCondition
}: {
  pageData: IHeroSection
  termAndCondition: IPolicy
}) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <PostTermAndConditionComponent termAndCondition={termAndCondition} />
    </main>
  )
}

export default TermAndConditionComponent
