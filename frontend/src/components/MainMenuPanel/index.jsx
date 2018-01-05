import React, {Component} from 'react'

import MainMenu from '../MainMenu'
import Drawer from 'material-ui/Drawer'


export default class MainMenuPanel extends Component {

  render() {
    const {
      uiState, uiStateActions, networks, networkId,
      styles, currentVsActions, currentVs, maxEdgeCount} = this.props

    const openState = uiState.get('showMainMenu')

    return (
        <Drawer
          type="persistent"
          anchor={'left'}
          open={openState}
          width={300}
        >
          <MainMenu
            maxEdgeCount={maxEdgeCount}
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
    )
  }
}
