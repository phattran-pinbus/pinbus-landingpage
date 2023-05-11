import React, { useEffect, useState } from 'react'
import ListBecomeAdsComponent from '../../components/admin/become-ads/ListBecomeAdsComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const BecomeAds = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <ListBecomeAdsComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(BecomeAds, ['root', 'marketing', 'sale'])
