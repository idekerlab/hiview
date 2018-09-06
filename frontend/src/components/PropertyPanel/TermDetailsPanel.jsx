import React, { Component } from 'react'

import Tabs, { Tab } from 'material-ui/Tabs'
import { CircularProgress } from 'material-ui/Progress'

import RawInteractionPanel from './RawInteractionPanel'
import SubsystemPanel from './SubsystemPanel'

import TabContainer from './TabContainer'
import LegendPanel from './LegendPanel'
import { EdgeFilter, PrimaryFilter } from '../Filters'

import GeneList from './GeneList'

import * as StyleFactory from './StyleFactory'

import LayoutSelector from '../LayoutSelector'
import EmptyInteractionPanel from './EmptyInteractionPanel.jsx'
import MaxEdgePanel from './MaxEdgePanel'
import MessageBar from './MessageBar'

import CrossFilter from '../CrossFilter'
import SplitPane from 'react-split-pane'

const controlWrapperStyle = {
  width: '100%'
  // maxWidth: 450
}

const filterPanelStyle = {
  display: 'inline-flex',
  height: '17em',
  width: '100%',
  padding: '0.6em',
  background: '#FFFFFF'
}

const controlPanelStyle = {
  padding: '1em',
  background: '#FFFFFF'
}

class TermDetailsPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtree: {},
      scoreFilter: 1.0,
      subnet: {},
      selectedTab: 0,
      networkPanelHeight: window.innerHeight * 0.5
    }
  }

  addStyle(rawInteractions) {
    const networkStyle = StyleFactory.createStyle(rawInteractions)

    this.props.interactionStyleActions.addStyle({
      name: 'defaultStyle',
      style: networkStyle
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rawInteractions !== this.props.rawInteractions) {
      this.addStyle(nextProps.rawInteractions)
    }
  }

  setScore = val => {
    this.setState({ scoreFilter: val })

    this.props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  handleResize = e => {
    //resize
    this.props.interactionsCommandActions.fit()
  }


  handleHorizontalResize = topHeight => {
    this.setState({
      networkPanelHeight: topHeight
    })
    console.log('New H:', topHeight)
  }

  render() {
    // Still loading interaction...
    const loading = this.props.rawInteractions.get('loading')
    if (loading) {
      const loadingStyle = {
        display: 'flex',
        width: this.props.width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#F0F0F0'
      }

      const loadingMessageStyle = {
        color: '#555555',
        fontSize: '2em',
        fontWeight: 300
      }

      return (
        <div style={loadingStyle}>
          <div style={loadingMessageStyle}>Loading Interactions...</div>
          <CircularProgress size={300} thickness={1} />
        </div>
      )
    }

    const raw = this.props.rawInteractions.toJS()
    const interactions = raw.interactions
    const selected = raw.selected
    // Permanent selection
    const selectedPerm = raw.selectedPerm

    // Term property
    const details = this.props.currentProperty
    if (
      details === undefined ||
      details === null ||
      details.id === null ||
      details.id === undefined
    ) {
      return <div />
    }

    // This is the details about current subsystem
    let hidden = false
    const data = details.data
    if (!data['ndex_internalLink']) {
      // No interaction data
      hidden = true
    }

    let entry = {}
    let subnet = null

    let geneList = []
    if (data === undefined) {
      entry = {}
    } else {
      entry = data
      subnet = interactions

      if (subnet !== null && subnet !== undefined) {
        geneList = subnet.elements.nodes.map(node => node.data.name)
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

    const uuid = this.props.datasource.get('uuid')
    const serverType = this.props.datasource.get('serverType')
    const url = this.props.cxtoolUrl + uuid + '?server=' + serverType
    const network = this.props.network.get(url)

    let networkData = {}
    if (network !== undefined || network === null) {
      networkData = network.data
    }

    const containerStyle = {
    }

    const propPanelStyle = {
      width: this.props.width,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }

    console.log('HHHHHHHHHHHHHHHHHHHHH - WWWWWW', this.state.networkPanelHeight, this.props.width)
    return (
      <div style={containerStyle}>
        <SplitPane
          split="horizontal"
          minSize={50}
          size={this.state.networkPanelHeight}
          onDragFinished={topHeight => this.handleHorizontalResize(topHeight)}
        >
          <div style={{background: ''}}>
            <div style={{ width: '100%', height: '5.2em' }} />

            {hidden ? (
              <EmptyInteractionPanel height={this.state.networkPanelHeight} />
            ) : (
              <RawInteractionPanel
                subnet={interactions}
                subnetSelected={selected}
                subnetSelectedPerm={selectedPerm}
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
                panelHeight={this.state.networkPanelHeight}
                expanded={this.props.expanded}
                enrichment={this.props.enrichment}
                enrichmentActions={this.props.enrichmentActions}
                uiState={this.props.uiState}
              />
            )}
          </div>

          <div style={propPanelStyle}>
            <MessageBar
              originalEdgeCount={this.props.originalEdgeCount}
              maxEdgeCount={this.props.maxEdgeCount}
            />

            <div style={{ zIndex: 1111 }}>
              <div style={controlWrapperStyle}>
                {this.props.expanded ? (
                  <div style={{ height: '5.2em' }} />
                ) : (
                  <div />
                )}

                {hidden ? (
                  <div />
                ) : (
                  <div style={controlPanelStyle}>
                    <CrossFilter
                      panelWidth={this.props.width}
                      networkData={interactions.data}
                      originalEdgeCount={this.props.originalEdgeCount}
                      maxEdgeCount={this.props.maxEdgeCount}
                    />

                    <LegendPanel networkProps={networkProps} />

                    <PrimaryFilter
                      filters={raw.filters}
                      commandActions={this.props.interactionsCommandActions}
                      commands={this.props.interactionsCommands}
                      filtersActions={this.props.filtersActions}
                    />

                    <LayoutSelector
                      commandActions={this.props.interactionsCommandActions}
                    />

                    <MaxEdgePanel
                      maxEdgeCount={this.props.maxEdgeCount}
                      uiState={this.props.uiState}
                      uiStateActions={this.props.uiStateActions}
                      rawInteractionsActions={this.props.rawInteractionsActions}
                    />
                  </div>
                )}

                {hidden ? (
                  <div />
                ) : (
                  <div style={filterPanelStyle}>
                    <EdgeFilter
                      filters={raw.filters}
                      commandActions={this.props.interactionsCommandActions}
                      commands={this.props.interactionsCommands}
                      filtersActions={this.props.filtersActions}
                    />
                  </div>
                )}

                <div>
                  <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleChange}
                  >
                    <Tab label="Subsystem Details" />
                    <Tab label="Assigned Genes" />
                    <Tab label="Interactions" />
                  </Tabs>
                </div>

                {this.state.selectedTab === 0 && (
                  <TabContainer>
                    <SubsystemPanel
                      selectedTerm={this.props.currentProperty}
                      networkData={networkData}
                      title={title}
                      description={'N/A'}
                    />
                  </TabContainer>
                )}
                {this.state.selectedTab === 1 && (
                  <TabContainer>
                    <GeneList genes={geneList} />
                  </TabContainer>
                )}
                {this.state.selectedTab === 2 && (
                  <TabContainer>N/A</TabContainer>
                )}
              </div>
            </div>
          </div>
        </SplitPane>
      </div>
    )
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value })
  }
}

export default TermDetailsPanel
