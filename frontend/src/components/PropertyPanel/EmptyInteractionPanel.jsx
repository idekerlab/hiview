import React from 'react'
import Typography from 'material-ui/Typography'


const EmptyInteractionPanel = props => {

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    width: '100%',
    height: props.height,
    background: '#EEEEEE'
  }

  return (
    <div style={containerStyle}>
      <Typography
        variant="display1"
        align="center"
        style={{ fontSize: '1.6em' }}
      >
        Supporting network not uploaded
      </Typography>
    </div>
  )
}

export default EmptyInteractionPanel
