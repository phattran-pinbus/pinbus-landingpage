import React from 'react'
import TermAndConditionPageSetting from '../../components/admin/term-and-condition/TermAndConditionPageSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const PrivacyPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <TermAndConditionPageSetting sectionName={'privacy'} />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(PrivacyPage, ['root', 'content'])
