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
  fontSize: '1.2em',
  lineHeight: '1.3em'
}

const textStyle = {
  fontWeight: 300,
  fontSize: '1.1em',
  lineHeight: '1.25em'
}

const DEF_TITLE = '(No hierarchy data yet)'

const MessageBox = props => {

  const isCirclePacking = props.uiState.get('changeViewer')

  if(!isCirclePacking) {
    return (<div/>)
  }

  const selection = props.selection.get('enter')
  if(selection === undefined) {
    return <div/>
  }

  let originalName = selection.Original_Name
  if(originalName === undefined) {
    originalName = 'Left-click on node to show its other instances and the supporting interaction data'
  } else {
    originalName = 'Left-click on node to show its main instance (blue edge) and other instances (red edge)'
  }

  return (
    <div style={style}>
      <div style={titleStyle}>{originalName}</div>
    </div>
  )
}


export default MessageBox
