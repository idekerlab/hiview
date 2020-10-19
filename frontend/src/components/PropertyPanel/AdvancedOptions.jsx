import React, { useState } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InteractionNetworkSelector from '../InteractionNetworkSelector'
import AutoLoadThresholdPanel from './AutoLoadThresholdPanel'
import MaxEdgePanel from './MaxEdgePanel'
import CrossFilter from '../CrossFilter'


import {blueGrey} from '@material-ui/core/colors' 
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Button from '@material-ui/core/Button'

import ApplyIcon from '@material-ui/icons/Refresh'
import FitContent from '@material-ui/icons/ZoomOutMap'
import FitSelected from '@material-ui/icons/CenterFocusStrong'

import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: '#EEEEEE'
    },
    title: {
      background: blueGrey[300],
      color: '#FFFFFF',
    },
    thresholds: {
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      padding: 0

    },
    details: {
      width: '100%',
      padding: theme.spacing(1),
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',

    }
  }),
)

const AdvancedOptions = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary className={classes.title} expandIcon={<ExpandMoreIcon />} aria-controls="advanced1" id="advanced1">
          <Typography>Advanced Options</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <InteractionNetworkSelector genes={props.geneList} {...props} />
          <div className={classes.thresholds}>
            <AutoLoadThresholdPanel
              autoLoadThreshold={props.autoLoadThreshold}
              rawInteractionsActions={props.rawInteractionsActions}
            />
            <MaxEdgePanel
              maxEdgeCount={props.maxEdgeCount}
              uiState={props.uiState}
              uiStateActions={props.uiStateActions}
              rawInteractionsActions={props.rawInteractionsActions}
            />
            <CrossFilter
              panelWidth={props.width * 0.9}
              networkData={props.networkProps}
              originalEdgeCount={props.originalEdgeCount}
              maxEdgeCount={props.maxEdgeCount}
              filters={props.raw.filters}
              commandActions={props.interactionsCommandActions}
              commands={props.interactionsCommands}
              filtersActions={props.filtersActions}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default AdvancedOptions
