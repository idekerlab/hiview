import React, { PureComponent } from 'react'
import List, { ListItem, ListItemIcon } from 'material-ui/List'
import NetworkIcon from 'material-ui-icons/NetworkCell'
import TextField from 'material-ui/TextField'

export default class AutoLoadThresholdPanel extends PureComponent {
  state = {
    edgeTh: this.props.autoLoadThreshold
  }

  handleChange = event => {
    this.setState({
      edgeTh: event.target.value
    })
  }

  handleKey = event => {
    const edgeTh = this.state.edgeTh

    if (event.key === 'Enter') {
      this.props.rawInteractionsActions.setAutoLoadThreshold(edgeTh)
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
            id="edgeTh"
            label="Max edges to download:"
            value={this.state.edgeTh}
            onChange={this.handleChange}
            onKeyPress={this.handleKey}
            margin="normal"
          />
        </ListItem>
      </List>
    )
  }
}
