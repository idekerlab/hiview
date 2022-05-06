import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import Input from '@material-ui/core/Input'
import { Tooltip } from '@material-ui/core'

import HelpButton from './HelpButton'
import SearchOptionDialog from './SearchOptionDialog'

import UCSDLogo from '../../assets/images/ucsd-logo.svg'

const baseStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}

const tooltipStyle = {
  fontSize: '16px',
  fontWeight: '300',
  textAlign: 'center',
}

const ucsdLogoStyle = {
  width: '5.3em',
  marginLeft: '0.5em',
  paddingRight: '0.2em',
}

const buttonStyle = {
  padding: '0.1em',
}

// For hiding background (Use gray scale)
const RESULT_COLOR = {
  root: '#DDDDDD',
  leaf: '#FFFFFF',
}
class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      open: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    })
  }

  handleKey = (event) => {
    const query = this.state.query
    if (event.key === 'Enter' && query !== '') {
      this.search(query)
    }
  }

  handleStart = (event) => {
    const query = this.state.query
    if (query !== '') {
      this.search(query)
    }
  }

  handleReset = (event) => {
    // this.props.renderingOptionsActions.setRootColor(null)
    // this.props.renderingOptionsActions.setLeafColor(null)

    this.props.commandActions.reset()
    this.props.localSearchActions.clearSearchResults()
    this.setState({
      query: '',
    })
    this.props.handleShowResult(false)
  }

  validateQuery = (text) => {
    // Spaces, tabs, and commas will be used as valid separator.
    return text.replace(/,/g, ' ')
  }

  search = (q) => {
    const searchMode = this.props.uiState.get('searchMode')
    const query = this.validateQuery(q)
    const index = this.props.network.index
    this.props.localSearchActions.localSearchStarted({
      index,
      query,
      searchMode,
    })
    this.props.commandActions.reset()
    this.setState({
      expand: true,
    })

    this.props.handleShowResult(true)

    // this.props.renderingOptionsActions.setRootColor(RESULT_COLOR.root)
    // this.props.renderingOptionsActions.setLeafColor(RESULT_COLOR.leaf)
  }

  handleOpen = (event) => {
    const currentPanelState = this.props.uiState.get('showMainMenu')
    this.props.uiStateActions.showMainMenu(!currentPanelState)
  }

  toggleSearchOptionDialog = () => {
    const currentDialogState = this.state.open
    this.setState({
      open: !currentDialogState,
    })
  }

  handleSearchOptionDialogOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleSearchOptionDialogClose = (value) => {
    this.props.uiStateActions.setSearchMode(value)
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div style={baseStyle}>
        <img src={UCSDLogo} alt="UCSD Logo" style={ucsdLogoStyle} />
        <Tooltip
          arrow
          placement={'bottom'}
          title={<span style={tooltipStyle}>Open settings</span>}
        >
          <IconButton style={buttonStyle} aria-label="Open option panel" onClick={this.handleOpen}>
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Input
          style={{ flexGrow: 2, height: '2em', border: 'none' }}
          placeholder="Enter search term."
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          value={this.state.query}
        />

        <Tooltip
          arrow
          placement={'bottom'}
          title={<span style={tooltipStyle}>Start to search hierarchy</span>}
        >
          <IconButton style={buttonStyle} aria-label="Search nodes" onClick={this.handleStart}>
            <SearchIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          arrow
          placement={'bottom'}
          title={<span style={tooltipStyle}>Clear search result</span>}
        >
          <IconButton style={buttonStyle} aria-label="Reset" onClick={this.handleReset}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          arrow
          placement={'bottom'}
          title={<span style={tooltipStyle}>Search options</span>}
        >
          <IconButton
            style={buttonStyle}
            aria-label="Settings"
            onClick={this.handleSearchOptionDialogOpen}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        <div
          style={{
            width: '0.1em',
            height: '2em',
            borderLeft: '1px solid #aaaaaa',
          }}
        />

        <HelpButton style={buttonStyle} />
        <SearchOptionDialog
          searchMode={this.props.uiState.get('searchMode')}
          open={this.state.open}
          onClose={this.handleSearchOptionDialogClose}
        />
      </div>
    )
  }
}

export default MainPanel
