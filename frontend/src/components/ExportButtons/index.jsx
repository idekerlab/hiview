import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

import OpenInPortalButton from '../OpenInPortalButton'
import SaveAsSvgButton from '../SaveAsSvgButton'
import SaveAsSvgButtonErrorBoundary from '../SaveAsSvgButton/SaveAsSvgButtonErrorBoundary'
import CopyToClipboardButton from '../CopyToClipboardButton'
import OpenInCytoscapeButton from '../OpenInCytoscapeButton'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxSizing: 'border-box',
      color: '#333333',
      background: '#EEEEEE',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      paddingTop: 0,
    },
    spacer: {
      width: '0.5em',
      height: 0,
      backgroundColor: 'transparent',
    },
  }),
)

const ExportButtons = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CopyToClipboardButton genes={props.geneList} />
      <OpenInPortalButton genes={props.geneList} />
      <div className={classes.spacer} />
      <SaveAsSvgButtonErrorBoundary>
        <SaveAsSvgButton cy={props.cy} />
      </SaveAsSvgButtonErrorBoundary>
      {/*<OpenInCytoscapeButton
          externalNetworks={externalNetworks}
          rawInteractions={props.rawInteractions.toJS()}
          isCytoscapeRunning={false}
      />*/}
    </div>
  )
}

export default ExportButtons
