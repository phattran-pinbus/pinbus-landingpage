import React, { useEffect, useState } from 'react'
import ServicePageSetting from '../../components/admin/services/ServicePageSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const ServicePage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <ServicePageSetting />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(ServicePage, ['root', 'content'])
