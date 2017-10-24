import React, {Component} from 'react'

import classnames from 'classnames'

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import HomeIcon from 'material-ui-icons/Home'
import HelpIcon from 'material-ui-icons/HelpOutline';


import style from './style.css'


// TODO: Split into smaller sub-menus
export default class MainMenu extends Component {

  handleHome = event => {
    window.location.href = '/'
  }

  handleHelp = event => {
    window.location.href = 'https://github.com/idekerlab/hiview/wiki'
  }

  handleShowCommands = event => {
    const switched = this.refs.commands.state.switched
    this.props.uiStateActions.showCommands(!switched)
  }

  handleShowAppBar = event => {
    const switched = this.refs.appBar.state.switched
    this.props.uiStateActions.showAppBar(!switched)
  }

  handleShowSearchWindow = event => {
    const switched = this.refs.searchWindow.state.switched
    this.props.uiStateActions.showSearchWindow(!switched)
  }

  extractNdexData(cxData) {
    const provenanceHistory = cxData.provenanceHistory

    if (provenanceHistory === undefined || provenanceHistory === null) {
      return []
    }

    const entity = provenanceHistory[0].entity
    if (entity === undefined || entity === null) {
      return []
    }

    const properties = entity.properties
    if (properties === undefined || properties === null) {
      return []
    }

    return properties
  }


  render() {

    const uiState = this.props.uiState

    const showCommands = uiState.get('showCommands')
    const showSearchWindow = uiState.get('showSearchWindow')

    return (
      <div style={{width: '400px'}}>
        <div className={classnames(style.grid, style.top)}>
          <h1 className={style.title}>
            HiView v0.1
          </h1>
        </div>

        <Divider />

        <List>
          <ListItem
            button
            onClick={this.handleHelp}
          >
            <ListItemIcon>
              <HelpIcon/>
            </ListItemIcon>
            <ListItemText primary='Help'/>
          </ListItem>

          <ListItem
            button
            onClick={this.handleHome}
          >
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
        </List>
      </div>
    )
  }
}
