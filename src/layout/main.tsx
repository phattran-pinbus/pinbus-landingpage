import Head from 'next/head'
import React from 'react'
import Footer from './footer'
import Header from './header'

const MainLayout = ({
  children,
  lightHeader,
  title = 'Pinbus.vn',
  metaDescription = 'Chúng tôi cung cấp dịch vụ cho khách hàng thuê pin sạc dự phòng mọi lúc, mọi nơi. Hãy luôn nghĩ đến "Pinbus" khi điện thoại của bạn cạn pin nhé!',
  thumbnail = '/images/meta-image.png',
  metaURL = 'https://pinbus.vn/',
  metaType = 'website'
}: any) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <title>{title} | Dịch vụ cho thuê pin sạc dự phòng mọi lúc mọi nơi</title>
        <meta property="og:type" content={metaType} />
        <meta property="og:image" content={thumbnail} />
        <meta charSet="utf-8" />
        <meta name="facebook-domain-verification" content="jz5xe1ktyfp6yz0bn1njqrjkifi41u" />
      </Head>

      <body className="font-inter antialiased bg-white text-gray-900 dark:bg-dark-400 dark:text-gray-100 tracking-tight">
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header lightHeader={lightHeader} />
          <main className="flex-grow bg-primary-400">{children}</main>
          <Footer />
        </div>
      </body>
    </>
  )
}

export default MainLayout
