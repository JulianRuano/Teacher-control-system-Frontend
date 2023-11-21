import * as React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import {
  EditOutlined,
  FileTextOutlined,
  FormOutlined,
  FundOutlined
} from '@ant-design/icons'
import propTypes from 'prop-types'

export default function BasicSpeedDial({
  showEditModal,
  showAssignLabourModal
}) {
  const actions = [
    {
      icon: <FileTextOutlined />,
      name: 'Labores',
      onClick: () => showAssignLabourModal()
    },
    {
      icon: <FormOutlined />,
      name: 'Editar',
      onClick: () => showEditModal()
    },
    {
      icon: <FundOutlined />,
      name: 'Autoevaluaciones'
    }
  ]
  return (
    <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 20, right: 26 }}
        icon={
          <EditOutlined
            style={{
              fontSize: '2rem',
              color: 'white'
            }}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

BasicSpeedDial.propTypes = {
  showEditModal: propTypes.func,
  showAssignLabourModal: propTypes.func
}