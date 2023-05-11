import React, { useEffect, useState } from 'react'
import ProductComponent from '../components/products'
import MainLayout from '../layout/main'
import { getArticles, getHeroSection } from '../utils/APIs'
import { IArticle, IHeroSection } from '../utils/interface'

const ProductPage = () => {
  const [products, setProducts] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})
  useEffect(() => {
    getHeroSectionData('products')
    getProductsData('products')
  }, [])

  const getHeroSectionData = async (main_bg_section) => {
    try {
      const {
        data: { message }
      } = await getHeroSection(main_bg_section)
      setPageData(message[0])
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  const getProductsData = async (article_section) => {
    try {
      const {
        data: { message }
      } = await getArticles(article_section)
      setProducts(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  return (
    <MainLayout lightHeader title="Sản Phẩm Của Pinbus">
      <ProductComponent products={products} pageData={pageData} />
    </MainLayout>
  )
}

export default ProductPage
