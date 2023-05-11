import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { heroSchema } from '../../forms'
import { getHeroSection, updateHomeSection } from '../../utils/APIs'
import { IHeroSection } from '../../utils/interface'
import ModalFormComponent from '../atoms/ModalFormComponent'
import Image from 'next/image'
import RenderHTML from '../atoms/RenderHTML'

const HeaderEditor = ({ sectionName }: { sectionName: string }) => {
  const [content, setContent] = useState<IHeroSection>({})
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { message }
        } = await getHeroSection(sectionName)
        setContent(message[0])
      } catch (error) {
        console.error('err when get hero section: ', error)
      }
    }

    fetchData()
  }, [sectionName])

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateHomeSection(formData.main_bg_nanoid, {
        ...formData,
        main_bg_sub_title: undefined
      })

      toast.success('Update successfully!')
      setOpenEdit(false)
      setContent(message[0])
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={openEdit}
        setOpen={setOpenEdit}
        handleClose={() => setOpenEdit(false)}
        schema={heroSchema}
        initialValue={content}
        onSubmit={({ formData }) => onSubmit(formData)}
      />

      <div className="relative bg-white p-6 mb-4">
        <div className="items-center flex justify-between mb-4">
          <div className="text-xl font-inter">Header</div>
          <div>
            <button
              className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center"
              onClick={() => setOpenEdit(true)}
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              </span>
              <span>Edit</span>
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4 ">
          <div className="inline-block min-w-full overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
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
                    Content
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center w-64">
                    <p className="text-gray-900 whitespace-no-wrap">{content.main_bg_title || '-'}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <figure className="relative pb-9/16">
                      {content.main_bg_url_img && (
                        <Image
                          src={content.main_bg_url_img}
                          alt={content.main_bg_title}
                          layout="fill"
                          className="w-32 h-32 object-cover"
                        />
                      )}
                    </figure>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-72 text-center">
                    <RenderHTML content={content.main_bg_content}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderEditor
