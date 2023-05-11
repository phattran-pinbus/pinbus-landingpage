import React from 'react'
import Image from 'next/image'

const BecomeContactComponent = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="h3 font-red-hat-display mb-4">Gửi tin nhắn</h3>
          </div>
          <form className="max-w-xl mx-auto">
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="phone">
                  Họ và tên <span className="text-red-600">*</span>
                </label>{' '}
                <input id="phone" type="tel" className="form-input w-full" placeholder="Họ và tên" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="phone">
                  Email <span className="text-red-600">*</span>
                </label>{' '}
                <input id="phone" type="tel" className="form-input w-full" placeholder="Email" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="phone">
                  Chủ đề <span className="text-red-600">*</span>
                </label>{' '}
                <input id="phone" type="tel" className="form-input w-full" placeholder="Chủ đề" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
              <div className="w-full px-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium" htmlFor="message">
                    Để lại lời nhắn
                  </label>{' '}
                  <span className="text-sm text-gray-500">Optional</span>
                </div>
                <textarea id="message" rows={4} className="form-textarea w-full" placeholder=""></textarea>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button className="btn text-white bg-teal-500 hover:bg-teal-400 w-full flex items-center">
                  <span>Gửi </span>{' '}
                  <svg
                    className="w-3 h-3 flex-shrink-0 mt-px ml-2"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-current"
                      d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BecomeContactComponent
