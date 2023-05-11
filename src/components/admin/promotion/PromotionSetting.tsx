import React, { useEffect, useState } from 'react'
import { createPromotions, deletePromotion, getPromotions, updatePromotion } from '../../../utils/APIs'
import { IPromotion } from '../../../utils/interface'
import Image from 'next/image'
import moment from 'moment'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { promotionSchema } from '../../../forms'
import { toast } from 'react-toastify'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import HeaderEditor from '../HeaderEditor'
import RenderHTML from '../../atoms/RenderHTML'

const PromotionSetting = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [promotions, setPromotions] = useState<IPromotion[]>()
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const {
        data: { message }
      } = await getPromotions()
      setPromotions(message)
    } catch (error) {
      console.error('err when get promotions: ', error)
    }
  }

  const PromotionTable = () => {
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
                  Promotion Title
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Promotion Content
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Promotion Link
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Desktop cover
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Mobile cover
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Created at
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  status
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Home Display
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
              {promotions &&
                promotions.map((promotion, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {promotion.promotion_title}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {promotion.promotion_content && <RenderHTML content={promotion.promotion_content} truncate={100}/>}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <a
                        href={promotion.promotion_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-300"
                      >
                        Link
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <figure className="relative pb-9/16">
                        {promotion?.promotion_desktop_img && (
                          <Image
                            src={promotion.promotion_desktop_img}
                            alt={promotion.promotion_nanoid}
                            layout="fill"
                            className="w-32 h-32 object-cover"
                          />
                        )}
                      </figure>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <figure className="relative pb-9/16">
                        {promotion?.promotion_mobile_img && (
                          <Image
                            src={promotion.promotion_mobile_img}
                            alt={promotion.promotion_nanoid}
                            layout="fill"
                            className="w-32 h-32 object-cover"
                          />
                        )}
                      </figure>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(promotion.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {promotion.active ? (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Active</span>
                        </span>
                      ) : (
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Disabled</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {promotion.promotion_display_on_home ? (
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
                      <div className="flex">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(promotion.promotion_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(promotion.promotion_nanoid)}
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
      } = await updatePromotion(formData.promotion_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [
        ...promotions.filter((i) => i.promotion_nanoid !== formData.promotion_nanoid),
        ...message
      ].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

      setPromotions(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createPromotions(formData)
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...promotions, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setPromotions(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePromotion(isDeleting)
      const newPromotions = promotions.filter((promotion) => promotion.promotion_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setPromotions(newPromotions)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={openEditItem}
        setOpen={setOpenEditItem}
        schema={promotionSchema}
        handleClose={() => setOpenEditItem('')}
        initialValue={
          !!openEditItem && openEditItem != 'create' ? promotions.find((i) => i.promotion_nanoid === openEditItem) : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}
      <HeaderEditor sectionName="promotions" />
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Promotion settings</div>
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
          <PromotionTable />
        </div>
      </div>
    </>
  )
}

export default PromotionSetting
