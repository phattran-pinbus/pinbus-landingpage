import React from 'react'
import AdminManagementSettingComponent from '../../components/admin/admin-management/AdminManagementSettingComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const AdminManagement = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <AdminManagementSettingComponent />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(AdminManagement, ['root'])
