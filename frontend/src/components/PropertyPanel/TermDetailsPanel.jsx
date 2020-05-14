import React, { useState, useEffect } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import RawInteractionPanel from './RawInteractionPanel'
import SubsystemPanel from './SubsystemPanel'

import TabContainer from './TabContainer'
import { EdgeFilter, PrimaryFilter } from '../Filters'

import GeneList from './GeneList'

import * as StyleFactory from './StyleFactory'

import LayoutSelector from '../LayoutSelector'
import EmptyInteractionPanel from './EmptyInteractionPanel.jsx'
import MaxEdgePanel from './MaxEdgePanel'
import MessageBar from './MessageBar'

import CrossFilter from '../CrossFilter'
import SplitPane from 'react-split-pane'
import LoadingPanel from './LoadingPanel'
import AutoLoadThresholdPanel from './AutoLoadThresholdPanel'
import InteractionNetworkSelector from '../InteractionNetworkSelector'
import CytoscapeViewer from '../CytoscapeViewer'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const WARNING_TH = 2000000

const filterPanelStyle = {
  display: 'inline-flex',
  boxSizing: 'border-box',
  width: '100%',
  padding: '0.6em',
  background: '#FFFFFF'
}

const controlPanelStyle = {
  boxSizing: 'border-box'
}

const layoutPanelStyle = {
  background: '#EEEEEE'
}

const controllerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '6em',
  background: '#EEEEEE'
}

const headingStyle = {
  fontSize: '1em',
  fontWeight: 400
}
const DUMMY_STYLE = {
  style: []
}

