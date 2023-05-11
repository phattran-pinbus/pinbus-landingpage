import Image from 'next/image'
import React, { useEffect } from 'react'
import { IArticle, ISectionProps } from '../../utils/interface'
import { SectionTitle } from '../atoms'
import { getNewsDisplayHome } from './../../utils/APIs'
import Link from 'next/link'
import ImageCard from '../atoms/ImageCard'

const News = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [newsData, setNewsData] = React.useState<IArticle[]>([])

  useEffect(() => {
    getNewsData()
  }, [])

  const getNewsData = async () => {
    try {
      const {
        data: { message }
      } = await getNewsDisplayHome()
      setNewsData(message)
    } catch (error) {
      console.error('err when get news: ', error)
    }
  }

  const formatNewsContent = (content) => {
    //trim content with max length of 100
    return content && content.length > 100 ? content.substring(0, 100) + '...' : content
  }

  return (
    <section className="pb-20 bg-primary-400">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24" data-aos="fade-down" data-aos-delay="450">
        <div className="max-w-3xl mx-auto text-center pb-12">
          <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} bottomDivider />
        </div>

        <div className="flex flex-wrap -m-2">
          {newsData &&
            newsData.map((news: IArticle) => (
              <ImageCard
                key={news.article_nanoid}
                image={news?.article_url_img}
                title={news.article_title}
                description={news.article_description}
                link={`/news-detail?id=${news.article_nanoid}`}
                linkLable="Tiếp tục đọc &gt;"
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default News
