import React from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import Typography from '@material-ui/core/Typography'

import CircularProgress from '@material-ui/core/CircularProgress'
import { blueGrey } from '@material-ui/core/colors'

import PathPanel from './PathPanel'

import { makeStyles } from '@material-ui/core/styles'
import { get } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    background: '#FFFFFF'
  },
  description: {
    background: blueGrey[100],
    paddingTop: '0.3em',
    paddingBottom: '1em',
    paddingLeft: '1em',
    paddingRight: '0.7em',
  },
  path: {
    boxSizing: 'border-box',
    background: '#222222',
    width: '100%',
    padding: '1em',
  },
  title: {
    borderBottom: '1px solid #666666',
    marginBottom: '0.4em',
  },
  wrapper: {
    background: blueGrey[50],
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
  },
}))

const GenePropertyPanel = props => {
  const getSummaryPanel = (summary, classes) => {
    let message = ''
    if (summary === undefined || (summary === null) | (summary === '')) {
      message = '( Summary of this gene is not available from MyGene.info )'
    } else {
      message = summary
    }
    
    return (
      <div className={classes.description}>
        <Typography variant="h6" className={classes.title}>
          Summary
        </Typography>
        <Typography type="body1">{message}</Typography>
      </div>
    )
  }
  const classes = useStyles()
  const details = props.currentProperty

  const noDataPanel = (
    <div className={classes.wrapper}>
      <Typography variant="h6">No data</Typography>
    </div>
  )

  if (details === undefined || details === null) {
    return { noDataPanel }
  }

  // Loading
  if (details.loading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress disableShrink size={120} />
      </div>
    )
  }

  const data = details.data
  if (data === undefined || data === null) {
    return { noDataPanel }
  }

  if (data.hits === undefined || data.hits.length === 0) {
    return { noDataPanel }
  }

  const entry = data.hits[0]

  return (
    <div className={classes.root}>
      <div className={classes.path}>
        <PathPanel {...props} />
      </div>

      <TitleBar title={entry.name} geneId={entry._id} geneSymbol={entry.symbol} />
      
      {getSummaryPanel(entry.summary, classes)}

      <CoreGenePropPanel geneInfo={entry} />
    </div>
  )
}

export default GenePropertyPanel
