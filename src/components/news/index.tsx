import React from 'react'
import PageHeroComponent from '../atoms/PageHeroComponent'
import ListPostComponent from './ListPostComponent'

import { IArticle, ICategory, IHeroSection } from '../../utils/interface'

const NewsComponent = ({
  pageData,
  news,
  categories,
  loading,
  handleChangePage,
  handleChangeCategory,
  selectedPage,
  selectedCategoryId,
  loadingMore
}: {
  pageData: IHeroSection
  news: IArticle[]
  categories: ICategory[]
  loading: boolean
  handleChangePage: (page: number, categoryId: string) => void
  handleChangeCategory: (categoryId: string) => void
  selectedPage: number
  selectedCategoryId: string,
  loadingMore: boolean
}) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent data={pageData} />
      <ListPostComponent
        news={news}
        categories={categories}
        loading={loading}
        handleChangePage={handleChangePage}
        handleChangeCategory={handleChangeCategory}
        selectedPage={selectedPage}
        selectedCategoryId={selectedCategoryId}
        loadingMore={loadingMore}
      />
    </main>
  )
}

export default NewsComponent
