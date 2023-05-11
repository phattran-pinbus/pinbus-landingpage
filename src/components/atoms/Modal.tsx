import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

type ModalProps = {
  children: React.ReactNode
  show: boolean
  handleClose: () => void
  size?: string
}

function Modal({ children, show, handleClose, size = 'md' }: ModalProps) {
  const modalContent = useRef(null)
  // close the modal if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return
      handleClose()
    }
    document.addEventListener('keydown', keyHandler)

    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity">
          <div className="py-20 fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6">
            <div
              className={`bg-white overflow-auto ${
                size === 'md' ? 'max-w-3xl' : 'max-w-6xl'
              } w-full max-h-full relative`}
              ref={modalContent}
            >
              {children}
              <button
                type="button"
                className="absolute top-0 right-0 p-2 -ml-4 mr-0 text-gray-500 hover:text-gray-900 focus:outline-none bg-gray-800"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
