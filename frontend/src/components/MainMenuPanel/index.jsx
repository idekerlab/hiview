import React, {Component} from 'react'

import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import RendererOptionsPanel from '../RendererOptionsPanel'

import TitleBar from './TitleBar'

const DRAWER_WIDTH = 300;


const containerStyle = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column'
}

export default class MainMenuPanel extends Component {

  render() {
    const {uiState, uiStateActions, maxEdgeCount, rawInteractionsActions} = this.props

    const openState = uiState.get('showMainMenu')

    return (
      <Drawer
        style={{zIndex: 2000}}
        variant="persistent"
        anchor={'left'}
        open={openState}
      >
        <div style={containerStyle}>
          <TitleBar
            {...this.props}
          />

          <div style={{width: '100%', height: '5em'}}/>

          <RendererOptionsPanel
            {...this.props}
          />

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
}
