import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: '#AAAAAA',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  current: {
    color: 'orange',
    fontSize: '1.2em',
    fontWeight: 700
  }
}))

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

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
            <Link key={name} className={classes.current}>
              {name}
            </Link>
          )
        } else {
          return (
            <Link key={name} color="inherit" href="/" onClick={handleClick}>
              {name}
            </Link>
          )
        }
      })}
    </Breadcrumbs>
  )
}

export default PathPanel
