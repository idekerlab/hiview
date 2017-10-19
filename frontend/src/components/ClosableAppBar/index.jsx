import React, {Component} from 'react'

import MainMenu from '../MainMenu'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import Drawer from 'material-ui/Drawer'


const dStyle = {
  padding: 10,
}


export default class ClosableAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shareDialogOpen: false,
      network: 1
    }
  }

  openMenu = () => {
    this.setState({open: !this.state.open})
  }


  handleChange = (event, index, value) => this.setState({network: value});


  getBar = () => {
    const show = this.props.uiState.get('showAppBar')

    if (!show) {

      return (
        <IconButton
          style={{zIndex: 800}}
          iconStyle={{zIndex: 900, color: '#777777'}}
          onTouchTap={this.openMenu}
        >
          <MenuIcon />
        </IconButton>
      )
    } else {
      return (
        <AppBar
          title={this.props.title}
        >
        </AppBar>
      )
    }
  }

  render() {

    const {
      uiState, uiStateActions, networks, networkId,
      styles, currentVsActions, currentVs} = this.props

    console.log('Settings----------------')
    return (
      <div>

        {this.getBar()}

        <Drawer
          type="persistent"
          anchor={'left'}
          open={this.state.open}
          // onRequestChange={(open) => this.setState({open})}
          style={dStyle}
          width={400}
        >
          <MainMenu
            networks={networks}
            networkId={networkId}
            uiState={uiState}
            uiStateActions={uiStateActions}
            styles={styles}
            currentVsActions={currentVsActions}
            currentVs={currentVs}
            trees={this.props.trees}
            currentNetwork={this.props.currentNetwork}
            currentNetworkActions={this.props.currentNetworkActions}
          />
        </Drawer>
      </div>
    )
  }
}