const TermDetailsPanel = props => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [networkPanelHeight, setNetworkPanelHeight] = useState(
    window.innerHeight * 0.5
  )

  const [vs, setVS] = useState(null)
  const [systemID, setSystemID] = useState(null)

  const addStyle = rawInteractions => {
    const networkStyle = StyleFactory.createStyle(rawInteractions)
    setVS(networkStyle)
  }

  const setScore = val => {
    props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']'
      },
      target: 'subnet'
    })
  }

  useEffect(() => {
    const newID = props.selection.get('main').nodeId
    if (vs === null || systemID !== newID) {
      console.log(
        '## VS builder------------------------------------------------',
        systemID,
        newID
      )
      setSystemID(newID)
      addStyle(props.rawInteractions)
    }
  }, [props.rawInteractions, props.selection.get('main')])

  const handleChange = (event, value) => {
    setSelectedTab(value)
  }

  const handleResize = e => {
    props.interactionsCommandActions.fit()
  }

  const handleHorizontalResize = topHeight => {
    setNetworkPanelHeight(topHeight)
  }

  const getControllers = (
    externalNetwork,
    layoutPanelStyle,
    networkProps,
    controllerStyle,
    raw
  ) => {
    if (externalNetwork !== null) {
      const others = props
      return (
        <LayoutSelector
          style={layoutPanelStyle}
          commandActions={props.interactionsCommandActions}
          {...others}
        />
      )
    }

    return (
      <React.Fragment>
        <LayoutSelector
          style={layoutPanelStyle}
          commandActions={props.interactionsCommandActions}
        />

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Primary Score Filter</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CrossFilter
              panelWidth={props.width * 0.9}
              networkData={networkProps}
              originalEdgeCount={props.originalEdgeCount}
              maxEdgeCount={props.maxEdgeCount}
              filters={raw.filters}
              commandActions={props.interactionsCommandActions}
              commands={props.interactionsCommands}
              filtersActions={props.filtersActions}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div style={controllerStyle}>
          <AutoLoadThresholdPanel
            autoLoadThreshold={props.autoLoadThreshold}
            rawInteractionsActions={props.rawInteractionsActions}
          />
          <MaxEdgePanel
            maxEdgeCount={props.maxEdgeCount}
            uiState={props.uiState}
            uiStateActions={props.uiStateActions}
            rawInteractionsActions={props.rawInteractionsActions}
          />
        </div>
      </React.Fragment>
    )
  }

  const getNetworkPanel = (
    hidden,
    topHeight,
    externalNetwork,
    interactions,
    selected,
    selectedPerm,
    visualStyle,
    raw,
    loading = false
  ) => {
    if (hidden) {
      return <EmptyInteractionPanel height={topHeight} />
    }
    if (vs === null) {
      return (
        <LoadingPanel message={'Network loaded.  Now creating styles...'} />
      )
    }

    if (externalNetwork === null || externalNetwork === undefined) {
      return (
        <RawInteractionPanel
          subnet={interactions}
          subnetSelected={selected}
          subnetSelectedPerm={selectedPerm}
          selectedTerm={props.currentProperty.id}
          handleClose={props.handleClose}
          commandActions={props.interactionsCommandActions}
          commands={props.interactionsCommands}
          loading={raw.loading}
          selection={props.selection}
          selectionActions={props.selectionActions}
          filters={raw.filters}
          interactionStyleActions={props.interactionStyleActions}
          networkStyle={vs}
          panelWidth={props.width}
          expanded={props.expanded}
          enrichment={props.enrichment}
          enrichmentActions={props.enrichmentActions}
          uiState={props.uiState}
          hierarchy={props.network.get('hierarchy')}
        />
      )
    } else {
      return <CytoscapeViewer {...props} />
    }
  }

  // Still loading interaction...
  const raw = props.rawInteractions.toJS()
  const loading = raw['loading']
  // if (loading) {
  //   return <LoadingPanel message={raw['message']} />
  // }

  const summary = raw.summary
  // const autoLoadTh = WARNING_TH
  const autoLoadTh = raw.autoLoadThreshold
  const locationParams = props.location
  const uuid = props.routeParams.uuid
  let serverType = locationParams.query.type
  const url = props.cxtoolUrl + uuid + '?server=' + serverType

  const interactions = raw.interactions
  const selected = raw.selected
  // Permanent selection
  const selectedPerm = raw.selectedPerm

  // Term property
  const details = props.currentProperty
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
    hidden = false
  }

  let geneList = []

  // Special case: GO term
  // TODO: better alternative to generalize this?
  if (data.name !== undefined && data.name.startsWith('GO:')) {
    hidden = false
  }

  let subnet = null
  subnet = interactions

  if (subnet !== null && subnet !== undefined) {
    geneList = subnet.elements.nodes.map(node => node.data.name)
  } else {
    const geneMap = props.network.get('geneMap')
    const label = data.Label
    const geneSet = geneMap.get(label)

    if (geneSet === undefined) {
      geneList = []
    } else {
      geneList = [...geneSet]
    }
  }

  const title = data.name
  let networkProps = {}
  if (interactions) {
    networkProps = interactions.data
  }

  const visualStyle = props.interactionStyle.get('defaultStyle')
  if (visualStyle !== null && visualStyle !== undefined) {
    visualStyle.name = 'defaultStyle'
  }

  const network = props.network.get(url)

  let networkData = {}
  if (network !== undefined || network === null) {
    networkData = network.data
  }

  const bottomStyle = {
    boxSizing: 'border-box',
    width: '100%',
    height: window.innerHeight - networkPanelHeight,
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto'
  }

  // Calculate
  const topHeight = networkPanelHeight
  const allProps = props

  const selectedExternalNetwork = props.externalNetworks.selectedNetworkUuid

  return (
    <SplitPane
      split="horizontal"
      minSize={50}
      size={networkPanelHeight}
      onDragFinished={topHeight => handleHorizontalResize(topHeight)}
    >
      <div
        style={{
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <MessageBar
          height={50}
          network={props.network}
          title={props.title}
          titleColor={props.color}
          originalEdgeCount={props.originalEdgeCount}
          maxEdgeCount={props.maxEdgeCount}
        />

        {getNetworkPanel(
          hidden,
          topHeight,
          selectedExternalNetwork,
          interactions,
          selected,
          selectedPerm,
          visualStyle,
          raw
        )}
      </div>

      <div style={bottomStyle}>
        {props.expanded ? <div style={{ height: '5.2em' }} /> : <div />}

        {hidden ? (
          <div />
        ) : (
          <div style={controlPanelStyle}>
            <InteractionNetworkSelector genes={geneList} {...allProps} />
            {getControllers(
              selectedExternalNetwork,
              layoutPanelStyle,
              networkProps,
              controllerStyle,
              raw
            )}
          </div>
        )}

        {hidden || selectedExternalNetwork ? (
          <div />
        ) : (
          <div style={filterPanelStyle}>
            <EdgeFilter
              filters={raw.filters}
              commandActions={props.interactionsCommandActions}
              commands={props.interactionsCommands}
              filtersActions={props.filtersActions}
              networkData={networkProps}
              uiState={props.uiState}
              uiStateActions={props.uiStateActions}
            />
          </div>
        )}

        <div>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Subsystem Details" />
            <Tab label="Assigned Genes" />
          </Tabs>
        </div>

        {selectedTab === 0 && (
          <TabContainer>
            <SubsystemPanel
              selectedTerm={props.currentProperty}
              networkData={networkData}
              title={title}
              description={'N/A'}
            />
          </TabContainer>
        )}
        {selectedTab === 1 && (
          <TabContainer>
            <GeneList genes={geneList} {...allProps} />
          </TabContainer>
        )}
        {selectedTab === 2 && <TabContainer>N/A</TabContainer>}
      </div>
    </SplitPane>
  )
}

export default TermDetailsPanel
