import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { heroSchemaSubTitle } from '../../../forms'
import { getAllSlideHome, updateSlideHome } from '../../../utils/APIs'
import { ISlideHome } from '../../../utils/interface'
import CollapseComponent from '../../atoms/CollapseComponent'
import ModalFormComponent from '../../atoms/ModalFormComponent'

const HeroSettingComponent = () => {
  const [sections, setSections] = useState<ISlideHome[]>()
  const [openEdit, setOpenEdit] = useState(false)

  useEffect(() => {
    fetchHeroSection()
  }, [])

  const fetchHeroSection = async () => {
    try {
      const {
        data: { message }
      } = await getAllSlideHome()
      setSections(message[0])
    } catch (error) {
      console.error('err when get section: ', error)
    }
  }

  const Preview = () => {
    return (
      <div className="bg-white rounded-lg rounded-t-none shadow-lg">
        <div className="flex flex-col md:flex-row bg-white py-6 px-2 mx-4 rounded-xl">
          <p className="text-xl font-light text-gray-600 mb-2 md:mb-0 flex items-center">
            Header section
            <button className="ml-4" onClick={() => setOpenEdit(true)}>
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
      </div>
    )
  }

  const onSubmit = async (formData: any) => {
    try {
      const {
        data: { message }
      } = await updateSlideHome(formData.slide_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEdit(false)
      setSections(message)
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  return (
    <div className="relative">
      <ModalFormComponent
        isOpen={openEdit}
        setOpen={setOpenEdit}
        handleClose={() => setOpenEdit(false)}
        schema={heroSchemaSubTitle}
        initialValue={sections}
        onSubmit={({ formData }) => onSubmit(formData)}
      />
      <CollapseComponent title="Hero background section">
        <Preview />
      </CollapseComponent>
    </div>
  )
}

export default HeroSettingComponent
