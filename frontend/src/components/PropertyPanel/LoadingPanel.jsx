import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingPanel = props => {
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
    fontWeight: 300
  }

  return (
    <div style={loadingStyle}>
      <CircularProgress size={300} thickness={1} />
    </div>
  )
}

export default LoadingPanel
