import React, { useEffect, useState } from 'react'
import FaqsEndUserSettingComponent from '../../components/admin/faqs-end-user/FaqsEndUserSettingComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const FaqsEndUserSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <FaqsEndUserSettingComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(FaqsEndUserSettingPage, ['root', 'content'])
