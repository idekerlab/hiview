import React, {Component} from 'react'
import CyNetworkViewer from 'cy-network-viewer'
import {CytoscapeJsRenderer} from 'cytoscapejs-renderer'

import * as d3Interpolate from 'd3-interpolate'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'

const PATTERN = /[ -]/g

class RawInteractionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(this.props.subnet === undefined || this.props.subnet === null) {
      return false
    }


    if(nextProps.selectedTerm === undefined || this.props.selectedTerm === undefined) {
      return false
    }

    if(this.props.subnet !== nextProps.subnet) {
      return true
    }

    if(nextProps.selectedTerm === this.props.selectedTerm) {

      if(nextProps.loading !== this.props.loading) {
        return true
      }
      return false;
    }

    return true
  }


  render() {
    const style = {
      width: '100%',
      height: '45em',
      background: '#000000'
    }


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

    if(this.props.subnet === null || this.props.subnet === undefined) {
      return (<div></div>)
    }

    // Style of
    const networkAreaStyle = {
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      position: 'relative'
    }

    if(!this.props.loading) {

      const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

      const networkStyle = this.getStyle()
      const newNet = this.props.subnet
      newNet.elements.edges = this.addExtraEdges(newNet, '')


      console.log(networkStyle)

      return (
          <Viewer
            key="subNetworkView"
            network={this.props.subnet}
            networkType={'cyjs'}
            networkStyle={networkStyle}
            style={networkAreaStyle}
            eventHandlers={this.getCustomEventHandlers()}
            rendererOptions={{layout: 'cose-bilkent'}}
            command={this.props.commands}
          />
      )
    } else {
      return (<h2>Loading networks...</h2>)
    }

  }

  getStyle = () => {

    // This is the generator for custom styling
    const similarityMin = this.props.subnet.data['RF score min']
    const similarityMax = this.props.subnet.data['RF score max']

    const colorScale = d3Scale
      .scaleSequential(d3Scale.interpolateInferno)
      .domain([similarityMin, similarityMax])

    return {
    style: [ {
      "selector" : "node",
      "css" : {
        "width" : 1,
        "height" : 1,
        "text-valign" : "center",
        "text-halign" : "center",
        "shape" : "ellipse",
        "color" : "#FFFFFF",
        "background-color" : "#eeeeee",
        "font-size" : 12,
        "label" : "data(name)",
      }
    }, {
      "selector" : "node:selected",
      "css" : {
        "background-color" : "white",
        "font-size" : "0.4em",
        "color" : "white",
        label: "data(name)",
        "text-max-width": '200px'
      }
    }, {
      "selector" : "edge",
      "css" : {
        // width: 3,
        "width" : 'mapData(RF_score,' + similarityMin +',' + similarityMax + ', 1, 30)',
        // 'line-color': (d) => {
        //
        //   if(d.data('RF_score') === undefined) {
        //     return '#aaaaaa'
        //   }
        //   return colorScale(d.data('RF_score'))
        // },
        'line-color': 'teal',
        'line-style': d => {
          if(d.data('RF_score') === undefined) {
            return 'dotted'
          } else {
            return 'solid'
          }
        },
        opacity: 'mapData(RF_score,' + similarityMin +',' + similarityMax + ', 0.4, 0.95)',
        // opacity: 0.6,
        'curve-style': 'bezier',
        'edge-distances': 'node-position',
        // 'control-point-distance': '2',
        // 'control-point-distance': '5',
        // 'control-point-weight': '0.5'
      }
    }, {
      "selector" : "edge:selected",
      "css" : {
        "line-color" : "rgb(255,0,0)",
        "width": 1
      }
    } ]
  }
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
