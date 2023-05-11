import React, { useState } from 'react'
import router from 'next/router'
import Image from 'next/image'
const UserDropdownComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    setDropdownOpen(false)
    window && localStorage.removeItem('token')
    router.push('/admin/login')
  }

  return (
    <div className="relative inline-flex">
      <button
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="w-12 h-12">
          <Image
            src={require('../../assets/images/default-avatar.png').default}
            className="w-8 h-8 rounded-full"
            alt="avt"
          />
        </div>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">Pinbus Admin</span>
          <svg className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>
      {dropdownOpen && (
        <div className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-100 py-1.5 rounded shadow-lg overflow-hidden mt-1">
          <div onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
            <div>
              <div className="bg-white sm:max-w-full max-w-md rounded overflow-hidden">
                <div className="">
                  <div className="px-6 py-4 text-center">
                    <button
                      className="border rounded py-2 px-4 text-xs font-semibold text-gray-70"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdownComponent
