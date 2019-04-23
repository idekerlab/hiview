import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import Input from '@material-ui/core/Input'

const SEARCH_URL = 'http://test.ndexbio.org/v2/search/network/'

const baseStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}

class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
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
      const index = this.props.network.index
      this.props.localSearchActions.localSearchStarted({ index, query })
      this.search(query)
    }
  }

  handleStart = event => {
    const query = this.state.query
    if (query !== '') {
      const index = this.props.network.index
      this.props.localSearchActions.localSearchStarted({ index, query })
      this.search(query)
    }
  }

  handleReset = event => {
    this.props.searchActions.clear()
    this.props.commandActions.reset()
    // this.props.commandActions.fit()
  }

  search = query => {
    this.props.searchActions.clear()
    this.props.commandActions.reset()


    // const results = index.search(query)
    // const ids = results.map(result => result.id)

    // const uuid = this.props.routeParams.uuid
    // const options = {
    //   baseUrl: SEARCH_URL,
    //   uuid: uuid
    // }

    // this.props.searchActions.searchNdex(query, options)
    // this.props.searchActions.setSearchResult(query, options, ids)

    this.setState({
      expand: true
    })
  }

  handleOpen = event => {
    const currentPanelState = this.props.uiState.get('showMainMenu')
    this.props.uiStateActions.showMainMenu(!currentPanelState)
  }

  render() {
    const { classes } = this.props

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
        />

        <IconButton aria-label="Search nodes" onClick={this.handleStart}>
          <SearchIcon />
        </IconButton>

        <div
          style={{
            width: '0.1em',
            height: '2em',
            borderLeft: '1px solid #aaaaaa'
          }}
        />
        <IconButton aria-label="Reset" onClick={this.handleReset}>
          <RefreshIcon />
        </IconButton>
      </div>
    )
  }
}

export default MainPanel
