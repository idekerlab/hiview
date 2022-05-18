import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import HtmlTooltip from '../NdexLogin/HtmlTooltip'
import SettingsIcon from '@material-ui/icons/Settings'

import { browserHistory } from 'react-router'

import WarningDialog from './WarningDialog'
import ErrorDialog from './ErrorDialog'

import OpenNDExLoginButton from '../NdexLogin/OpenNdexLoginButton'
import Typography from '@material-ui/core/Typography'

import { getHeader } from '../AccessUtil'

const OBJECT_COUNT_TH = 10000

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const textFieldStyle = {
  width: '100%',
  fontSize: '2em',
}

const textFieldStyleSmall = {
  width: '100%',
  fontSize: '2em',
  marginRight: '0.5em',
}

const startStyle = {
  width: '100%',
  marginTop: '2em',
}

const buttonStyle = {
  margin: '0.25em',
  width: '70px',
  height: '3.5em',
}

const buttonIconStyle = {
  fontSize: '2.5em',
}

const DEFAULT_EXAMPLE = 'NeST v1.0'
const GO_PREFIX = 'Gene Ontology:'

const EXAMPLE_UUIDS = {
  [DEFAULT_EXAMPLE]: '274fcd6c-1adc-11ea-a741-0660b7976219',
  // 'Gene Ontology: BP': '9166bc71-7bef-11e9-848d-0ac135e8bacf',
  // 'Gene Ontology: CC': '0a393b91-7be9-11e9-848d-0ac135e8bacf',
  // 'Gene Ontology: MF': '21892e2b-7beb-11e9-848d-0ac135e8bacf'
}

class SourceSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uuid: '',
      serverUrl: 'https://test.ndexbio.org',
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
      warningDialogTitle: 'Warning',
      isValidUrl: true,
      showServer: false,
    }
  }

  checkUuid = uuid => {
    if (uuid.match(UUID_PATTERN) !== null) {
      this.setState({
        invalidUuid: false,
        errorText: '',
      })
    } else {
      this.setState({
        invalidUuid: true,
        errorText: 'Invalid UUID',
      })
    }
  }

  handleUuidChange = event => {
    const currentVal = event.target.value

    this.setState({
      uuid: currentVal,
    })

    this.checkUuid(currentVal)
  }

  showUrlError = () => {
    this.openErrorDialog(
      true,
      'Server type is invalid',
      'Currently, we only supports public.ndexbio.org and test.ndexbio.org as backend server.  ' +
        'Please check the server URL again.',
    )
  }

  handleUrlChange = event => {
    const url = event.target.value
    let urlObj = null

    try {
      urlObj = new URL(url)
      this.setState({ isValidUrl: true })
    } catch (e) {
      this.showUrlError()
      this.setState({
        serverUrl: 'https://test.ndexbio.org',
        serverType: 'test',
      })
      return
    }

    const type = this.getServerType(urlObj)
    if (type === null) {
      this.showUrlError()
      return
    }

    this.setState({
      serverUrl: event.target.value,
      serverType: type,
    })
  }

  getServerType = url => {
    const hostName = url.host
    const parts = hostName.split('.')

    if (parts.length === 0) {
      return null
    }

    return parts[0]
  }

  handleExampleChange = (event, idx) => {
    const uuid = Object.values(EXAMPLE_UUIDS)[idx]
    const name = Object.keys(EXAMPLE_UUIDS)[idx]

    if (name.startsWith(GO_PREFIX)) {
      this.setState({
        serverUrl: 'https://public.ndexbio.org',
        serverType: 'public',
      })
    }
    this.setState({ anchorEl: null })

    this.setState({
      example: uuid,
      uuid: uuid,
      selectedIndex: idx,
    })

    this.checkUuid(uuid)
  }

  openErrorDialog = (openError, title = '', message = '') => {
    this.setState({
      openError,
      errorDialogTitle: title,
      errorDialogMessage: message,
    })
  }

  openWarningDialog = (openWarning, title = '', message = '') => {
    this.setState({
      openWarning,
      warningDialogTitle: title,
      warningDialogMessage: message,
    })
  }

  checkNetworkSummary = summary => {
    this.props.networkActions.setSummary(summary)
    const edgeCount = summary.edgeCount
    const nodeCount = summary.nodeCount

    const title = 'Warning: Large Hierarchy (' + nodeCount + ' nodes / ' + edgeCount + ' edges)'

    const message =
      'You are about to load a large hierarchy.  ' +
      'This may take a very long time to load and may crash your browser.' +
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
    const credentials = this.props.credentials

    let headers = null
    if (credentials.loginDetails !== null) {
      headers = getHeader(credentials)
    }

    const url = this.state.serverUrl + '/v2/network/' + this.state.uuid + '/summary'

    const settings = {
      method: 'GET',
    }

    if (headers !== null) {
      settings['headers'] = headers
    }

    fetch(url, settings)
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
            'Please check the UUID and server address to make sure they actually exist.',
          )
        } else if (err.message === '401') {
          this.openErrorDialog(
            true,
            'NDEx server returned an error (401)',
            'You are not authorized to access this hierarchy. Please login to the NDEx server first.',
          )
        } else if (err.message === '500') {
          this.openErrorDialog(
            true,
            'NDEx server returned an error (500)',
            'Please visit NDEx web site to check the server is up and running.',
          )
        } else {
          this.openErrorDialog(
            true,
            'Unknown error (' + err.message + ')',
            'Please report this issue to the administrator.',
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

  loginStateUpdated = loginState => {
    this.props.credentialsActions.setCredentials(loginState)
  }

  render() {
    const examples = Object.keys(EXAMPLE_UUIDS)
    const { anchorEl } = this.state

    return (
      <div>
        <div style={containerStyle}>
          <div style={examplePanelStyle}>
            <TextField
              autoFocus={true}
              style={textFieldStyleSmall}
              label="UUID of the main hierarchy"
              value={this.state.uuid}
              margin="normal"
              onChange={this.handleUuidChange}
              error={this.showError()}
              helperText={this.state.errorText}
            />

            <OpenNDExLoginButton ndexServer={this.state.serverUrl} onLoginStateUpdated={this.loginStateUpdated} />
            <div>
              <HtmlTooltip
                placement={'right'}
                title={
                  <React.Fragment>
                    <Typography variant={'subtitle1'} color={'inherit'}>
                      {'Change NDEx server'}
                    </Typography>
                    <Typography variant={'body1'}>
                      {'The default server is test.ndexbio.org. Click to change servers.'}
                    </Typography>
                  </React.Fragment>
                }
              >
                <Button
                  style={buttonStyle}
                  variant={'outlined'}
                  onClick={() => {
                    this.setState({
                      showServer: !this.state.showServer,
                    })
                  }}
                >
                  <SettingsIcon style={buttonIconStyle} />
                </Button>
              </HtmlTooltip>
            </div>
          </div>
          {this.state.showServer ? (
            <TextField
              type={'url'}
              error={!this.state.isValidUrl}
              style={textFieldStyle}
              placeholder="e.g. https://test.ndexbio.org"
              label="NDEx Server URL"
              margin="normal"
              value={this.state.serverUrl}
              onChange={this.handleUrlChange}
            />
          ) : null}
          <Button
            color="primary"
            style={startStyle}
            variant="contained"
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

const containerStyle = {
  width: '45em',
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const examplePanelStyle = {
  height: '5em',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}

export default SourceSelector
