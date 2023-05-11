import AOS from 'aos'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../utils/gtag'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/additional-styles/form.scss'
import '../css/style.scss'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  const handleRouteChange = (url) => {
    gtag.pageview(url)
    // gtag.ATInit()
    gtag.ATTrack()
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // useEffect(() => {
  //   import('react-facebook-pixel')
  //     .then((x) => x.default)
  //     .then((ReactPixel) => {
  //       ReactPixel.init(process.env.PIXEL_ID) // facebookPixelId
  //       ReactPixel.pageView()

  //       router.events.on('routeChangeComplete', () => {
  //         ReactPixel.pageView()
  //       })
  //     })
  // }, [router.events])

  useEffect(() => {
    AOS.init({
      disable: function () {
        var maxWidth = 500
        return window.innerWidth < maxWidth
      },
      once: true,
      duration: 750,
      easing: 'ease-out-quart'
    })

    if (window !== undefined) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <ThemeProvider attribute="class">
      <ToastContainer />
      {/* <MainLayout> */}
      <Component {...pageProps} />
      {/* </MainLayout> */}
    </ThemeProvider>
  )
}

export default MyApp
