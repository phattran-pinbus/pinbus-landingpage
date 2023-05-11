import React, { useEffect } from 'react'
import Form from '@rjsf/core'
import {
  TagWidget,
  FileWidget,
  ContentEditorWidget,
  CategoryChoosingWidget,
  ProvinceWidget,
  DistrictWidget,
  UserSelectWidget
} from './FormWidgets'

type formProps = {
  schema: any
  formData: any
  onSubmit: any
}
const FormComponent = ({ schema, formData, onSubmit }: formProps) => {
  const [values, setValues] = React.useState(formData)
  useEffect(() => {
    if (formData) {
      setValues(formData)
    }
  }, [formData])

  return (
    <div>
      <Form
        schema={schema}
        formData={values}
        onChange={({ formData }) => setValues(formData)}
        onSubmit={() => onSubmit({ formData: values })}
        onError={() => console.log('errors')}
        widgets={{
          tagwidget: TagWidget,
          filewidget: FileWidget,
          contenteditorwidget: ContentEditorWidget,
          categorychoosingwidget: CategoryChoosingWidget,
          provincewidget: ProvinceWidget,
          districtwidget: DistrictWidget,
          userselectwidget: UserSelectWidget
        }}
        uiSchema={schema.uiSchema}
        formContext={values}
      />
    </div>
  )
}

export default FormComponent
