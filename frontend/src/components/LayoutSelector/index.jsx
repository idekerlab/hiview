import React, { useState, useEffect } from 'react'

import { Button, Tooltip } from '@material-ui/core'

import FitContent from '@material-ui/icons/ZoomOutMap'
import FitSelected from '@material-ui/icons/CenterFocusStrong'

import { createStyles, makeStyles } from '@material-ui/core'

import LayoutList, { LAYOUTS } from './LayoutList'
import PleioEdgeSwitch from './PleioEdgeSwitch'

const useStyles = makeStyles((theme) =>
  createStyles({
    flexContainer: {
      paddingLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '0.2em',
    },
    icon: {
      fontSize: '2em',
    },
    tooltip: {
      fontSize: '1.5em',
      fontWeight: '500',
      textAlign: 'center',
    },
  }),
)

const LayoutSelector = (props) => {
  const classes = useStyles()
  const [layout, setLayout] = useState(LAYOUTS.COSE)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const { currentSubsystem, uiState, uiStateActions } = props
  const showPleioEdges = uiState.get('showPleioEdges')
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
    <div className={classes.flexContainer}>
      <PleioEdgeSwitch
        showPleioEdges={showPleioEdges}
        uiStateActions={uiStateActions}
      />
      <Tooltip
        title={<div className={classes.tooltip}>Fit network view</div>}
        arrow
        placement="bottom"
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
        placement="bottom"
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
  )
}

export default LayoutSelector
