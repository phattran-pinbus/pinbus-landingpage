import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'
import { IArticle, IHeroSection } from '../../utils/interface'
import ListPostProductComponent from './PostProductComponent'

const ProductComponent = ({ pageData, products }: { pageData: IHeroSection; products: IArticle[] }) => {
  return (
    <>
      <PageHeroComponent data={pageData} />
      <ListPostProductComponent products={products} />
    </>
  )
}

export default ProductComponent
