import React from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'

// Special tag for DDRAM project
const LABEL_DDRAM = 'DAS Score Network'

const filterRowStyle = {
  padding: 0,
  width: '100%',
  height: '0.8em',
  display: 'flex',
  alignItems: 'center',
}

/**
 * Switch for show / hide primary edges
 * @param props
 * @returns {*}
 * @constructor
 */
const PrimaryEdgeSwitch = (props) => {
  const { uiState, uiStateActions } = props
  const enablePrimaryEdge = uiState.get('enablePrimaryEdge')

  return (
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
  )
}

const handleChange = (enablePrimaryEdge, uiStateActions) => {
  uiStateActions.enablePrimaryEdge(!enablePrimaryEdge)
}

export default PrimaryEdgeSwitch
