import React, { Component } from 'react'

const style = {
  position: 'fixed',
  left: '31em',
  top: '0.5em',
  background: 'rgba(245, 245, 245, 0.9)',
  zIndex: 1800,
  minWidth: '32em',
  padding: '0.7em',
  borderRadius: '0.1em',
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
  fontSize: '1.1em',
  lineHeight: '1.25em'
}

const Overlay = props => {

  const selection = props.selection.get('enter')
  const expanded = props.selection.get('main')

  let id = '-'
  let type = '-'

  let idExpanded = '-'
  let typeExpanded = '-'

  if(selection !== undefined) {
    id = selection.Label
    type = selection.NodeType
  }

  if(expanded !== undefined) {
    idExpanded = expanded.nodeProps.Label
    typeExpanded = expanded.nodeProps.NodeType
  }

  return (
    <div style={style}>
      <div style={textStyle}>
        Expanded Subsystem: <i style={{color: 'orange'}}>{idExpanded}</i></div>
      <div style={textStyle}>
        Current Subsystem: <i style={{color: 'red'}}>{id}</i></div>
    </div>
  )
}

export default Overlay
