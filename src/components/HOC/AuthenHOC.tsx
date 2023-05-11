import React from 'react'
import { getMe } from '../../utils/APIs'
const isServer = !process.browser
import Router from 'next/router'
import axios from 'axios'

export default function withAuth(AuthComponent: any, allowedRoles: string[] = []) {
  class AuthenHOC extends React.Component {
    static getInitialProps = async (ctx) => {
      return AuthComponent.getInitialProps ? AuthComponent.getInitialProps(ctx) : {}
    }

    state = {
      currentUser: null
    }

    async componentDidMount() {
      if (!isServer) {
        try {
          const { data } = await axios.get(`${process.env.API_URL}/api/auth/users/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          this.setState({ currentUser: data.data })
        } catch (error) {
          console.error(error)
          Router.push('/admin/login')
        }
      }
    }

    render() {
      const { currentUser } = this.state

      return (
        <div>
          {!currentUser ? (
            <div className="flex justify-center items-center h-screen">
              <div className="text-gray-500 text-4xl">Loading...</div>
            </div>
          ) : allowedRoles.includes(currentUser.role.toLowerCase()) ? (
            <AuthComponent isLoggedIn={true} currentUser={currentUser} />
          ) : (
            <div className="flex justify-center items-center h-screen flex-col">
              <div className="text-gray-500 text-4xl">You are not authorized to access this page</div>
              {/* back button */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => Router.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }
  }

  return AuthenHOC
}
