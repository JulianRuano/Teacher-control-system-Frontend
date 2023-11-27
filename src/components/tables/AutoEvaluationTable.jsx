import React from 'react'
import { Space, Table, Tag } from 'antd'
import propTypes from 'prop-types'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setlabourTypeUidToEdit } from '../../redux/slices/labourSlice'
import RecordTag from '../shared/RecordTag'
import { useNavigate } from 'react-router-dom'

const AutoEvaluationTable = ({
  autoEvaluations,
  setIsEditModalOpen,
  canEdit = true,
  isPaginated = false
}) => {
  const navigate = useNavigate()
  const handleSelectAutoEvaluation = async (uid) => {
    navigate(`/autoevaluaciones/${uid}`)
  }
  const dispatch = useDispatch()
  const columns = [
    {
      title: <div className="text-stone-700">Periodo</div>,
      dataIndex: ['period', 'name'],
      key: 'periodName'
    },
    {
      title: <div className="text-stone-700">Labor</div>,
      dataIndex: ['labour', 'nameWork'],
      key: 'nameWork'
    },

    {
      title: <div className="text-stone-700">Estado</div>,
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => (
        <Space size="middle">
          <RecordTag record={record} />
        </Space>
      )
    },
    {
      dataIndex: '_id',
      key: '_id',
      className: 'hidden'
    },
    {
      title: <div className="text-stone-700">Acciones</div>,
      key: 'actions',

      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => handleSelectAutoEvaluation(record.uid)}
            className="text-highlightColor"
          >
            <EyeOutlined /> Ver
          </a>
        </Space>
      )
    }
  ]

  if (canEdit) {
    columns.push({
      title: <div className="text-stone-700">Acciones</div>,
      key: 'actions',
      width: 5,
      render: (_, record) => (
        <div>
          <a
            className="text-highlightColor"
            onClick={() => {
              dispatch(setlabourTypeUidToEdit(record.uid))
              setIsEditModalOpen(true)
            }}
          >
            <EditOutlined /> Editar
          </a>
        </div>
      )
    })
  }
  return (
    <Table
      pagination={isPaginated ? { position: ['topleft'] } : false}
      columns={columns}
      dataSource={autoEvaluations}
    />
  )
}

export default AutoEvaluationTable
AutoEvaluationTable.propTypes = {
  autoEvaluations: propTypes.array.isRequired,
  setIsEditModalOpen: propTypes.func,
  canEdit: propTypes.bool,
  isPaginated: propTypes.bool
}
