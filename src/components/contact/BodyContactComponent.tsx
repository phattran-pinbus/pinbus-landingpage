import React from 'react'
import BecomeContactComponent from './BecomeContact'

const BodyContactComponent = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="lg:flex lg:justify-between">
            <div className="lg:flex-grow" data-aos="fade-down" data-aos-delay="200">
              <BecomeContactComponent />
            </div>
            <aside className="lg:flex-grow" data-aos="fade-down" data-aos-delay="200">
              <div className="pb-5">
                <p className="text-xl text-gray-900 dark:text-gray-200">Địa chỉ</p>
                <p className="text-sl text-gray-300 dark:text-gray-200">
                  Tầng 4, Tòa nhà số 2, Đường số 57 – TML, Phường Thạnh Mỹ Lợi, Tp. Thủ Đức
                </p>
              </div>
              <div className="pb-5">
                <p className="text-xl text-gray-900 dark:text-gray-200">Phone</p>
                <p className="text-xl text-gray-400 dark:text-gray-400">1900 636 529</p>
              </div>
              <div className="pb-5">
                <p className="text-xl text-gray-900 dark:text-gray-200">Email</p>
                <p className="text-xl text-gray-400 dark:text-gray-400">cskh@pinbus.vn</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BodyContactComponent
