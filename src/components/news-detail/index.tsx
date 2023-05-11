import React from 'react'
import { IArticle } from '../../utils/interface'
import PageHeroComponent from '../atoms/PageHeroComponent'
import PostNewsDetailComponent from './PostNewsDetailComponent'

const NewsDetailComponent = ({ news }: { news: IArticle }) => {
  return (
    <main className="flex-grow">
      <PageHeroComponent
        data={{
          main_bg_title: news.article_title || '',
          main_bg_sub_title: news.article_description || '',
          main_bg_url_img: news.article_url_img || '',
        }}
        center
      />
      <PostNewsDetailComponent news={news} />
    </main>
  )
}

export default NewsDetailComponent
