import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0.5em',
    color: '#666666'
  },
  label: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  textLeft: {
    flexGrow: 1
  },
  textRight: {
    flexGrow: 1,
    textAlign: 'right'
  }
}))

const LegendPanel = props => {
  const classes = useStyles()
  const { depth } = props

  const rootColor = props.renderingOptions.get('rootColor')
  const leafColor = props.renderingOptions.get('leafColor')
  const gradient = `linear-gradient(to right, ${rootColor}, ${leafColor})`
  const colorBarStyle = {
    width: '100%',
    height: '2em',
    background: gradient,
    marginTop: '0.2em'
  }

  return (
    <div className={classes.root}>
      <Typography variant="subtitle">Depth</Typography>
      <div style={colorBarStyle}></div>
      <div className={classes.label}>
        <div className={classes.textLeft}>0</div>
        <div className={classes.textRight}>{depth}</div>
      </div>
    </div>
  )
}

export default LegendPanel
