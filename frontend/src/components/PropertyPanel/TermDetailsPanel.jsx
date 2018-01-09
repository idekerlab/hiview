import React, {Component} from 'react'

import Tabs, {Tab} from 'material-ui/Tabs';
import {CircularProgress} from 'material-ui/Progress';

import RawInteractionPanel from './RawInteractionPanel'
import SubsystemPanel from './SubsystemPanel'

import TabContainer from './TabContainer'
import LegendPanel from './LegendPanel'
import {EdgeFilter, PrimaryFilter} from '../Filters'


import GeneList from './GeneList'

import * as StyleFactory from './StyleFactory'

import GroupSelector from '../GroupSelector'
import CirclePacking from "../CirclePacking/index";
import ColorMapSelector from './ColorMapSelector'


import LayoutSelector from '../LayoutSelector'


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


  addStyle(rawInteractions) {
    const networkStyle = StyleFactory.createStyle(rawInteractions)

    this.props.interactionStyleActions.addStyle({
      name: 'defaultStyle',
      style: networkStyle,
    })
  }

  componentDidUpdate() {
    // this.createFilter(this.props.rawInteractions)
  }

  componentDidMount() {
    // this.createFilter(this.props.rawInteractions)
  }

  componentWillReceiveProps(nextProps) {
    // this.createFilter(nextProps.rawInteractions)
    if (nextProps.rawInteractions !== this.props.rawInteractions) {
      this.addStyle(nextProps.rawInteractions)
    }
  }

  setScore = (val) => {
    this.setState({scoreFilter: val})

    this.props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  render() {
    const raw = this.props.rawInteractions.toJS();
    const interactions = raw.interactions

    // Loading
    if (raw.loading) {
      const loadingStyle = {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

      }
      return (
        <div style={loadingStyle}>
          < CircularProgress size={300} thickness={2}/>
        </div>
      )
    }

    // Term property
    const details = this.props.currentProperty
    if (details === undefined || details === null || details.id === null || details.id === undefined) {
      return (
        <div></div>
      )
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
    if (interactions !== undefined && interactions !== null) {
      networkProps = interactions.data
    }

    const visualStyle = this.props.interactionStyle.get('defaultStyle')
    if (visualStyle !== null && visualStyle !== undefined) {
      visualStyle.name = 'defaultStyle'
    }

    const filterPanelStyle = {
      display: 'inline-flex',
      height: '17em',
      width: '100%',
      padding: '0.6em',
      backgroundColor: '#F5F5F5'
      // borderTop: 'solid 1px #444444',
      // borderBottom: 'solid 1px #444444'
    }

    const controlPanelStyle = {
      padding: '1em',
    }


    const uuid = this.props.datasource.get('uuid')
    const url = this.props.cxtoolUrl + uuid + '?server=test'
    const network = this.props.network.get(url)

    let networkData = {}
    if (network !== undefined) {
      networkData = network.data
    }

    const containerStyle = {
      display: 'flex',
      flexDirection: this.props.expanded ? 'row' : 'column'

    }

    const controlWrapperStyle = {
      width: '100%',
      maxWidth: 450
    }

    return (
      <div style={containerStyle}>
        <RawInteractionPanel
          subnet={interactions}
          selectedTerm={this.props.currentProperty.id}
          handleClose={this.props.handleClose}

          commandActions={this.props.interactionsCommandActions}
          commands={this.props.interactionsCommands}

          loading={raw.loading}

          selection={this.props.selection}
          selectionActions={this.props.selectionActions}

          filters={raw.filters}
          interactionStyleActions={this.props.interactionStyleActions}
          networkStyle={visualStyle}

          panelWidth={this.props.width}
          panelHeight={this.props.height}
          expanded={this.props.expanded}
        />

        <div style={controlWrapperStyle}>
          <div style={controlPanelStyle}>
            <LegendPanel
              networkProps={networkProps}
            />

            <PrimaryFilter
              filters={raw.filters}
              commandActions={this.props.interactionsCommandActions}
              commands={this.props.interactionsCommands}
              filtersActions={this.props.filtersActions}
            />

            <LayoutSelector
              commandActions={this.props.interactionsCommandActions}
            />
          </div>

          <div style={filterPanelStyle}>
            <GroupSelector
              groups={raw.groups}
              commandActions={this.props.interactionsCommandActions}
            />

            <EdgeFilter
              filters={raw.filters}
              commandActions={this.props.interactionsCommandActions}
              commands={this.props.interactionsCommands}
              filtersActions={this.props.filtersActions}
            />
          </div>

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
                selectedTerm={this.props.currentProperty}
                networkData={networkData}
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
      </div>
    )
  }

  handleChange = (event, value) => {
    this.setState({selectedTab: value})
  }

}

export default TermDetailsPanel
