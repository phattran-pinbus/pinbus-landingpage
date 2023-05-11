import React, { useState } from 'react'
import { createAds } from '../../utils/APIs/home'
import { provines } from '../../utils/constants'
import { IAds } from '../../utils/interface'
import ThankYouComponent from '../atoms/ThankYouComponent'

const BecomeAdsComponent = () => {
  const [formData, setFormData] = useState<IAds>({
    ads_company_name: '',
    ads_company_address: '',
    ads_city_name: provines[0].value,
    ads_job_name: '',
    ads_vicegerent: '',
    ads_phone_number: '',
    ads_email: ''
  })
  const [isSubmited, setIsSubmited] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createAds(formData)
      setIsSubmited(true)
    } catch (error) {
      console.error('err when create ads: ', error)
    }
  }

  return (
    <section className="relative bg-dark-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-12 pb-12 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 font-inter mb-4 text-gray-100 uppercase">Đăng Ký quảng cáo</h1>
          </div>

          {!isSubmited ? (
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="company-name">
                    Tên Cửa hàng/ công ty <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="company-name"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_company_name: e.target.value })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="address">
                    Địa chỉ kinh doanh <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="address"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_company_address: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="country">
                    Thành phố <span className="text-red-600">*</span>
                  </label>{' '}
                  <select
                    id="country"
                    className="form-select w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_city_name: e.target.value })}
                  >
                    {provines &&
                      provines.map((provine, index) => (
                        <option key={index} value={provine.value}>
                          {provine.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="fields">
                    Ngành nghề Kinh doanh <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="fields"
                    type="tel"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_job_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="representative">
                    Họ tên người đại diện <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="representative"
                    type="tel"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_vicegerent: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="phone-number">
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="phone-number"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_phone_number: e.target.value })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </label>{' '}
                  <input
                    id="email"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, ads_email: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-primary-400 bg-gray-800 hover:bg-primary-600 flex-shrink-0 rounded-3xl w-full flex items-center">
                    <button type="submit">Gửi </button>
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
          ) : (
            <ThankYouComponent />
          )}
        </div>
      </div>
    </section>
  )
}

export default BecomeAdsComponent
