import React from 'react'

import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  button: {
    marginLeft: '1em',
    width: '3em'
  },
  icon: {
    height: '2.5em'
  }
})

const BASE_URL = 'http://search-dev.ndexbio.org/?genes='

const OpenInPortalButton = props => {
  const { classes, externalNetworks } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const queryGeneString = props.genes.join(',')
    const queryUrl = BASE_URL + queryGeneString

    window.open(queryUrl, 'portal')
  }

  return (
    <Tooltip title="Search genes in the Portal" placement="bottom">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={classes.button}
      >
        <SearchIcon alt="Search" />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInPortalButton)
