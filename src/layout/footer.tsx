/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=vn.com.pinbus.consumer'
export const APP_STORE_URL = 'https://apps.apple.com/vn/app/pinbus/id1535619524'

const Footer = () => {
  return (
    <footer className="relative ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            <div className="md:col-span-2 lg:col-span-6">
              <Link href="/">
                <a className="inline-block" href="/" aria-label="Cruip">
                  <Image
                    className="transition-opacity duration-300"
                    src={require('../assets/images/logo-footer.png').default}
                    alt="Pinbus logo"
                  />
                </a>
              </Link>
              <p className="py-2 font-bold">Công ty Cổ phần Đầu tư và Phát triển Công nghệ Five Rings</p>
              <p className="py-2 text-gray-400">
                <span className="font-bold">Địa chỉ:</span> Tầng 5, Tòa nhà số 2, Đường số 57 – TML, Phường Thạnh Mỹ
                Lợi, Tp. Thủ Đức
              </p>
              <p className="py-2 text-gray-400">
                <span className="font-bold">Hotline:</span> 1900 636 529
              </p>
              <p className="py-2 text-gray-400">
                <span className="font-bold">Email: </span>cskh@pinbus.vn
              </p>
              <p className="py-2 text-gray-400">
                Số GCNĐKDN: 0316101928. Ngày cấp: 10/01/2020. Nơi cấp: Sở Kế hoạch và Đầu tư TP. HCM
              </p>

              <div className="pt-4">
                <a
                  href="http://online.gov.vn/Home/WebDetails/71775?AspxAutoDetectCookieSupport=1"
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  <Image
                    className="transition-opacity duration-300"
                    src={require('../assets/images/bocongthuong-badge.png').default}
                    alt="bocongthuong-logo"
                    width={204}
                    height={77}
                  />
                </a>
              </div>
            </div>

            {/* 2nd, 3rd, 4th and 5th blocks */}
            <div className="md:col-span-12 lg:col-span-6 grid grid-cols-2 md:grid-cols-2 gap-8">
              {/* 2nd block */}
              <div className="text-sm">
                <h6 className="font-bold uppercase mb-2">Thông Tin</h6>
                <ul>
                  <li className="py-3">
                    <Link href="/about-us">
                      <a className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out">
                        Về chúng tôi
                      </a>
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="/faqs-end-user">
                      <a className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out">
                        FAQs
                      </a>
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="/term-and-condition">
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                        href="#"
                      >
                        Điều khoản sử dụng
                      </a>
                    </Link>
                  </li>
                  <li className="py-3">
                    <Link href="/privacy-policy">
                      <a
                        className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                        href="#"
                      >
                        Chính sách bảo mật
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 3rd block */}
              <div className="text-sm">
                <ul>
                  <li className="mb-1">
                    <a href="https://webapp.pinbus.vn" target="_blank" rel="noopener noreferrer">
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/rent.png').default}
                        width={211}
                        height={66}
                        alt="RENT_PINBUS_NOW"
                      />
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href={APP_STORE_URL} className="" target="_blank" rel="noopener noreferrer">
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/ios.png').default}
                        alt="Carousel item 05"
                        width={211}
                        height={66}
                      />
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href={GOOGLE_PLAY_URL} className="" target="_blank" rel="noopener noreferrer">
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/android.png').default}
                        alt="Carousel item 05"
                        width={211}
                        height={66}
                      />
                    </a>
                  </li>
                </ul>
                <h6 className="font-bold mb-2">Theo dõi chúng tôi</h6>
                <ul className="flex">
                  <li className="mb-1">
                    <a
                      href="https://www.facebook.com/pinbusVN"
                      className="mr-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/fb.png').default}
                        alt="Carousel item 05"
                      />
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href="https://www.youtube.com/channel/UCU72iYm93ehsXyrGPLfZ92A"
                      className="mr-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/yt.png').default}
                        alt="Carousel item 05"
                      />
                    </a>
                  </li>

                  <li className="mb-1">
                    <a
                      href="https://www.instagram.com/pinbus_vietnam/"
                      className="mr-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="transition-opacity duration-300"
                        src={require('../assets/images/ins.png').default}
                        alt="Carousel item 05"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
