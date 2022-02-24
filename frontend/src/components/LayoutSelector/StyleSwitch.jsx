import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

const StyleSwitch = ({ enableCustomStyling, uiStateActions }) => {
  const handleChange = (event) => {
    uiStateActions.enableCustomStyling(!enableCustomStyling)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            name="coloringChanged"
            color="primary"
            checked={enableCustomStyling}
          />
        }
        label="Apply custom styling"
      />
    </FormGroup>
  )
}

export default StyleSwitch
