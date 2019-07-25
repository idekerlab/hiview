import React, { Component } from 'react'
import TermDetailsPanel from './TermDetailsPanel'
import GenePropertyPanel from './GenePropertyPanel'


const PANEL_TYPES = {
  GENE: 'gene',
  TERM: 'term'
}

class PropertyPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      panelWidth: this.props.width,
      panelHeight: window.innerHeight * 0.5,
      expand: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const selected = this.props.events.get('selected')
    const selectedNew = nextProps.events.get('selected')
    const currentProperty = this.props.currentProperty
    const newProperty = nextProps.currentProperty

    if (selected !== selectedNew || currentProperty !== newProperty) {
      this.setState({
        open: true
      })
    }
  }

  render() {
    const propType = this.props.currentProperty.propType
    let label = '?'

    if (propType === PANEL_TYPES.TERM) {
      label = this.props.currentProperty.data.Label
    } else if (propType === PANEL_TYPES.GENE) {
      label = this.props.currentProperty.id
    }

    const barTitle = label

    const drawerContentsStyle = {
      overflowX: 'auto',
      boxSizing: 'border-box',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
      background: '#FFFFFF'
    }

    const fontColor = propType === PANEL_TYPES.GENE ? '#666666' : 'orange'

    return (
      <div style={drawerContentsStyle}>
        {this.getPanel(this.props.width, fontColor, barTitle)}
      </div>
    )
  }

  getPanel = (w, color, title) => {
    // Do not return any component if nothing is selected.
    if (this.props.currentProperty.id === null) {
      return <div />
    }

    // This will be gene or term.
    const propType = this.props.currentProperty.propType

    if (propType === PANEL_TYPES.TERM) {
      return (
        <TermDetailsPanel
          {...this.props}
          width={w}
          height={window.innerHeight}
          title={title}
          color={color}
        />
      )
    } else if (propType === PANEL_TYPES.GENE) {
      // Check namespace props here...
      return <GenePropertyPanel {...this.props} />
    } else {
      // Unsupported type
      return (
        <div>
          <h2>Unknown prop type</h2>
        </div>
      )
    }
  }
}

export default PropertyPanel
