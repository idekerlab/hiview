import React, { useState, useEffect } from 'react'

import { Button, Tooltip } from '@material-ui/core'

import ApplyIcon from '@material-ui/icons/Refresh'
import FitContent from '@material-ui/icons/ZoomOutMap'
import FitSelected from '@material-ui/icons/CenterFocusStrong'

import { createStyles, makeStyles } from '@material-ui/core'

import LayoutList, { LAYOUTS } from './LayoutList'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      color: '#333333',
      background: '#EEEEEE',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: theme.spacing(1),
      flexDirection: 'column',
    },
    flexContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '0.2em',
    },
    icon: {
      fontSize: '2em',
    },
    tooltip: {
      fontSize: '1em',
      fontWeight: '300',
      textAlign: 'center',
    },
  }),
)

const LayoutSelector = (props) => {
  const classes = useStyles()
  const [layout, setLayout] = useState(LAYOUTS.COSE)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const { currentSubsystem, uiState, uiStateActions } = props
  const enableCustomStyling = uiState.get('enableCustomStyling')

  // Enable button once new sub network is loaded.
  useEffect(() => {
    setButtonDisabled(false)
  }, [currentSubsystem])

  const handleChange = (name) => (event) => {
    setLayout(event.target.value)
    setButtonDisabled(false)
  }

  const handleClick = (event) => {
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

  const handleFit = (event) => {
    props.commandActions.fit()

    // This is for other networks' view
    const extAction = props.externalNetworksActions
    if (extAction !== undefined && extAction !== null) {
      extAction.setCommand('fit')
    }
  }

  const handleFitSelected = (event) => {
    props.commandActions.fitSelected()
  }

  return (
    <div className={classes.root}>
      {/* <div className={classes.flexContainer}>
        <StyleSwitch uiStateActions={uiStateActions} enableCustomStyling={enableCustomStyling}/>
      </div> */}
      <div className={classes.flexContainer}>
        <LayoutList layout={layout} handleChange={handleChange} />
        <Tooltip
          title={<div className={classes.tooltip}>Apply layout</div>}
          arrow
          placement="top"
        >
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
        </Tooltip>
        <Tooltip
          title={<div className={classes.tooltip}>Fit network view</div>}
          arrow
          placement="top"
        >
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
          title={
            <div className={classes.tooltip}>
              Zoom to selected genes (shift+drag to select)
            </div>
          }
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
