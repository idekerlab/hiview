import React, { useState } from 'react'

import { MenuItem, FormHelperText, FormControl, Select, Button, Tooltip } from '@material-ui/core'

import ApplyIcon from '@material-ui/icons/Refresh'
import FitContent from '@material-ui/icons/ZoomOutMap'
import FitSelected from '@material-ui/icons/CenterFocusStrong'

import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      color: '#333333',
      background: '#EEEEEE',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(1),
    },
    formControl: {
      width: '100%',
      flexGrow: 1
    },
    button: {
      marginLeft: '0.2em',
    },
    icon: {
      fontSize: '2em',
    },
  }),
)

const LAYOUTS = {
  PRESET: 'preset',
  COSE: 'cose-bilkent',
  GRID: 'grid',
  CIRCLE: 'circle',
  COCENTRIC: 'concentric',
  BREADTHFIRST: 'breadthfirst',
}

const LayoutSelector = props => {
  const classes = useStyles()
  const [layout, setLayout] = useState(LAYOUTS.COSE)

  const handleChange = name => event => {
    setLayout(event.target.value)
  }

  const handleClick = event => {
    const extAction = props.externalNetworksActions
    if (extAction !== undefined && extAction !== null) {
      extAction.setLayout(layout)
    }

    if (props.commandActions.applyLayout !== undefined) {
      props.commandActions.applyLayout({
        name: layout,
        options: {},
      })
    }
  }

  const handleFit = event => {
    props.commandActions.fit()

    // This is for other networks' view
    const extAction = props.externalNetworksActions
    if (extAction !== undefined && extAction !== null) {
      extAction.setCommand('fit')
    }
  }

  const handleFitSelected = event => {
    props.commandActions.fitSelected()
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select fullWidth value={layout} onChange={handleChange('layout')}>
          <MenuItem value={LAYOUTS.COSE}>COSE (Force-Directed)</MenuItem>
          <MenuItem value={LAYOUTS.GRID}>Grid</MenuItem>
          <MenuItem value={LAYOUTS.CIRCLE}>Circle</MenuItem>
          <MenuItem value={LAYOUTS.COCENTRIC}>Cocentric</MenuItem>
          <MenuItem value={LAYOUTS.BREADTHFIRST}>Breadthfirst</MenuItem>
        </Select>
        <FormHelperText>Apply new layout to the network</FormHelperText>
      </FormControl>

      <Tooltip title="Apply layout" arrow placement="top">
        <Button className={classes.button} variant="outlined" size="small" color="primary" onClick={handleClick} size="small">
          <ApplyIcon className={classes.icon} />
        </Button>
      </Tooltip>
      <Tooltip title="Fit network view" arrow placement="top">
        <Button className={classes.button} variant="outlined" size="small" color="default" onClick={handleFit} size="small">
          <FitContent className={classes.icon} />
        </Button>
      </Tooltip>
      <Tooltip title="Zoom to selected genes (shift+drag to select)" arrow placement="top">
        <Button className={classes.button} variant="outlined" size="small" color="default" onClick={handleFitSelected} size="small">
          <FitSelected className={classes.icon} />
        </Button>
      </Tooltip>
    </div>
  )
}

export default LayoutSelector
