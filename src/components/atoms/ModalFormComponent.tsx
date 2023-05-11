import React from 'react'
import Modal from './Modal'
import FormComponent from './Form'

const ModalFormComponent = ({ isOpen, setOpen, schema, initialValue, onSubmit, handleClose }: any) => {
  return (
    <>
      <div className="">
        <Modal show={isOpen} handleClose={handleClose} size="lg">
          <div className="relative pb-9/16">
            <div className="absolute w-full h-full p-4">
              <FormComponent schema={schema} formData={initialValue} onSubmit={onSubmit} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default ModalFormComponent
