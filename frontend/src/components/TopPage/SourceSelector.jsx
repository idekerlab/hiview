import React, { Component } from 'react'

import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Menu, { MenuItem } from 'material-ui/Menu'

import { browserHistory } from 'react-router'

import WarningDialog from './WarningDialog'
import ErrorDialog from './ErrorDialog'

const OBJECT_COUNT_TH = 10000

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const textFieldStyle = {
  width: 400,
  fontSize: '2em'
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

const DEFAULT_EXAMPLE = 'Small Example 1'

const EXAMPLE_UUIDS = {
  [DEFAULT_EXAMPLE]: '49bca313-ab2c-11e8-9a23-0660b7976219',
  'DNA Repair': 'ab704ae4-0719-11e8-b03c-0660b7976219',
  'Edge filters example': '6e6e3a1a-cda7-11e8-a74b-0660b7976219',
  'Goal v2': 'c3179d6e-ca96-11e8-98d5-0660b7976219',
  'V2 Goal New': '2900c930-fad7-11e8-ad43-0660b7976219',
  'Y data:': 'cde420ff-da62-11e8-a260-0660b7976219'
}

class SourceSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uuid: '',
      serverUrl: 'http://test.ndexbio.org',
      serverType: 'test',
      example: EXAMPLE_UUIDS[DEFAULT_EXAMPLE],
      openError: false,
      openWarning: false,
      anchorEl: null,
      selectedIndex: 1,
      invalidUuid: true,
      errorText: '',
      errorDialogMessage: 'Could not load',
      errorDialogTitle: 'Error',
      warningDialogMessage: 'Are you sure?',
      warningDialogTitle: 'Warning'
    }
  }

  checkUuid = uuid => {
    if (uuid.match(UUID_PATTERN) !== null) {
      this.setState({
        invalidUuid: false,
        errorText: ''
      })
    } else {
      this.setState({
        invalidUuid: true,
        errorText: 'Invalid UUID'
      })
    }
  }

  handleUuidChange = event => {
    const currentVal = event.target.value

    this.setState({
      uuid: currentVal
    })

    this.checkUuid(currentVal)
  }

  handleUrlChange = event => {
    const url = event.target.value
    const type = this.getServerType(url)

    this.setState({
      serverUrl: event.target.value,
      serverType: type
    })
  }

  getServerType = url => {
    const parts = url.split('/')
    const address = parts[parts.length - 1]
    const type = address.split('.')[0]

    if (!type) {
      throw Error('Invalid URL')
    }

    return type
  }

  handleExampleChange = (event, idx) => {
    const uuid = Object.values(EXAMPLE_UUIDS)[idx]
    this.setState({ anchorEl: null })

    this.setState({
      example: uuid,
      uuid: uuid,
      selectedIndex: idx
    })

    this.checkUuid(uuid)
  }

  openErrorDialog = (openError, title = '', message = '') => {
    this.setState({
      openError,
      errorDialogTitle: title,
      errorDialogMessage: message
    })
  }

  openWarningDialog = (openWarning, title = '', message = '') => {
    this.setState({
      openWarning,
      warningDialogTitle: title,
      warningDialogMessage: message
    })
  }

  checkNetworkSummary = summary => {
    console.log('# Summary', summary)
    this.props.networkActions.setSummary(summary)
    const edgeCount = summary.edgeCount
    const nodeCount = summary.nodeCount

    const title =
      'Warning: Large Hierarchy (' +
      nodeCount +
      ' nodes / ' +
      edgeCount +
      ' edges)'

    const message =
      'You are about to load a large hierarchy.  This may take a very long time to load and may crash your browser.' +
      ' Do you still want to load this?'

    if (nodeCount >= OBJECT_COUNT_TH || edgeCount >= OBJECT_COUNT_TH) {
      this.openWarningDialog(true, title, message)
    } else {
      this.loadNetwork()
    }
  }

  loadNetwork = () => {
    let url = this.state.serverUrl
    let serverType = this.state.serverType
    const uuid = this.state.uuid

    this.props.networkActions.setUuid(uuid)
    this.props.networkActions.setServer(url)

    // this.props.dataSourceActions.addDataSource(this.state)

    // Encode parameters in URL
    const newUrl = `/${uuid}?type=${serverType}&server=${url}`
    browserHistory.push(newUrl)
  }

  validateUrl = () => {
    const url =
      this.state.serverUrl + '/v2/network/' + this.state.uuid + '/summary'

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status)
        } else {
          return response.json()
        }
      })
      .then(json => this.checkNetworkSummary(json))
      .catch(err => {
        if (err.message === '404') {
          this.openErrorDialog(
            true,
            'Network does not exist',
            'Please check the UUID and server address to make sure they actually exist.'
          )
        } else if (err.message === '500') {
          this.openErrorDialog(
            true,
            'NDEx server returned an error (500)',
            'Please visit NDEx web site to check the server is up and running.'
          )
        } else {
          this.openErrorDialog(
            true,
            'Unknown error (' + err.message + ')',
            'Please report this issue to the administrator.'
          )
        }
      })
  }

  handleStart = () => {
    if (this.state.uuid === '') {
      // Warning
      this.openErrorDialog(true, 'Empty')
      return
    }

    //Validate
    this.validateUrl()
  }

  handleExample = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  showError = () => {
    if (this.state.uuid === '') {
      return false
    }

    return this.state.invalidUuid
  }

  render() {
    const examples = Object.keys(EXAMPLE_UUIDS)
    const { anchorEl } = this.state

    return (
      <div style={{ paddingTop: '2em' }}>
        <div style={{ width: '450px' }}>
          <TextField
            style={textFieldStyle}
            placeholder="e.g. http://test.ndexbio.org"
            label="NDEx Server URL"
            margin="normal"
            value={this.state.serverUrl}
            onChange={this.handleUrlChange}
          />

          <div style={{ height: '7em' }}>
            <TextField
              autoFocus={true}
              style={textFieldStyleSmall}
              required={true}
              label="UUID of the main hierarchy"
              value={this.state.uuid}
              margin="normal"
              onChange={this.handleUuidChange}
              error={this.showError()}
              helperText={this.state.errorText}
            />

            <Button
              aria-owns={anchorEl ? 'examples' : null}
              aria-haspopup="true"
              variant="raised"
              onClick={this.handleExample}
            >
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
                  key={option}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleExampleChange(event, index)}
                  value={EXAMPLE_UUIDS[option]}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Button
            color="primary"
            style={startStyle}
            variant="raised"
            onClick={this.handleStart}
            disabled={this.state.invalidUuid}
          >
            Start
          </Button>
        </div>

        <ErrorDialog
          openError={this.state.openError}
          openErrorDialogAction={this.openErrorDialog}
          title={this.state.errorDialogTitle}
          message={this.state.errorDialogMessage}
        />
        <WarningDialog
          open={this.state.openWarning}
          openWarningDialogAction={this.openWarningDialog}
          loadAction={this.loadNetwork}
          title={this.state.warningDialogTitle}
          message={this.state.warningDialogMessage}
        />
      </div>
    )
  }
}

export default SourceSelector
