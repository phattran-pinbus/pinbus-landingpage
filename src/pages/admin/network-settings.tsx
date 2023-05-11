import React, { useEffect, useState } from 'react'
import NetworkPageSetting from '../../components/admin/network/NetworkPageSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const NetworkPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <NetworkPageSetting />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(NetworkPage, ['root', 'content'])
