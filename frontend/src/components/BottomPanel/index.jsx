import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'

import CloseIcon from 'material-ui-icons/KeyboardArrowDown'

import IconButton from 'material-ui/IconButton'

const panelStyle = {
  width: '100%',
  height: '15em',
  backgroundColor: 'rgba(245,245,245, 0.9)',
  padding: '1em'
}

class BottomPanel extends Component {
  state = {
    open: true
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <Drawer
        style={{ zIndex: 2300 }}
        variant="persistent"
        anchor={'bottom'}
        open={this.state.open}
      >
        <div style={panelStyle}>
          <IconButton>
            <CloseIcon onClick={e => this.handleClose()} />
          </IconButton>
        </div>
      </Drawer>
    )
  }
}

export default BottomPanel
