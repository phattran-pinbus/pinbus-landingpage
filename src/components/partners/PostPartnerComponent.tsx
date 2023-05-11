import React from 'react'
import Image from 'next/image'
import { IArticle } from '../../utils/interface'
import renderHtml from 'react-render-html'
import { SectionTitle } from '../atoms'

const PostPartnerComponent = ({ partners, content }: { partners: IArticle[]; content: any }) => {
  return (
    <section className="bg-dark-400">
      <SectionTitle
        title={content?.main_bg_title}
        desctiption={content?.main_bg_content?.[0]}
        bottomDivider
        color="light"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="lg:flex lg:justify-between">
            <div className="lg:flex-grow" data-aos="fade-down" data-aos-delay="200">
              <div className="grid gap-12 sm:grid-cols-3 sm:gap-x-6 md:gap-y-8">
                {partners &&
                  partners.map((item: IArticle) => (
                    <div
                      className="flex flex-col h-full p-6 bg-gray-800 shadow-xl rounded-md border-transparent"
                      key={item.article_nanoid}
                    >
                      <article className="flex flex-col h-full">
                        <header>
                          <div className="block mb-4">
                            <figure className="relative h-0 pb-9/16">
                              <Image
                                className="absolute inset-0 w-full h-full object-cover"
                                src={item?.article_url_img}
                                alt="News 01"
                                layout="fill"
                              />
                            </figure>
                          </div>
                          <a className="hover:underline">
                            <h3 className="h4 font-red-hat-display mb-2"> {item.article_title} </h3>
                          </a>
                        </header>
                        <p className="text-gray-400 font-inter font-normal flex-grow text-center render—html">
                          {renderHtml(item.article_content)}
                        </p>
                      </article>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostPartnerComponent
