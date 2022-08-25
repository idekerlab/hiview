import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

const PleioEdgeSwitch = ({ showPleioEdges, uiStateActions }) => {

  const handleChange = (event) => {
    if(showPleioEdges === true) {
      uiStateActions.showPleioEdges(false)
    } else {
      uiStateActions.showPleioEdges(true)
    }
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            name="showPleio"
            color="primary"
            checked={showPleioEdges}
          />
        }
        label="Show edges between pleiotropic genes"
      />
    </FormGroup>
  )
}

export default PleioEdgeSwitch
