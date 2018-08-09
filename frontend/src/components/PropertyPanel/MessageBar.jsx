import React from 'react'
import Typography from 'material-ui/Typography'
import WarningIcon from 'material-ui-icons/ErrorOutline'

const messageBarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: '1em',
  background: '#EEEEEE',
  color: '#222222',
  height: '2em',
  width: '100%'
}

const iconStyle = {
  color: 'red',
  height: '1.3em',
  width: '1.3em',
  paddingRight: '0.5em'
}

const MessageBar = props => {

  if(props.originalEdgeCount < props.maxEdgeCount) {
    return (<div/>)
  }

  return (
    <div style={messageBarStyle}>

      <WarningIcon style={iconStyle}/>

      <Typography
        variant="display1"
        style={{ color: '#222222', fontSize: '1.3em' }}
      >
        Showing top {props.maxEdgeCount} interactions out of {props.originalEdgeCount}
      </Typography>
    </div>
  )
}

export default MessageBar
