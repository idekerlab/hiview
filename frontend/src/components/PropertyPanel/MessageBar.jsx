import React from 'react'
import Typography from 'material-ui/Typography'
import WarningIcon from 'material-ui-icons/ErrorOutline'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: '2em',
  margin: 0,
  height: '4em',
  background: '#444444'
}


const iconStyle = {
  color: 'red',
  height: '1.2em',
  width: '1.2em',
  paddingRight: '0.5em'
}

const warningStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  paddingLeft: '2em'
}

const getWarning = (originalCount, maxCount) => {
  if (originalCount < maxCount) {
    return <div />
  } else {
    return (
      <div style={warningStyle}>
        <WarningIcon style={iconStyle} />

        <Typography
          variant="display1"
          style={{ color: '#FFFFFF', fontSize: '1.5em' }}
        >
          Showing top {maxCount} interactions out of {originalCount}
        </Typography>
      </div>
    )
  }
}

const MessageBar = props => {
  return (
    <div style={containerStyle}>
      <Typography
        variant="display4"
        style={{ color: props.titleColor, fontSize: '2em' }}
      >
        {props.title}
      </Typography>

      {getWarning(props.originalEdgeCount, props.maxEdgeCount)}
    </div>
  )
}

export default MessageBar
