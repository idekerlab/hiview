import React from 'react'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/ErrorOutline'

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
          variant="h4"
          style={{ color: '#FFFFFF', fontSize: '1.5em' }}
        >
          Showing top {maxCount} interactions out of {originalCount}
        </Typography>
      </div>
    )
  }
}

const MessageBar = props => {
  const wrapperStyle = {
    height: '5em',
    padding: '1em',
    margin: 0,
    background: '#333333'

  }
  const containerStyle = {
    display: 'flex',
    paddingTop: '0.7em',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const panelStyle = {
    color: '#EEEEEE',
    fontSize: '1em',
    borderBottom: '1px solid #EEEEEE'
  }

  return (
    <div style={wrapperStyle}>
      <div style={panelStyle}>Data Viewer</div>
      <div style={containerStyle}>
        <Typography
          variant="h1"
          style={{ color: props.titleColor, fontSize: '2em' }}
        >
          {props.title}
        </Typography>

        {getWarning(props.originalEdgeCount, props.maxEdgeCount)}
      </div>
    </div>
  )
}

export default MessageBar
