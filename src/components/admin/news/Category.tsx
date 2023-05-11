import React, { useEffect, useState } from 'react'
import { createCategory, deleteCategory, getCategory, updateCategory } from '../../../utils/APIs'
import { ICategory } from '../../../utils/interface'
import HeaderEditor from '../HeaderEditor'
import Image from 'next/image'
import moment from 'moment'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { categorySchema } from '../../../forms'
import { toast } from 'react-toastify'
import renderHtml from 'react-render-html'

const Category = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const {
        data: { message }
      } = await getCategory()
      setCategories(message)
    } catch (error) {
      console.error('err when get categories: ', error)
    }
  }

  const CategoryTable = () => {
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
                  Category
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
              {categories &&
                categories.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {renderHtml(item.category_name)}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex justify-center">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(item.category_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(item.category_nanoid)}
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
      } = await updateCategory(formData.category_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [...categories.filter((i) => i.category_nanoid !== formData.category_nanoid), ...message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )

      setCategories(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCategory(isDeleting)
      const newContent = categories.filter((i) => i.category_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setCategories(newContent)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createCategory({
        ...formData,
        created_at: undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...categories, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setCategories(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={!!openEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={categorySchema}
        initialValue={
          !!openEditItem && openEditItem != 'create' ? categories.find((i) => i.category_nanoid === openEditItem) : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}

      <div className="relative bg-white p-6">
        <div className="items-center flex mb-4 justify-between">
          <div className="text-xl font-inter">Category</div>
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

        <div className="mx-auto px-4 ">
          <CategoryTable />
        </div>
      </div>
    </>
  )
}

export default Category
