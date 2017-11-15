import React, {Component} from 'react'
import CyNetworkViewer from 'cy-network-viewer'
import {CytoscapeJsRenderer} from 'cytoscapejs-renderer'

import * as d3Interpolate from 'd3-interpolate'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'

const PATTERN = /[ -]/g

// Style of this component's area
const style = {
  width: '100%',
  height: '45em',
  background: '#000000'
}

// Style of
const networkAreaStyle = {
  width: '100%',
  height: '100%',
  top: 0,
  right: 0,
  position: 'relative'
}

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

class RawInteractionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //
    // if(nextProps.selectedTerm === undefined || this.props.selectedTerm === undefined) {
    //   return false
    // }
    //
    // if(this.props.subnet !== nextProps.subnet) {
    //   return true
    // }
    //
    // if(nextProps.selectedTerm === this.props.selectedTerm) {
    //
    //   if(nextProps.loading !== this.props.loading) {
    //     return true
    //   }
    //   return false;
    // }

    return true
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }


  render() {

    return (
      <div style={style}>
        {this.getMainContents()}
      </div>
    )
  }

  addExtraEdges(network) {

    const filters = this.props.filters.toJS()
    const filterNames = Object.keys(filters)

    console.log(filters)
    let primaryFilterName = ''
    filterNames.forEach(filterName => {
      if(filters[filterName].isPrimary) {
        primaryFilterName = filterName
      }
    })

    const edges = network.elements.edges
    const newEdges = []

    let i = edges.length
    while(i--) {
      const edge = edges[i]

      const edgeData = edge.data
      const keys = Object.keys(edgeData)



      let primaryEdge = {}

      let j = keys.length
      while(j--) {
        const key = keys[j]
        if(key === 'id' || key === 'source' || key === 'target') {
          continue
        }

        const value = edgeData[key]
        if(!value) {
          continue
        }

        const newKey = key.replace(PATTERN, '_')
        const newEdge = {
          data: {
            id: edgeData.id + '-' + key,
            source: edgeData.source,
            target: edgeData.target,
          }
        }


        newEdge.data[newKey] = edgeData[key]
        if(newKey === primaryFilterName) {
          newEdges.unshift(newEdge)
        } else {
          newEdges.push(newEdge)
        }
      }


    }
    return newEdges

  }

  getMainContents = () => {

    const newNet = this.props.subnet
    const visualStyle = this.props.networkStyle

    if(newNet === null || newNet === undefined || visualStyle === null) {
      return (<div></div>)
    }

    // newNet.elements.edges = this.addExtraEdges(newNet, '')

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++VS")
    console.log(visualStyle)
    return (
      <Viewer
        key="subNetworkView"
        network={this.props.subnet}
        networkType={'cyjs'}
        networkStyle={visualStyle}
        style={networkAreaStyle}
        eventHandlers={this.getCustomEventHandlers()}
        rendererOptions={{layout: 'cose-bilkent'}}
        command={this.props.commands}
      />
    )

  }


  selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    const newSelectionState = {
      networkId: 'raw',
      nodeId: node,
      nodeProps: props
    }

    this.props.selectionActions.selectNode(newSelectionState)

    console.log('RAW2 ============================================================== Custom node select function called! ========');
    console.log('Selected Node ID: ' + node)
    console.log(props)
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log('====== Custom edge select function called! ========');
    console.log('Selected Edge ID: ' + edgeIds)
    console.log(edgeProps)

    // Expand edge
  }

// Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges
  })
}

export default RawInteractionPanel
