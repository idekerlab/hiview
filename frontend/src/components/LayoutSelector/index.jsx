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
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      columnGap: '0.5em',
    },
    flexContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formControl: {
      width: '100%',
      flexGrow: 1,
      margin: '0.2em',
    },
    select: {
      paddingLeft: '0.2em',
    },
    button: {
      margin: '0.25em',
      width: '3.4em',
    },
    rightPaddedGrid: {
      marginRight: '0.4em',
    },
    leftPaddedGrid: {
      marginLeft: '0.2em',
    },
    icon: {
      fontSize: '2em',
    },
    tooltip: {
      fontSize: '16px',
      fontWeight: '300',
      textAlign: 'center',
    },
    spacer: {
      width: '0.5em',
      height: 0,
      backgroundColor: 'transparent',
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
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleChange = name => event => {
    setLayout(event.target.value)
    setButtonDisabled(false)
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
    setButtonDisabled(true)
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
      <div className={classes.flexContainer}>
        <div className={classes.leftPaddedGrid}>
          <strong>Layout:</strong>
        </div>
        <div className={classes.flexContainer}>
          <div className={classes.rightPaddedGrid}>
            <FormControl className={classes.formControl}>
              <Select fullWidth value={layout} onChange={handleChange('layout')} className={classes.select}>
                <MenuItem value={LAYOUTS.COSE}>COSE (Force-Directed)</MenuItem>
                <MenuItem value={LAYOUTS.GRID}>Grid</MenuItem>
                <MenuItem value={LAYOUTS.CIRCLE}>Circle</MenuItem>
                <MenuItem value={LAYOUTS.COCENTRIC}>Cocentric</MenuItem>
                <MenuItem value={LAYOUTS.BREADTHFIRST}>Breadthfirst</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Tooltip title={<div className={classes.tooltip}>Apply layout</div>} arrow placement="top">
            <span>
              <Button
                className={classes.button}
                variant={buttonDisabled ? 'outlined' : 'contained'}
                size="small"
                color="primary"
                onClick={handleClick}
                size="small"
                display="inline-block"
                disabled={buttonDisabled}
              >
                <ApplyIcon className={classes.icon} />
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
      <div className={classes.flexContainer}>
        <Tooltip title={<div className={classes.tooltip}>Fit network view</div>} arrow placement="top">
          <Button
            className={classes.button}
            variant="outlined"
            size="small"
            color="default"
            onClick={handleFit}
            size="small"
          >
            <FitContent className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip
          title={<div className={classes.tooltip}>Zoom to selected genes (shift+drag to select)</div>}
          arrow
          placement="top"
        >
          <Button
            className={classes.button}
            variant="outlined"
            size="small"
            color="default"
            onClick={handleFitSelected}
            size="small"
          >
            <FitSelected className={classes.icon} />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default LayoutSelector
