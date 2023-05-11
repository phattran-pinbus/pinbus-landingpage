import React, { useEffect, useState } from 'react'
import { deleteFaqs, getFaqs, updateFaqs, createFaqs } from '../../../utils/APIs'
import { IFaqs } from '../../../utils/interface'
import Image from 'next/image'
import moment from 'moment'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { faqsSchema } from '../../../forms'
import { toast } from 'react-toastify'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import HeaderEditor from '../HeaderEditor'
import renderHTML from 'react-render-html'

const FaqsEndUserSettingComponent = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [faqsEndUser, setFaqsEndUser] = useState<IFaqs[]>([])
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchFaqs('endUser')
  }, [])

  const fetchFaqs = async (section_name) => {
    try {
      const {
        data: { message }
      } = await getFaqs(section_name)
      setFaqsEndUser(message)
    } catch (error) {
      console.error('err when get merchant faqsEndUser: ', error)
    }
  }
  const remoteHTMLTags = (content: string) => {
    return content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
  }

  const FaqsTable = () => {
    return (
      <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full  overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-1 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Question
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Answer
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
              {faqsEndUser &&
                faqsEndUser.map((faqsEndUser, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{faqsEndUser.faqs_question}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{renderHTML(remoteHTMLTags(faqsEndUser.faqs_answer))}</p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(faqsEndUser.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(faqsEndUser.faqs_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(faqsEndUser.faqs_nanoid)}
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
      } = await updateFaqs(formData.faqs_nanoid, {
        ...formData,
        ...formData.faqs_type_section,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [...faqsEndUser.filter((i) => i.faqs_nanoid !== formData.faqs_nanoid), ...message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setFaqsEndUser(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }
  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createFaqs({
        ...formData,
        faqs_type_section: 'endUser',
        created_at: undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...faqsEndUser, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setFaqsEndUser(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteFaqs(isDeleting)
      const newfaqs = faqsEndUser.filter((faqsEndUser) => faqsEndUser.faqs_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setFaqsEndUser(newfaqs)
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
        schema={faqsSchema}
        initialValue={
          !!openEditItem && openEditItem != 'create' ? faqsEndUser.find((i) => i.faqs_nanoid === openEditItem) : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}
      <HeaderEditor sectionName="endUser" />
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">User FAQs Setting</div>
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
          <FaqsTable />
        </div>
      </div>
    </>
  )
}

export default FaqsEndUserSettingComponent
