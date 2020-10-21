import React from 'react'

import Button from '@material-ui/core/Button'
import OpenIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  button: {
    marginLeft: '0.5em',
  },
  icon: {
    marginLeft: '0.3em'
  }
})

const BASE_URL = 'http://search.ndexbio.org/?genes='

const OpenInPortalButton = props => {
  const { classes, externalNetworks } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const queryGeneString = props.genes.join(',')
    const queryUrl = BASE_URL + queryGeneString

    window.open(queryUrl, 'portal')
  }

  return (
    <Tooltip title="Search genes in this subsystem in IQuery" placement="bottom">
      <Button
        size='small'
        variant="outlined"
        color="default"
        onClick={handleOpen}
        className={classes.button}
      >
        IQuery
        <OpenIcon className={classes.icon} alt="Open in IQuery" />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInPortalButton)
