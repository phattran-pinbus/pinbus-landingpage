import React, { useEffect, useState } from 'react'
import HighlightLocationSetting from '../../components/admin/highlight-location-settings/HighlightLocationSettings'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const HighLightLocationPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <HighlightLocationSetting />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(HighLightLocationPage, ['root', 'content'])
