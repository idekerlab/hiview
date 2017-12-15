import React from 'react'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import SearchIcon from 'material-ui-icons/Search'
import RefreshIcon from 'material-ui-icons/Refresh'
import Input from 'material-ui/Input'

import SearchPanel from './SearchPanel'
const SEARCH_URL = 'http://test.ndexbio.org/v2/search/network/'

const baseStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',

}



class MainPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
    }
  }


  handleChange = event => {
    this.setState({
      query: event.target.value,
    });
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


  search = (query) => {
    const options = {
      baseUrl: SEARCH_URL,
      uuid: this.props.datasource.uuid,
    }

    this.props.searchActions.searchNdex(query, options)

    this.setState({
      expand: true,
    })
  }


  render() {

    const { classes } = this.props;

    return (
      <div style={baseStyle}>

        <IconButton
          aria-label="Open main menu">
          <MenuIcon/>
        </IconButton>


        <Input
          style={{flexGrow: 5, height: '2em', border: 'none'}}
          placeholder="Enter search term."
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
        />


        <IconButton
          aria-label="Search nodes">
          <SearchIcon/>
        </IconButton>

        <div style={{width: '0.1em', height: '2em', borderLeft: '1px solid #aaaaaa'}}/>
        <IconButton
          aria-label="Reset">
          <RefreshIcon/>
        </IconButton>

      </div>
    )
  }
}




export default MainPanel
