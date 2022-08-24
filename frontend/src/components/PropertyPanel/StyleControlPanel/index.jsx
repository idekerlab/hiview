import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

const StyleControlPanel = props => {
  const classes = useStyles()

  return <div>Test</div>
}

export default StyleControlPanel
