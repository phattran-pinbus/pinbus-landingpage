import Image from 'next/image'
import React from 'react'
import { IPromotion } from '../../utils/interface'

const ListPostPromotionComponent = ({ promotions }: { promotions: IPromotion[] }) => {
  return (
    <section className="relative border-t border-transparent dark:border-gray-800">
      <div
        className="absolute inset-0 opacity-25 bg-gradient-to-b from-gray-800 to-gray-900 pointer-events-none hidden dark:block"
        aria-hidden="true"
      ></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div data-aos="fade-down" data-aos-delay="450">
            <div className="-mb-2">
              {promotions &&
                promotions.map((item: IPromotion, index) => (
                  <article className={`mb-2`} key={index}>
                    <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                      <div className="pl-6">
                        <div
                          className={`flex flex-col h-full p-6 bg-white dark:bg-gray-800 shadow border-2 border-transparent`}
                          key={item.promotion_nanoid}
                        >
                          <article className="flex flex-col h-full">
                            <header>
                              <a className="block mb-4" href="#0">
                                <figure className="relative h-0 pb-9/16">
                                  <Image
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src={item?.promotion_desktop_img}
                                    alt="promotion 01"
                                    layout="fill"
                                  />
                                </figure>
                              </a>
                            </header>
                          </article>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ListPostPromotionComponent
