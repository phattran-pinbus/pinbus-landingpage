import React from 'react'

const Button = ({ href, text, ...rest }) => {
  return (
    <a
      className={`btn bg-dark-400 flex-shrink-0 rounded-3xl
    ${
      rest.lightHeader
        ? 'bg-primary-400 text-dark-400 hover:text-gray-500'
        : 'bg-dark-400 text-gray-400 hover:text-primary-400'
    }`}
      href={href}
      {...rest}
    >
      {text}
    </a>
  )
}

export default Button
