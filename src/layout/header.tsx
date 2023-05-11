import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../components/atoms/Button'
import Dropdown from '../components/Dropdown'
import Transition from '../utils/transition'
import { useRouter } from 'next/router'

const Header = ({ lightHeader }) => {
  const router = useRouter()

  const checkActive = (path) => {
    if (router.pathname === path) {
      return 'text-primary-400 font-bold'
    }
  }

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const trigger = useRef(null)
  const mobileNav = useRef(null)

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-7xl mx-auto lg:px-4 px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 mr-5">
            <Link href="/" aria-label="home" passHref>
              {lightHeader ? (
                <Image
                  src={require('../assets/images/pinbus-logo-light.png').default}
                  width={160}
                  height={46}
                  alt="Features illustration"
                />
              ) : (
                <Image
                  src={require('../assets/images/pinbus-logo-dark.png').default}
                  width={160}
                  height={46}
                  alt="Features illustration"
                />
              )}
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:flex-grow">
            {/* Desktop menu links */}
            <ul className="flex flex-grow flex-wrap items-center font-medium justify-center">
              <li>
                <Link href="/" aria-label="home" passHref>
                  <a
                    className={`${
                      lightHeader ? 'text-white' : 'text-gray-700'
                    }   px-3 py-2 flex items-center transition duration-150 ease-in-out ${
                      router.pathname === '/' && 'font-bold'
                    }`}
                  >
                    Trang chủ
                  </a>
                </Link>
              </li>
              <Dropdown lightHeader={lightHeader} title={`Sản phẩm & Dịch vụ`}>
                <li>
                  <Link href="/products" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/products'
                      )} transition duration-150 ease-in-out`}
                    >
                      Sản phẩm
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/services" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/services'
                      )}`}
                    >
                      Dịch vụ
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/promotions" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/promotions'
                      )}`}
                    >
                      Chương trình khuyến mãi
                    </a>
                  </Link>
                </li>
              </Dropdown>
              <Dropdown lightHeader={lightHeader} title={'Đối tác & Mạng lưới'}>
                <li>
                  <Link href="/partners" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/partners'
                      )}`}
                    >
                      Trở thành Đối tác
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-ads" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/contact-ads'
                      )}`}
                    >
                      Đăng ký quảng cáo
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/network" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/network'
                      )}`}
                    >
                      Mạng lưới
                    </a>
                  </Link>
                </li>
              </Dropdown>
              <li>
                <Link href="/news" aria-label="home" passHref>
                  <a
                    className={`${
                      lightHeader ? 'text-white' : 'text-gray-700'
                    } px-3 py-2 flex items-center transition duration-150 ease-in-out ${checkActive('/news')}`}
                  >
                    Tin tức
                  </a>
                </Link>
              </li>
              <Dropdown lightHeader={lightHeader} title="Về chúng tôi">
                <li>
                  <Link href="/about-us" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/about-us'
                      )}`}
                    >
                      Về Pinbus
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/term-and-condition" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/term-and-condition'
                      )}`}
                    >
                      Điều khoản sử dụng
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/privacy-policy'
                      )}`}
                    >
                      Chính sách bảo mật
                    </a>
                  </Link>
                </li>
              </Dropdown>

              {/* FAQs */}
              <Dropdown lightHeader={lightHeader} title="FAQs">
                <li>
                  <Link href="/faqs-end-user" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/faqs-end-user'
                      )}`}
                    >
                      Đối với Người Dùng
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/faqs-merchant" aria-label="home" passHref>
                    <a
                      className={`${'text-gray-400'} text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                        '/faqs-merchant'
                      )}`}
                    >
                      Đối với Đối tác
                    </a>
                  </Link>
                </li>
              </Dropdown>
            </ul>

            <ul className="flex justify-end flex-wrap items-center text-center">
              <li>
                <Button
                  text="Đăng ký / Đăng nhập"
                  href="https://webapp.pinbus.vn/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  lightHeader={lightHeader}
                />
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="inline-flex md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-gray-300  transition duration-150 ease-in-out"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <Transition
              show={mobileNavOpen}
              tag="ul"
              className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg"
              enter="transition ease-out duration-200 transform"
              enterStart="opacity-0 -translate-x-full"
              enterEnd="opacity-100 translate-x-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <nav
                id="mobile-nav"
                ref={mobileNav}
                className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg no-scrollbar"
              >
                <div className="py-6 pr-4 pl-20">
                  {/* Logo */}
                  <Link href="/" aria-label="home" passHref>
                    <Image
                      src={require('../assets/images/pinbus-logo-light.png').default}
                      width={160}
                      height={46}
                      alt="Features illustration"
                      className="object-cover"
                    />
                  </Link>
                  {/* Links */}
                  <ul>
                    <li>
                      <Link href="/" aria-label="home" passHref>
                        <a
                          className={`text-white py-2 flex items-center transition duration-150 ease-in-out ${checkActive(
                            '/'
                          )}`}
                        >
                          Trang chủ
                        </a>
                      </Link>
                    </li>
                    <li className="py-2 my-2 border-t border-gray-200 dark:border-gray-800">
                      <span className="flex lightHeader ? text-white :text-white dark:text-gray-400 py-2">
                        Sản phẩm & Dịch vụ
                      </span>
                      <ul className="pl-4">
                        <li>
                          <Link href="/products" aria-label="home" passHref>
                            <a
                              className={`text-sm hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/products'
                              )} transition duration-150 ease-in-out`}
                            >
                              Sản phẩm
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services" aria-label="home" passHref>
                            <a
                              className={`text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/services'
                              )}`}
                            >
                              Dịch vụ
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/promotions" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/promotions'
                              )}`}
                            >
                              Chương trình khuyến mãi
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="py-2 my-2 border-t border-b border-gray-200 dark:border-gray-800">
                      <span className="flex lightHeader ? text-white :text-white dark:text-gray-400 py-2">
                        Đối tác & Mạng lưới
                      </span>
                      <ul className="pl-4">
                        <li>
                          <Link href="/partners" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/partners'
                              )}`}
                            >
                              Trở thành Đối tác
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact-ads" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/contact-ads'
                              )}`}
                            >
                              Đăng ký quảng cáo
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/network" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/network'
                              )}`}
                            >
                              Mạng lưới
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/news" aria-label="home" passHref>
                        <a
                          className={`py-2 flex items-center transition duration-150 ease-in-out ${checkActive(
                            '/news'
                          )}`}
                        >
                          Tin tức
                        </a>
                      </Link>
                    </li>
                    <li className="py-2 my-2 border-t border-gray-200 dark:border-gray-800">
                      <span className="flex lightHeader ? text-white :text-white dark:text-gray-400 py-2">
                        Về chúng tôi
                      </span>
                      <ul className="pl-4">
                        <li>
                          <Link href="/about-us" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/about-us'
                              )}`}
                            >
                              Về Pinbus
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/term-and-condition" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/term-and-condition'
                              )}`}
                            >
                              Điều khoản sử dụng
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/privacy-policy" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/privacy-policy'
                              )}`}
                            >
                              Chính sách bảo mật
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="py-2 my-2 border-t border-b border-gray-200 dark:border-gray-800">
                      <span className="flex lightHeader ? text-white :text-white dark:text-gray-400 py-2">FAQs</span>
                      <ul className="pl-4">
                        <li>
                          <Link href="/faqs-end-user" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/faqs-end-user'
                              )}`}
                            >
                              Đối với Người Dùng
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/faqs-merchant" aria-label="home" passHref>
                            <a
                              className={` text-sm  hover:text-primary-400  flex py-2 px-4 leading-tight ${checkActive(
                                '/faqs-merchant'
                              )}`}
                            >
                              Đối với Đối tác
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </Transition>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
