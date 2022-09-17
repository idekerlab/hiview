import React, { useEffect, useState } from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { blueGrey } from '@material-ui/core/colors'
import PathPanel from './PathPanel'
import { makeStyles } from '@material-ui/core/styles'
import GeneSummaryPanel from './GeneSummaryPanel'

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
    padding: theme.spacing(1),
    paddingLeft: 0,
  },
  codeIcon: {
    color: '#111111',
    marginLeft: theme.spacing(2),
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
const MYGENE_SYMBOL_TAG = 'symbol'
const MYGENE_TAXID = 'taxid'
const HUMAN_TAXID = 9606

const GenePropertyPanel = (props) => {
  const classes = useStyles()
  const [targetEntry, setTargetEntry] = useState(null)

  const details = props.currentProperty
  const { metadata } = details

  useEffect(() => {
    if (
      details === undefined ||
      details === null ||
      details.data === undefined ||
      details.data === null
    ) {
      return
    }
    const { data } = details

    if (data.hits === undefined || data.hits.length === 0) {
      return
    }

    const { hits } = details.data
    let target = null
    const geneSymbol = details.id
    for (let idx = 0; idx < hits.length; idx++) {
      const hit = hits[idx]
      const hitSymbol = hit[MYGENE_SYMBOL_TAG]
      const taxid = hit[MYGENE_TAXID]
      if (hitSymbol === geneSymbol && taxid === HUMAN_TAXID) {
        target = hit
        break
      }
    }
    if (target === null) {
      console.warn(`No human gene found for ${geneSymbol}`)
      target = hits[0]
    }
    setTargetEntry(target)

  }, [details])


  const noDataPanel = (
    <div className={classes.wrapper}>
      <Typography variant="h6">No data</Typography>
    </div>
  )

  if (details === undefined || details === null || targetEntry === null) {
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

  const entry = targetEntry
  const id = entry[MYGENE_ID_TAG]
  const { symbol, name } = entry
  const { build_date } = metadata
  const buildDate = new Date(build_date)

  return (
    <div className={classes.root}>
      <div className={classes.path}>
        <PathPanel {...props} />
      </div>

      <TitleBar title={name} geneId={id} geneSymbol={symbol} />
      <GeneSummaryPanel hit={entry} symbol={symbol} buildDate={buildDate} />
      <CoreGenePropPanel geneInfo={entry} />
    </div>
  )
}

export default GenePropertyPanel
