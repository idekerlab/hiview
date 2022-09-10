import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const EDGE_WIDTH = 3

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginTop: theme.spacing(2),
  },
  title: {
    color: '#222222',
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
  labelCell: {
    color: '#444444',
    width: '8.5em',
    textAlign: 'right',
    margin: 'auto',
  },
  wrapper: {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
  },
  edgeWidth: {
    width: '90%',
  },
}))

const SUBTYPES = [
  {
    type: 'constitutive',
    color: '#FFFFFF',
    lineStyle: 'dashed',
  },
  {
    type: 'specific-to-etoposide',
    color: '#E7298A',
    lineStyle: 'solid',
  },
  {
    type: 'specific-to-control',
    color: '#66A61E',
    lineStyle: 'solid',
  }
]
const SubEdgeTypes = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5">
        AP-MS Edge Subtypes
      </Typography>
      {SUBTYPES.map((subtype, idx) => {
        // const subtype = SUBTYPES[idx]
        return (
          <div className={classes.row} key={subtype.type}>
            <div key={subtype.type} className={classes.labelCell}>
              <Typography variant="body2">{subtype.type}</Typography>
            </div>
            <div className={classes.wrapper}>
              <div
                className={classes.edgeWidth}
                style={{ height: EDGE_WIDTH, borderTop: `${EDGE_WIDTH}px ${subtype.lineStyle} ${subtype.color}` }}
              />
            </div>
          </div>
        )
      })}
      
    </div>
  )
}

export default SubEdgeTypes
