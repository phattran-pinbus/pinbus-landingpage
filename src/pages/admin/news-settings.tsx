import React from 'react'
import NewsPageComponent from '../../components/admin/news'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const NewsSettingPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <NewsPageComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(NewsSettingPage, ['root', 'content'])
