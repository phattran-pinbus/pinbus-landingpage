import React from 'react'
import TermAndConditionPageSetting from '../../components/admin/term-and-condition/TermAndConditionPageSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const TermAndConditionPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <TermAndConditionPageSetting sectionName={'term_and_condition'} />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(TermAndConditionPage, ['root', 'content'])
