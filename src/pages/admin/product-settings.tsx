import React, { useEffect, useState } from 'react'
import ProductSettingComponent from '../../components/admin/product'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const ProductSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <ProductSettingComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(ProductSettingPage, ['root', 'content'])
