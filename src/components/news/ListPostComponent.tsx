import React from 'react'
import Image from 'next/image'
import { IArticle, ICategory } from '../../utils/interface'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import { isMobile } from 'react-device-detect'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const remoteHTMLTags = (content: string, length = 100) => {
  return content && content.slice(0, length) + '...'
}

const ListPostComponent = ({
  news,
  categories,
  loading,
  handleChangePage,
  handleChangeCategory,
  selectedPage,
  selectedCategoryId,
  loadingMore
}: {
  news: IArticle[]
  categories: ICategory[]
  loading: boolean
  handleChangePage: (page: number, categoryId: string) => void
  handleChangeCategory: (categoryId: string) => void
  selectedPage: number
  selectedCategoryId: string
  loadingMore: boolean
}) => {
  const enrichedCategory = [
    {
      category_nanoid: '',
      category_name: 'Tất cả thể loại',
      count: news.length
    },
    ...categories
  ]

  return (
    <section className="bg-dark-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-16">
          <Carousel
            centerMode
            centerSlidePercentage={100 / (isMobile ? 1 : 3)}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            swipeable={true}
          >
            {enrichedCategory &&
              enrichedCategory.map((category) => (
                <article
                  key={category.category_nanoid}
                  className="relative group px-6 py-4 sm:py-8 cursor-pointer rounded-md shadow-md lg:mr-4"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-featposts]"
                  data-aos-delay="100"
                  onClick={() => handleChangeCategory(category.category_nanoid)}
                >
                  <figure>
                    <div
                      className={`absolute inset-0 ${
                        selectedCategoryId === category.category_nanoid ? 'bg-primary-400' : 'bg-gray-800'
                      } opacity-75 group-hover:opacity-50 transition duration-700 ease-out rounded-md shadow-md`}
                      aria-hidden="true"
                    ></div>
                  </figure>
                  <div className="relative flex flex-col h-full text-white">
                    <header className="flex-grow">
                      <h3 className="text-lg font-red-hat-display font-bold tracking-tight">
                        {category.category_name}
                      </h3>
                    </header>
                  </div>
                </article>
              ))}
          </Carousel>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="lg:flex lg:justify-between">
            <div className="lg:flex-grow" data-aos="fade-down" data-aos-delay="200">
              <div className="-mb-2 flex justify-center">
                {loading && (
                  <div className="flex items-center justify-center space-x-2 animate-pulse">
                    <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="grid gap-12 sm:grid-cols-3 sm:gap-x-6 md:gap-y-8 items-start">
                {news &&
                  news
                    .filter((item) => item.category.category_nanoid === selectedCategoryId || selectedCategoryId === '')
                    .sort((a: any, b: any) => +new Date(b.article_created_at) - +new Date(a.article_created_at))
                    .map((item: IArticle) => (
                      <div
                        className="flex flex-col h-full p-6 bg-gray-800 shadow-xl rounded-md border-transparent"
                        key={item.article_nanoid}
                      >
                        <article className="flex flex-col h-full">
                          <header>
                            <Link href={`/news-detail?id=${item.article_nanoid}`}>
                              <a className="block mb-4">
                                <figure className="relative h-0 pb-3/4">
                                  {item?.article_url_img && (
                                    <Image
                                      className="absolute inset-0 object-cover rounded-md"
                                      src={item?.article_url_img}
                                      alt="News 01"
                                      height="752"
                                      width="1126"
                                    />
                                  )}
                                </figure>
                              </a>
                            </Link>
                            <Link href={`/news-detail?id=${item.article_nanoid}`}>
                              <a className="hover:underline">
                                <h3 className="h4 font-red-hat-display mb-2 text-white">
                                  {remoteHTMLTags(item.article_title, 50)}{' '}
                                </h3>
                              </a>
                            </Link>
                          </header>
                          <p className="text-gray-400 flex-grow">{remoteHTMLTags(item.article_description, 100)}</p>
                          <footer className="flex items-center mt-4">
                            <div className="text-sm text-white">
                              <Link href={`/news-detail?id=${item.article_nanoid}`}>
                                <a>
                                  <p className="text-primary-400 flex-grow">Xem thêm...</p>
                                </a>
                              </Link>
                            </div>
                          </footer>
                        </article>
                      </div>
                    ))}
              </div>
              {!loading && (
                <div className="flex justify-center mt-12 md:mt-16">
                  <button
                    className="btn-sm text-gray-300 hover:text-primary-400 bg-gray-800 flex items-center w-40 text-center justify-center"
                    onClick={() => handleChangePage(selectedPage + 1, selectedCategoryId)}
                  >
                    {loadingMore ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <span>Xem thêm</span>
                        <svg
                          className="w-4 h-4 flex-shrink-0 ml-3"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="fill-current text-gray-500"
                            d="M14.7 9.3l-1.4-1.4L9 12.2V0H7v12.2L2.7 7.9 1.3 9.3 8 16z"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ListPostComponent
