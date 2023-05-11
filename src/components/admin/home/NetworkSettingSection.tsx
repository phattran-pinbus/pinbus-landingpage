import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  createContentSection,
  deleteContentSection,
  getContentSectionById,
  updateContentSection,
  updateSection
} from '../../../utils/APIs'
import { ISectionContent, ISectionProps } from '../../../utils/interface'
import { SectionTitle } from '../../atoms'
import CollapseComponent from '../../atoms/CollapseComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import { headerSchema, homeNetworkSchema } from '../../../forms'
import renderHTML from 'react-render-html'
import ModalConfirmComponent from '../../atoms/ModalConfirmComponent'
import Image from 'next/image'

const NetworkSettingSection = ({ sectionHeaderData }: { sectionHeaderData: ISectionProps }) => {
  const [content, setContent] = React.useState<ISectionContent[]>(null)
  const [openEditHeader, setOpenEditHeader] = useState(false)
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<string>('')
  const [header, setHeader] = useState(sectionHeaderData)

  const enrichContentToEdit = (contentId) => {
    const item = content?.find((item) => item.home_detail_nanoid === contentId)
    return {
      ...item,
      media_url: item?.home_detail_media?.media_url,
      media_nanoid: item?.home_detail_media?.media_nanoid
    }
  }

  useEffect(() => {
    if (sectionHeaderData?.home_nanoid) {
      fetchSectionContent(sectionHeaderData?.home_nanoid)
      setHeader(sectionHeaderData)
    }
  }, [sectionHeaderData])

  const fetchSectionContent = async (sectionId) => {
    try {
      const {
        data: { message }
      } = await getContentSectionById(sectionId)
      setContent(message)
    } catch (error) {
      console.error('err when get section: ', error)
    }
  }

  const TableComponent = () => {
    return (
      <table className="table p-4 w-full bg-white">
        <thead>
          <tr>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">#</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Title</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Subtitle</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Content</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Image</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Link</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {content &&
            content.map((item, index) => (
              <tr className="text-gray-700" key={item.home_detail_nanoid}>
                <td className="border-b-2 p-4 dark:border-dark-5 text-center">{index + 1}</td>
                <td className="border-b-2 p-4 dark:border-dark-5 text-center">{item.home_detail_title}</td>
                <td className="border-b-2 p-4 dark:border-dark-5">{item.home_detail_content[0]}</td>
                <td className="border-b-2 p-4 dark:border-dark-5">
                  {item.home_detail_description && renderHTML(item.home_detail_description)}
                </td>
                <td className="border-b-2 p-4 dark:border-dark-5 text-center w-64">
                  <figure className="relative pb-9/16">
                    {item.home_detail_media?.media_url && (
                      <Image
                        src={item.home_detail_media?.media_url}
                        alt={item.home_detail_nanoid}
                        layout="fill"
                        className="w-32 h-32 object-cover"
                      />
                    )}
                  </figure>
                  {/* {item.home_detail_media.slice(0, 5)} */}
                </td>
                {item.home_detail_link ? (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <a
                      href={item.home_detail_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-300"
                    >
                      Link
                    </a>
                  </td>
                ) : (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"> </td>
                )}
                <td className="border-b-2 p-4 dark:border-dark-5 text-center">
                  <button onClick={() => setOpenEditItem(item.home_detail_nanoid)}>
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight mx-1"
                    onClick={() => setIsDeleting(item.home_detail_nanoid)}
                  >
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
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  const Preview = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row bg-white px-2 mx-4 py-4 rounded-xl">
          <p className="text-xl font-light text-gray-600 mb-2 md:mb-0 flex items-center">
            Header section
            <button className="ml-4" onClick={() => setOpenEditHeader(true)}>
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </p>
        </div>

        <div className="text-center pb-8">
          {header && header.home_title ? (
            <SectionTitle title={header.home_title} desctiption={header.home_description} />
          ) : (
            'There are no section header data'
          )}
        </div>

        <div className="flex flex-col md:flex-row bg-white px-2 mx-4 py-4 rounded-xl justify-between">
          <p className="text-xl font-light text-gray-600 mb-2 md:mb-0">Content</p>
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

        <div className="px-6">
          <TableComponent />
        </div>
      </div>
    )
  }

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateSection(formData.home_nanoid, formData)
      toast.success('Update successfully!')
      setOpenEditHeader(false)
      setHeader(message[0])
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onSubmitContent = async (formData: any) => {
    console.log('formData: ', formData)

    try {
      const {
        data: { message }
      } = await updateContentSection(formData.home_detail_nanoid, {
        ...formData,
        home_nanoid: formData.home_nanoid.home_nanoid,
        home_detail_content: JSON.stringify(formData.home_detail_content),
        home_detail_description: formData.home_detail_description,
        created_at: undefined,
        article_nanoid: undefined,
        home_detail_link: formData.home_detail_link ? formData.home_detail_link : undefined,
        home_detail_video: undefined,
        home_detail_media: undefined
      })
      toast.success('Update successfully!')
      setOpenEditItem('')
      const newContent = [
        ...content.filter((i) => i.home_detail_nanoid !== formData.home_detail_nanoid),
        ...message
      ].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      setContent(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const onCreate = async (formData: any) => {
    console.log('formData: ', formData)

    try {
      const {
        data: { message }
      } = await createContentSection({
        ...formData,
        home_nanoid: sectionHeaderData?.home_nanoid,
        home_detail_content: JSON.stringify(formData.home_detail_content),
        home_detail_description: formData.home_detail_description,
        created_at: undefined,
        article_nanoid: undefined,
        home_detail_link: formData.home_detail_link ? formData.home_detail_link : undefined,
        home_detail_video: undefined,
        home_detail_media: undefined
      })
      toast.success('Create successfully!')
      setOpenEditItem('')
      const newContent = [...content, message].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      setContent(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      console.log('delete: ', isDeleting)

      await deleteContentSection(isDeleting)
      const newContent = content.filter((i) => i.home_detail_nanoid !== isDeleting)
      toast.success('Delete successfully!')
      setIsDeleting('')
      setContent(newContent)
    } catch (error) {
      console.error('err when delete: ', error)
    }
  }

  return (
    <div className="relative">
      <ModalFormComponent
        isOpen={openEditHeader}
        setOpen={setOpenEditHeader}
        handleClose={() => setOpenEditHeader(false)}
        schema={headerSchema}
        initialValue={header}
        onSubmit={({ formData }) => onSubmit(formData)}
        key="network-header"
      />

      {!!isDeleting && <ModalConfirmComponent onCancel={() => setIsDeleting('')} onConfirm={() => handleDelete()} />}

      <ModalFormComponent
        isOpen={!!openEditItem}
        setOpen={setOpenEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={homeNetworkSchema}
        // initialValue={!!openEditItem ? content.find((i) => i.home_detail_nanoid === openEditItem) : {}}
        // onSubmit={({ formData }) => onSubmitContent(formData)}
        initialValue={!!openEditItem && openEditItem != 'create' ? enrichContentToEdit(openEditItem) : {}}
        onSubmit={({ formData }) => (openEditItem != 'create' ? onSubmitContent(formData) : onCreate(formData))}
        key="network-item"
      />

      <CollapseComponent title="Network section" onEdit={null}>
        <Preview />
      </CollapseComponent>
    </div>
  )
}

export default NetworkSettingSection
