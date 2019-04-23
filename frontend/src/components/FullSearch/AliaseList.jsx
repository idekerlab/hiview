import React, { Component } from 'react'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import PlaceIcon from '@material-ui/icons/Place'
import NavigationIcon from '@material-ui/icons/Navigation'

import PathList from './PathList'

class AliasList extends Component {
  state = {}

  componentWillReceiveProps(nextProps) {
    const newPath = nextProps.currentPath

    if (newPath !== undefined && newPath !== null) {
      const path = newPath.get('currentPath')

      if (path === undefined || path === null || path.length === 0) {
        return
      }

      if (path[0] !== undefined) {
        this.setState({ [path[0].id]: path })
      }
    }
  }

  render() {
    const aliases = this.props.aliases
    const keys = Object.keys(aliases)

    return (
      <List disablePadding style={{ paddingLeft: '1.5em' }}>
        {keys.map((key, i) => (
          <div key={'alias-' + i}>
            <ListItem
              onMouseOver={e => this.handleMouseOver(key)}
              onMouseOut={e => this.handleMouseOut(key)}
              style={{ backgroundColor: this.state['hoverBgColor' + key] }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>

              {this.getItemText(i, key, aliases[key].Original_Name)}
              {this.getPathButton(key)}
            </ListItem>

            <Collapse component="li" in={true} timeout="auto" unmountOnExit>
              <PathList
                path={this.state[key]}
                commandActions={this.props.commandActions}
              />
            </Collapse>
          </div>
        ))}
      </List>
    )
  }

  getItemText = (i, key, originalName) => {
    if (!this.props.uiState.get('changeViewer')) {
      return (
        <ListItemText
          primary={'Instance ' + (i + 1)}
          secondary={'Node ID: ' + key}
        />
      )
    }

    return (
      <ListItemText primary={'Path ' + (i + 1)} secondary={'Node ID: ' + key} />
    )
  }

  getPathButton = key => {
    if (!this.props.uiState.get('changeViewer')) {
      return <div />
    }

    return (
      <ListItemSecondaryAction>
        <Button
          aria-label="Find path"
          variant="contained"
          onClick={e => this.handleClick(key)}
        >
          <NavigationIcon />
          Find Path
        </Button>
      </ListItemSecondaryAction>
    )
  }

  handleClick = nodeId => {
    console.log('Click: ', nodeId)
    this.props.commandActions.findPath([nodeId, this.props.rootId])
  }

  handleMouseOver = nodeId => {
    this.props.selectionActions.highlightNode(nodeId)
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: 'rgba(200, 0, 0, 0.3)' })
  }

  handleMouseOut = nodeId => {
    this.props.selectionActions.removeHighlightNode()
    const colorId = 'hoverBgColor' + nodeId
    this.setState({ [colorId]: '#FFFFFF' })
  }
}

export default AliasList
