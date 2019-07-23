import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import CyNetworkViewer from 'cy-network-viewer'
import { SigmaRenderer } from 'cytoscapejs-renderer'
import CircularProgress from '@material-ui/core/CircularProgress';

// For context menu
import CirclePackingPanel from '../CirclePackingPanel'

import { Map } from 'immutable'

const MYGENE_URL = 'http://mygene.info/v3'
const NDEX_LINK_TAG = 'ndex_internalLink'

const GO_NAMESPACE = 'GO:'

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

const styles = theme => ({
  progress: progressStyle
})

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
    const myGeneUrl = MYGENE_URL + '/query?q='
    const qUrl = myGeneUrl + geneName + '&fields=all&size=1'
    this.props.propertyActions.fetchPropertyFromUrl(geneName, qUrl, 'gene')
  }

  selectNodes = (nodeIds, nodeProps) => {
    // First node in the selection
    const nodeId = nodeIds[0]
    const props = nodeProps[nodeId].props

    const newSelectionState = {
      networkId: 'main',
      nodeId: nodeId,
      nodeProps: props
    }

    console.log('----------------------clear--------------')
    this.props.netantActions.clearAll()

    this.props.selectionActions.selectNode(newSelectionState)

    const nodeTypeTag = 'NodeType'
    let nodeType = props[nodeTypeTag]
    if (!nodeType) {
      nodeType = props['nodeType']
    }

    if (!nodeType) {
      return
    }

    if (nodeType === 'Gene') {
      this.setGeneProps(props.Label)
      return
    }

    // From NDEx to CYJS converter
    const linkEntry = props[NDEX_LINK_TAG]


    if (!linkEntry) {
      // Link is not available = no raw interaction available OR this is a human-curated ontology
      const selectedNode = nodeProps[nodeIds[0]]
      const subsystemName = props.name
      console.log('Selected node: ++', selectedNode, props, subsystemName)

      if(subsystemName.startsWith(GO_NAMESPACE)) {

        console.log('This is GO+++++++++++++++++',selectedNode, subsystemName, this.props)
        // this.props.goActions.findGenesStarted({ goId: subsystemName })

        const selectedNodeId = selectedNode.props.id
        const selectedNodeLabel = selectedNode.props.Label

        console.log('Selected NODE = ', selectedNodeId, selectedNodeLabel)
        const geneMap = this.props.network.get('geneMap')
        const geneSet = geneMap.get(selectedNodeLabel)

        console.log('Gene Set = ', geneSet)
        this.props.eventActions.selected(selectedNode)
        this.props.propertyActions.setProperty(props.id, props, 'term')

      } else {
        this.props.eventActions.selected(selectedNode)
        this.props.propertyActions.setProperty(props.id, props, 'term')
      }

      return
    }

    const linkParts = linkEntry.split(']')
    if (linkParts.length !== 2) {
      console.error('Invalid LINK entry.  Check format of the link.')
      return
    }
    const uuidWithExtraStr = linkParts[1]
    const linkId = uuidWithExtraStr.replace(')', '').replace('(', '')

    const locationParams = this.props.location
    let serverType = locationParams.query.type
    const link = this.props.cxtoolUrl + linkId + '?server=' + serverType
    this.props.eventActions.selected(nodeProps[nodeIds[0]])

    // Check size before
    const NDEX_API = '.ndexbio.org/v2/network/'
    const summaryUrl = 'http://' + serverType + NDEX_API + linkId + '/summary'

    this.props.rawInteractionsActions.setLoading(
      'Checking summary of the interaction network...'
    )

    // Clear selected
    this.props.externalNetworksActions.clearExternalNetwork()

    fetch(summaryUrl)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(summary => {
        const edgeCount = summary.edgeCount

        console.log('SET called-----------', summary)
        this.props.rawInteractionsActions.setRawSummary(summary)

        if (edgeCount < this.props.autoLoadThreshold) {
          // Directly set prop from node attributes
          this.props.rawInteractionsActions.fetchInteractionsFromUrl(
            linkId,
            serverType,
            link,
            this.props.maxEdgeCount,
            summary
          )
        }
      })
      .catch(err => {
        console.log('Network summary ERROR! ', err)
      })

    this.props.propertyActions.setProperty(props.id, props, 'term')
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('====== Custom edge select function called! ========')
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

  // Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges,
    commandFinished: this.commandFinished,
    hoverOnNode: this.hoverOnNode,
    hoverOutNode: this.hoverOutNode
  })

  handleBack = () => {
    browserHistory.push('/')
  }

  // Initialize
  componentWillMount() {
    const locationParams = this.props.location
    const uuid = this.props.routeParams.uuid
    let serverType = locationParams.query.type

    if (serverType === undefined) {
      serverType = 'test'
    }

    const url = this.props.cxtoolUrl + uuid + '?server=' + serverType
    this.setState({ networkUrl: url })

    this.props.networkActions.fetchNetworkFromUrl(url, uuid, serverType)
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
    const networkData = networkProp.get('cyjs')

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
      height: this.props.height,
      background: 'teal'
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
        />
      )
    }
  }
}

export default NetworkPanel
