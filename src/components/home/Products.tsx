/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { SectionTitle } from '../atoms'
import { getSectionById } from './../../utils/APIs'
import { ISectionProps, ISectionContent } from '../../utils/interface'
import renderHTML from 'react-render-html'
import Link from 'next/link'
import { isMobile } from 'react-device-detect'

type ProductProps = {
  article_nanoid: string
  created_at: string
  home_detail_content: string[]
  home_detail_media: {
    media_nanoid?: string
    media_url: string
    media_thumbnail: string
  }
  home_detail_nanoid: string
  home_detail_relate_article: boolean
  home_detail_title: string
  home_detail_video: string
}

const RenderProductTabComponent = ({ products }) => {
  const [productIndex, setProductIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(products[0])

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0])
    }
  }, [products])

  return (
    <div className="grid lg:grid-cols-3">
      <div className="lg:col-span-1 flex flex-wrap lg:flex-col lg:justify-start -m-1 lg:mx-0">
        <div className="justify-center items-center flex flex-wrap">
          {products &&
            products.map((item: ProductProps, index: number) => {
              const isActive = index === productIndex
              return (
                <button
                  key={index}
                  className={`lg:w-full font-medium px-3 py-2 shadow bg-dark-400 hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center justify-center lg:justify-start m-1 lg:mx-0 ${
                    isActive && 'hover:bg-opacity-80'
                  }`}
                  onClick={() => {
                    setProductIndex(index)
                    setSelectedProduct(item)
                  }}
                >
                  <div
                    className={`flex items-center ${isActive ? 'text-white dark:text-primary-400' : 'text-gray-400'}`}
                  >
                    <span className="mr-2">
                      {isActive ? (
                        <Image src={require(`../../assets/images/pin.png`)} width={11} height={19} alt="icon" />
                      ) : (
                        <Image src={require(`../../assets/images/pin-gray.png`)} width={11} height={19} alt="icon" />
                      )}
                    </span>

                    <span>{item.home_detail_title}</span>
                  </div>
                </button>
              )
            })}
        </div>
        <div className="lg:col-span-1 lg:max-w-none flex items-end relative justify-center lg:justify-start w-full">
          <div className="text-right hidden sm:block absolute top-10 right-0">
            <svg className="inline-flex -mt-3 mr-5 mb-3" width="86" height="25" xmlns="http://www.w3.org/2000/svg">
              <path
                className="fill-current text-gray-600"
                d="M80.959 10.448l-5.502-8.292 1.666-1.105 8.596 12.953-15.534.62-.08-1.999 9.944-.397-7.182-3.672C45.251-3.737 21.787 1.633 2.216 24.726L.69 23.435C20.836-.338 45.252-5.926 73.73 6.752l7.23 3.696z"
              />
            </svg>
          </div>
          <ul className="mt-12 mb-2" data-aos="fade-down" data-aos-delay="450">
            {!!selectedProduct &&
              selectedProduct.home_detail_content.map((item: string, index: number) => (
                // <li className="flex items-center py-3 text-gray-900" key={index}>
                //   {renderHTML(item)}
                // </li>
                <li className="flex items-center py-3" key={index}>
                  <svg
                    className="w-3 h-3 fill-current text-gray-800 mr-2 flex-shrink-0"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span className="text-gray-800">{renderHTML(item)}</span>
                </li>
              ))}

            <li className="flex items-center mb-2 mt-4">
              <div className="flex flex-col sm:flex-row justify-left max-w-sm mx-auto sm:max-w-md md:mx-0">
                <Link href="/products">
                  <a
                    className="btn text-gray-400 bg-dark-400 hover:text-primary-400 flex-shrink-0 rounded-3xl"
                    href="#0"
                  >
                    Xem thêm
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2 max-w-sm mx-auto lg:max-w-none">
        <figure className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {selectedProduct && <img src={selectedProduct?.home_detail_media?.media_url} alt="product-image" />}
        </figure>
      </div>
    </div>
  )
}

