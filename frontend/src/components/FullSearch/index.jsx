import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

const SEARCH_URL = 'http://test.ndexbio.org/v2/search/network/'

import {Transition} from 'react-transition-group'


const duration = 500


const animationStyle = {
  transition: 'width 0.75s cubic-bezier(0.000, 0.795, 0.000, 1.000)',
}


class FullSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      expand: false,
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

    const baseStyle = {
      display: 'flex',
      position: 'fixed',
      top: '0.5em',
      left: '0.5em',
      zIndex: 1200,
      width: '30em',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '3em',
      // background: 'blue',
      padding: '0.8em',
      transition: `background ${duration}ms ease-in-out, height ${duration}ms ease-in-out`
    }

    const transitionStyles = {
      entering: {
        background: '#FFFFFF',
        height: '3em',
      },
      entered: {
        background: '#EEEEFF',
        height: '30em',
      },
    }

    return (
      <Transition in={this.state.expand} timeout={duration}>

        {(state) => (
          <div style={
            {
              ...baseStyle,
              ...transitionStyles[state]
            }
          }>
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
        )}
      </Transition>
    )
  }
}

export default FullSearch
