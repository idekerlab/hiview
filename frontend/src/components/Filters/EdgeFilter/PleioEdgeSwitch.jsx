import React from 'react'
import {
  Tooltip,
  Typography,
  Switch,
  FormControlLabel,
} from '@material-ui/core'

const PleioEdgeSwitch = ({ tooltip, uiState, uiStateActions }) => {
  const showPleioEdges = uiState.get('showPleioEdges')

  const handleChange = (event) => {
    if (showPleioEdges === true) {
      uiStateActions.showPleioEdges(false)
    } else {
      uiStateActions.showPleioEdges(true)
    }
  }

  return (
    <Tooltip title={<Typography variant="body1">{tooltip}</Typography>} arrow>
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            name="showPleio"
            color="default"
            checked={showPleioEdges}
          />
        }
        label="Pleiotropy"
      />
    </Tooltip>
  )
}

export default PleioEdgeSwitch
