import React from 'react'
import Image from 'next/image'

export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=vn.com.pinbus.consumer'
export const APP_STORE_URL = 'https://apps.apple.com/vn/app/pinbus/id1535619524'
export const CLIENT_API = process.env.CLIENT_API || 'https://pinbus.vn'

const DownloadApp = () => {
  return (
    <section className="py-20 bg-primary-400">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24" data-aos="fade-down" data-aos-delay="450">
        <div className="dark relative bg-dark-400 py-10 px-8 md:py-8 md:px-12 rounded-3xl shadow-md">
          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left">
              <div className="lg:mb-2">
                <a href="https://webapp.pinbus.vn" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="transition-opacity duration-300"
                    src={require('../../assets/images/rent.png').default}
                    width={211}
                    height={66}
                    alt="RENT_PINBUS_NOW"
                  />
                </a>
              </div>
              <div>
                <a href={APP_STORE_URL} className="lg:mr-2" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="transition-opacity duration-300"
                    src={require('../../assets/images/ios.png').default}
                    alt="APP_STORE"
                    width={211}
                    height={66}
                  />
                </a>
                <a href={GOOGLE_PLAY_URL} className="lg:ml-2" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="transition-opacity duration-300"
                    src={require('../../assets/images/android.png').default}
                    alt="GOOGLE_PLAY"
                    width={211}
                    height={66}
                  />
                </a>
              </div>
            </div>

            <div className="transition-opacity duration-300">
              <Image
                className="transition-opacity duration-300"
                src={require('../../assets/images/pinbus-QR.png').default}
                alt="pinbus-QR"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
