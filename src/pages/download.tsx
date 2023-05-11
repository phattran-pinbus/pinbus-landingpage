import React, { useEffect } from 'react'
import { deviceDetect } from 'react-device-detect'
import Router from 'next/router'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../components/home/DownloadApp'

const DownloadAppPage = ({ userOS }) => {
  const { os } = userOS

  useEffect(() => {
    if (os === 'iOS') {
      Router.push(APP_STORE_URL)
    } else {
      Router.push(GOOGLE_PLAY_URL)
    }
  }, [os])

  //add default page here
  return <div />
}

DownloadAppPage.getInitialProps = ({ req }) => {
  let userAgent
  if (req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = req.headers['user-agent'] // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent // if you are on the client you can access the navigator from the window object
  }
  return {
    userOS: deviceDetect(userAgent)
  }
}

export default DownloadAppPage
