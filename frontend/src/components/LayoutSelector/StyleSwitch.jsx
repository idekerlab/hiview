import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

const StyleSwitch = () => {
  const handleChange = event => {
    console.log('Switched', event)
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch onChange={handleChange} name="checkedB" color="primary" />}
        label="Node Coloring"
      />
    </FormGroup>
  )
}

export default StyleSwitch
