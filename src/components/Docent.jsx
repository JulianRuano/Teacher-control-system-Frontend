import React, { useState } from 'react'
import { Modal } from 'antd'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import { docentSchema } from '../helpers/formikSchemas/docentSchema'
import { useMutation } from '@tanstack/react-query'
import { createDocentFunction } from '../hooks/mutations/useCreateDocent'
import { useDispatch } from 'react-redux'
import { addEducators } from '../redux/slices/workSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Docent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const notify = (message) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light'
    })
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const docentMutation = useMutation({
    mutationFn: createDocentFunction,
    onSuccess: (data) => {
      console.log(data)
      dispatch(addEducators(data.payload))
      notify('Docente creado con éxito')
    },
    onError: (error) => {
      console.log(error)
      notify(error.response.data.message)
    }
  })

  const handleCreateDocentMutation = (values) => {
    console.log('first')
    docentMutation.mutate(values)
  }
  return (
    <div className="pt-4 text-center">
      <div className="flex justify-between px-10 container">
        <h1 className="font-semibold pt-1 text-xl">Docentes</h1>
        <button
          className="  max-w-xs  bg-indigo-500 hover:bg-indigo-700  text-white rounded-lg px-2 py-2 font-semibold"
          onClick={showModal}
        >
          Crear nuevo
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          hidden: true
        }}
        cancelButtonProps={{
          hidden: true
        }}
        width={800}
        centered={true}
      >
        <Formik
          initialValues={{}}
          validationSchema={docentSchema}
          onSubmit={handleCreateDocentMutation}
        >
          {({ isSubmitting }) => (
            <Form className=" space-y-6">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900 ">
                  Nuevo docente
                </h1>
                <p>A continuacion ingrese los datos del docente</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-semibold px-1"
                    >
                      Nombres
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Juan Luis"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 py-1"
                        name="firstName"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 ml-3 mb-5">
                    <label htmlFor="lastName" className="text-xs font-semibold">
                      Apellidos
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full -6 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Juan Luis"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm py-1 "
                        name="lastName"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="role"
                      className="text-xs font-semibold px-1"
                    >
                      Rol
                    </label>
                    <div className="flex flex-col">
                      <Field
                        as="select"
                        type="text"
                        id="role"
                        name="role"
                        className="w-full -10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Castaño Gómez"
                      >
                        <option value="">Select a role</option>
                        <option value="role1">Role 1</option>
                        <option value="role2">Role 2</option>
                      </Field>
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 py-1"
                        name="role"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="title"
                      className="text-xs font-semibold px-1"
                    >
                      Título
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Magister"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="title"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="id" className="text-xs font-semibold px-1">
                      Identificación
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="id"
                        name="id"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="100986587"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="id"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="idType"
                      className="text-xs font-semibold px-1"
                    >
                      Tipo de identificación
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="idType"
                        name="idType"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="CC"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="idType"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold px-1"
                    >
                      Email
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="jdoe@gmail.com"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="email"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold px-1"
                    >
                      Contraseña
                    </label>
                    <div className="flex flex-col">
                      <Field
                        type="text"
                        id="password"
                        name="password"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Contraseña"
                      />
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="password"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="docentType"
                      className="text-xs font-semibold px-1"
                    >
                      Tipo docente
                    </label>
                    <div className="flex flex-col">
                      <Field
                        as="select"
                        id="docentType"
                        name="docentType"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="jdoe@gmail.com"
                      >
                        <option value="">Elige un tipo</option>
                        <option value="role1">Tiempo completo</option>
                        <option value="role2">Planta</option>
                        <option value="role3">Cátedra</option>
                      </Field>
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="docentType"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="labour"
                      className="text-xs font-semibold px-1"
                    >
                      Labor
                    </label>
                    <div className="flex flex-col">
                      <Field
                        as="select"
                        id="labour"
                        name="labour"
                        className="w-full  pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      >
                        <option value="">Elige una labor</option>
                        <option value="role1">Tiempo completo</option>
                        <option value="role2">Planta</option>
                        <option value="role3">Cátedra</option>
                      </Field>
                      <ErrorMessage
                        className="text-red-600 text-sm pl-2 pt-1"
                        name="labour"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      disabled={docentMutation.isPending}
                      className={`block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700  text-white rounded-lg px-3 py-3 font-semibold ${
                        docentMutation.isPending ? 'opacity-50' : ''
                      }`}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

export default Docent