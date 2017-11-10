import React, {Component} from 'react'
import CyNetworkViewer from 'cy-network-viewer'
import {CytoscapeJsRenderer} from 'cytoscapejs-renderer'

import * as d3Interpolate from 'd3-interpolate'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'


class RawInteractionPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    if(nextProps.selectedTerm === undefined || this.props.selectedTerm === undefined) {
      return false
    }

    if(this.props.subnet !== nextProps.subnet) {
      return true
    }

    if(nextProps.selectedTerm === this.props.selectedTerm) {

      console.log("** Same selected term")
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
      background: '#555555'
    }


    return (
      <div style={style}>

        {this.getMainContents()}

      </div>
    )
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
      return (
          <Viewer
            key="subNetworkView"
            network={this.props.subnet}
            networkType={'cyjs'}
            networkStyle={this.getStyle()}
            style={networkAreaStyle}
            eventHandlers={this.getCustomEventHandlers()}
            rendererOptions={{layout: 'concentric'}}
            command={this.props.commands}
          />
      )
    } else {
      return (<h2>Loading networks...</h2>)
    }

  }

  getStyle = () => {

    // This is the generator for custom styling

    console.log("???????????????????????????????????????????????????????????????????????SUBNET for Style")
    console.log(this.props.subnet)

    const similarityMin = this.props.subnet.data['RF score min']
    const similarityMax = this.props.subnet.data['RF score max']

    const colorScale = d3Scale
      .scaleSequential(d3Scale.interpolateInferno)
      .domain([similarityMin, similarityMax])

    return {
    style: [ {
      "selector" : "node",
      "css" : {
        "width" : 0.6,
        "height" : 0.6,
        "text-valign" : "center",
        "text-halign" : "center",
        "shape" : "ellipse",
        "color" : "#FFFFFF",
        "background-color" : "#777777",
        "font-size" : 2,
        'min-zoomed-font-size': 9,
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
        "width" : 'mapData(RF_score,' + similarityMin +',' + similarityMax + ', 0.1, 0.7)',
        'line-color': (d) => (colorScale(d.data('RF_score'))),
        // opacity: 'mapData(RF_score,' + similarityMin +',' + similarityMax + ', 0.01, 0.7)',
        opacity: 0.6,
        'curve-style': 'bezier',
        // 'control-point-distance': '5',
        // 'control-point-weight': '0.1'
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
