import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { policySchema } from '../../../forms'
import { getPolicy, updatePolicy } from '../../../utils/APIs'
import { IPolicy } from '../../../utils/interface'
import ModalFormComponent from '../../atoms/ModalFormComponent'
import HeaderEditor from '../HeaderEditor'

const TermAndConditionPageSetting = ({ sectionName }: { sectionName: string }) => {
  const [openEditItem, setOpenEditItem] = useState<string>('')
  const [content, setContent] = useState<IPolicy>(null)

  useEffect(() => {
    fetchPolicy(sectionName)
  }, [])

  const fetchPolicy = async (section_name) => {
    try {
      const {
        data: { message }
      } = await getPolicy(section_name)
      setContent(message[0])
    } catch (error) {
      console.error('err when get policy term and condition: ', error)
    }
  }

  const remoteHTMLTags = (content: string) => {
    return content && content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100) + '...'
  }

  const TermAndConditionTable = () => {
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
                  Content
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
              <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <p className="text-gray-900 whitespace-no-wrap">1</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <p className="text-gray-900 whitespace-no-wrap">{remoteHTMLTags(content?.policy_content)}</p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button
                    className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight mx-1"
                    onClick={() => setOpenEditItem(content.policy_nanoid)}
                  >
                    <span aria-hidden="true" className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                    <span className="relative">Edit</span>
                  </button>
                </td>
              </tr>
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
      } = await updatePolicy(formData.policy_nanoid, {
        ...formData,
        created_at: undefined
      })

      toast.success('Update successfully!')
      setOpenEditItem('')

      setContent({ ...message[0] })
    } catch (error) {
      console.error('err when submit: ', error)
    }
  }

  return (
    <>
      <ModalFormComponent
        isOpen={openEditItem}
        handleClose={() => setOpenEditItem('')}
        setOpen={setOpenEditItem}
        schema={policySchema}
        initialValue={!!openEditItem ? content : {}}
        onSubmit={({ formData }) => onSubmit(formData)}
      />

      <HeaderEditor sectionName={sectionName} />
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="text-xl font-inter">Privacy Policy setting</div>
        </div>
        <div className="container mx-auto px-4 ">
          <TermAndConditionTable />
        </div>
      </div>
    </>
  )
}

export default TermAndConditionPageSetting
