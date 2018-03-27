import React, { Component } from 'react'

const style = {
  position: 'fixed',
  left: '26em',
  bottom: '0.5em',
  background: 'rgba(205, 205, 205, 0.7)',
  zIndex: 1800,
  height: '5em',
  width: '32em',
  padding: '0.8em',
  borderRadius: '0.5em',
  // border: '1px solid #999999',
  color: '#555555'
}

const titleStyle = {
  fontWeight: 300,
  fontSize: '1.3em',
  lineHeight: '1.4em'
}

const textStyle = {
  fontWeight: 300,
  fontSize: '1.2em',
  marginBottom: '0.4em'
}

const Overlay = props => {

  const selection = props.selection.get('enter')
  let id = '-'
  let type = '-'
  if(selection !== undefined) {
    id = selection.Label
    type = selection.NodeType
  }

  return (
    <div style={style}>
      <div style={textStyle}>Mouse pointer is on:</div>
      <div style={titleStyle}>{id}</div>
    </div>
  )
}

export default Overlay
