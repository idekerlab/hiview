import React, { Component } from 'react'

import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'

import cyjs2tree from './cyjs2tree'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null,
    hover: null,
  }

  componentWillMount() {}

  componentDidMount() {
    // Initialization
    const tree = cyjs2tree(this.props.network)
    this.setState({
      tree,
    })
  }

  componentWillReceiveProps(nextProps) {
  }

  getEventHandlers = () => {
    const selectNode = (id, data) => {
      console.log('Seleected = ' + id)
      console.log(data)
      const wrappedData = {
        props: data
      }
      this.props.selectNodes([id], { [id]: wrappedData })
      this.props.commandActions.zoomToNode(id)
    }

    const hoverOnNode = (id, data) => {
      // console.log('hover = ' + id)
      // console.log(data)
      this.setState({
        hover: id
      })
    }

    return {
      selectNode,
      hoverOnNode
    }
  }

  render() {

    return (
      <div
        ref={containerElement => (this.containerElement = containerElement)}
        style={this.props.style}
      >
        {this.state.tree === null ? (
          <div />
        ) : (
          <TreeViewer
            tree={this.state.tree}
            eventHandlers={this.getEventHandlers()}
            size={this.props.style.height}
          />
        )}
      </div>
    )
  }
}

const handleClick = (nodeId, props) => {
  props.commandActions.zoomToNode(nodeId)
};

export default CirclePackingPanel
