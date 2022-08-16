import React, { useState, useEffect, useRef } from 'react'

import { Tabs, Tab, AppBar } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'

import RawInteractionPanel from './RawInteractionPanel'
import SubsystemPanel from './SubsystemPanel'

import TabContainer from './TabContainer'
import { EdgeFilter, PrimaryFilter } from '../Filters'

import GeneList from './GeneList'

import * as StyleFactory from './StyleFactory'

import LayoutSelector from '../LayoutSelector'
import ExportButtons from '../ExportButtons'
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

import { createStyles, makeStyles } from '@material-ui/core'

import D3Legend from '../D3Legend'
import EdgeInfoPanel from './EdgeInfoPanel'

const useStyles = makeStyles((theme) =>
  createStyles({
    topPane: {
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    bottomPane: {
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    networkWrapper: {
      flexGrow: 1,
      width: '100%',
    },
    control: {
      boxSizing: 'border-box',
      width: '100%',
      // height: '5em',
      background: 'orange',
    },
    edgeFilterTitle: {
      background: '#FFFFFF',
    },
    edgeFilters: {
      padding: 0,
    },
  }),
)

const WARNING_TH = 2000000

const TermDetailsPanel = (props) => {
  const networkContainer = useRef(null)

  const classes = useStyles()

  const [selectedTab, setSelectedTab] = useState(0)
  const [networkPanelHeight, setNetworkPanelHeight] = useState(
    window.innerHeight * 0.5,
  )

  const [vs, setVS] = useState(null)
  const [systemID, setSystemID] = useState(null)

  const [cy, setCy] = useState(null)

  const addStyle = (rawInteractions) => {
    const networkStyle = StyleFactory.createStyle(rawInteractions)
    setVS(networkStyle)
  }

  const setScore = (val) => {
    props.commandActions.filter({
      options: {
        type: 'numeric',
        range: 'edge[score > ' + val + ']',
      },
      target: 'subnet',
    })
  }

  useEffect(() => {
    return () => {}
  }, [])

  useEffect(() => {
    const newID = props.selection.get('main').nodeId
    if (vs === null || systemID !== newID) {
      setSystemID(newID)
      addStyle(props.rawInteractions)
    }

    const { current } = networkContainer
    if (current !== null && current !== undefined) {
    }
  }, [props.rawInteractions, props.selection.get('main')])

  const handleChange = (event, value) => {
    setSelectedTab(value)
  }

  const handleResize = (e) => {
    props.interactionsCommandActions.fit()
  }

  const handleHorizontalResize = (topHeight) => {
    setNetworkPanelHeight(topHeight)
  }

  const getControllers = (externalNetwork, networkProps, raw) => {
    if (externalNetwork !== null) {
      const others = props
      return (
        <LayoutSelector
          commandActions={props.interactionsCommandActions}
          {...others}
        />
      )
    }

    return (
      <React.Fragment>
        {/* <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
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

        <div>
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
        </div> */}
      </React.Fragment>
    )
  }

  const getNetworkPanel = (
    hidden,
    externalNetwork,
    interactions,
    selected,
    selectedPerm,
    visualStyle,
    raw,
    loading = false,
  ) => {
    if (hidden) {
      return (
        <div className={classes.networkWrapper}>
          <EmptyInteractionPanel />
        </div>
      )
    }
    if (vs === null) {
      return (
        <div className={classes.networkWrapper}>
          <LoadingPanel message={'Network loaded.  Now creating styles...'} />
        </div>
      )
    }

    if (externalNetwork === null || externalNetwork === undefined) {
      return (
        <div ref={networkContainer} className={classes.networkWrapper}>
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
            networkAreaStyle={{ height: '100%', background: '#111111' }}
            setCy={setCy}
            rawInteractionsActions={props.rawInteractionsActions}
            queryPathsActions={props.queryPathsActions}
            location={props.location}
          />
        </div>
      )
    } else {
      return (
        <div className={classes.networkWrapper}>
          <CytoscapeViewer {...props} />
        </div>
      )
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
    geneList = subnet.elements.nodes.map((node) => node.data.name)
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

  let { network } = props
  let networkData = {}
  if (network !== undefined || network === null) {
    networkData = network.get('networkAttributes')
    if (networkData === null || networkData === undefined) {
      networkData = {}
    }
  }

  // Calculate
  // const topHeight = networkPanelHeight
  const allProps = props

  const selectedExternalNetwork = props.externalNetworks.selectedNetworkUuid

  const splitBase = {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    background: '#FFFFFF',
    overflow: 'hidden',
  }

  const paneBase = {
    boxSizing: 'border-box',
    width: '100%',
    margin: 0,
    padding: 0,
    background: '#FFFFFF',
  }

  const paneTop = {
    boxSizing: 'border-box',
    width: '100%',
    background: 'teal',
    overflow: 'hidden',
  }

  const paneBottom = {
    boxSizing: 'border-box',
    width: '100%',
    background: '#FFFFFF',
    overflow: 'auto',
  }

  return (
    <SplitPane
      style={splitBase}
      paneStyle={paneBase}
      pane1Style={paneTop}
      pane2Style={paneBottom}
      split="horizontal"
      minSize={window.innerHeight * 0.3}
      defaultSize={window.innerHeight * 0.7}
      onDragFinished={(topHeight) => handleHorizontalResize(topHeight)}
    >
      <div className={classes.topPane}>
        <MessageBar
          network={props.network}
          title={props.title}
          titleColor={props.color}
          originalEdgeCount={props.originalEdgeCount}
          maxEdgeCount={props.maxEdgeCount}
        />
        {getNetworkPanel(
          hidden,
          selectedExternalNetwork,
          interactions,
          selected,
          selectedPerm,
          visualStyle,
          raw,
        )}
      </div>

      <div className={classes.bottomPane}>
        <LayoutSelector
          commandActions={props.interactionsCommandActions}
          currentSubsystem={props.currentProperty.id}
          uiState={props.uiState}
          uiStateActions={props.uiStateActions}
        />
        <ExportButtons
          geneList={geneList}
          cy={cy}
          rawInteractions={props.rawInteractions}
          externalNetworks={props.externalNetworks}
        />

        {hidden || selectedExternalNetwork ? (
          <div />
        ) : (
          <EdgeFilter
            filters={raw.filters}
            commandActions={props.interactionsCommandActions}
            commands={props.interactionsCommands}
            filtersActions={props.filtersActions}
            networkData={networkProps}
            uiState={props.uiState}
            uiStateActions={props.uiStateActions}
          />
        )}
        <EdgeInfoPanel
          network={interactions}
          selectedEdge={props.rawInteractions.get('selectedEdge')}
          queryPathsActions={props.queryPathsActions}
          queryPaths={props.queryPaths}
        />

        <div className={classes.control}>
          <div>
            {getControllers(selectedExternalNetwork, networkProps, raw)}
          </div>
        </div>

        <AppBar position="static" color="default">
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Subsystem Details" />
            <Tab label="Assigned Genes" />
          </Tabs>
        </AppBar>

        {selectedTab === 0 && (
          <SubsystemPanel
            selectedTerm={props.currentProperty}
            networkData={networkData}
            title={title}
            description={'N/A'}
          />
        )}
        {selectedTab === 1 && <GeneList genes={geneList} {...allProps} />}
      </div>
    </SplitPane>
  )
}

export default TermDetailsPanel
