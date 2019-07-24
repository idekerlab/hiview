import React from 'react'

import Button from '@material-ui/core/Button'
import OpenIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  button: {
    marginLeft: '0.5em',
    minWidth: '8em',
    maxWidth: '8em',
    minHeight: '4em',
    maxHeight: '4em',
    padding: 0,
    height: '4em'
  },
  icon: {
    marginLeft: '0.4em'
  }
})

const OpenInNetAntButton = props => {
  const { classes, netant } = props

  const handleSearch = () => {
    const queryGeneString = props.genes.join(',')
    props.netantActions.netantSearchStarted({ genes: queryGeneString })
  }

  const result = netant.result
  if (result === null || result === undefined) {
  } else {
    const link = result.result
    console.log('LINK+++++++++++', link.ndexurl)
    window.open(link.ndexurl, 'netant')
  }

  return (
    <Tooltip title="Analyze genes in NetAnt" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className={classes.button}
        disabled={props.netant.isNetAntRunning}
      >
        NetAnt
        {props.netant.isNetAntRunning ? (
          <CircularProgress
            className={classes.icon}
            thickness={5}
            size={25}
            color={'secondary'}
          />
        ) : (
          <OpenIcon className={classes.icon} alt="Open in NetAnt" />
        )}
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInNetAntButton)
