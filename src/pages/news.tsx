import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import NewsComponent from '../components/news'
import MainLayout from '../layout/main'
import { getArticles, getCategory, getHeroSection, getListNews } from '../utils/APIs'
import { IArticle, ICategory, IHeroSection } from '../utils/interface'

const PER_PAGE = 6
const NewsPage = () => {
  const [news, setNews] = useState<IArticle[]>([])
  const [pageData, setPageData] = useState<IHeroSection>({})
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedPage, setSelectedPage] = useState(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    getHeroSectionData('news')
    getNewsData({ page: 1, categoryId: '', pageSize: PER_PAGE })
    getCategories()
  }, [])

  const handleChangePage = async (page: number, categoryId) => {
    try {
      setSelectedPage(page)
      setLoadingMore(true)
      const {
        data: { message }
      } = await getListNews({ page, categoryId, pageSize: PER_PAGE })

      //keep old data and append new data to array
      setNews([...news, ...message])
      setLoadingMore(false)
    } catch (error) {
      setLoadingMore(false)
      console.log(error)
    }
  }

  const handleChangeCategory = async (categoryId: string) => {
    setLoading(true)
    setSelectedCategoryId(categoryId)
    setSelectedPage(1)
    setNews([])

    const {
      data: { message }
    } = await getListNews({ page: 1, categoryId, pageSize: PER_PAGE })

    //keep old data and append new data to array
    setNews([...message])
    setLoading(false)
  }

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

  const getNewsData = async ({ page, pageSize, categoryId }) => {
    try {
      setLoading(true)
      const {
        data: { message }
      } = await getListNews({ page, pageSize, categoryId })
      setNews(message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('err when get posts: ', error)
    }
  }

  const getCategories = async () => {
    try {
      const {
        data: { message }
      } = await getCategory()
      setCategories(message)
    } catch (error) {
      console.error('err when get category: ', error)
    }
  }

  return (
    <MainLayout lightHeader title={'TIN TỨC'}>
      <NewsComponent
        news={news}
        pageData={pageData}
        categories={categories}
        loading={loading}
        handleChangePage={handleChangePage}
        selectedPage={selectedPage}
        handleChangeCategory={handleChangeCategory}
        selectedCategoryId={selectedCategoryId}
        loadingMore={loadingMore}
      />
    </MainLayout>
  )
}

export default NewsPage
