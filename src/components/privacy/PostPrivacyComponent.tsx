import React from 'react'
import renderHTML from 'react-render-html'
import { IPolicy } from '../../utils/interface'

const PostPrivacyComponent = ({ privacy }: { privacy: IPolicy }) => {
  return (
    <section className="relative bg-dark-400">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-lg text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="450">
              <div className="mb-8">
                <div className="flex flex-col h-full">
                  <div className="font-normal font-inter text-gray-400 render—html">
                    {privacy.policy_content && renderHTML(privacy.policy_content)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PostPrivacyComponent
