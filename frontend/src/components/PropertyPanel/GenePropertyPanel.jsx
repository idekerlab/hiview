import React from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import OpenIcon from '@material-ui/icons/OpenInNew'

import CircularProgress from '@material-ui/core/CircularProgress'
import { blueGrey } from '@material-ui/core/colors'

import PathPanel from './PathPanel'

import { makeStyles } from '@material-ui/core/styles'

import { MYGENE_URL } from '../NetworkPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    background: '#FFFFFF',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  openIcon: {
    // marginRight: theme.spacing(1),
    color: '#444444',
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

const MYGENE_ID_TAG = '_id'

const GenePropertyPanel = (props) => {
  const classes = useStyles()
  const details = props.currentProperty
  const { metadata } = details

  const getSummaryPanel = (summary, classes, metadata, id = '', name = '') => {
    const { build_date } = metadata
    const buildDate = new Date(build_date)

    let message = ''
    if (summary === undefined || (summary === null) | (summary === '')) {
      message = '( Summary of this gene is not available from MyGene.info )'
    } else {
      message = summary
    }

    return (
      <div className={classes.description}>
        <Typography variant="h6" className={classes.title}>
          Summary from MyGene.info (Buid: {buildDate.toLocaleDateString()})
          <Tooltip
            title={
              <div className={classes.tooltip}>
                Open MyGene.info entry of {name} in a new tab
              </div>
            }
            arrow
            placement="bottom"
          >
            <IconButton
              onClick={() => handleOpen(id)}
              className={classes.openIcon}
              aria-label="open MyGene entry in new tab"
            >
              <OpenIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography type="body1">{message}</Typography>
      </div>
    )
  }

  const handleOpen = (id) => {
    window.open(`${MYGENE_URL}/gene/${id}`, '_blank')
  }

  const noDataPanel = (
    <div className={classes.wrapper}>
      <Typography variant="h6">No data</Typography>
    </div>
  )

  if (details === undefined || details === null) {
    return noDataPanel
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
    return noDataPanel
  }

  if (data.hits === undefined || data.hits.length === 0) {
    return noDataPanel
  }

  const entry = data.hits[0]
  const id = entry[MYGENE_ID_TAG]
  const { symbol, summary, name } = entry

  return (
    <div className={classes.root}>
      <div className={classes.path}>
        <PathPanel {...props} />
      </div>

      <TitleBar title={name} geneId={id} geneSymbol={symbol} />

      {getSummaryPanel(summary, classes, metadata, id, symbol)}

      <CoreGenePropPanel geneInfo={entry} />
    </div>
  )
}

export default GenePropertyPanel
