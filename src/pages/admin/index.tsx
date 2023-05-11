import React from 'react'
import AdminLayoutComponent from '../../layout/adminLayout'
import AuthenHOC from '../../components/HOC/AuthenHOC'

const Dashboard = (...props) => {
  return (
    <AdminLayoutComponent {...props}>
      <h1 className="text-4xl font-semibold text-gray-700">Have a nice day!</h1>
      <h2 className="text-md mt-4 text-gray-700">
        This is the dashboard page. You can see the list of functions in the left side bar.
      </h2>
    </AdminLayoutComponent>
  )
}

export default AuthenHOC(Dashboard, ['root', 'marketing', 'content', 'sale'])
