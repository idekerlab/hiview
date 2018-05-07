import React, {Component} from 'react'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Menu, { MenuItem } from 'material-ui/Menu'


import {browserHistory} from 'react-router'

import ErrorDialog from './ErrorDialog'


const textFieldStyle = {
  width: 400,
  fontSize: '2em',
}

const textFieldStyleSmall = {
  width: 300,
  fontSize: '2em',
  marginRight: '0.5em'
}

const startStyle = {
  width: 400,
  marginTop: '2em'
}

const SMALL_NAME = 'Fanconi Anemia gene ontology (FanGO)'

const EXAMPLE_UUIDS = {
  [SMALL_NAME]: 'c84ec0b0-02f4-11e8-bd69-0660b7976219',
  'Large hierarchy': '7ae8907a-b395-11e7-b629-0660b7976219',
  'DNA Repair': 'ab704ae4-0719-11e8-b03c-0660b7976219',
  '80K': '77c476e6-2bb1-11e8-84e4-0660b7976219',
}

class SourceSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: '',
      serverUrl: props.dataSource.get('serverUrl'),
      example: EXAMPLE_UUIDS[SMALL_NAME],
      openError: false,
      anchorEl: null,
      selectedIndex: 1
    }
  }

  handleUuidChange = event => {
    this.setState({
      uuid: event.target.value,
    })
  }

  handleUrlChange = event => {
    this.setState({
      url: event.target.value,
    })
  }

  handleExampleChange = (event, idx) => {
    const uuid = Object.values(EXAMPLE_UUIDS)[idx]
    this.setState({ anchorEl: null });

    this.setState({
      example: uuid,
      uuid: uuid,
      selectedIndex: idx
    })
  }

  handleStart = () => {
    if (this.state.uuid === '') {
      // Warning
      this.openErrorDialog(true)
      return
    }

    this.props.dataSourceActions.addDataSource(this.state)
    browserHistory.push('/app')
  }

  handleExample = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openErrorDialog = openError => {
    this.setState({
      openError,
    })
  }

  render() {
    const examples = Object.keys(EXAMPLE_UUIDS)
    const { anchorEl } = this.state;


    return (
      <div>
        <div style={{width: '450px'}}>
          <TextField
            style={textFieldStyle}
            placeholder="e.g. http://test.ndexbio.org"
            label="NDEx Server URL"
            margin="normal"
            value={this.state.serverUrl}
            onChange={this.handleUrlChange}
          />

          <div>
            <TextField
              autoFocus={true}
              style={textFieldStyleSmall}
              required={true}
              label="UUID of the main hierarchy"
              value={this.state.uuid}
              margin="normal"
              onChange={this.handleUuidChange}
            />

            <Button
              aria-owns={anchorEl ? 'examples' : null}
              aria-haspopup="true"
              variant="raised" onClick={this.handleExample}>
              Examples
            </Button>
            <Menu
              id="examples"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleExampleChange}
            >
              {examples.map((option, index) => (
                <MenuItem
                  onClick={this.handleClose}
                  key={option}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleExampleChange(event, index)}
                  value={EXAMPLE_UUIDS[option]}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>


          <Button
            color="primary"
            style={startStyle}
            variant="raised" onClick={this.handleStart}>
            Start
          </Button>
        </div>

        <ErrorDialog
          openError={this.state.openError}
          openErrorDialogAction={this.openErrorDialog}
        />
      </div>
    )
  }
}

export default SourceSelector
