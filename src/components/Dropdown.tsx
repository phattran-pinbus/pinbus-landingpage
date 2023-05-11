import React, { useState } from 'react'
import Transition from '../utils/transition'

function Dropdown({ children, title, lightHeader }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onFocus={() => setDropdownOpen(true)}
      onBlur={() => setDropdownOpen(false)}
    >
      <a
        className={`${
          lightHeader ? 'text-white' : 'text-gray-700'
        }   px-2 py-2 flex items-center transition duration-150 ease-in-out`}
        href="#0"
        aria-expanded={dropdownOpen}
        onClick={(e) => e.preventDefault()}
      >
        {title}{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
      <Transition
        appear={true}
        show={dropdownOpen}
        tag="ul"
        className="origin-top-right absolute top-full left-0 w-40 bg-white dark:bg-gray-800 shadow-lg py-2 ml-4 rounded"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {children}
      </Transition>
    </li>
  )
}

export default Dropdown
