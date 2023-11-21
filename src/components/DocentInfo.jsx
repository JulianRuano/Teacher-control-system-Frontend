import { useParams } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Descriptions, Skeleton, Tag } from 'antd'
import { format } from 'date-fns'
import ElementNotFound from './ElementNotFound'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateDocentFunction } from '../hooks/mutations/useUpdateDocent'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { startHandleLogout } from './actions/auth'
import { useDispatch, useSelector } from 'react-redux'

import {
  addEducator,
  setSelectedEducatorToEdit,
  updateEducator
} from '../redux/slices/educatorSlice'
import EditDocentModal from './EditDocentModal'
import { useGetDocent } from '../hooks/queries/useGetDocent'
import _ from 'lodash'
import { EditOutlined } from '@ant-design/icons'
import BasicSpeedDial from './SpeedDial'
import AssignLabourModal from './AssignLabourModal'
import { assignLabourFunction } from '../hooks/mutations/useAssignLabour'

const DocentInfo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  // useQuery hook to fetch the educator from the backend
  const { data, isLoading, isError } = useGetDocent(id)
  useEffect(() => {
    console.log(data)
  }, [data])
  const formEditInitialValuesRef = useRef({
    firstName: data?.firstName,
    lastName: data?.lastName,
    role: data?.role,
    title: data?.title,
    identification: data?.identification,
    idType: data?.idType,
    email: data?.email,
    docentType: data?.docentType,
    isActive: data?.isActive
  })
  const [isModalOpenEditDocentOpen, setIsModalOpenEditDocentOpen] =
    useState(false)

  const [isModalOpenLabourDocentOpen, setIsModalOpenLabourDocent] =
    useState(false)

  const notifySuccess = (message) =>
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false
    })
  const notifyError = (message) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnHover: false
    })

  const handleOkEditDocent = () => {
    setIsModalOpenEditDocentOpen(false)
  }
  const handleCancelEditDocent = () => {
    setIsModalOpenEditDocentOpen(false)
  }
  const handleOkAssignLabour = () => {
    setIsModalOpenLabourDocent(false)
  }
  const handleCancelAssignLabour = () => {
    setIsModalOpenLabourDocent(false)
  }
  // const queryClient = useQueryClient()

  const showEditModal = () => {
    setIsModalOpenEditDocentOpen(true)
  }
  const queryClient = useQueryClient()
  const showAssignLabourModal = () => {
    setIsModalOpenLabourDocent(true)
  }

  const labourAssignMutation = useMutation({
    mutationFn: assignLabourFunction,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries('docent')

      notifySuccess('Docente actualizado con éxito')
    },
    onError: async (error) => {
      if (error?.response?.status === 401) {
        await dispatch(startHandleLogout())
        return
      }
      console.log(error)
      notifyError('Ha ocurrido un error al asignar la labor')
    }
  })

  const docentUpdateMutation = useMutation({
    mutationFn: updateDocentFunction,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries('docent')
      // dispatch(addEducators(data.payload))
      notifySuccess('Docente actualizado con éxito')
      setIsModalOpenEditDocentOpen(false)
    },
    onError: async (error) => {
      if (error?.response?.status === 401) {
        await dispatch(startHandleLogout())
        return
      }
      console.log(error)
      notifyError('Ha ocurrido un error al actualizar el docente')
    }
  })

  const handleUpdateDocentMutation = (values) => {
    if (_.isEqual(values, formEditInitialValuesRef.current)) {
      notifyError('No han modificado datos')
      return
    }
    docentUpdateMutation.mutate(
      { id, values },
      {
        onSuccess: () => {
          formEditInitialValuesRef.current = values
          dispatch(updateEducator({ id, values }))
        }
      }
    )
  }
  if (isLoading)
    return (
      <div className="px-5 py-5">
        <Skeleton active />
        <br />
        <Skeleton active />
        <br />
        <Skeleton active />
      </div>
    )

  if (isError) {
    return <p>Ha ocurrido un error</p>
  }

  if (!data) {
    return (
      <ElementNotFound
        title="¡Ups! Parece que no se ha encontrado el docente."
        btnText="Regresar a la lista de docentes"
        redirect="/docentes"
      />
    )
  }

  console.log(data)
  const handleAssignLabours = (values) => {
    console.log('labores:', values)
    labourAssignMutation.mutate(values)
  }

  const items = [
    {
      key: '1',
      label: 'Nombres',
      children: `${data.firstName}`
    },
    {
      key: '2',
      label: 'Apellidos',
      children: `${data.lastName}`
    },
    {
      key: '3',
      label: 'Rol',
      children: `${data.role}`
    },
    {
      key: '4',
      label: 'Tipo docente',
      children: `${data.docentType}`
    },
    {
      key: '5',
      label: 'Tipo de identificación',
      children: `${data.idType}`
    },
    {
      key: '6',
      label: 'Estado',
      children: (
        <Tag color={data.isActive ? 'green' : 'red'}>
          {data.isActive ? 'Activo' : 'Inactivo'}
        </Tag>
      )
    },
    {
      key: '7',
      label: 'Número de identificación',
      children: `${data.identification}`
    },
    {
      key: '8',
      label: 'Último título alcazado',
      children: `${data.title}`
    },
    {
      key: '9',
      label: 'Email',
      children: `${data.email}`
    },
    {
      key: '10',
      label: 'Fecha de creación',
      children: `${format(new Date(data.joinDate), 'dd/MM/yyyy')}`
    },
    {
      key: '13',
      label: 'Labores asignadas',
      children: (
        <>
          {data.labours.length > 0 ? (
            data.labours.map((labour) => (
              <>
                {labour.nameWork}
                <br />
              </>
            ))
          ) : (
            <div>Ninguna</div>
          )}
        </>
      )
    }
  ]
  return (
    <div className="px-4 py-4">
      <h1 className="text-xl pb-6">Información del docente</h1>
      <Descriptions items={items} />
      <EditDocentModal
        isModalOpen={isModalOpenEditDocentOpen}
        handleOk={handleOkEditDocent}
        handleCancel={handleCancelEditDocent}
        educator={data}
        handleUpdateDocentMutation={handleUpdateDocentMutation}
        docentUpdateMutation={docentUpdateMutation}
      />
      <AssignLabourModal
        isModalOpen={isModalOpenLabourDocentOpen}
        handleOk={handleOkAssignLabour}
        handleCancel={handleCancelAssignLabour}
        handleAssignLabours={handleAssignLabours}
        labourAssignMutation={labourAssignMutation}
        educator={data}
      />

      <BasicSpeedDial
        showEditModal={showEditModal}
        showAssignLabourModal={showAssignLabourModal}
      />
    </div>
  )
}

export default DocentInfo
