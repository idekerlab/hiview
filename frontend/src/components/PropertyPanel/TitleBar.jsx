import React from 'react'
import OpenIcon from '@material-ui/icons/OpenInNew'
import Typography from '@material-ui/core/Typography'

import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      boxSizing: 'border-box',
      margin: 0,
      padding: '1em',
      width: '100%',
    },
    linkIcon: {
      marginRight: '0.6em',
      color: '#222222',
      '&:hover': {
        color: 'dodgerblue',
      },
    },
    geneSymbol: {
      color: '#333333',
      marginRight: '0.7em',
    },
  }),
)

const TitleBar = props => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <OpenIcon className={classes.linkIcon} onClick={handleClick(props.geneSymbol)} />
      <Typography variant="h4" className={classes.geneSymbol}>
        {props.geneSymbol}:
      </Typography>
      <Typography variant="h5">{props.title}</Typography>
    </div>
  )
}

const handleClick = gene => () => {
  window.open(`http://www.genecards.org/cgi-bin/carddisp.pl?gene=${gene}`)
}

export default TitleBar
