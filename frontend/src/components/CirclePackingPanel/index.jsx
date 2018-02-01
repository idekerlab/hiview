import React, { Component } from 'react'

import { CirclePackingRenderer, CyTreeViewer } from 'cy-tree-viewer'

import cyjs2tree from './cyjs2tree'

const TreeViewer = CyTreeViewer(CirclePackingRenderer)

class CirclePackingPanel extends Component {
  state = {
    tree: null,
    hover: null
  }

  componentWillMount() {}

  componentDidMount() {
    // Initialization

    const tree = cyjs2tree(this.props.network)
    this.setState({
      tree
    })
  }

  componentWillReceiveProps(nextProps) {}

  getEventHandlers = () => {
    const selectNode = (id, data) => {
      console.log('Seleected = ' + id)
      console.log(data)
      const wrappedData = {
        props: data
      }
      this.props.selectNodes([id], {[id]: wrappedData})

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
    if (this.state.tree === null) {
      return <div />
    }

    return (
      <div style={this.props.style}>
        <TreeViewer
          tree={this.state.tree}
          eventHandlers={this.getEventHandlers()}
          size={900}
        />
      </div>
    )
  }
}

export default CirclePackingPanel
