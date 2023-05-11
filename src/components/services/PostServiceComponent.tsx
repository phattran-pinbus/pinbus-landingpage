import React from 'react'
import { IArticle } from '../../utils/interface'
import renderHTML from 'react-render-html'

const PostServiceComponent = ({ services }: { services: IArticle[] }) => {
  return (
    <section className="bg-dark-400">
      {services &&
        services.map((item: IArticle, index) => (
          <div
            className={`min-w-screen flex items-center p-5 lg:p-10 overflow-hidden relative bg-dark-400 ${
              index % 2 === 0 ? 'bg-dark-400' : 'bg-primary-400'
            }`}
            key={index}
          >
            <div className="w-full max-w-7xl rounded-2xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left" data-aos="fade-down" data-aos-delay="450">
              {/* <div className="w-full max-w-6xl rounded-2xl bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left"> */}
              <div className="md:flex items-center -mx-10">
                {item.article_url_img && (
                  <div className={`w-full md:w-1/2 px-10 mb-10 md:mb-0 ${index % 2 !== 0 && 'order-1'}`}>
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.article_url_img} className="w-full relative z-10" alt="" />
                      {/* <div className="border-4 border-gray-800 absolute top-10 bottom-10 left-10 right-10 z-0"></div> */}
                    </div>
                  </div>
                )}
                <div className={`w-full ${item.article_url_img && 'md:w-1/2'} px-10`}>
                  <div className="mb-10">
                    <h1
                      className={`font-bold uppercase mb-5 font-inter lg:text-title text-text-hero-mobile ${
                        index % 2 === 0 && 'text-gray-100'
                      }`}
                    >
                      {item.article_title}
                    </h1>
                    <p className={`render—html text-md ${index % 2 === 0 && 'text-gray-400'}`}>
                      {renderHTML(item.article_content)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}

export default PostServiceComponent
