import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NetworkIcon from '@material-ui/icons/NetworkCell'
import TextField from '@material-ui/core/TextField'

export default class MaxEdgePanel extends Component {
  state = {
    maxEdge: this.props.maxEdgeCount
  }

  handleChange = event => {
    this.setState({
      maxEdge: event.target.value
    })
  }

  handleKey = event => {
    const maxEdge = this.state.maxEdge
    if (event.key === 'Enter') {
      this.props.rawInteractionsActions.setMaxEdgeCount(maxEdge)
    }
  }

  render() {
    return (
      <List style={{flexGrow: 1}}>
        <ListItem>
          <ListItemIcon>
            <NetworkIcon />
          </ListItemIcon>

          <TextField
            fullWidth
            id="maxEdgeCount"
            label="Max edges to render:"
            value={this.state.maxEdge}
            onChange={this.handleChange}
            onKeyPress={this.handleKey}
            margin="normal"
          />
        </ListItem>
      </List>
    )
  }
}
