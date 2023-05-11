import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createPartner } from '../../utils/APIs'
import { provines } from '../../utils/constants'
import { IPartner } from '../../utils/interface'
import ThankYouComponent from '../atoms/ThankYouComponent'
import { toast } from 'react-toastify'
import axios from 'axios'

const BecomePartnerComponent = (props) => {
  const router = useRouter()
  const query = router.query
  const [existPartner, setExistPartner] = useState([])

  const [formData, setFormData] = useState<IPartner>({
    partner_nanoid: undefined,
    partner_company_name: '',
    partner_company_address: '',
    partner_city_name: provines[0].value,
    partner_phone_number: '',
    partner_email: '',
    partner_description: undefined
  })

  const [isSubmited, setIsSubmited] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const enrichedPhoneNumber =
      formData.partner_phone_number[0] === '0'
        ? formData.partner_phone_number.slice(0, formData.partner_phone_number.length)
        : `0${formData.partner_phone_number}`

    try {
      await createPartner({
        ...formData,
        partner_phone_number: enrichedPhoneNumber,
        source: query?.utm_source ? query?.utm_source?.toString() : 'pinbus',
        tracking_id: query?.aff_sid ? query?.aff_sid?.toString() : undefined,
        status: '0'
      })
      setIsSubmited(true)
    } catch (error) {
      toast.error('Bạn đã gửi thông tin cho Pinbus trước đó. Chúng tôi sẽ liên hệ lại với bạn sớm nhất!')
    }
  }

  useEffect(() => {
    if (formData.partner_description === '') {
      setFormData({
        ...formData,
        partner_description: undefined
      })
    }
  }, [formData])

  return (
    <section className="relative bg-dark-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-12 pb-12 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 font-inter mb-4 text-gray-100 uppercase">Trở thành đối tác</h1>
          </div>

          {!isSubmited ? (
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="company-name">
                    Tên Doanh nghiệp <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="company-name"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, partner_company_name: e.target.value })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="phone-number">
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-100 sm:text-sm"> +84 </span>
                      </div>
                      <input
                        id="phone-number"
                        type="tel"
                        required
                        onChange={(e) => setFormData({ ...formData, partner_phone_number: e.target.value })}
                        className="form-input block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="Email">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="Email"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, partner_email: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="address">
                    Địa chỉ Kinh doanh <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    className="form-input w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, partner_company_address: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label className="block text-gray-100 text-sm font-medium mb-1" htmlFor="country">
                    Thành phố <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="country"
                    className="form-select w-full"
                    required
                    onChange={(e) => setFormData({ ...formData, partner_city_name: e.target.value })}
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-gray-100 text-sm font-medium" htmlFor="message">
                      Mô tả thông tin
                    </label>
                    <span className="text-sm text-gray-500">Tuỳ chọn</span>
                  </div>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-textarea w-full"
                    onChange={(e) => setFormData({ ...formData, partner_description: e.target.value })}
                    placeholder=""
                  ></textarea>
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

export default BecomePartnerComponent
