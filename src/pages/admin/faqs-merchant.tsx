import React from 'react'
import FaqsSettingComponent from '../../components/admin/faqs-merchant/FaqsSettingComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const FaqsSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <FaqsSettingComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(FaqsSettingPage, ['root', 'content'])
