import React from 'react'

import Button from '@material-ui/core/Button'
import OpenIcon from '@material-ui/icons/OpenInBrowser'

import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import ndexLogo from '../../assets/images/ndex-logo.svg'

const styles = theme => ({
  button: {
    margin: '0.25em',
    width: '3.4em',
  },
  icon: {
    height: '2em',
  },
  tooltip: {
    fontSize: '16px',
    fontWeight: '300',
    textAlign: 'center',
  },
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
    <Tooltip title={<div className={classes.tooltip}>Search genes in this subsystem in IQuery</div>} placement="bottom">
      <Button size="small" variant="outlined" color="default" onClick={handleOpen} className={classes.button}>
        {/*IQuery
        <OpenIcon className={classes.icon} alt="Open in IQuery" />*/}
        <img src={ndexLogo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInPortalButton)
