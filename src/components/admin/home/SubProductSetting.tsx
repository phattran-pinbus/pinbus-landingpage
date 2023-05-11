import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'
import { toast } from 'react-toastify'
import { featureSchema } from '../../../forms'
import { getContentSectionById, updateContentSection } from '../../../utils/APIs'
import { ISectionContent, ISectionProps } from '../../../utils/interface'
import CollapseComponent from '../../atoms/CollapseComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'

const SubProductSetting = ({ sectionHeaderData }: { sectionHeaderData: ISectionProps }) => {
  const [content, setContent] = React.useState<ISectionContent[]>(null)
  const [openEditItem, setOpenEditItem] = useState<string>('')

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

  const remoteHTMLTags = (content: string) => {
    return content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
  }

  const TableComponent = () => {
    return (
      <table className="table p-4 w-full bg-white">
        <thead>
          <tr>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">#</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Icon</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Title</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Content</th>
            <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-bold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {content &&
            content.map((item, index) => (
              <tr className="text-gray-700" key={item.home_detail_nanoid}>
                <td className="border-b-2 p-4 dark:border-dark-5 text-center">{index + 1}</td>
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
                <td className="border-b-2 p-4 dark:border-dark-5 text-center">{item.home_detail_title}</td>
                <td className="border-b-2 p-4 dark:border-dark-5">
                  {item.home_detail_content[0] && renderHTML(remoteHTMLTags(item.home_detail_content[0]))}
                </td>
                <td className="border-b-2 p-4 dark:border-dark-5">
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
          <p className="text-xl font-light text-gray-600 mb-2 md:mb-0">Content</p>
        </div>

        <div className="px-6">
          <TableComponent />
        </div>
      </div>
    )
  }

  const onSubmitContent = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateContentSection(formData.home_detail_nanoid, {
        ...formData,
        home_nanoid: formData.home_nanoid.home_nanoid,
        home_detail_content: JSON.stringify(formData.home_detail_content),
        created_at: undefined,
        article_nanoid: undefined,
        home_detail_link: undefined,
        home_detail_video: undefined,
        home_detail_description: undefined
      })
      toast.success('Update successfully!')
      setOpenEditItem('')
      const newContent = [...content.filter((i) => i.home_detail_nanoid !== formData.home_detail_nanoid), ...message]
      setContent(newContent)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  return (
    <div className="relative">
      <ModalFormComponent
        isOpen={!!openEditItem}
        setOpen={setOpenEditItem}
        handleClose={() => setOpenEditItem('')}
        schema={featureSchema}
        initialValue={!!openEditItem ? enrichContentToEdit(openEditItem) : {}}
        onSubmit={({ formData }) => onSubmitContent(formData)}
        key="sub-product-item"
      />

      <CollapseComponent title="Sub-Products section" onEdit={null}>
        <Preview />
      </CollapseComponent>
    </div>
  )
}

export default SubProductSetting