const Products = ({ sectionData, subSectionData }: { sectionData: ISectionProps; subSectionData: ISectionProps }) => {
  const [productData, setProductData] = useState<ISectionContent[]>([])
  const [subProductData, setSubProductData] = useState<ISectionContent>({})

  useEffect(() => {
    if (sectionData.home_nanoid) {
      getProductData(sectionData.home_nanoid)
    }
  }, [sectionData.home_nanoid])

  const getProductData = async (id: string) => {
    try {
      const {
        data: { message }
      } = await getSectionById(id)
      setProductData(message)
    } catch (error) {
      console.error('err when get product data: ', error)
    }
  }

  useEffect(() => {
    if (subSectionData.home_nanoid) {
      getSubSectionData(subSectionData.home_nanoid)
    }
  }, [subSectionData.home_nanoid])

  const getSubSectionData = async (id: string) => {
    try {
      const {
        data: { message }
      } = await getSectionById(id)
      setSubProductData(message[0])
    } catch (err) {
      console.error('err when get subSectionData: ', err)
    }
  }

  return (
    <div data-aos="fade-down" data-aos-delay="450">
      <section className="relative bg-primary-400 pt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <SectionTitle title={sectionData.home_title} desctiption={sectionData.home_description} bottomDivider />
          </div>
          <RenderProductTabComponent products={productData} />
        </div>
      </section>

      <section className="bg-primary-400 relative pt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-6 mb-12">
            <div className="lg:col-span-2 lg:pr-16 flex flex-wrap justify-center lg:flex-col lg:justify-start -m-1 lg:mx-0">
              <h3 className="h3 lg:text-2xl mb-4 mt-8 text-gray-900 font-inter font-extrabold" data-aos="fade-down">
                {subProductData.home_detail_title}
              </h3>
              <ul
                className="max-w-sm sm:max-w-md mx-auto md:max-w-none -mb-2"
                data-aos="fade-down"
                data-aos-delay="450"
              >
                {subProductData &&
                  subProductData?.home_detail_content?.map((item, index) => (
                    <li className="flex items-center mb-2" key={index}>
                      <div className="text-gray-700 render—html">{renderHTML(item)}</div>
                    </li>
                  ))}
              </ul>

              <h3 className="h3 lg:text-2xl mb-4 mt-8 text-gray-900 font-inter font-extrabold" data-aos="fade-down">
                Hình thức thanh toán:
              </h3>

              <ul className="flex py-4">
                <li>
                  <a
                    className="flex justify-center items-center transition duration-150 ease-in-out"
                    href="#0"
                    aria-label="Twitter"
                  >
                    <Image src={require('../../assets/images/momo.png').default} width={80} height={80} alt="momo" />
                  </a>
                </li>
                <li className="ml-4">
                  <a
                    className="flex justify-center items-center transition duration-150 ease-in-out"
                    href="#0"
                    aria-label="Github"
                  >
                    <Image
                      src={require('../../assets/images/zalopay.png').default}
                      width={80}
                      height={80}
                      alt="zalopay"
                    />
                  </a>
                </li>
                <li className="ml-4">
                  <a
                    className="flex justify-center items-center transition duration-150 ease-in-out"
                    href="#0"
                    aria-label="Facebook"
                  >
                    <Image src={require('../../assets/images/grab.png').default} width={80} height={80} alt="grab" />
                  </a>
                </li>
                <li className="ml-4">
                  <a
                    className="flex justify-center items-center transition duration-150 ease-in-out"
                    href="#0"
                    aria-label="Facebook"
                  >
                    <Image src={require('../../assets/images/vnpay.png').default} width={80} height={80} alt="vnpay" />
                  </a>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row justify-left max-w-sm mx-auto sm:max-w-md md:mx-0 mt-4">
                <Link href="/services">
                  <a className="btn text-gray-400 bg-dark-400 hover:text-primary-400 flex-shrink-0 rounded-3xl">
                    Xem thêm
                  </a>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3 max-w-sm mx-auto md:max-w-2xl lg:max-w-3xl flex justify-center items-end -mb-12">
              <div className="w-5/6" data-aos="fade-down">
                {subProductData?.home_detail_media?.media_url && (
                  <img src={subProductData?.home_detail_media?.media_url} alt="Features illustration" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Products
