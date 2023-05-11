import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'
import { IArticle, IHeroSection } from '../../utils/interface'
import ListPostNetwork from './ListPostNetwork'
import ImagesComponent from './ImagesComponent'
import Locations from './Locations'

const NetworkComponent = ({ pageData, network }: { pageData: IHeroSection; network: IArticle[] }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <ListPostNetwork network={network} />
      <ImagesComponent />
      <Locations />
    </main>
  )
}

export default NetworkComponent
