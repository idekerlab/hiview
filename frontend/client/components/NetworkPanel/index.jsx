import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import CyNetworkViewer from 'cy-network-viewer'
import CytoscapeJsRenderer from 'cytoscapejs-renderer'

import CirclePacking from '../CirclePacking'

import Loading from '../Loading'

import ErrorIcon from 'material-ui/svg-icons/alert/error-outline'
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import FlatButton from 'material-ui/FlatButton'

import style from './style.css'

import {Map} from 'immutable'

import * as d3Hierarchy from 'd3-hierarchy'

import getVisualStyle from './style-factory'

const MYGENE_URL = 'http://mygene.info/v3'


// Create a Viewer with Cytoscpae.js renderer
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
    const baseUrl = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/'

    const link = baseUrl + props[linkKey] + '?server=test'
    console.log(link);

    window.setTimeout(() => {
      // Path finding

      const curNetId = this.props.currentNetwork.id
      const netUrl = this.props.trees[curNetId].url
      const networkProp = this.props.network
      const networkData = networkProp.get(this.state.networkUrl)
      const root = networkData.data.rootId

      this.props.eventActions.selected(nodeProps[nodeIds[0]])

      const startNode = nodeIds[0]
      const endNode = root
      this.props.commandActions.findPath({startId: startNode, endId: endNode})

      // const options = this.props.trees[this.props.currentNetwork.id].searchOptions
      // this.props.propertyActions.fetchEntry(props.id, options)

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
    const server = this.props.datasource.get('serverUrl')
    const uuid = this.props.datasource.get('uuid')
    const url = 'http://ci-dev-serv.ucsd.edu:3001/ndex2cyjs/' + uuid + '?server=test'

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

    // const curNet = this.props.currentNetwork
    // const nextNet = nextProps.currentNetwork
    //
    // const curNetId = curNet.id
    // const nextNetId = nextNet.id

    if (nextProps.network.get('loading') === this.props.network.get('loading')) {
      // Check commands difference
      console.log('...Still loading...')
      if (this.props.commands !== nextProps.commands) {
        return true
      }

      return false
    }

    // const newUrl = nextProps.trees[nextNetId].url
    // const network = nextProps.network.get(newUrl)
    //
    // if (network === undefined) {
    //   return false
    // }

    return true
  }

  componentDidUpdate(prevProps, prevState) {

    this.props.messageActions.setMessage('Neural network browser is ready!')

    window.setTimeout(() => {
      this.props.messageActions.setMessage('Ontology Viewer v0.1')
    }, 3000)
  }

  getError() {
    return (
      <div className={style.container}>
        <h1>A Problem Occurred While Downloading Data</h1>
        <h2>Possible Causes:</h2>
        <h3>Invalid URL</h3>
        <h3>Invalid NDEx ID</h3>
        <h3>Remote server is down</h3>
        <ErrorIcon color={'#ff0033'} style={{
          width: '40%',
          height: '40%'
        }}/>

        <FlatButton label="Back to Data Source Selector" labelPosition='after' labelStyle={{
          fontWeight: 700
        }} icon={< BackIcon />} onClick={this.handleBack}/>
      </div>
    )
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

  getTree = (root, tree) => {
    const nodes = tree.elements.nodes
    let rootId = null;

    for (let node of nodes) {
      if (node.data.name === root) {
        rootId = node.data.id
        break
      }
    }

    const csv = []
    csv.push({name: rootId, parent: ""})

    const edges = tree.elements.edges
    edges.forEach(edge => {
      const source = edge.data.source
      const target = edge.data.target

      csv.push({name: source, parent: target})
    })

    console.log('********** ROOT: ' + rootId)
    const d3tree = d3Hierarchy.stratify().id(function(d) {
      return d.name;
    }).parentId(function(d) {
      return d.parent;
    })(csv);

    console.log(d3tree)

    const layout = d3Hierarchy.tree().size([800, 800]).separation(function(a, b) {
      return (a.parent == b.parent
        ? 1
        : 2) / a.depth;
    });

    layout(d3tree)
    console.log('---------- Done! -------------')
    console.log(d3tree)

    const layoutMap = {}
    this.walk(d3tree, layoutMap)

    console.log(layoutMap)
    return layoutMap
  }

  applyLayout = (layoutMap, network) => {
    const nodes = network.elements.nodes
    nodes.forEach(node => {
      node.position.x = layoutMap[node.data.id][0]
      node.position.y = layoutMap[node.data.id][1]
    })
  }

  walk = (node, layoutMap) => {
    const children = node.children
    if (children === undefined || children.length === 0) {
      console.log("Tree node = " + node.id)

      layoutMap[node.id] = [node.x, node.y]
      return
    } else {
      children.forEach(child => this.walk(child, layoutMap))
    }
  }
}

export default NetworkPanel
