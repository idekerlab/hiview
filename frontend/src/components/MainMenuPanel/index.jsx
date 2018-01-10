import React, {Component} from 'react'

import MainMenu from '../MainMenu'
import Drawer from 'material-ui/Drawer'


import RendererOptionsPanel from '../RendererOptionsPanel'


export default class MainMenuPanel extends Component {

  render() {
    const {uiState, uiStateActions, maxEdgeCount, rawInteractionsActions} = this.props

    const openState = uiState.get('showMainMenu')

    return (
        <Drawer
          style={{zIndex: 2000}}
          type="persistent"
          anchor={'left'}
          open={openState}
          width={300}
        >
          <MainMenu
            maxEdgeCount={maxEdgeCount}
            uiState={uiState}
            uiStateActions={uiStateActions}
            rawInteractionsActions={rawInteractionsActions}
          />

          <RendererOptionsPanel
            {...this.props}
          />
        </Drawer>
    )
  }
}
