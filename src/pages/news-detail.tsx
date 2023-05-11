import React from 'react'
import NewsDetailComponent from '../components/news-detail'
import MainLayout from '../layout/main'
import { getArticlesDetail } from '../utils/APIs'

const NewsDetailPage = (props) => {
  const { newsDetail } = props

  if (!newsDetail) return <div />
  return (
    <MainLayout
      lightHeader
      title={newsDetail.article_title}
      thumbnail={newsDetail.article_url_img}
      metaDescription={newsDetail.article_description}
      // metaURL={`https://pinbus.vn/${props.asPath}`}
      metaType="article"
    >
      <NewsDetailComponent news={newsDetail} />
    </MainLayout>
  )
}

export async function getServerSideProps(ctx: any) {
  const newsId = ctx.query.id as string

  const {
    data: { message }
  } = await getArticlesDetail(newsId)

  return { props: { newsDetail: message[0] } }
}

export default NewsDetailPage
