import React, { useEffect, useState } from 'react'
import TitleBar from './TitleBar'
import CoreGenePropPanel from './CoreGenePropPanel'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'

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
const NCBI_ID_TAG = 'entrezgene'
const NCBI_SUMMARY_TAG = 'Entrezgene_summary'

const GeneSummaryPanel = (props) => {
  const classes = useStyles()
  const { hit, buildDate } = props

  useEffect(() => {
    const ncbiId = hit[NCBI_ID_TAG]
    const NCBI_URL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=gene&id=${ncbiId}&rettype=xml`

    fetch(NCBI_URL)
      .then((response) => response.text())
      .then((data) => {
        // console.log(data)
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, 'text/xml')

        const newSummary =
          xmlDoc.getElementsByTagName(NCBI_SUMMARY_TAG)[0].textContent
        if (newSummary === undefined || newSummary.length === 0) {
          return
        }
        const newSummaryText = newSummary[0].innerHTML
      })
  }, [hit])

  if (
    hit === undefined ||
    hit === null ||
    hit.summary === undefined ||
    hit.summary === null
  ) {
    return null
  }
  const message = hit.summary
  const id = hit[MYGENE_ID_TAG]

  return (
    <div className={classes.description}>
      <Typography variant="h6" className={classes.title}>
        Summary from MyGene.info (Build: {buildDate.toLocaleDateString()})
        <Tooltip
          title={
            <div className={classes.tooltip}>
              Show MyGene.info raw data (JSON) of {name} in a new tab
            </div>
          }
          arrow
          placement="bottom"
        >
          <IconButton
            size={'small'}
            variant={'outlined'}
            onClick={() => handleOpen(id)}
            className={classes.codeIcon}
            aria-label="open MyGene entry in new tab"
          >
            <CodeIcon />
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

export default GeneSummaryPanel
