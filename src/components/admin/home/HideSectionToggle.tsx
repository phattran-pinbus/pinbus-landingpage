import React from 'react'
import { toast } from 'react-toastify'
import Toggle from 'react-toggle'
import { updateSection } from '../../../utils/APIs'
import { ISectionProps } from '../../../utils/interface'

const HideSectionToggle = ({ sectionData }: { sectionData: ISectionProps }) => {
  const handleChange = async (e) => {
    try {
      const {
        data: { message }
      } = await updateSection(sectionData.home_nanoid, {
        ...sectionData,
        home_description: undefined,
        home_visible: e.target.checked ? true : false
      })
      toast.success('Update successfully!')
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }
  return (
    <div className="flex items-center">
      <span id="biscuit-label" className="text-xl font-light text-gray-600 mb-2 md:mb-0 mr-4">
        Enable this section?
      </span>
      <Toggle
        id="biscuit-status"
        defaultChecked={sectionData?.home_visible || false}
        aria-labelledby="biscuit-label"
        onChange={handleChange}
      />
    </div>
  )
}

export default HideSectionToggle
