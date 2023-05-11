import React, { useEffect, useState } from 'react'
import PromotionSetting from '../../components/admin/promotion/PromotionSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'
import { getAllSection } from '../../utils/APIs'

const HomeSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <PromotionSetting />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(HomeSettingPage, ['root', 'content'])
