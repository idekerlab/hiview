import React from 'react'

import Button from '@material-ui/core/Button'
import OpenIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  button: {
    marginLeft: '1em',
    minWidth: '5.5em'
  },
  icon: {
    paddingLeft: '0.3em'
  }
})

const BASE_URL = 'http://search.ndexbio.org/?genes='

const OpenInNetAntButton = props => {
  const { classes, externalNetworks } = props

  const handleSearch = () => {
    const queryGeneString = props.genes.join(',')
    // const queryUrl = BASE_URL + queryGeneString
    //
    // window.open(queryUrl, 'portal')
  }

  return (
    <Tooltip title="Analyze genes in NetAnt" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        disabled={true}
        onClick={handleSearch}
        className={classes.button}
      >
        NetAnt
        <OpenIcon className={classes.icon} alt="Open in NetAnt" />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInNetAntButton)
