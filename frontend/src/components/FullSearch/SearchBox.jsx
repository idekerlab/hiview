import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

const SEARCH_URL = 'http://test.ndexbio.org/v2/search/network/'


const baseStyle = {
}


class SearchBox extends Component {

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
    return (
      <div style={baseStyle}>
        <TextField
          style={{width: '8em', fontSize: '1.5em'}}
          placeholder='e.g. brca1'
          label='Search Terms/Genes'
          margin="normal"
          value={this.state.serverUrl}
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
        />

        <Button
          variant="raised"
          color="primary"
          onClick={this.handleStart}
        >
          Search
        </Button>

      </div>
    )
  }
}

export default SearchBox
