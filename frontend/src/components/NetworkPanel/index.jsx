import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { SigmaRenderer } from '@cytoscape/cytoscapejs-renderer'
import CircularProgress from '@material-ui/core/CircularProgress'

// For context menu
import CirclePackingPanel from '../CirclePackingPanel'

import { Map } from 'immutable'
import { getHeader } from '../AccessUtil'

export const MYGENE_URL = 'https://mygene.info/v3'
const NDEX_LINK_TAG = 'ndex_internalLink'

const GO_NAMESPACE = 'GO:'

const NDEX_API = '.ndexbio.org/v2/network/'

const DEFAULT_SERVER = 'https://test.ndexbio.edu'
const DEFAULT_TYPE = 'test'
const DEFAULT_SUMMARY = `https://test.ndexbio.org/v2/search/network`

const Viewer = CyNetworkViewer(SigmaRenderer)

const progressStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.2)',
  zIndex: 1000
}

const name2uuid = networkName => {
  const query = {
    searchString: networkName
  }

  const settings = {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(DEFAULT_SUMMARY, settings)
    .then(res => res.json())
    .then(json => {
      const firstRes = json.network[0]
      console.log(firstRes['externalId'])
      return firstRes
    })
}

// TODO: better filter?

let last = null

class NetworkPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updating: false,
      networkUrl: '',
      hoverNode: null
    }
  }

  setGeneProps = geneName => {
    // Just fetch property
    const metadataUrl = MYGENE_URL + '/metadata'
    this.props.propertyActions.fetchMetadata({myGeneUrl: metadataUrl})
    
    const myGeneUrl = MYGENE_URL + '/query?q='
    const qUrl = myGeneUrl + geneName + '&fields=all&size=1'
    this.props.propertyActions.fetchPropertyFromUrl(geneName, qUrl, 'gene')
  }

  // Main function to select current subsystem.
  // Should be called once per double-click
  selectNodes = (nodeIds, nodeProps) => {
    // First node in the selection
    const nodeId = nodeIds[0]

    // If same one is selected, just ignore.
    if (last === nodeId) {
      return
    }
    last = nodeId

    const props = nodeProps[nodeId].props
    const newSelectionState = {
      networkId: 'main',
      nodeId: nodeId,
      nodeProps: props
    }

    // this.props.netantActions.clearAll()

    // TODO is this necessary?
    this.props.selectionActions.selectNode(newSelectionState)

    const nodeTypeTag = 'NodeType'
    let nodeType = props[nodeTypeTag]
    if (!nodeType) {
      nodeType = props['nodeType']
    }

    if (nodeType === 'Gene') {
      this.setGeneProps(props.Label)
      return
    }

    // From NDEx to CYJS converter
    let linkEntry = props[NDEX_LINK_TAG]

    if (!linkEntry) {
      // Link is not available = no raw interaction available OR this is a human-curated ontology
      const selectedNode = nodeProps[nodeIds[0]]
      const subsystemName = props.name
      console.log('Selected node: ++', selectedNode, props, subsystemName)

      if (subsystemName.startsWith(GO_NAMESPACE)) {
        console.info('This is a GO DAG.', selectedNode, subsystemName)
        // this.props.goActions.findGenesStarted({ goId: subsystemName })

        const selectedNodeId = selectedNode.props.id
        const selectedNodeLabel = selectedNode.props.Label

        console.log('Selected NODE = ', selectedNodeId, selectedNodeLabel)
        const geneMap = this.props.network.get('geneMap')
        const geneSet = geneMap.get(selectedNodeLabel)

        const runAnalysys = this.props.uiState.get('runEnrichment')
        console.log('Try ENR', runAnalysys, geneSet.size)
        if (geneSet.size < 2000 && runAnalysys) {
          this.props.enrichmentActions.runEnrichment(
            'https://amp.pharm.mssm.edu/Enrichr/addList',
            [...geneSet],
            selectedNodeId
          )
        } else if (runAnalysys && geneSet.size >= 2000) {
          this.props.enrichmentActions.setErrorMessage(
            'Gene set is too big (n>2000)'
          )
        }
      }
      this.props.eventActions.selected(selectedNode)
      this.props.propertyActions.setProperty(props.id, props, 'term')

      return
    }

    // Check link information type

    let linkId = ''

    if (linkEntry.startsWith('http')) {
      const urlParts = linkEntry.split('/')
      linkId = urlParts[urlParts.length - 1]
      console.log('New UUID = ', urlParts, linkId)
    } else {
      const linkParts = linkEntry.split(']')
      if (linkParts.length !== 2) {
        console.error('Invalid LINK entry.  Check format of the link.')
        return
      }
      const uuidWithExtraStr = linkParts[1]
      linkId = uuidWithExtraStr.replace(')', '').replace('(', '')
    }

    const locationParams = this.props.location
    let serverType = locationParams.query.type
    const link = this.props.cxtoolUrl + linkId + '?server=' + serverType
    // this.props.eventActions.selected(nodeProps[nodeIds[0]])

    // Check size before
    const summaryUrl = 'https://' + serverType + NDEX_API + linkId + '/summary'
    // this.props.rawInteractionsActions.setLoading(
    //   'Checking summary of the interaction network...'
    // )

    // Clear selected
    this.props.externalNetworksActions.clearExternalNetwork()

    const credentials = this.props.credentials
    const headers = getHeader(credentials)
    const settings = {
      method: 'GET',
      headers: headers
    }
    fetch(summaryUrl, settings)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(summary => {
        this.props.rawInteractionsActions.setRawSummary(summary)
        const positions = this.props.rawInteractions.get('groupPositions')
        const allPositions = this.props.rawInteractions.get('allPositions')
        const pleio = this.props.rawInteractions.get('pleio')
        // Directly set prop from node attributes
        this.props.rawInteractionsActions.fetchInteractionsFromUrl(
          linkId,
          serverType,
          link,
          this.props.maxEdgeCount,
          summary,
          credentials,
          positions,
          allPositions,
          pleio
        )
        // }
      })
      .catch(err => {
        console.log('Network summary ERROR! ', err)
      })

    this.props.propertyActions.setProperty(props.id, props, 'term')
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('Selected Edge ID: ' + edgeIds)
    console.log(edgeProps)
  }

  // Callback
  commandFinished = (lastCommand, result = {}) => {
    if (lastCommand === 'findPath') {
      const path = result

      if (path !== undefined && path.notFound) {
        // this.props.commandActions.zoomToNode(path.startId)
        return
      }

      this.props.currentPathActions.setPath(path)

      if (path !== undefined && path.length !== 0 && path.length !== 1) {
        if (path[0] !== undefined) {
          const start = path[0].id
          // this.props.commandActions.zoomToNode(start)
        } else {
        }
      }
    }
  }

  hoverOnNode = (nodeId, nodeProps) => {
    const groups = this.props.rawInteractions.get('groups')
    if (!groups) {
      return
    }

    // Set selected state
    let name = nodeProps.Original_Name
    if (name === undefined) {
      name = nodeProps.name
    }

    const geneIds = groups[name]
    if (geneIds) {
      this.props.rawInteractionsActions.setSelected(geneIds)
    }
  }

  hoverOutNode = (nodeId, nodeProps) => {
    const groups = this.props.rawInteractions.get('groups')
    if (!groups) {
      return
    }

    this.props.rawInteractionsActions.setSelected([])
  }

  hideEdges = (edgeIds = []) => {}

  // Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges,
    commandFinished: this.commandFinished,
    hoverOnNode: this.hoverOnNode,
    hoverOutNode: this.hoverOutNode,
    hideEdges: this.hideEdges
  })

  handleBack = () => {
    browserHistory.push('/')
  }

  // Initialize
  componentWillMount() {
    const locationParams = this.props.location
    const uuid = this.props.routeParams.uuid
    let serverType = locationParams.query.type
    const credentials = this.props.credentials

    if (serverType === undefined) {
      serverType = 'test'
    }

    const url = this.props.cxtoolUrl + uuid + '?server=' + serverType
    this.setState({ networkUrl: url })

    const { fetchNetworkFromUrl } = this.props.networkActions

    if (locationParams.query.type === undefined) {
      const query = {
        searchString: uuid
      }
      const settings = {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(DEFAULT_SUMMARY, settings)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          const firstRes = json.networks[0]
          const newId = firstRes['externalId']
          const newUrl = this.props.cxtoolUrl + newId + '?server=' + serverType

          this.props.networkActions.setUuid(newId)
          this.props.networkActions.setServer(DEFAULT_SERVER)

          // Encode parameters in URL
          const newLocationUrl = `/${newId}?type=${serverType}&server=${DEFAULT_SERVER}`
          browserHistory.push(newLocationUrl)

          this.props.networkActions.fetchNetworkFromUrl(
            newUrl,
            newId,
            serverType,
            credentials
          )
        })
    } else {
      this.props.networkActions.fetchNetworkFromUrl(
        url,
        uuid,
        serverType,
        credentials
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const search = this.props.search
    const nextSearch = nextProps.search
    if (search.result !== nextSearch.result) {
      // Select result
      const selectedIds = nextSearch.result
      if (selectedIds !== undefined && selectedIds !== null) {
        this.props.commandActions.select(selectedIds)
      }
    }

    // Check selection state
    const newSelection = nextProps.selection
    const selection = this.props.selection

    const nextRawSelection = newSelection.get('raw')
    const rawSelection = selection.get('raw')
    if (rawSelection === undefined || nextRawSelection === undefined) {
      return
    }

    const newId = nextRawSelection.nodeId
    const originalId = rawSelection.nodeId

    if (newId !== originalId) {
      // const geneName = nextRawSelection.nodeProps.name
      // const networkProp = this.props.network
      // const networkData = networkProp.get(this.state.networkUrl)
      // const targetNodeId = networkData.label2id[geneName]
      // this.props.commandActions.zoomToNode(targetNodeId)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.height !== nextProps.height) {
      return true
    }

    if (this.props.width !== nextProps.height) {
      return true
    }

    if (this.props.selection !== nextProps.selection) {
      return true
    }

    if (
      this.props.uiState.get('changeViewer') !==
      nextProps.uiState.get('changeViewer')
    ) {
      return true
    }

    if (this.props.rawInteractions !== nextProps.rawInteractions) {
      return true
    }

    if (nextProps.commands.target === 'subnet') {
      return false
    }

    if (this.state.hoverNode !== nextState.hoverNode) {
      return true
    }

    if (!this.props.renderingOptions.equals(nextProps.renderingOptions)) {
      return true
    }

    if (
      nextProps.network.get('loading') === this.props.network.get('loading')
    ) {
      // Check commands difference

      if (this.props.commands !== nextProps.commands) {
        return true
      }

      return false
    }
    return true
  }

  render() {
    const networkProp = this.props.network
    const loading = networkProp.get('loading')
    // const networkData = networkProp.get('cyjs')
    const networkData = networkProp

    if (loading) {
      let message = 'Loading hierarchy.  Please wait...'

      if (networkData !== undefined) {
        message = 'Data Loaded!'
      }

      return (
        <div style={progressStyle}>
          <h2>{message}</h2>
          <CircularProgress size={500} />
        </div>
      )
    }

    let commands = this.props.commands
    if (commands.target === 'subnet') {
      commands = Map({ command: '', parameters: {} })
    }

    const networkAreaStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      width: this.props.width,
      height: this.props.height
    }

    const circleAreaStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height
    }

    // Default layout
    const rendOpts = {
      layout: 'preset',
      sigmaOptions: this.props.renderingOptions.toJS()
    }

    if (this.props.uiState.get('changeViewer')) {
      return (
        <div style={{ width: '100%', height: this.props.height }}>
          <Viewer
            key="mainView"
            network={networkData}
            networkType={'cyjs'}
            style={networkAreaStyle}
            // networkStyle={style}
            eventHandlers={this.getCustomEventHandlers()}
            command={commands}
            rendererOptions={rendOpts}
          />
        </div>
      )
    } else {
      return (
        <CirclePackingPanel
          {...this.props}
          selection={this.props.selection}
          command={commands}
          network={networkData}
          groups={this.props.rawInteractions.get('groups')}
          style={circleAreaStyle}
          selectPrimaryNode={this.selectNodes}
          commandActions={this.props.commandActions}
          renderingOptions={this.props.renderingOptions.toJS()}
          depth={this.props.uiState.get('defaultDepth')}
        />
      )
    }
  }
}

export default NetworkPanel
