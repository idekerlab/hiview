import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
    fontSize: '2em'
  },
});


class SimpleSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }


  handleQueryChange = event => {
    this.setState({
      url: event.target.value,
    })
  }

  handleSearch = event => {
    this.setState({
      url: event.target.value,
    })
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
          label='Search Terms/Genes (exact match only)'
          margin="normal"
          value={this.state.serverUrl}
          onChange={this.handleUrlChange}
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

export default SimpleSearch
