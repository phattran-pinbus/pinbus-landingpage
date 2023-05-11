import Image from 'next/image'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { provineList, districtList } from '../../utils/constants'
import { WithContext as ReactTags } from 'react-tag-input'
import { getAdminUser, getCategory, uploadMedia } from '../../utils/APIs'
import { IAdmin, ICategory } from '../../utils/interface'

const EditorComponent = dynamic(() => import('./Editor'), {
  ssr: false
})

export const TagWidget = (props) => {
  const { onChange, value, schema } = props
  const [tags, setTags] = React.useState('[]')

  useEffect(() => {
    if (value) {
      setTags(JSON.stringify(value))
    }
  }, [value])

  const KeyCodes = {
    comma: 188,
    enter: [10, 13]
  }

  const handleDrag = (tag, currPos, newPos) => {
    const currentTags = value.split(',')
    const newTags = currentTags.slice()
    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag.text)
    onChange(newTags.join(','))
  }

  const handleAdd = (tag) => {
    const newValue = [...value, tag.text]
    onChange(newValue)
  }
  const handleDelete = (i) => {
    const currentTags = value.split(',').filter((tag, index) => index !== i)
    onChange(currentTags.join(','))
  }

  return (
    <div className="mt-2 mb-4 max-width react-tags">
      <ReactTags
        classNames={{
          tagInput: 'mt-2 max-width',
          tagInputField: 'input mb-4',
          tag: 'tag is-light m-1 p-4 is-size-6',
          remove: 'is-size-7 ml-2 delete'
        }}
        tags={!!value ? value.map((item) => ({ id: item, text: item })) : []}
        handleDelete={handleDelete}
        handleAddition={handleAdd}
        delimiters={[...KeyCodes.enter, KeyCodes.comma]}
        handleDrag={handleDrag}
        allowDragDrop
        allowUnique={true}
        inputFieldPosition="top"
        allowDeleteFromEmptyInput={false}
        // suggestions={suggestTags}
      />

      <div className="mt-4">Suggested Tags</div>
      {/* <div className="mt-2">
        {suggestTags
          .filter((t) => !value?.split(',').includes(t.text))
          .map((tag) => (
            <div className="is-clickable tag is-light m-1 p-4 is-size-6" key={tag.id} onClick={() => handleAdd(tag)}>
              {tag.text}
            </div>
          ))}
      </div> */}
    </div>
  )
}

export const FileWidget = (props) => {
  const [loading, setLoading] = React.useState(false)

  const handleUpload = async (file) => {
    try {
      setLoading(true)
      const {
        data: { message }
      } = await uploadMedia(file)

      props.onChange(message[0].image)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('err when upload image: ', error)
    }
  }

  useEffect(() => {
    if (!props.value) {
      props.onChange('')
    }
  }, [props.value, props])

  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div className="space-y-1 text-center">
        {!!props.value ? (
          <div className="h-64 w-64 relative">
            <Image
              src={props.value}
              alt="Picture of the author"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
            />
            <span
              className="absolute right-0 top-0 bg-white rounded-full text-red-400 cursor-pointer"
              onClick={() => {
                props.onChange('')
              }}
            >
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
        ) : (
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <div className="flex text-sm text-gray-600 justify-center pt-2">
          <label
            htmlFor={`file-upload-${props.id}`}
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id={`file-upload-${props.id}`}
              name={`file-upload-${props.id}`}
              type="file"
              className="sr-only"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
const ForwardRefEditor = forwardRef((props: any, ref) => <EditorComponent {...props} editorRef={ref} />)

export const ContentEditorWidget = (props) => {
  const { onChange, value = '' } = props
  const editorRef = useRef(null)

  const imageHandler = async (image, callback) => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      var file: any = input.files[0]
      const {
        data: { message }
      } = await uploadMedia(file)

      //append image to the editor
      const range = editorRef.current?.getEditorSelection()
      editorRef.current?.getEditor().insertEmbed(range.index, 'image', message[0].image)
    }
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ]

  const handleChange = (html) => {
    onChange(html)
  }

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler
        }
      }
    }),
    []
  )

  return (
    <ForwardRefEditor
      ref={editorRef}
      theme="snow"
      modules={modules}
      formats={formats}
      className="h-64 mb-20"
      onChange={handleChange}
      value={value}
    />
  )
}

export const CategoryChoosingWidget = (props) => {
  const [category, setCategory] = React.useState<ICategory[]>([])

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const {
        data: { message }
      } = await getCategory()
      setCategory(message)
    } catch (error) {
      console.error('err when get categories: ', error)
    }
  }

  return (
    <div className="flex">
      {/* Map category into option */}
      {category.map((c) => (
        <div
          className={`m-1 p-4 bg-gray-100 w-48 transition duration-150 ease-in-out ${
            c.category_nanoid === props.value && 'bg-primary-400'
          }`}
          key={c.category_nanoid}
          onClick={() => props.onChange(c.category_nanoid)}
        >
          {c.category_name}
        </div>
      ))}
    </div>
  )
}

export const ProvinceWidget = (props) => {
  const provinceArr = Object.keys(provineList)
    .map((key) => provineList[key])
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <select
        id="provine"
        className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        name="provine"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      >
        {provinceArr.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export const DistrictWidget = (props) => {
  const districtArr = Object.keys(districtList).map((key) => districtList[key])

  const getDistrict = () => {
    const provineCode = props.formContext.highlight_position_province
    return provineCode ? districtArr.filter((d) => Number(d.parent_code) === Number(provineCode)) : []
  }

  return (
    <div>
      <select
        id="provine"
        className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        name="provine"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      >
        {getDistrict().map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export const UserSelectWidget = (props) => {
  const [users, setUsers] = React.useState<IAdmin[]>([])
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const users = await getAdminUser()
    setUsers(users.data.message)
  }

  return (
    <div>
      <select
        id="users"
        className={`block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
        ${props.disabled && 'cursor-not-allowed bg-gray-100'}`}
        name="users"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        disabled={props.disabled}
      >
        <option value="">Chưa có người phụ trách</option>
        {users.map((u) => (
          <option key={u.user_nanoid} value={u.user_nanoid}>
            {u.email}
          </option>
        ))}
      </select>
    </div>
  )
}
