import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'
import React from 'react'

const StyleSwitch = () => {
  const handleChange = event => {
    console.log('Switched', event)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={handleChange} name="coloringChanged" color="primary" />}
        label="Node Coloring"
      />
    </FormGroup>
  )
}

export default StyleSwitch
