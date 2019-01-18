import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'

import CloseIcon from '@material-ui/icons/KeyboardArrowDown'

import IconButton from '@material-ui/core/IconButton'
import PlotPanel from '../PlotPanel'

const panelStyle = {
  width: '100%',
  height: '320px',
  backgroundColor: 'rgba(255,255,255,1)',
  padding: 0,
  margin: 0
}


const buttonStyle = {
  paddingLedt: '0.5em'
}

const titleStyle = {
  display: 'inline-flex',
  width: '100%',
  paddingTop: '0.4em',
  height: '1.5em',
  alignItems: 'center'
}

const titleText = {
  color: '#555555',
  fontSize: '1.4em',
  fontWeight: 500
}

class BottomPanel extends Component {
  state = {
    open: true
  }

  handleClose() {
    this.props.uiStateActions.showPlotPanel(false)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.props.uiStateActions.showPlotPanel(true)
    }
  }

  render() {
    const expanded = this.props.selection.get('main')

    let idExpanded = '-'
    if (expanded !== undefined) {
      idExpanded = expanded.nodeProps.Label
    }

    return (
      <Drawer
        style={{ zIndex: 2300 }}
        variant="persistent"
        anchor={'bottom'}
        open={this.props.uiState.get('showPlotPanel')}
      >
        <div style={panelStyle}>
          <div style={titleStyle}>
            <IconButton
              style={buttonStyle}
              onClick={e => this.handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <div style={titleText}>
              Gene set enrichment by Enrichr for subsystem{' '}
              <i style={{ color: 'orange' }}>{idExpanded}</i>
            </div>
          </div>

          <PlotPanel {...this.props} />
        </div>
      </Drawer>
    )
  }
}

export default BottomPanel
