import React, { Component } from 'react'

const style = {
  position: 'fixed',
  left: '34em',
  bottom: '0.5em',
  background: 'rgba(255,255,255, 0.7)',
  zIndex: 1800,
  width: '30em',
  padding: '0.7em',
  borderRadius: '0.8em',
  border: '1px solid #888888',
  color: '#555555'
}

const titleStyle = {
  fontWeight: 500,
  fontSize: '1.5em',
  lineHeight: '1.6em'
}

const textStyle = {
  fontWeight: 300,
  fontSize: '1.1em',
  lineHeight: '1.25em'
}

const DEF_TITLE = '(No hierarchy data yet)'

const MessageBox = props => {
  return (
    <div style={style}>
      <div style={titleStyle}>Message</div>
    </div>
  )
}


export default MessageBox
