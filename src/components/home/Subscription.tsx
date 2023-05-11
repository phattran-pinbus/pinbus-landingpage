import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createUserPromotionNews } from '../../utils/APIs'
import { IUserPromotionNews } from '../../utils/interface'

const defaultValue = {
  promotion_news_name: undefined,
  promotion_news_email: undefined,
  promotion_news_phone_number: undefined
}

const Subscription = () => {
  const [formData, setFormData] = useState<IUserPromotionNews>(defaultValue)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUserPromotionNews(formData)
      toast.success('Đăng ký nhận tin khuyến mãi thành công!')
      setFormData(defaultValue)
    } catch (error) {
      console.error('err when create user promotion news: ', error)
    }
  }

  return (
    <section>
      <div className="relative bg-primary-400 md:px-12 mx-auto px-4  py-8 max-w-7xl" data-aos="fade-down" data-aos-delay="450">
        <div className="absolute -bottom-1 invisible lg:visible flex justify-start">
          <div className="w-2/3">
            <Image className="" src={require('../../assets/images/2phones.png').default} alt="Image Size 720x400" />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
          <div className="relative flex justify-end">
            <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
              <div className="items-center">
                <h4 className="h4 font-inter text-gray-800 mb-4 text-center">ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h4>
                <div className="flex flex-col justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                  <div className="mb-4">
                    <label className="text-gray-800">
                      Tên(<span className="text-red-400">*</span>)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.promotion_news_name}
                      className="w-full mb-2 text-gray-800 sm:mb-0 sm:mr-2 bg-primary-200 border-none rounded-lg"
                      onChange={(e) => setFormData({ ...formData, promotion_news_name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-800">
                      Email(<span className="text-red-400">*</span>)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.promotion_news_email}
                      className="w-full mb-2 text-gray-800 sm:mb-0 sm:mr-2 bg-primary-200 border-none rounded-lg"
                      onChange={(e) => setFormData({ ...formData, promotion_news_email: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-gray-800">Số điện thoại</label>
                    <input
                      type="tel"
                      value={formData.promotion_news_phone_number}
                      className="w-full mb-2 text-gray-800 sm:mb-0 sm:mr-2 bg-primary-200 border-none rounded-lg"
                      onChange={(e) => setFormData({ ...formData, promotion_news_phone_number: e.target.value })}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="btn text-gray-400 bg-dark-400 hover:text-primary-400 flex-shrink-0 rounded-3xl"
                    type="submit"
                  >
                    Đăng Ký
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscription
