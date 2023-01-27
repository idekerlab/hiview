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
  path: {
    boxSizing: 'border-box',
    background: '#222222',
    width: '100%',
    padding: theme.spacing(1),
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
const ALIAS = 'alias'
const NCBI_ID_TAG = 'entrezgene'
const NCBI_SUMMARY_TAG = 'Entrezgene_summary'

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

    // This is the original gene symbol
    const geneSymbol = details.id

    for (let idx = 0; idx < hits.length; idx++) {
      const hit = hits[idx]
      const hitSymbol = hit[MYGENE_SYMBOL_TAG]
      const taxid = hit[MYGENE_TAXID]
      const aliases = hit[ALIAS]
      if (hitSymbol === geneSymbol && taxid === HUMAN_TAXID) {
        target = hit
        break
      } else if (taxid === HUMAN_TAXID) {
        if (aliases !== undefined && aliases !== null) {
          if (Array.isArray(aliases)) {
            const alias = aliases.filter((alias) => alias === geneSymbol)
            if (alias.length > 0) {
              target = hit
              target.altSymbol = `${geneSymbol} (alias of ${target.symbol})`
              break
            }
          } else {
            if (aliases === geneSymbol) {
              target = hit
              target.altSymbol = `${geneSymbol} (alias of ${target.symbol})`
              break
            }
          }
        }
      }
    }
    if (target === null) {
      console.warn(`No human gene found for ${geneSymbol}`)
      target = hits[0]
    }
    setTargetEntry(target)

    // const newSummary = target.summary
    // if (newSummary === undefined || newSummary === null) {
    //   // No summary is available. Fetch from NCBI

    //   const ncbiId = target.entrezgene
    //   const NCBI_URL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=gene&id=${ncbiId}&rettype=xml`

    //   fetch(NCBI_URL)
    //     .then((response) => response.text())
    //     .then((data) => {
    //       // console.log(data)
    //       const parser = new DOMParser()
    //       const xmlDoc = parser.parseFromString(data, 'text/xml')
    //       const newSummary =
    //         xmlDoc.getElementsByTagName(NCBI_SUMMARY_TAG)[0].textContent
    //       if (newSummary === undefined || newSummary.length === 0) {
    //         return
    //       }
    //       const newSummaryText = newSummary[0].innerHTML
    //       setSummary(newSummaryText)
    //     })
    // } else {
    //   setSummary(summary)
    // }

    return () => {
      setTargetEntry(null)
    }
  }, [details])

  if (
    details === undefined ||
    details === null ||
    targetEntry === null ||
    targetEntry === undefined
  ) {
    return (
      <div className={classes.wrapper}>
        <NoDataPanel />
      </div>
    )
  }

  const entry = targetEntry
  const id = entry[MYGENE_ID_TAG]
  const { symbol, summary, name, altSymbol } = entry
  const { build_date } = metadata
  const buildDate = new Date(build_date)

  // Loading
  if (details.loading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress disableShrink size={120} />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.path}>
        <PathPanel {...props} />
      </div>
      <TitleBar title={name} geneId={id} geneSymbol={symbol} altSymbol={altSymbol} />
      <GeneSummaryPanel
        symbol={symbol}
        summary={summary}
        ncbiId={id}
        buildDate={buildDate}
        altSymbol={altSymbol}
      />
      <CoreGenePropPanel geneInfo={entry} />
    </div>
  )
}

const NoDataPanel = () => (
  <div>
    <Typography variant="h6">No data</Typography>
  </div>
)

export default GenePropertyPanel
