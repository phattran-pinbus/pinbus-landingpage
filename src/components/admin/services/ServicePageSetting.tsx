import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { serviceSchema } from '../../../forms'
import { createArticle, deleteArticle, getArticles, updateArticle } from '../../../utils/APIs'
import { IArticle } from '../../../utils/interface'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import HeaderEditor from '../HeaderEditor'

const ServicePageSetting = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [services, setServices] = useState<IArticle[]>([])
  const [isDeleting, setIsDeleting] = useState<string>('')
  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async () => {
    try {
      const {
        data: { message }
      } = await getArticles('services')
      setServices(message)
    } catch (error) {
      console.error('err when get promotions: ', error)
    }
  }
  const remoteHTMLTags = (content: string) => {
    return content && content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
  }

  const ServiceTable = () => {
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
                  Created At
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{service.article_title}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-72">
                      <figure className="relative pb-9/16">
                        {service.article_url_img && (
                          <Image
                            src={service.article_url_img}
                            alt={service.article_nanoid}
                            layout="fill"
                            className="w-32 h-32 object-cover"
                          />
                        )}
                      </figure>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(service.article_created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {remoteHTMLTags(service.article_content)}
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(service.article_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(service.article_nanoid)}
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

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createArticle({
        ...formData,
        article_section: 'services',
        article_url_img: formData.article_url_img ? formData.article_url_img : undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...services, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setServices(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateArticle(formData.article_nanoid, {
        ...formData,
        created_at: undefined,
        article_description: undefined,
        display_home: undefined,
        category: undefined,
        article_url_img: formData.article_url_img ? formData.article_url_img : undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [...services.filter((i) => i.article_nanoid !== formData.article_nanoid), ...message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )

      setServices(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteArticle(isDeleting)
      const newContent = services.filter((i) => i.article_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setServices(newContent)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={openEditItem}
        setOpen={setOpenEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={serviceSchema}
        initialValue={
          !!openEditItem && openEditItem != 'create' ? services.find((i) => i.article_nanoid === openEditItem) : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}

      <HeaderEditor sectionName="services" />
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Service</div>
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
          <ServiceTable />
        </div>
      </div>
    </>
  )
}

export default ServicePageSetting
