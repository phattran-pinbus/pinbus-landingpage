import React from 'react'
import ReactQuill from 'react-quill'

const Editor = ({ editorRef, ...props }) => {
  return (
    <div className="text-editor">
      <ReactQuill {...props} ref={editorRef} />
    </div>
  )
}

export default Editor
