import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { toast } from 'react-toastify'

const AdminLayoutComponent: React.FC = ({ children, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <main className="bg-gray-100  h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} {...props} />
        <div className="flex flex-col w-full md:space-y-4">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} {...props} />
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">{children}</div>
        </div>
      </div>
    </main>
  )
}

type Props = {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const SideBar = ({ sidebarOpen, setSidebarOpen, ...props }: Props) => {
  const { asPath } = useRouter()

  const routes = [
    {
      name: 'Home Settings',
      path: '/admin/home-settings',
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'News',
      path: '/admin/news-settings',
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Promotions',
      path: '/admin/promotion-settings',
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Location',
      path: '/admin/highlight-location-settings',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Products',
      path: '/admin/product-settings',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Services',
      path: '/admin/service-settings',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Network',
      path: '/admin/network-settings',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Testimonials',
      path: '/admin/testimonial-settings',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'User email subscription',
      path: '/admin/user-promotion-news',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'marketing', 'sale']
    },
    {
      name: 'Partner requests',
      path: '/admin/become-partners',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'marketing', 'sale']
    },
    {
      name: 'Ads requests',
      path: '/admin/become-ads',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      allowedRoles: ['root', 'marketing', 'sale']
    },
    {
      name: 'Merchant FAQs',
      path: '/admin/faqs-merchant',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'User FAQs',
      path: '/admin/faqs-end-user',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Term And Condition',
      path: '/admin/term-and-condition',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'Privacy Policy',
      path: '/admin/privacy',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'About us',
      path: '/admin/about-us-setting',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      allowedRoles: ['root', 'content']
    },
    {
      name: 'User Management Setting',
      path: '/admin/user-management',
      // main: Pages.Schedule,
      exact: true,
      hide: false,
      // eslint-disable-next-line react/display-name
      icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      allowedRoles: ['root']
    }
  ]

  return (
    <div className="h-screen lg:block shadow-lg relative w-80">
      <div className="bg-white h-full overflow-auto">
        <div className="flex items-center justify-start pt-6 ml-8">
          <div className="font-bold text-xl text-center">
            <div className="mb-4">
              <Image
                src={require('../assets/images/pinbus-logo-dark.png').default}
                width={160}
                height={46}
                alt="Features illustration"
              />
            </div>
            Pinbus dashboard
          </div>
        </div>
        <nav className="mt-6">
          {routes
            .filter((route) => route.allowedRoles.includes(props[0]?.currentUser.role?.toLowerCase()))
            .map((route, index) => {
              const isActive = route.path === asPath
              return (
                <Link href={route.path} key={index}>
                  <a
                    className={`w-full text-gray-800 font-normal flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
                      isActive ? 'border-primary-400' : 'border-transparent'
                    }`}
                    href="#"
                  >
                    <span className="text-left">{route.icon()}</span>
                    <span className="mx-2 text-sm font-inter">{route.name}</span>
                  </a>
                </Link>
              )
            })}
        </nav>
      </div>
    </div>
  )
}

const Header = ({ sidebarOpen, setSidebarOpen, ...props }: Props) => {
  const Router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Logged out successfully!')
    Router.push('/admin/login')
  }

  return (
    <header className="w-full h-16 flex items-center justify-between">
      <div className="block lg:hidden ml-6">
        <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
          <svg
            width={20}
            height={20}
            className="text-gray-400"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
          </svg>
        </button>
      </div>
      <div className="relative flex flex-col justify-end h-full px-3 md:w-full">
        <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
          <span className="text-gray-500">{props[0]?.currentUser.email}</span>
          <span className="w-1 h-8 rounded-lg bg-gray-200"></span>
          <button className="flex items-center text-gray-500 text-md pr-4" onClick={handleLogout}>
            Log out
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminLayoutComponent
