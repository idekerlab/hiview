import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

const SEARCH_URL = 'http://test.ndexbio.org/v2/search/network/'

class FullSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }


  handleChange = event => {
    this.setState({
      query: event.target.value
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
      uuid: this.props.datasource.uuid
    }

    this.props.searchActions.searchNdex(query, options)
  }


  render() {

    const baseStyle = {
      display: 'flex',
      position: 'fixed',
      top: '1em',
      left: '1em',
      zIndex: 1200,
      width: '50em',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '3em',
      //   background: 'rgba(222,222,222,0.8)',
      padding: '0.8em'
    }

    return (
      <div style={baseStyle}>
        <TextField
          style={{width: '20em', fontSize: '1.5em'}}
          placeholder='e.g. brca1'
          label='Search Terms/Genes'
          margin="normal"
          value={this.state.serverUrl}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
        />

        <Button
          raised
          color="primary"
          onClick={this.handleStart}
        >
          Search
        </Button>

      </div>
    )
  }
}

export default FullSearch
