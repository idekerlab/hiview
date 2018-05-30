import React, { Component } from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'

import PlaceIcon from 'material-ui-icons/Place'
import NavigationIcon from 'material-ui-icons/Navigation'

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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>

              {this.getItemText(i, key, aliases[key].Size)}
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

  getItemText = (i, key, size) => {
    if (!this.props.uiState.get('changeViewer')) {
      return (
        <ListItemText primary={'Instance ' + (i + 1) + ' (Size: ' + size +')'} secondary={'Node ID: ' + key} />
      )
    }

    return (
      <ListItemText primary={'Path ' + (i + 1)} secondary={'Node ID: ' + key} />
    )
  }

  getPathButton = (key) => {
    if (!this.props.uiState.get('changeViewer')) {
      return <div />
    }

    return (
      <ListItemSecondaryAction>
        <Button
          aria-label="Find path"
          variant="raised"
          onClick={e => this.handleClick(key)}
        >
          <NavigationIcon />
          Find Path
        </Button>
      </ListItemSecondaryAction>
    )
  }

  handleClick = nodeId => {
    this.props.commandActions.findPath([nodeId, this.props.rootId])
  }
}

export default AliasList
