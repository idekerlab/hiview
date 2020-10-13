import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: '#AAAAAA',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  current: {
    color: 'orange',
    fontSize: '1.5em',
    fontWeight: 500,
  },
}))

const PathPanel = props => {
  const path = props.network.get('currentPath')
  const pathLen = path.length

  const classes = useStyles()

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.root}>
      {path.map((node, idx) => {
        let name = node.label

        if (idx === 0) {
          name = `${name} (root)`
        }

        if (idx === pathLen - 1) {
          return (
            <Link key={name} className={classes.current} underline={'none'}>
              {name}
            </Link>
          )
        } else {
          return (
            <Link key={name} color="inherit" underline={'none'}>
              {name}
            </Link>
          )
        }
      })}
    </Breadcrumbs>
  )
}

export default PathPanel
