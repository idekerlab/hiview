import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import CyNetworkViewer from 'cy-network-viewer'
import CytoscapeJsRenderer from 'cytoscapejs-renderer'

import Loading from '../Loading'
import {Map} from 'immutable'
import getVisualStyle from './style-factory'

const MYGENE_URL = 'http://mygene.info/v3'
const CXTOOL_URL = 'http://localhost:3001/ndex2cyjs/'


const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

class NetworkPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      networkUrl: ''
    };
  }

  setGeneProps = () => {
    // Just fetch property
    const myGeneUrl = MYGENE_URL + '/query?q='
    const qUrl = myGeneUrl + props.name
    this.props.propertyActions.fetchPropertyFromUrl(props.id, qUrl, 'gene')

  }

  selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    // There are two cases: Gene or term

    // Get node type:

    const nodeTypeTag = 'Gene_or_Term'
    const nodeType = props[nodeTypeTag]

    if (nodeType === null || nodeType === undefined) {
      // Error handler will be here...
      return
    }

    if (nodeType === 'Gene') {
      this.setGeneProps()
      return
    }
    // From NDEx to CYJS converter
    const linkKey = 'ndex_internalLink'
    const link = CXTOOL_URL + props[linkKey] + '?server=test'

    window.setTimeout(() => {
      // Path finding

      const networkProp = this.props.network
      const networkData = networkProp.get(this.state.networkUrl)
      const root = networkData.data.rootId

      this.props.eventActions.selected(nodeProps[nodeIds[0]])

      const startNode = nodeIds[0]
      this.props.commandActions.findPath({startId: startNode, endId: root})

      // Directly set prop from node attributes
      this.props.rawInteractionsActions.fetchInteractionsFromUrl(link)
      this.props.propertyActions.setProperty(props.id, props, 'term')
    }, 0)
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('====== Custom edge select function called! ========');
    console.log('Selected Edge ID: ' + edgeIds)
    console.log(edgeProps)
  }

  // Then use it as a custom handler
  getCustomEventHandlers = () => ({selectNodes: this.selectNodes, selectEdges: this.selectEdges})

  handleBack = () => {
    browserHistory.push('/')
  }

  // Initialize
  componentWillMount() {
    // const url = this.props.trees[this.props.currentNetwork.id].url
    const uuid = this.props.datasource.get('uuid')
    const url = CXTOOL_URL + uuid + '?server=test'
    this.setState({networkUrl: url})
    this.props.networkActions.fetchNetworkFromUrl(url)
  }

  componentWillReceiveProps(nextProps) {
    const nextNet = nextProps.currentNetwork
    const newUrl = nextProps.trees[nextNet.id].url
    const network = this.props.network.get(newUrl)


    if (network === undefined || network === null) {

      // Need to fetch network data
      if (nextNet.id !== this.props.currentNetwork.id) {
        this.props.networkActions.fetchNetworkFromUrl(newUrl)
      }
    } else {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.commands.target === 'subnet') {
      return false
    }

    if (nextProps.network.get('loading') === this.props.network.get('loading')) {
      // Check commands difference
      console.log('...Still loading...')
      if (this.props.commands !== nextProps.commands) {
        return true
      }

      return false
    }
    return true
  }

  componentDidUpdate(prevProps, prevState) {

    this.props.messageActions.setMessage('Neural network browser is ready!')

    window.setTimeout(() => {
      this.props.messageActions.setMessage('Ontology Viewer v0.1')
    }, 3000)
  }


  render() {
    const loading = this.props.network.get('loading')
    const networkProp = this.props.network
    const networkData = networkProp.get(this.state.networkUrl)

    if (loading || networkData === undefined) {
      return (<Loading/>)
    }

    let commands = this.props.commands
    if (commands.target === 'subnet') {
      commands = Map({command: '', parameters: {}})
    }

    const networkAreaStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    };


    // Default layout
    const rendOpts = {
      layout: 'preset'
    }

    const style = getVisualStyle(networkData.data.minSize, networkData.data.maxSize)

    return (
      <Viewer
        key="mainView"
        network={networkData}
        networkType={'cyjs'}
        style={networkAreaStyle}
        networkStyle={style}
        eventHandlers={this.getCustomEventHandlers()}
        command={commands}
        rendererOptions={rendOpts}
      />
    )
  }

}

export default NetworkPanel
