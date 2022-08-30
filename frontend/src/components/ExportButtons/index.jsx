import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import OpenInPortalButton from '../OpenInPortalButton'
import SaveAsSvgButton from '../SaveAsSvgButton'
import SaveAsSvgButtonErrorBoundary from '../SaveAsSvgButton/SaveAsSvgButtonErrorBoundary'
import CopyToClipboardButton from '../CopyToClipboardButton'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      marginLeft: theme.spacing(2),
      color: '#333333',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      columnGap: '0.5em',
    },
    flexContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

const ExportButtons = props => {
  const classes = useStyles()
  const { geneList, cy } = props

  return (
    <div className={classes.root}>
      <div className={classes.flexContainer}>
        <CopyToClipboardButton genes={geneList} />
        <OpenInPortalButton genes={geneList} />
      </div>
      <div className={classes.flexContainer}>
        <SaveAsSvgButtonErrorBoundary>
          <SaveAsSvgButton cy={cy} />
        </SaveAsSvgButtonErrorBoundary>
      </div>
    </div>
  )
}

export default ExportButtons
