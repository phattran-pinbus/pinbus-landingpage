import React, { useEffect, useState } from 'react'
import { getUserPromotionNews } from '../../../utils/APIs'
import { IUserPromotionNews } from '../../../utils/interface'
import Image from 'next/image'
import moment from 'moment'

const UserPromotionNewsSettings = () => {
  const [userPromotionNews, setuserPromotionNews] = useState<IUserPromotionNews[]>()

  useEffect(() => {
    fetchUserPromotionNews()
  }, [])

  const fetchUserPromotionNews = async () => {
    try {
      const {
        data: { message }
      } = await getUserPromotionNews()
      setuserPromotionNews(message)
    } catch (error) {
      console.error('err when get user promotion news: ', error)
    }
  }

  const UserPromotionNewsTable = () => {
    return (
      <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full  overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-inter font-bold text-center"
                >
                  Created at
                </th>
              </tr>
            </thead>
            <tbody>
              {userPromotionNews &&
                userPromotionNews.map((userPromotion, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{userPromotion.promotion_news_name}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{userPromotion.promotion_news_phone_number}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">{userPromotion.promotion_news_email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(userPromotion.created_at).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative bg-white p-6">
        <div className="border-gray-100 border-b items-center">
          <div className="text-xl font-inter">User Promotion Subscription</div>
        </div>
        <div className="container mx-auto px-4 ">
          <UserPromotionNewsTable />
        </div>
      </div>
    </>
  )
}

export default UserPromotionNewsSettings
