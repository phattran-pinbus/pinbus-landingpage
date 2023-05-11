import React, { useEffect, useState } from 'react'
import UserPromotionNewsSettings from '../../components/admin/user-promotion-news/UserPromotionNewsSettings'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const UserPromotionNewsPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <UserPromotionNewsSettings />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(UserPromotionNewsPage, ['root', 'marketing', 'sale'])
