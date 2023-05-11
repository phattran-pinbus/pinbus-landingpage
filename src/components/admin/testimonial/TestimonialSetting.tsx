import React, { useEffect, useState } from 'react'
import { createTestimonial, deleteTestimonial, getTestimonialSection, updateTestimonial } from '../../../utils/APIs'
import { ITestimonials } from '../../../utils/interface'
import Image from 'next/image'
import moment from 'moment'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { testimonialSchema } from '../../../forms'
import { toast } from 'react-toastify'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'

const TestimonialSetting = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [testimonials, setTestimonials] = useState<ITestimonials[]>()
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchTestimonial()
  }, [])

  const fetchTestimonial = async () => {
    try {
      const {
        data: { message }
      } = await getTestimonialSection()
      setTestimonials(message)
    } catch (error) {
      console.error('err when get testimonials: ', error)
    }
  }

  const TestimonialTable = () => {
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
                  Avatar
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Comment
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Testimonial Name
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Position Name
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-36">
                      <figure className="relative pb-9/16">
                        <Image
                          src={testimonial.testimonial_avatar}
                          alt={testimonial.testimonial_nanoid}
                          layout="fill"
                          className="w-32 h-32 object-cover"
                        />
                      </figure>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{testimonial.testimonial_content}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{testimonial.testimonial_name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {testimonial.testimonial_position_company_name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(testimonial.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(testimonial.testimonial_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(testimonial.testimonial_nanoid)}
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
      } = await updateTestimonial(formData.testimonial_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [
        ...testimonials.filter((i) => i.testimonial_nanoid !== formData.testimonial_nanoid),
        ...message
      ].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

      setTestimonials(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createTestimonial({
        ...formData,
        created_at: undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...testimonials, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setTestimonials(newContent)
    } catch (error) {
      console.error('err when create submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTestimonial(isDeleting)
      const newTestimonial = testimonials.filter((testimonial) => testimonial.testimonial_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setTestimonials(newTestimonial)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={!!openEditItem}
        setOpen={setOpenEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={testimonialSchema}
        initialValue={
          !!openEditItem && openEditItem !== 'create'
            ? testimonials.find((i) => i.testimonial_nanoid === openEditItem)
            : {}
        }
        onSubmit={({ formData }) =>
          !!openEditItem && openEditItem !== 'create' ? onSubmit(formData) : onCreate(formData)
        }
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Testimonial settings</div>
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
        <div className="container mx-auto px-4 ">
          <TestimonialTable />
        </div>
      </div>
    </>
  )
}

export default TestimonialSetting
