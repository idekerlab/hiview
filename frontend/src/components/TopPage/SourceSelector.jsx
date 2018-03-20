import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'

import { browserHistory } from 'react-router'

import ErrorDialog from './ErrorDialog'


const textFieldStyle = {
  width: 400,
  fontSize: '2em'
}

const SMALL_NAME = 'Fanconi Anemia gene ontology (FanGO)'

const EXAMPLE_UUIDS = {
  [SMALL_NAME]: 'c84ec0b0-02f4-11e8-bd69-0660b7976219',
  'Large hierarchy': '7ae8907a-b395-11e7-b629-0660b7976219',
  'DNA Repair': 'ab704ae4-0719-11e8-b03c-0660b7976219',
  '80K': '77c476e6-2bb1-11e8-84e4-0660b7976219'
}

class SourceSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: '',
      serverUrl: props.dataSource.get('serverUrl'),
      example: EXAMPLE_UUIDS[SMALL_NAME],
      openError: false
    }
  }

  handleUuidChange = event => {
    this.setState({
      uuid: event.target.value
    })
  }

  handleUrlChange = event => {
    this.setState({
      url: event.target.value
    })
  }

  handleExampleChange = event => {
    this.setState({
      example: event.target.value,
      uuid: event.target.value
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

  openErrorDialog = openError => {
    this.setState({
      openError
    })
  }

  render() {
    const examples = Object.keys(EXAMPLE_UUIDS)

    return (
      <div>
        <div style={{ width: '350px' }}>
          <TextField
            style={textFieldStyle}
            placeholder="e.g. http://test.ndexbio.org"
            label="NDEx Server URL"
            margin="normal"
            value={this.state.serverUrl}
            onChange={this.handleUrlChange}
          />

          <TextField
            autoFocus={true}
            required={true}
            style={textFieldStyle}
            label="UUID of the main hierarchy"
            value={this.state.uuid}
            margin="normal"
            onChange={this.handleUuidChange}
          />

          <TextField
            id="examples"
            select
            label="Example Hierarchies:"
            style={textFieldStyle}
            value={this.state.example}
            onChange={this.handleExampleChange}
            margin="normal"
          >
            {examples.map(option => (
              <MenuItem key={option} value={EXAMPLE_UUIDS[option]}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="raised" onClick={this.handleStart}>
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
