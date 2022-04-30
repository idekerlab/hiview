import React from 'react'

const style = {
  padding: '0.6em',
  color: '#555555'
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

  // This is a Immutable Map
  const { network } = props

  if (network !== undefined && network !== null) {
    title = network['title']
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
