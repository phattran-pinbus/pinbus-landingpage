import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { highlighLocationschema } from '../../../forms'
import { getDistrict, getProvince } from '../../../utils'
import {
  createHighlightPosition,
  deleteHighlightPosition,
  getHighlightLocation,
  updateHighlightPosition
} from '../../../utils/APIs'
import { IHighlightLocation } from '../../../utils/interface'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'

const HighlightLocationSettings = () => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [highlightLocations, sethighlightLocations] = useState<IHighlightLocation[]>()
  const [isDeleting, setIsDeleting] = useState<string>('')

  useEffect(() => {
    fetchHighlighLocation()
  }, [])

  const fetchHighlighLocation = async () => {
    try {
      const {
        data: { message }
      } = await getHighlightLocation()
      sethighlightLocations(message)
    } catch (error) {
      console.error('err when get highligh Locations: ', error)
    }
  }

  const HighlighLocationTable = () => {
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
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Address
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
                  Status
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Home display
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Province
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  District
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Fields
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Link
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
              {highlightLocations &&
                highlightLocations.map((highlightLocation, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{highlightLocation.highlight_position_title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{highlightLocation.highlight_position_address}</p>
                    </td>
                    <td className="px-0 py-0 border-b border-gray-200 bg-white text-sm w-32">
                      <figure className="relative pb-9/16">
                        <Image
                          src={highlightLocation.highlight_position_img}
                          alt={highlightLocation.highlight_position_nanoid}
                          layout="fill"
                          className="w-32 h-32 object-cover"
                        />
                      </figure>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {highlightLocation.highlight_position_status ? (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Open</span>
                        </span>
                      ) : (
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Close</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      {highlightLocation.display_on_home ? (
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
                      <p className="text-gray-900 whitespace-no-wrap">
                        {getProvince(highlightLocation.highlight_position_province)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {getDistrict(highlightLocation.highlight_position_district)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{highlightLocation.highlight_position_fields}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <a
                        href={highlightLocation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-300"
                      >
                        Link
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(highlightLocation.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <div className="flex justify-center">
                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                          onClick={() => setOpenEditItem(highlightLocation.highlight_position_nanoid)}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Edit</span>
                        </button>

                        <button
                          className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                          onClick={() => setIsDeleting(highlightLocation.highlight_position_nanoid)}
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
    console.log('formData', formData)

    try {
      const {
        data: { message }
      } = await updateHighlightPosition(formData.highlight_position_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      const newContent = [
        ...highlightLocations.filter((i) => i.highlight_position_nanoid !== formData.highlight_position_nanoid),
        ...message
      ].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

      sethighlightLocations(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await createHighlightPosition({
        ...formData,
        created_at: undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...highlightLocations, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      sethighlightLocations(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteHighlightPosition(isDeleting)
      const newHighLightLocation = highlightLocations.filter(
        (highlighLocations) => highlighLocations.highlight_position_nanoid !== isDeleting
      )
      toast.success('Delete successfully!')
      setIsDeleting('')
      sethighlightLocations(newHighLightLocation)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={openEditItem}
        handleClose={() => setOpenEditItem('')}
        setOpen={setOpenEditItem}
        schema={highlighLocationschema}
        initialValue={
          !!openEditItem && openEditItem != 'create'
            ? highlightLocations.find((i) => i.highlight_position_nanoid === openEditItem)
            : {}
        }
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmit(formData) : onCreate(formData))}
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Location settings</div>
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
          <HighlighLocationTable />
        </div>
      </div>
    </>
  )
}

export default HighlightLocationSettings
