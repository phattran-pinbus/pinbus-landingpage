import React, { useEffect, useState } from 'react'
import { createArticle, deleteArticle, getArticles, updateArticle } from '../../../utils/APIs'
import { IArticle } from '../../../utils/interface'
import HeaderEditor from '../HeaderEditor'
import Image from 'next/image'
import moment from 'moment'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { newsSchema } from '../../../forms'
import { toast } from 'react-toastify'
import RenderHTML from '../../atoms/RenderHTML'
import Category from './Category'

const NewsPageComponent = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [news, setNews] = useState<IArticle[]>([])
  const [isDeleting, setIsDeleting] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const {
        data: { message }
      } = await getArticles('news')
      setNews(message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('err when get news: ', error)
    }
  }

  const remoteHTMLTags = (content: string) => {
    return content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
  }

  const NewsTable = () => {
    return (
      <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full  overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Image
                </th>

                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Content
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Display home
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Category Name
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8}>
                    <div className="text-center mt-8">
                      <div className="spinner-border text-primary" role="status">
                        <span>Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}

              {news &&
                news
                  .sort((a, b) => new Date(b.article_created_at).getTime() - new Date(a.article_created_at).getTime())
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{item.article_title}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-72">
                        <figure className="relative pb-9/16">
                          {item.article_url_img && (
                            <Image
                              src={item.article_url_img}
                              alt={item.article_nanoid}
                              layout="fill"
                              className="w-32 h-32 object-cover"
                            />
                          )}
                        </figure>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {item.article_description || '-'}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {item.article_content ? (
                          <RenderHTML content={remoteHTMLTags(item?.article_content)} truncate={100} />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {item.display_home ? (
                          <span className="text-green-600 flex justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="flex justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        {item.category?.category_name}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(item.article_created_at).format('YYYY-MM-DD HH:mm')}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                        <div className="flex">
                          <button
                            className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                            onClick={() => setOpenEditItem(item.article_nanoid)}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Edit</span>
                          </button>

                          <button
                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                            onClick={() => setIsDeleting(item.article_nanoid)}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateArticle(formData.article_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [...news.filter((i) => i.article_nanoid !== formData.article_nanoid), ...message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )

      setNews(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteArticle(isDeleting)
      const newContent = news.filter((i) => i.article_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setNews(newContent)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createArticle({
        ...formData,
        created_at: undefined,
        article_section: 'news'
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...news, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setNews(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const enrichData = () => {
    const item = news.find((i) => i.article_nanoid === openEditItem)
    return {
      ...item,
      category: item.category.category_nanoid
    }
  }
  return (
    <>
      <ModalFormComponent
        isOpen={!!openEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={newsSchema}
        initialValue={!!openEditItem && openEditItem != 'create' ? enrichData() : {}}
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}

      <HeaderEditor sectionName="news" />
      <div className="mb-6">
        <Category />
      </div>
      <div className="relative bg-white p-6">
        <div className="items-center flex mb-4 justify-between">
          <div className="text-xl font-inter">News</div>
          <div>
            <button
              className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center"
              onClick={() => setOpenEditItem('create')}
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>Create</span>
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 ">
          <NewsTable />
        </div>
      </div>
    </>
  )
}

export default NewsPageComponent
