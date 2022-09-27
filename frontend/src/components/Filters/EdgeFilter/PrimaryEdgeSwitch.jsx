import React from 'react'
import {
  Typography,
  Switch,
  FormControlLabel,
  Tooltip,
} from '@material-ui/core'

// Special tag for DDRAM project
const LABEL_DDRAM = 'DAS Score Network'

const PrimaryEdgeSwitch = ({ tooltip, uiState, uiStateActions }) => {
  const enablePrimaryEdge = uiState.get('enablePrimaryEdge')

  return (
    <Tooltip
      title={<Typography variant="body1">{tooltip}</Typography>}
      arrow
    >
      <FormControlLabel
        control={
          <Switch
            color={'default'}
            checked={enablePrimaryEdge}
            onChange={() => handleChange(enablePrimaryEdge, uiStateActions)}
            value="isEnabled"
          />
        }
        label={LABEL_DDRAM}
      />
    </Tooltip>
  )
}

const handleChange = (enablePrimaryEdge, uiStateActions) => {
  uiStateActions.enablePrimaryEdge(!enablePrimaryEdge)
}

export default PrimaryEdgeSwitch
