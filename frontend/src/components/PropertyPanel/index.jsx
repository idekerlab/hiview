import React, { useState, useEffect } from 'react'
import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'

const PANEL_TYPES = {
  GENE: 'gene',
  TERM: 'term',
  DEFAULT: 'default'
}

const drawerContentsStyle = {
  overflowX: 'never',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  background: '#FFFFFF'
}

const PropertyPanel = props => {
  const { currentProperty } = props
  const { propType } = currentProperty

  const getPanel = (w, color, title) => {
    // Do not return any component if nothing is selected.
    if (currentProperty.id === null) {
      return <div />
    }

    // This will be gene or term.
    if (propType === PANEL_TYPES.TERM) {
      return (
        <TermDetailsPanel
          {...props}
          width={w}
          height={window.innerHeight}
          title={title}
          color={color}
        />
      )
    } else if (propType === PANEL_TYPES.GENE) {
      // Check namespace props here...
      return <GenePropertyPanel {...props} />
    } else if (propType === PANEL_TYPES.DEFAULT) {
      return (
        <div>
          <h2>Default Panel</h2>
        </div>
      )
    } else {
      // Unsupported type
      return (
        <div>
          <h2>Unknown prop type</h2>
        </div>
      )
    }
  }

  let label = '?'
  if (propType === PANEL_TYPES.TERM) {
    label = currentProperty.data.Label
  } else if (propType === PANEL_TYPES.GENE) {
    label = currentProperty.id
  }

  const fontColor = propType === PANEL_TYPES.GENE ? '#666666' : 'orange'

  return (
    <div style={drawerContentsStyle}>
      {getPanel(props.width, fontColor, label)}
    </div>
  )
}

export default PropertyPanel
