import React, { Component } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import HelpIcon from '@material-ui/icons/HelpOutline'

const baseStyle = {
  width: 400,
}

export default class MainMenu extends Component {
  state = {
    maxEdge: this.props.maxEdgeCount,
  }

  handleHome = event => {
    window.location.href = '/'
  }

  handleHelp = event => {
    window.location.href = 'https://github.com/idekerlab/hiview/wiki'
  }

  render() {
    return (
      <div style={baseStyle}>
        <List>
          <ListItem button onClick={this.handleHelp}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>

          <ListItem button onClick={this.handleHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </div>
    )
  }
}
