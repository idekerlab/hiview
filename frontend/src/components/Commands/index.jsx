import React, {Component} from 'react'
import MainMenu from '../MainMenu'
import Drawer from 'material-ui/Drawer'

import classnames from 'classnames'

import style from './style.css'

import Button from 'material-ui/Button'

// Icons
import FitContent from 'material-ui-icons/ZoomOutMap'
import ZoomIn from 'material-ui-icons/ZoomIn'
import ZoomOut from 'material-ui-icons/ZoomOut'
import Settings from 'material-ui-icons/Settings'


const dStyle = {
  padding: 10,
}

class Commands extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleOpenMenu = () => {
    this.setState({open: !this.state.open})
  }

  handleZoomIn = event => {
    this.props.commandActions.zoomIn()
  }

  handleZoomOut = event => {
    this.props.commandActions.zoomOut()
  }

  handleFit = event => {
    this.props.commandActions.fit()
  }

  render() {

    const uiState = this.props.uiState

    if (!uiState.get('showCommands')) {
      return (<div></div>)
    }

    return (
      <div>

        <Drawer
          anchor={'left'}
          open={this.state.open}
          style={dStyle}
          width={400}
        >
          <MainMenu
            uiState={uiState}
          />
        </Drawer>

        <div className={classnames(style.bar, style.grid)}>
          <Button
            fab mini
            color="primary"
            aria-label="zoom in"
            className={style.command}
            onClick={this.handleZoomIn}
          >
            <ZoomIn
            />
          </Button>
          <Button
            fab mini
            color="primary"
            aria-label="zoom out"
            className={style.command}
            onClick={this.handleZoomOut}
          >
            <ZoomOut/>
          </Button>
          <Button
            fab mini
            color="primary"
            aria-label="fit"
            className={style.command}
            onClick={this.handleFit}
          >
            <FitContent/>
          </Button>

          <Button
            fab mini
            aria-label="settings"
            className={style.command}
            onClick={this.handleOpenMenu}
          >
            <Settings/>
          </Button>
        </div>
      </div>
    )
  }
}

export default Commands