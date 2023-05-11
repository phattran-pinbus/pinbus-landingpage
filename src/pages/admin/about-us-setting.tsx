import React, { useEffect, useState } from 'react'
import AboutUsComponent from '../../components/admin/about-us'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const AboutUsSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <AboutUsComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(AboutUsSettingPage, ['root', 'content'])
