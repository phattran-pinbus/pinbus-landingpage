import React from 'react'
import renderHTML from 'react-render-html'

type Props = {
  content: string
  truncate?: number
}
const RenderHTML = ({ content, truncate }: Props) => {
  if (!content) return null
  return truncate && content.length > truncate
    ? content.replace(/<[^>]*>?/gm, '').substring(0, truncate) + '...'
    : renderHTML(content)
}

export default RenderHTML
