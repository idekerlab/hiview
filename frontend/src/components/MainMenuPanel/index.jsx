import React, { Component } from 'react'
import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'
import RendererOptionsPanel from '../RendererOptionsPanel'
import TitleBar from './TitleBar'

const rootStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const MainMenuPanel = props => {
  const { uiState, uiStateActions, maxEdgeCount, rawInteractionsActions, network } = props

  const openState = uiState.get('showMainMenu')
  let dagHeight = 0
  if (network !== undefined && network !== null) {
    const { hierarchy } = network

    if (hierarchy !== undefined && hierarchy !== null) {
      dagHeight = hierarchy.height
    }
  }

  return (
    <Drawer style={{ zIndex: 2000 }} variant="persistent" anchor={'left'} open={openState}>
      <div style={rootStyle}>
        <TitleBar {...props} />
        <RendererOptionsPanel depth={dagHeight} {...props} />
        <MainMenu
          maxEdgeCount={maxEdgeCount}
          uiState={uiState}
          uiStateActions={uiStateActions}
          rawInteractionsActions={rawInteractionsActions}
        />
      </div>
    </Drawer>
  )
}

export default MainMenuPanel
