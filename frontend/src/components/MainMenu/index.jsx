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
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';


import style from './style.css'


// TODO: Split into smaller sub-menus
export default class MainMenu extends Component {

  state = {
    maxEdge: this.props.maxEdgeCount
  }

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


  handleClose = (event) => {
    const currentPanelState = this.props.uiState.get('showMainMenu')
    this.props.uiStateActions.showMainMenu(!currentPanelState)
  }

  handleChange = event => {
    this.setState({
      maxEdge: event.target.value
    });
  }

  handleKey = event => {
    const maxEdge = this.state.maxEdge

    if (event.key === 'Enter') {
      console.log("Setting max to " + maxEdge)
    }
  }

  render() {
    const baseStyle = {
      padding: '1em',
      width: 400
    }

    return (
      <div style={baseStyle}>
        <div className={classnames(style.grid, style.top)}>
          <Typography type="title">
            HiView v0.1
          </Typography>

          <IconButton onClick={this.handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <TextField
          fullWidth
          id="maxEdgeCount"
          label="Maximum number of interactions (edges):"
          value={this.state.maxEdge}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          margin="normal"
        />

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
