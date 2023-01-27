import React from 'react'
import { Typography, IconButton, Tooltip } from '@material-ui/core'
import CodeIcon from '@material-ui/icons/Code'
import { blueGrey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { MYGENE_URL } from '../NetworkPanel'

const useStyles = makeStyles((theme) => ({
  summary: {
    background: blueGrey[100],
    paddingTop: '0.3em',
    paddingBottom: '1em',
    paddingLeft: '1em',
    paddingRight: '0.7em',
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
}))

const MYGENE_ID_TAG = '_id'
const NCBI_ID_TAG = 'entrezgene'
const NCBI_SUMMARY_TAG = 'Entrezgene_summary'

const GeneSummaryPanel = ({ symbol, ncbiId, summary, buildDate, altSymbol }) => {
  const classes = useStyles()

  let message = ''
  if (summary === undefined || summary === null || summary === '') {
    message = '( Summary of this gene is not available from MyGene.info )'
  } else {
    message = summary
  }

  return (
    <div className={classes.summary}>
      <Typography variant="h6" className={classes.title}>
        Summary from MyGene.info (Build: {buildDate.toLocaleDateString()})
        <Tooltip
          title={
            <div className={classes.tooltip}>
              Show MyGene.info raw data (JSON) of {symbol} in a new tab
            </div>
          }
          placement="bottom"
        >
          <IconButton
            size={'small'}
            variant={'outlined'}
            onClick={() => handleOpen(ncbiId)}
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
