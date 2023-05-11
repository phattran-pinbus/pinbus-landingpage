import { useRouter } from 'next/router'
import React from 'react'

const ThankYouComponent = () => {
  const Router = useRouter()

  return (
    <>
      <div className="flex justify-center text-center">
        <div className="text-2xl font-inter mb-4 text-gray-100 max-w-3xl">
          Cảm ơn bạn đã gửi thông tin đến Pinbus. Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất!
        </div>
      </div>
      <div className="flex justify-center text-center">
        <div className="lg:w-1/4 w-1/2 px-3">
          <button
            className="btn text-primary-400 bg-gray-800 hover:bg-primary-200 hover:text-gray-700 flex-shrink-0 rounded-3xl w-full flex items-center"
            onClick={() => Router.push('/')}
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
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <div>Trở về trang chủ</div>
          </button>
        </div>
      </div>
    </>
  )
}

export default ThankYouComponent
