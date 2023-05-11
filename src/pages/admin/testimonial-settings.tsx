import React, { useEffect, useState } from 'react'
import TestimonialSetting from '../../components/admin/testimonial/TestimonialSetting'
import AuthenHOC from '../../components/HOC/AuthenHOC'
import AdminLayoutComponent from '../../layout/adminLayout'
import { getAllSection } from '../../utils/APIs'

const TestimonialPage = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <TestimonialSetting />
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(TestimonialPage, ['root', 'content'])
