/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { login } from '../../utils/APIs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'

const LoginPage = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    password: ''
  })
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await login(userInfo)
      localStorage.setItem('token', data.data.access_token)
      toast.success('Login Successfully')
      setTimeout(() => {
        router.push('/admin')
        setLoading(false)
      }, 2000)
      // router.push('/admin')
    } catch (error) {
      setLoading(false)
      toast.error('Sai thông tin đăng nhập!')
      console.error(error)
    }
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-primary-400 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <div className="flex justify-center items-center h-screen">
          <Image
            src={require('../../assets/images/mock-1.png')}
            alt="Pinbus"
            width={500}
            height={500}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-gray-800 text-xl md:text-2xl font-inter font-bold mt-12">Login</h1>

          <form className="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Nhập email quản trị viên"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-gray-700"
                autoFocus
                required
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none text-gray-700"
                required
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn text-primary-400 bg-gray-800 hover:bg-primary-600 flex-shrink-0 rounded-3xl w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
