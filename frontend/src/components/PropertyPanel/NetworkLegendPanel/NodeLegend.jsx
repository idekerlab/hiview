import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'inherit',
  },
  title: {
    padding: theme.spacing(1),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2em',
    width: '100%',
    padding: theme.spacing(1),
  },
  colorCell: {
    width: '2em',
    height: '2em',
  },
  label: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
  },
}))

const NodeLegend = ({ legend }) => {
  const classes = useStyles()
  const { colors, names } = legend
  const groupIds = Object.keys(colors)
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        Assembly Colors
      </Typography>
      {groupIds.map((key) => {
        const color = colors[key]
        const name = names[key]
        return (
          <div className={classes.row} key={key}>
            <div
              key={key}
              className={classes.colorCell}
              style={{ backgroundColor: color }}
            />
            <Typography variant="body1" className={classes.label}>
              {name}
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

export default NodeLegend
