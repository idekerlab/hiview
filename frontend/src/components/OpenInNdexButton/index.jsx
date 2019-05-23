import React from 'react'

import Button from '@material-ui/core/Button'
import logo from '../../assets/images/ndex-logo-white.svg'

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

const OpenInNdexButton = props => {
  const { classes } = props

  const handleOpen = () => {
    // Simply open the data with the Portal
    const url = props.location.query.server
    const uuid = props.rawInteractions.summary.externalId
    const queryUrl = url + '#network/' + uuid

    window.open(queryUrl, 'ndex')
  }

  return (
    <Tooltip title="Open in NDEx" placement="bottom">
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <img alt="Ndex logo" src={logo} className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInNdexButton)
