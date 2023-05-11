import React from 'react'
import { ArrowUp, Moon, Sun } from 'react-feather'
import animateScrollTo from 'animated-scroll-to'

export const SwitchTheme = ({ value, onValueChange }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        onValueChange()
      }}
      className="flex items-center justify-center"
    >
      <label htmlFor="_toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="_toggle" type="checkbox" checked={value === 'dark'} className="sr-only" readOnly />

          <div className="flex items-center justify-between bg-gray-600 w-10 h-6 rounded-full px-1">
            <Moon className="text-white" size={14} />
            <Sun className="text-white" size={14} />
          </div>

          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" />
        </div>
      </label>
    </div>
  )
}

export const ScrollToTop = () => {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight / 2) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
  }, [])

  return show ? (
    <button
      onClick={() => animateScrollTo(0)}
      className="group fixed bottom-5 right-5 md:right-10 rounded-full w-10 h-10 inline-flex justify-center items-center border border-primary bg-transparent hover:bg-primary"
    >
      <ArrowUp className="text-primary group-hover:text-white" />
    </button>
  ) : null
}
