import React, { Component } from 'react'
import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'
import RendererOptionsPanel from '../RendererOptionsPanel'
import TitleBar from './TitleBar'

const rootStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const MainMenuPanel = props => {
  const {
    uiState,
    uiStateActions,
    maxEdgeCount,
    rawInteractionsActions
  } = props

  const openState = uiState.get('showMainMenu')

  return (
    <Drawer
      style={{ zIndex: 2000 }}
      variant="persistent"
      anchor={'left'}
      open={openState}
    >
      <div style={rootStyle}>
        <TitleBar {...props} />
        <RendererOptionsPanel {...props} />
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
