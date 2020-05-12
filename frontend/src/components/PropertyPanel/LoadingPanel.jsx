import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'

const loadingStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background: '#F0F0F0'
}

const loadingMessageStyle = {
  color: '#555555',
  fontSize: '2em',
  fontWeight: 300,
  paddingBottom: '1em'
}

const LoadingPanel = props => (
  <div style={loadingStyle}>
    <Typography style={loadingMessageStyle} variant="h4">
      {props.message}
    </Typography>
    <CircularProgress size={300} thickness={1} />
  </div>
)

export default LoadingPanel
