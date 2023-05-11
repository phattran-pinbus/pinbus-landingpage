import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../layout/main'

const ErrorPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <main className="flex-grow">
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true"></div>
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="relative inline-flex justify-center items-center">
                    <Image
                      className="hidden sm:block opacity-50 md:opacity-80"
                      src={require('../assets/images/404.jpg').default}
                      width="768"
                      height="432"
                      alt="404"
                    />
                    <div
                      className="hidden sm:block absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900"
                      aria-hidden="true"
                    ></div>
                    <div className="sm:absolute w-full">
                      <h4 className="h4 font-inter mb-8 py-4 px-3">
                        Có thể liên kết đã hỏng hoặc trang đã bị gỡ. Hãy kiểm tra xem liên kết mà bạn đang cố mở có
                        chính xác không.
                      </h4>
                      <Link href="/">
                        <a className="btn text-gray-700 bg-primary-400 hover:bg-primary-200 inline-flex items-center">
                          <span>Trở về trang chủ</span>
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
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  )
}

export default ErrorPage
