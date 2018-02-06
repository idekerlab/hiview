import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'

import {withStyles} from 'material-ui/styles';


class SimpleSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      name2id: null
    }
  }


  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  }

  handleKey = event => {
    if (event.key === 'Enter') {
      this.search()
    }
  }

  handleStart = event => {
    this.search()
  }

  search() {

    const query = this.state.query
    console.log("Q = " + query)

    if(query === undefined || query === '') {
      return
    }

    let index = this.state.index

    if(index === null || index === undefined) {
      index = this.runIndexer()
      this.setState({index: index})
    }

    const nodeId = index.get(query.toUpperCase())


    if(nodeId !== undefined) {
      this.props.commandActions.zoomToNode(nodeId)
    }

  }

  createIndex = network => {

    const name2id = new Map()

    const nodes = network.elements.nodes
    let i = nodes.length
    while(i--) {
      const node = nodes[i]

      const labelUpper = node.data.Label.toUpperCase()

      name2id.set(labelUpper, node.data.id)
    }

    this.name2id = name2id

    console.log('(((((((((((((((((((((((((( ready')
    console.log(name2id)


    return name2id
  }


  componentWillReceiveProps(nextProps) {
    const uuid = this.props.datasource.uuid
    const uuidNew = nextProps.datasource.uuid

    if(uuid !== uuidNew) {
      // Need to re-index

      const networkKeys = Object.keys(nextProps.network)

      let network = null

      networkKeys.forEach(key => {
        if(key.includes(uuid)) {
          console.log("FOUND@@")
          console.log(uuid)
          console.log(key)
          network = this.props.network[key]
        }
      })

      if(network !== undefined) {
        this.createIndex(network)
      }
    }
  }

  componentDidMount() {
    this.runIndexer()
  }

  runIndexer() {
    const uuid = this.props.datasource.uuid
    const networkKeys = Object.keys(this.props.network)

    let network = null
    networkKeys.forEach(key => {
      if(key.includes(uuid)) {
        console.log("0FOUND@@")
        console.log(uuid)
        console.log(key)
        network = this.props.network[key]
      }
    })

    if(network !== undefined && network !== null) {
      return this.createIndex(network)
    }

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

export default SimpleSearch
