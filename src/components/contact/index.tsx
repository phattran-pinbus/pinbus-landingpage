import React from 'react'
import { IHeroSection } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import BodyContactComponent from './BodyContactComponent'

const ContactComponent = ({ pageData }: { pageData: IHeroSection }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <BodyContactComponent />
    </main>
  )
}

export default ContactComponent
