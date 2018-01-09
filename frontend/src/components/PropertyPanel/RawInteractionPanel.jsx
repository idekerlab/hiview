import React, {Component} from 'react'
import CyNetworkViewer from 'cy-network-viewer'
import {CytoscapeJsRenderer} from 'cytoscapejs-renderer'



import * as d3Interpolate from 'd3-interpolate'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import * as d3Scale from 'd3-scale'


const PATTERN = /[ -]/g



const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

class RawInteractionPanel extends Component {

  render() {

    // Style of this component's area
    const containerStyle = {
      width: '100%',
      height: '34em',
      background: '#000000'
    }

    const networkAreaStyle = {
      width: this.props.panelWidth,
      height: '100%',
      top: 0,
      right: 0,
      position: 'relative'
    }

    console.log('**CONT')
    console.log(containerStyle)
    return (
      <div style={containerStyle}>
        {this.getMainContents(networkAreaStyle)}
      </div>
    )
  }

  getMainContents = (networkAreaStyle) => {

    const newNet = this.props.subnet
    const visualStyle = this.props.networkStyle

    if(newNet === null || newNet === undefined || visualStyle === null) {
      return (<div></div>)
    }


    const filters = this.props.filters

    if (filters === null || filters.length === 0) {
      return
    }

    let primaryFilter = null
    const filterNames = []
    const filterMap = {}

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary
      if (isPrimary) {
        primaryFilter = filter
      } else {
        filterNames.push(filter.attributeName)
        filterMap[filter.attributeName] = filter
      }
    })

    return (
      <Viewer
        key="subNetworkView"
        network={this.props.subnet}
        networkType={'cyjs'}
        networkStyle={visualStyle}
        style={networkAreaStyle}
        eventHandlers={this.getCustomEventHandlers()}
        rendererOptions={{
          layout: 'cose-bilkent',
          defaultFilter: {

            command: 'filter',
            parameters: {
              options: {
                type: 'numeric',
                isPrimary: true,
                range: '[' + primaryFilter.attributeName + ' < ' + primaryFilter.threshold + ']',
              }
            }
          }
        }}
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
  }

  selectEdges = (edgeIds, edgeProps) => {
    console.log(edgeProps)
  }

  commandFinished = (lastCommand, status = {}) => {
    console.log('Raw interaction: Command Finished: ' + lastCommand);
    console.log(status);

    this.props.commandActions.clearCommand()
  }

// Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges,
    commandFinished: this.commandFinished
  })
}

export default RawInteractionPanel
