import React from 'react'
import renderHTML from 'react-render-html'
import { IFaqs } from '../../utils/interface'
import CollapseComponent from '../atoms/CollapseComponent'

const ListPostFaqsMerchantComponent = ({ faqsMerchant, loading }: { faqsMerchant: IFaqs[]; loading: boolean }) => {
  return (
    <section className="relative bg-dark-400">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div data-aos="fade-down" data-aos-delay="450">
            <div className="-mb-2">
              {loading && (
                <div className="flex items-center justify-center space-x-2 animate-pulse">
                  <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-primary-400 rounded-full"></div>
                </div>
              )}

              {faqsMerchant &&
                faqsMerchant.map((item: IFaqs, index) => (
                  <article className={`mb-2`} key={index}>
                    <div className="flex pr-6 py-5 bg-gray-800 shadow-xl rounded-md border-transparent divide-x divide-primary-400">
                      <div className="flex items-center px-4 sm:px-8 text-primary-400">
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
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="pl-6">
                        <div className="relative">
                          <CollapseComponent title={item.faqs_question} onEdit={null} faqsStatus={true}>
                            <div className="text-gray-400 bg-gray-800 p-6 render—html">{renderHTML(item.faqs_answer)}</div>
                          </CollapseComponent>
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

export default ListPostFaqsMerchantComponent
