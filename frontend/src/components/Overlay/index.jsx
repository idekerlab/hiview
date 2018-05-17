import React, { Component } from 'react'

const style = {
  position: 'fixed',
  left: '34em',
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
  fontWeight: 500,
  fontSize: '1.3em',
  lineHeight: '1.4em'
}

const textStyle = {
  fontWeight: 300,
  fontSize: '1.1em',
  lineHeight: '1.25em'
}

const DEF_TITLE = '(No hierarchy data yet)'

const Overlay = props => {
  const isCirclePacking = props.uiState.get('changeViewer')

  let title = DEF_TITLE
  let link = null

  const datasource = props.datasource
  if (datasource !== undefined) {
    const uuid = datasource.get('uuid')
    link = datasource.get('serverUrl') + '/#/network/' + uuid

    const url = props.cxtoolUrl + uuid + '?server=test'
    const networkProp = props.network
    const networkData = networkProp.get(url)

    if (networkData !== null && networkData !== undefined) {
      title = networkData.data.name
    }
  }

  const selection = props.selection.get('enter')
  const expanded = props.selection.get('main')

  let id = '-'
  let type = '-'

  let idExpanded = '-'
  let typeExpanded = '-'

  if (selection !== undefined) {
    id = selection.Label
    type = selection.NodeType
  }

  if (expanded !== undefined) {
    idExpanded = expanded.nodeProps.Label
    typeExpanded = expanded.nodeProps.NodeType
  }

  if (link !== null) {
    document.title = title
  }

  return (
    <div style={style}>
      <div style={titleStyle}>Hierarchy Name: {getLink(link, title)}</div>

      {isCirclePacking ? (
        <div />
      ) : (
        <div>
          <div style={textStyle}>
            Expanded Subsystem: <i style={{ color: 'orange' }}>{idExpanded}</i>
          </div>
          <div style={textStyle}>
            Current Subsystem: <i style={{ color: 'red' }}>{id}</i>
          </div>
        </div>
      )}
    </div>
  )
}

const getLink = (link, title) => {
  if (title === DEF_TITLE) {
    return DEF_TITLE
  } else {
    return (
      <a href={link} target="_blank">
        {title}
      </a>
    )
  }
}

export default Overlay
