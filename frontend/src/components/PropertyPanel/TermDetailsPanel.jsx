import React, {Component} from 'react'

import Tabs, {Tab} from 'material-ui/Tabs';
import {CircularProgress} from 'material-ui/Progress';


import RawInteractionPanel from './RawInteractionPanel'

import SubsystemPanel from './SubsystemPanel'

import TabContainer from './TabContainer'
import LegendPanel from './LegendPanel'
import {EdgeFilter} from '../Filters'


import GeneList from './GeneList'


const MAIN_EDGE_TAG = 'Main Feature'

const PATTERN = /[ -]/g


class TermDetailsPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {},
      selectedTab: 0
    }
  }

  componentDidUpdate() {
    this.createFilter(this.props.rawInteractions)
  }

  componentDidMount() {
    this.createFilter(this.props.rawInteractions)
  }

  componentWillReceiveProps(nextProps) {
    // this.createFilter(nextProps.rawInteractions)

  }


  shouldComponentUpdate(nextProps, nextState) {
    console.log('SHOULD CALLED(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((')
    const raw = this.props.rawInteractions;
    const newRaw = nextProps.rawInteractions;

    const filters = this.props.filters
    const newFilters = nextProps.filters

    console.log(this.props.filters)
    console.log(nextProps)
    if (raw === newRaw) {
      console.log("NO need to up")

      if(filters.size === 0 && newFilters.size !== 0) {
        return true
      } else {
        return false
      }
    }

    console.log("up called")
    return true

  }

  setScore = (val) => {
    this.setState({scoreFilter: val})
    console.log('New Score: ' + val)

    this.props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  createFilter = (rawInteractions) => {
    console.log('NEXTPROPFILTER%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(this.props)
    const raw = rawInteractions.toJS();
    const network = raw.interactions


    // 1. Extract props from network data

    const edgeTypes = {}

    let mainEdgeType = null

    if (network !== undefined && network.data !== undefined) {
      mainEdgeType = network.data[MAIN_EDGE_TAG].replace(PATTERN, '_')


      for (let [key, value] of Object.entries(network.data)) {

        if (key === MAIN_EDGE_TAG) {
          continue
        }


        console.log(key + ' = ' + value)

        const keyParts = key.split(' ')
        const suffix = keyParts[keyParts.length - 1]
        console.log(suffix)

        const realKey = key.replace(suffix, '').trim()
        console.log('RZeal key = ' + realKey)

        const edgeTypeName = realKey.replace(PATTERN, '_')
        const currentValue = edgeTypes[edgeTypeName]
        if (currentValue === undefined) {
          const newEntry = {}
          newEntry[suffix] = value
          edgeTypes[edgeTypeName] = newEntry
        } else {
          currentValue[suffix] = value
          edgeTypes[edgeTypeName] = currentValue
        }
      }

      console.log(edgeTypes)


    }

    for (let [key, value] of Object.entries(edgeTypes)){
      if(value.type === 'numeric') {

        const isPrimary = (mainEdgeType === key)

        this.props.filtersActions.addFilter({
          attributeName: key,
          min: value.min,
          max: value.max,
          value: value.min,
          isPrimary: isPrimary,
          enabled: isPrimary,
          type: 'continuous'
        })
      } else if(value.type === 'boolean') {
        this.props.filtersActions.addFilter({
          attributeName: key,
          isPrimary: false,
          enabled: false,
          type: 'boolean'
        })

      }

    }

  }


  render() {
    const raw = this.props.rawInteractions.toJS();
    const interactions = raw.interactions

    // Term property
    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      return (
        <div></div>
      )
    }

    // Loading
    if (details.loading) {
      return (<CircularProgress/>)
    }

    const data = details.data

    let entry = {}

    let subnet = null

    let geneList = []
    if (data === undefined) {
      entry = {}
    } else {
      entry = data
      subnet = interactions

      if (subnet !== null && subnet !== undefined) {
        geneList = subnet.elements.nodes.map(node => (node.data.name))
      }
    }

    const title = data.name
    let networkProps = {}
    if (interactions !== undefined) {
      networkProps = interactions.data
    }


    return (
      <div>
        <RawInteractionPanel
          subnet={interactions}
          selectedTerm={this.props.currentProperty.id}
          handleClose={this.props.handleClose}
          commandActions={this.props.commandActions}
          loading={this.props.currentProperty.loading}

          selection={this.props.selection}
          selectionActions={this.props.selectionActions}

          filters={this.props.filters}
        />

        <LegendPanel
          networkProps={networkProps}
        />

        <EdgeFilter
          filters={this.props.filters}
          filtersActions={this.props.filtersActions}
        />


        <div>
          <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
            <Tab label="Subsystem Details"/>
            <Tab label="Assigned Genes"/>
            <Tab label="Interactions"/>
          </Tabs>
        </div>

        {
          this.state.selectedTab === 0 &&
          <TabContainer>
            <SubsystemPanel
              title={title}
              description={'N/A'}
            />
          </TabContainer>}
        {
          this.state.selectedTab === 1 &&
          <TabContainer>
            <GeneList
              genes={geneList}
            />
          </TabContainer>}
        {this.state.selectedTab === 2 && <TabContainer>N/A</TabContainer>}
      </div>
    )
  }

  handleChange = (event, value) => {
    this.setState({selectedTab: value})
  }

}

export default TermDetailsPanel
