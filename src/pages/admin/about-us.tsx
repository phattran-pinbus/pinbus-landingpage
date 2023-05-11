import React from 'react'
import AboutUsSettingComponent from '../../components/admin/about-us/'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const AboutUsPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <AboutUsSettingComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(AboutUsPage)
