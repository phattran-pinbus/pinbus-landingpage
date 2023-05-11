import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { userSchema } from '../../../forms'
import { createAdminUser, deleteAdminUser, getAdminUser, updateArticle } from '../../../utils/APIs'
import { IAdmin } from '../../../utils/interface'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'

const AdminManagementSettingComponent = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [admin, setAdmin] = useState<IAdmin[]>([])
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchAdminUser()
  }, [])

  const fetchAdminUser = async () => {
    try {
      const {
        data: { message }
      } = await getAdminUser()
      setAdmin(message)
    } catch (error) {
      console.error('err when get admin: ', error)
    }
  }

  const AboutUsTable = () => {
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
                  Email
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Role
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
              {admin &&
                admin.map((admin, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{admin.email}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">{admin.role}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(admin.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex justify-center">
                        {/* <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(admin.user_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button> */}

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1 justify-center"
                          onClick={() => setIsDeleting(admin.user_nanoid)}
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
      } = await updateArticle(formData.user_nanoid, {
        ...formData,
        article_description: undefined,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [...admin.filter((i) => i.user_nanoid !== formData.user_nanoid), ...message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )

      setAdmin(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onCreateUser = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createAdminUser({
        ...formData
      })
      const newContent = [...admin, message].sort(
        (a, b) => new Date(a.article_created_at).getTime() - new Date(b.article_created_at).getTime()
      )
      setAdmin(newContent)
      setOpenEditItem('')
      toast.success('create successfully')
    } catch (error) {
      console.error('err when create product: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAdminUser(isDeleting)
      const newContent = admin.filter((i) => i.user_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setAdmin(newContent)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={!!openEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={userSchema}
        initialValue={
          !!openEditItem && openEditItem != 'create' ? admin.find((i) => i.user_nanoid === openEditItem) : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreateUser(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}

      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Admin User Setting</div>
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
          <AboutUsTable />
        </div>
      </div>
    </>
  )
}

export default AdminManagementSettingComponent
