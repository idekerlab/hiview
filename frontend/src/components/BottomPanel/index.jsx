import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'

import CloseIcon from 'material-ui-icons/KeyboardArrowDown'

import IconButton from 'material-ui/IconButton'
import PlotPanel from '../PlotPanel'

const panelStyle = {
  width: '100%',
  height: '25em',
  backgroundColor: 'rgba(245,245,245, 0.9)',
  padding: '1em'
}

const plotStyle = {
  height: 300,
  width: '100%',
  background: 'red'
}

const buttonStyle = {
  position: 'absolute',
  top: 0,
  left: '0.5em',
}

class BottomPanel extends Component {
  state = {
    open: true
  }

  handleClose() {
    this.props.uiStateActions.showPlotPanel(false)
  }


  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.props.uiStateActions.showPlotPanel(true)
    }
  }

  render() {
    return (
      <Drawer
        style={{ zIndex: 2300 }}
        variant="persistent"
        anchor={'bottom'}
        open={this.props.uiState.get('showPlotPanel')}
      >
        <div style={panelStyle}>
          <IconButton style={buttonStyle}>
            <CloseIcon
              onClick={e => this.handleClose()} />
          </IconButton>
          <PlotPanel {...this.props} style={plotStyle} />
        </div>
      </Drawer>
    )
  }
}

export default BottomPanel
