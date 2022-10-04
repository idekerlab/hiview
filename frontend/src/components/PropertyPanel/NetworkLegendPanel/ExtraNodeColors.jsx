import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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

const ExtraNodeColors = ({ legend, nodeStyle }) => {
  const classes = useStyles()
  const { nodeColors } = legend

  const colorMap = nodeColors[nodeStyle]
  if (colorMap === undefined || colorMap === null) {
    return null
  }

  const sorted = colorMap.sort((a, b) =>
    a.value > b.value ? 1 : b.value > a.value ? -1 : 0,
  )

  return sorted.map((entry) => {
    const { color, value } = entry
    return (
      <div className={classes.row} key={value}>
        <div
          key={value}
          className={classes.colorCell}
          style={{ backgroundColor: color }}
        />
        <Typography variant="body1" className={classes.label}>
          {value}
        </Typography>
      </div>
    )
  })
}

export default ExtraNodeColors