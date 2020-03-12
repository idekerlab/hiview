import React, { Component } from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import Typography from '@material-ui/core/Typography'

import CircularProgress from '@material-ui/core/CircularProgress'
import { blueGrey, blue } from '@material-ui/core/colors'

import PathPanel from './PathPanel'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    padding: 0,
    margin: 0,
    background: '＃FFFFFF'
  },
  description: {
    background: blueGrey[50],
    padding: '1em'
  },
  path: {
    background: '#FFFFFF',
    margin: '1em'
  },
  title: {
    borderBottom: '1px solid #666666',
    marginBottom: '0.4em'
  }
}))

const GenePropertyPanel = props => {
  const classes = useStyles()
  const details = props.currentProperty
  if (details === undefined || details === null) {
    return <div>no data</div>
  }

  // Loading
  if (details.loading) {
    return <CircularProgress />
  }

  const data = details.data
  if (data === undefined || data === null) {
    return <div>no data</div>
  }

  if (data.hits === undefined || data.hits.length === 0) {
    return <div>no data</div>
  }

  const entry = data.hits[0]

  return (
    <div className={classes.root}>
      <div className={classes.path}>
        <PathPanel {...props} />
      </div>
      <TitleBar
        title={entry.name}
        geneId={entry._id}
        geneSymbol={entry.symbol}
      />

      <div className={classes.description}>
        <Typography variant="h6" className={classes.title}>
          Summary
        </Typography>
        <Typography type="subtitle1" style={{ fontSize: '1.3em' }}>
          {entry.summary}
        </Typography>
      </div>
      <CoreGenePropPanel geneInfo={entry} />
    </div>
  )
}

export default GenePropertyPanel
