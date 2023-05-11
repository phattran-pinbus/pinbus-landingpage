import React from 'react'
import Collapsible from 'react-collapsible'

type Props = {
  title: string
  children: any
  onEdit?: any
  faqsStatus?: boolean
}

const CollapseComponent: React.FC<Props> = ({ title, children, onEdit, faqsStatus }) => {
  return (
    <Collapsible
      transitionTime={100}
      trigger={
        <div
          className={
            !faqsStatus
              ? 'flex justify-between bg-white p-6 border-gray-100  border-b items-center'
              : 'flex justify-between bg-gray-800 p-6 border-gray-100  border-b items-center'
          }
        >
          <div className="text-xl font-inter hover:text-primary-400">{title}</div>
          <div className="text-center">
            {onEdit && (
              <button
                className="btn text-primary-400 bg-gray-800 hover:bg-primary-400 hover:text-gray-700 flex-shrink-0 rounded-3xl"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
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
                Edit
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="bg-white">{children}</div>
    </Collapsible>
  )
}

export default CollapseComponent
