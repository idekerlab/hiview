import React from 'react'
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { NODE_STYLE } from '../../../reducers/ui-state'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: '#AAAAAA',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    padding: theme.spacing(2),
  },
  label: {
    color: '#666666',
    // fontSize: '1.5em',
    fontWeight: 500,
  },
}))

const NodeStyleSelector = ({ uiState, uiStateActions }) => {
  const classes = useStyles()
  const selection = uiState.get('nodeStyle')

  const handleChange = (event) => {
    const newSelection = event.target.value
    uiStateActions.setNodeStyle(newSelection)
  }

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">Node Coloring:</FormLabel>
      <RadioGroup
        aria-label="node-style"
        name="node-style"
        value={selection}
        onChange={handleChange}
      >
        {Object.keys(NODE_STYLE).map((styleName) => (
          <FormControlLabel
            className={classes.label}
            key={styleName}
            value={NODE_STYLE[styleName]}
            control={<Radio />}
            label={<Typography variant={'body1'}>{NODE_STYLE[styleName]}</Typography>}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default NodeStyleSelector
