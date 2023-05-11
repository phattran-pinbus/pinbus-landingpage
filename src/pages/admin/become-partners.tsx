import React, { useEffect, useState } from 'react'
import ListBecomePartnerComponent from '../../components/admin/become-partners/ListBecomePartnerComponent'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'

const BecomePartner = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <ListBecomePartnerComponent currentUser={props[0].currentUser} />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(BecomePartner, ['root', 'marketing', 'sale'])
