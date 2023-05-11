import React from 'react'

type Props = {
  title: string
  desctiption: string
  bottomDivider?: boolean
  color?: string
  align?: string
}

const SectionTitleComponent = ({
  title,
  desctiption,
  bottomDivider = false,
  color = 'dark',
  align = 'center'
}: Props) => {
  return (
    <div className="mb-8">
      <div className={`max-w-3xl mx-auto text-${align} mb-4`}>
        <h2 className={`lg:text-title text-text-hero-mobile font-bold font-inter mb-4 ${color === 'dark' ? 'text-gray-900' : 'text-white'}`}>
          {title}
        </h2>
        <p className={`text-xl ${color === 'dark' ? 'text-gray-900' : 'text-gray-400'}`}>{desctiption}</p>
      </div>

      {bottomDivider && (
        <div className="flex justify-center">
          <hr style={{ width: 90, borderTop: '8px solid #1D1D20', borderRadius: 20 }} />
        </div>
      )}
    </div>
  )
}

export default SectionTitleComponent
