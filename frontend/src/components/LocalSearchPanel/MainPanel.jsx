import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import Input from '@material-ui/core/Input'

import SearchOptionDialog from './SearchOptionDialog'

const baseStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}

// For hiding background (Use gray scale)
const RESULT_COLOR = {
  root: '#DDDDDD',
  leaf: '#FFFFFF'
}
class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      open: false
    }
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    })
  }

  handleKey = event => {
    const query = this.state.query
    if (event.key === 'Enter' && query !== '') {
      this.search(query)
    }
  }

  handleStart = event => {
    const query = this.state.query
    if (query !== '') {
      this.search(query)
    }
  }

  handleReset = event => {
    // this.props.renderingOptionsActions.setRootColor(null)
    // this.props.renderingOptionsActions.setLeafColor(null)

    this.props.commandActions.reset()
    this.props.localSearchActions.clearSearchResults()
    this.setState({
      query: ''
    })
    this.props.handleShowResult(false)
  }

  validateQuery = text => {
    // Spaces, tabs, and commas will be used as valid separator.
    return text.replace(/,/g, ' ')
  }

  search = q => {
    const searchMode = this.props.uiState.get('searchMode')
    const query = this.validateQuery(q)
    const index = this.props.network.index
    this.props.localSearchActions.localSearchStarted({
      index,
      query,
      searchMode
    })
    this.props.commandActions.reset()
    this.setState({
      expand: true
    })

    this.props.handleShowResult(true)

    // this.props.renderingOptionsActions.setRootColor(RESULT_COLOR.root)
    // this.props.renderingOptionsActions.setLeafColor(RESULT_COLOR.leaf)
  }

  handleOpen = event => {
    const currentPanelState = this.props.uiState.get('showMainMenu')
    this.props.uiStateActions.showMainMenu(!currentPanelState)
  }

  toggleSearchOptionDialog = () => {
    const currentDialogState = this.state.open
    this.setState({
      open: !currentDialogState
    })
  }

  handleSearchOptionDialogOpen = () => {
    this.setState({
      open: true
    })
  }

  handleSearchOptionDialogClose = value => {
    this.props.uiStateActions.setSearchMode(value)
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div style={baseStyle}>
        <IconButton aria-label="Open main menu" onClick={this.handleOpen}>
          <MenuIcon />
        </IconButton>

        <Input
          style={{ flexGrow: 5, height: '2em', border: 'none' }}
          placeholder="Enter search term."
          inputProps={{
            'aria-label': 'Description'
          }}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          value={this.state.query}
        />

        <IconButton aria-label="Search nodes" onClick={this.handleStart}>
          <SearchIcon />
        </IconButton>

        <IconButton aria-label="Reset" onClick={this.handleReset}>
          <RefreshIcon />
        </IconButton>
        <div
          style={{
            width: '0.1em',
            height: '2em',
            borderLeft: '1px solid #aaaaaa'
          }}
        />
        <IconButton
          aria-label="Settings"
          onClick={this.handleSearchOptionDialogOpen}
        >
          <SettingsIcon />
        </IconButton>
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
